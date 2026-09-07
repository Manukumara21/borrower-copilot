import {
  BorrowerInput,
  EvaluationResult,
  NegotiationCardData,
  NegotiationTalkingPoint,
  VerdictStatus,
} from '../types/borrower';
import { evaluateAffordability, generateTenureTradeoffs, calculateMonthlyEmi } from './affordability';
import { evaluateInterestRateAndApr } from './interestRate';
import { evaluateProductRouting } from './productRouting';
import { evaluateStressTest } from './stressTest';
import { evaluateConfidence } from './confidence';

/**
 * Master evaluation engine combining all domain rules
 */
export function evaluateBorrower(input: BorrowerInput): EvaluationResult {
  // 1. Evaluate Product Routing first (Secured vs Unsecured)
  const productRecommendation = evaluateProductRouting(input);
  const isSecured = productRecommendation.isRoutedToSecured;

  // 2. Evaluate Interest Rate & All-in APR
  const rateResult = evaluateInterestRateAndApr(input, isSecured);
  const fairRateMid = Number(((rateResult.fairRateMinPercent + rateResult.fairRateMaxPercent) / 2).toFixed(2));

  // 3. Determine recommended baseline tenure (3 yrs for PL, 10 yrs for LAP)
  const baseTenureYears = isSecured && input.commercialPropertyAssetValue ? 10 : 3;
  const requestedTenureMonths = baseTenureYears * 12;

  // 4. Affordability & Loan Amount calculations
  const affordability = evaluateAffordability(input, fairRateMid, baseTenureYears);

  // EMI of requested loan at mid fair rate
  const requestedLoanEmi = calculateMonthlyEmi(
    input.loanAmountRequested,
    fairRateMid,
    requestedTenureMonths
  );

  const totalMonthlyDebtWithRequested = requestedLoanEmi + (input.existingMonthlyEmis || 0);
  const proposedFoirPercent =
    affordability.totalIncome > 0
      ? Number(((totalMonthlyDebtWithRequested / affordability.totalIncome) * 100).toFixed(1))
      : 0;

  // 5. Stress Testing (-20% income drop)
  const stressTest = evaluateStressTest(input, requestedLoanEmi, 20);

  // 6. Confidence Scoring ("Confidence widens with silence")
  const confidence = evaluateConfidence(input);

  // 7. Core Verdict Determination (🟢 BORROW | 🟡 BORROW LESS | 🔴 DONT_BORROW)
  let verdict: VerdictStatus = 'BORROW';
  let verdictTitle = '🟢 Recommended to Borrow';
  let verdictReason = '';
  const verdictDetailedRationale: string[] = [];
  const actionableNextSteps: string[] = [];

  const isDistressDebt =
    input.isPredatoryDebtPresent ||
    (input.existingAvgInterestRatePercent || 0) >= 25 ||
    (input.recentBouncesLast6Months || 0) > 0;

  const isSevereFoir = proposedFoirPercent > 52 || affordability.currentExistingFoir >= 40;
  const isHighLivingCostDeficit =
    affordability.netFreeCashFlow < requestedLoanEmi || stressTest.cashBufferRemaining < 0;

  if (isDistressDebt && (isSevereFoir || input.monthlyNetIncome < 35000)) {
    // 🔴 DONT_BORROW Case (e.g. Anita)
    verdict = 'DONT_BORROW';
    verdictTitle = '🔴 Do Not Borrow / Restructure First';
    verdictReason = `Taking a new loan right now presents a critical debt risk. You have existing high-interest debt (>30% APR), a recent repayment bounce, and tight cash flow. Adding another loan will push your total debt ratio to ${proposedFoirPercent}%, likely triggering a debt trap.`;
    verdictDetailedRationale.push(
      'Existing high-cost instant app debt is draining cash flow through punitive interest rates.',
      'Recent payment bounce signals that monthly obligations are already exceeding reliable income.',
      'Under a modest income drop or household emergency, monthly cash deficit will worsen immediately.'
    );
    actionableNextSteps.push(
      'Prioritize paying off or consolidating the high-interest 30%+ app loans before taking any new debt.',
      'Look into government welfare / microfinance schemes or manufacturer-subsidized asset leases (e.g. battery-as-a-service).',
      'Build a ₹15,000–₹25,000 emergency cash buffer first.'
    );
  } else if (
    input.loanAmountRequested > affordability.safeBorrowerAmountMax ||
    proposedFoirPercent > affordability.safeFoirPct + 3
  ) {
    // 🟡 BORROW LESS Case (e.g. Priya)
    verdict = 'BORROW_LESS';
    verdictTitle = '🟡 Borrow Less for Financial Safety';
    verdictReason = `You asked for ₹${(input.loanAmountRequested / 100000).toFixed(1)}L, but a safer amount for your profile is ₹${(affordability.safeBorrowerAmountMin / 100000).toFixed(1)}L – ₹${(affordability.safeBorrowerAmountMax / 100000).toFixed(1)}L. Your requested loan would push your total debt ratio to ${proposedFoirPercent}%, leaving less breathing room for rent, living expenses, and investments.`;
    verdictDetailedRationale.push(
      `Your existing EMI of ₹${(input.existingMonthlyEmis || 0).toLocaleString('en-IN')} already occupies ${affordability.currentExistingFoir.toFixed(1)}% of your income.`,
      `A commercial bank may willingly sanction up to ₹${(affordability.likelyLenderSanctionMax / 100000).toFixed(1)}L (up to 50% FOIR), but doing so over-leverages your monthly budget.`,
      `Capping the loan to ₹${(affordability.safeBorrowerAmountMax / 100000).toFixed(1)}L keeps your monthly EMI within the safe ₹${affordability.safeNewEmiCapacity.toLocaleString('en-IN')} ceiling.`
    );
    actionableNextSteps.push(
      `Reduce your loan ask to ₹${(affordability.safeBorrowerAmountMax / 100000).toFixed(1)}L, or fund the remainder through savings.`,
      `If you must borrow ₹${(input.loanAmountRequested / 100000).toFixed(1)}L, extend your loan tenure to reduce monthly EMI strain.`,
      'Negotiate strongly on processing fees (<1.0%) given your strong credit score.'
    );
  } else {
    // 🟢 BORROW Case (e.g. Ravi via LAP)
    verdict = 'BORROW';
    verdictTitle = isSecured ? '🟢 Safe to Borrow (via Secured Loan)' : '🟢 Safe to Borrow';
    verdictReason = isSecured
      ? `Your loan request of ₹${(input.loanAmountRequested / 100000).toFixed(1)}L is well-supported when structured as a Secured Loan Against Property (LAP) against your ₹${((input.commercialPropertyAssetValue || 0) / 100000).toFixed(1)}L property asset at ~${fairRateMid}% interest.`
      : `Your requested loan amount of ₹${(input.loanAmountRequested / 100000).toFixed(1)}L is fully within your safe debt ceiling. Total debt obligations will remain at a comfortable ${proposedFoirPercent}% of your net income.`;
    verdictDetailedRationale.push(
      `Your total debt obligations remain well below the conservative ${affordability.safeFoirPct}% FOIR limit.`,
      `Monthly cash buffer of ₹${Math.max(0, affordability.netFreeCashFlow - requestedLoanEmi).toLocaleString('en-IN')} remains intact after all loan EMIs and living expenses.`,
      isSecured
        ? 'Securing the loan against commercial property gives you lower interest rates and a comfortable 10-year repayment horizon.'
        : 'Stable income and repayment capacity provide strong resilience against income shocks.'
    );
    actionableNextSteps.push(
      'Approach top tier lenders and quote your benchmark rate range.',
      'Insist on zero prepayment penalties on floating rate loans (mandated by RBI).',
      'Compare quotes strictly using the All-in APR (including processing fees).'
    );
  }

  // 8. Tenure Comparison Matrix
  const tenureOptions = generateTenureTradeoffs(
    verdict === 'BORROW_LESS' ? affordability.safeBorrowerAmountMax : input.loanAmountRequested,
    fairRateMid,
    affordability.safeNewEmiCapacity,
    affordability.totalIncome,
    input.existingMonthlyEmis || 0,
    isSecured ? 10 : 5
  );

  // 9. Generate Negotiation Card
  const keyStrengths: string[] = [];
  const vulnerabilities: string[] = [];
  const talkingPoints: NegotiationTalkingPoint[] = [];

  if (input.creditScoreBand === 'excellent_750_plus') {
    keyStrengths.push('Prime CIBIL credit score (750+)');
    talkingPoints.push({
      topic: 'Interest Rate Benchmark',
      targetMetric: `${rateResult.fairRateMinPercent}% – ${rateResult.fairRateMaxPercent}%`,
      quoteScript: `"My credit score is 750+ with a zero-default repayment track record. Top-tier banks offer ${rateResult.fairRateMinPercent}%–${rateResult.fairRateMaxPercent}% for prime profiles. If your quote exceeds ${rateResult.fairRateMaxPercent}%, I will evaluate competitive offers."`,
      leverageReason: 'Prime score gives you multi-bank switching power.',
      lenderCounterStrategy: 'Lender may claim internal rate card is fixed; ask to speak with branch sales manager for rate discretion.',
    });
  }

  if (input.incomeType === 'salaried_mnc_govt' && (input.workExperienceYears || 0) >= 3) {
    keyStrengths.push(`${input.workExperienceYears} yrs stable employment with established employer`);
  }

  if (input.commercialPropertyAssetValue && input.commercialPropertyAssetValue >= input.loanAmountRequested * 1.5) {
    keyStrengths.push(`Clear title commercial/residential asset worth ₹${(input.commercialPropertyAssetValue / 100000).toFixed(1)}L`);
    talkingPoints.push({
      topic: 'Secured Structure & Rate Discount',
      targetMetric: '9.25% – 11.25%',
      quoteScript: `"I am pledging unencumbered property worth ₹${(input.commercialPropertyAssetValue / 100000).toFixed(1)}L, giving you an ultra-safe LTV under 40%. I expect standard LAP pricing between 9.5% and 11% rather than high-cost unsecured rates."`,
      leverageReason: 'Very low LTV (<40%) minimizes bank risk.',
      lenderCounterStrategy: 'Lender may try to push expensive unsecured credit for speed; insist on LAP/MSME term loan.',
    });
  }

  if (input.spouseOrCoApplicantIncome && input.spouseOrCoApplicantIncome > 0) {
    keyStrengths.push(`Co-applicant income of ₹${input.spouseOrCoApplicantIncome.toLocaleString('en-IN')}/mo enhances debt service capacity`);
  }

  // Processing Fee talking point
  talkingPoints.push({
    topic: 'Processing Fee & GST Waiver',
    targetMetric: `≤ ${rateResult.estimatedProcessingFeePercent}% (Target: ₹${Math.round((input.loanAmountRequested * rateResult.estimatedProcessingFeePercent) / 100).toLocaleString('en-IN')})`,
    quoteScript: `"I want an all-in APR breakdown. The processing fee must not exceed ${rateResult.estimatedProcessingFeePercent}%, and any administrative charges must be capped. Can you offer a festive/salary fee concession?"`,
    leverageReason: 'Banks frequently waive or halve processing fees to close sales before month-end.',
    lenderCounterStrategy: 'Lenders often bundle hidden documentation charges; ask for the written Key Fact Statement (KFS).',
  });

  if (input.existingMonthlyEmis > 0) {
    vulnerabilities.push(`Existing EMI of ₹${input.existingMonthlyEmis.toLocaleString('en-IN')}/mo reduces disposable buffer`);
  }
  if (input.creditScoreBand === 'unknown') {
    vulnerabilities.push('Bureau credit score not on record; lender will run fresh pull');
  }

  const negotiationCard: NegotiationCardData = {
    borrowerName: input.incomeType === 'salaried_mnc_govt' ? 'Priya' : input.incomeType === 'self_employed_business' ? 'Ravi' : input.incomeType === 'gig_informal_variable' ? 'Anita' : 'Borrower',
    requestedAmount: input.loanAmountRequested,
    safeAmountRecommendation: `₹${(affordability.safeBorrowerAmountMin / 100000).toFixed(1)}L – ₹${(affordability.safeBorrowerAmountMax / 100000).toFixed(1)}L`,
    targetInterestRateBand: `${rateResult.fairRateMinPercent}% – ${rateResult.fairRateMaxPercent}%`,
    maxAcceptableEmi: affordability.safeNewEmiCapacity,
    maxAcceptableProcessingFeePercent: rateResult.estimatedProcessingFeePercent,
    keyStrengths,
    vulnerabilitiesToMitigate: vulnerabilities,
    talkingPoints,
    doNotSignTriggers: [
      `Any quote with nominal interest rate above ${rateResult.fairRateMaxPercent + 1.5}%`,
      `Processing fees and hidden charges exceeding ${rateResult.estimatedProcessingFeePercent + 1.0}% of loan amount`,
      `Any loan with mandatory bundled insurance without written cost-benefit disclosure`,
      `Prepayment penalty clauses on floating rate loans (prohibited under RBI rules)`,
    ],
  };

  return {
    verdict,
    verdictTitle,
    verdictReason,
    verdictDetailedRationale,
    actionableNextSteps,
    likelyLenderSanctionMin: affordability.likelyLenderSanctionMin,
    likelyLenderSanctionMax: affordability.likelyLenderSanctionMax,
    safeBorrowerAmountMin: affordability.safeBorrowerAmountMin,
    safeBorrowerAmountMax: affordability.safeBorrowerAmountMax,
    recommendedAmountAction:
      verdict === 'BORROW_LESS'
        ? 'Use the Safe Borrower Amount (Number B) when applying to prevent financial strain.'
        : verdict === 'DONT_BORROW'
        ? 'Do not take this loan. Clear existing high-rate debt first.'
        : 'You can comfortably borrow up to your requested amount.',
    loanAmountExplainer: affordability.loanAmountExplainer,
    fairRateMinPercent: rateResult.fairRateMinPercent,
    fairRateMaxPercent: rateResult.fairRateMaxPercent,
    estimatedProcessingFeePercent: rateResult.estimatedProcessingFeePercent,
    allInAprMinPercent: rateResult.allInAprMinPercent,
    allInAprMaxPercent: rateResult.allInAprMaxPercent,
    rateConfidence: rateResult.rateConfidence,
    rateConfidenceReason: rateResult.rateConfidenceReason,
    rateExplainer: rateResult.rateExplainer,
    safeEmiCeilingMonthly: affordability.safeNewEmiCapacity,
    lenderMaxEmiMonthly: affordability.lenderNewEmiCapacity,
    safeFoirPercent: affordability.safeFoirPct,
    currentExistingFoirPercent: Number(affordability.currentExistingFoir.toFixed(1)),
    proposedFoirPercent,
    recommendedTenureYears: baseTenureYears,
    tenureOptions,
    emiExplainer: affordability.emiExplainer,
    stressTest,
    productRecommendation,
    confidenceScore: confidence.confidenceScore,
    confidenceReasons: confidence.confidenceReasons,
    missingDataWarnings: confidence.missingDataWarnings,
    negotiationCard,
  };
}
