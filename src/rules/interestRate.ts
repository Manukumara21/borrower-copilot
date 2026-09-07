import { BorrowerInput, ConfidenceLevel, NumberExplainer } from '../types/borrower';
import { LENDING_CONSTANTS } from '../data/assumptions';

/**
 * Calculates RBI-style All-in APR (Annual Percentage Rate) including Processing Fees + GST
 * Uses Newton-Raphson approximation for Internal Rate of Return (IRR)
 */
export function calculateAllInApr(
  principal: number,
  nominalAnnualRatePct: number,
  tenureMonths: number,
  processingFeePct: number
): number {
  if (principal <= 0 || tenureMonths <= 0) return nominalAnnualRatePct;

  const feeAmount = principal * (processingFeePct / 100);
  const gstAmount = feeAmount * (LENDING_CONSTANTS.FEES.GST_ON_FEES_PCT / 100);
  const totalUpfrontFees = feeAmount + gstAmount;
  const netDisbursement = principal - totalUpfrontFees;

  // Monthly EMI based on nominal rate
  const monthlyRateNominal = nominalAnnualRatePct / (12 * 100);
  const factor = Math.pow(1 + monthlyRateNominal, tenureMonths);
  const emi = (principal * monthlyRateNominal * factor) / (factor - 1);

  // Approximate IRR: rate equating netDisbursement to stream of monthly EMIs
  let r = monthlyRateNominal;
  for (let i = 0; i < 20; i++) {
    const f_r = (emi * (1 - Math.pow(1 + r, -tenureMonths))) / r - netDisbursement;
    const f_prime_r =
      emi *
      ((tenureMonths * Math.pow(1 + r, -tenureMonths - 1)) / r -
        (1 - Math.pow(1 + r, -tenureMonths)) / (r * r));

    const nextR = r - f_r / f_prime_r;
    if (Math.abs(nextR - r) < 1e-6) {
      r = nextR;
      break;
    }
    r = nextR;
  }

  const annualApr = r * 12 * 100;
  return Number.isFinite(annualApr) && annualApr > 0
    ? Number(annualApr.toFixed(2))
    : Number((nominalAnnualRatePct + (totalUpfrontFees / principal / (tenureMonths / 12)) * 100).toFixed(2));
}

/**
 * Estimates fair interest rate band and all-in APR based on borrower inputs
 */
export function evaluateInterestRateAndApr(
  input: BorrowerInput,
  isSecuredProduct: boolean = false
) {
  let baseMin = isSecuredProduct ? 9.25 : 10.75;
  let baseMax = isSecuredProduct ? 11.25 : 12.75;
  let feePct = isSecuredProduct ? 0.75 : 1.25;

  let rateConfidence: ConfidenceLevel = 'HIGH';
  const confidenceNotes: string[] = [];

  // 1. Credit Score Influence ("Unknown is never zero")
  switch (input.creditScoreBand) {
    case 'excellent_750_plus':
      // Prime rates
      confidenceNotes.push('Prime CIBIL 750+ score qualifies for lowest tier bank pricing');
      break;
    case 'good_700_749':
      baseMin += 1.0;
      baseMax += 1.5;
      confidenceNotes.push('Good credit score (700–749), standard tier pricing');
      break;
    case 'fair_650_699':
      baseMin += 2.5;
      baseMax += 4.0;
      feePct += 0.5;
      rateConfidence = 'MEDIUM';
      confidenceNotes.push('Average credit history (650–699), higher risk premium applies');
      break;
    case 'poor_below_650':
      baseMin += 5.0;
      baseMax += 8.0;
      feePct += 1.0;
      rateConfidence = 'LOW';
      confidenceNotes.push('Credit score below 650 triggers NBFC non-prime pricing');
      break;
    case 'unknown':
      // Widen the band rather than assuming 0 or 300
      baseMin -= 0.5;
      baseMax += 2.5;
      rateConfidence = 'LOW';
      confidenceNotes.push('Credit score unknown: Rate range widened to account for bureau variance');
      break;
  }

  // 2. Employment & Income Stability Influence
  if (input.incomeType === 'salaried_mnc_govt') {
    if ((input.workExperienceYears || 0) >= 4) {
      baseMin = Math.max(isSecuredProduct ? 9.0 : 10.5, baseMin - 0.5);
      baseMax = Math.max(isSecuredProduct ? 11.0 : 12.25, baseMax - 0.5);
    }
  } else if (input.incomeType === 'self_employed_business') {
    if (!isSecuredProduct) {
      baseMin += 1.5;
      baseMax += 2.5;
    }
    if ((input.businessVintageYears || 0) >= 5) {
      baseMax -= 0.75;
      confidenceNotes.push('Established business vintage (>5 yrs) improves lender confidence');
    }
  } else if (input.incomeType === 'gig_informal_variable') {
    baseMin += 2.5;
    baseMax += 4.5;
    rateConfidence = 'LOW';
    confidenceNotes.push('Informal / gig income has higher cash-flow volatility premium');
  }

  // 3. Past Bounces & Distress Debt
  if ((input.recentBouncesLast6Months || 0) > 0) {
    baseMin += 2.0;
    baseMax += 3.5;
    feePct += 0.5;
    confidenceNotes.push('Recent EMI bounce in last 6 months adds risk spread');
  }

  const fairRateMinPercent = Number(baseMin.toFixed(2));
  const fairRateMaxPercent = Number(baseMax.toFixed(2));
  const estimatedProcessingFeePercent = Number(feePct.toFixed(2));

  // Compute All-in APR for mid-rate over 36 months (or 60 months if secured)
  const tenureMonths = isSecuredProduct ? 60 : 36;
  const allInAprMinPercent = calculateAllInApr(
    input.loanAmountRequested,
    fairRateMinPercent,
    tenureMonths,
    estimatedProcessingFeePercent
  );
  const allInAprMaxPercent = calculateAllInApr(
    input.loanAmountRequested,
    fairRateMaxPercent,
    tenureMonths,
    estimatedProcessingFeePercent
  );

  // Rate Explainer
  const rateExplainer: NumberExplainer = {
    title: 'How Fair Rate Band & All-in APR Were Determined',
    oneSentenceSummary:
      'We calculate your fair interest rate based on verified creditworthiness, employer stability, and all-in upfront fees.',
    steps: [
      {
        label: 'Base Benchmark Rate',
        value: isSecuredProduct ? '9.25%' : '10.75%',
        formulaOrDetail: isSecuredProduct ? 'Secured Loan Against Property / Asset benchmark' : 'Prime Salaried Personal Loan benchmark',
      },
      {
        label: 'Credit Score Adjustment',
        value: input.creditScoreBand === 'unknown' ? '±2.5% (Band Widened)' : input.creditScoreBand === 'excellent_750_plus' ? '0.0% (Prime Tier)' : `+${(fairRateMinPercent - (isSecuredProduct ? 9.25 : 10.75)).toFixed(1)}%`,
        formulaOrDetail: input.creditScoreBand === 'unknown' ? 'Unknown is never zero: range is widened rather than penalized.' : 'Risk premium based on CIBIL bracket',
      },
      {
        label: 'Estimated Fair Interest Rate Band',
        value: `${fairRateMinPercent}% – ${fairRateMaxPercent}%`,
        isHighlight: true,
        formulaOrDetail: 'Nominal reducing balance interest rate you should target',
      },
      {
        label: 'Standard Processing Fee (+18% GST)',
        value: `${estimatedProcessingFeePercent}% + GST`,
        formulaOrDetail: `Upfront one-time fee deducted from loan disbursement`,
      },
      {
        label: 'RBI-Style True All-in APR',
        value: `${allInAprMinPercent}% – ${allInAprMaxPercent}%`,
        isHighlight: true,
        formulaOrDetail: 'True effective annual borrowing cost once upfront fees & GST are amortized',
      },
    ],
    ruleReference: 'Risk-Based Lending Pricing & RBI APR Transparency Directive',
  };

  return {
    fairRateMinPercent,
    fairRateMaxPercent,
    estimatedProcessingFeePercent,
    allInAprMinPercent,
    allInAprMaxPercent,
    rateConfidence,
    rateConfidenceReason: confidenceNotes.join(' · '),
    rateExplainer,
  };
}
