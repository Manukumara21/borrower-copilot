import { BorrowerInput, NumberExplainer, TenureOption } from '../types/borrower';
import { LENDING_CONSTANTS } from '../data/assumptions';

/**
 * Calculates standard reducing balance monthly EMI
 * P = Principal in INR
 * annualRatePct = Annual interest rate in % (e.g. 12.5)
 * tenureMonths = Tenure in months
 */
export function calculateMonthlyEmi(
  principal: number,
  annualRatePct: number,
  tenureMonths: number
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePct <= 0) return Math.round(principal / tenureMonths);

  const monthlyRate = annualRatePct / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

/**
 * Calculates maximum loan principal that can be supported by a given monthly EMI
 */
export function calculatePrincipalFromEmi(
  monthlyEmi: number,
  annualRatePct: number,
  tenureMonths: number
): number {
  if (monthlyEmi <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePct <= 0) return Math.round(monthlyEmi * tenureMonths);

  const monthlyRate = annualRatePct / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const principal = (monthlyEmi * (factor - 1)) / (monthlyRate * factor);
  return Math.round(principal);
}

/**
 * Determines Safe and Aggressive (Lender) FOIR limits based on borrower profile
 */
export function getFoirThresholds(input: BorrowerInput): {
  safeFoirPct: number;
  lenderFoirPct: number;
} {
  const totalIncome = input.monthlyNetIncome + (input.spouseOrCoApplicantIncome || 0);

  let safeFoirPct = 35; // default 35% safe limit
  let lenderFoirPct = 50; // default 50% bank standard

  // Adjust for income bracket, employment type, and loan purpose
  // Consumption loans (wedding, personal, lifestyle) warrant conservative 30% FOIR
  const isConsumption =
    input.purpose === 'wedding' ||
    input.purpose === 'consumer_goods' ||
    input.purpose === 'other';

  if (totalIncome < 30000) {
    safeFoirPct = 26;
    lenderFoirPct = 40;
  } else if (input.incomeType === 'gig_informal_variable') {
    safeFoirPct = 28;
    lenderFoirPct = 42;
  } else if (input.incomeType === 'self_employed_business') {
    safeFoirPct = 32;
    lenderFoirPct = 48;
  } else if (input.incomeType === 'salaried_mnc_govt') {
    safeFoirPct = isConsumption ? 30 : 35;
    lenderFoirPct = 50;
  } else {
    safeFoirPct = isConsumption ? 28 : 33;
    lenderFoirPct = 48;
  }

  // If living expenses exceed 25% of income (e.g. Bengaluru/Mumbai rent), tighten safe FOIR by 2%
  if (input.monthlyHouseholdExpenses > totalIncome * 0.25) {
    safeFoirPct = Math.max(25, safeFoirPct - 1.5);
  }

  return { safeFoirPct, lenderFoirPct };
}

/**
 * Evaluates affordability, EMI capacities, and generates step-by-step explainers
 */
export function evaluateAffordability(
  input: BorrowerInput,
  fairRateMid: number,
  tenureYears: number
) {
  const totalIncome = input.monthlyNetIncome + (input.spouseOrCoApplicantIncome || 0);
  const { safeFoirPct, lenderFoirPct } = getFoirThresholds(input);

  const existingEmis = input.existingMonthlyEmis || 0;
  const currentExistingFoir = totalIncome > 0 ? (existingEmis / totalIncome) * 100 : 0;

  // Maximum total EMI allowed under Safe and Lender criteria
  const safeTotalDebtCapacity = Math.round(totalIncome * (safeFoirPct / 100));
  const lenderTotalDebtCapacity = Math.round(totalIncome * (lenderFoirPct / 100));

  // Net remaining monthly capacity for NEW loan
  const safeNewEmiCapacity = Math.max(0, safeTotalDebtCapacity - existingEmis);
  const lenderNewEmiCapacity = Math.max(0, lenderTotalDebtCapacity - existingEmis);

  // Free cash flow check after living expenses
  const declaredExpenses = input.monthlyHouseholdExpenses || 0;
  const netFreeCashFlow = totalIncome - declaredExpenses - existingEmis;

  // Compute Loan Amount bounds
  const tenureMonths = tenureYears * 12;
  const safeLoanAmountMid = calculatePrincipalFromEmi(safeNewEmiCapacity, fairRateMid, tenureMonths);
  const lenderLoanAmountMid = calculatePrincipalFromEmi(lenderNewEmiCapacity, fairRateMid, tenureMonths);

  // Format bands (±8% spread to avoid fake precision)
  const safeBorrowerAmountMin = Math.round((safeLoanAmountMid * 0.92) / 10000) * 10000;
  const safeBorrowerAmountMax = Math.round((safeLoanAmountMid * 1.08) / 10000) * 10000;

  const likelyLenderSanctionMin = Math.round((lenderLoanAmountMid * 0.92) / 10000) * 10000;
  const likelyLenderSanctionMax = Math.round((lenderLoanAmountMid * 1.08) / 10000) * 10000;

  // Explainer for Loan Amount
  const loanAmountExplainer: NumberExplainer = {
    title: 'How Loan Amounts Were Calculated',
    oneSentenceSummary:
      'Lenders look at maximum debt capacity (up to 50% FOIR), while our safe recommendation protects your emergency savings and living expenses (capped at 30-35% FOIR).',
    steps: [
      {
        label: 'Total Net Monthly Income',
        value: `₹${totalIncome.toLocaleString('en-IN')}`,
        formulaOrDetail: input.spouseOrCoApplicantIncome
          ? `₹${input.monthlyNetIncome.toLocaleString('en-IN')} (Primary) + ₹${input.spouseOrCoApplicantIncome.toLocaleString('en-IN')} (Co-applicant)`
          : 'Net in-hand take-home income',
      },
      {
        label: 'Existing Monthly EMIs',
        value: `-₹${existingEmis.toLocaleString('en-IN')}`,
        isNegative: true,
        formulaOrDetail: `${currentExistingFoir.toFixed(1)}% of income already committed to prior loans`,
      },
      {
        label: 'Safe Debt Capacity (32–35% FOIR)',
        value: `₹${safeTotalDebtCapacity.toLocaleString('en-IN')}`,
        formulaOrDetail: `Conservative limit to ensure cash flow safety`,
      },
      {
        label: 'Safe Monthly EMI Room for New Loan',
        value: `₹${safeNewEmiCapacity.toLocaleString('en-IN')}`,
        formulaOrDetail: `₹${safeTotalDebtCapacity.toLocaleString('en-IN')} - ₹${existingEmis.toLocaleString('en-IN')}`,
      },
      {
        label: 'Resulting Safe Loan Ceiling',
        value: `₹${(safeBorrowerAmountMin / 100000).toFixed(1)}L – ₹${(safeBorrowerAmountMax / 100000).toFixed(1)}L`,
        isHighlight: true,
        formulaOrDetail: `Principal supported by ₹${safeNewEmiCapacity.toLocaleString('en-IN')}/mo at ~${fairRateMid}% over ${tenureYears} yrs`,
      },
      {
        label: 'Lender Maximum Sanction (50% FOIR)',
        value: `₹${(likelyLenderSanctionMin / 100000).toFixed(1)}L – ₹${(likelyLenderSanctionMax / 100000).toFixed(1)}L`,
        formulaOrDetail: `Commercial bank aggressive underwriting ceiling (often over-leverages borrower)`,
      },
    ],
    ruleReference:
      'FOIR (Fixed Obligation to Income Ratio) Rule: Conservative 30–35% vs Commercial Bank 50%',
  };

  // Explainer for Safe EMI Ceiling
  const emiExplainer: NumberExplainer = {
    title: 'How Safe EMI Ceiling Was Determined',
    oneSentenceSummary:
      'Your safe EMI ceiling ensures your total monthly debt payments never exceed sustainable cash flow limits.',
    steps: [
      {
        label: 'Monthly Net Income',
        value: `₹${totalIncome.toLocaleString('en-IN')}`,
      },
      {
        label: `Safe Debt Cap (${safeFoirPct}%)`,
        value: `₹${safeTotalDebtCapacity.toLocaleString('en-IN')}`,
        formulaOrDetail: `Income × ${safeFoirPct}%`,
      },
      {
        label: 'Current Existing EMIs',
        value: `-₹${existingEmis.toLocaleString('en-IN')}`,
        isNegative: true,
      },
      {
        label: 'Maximum Safe New EMI',
        value: `₹${safeNewEmiCapacity.toLocaleString('en-IN')}`,
        isHighlight: true,
        formulaOrDetail: 'We advise keeping any new loan quote at or below this monthly figure.',
      },
      {
        label: 'Free Monthly Cash Buffer After All Bills',
        value: `₹${Math.max(0, netFreeCashFlow - safeNewEmiCapacity).toLocaleString('en-IN')}`,
        formulaOrDetail: `Income - Living Expenses - All EMIs = Emergency Savings buffer`,
      },
    ],
    ruleReference: 'Affordability & Cash Flow Buffer Principle',
  };

  return {
    totalIncome,
    safeFoirPct,
    lenderFoirPct,
    existingEmis,
    currentExistingFoir,
    safeTotalDebtCapacity,
    lenderTotalDebtCapacity,
    safeNewEmiCapacity,
    lenderNewEmiCapacity,
    netFreeCashFlow,
    safeBorrowerAmountMin,
    safeBorrowerAmountMax,
    likelyLenderSanctionMin,
    likelyLenderSanctionMax,
    loanAmountExplainer,
    emiExplainer,
  };
}

/**
 * Builds tenure trade-off matrix (2, 3, 4, 5+ yrs) showing monthly EMI vs Total Interest Paid
 */
export function generateTenureTradeoffs(
  loanAmount: number,
  annualRatePct: number,
  safeEmiCeiling: number,
  totalIncome: number,
  existingEmis: number,
  maxTenureYears: number = 5
): TenureOption[] {
  const yearsList = maxTenureYears >= 10 ? [3, 5, 7, 10] : [2, 3, 4, 5];

  return yearsList.map((yrs) => {
    const months = yrs * 12;
    const emi = calculateMonthlyEmi(loanAmount, annualRatePct, months);
    const totalPayment = emi * months;
    const totalInterestPaid = Math.max(0, totalPayment - loanAmount);
    const totalObligation = emi + existingEmis;
    const foirPercent = totalIncome > 0 ? (totalObligation / totalIncome) * 100 : 0;

    const isWithinSafeEmi = emi <= safeEmiCeiling * 1.05; // 5% grace
    const isReasonableTenure = yrs >= 3 && yrs <= 4;
    const isRecommended = isWithinSafeEmi && (isReasonableTenure || yrs === yearsList[0]);

    let warningNote: string | undefined;
    if (emi > safeEmiCeiling * 1.15) {
      warningNote = '⚠️ Exceeds safe monthly EMI capacity';
    } else if (yrs >= 5 && maxTenureYears <= 5) {
      warningNote = '💡 High total interest burden for unsecured loan';
    }

    return {
      tenureYears: yrs,
      tenureMonths: months,
      monthlyEmi: emi,
      totalInterestPaid,
      totalPayment,
      foirPercent,
      isRecommended,
      warningNote,
    };
  });
}
