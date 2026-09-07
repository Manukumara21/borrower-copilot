import { BorrowerInput } from '../types/borrower';

export interface QuestionOption {
  label: string;
  value: any;
  description?: string;
  icon?: string;
}

export interface QuestionDefinition {
  id: keyof BorrowerInput | string;
  stepNumber: number;
  isMust: boolean;
  category: 'purpose' | 'income' | 'debt' | 'profile' | 'adaptive';
  title: string;
  subtitle: string;
  type: 'select' | 'currency' | 'number' | 'radio' | 'boolean';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
  placeholder?: string;
  impactNote: string; // Explains what calculation this question changes
  shouldShow?: (answers: Partial<BorrowerInput>) => boolean;
}

export const QUESTION_FLOW: QuestionDefinition[] = [
  // --- MUST QUESTION 1: Loan Purpose ---
  {
    id: 'purpose',
    stepNumber: 1,
    isMust: true,
    category: 'purpose',
    title: 'What are you borrowing for?',
    subtitle: 'Lenders and safety benchmarks treat productive vs consumption loans differently.',
    type: 'select',
    impactNote: 'Drives product routing (e.g. Asset-backed vehicle loan vs LAP vs consumption Personal Loan).',
    options: [
      { label: 'Wedding / Social Event', value: 'wedding', icon: '💍', description: 'Consumption loan; conservative borrowing ceiling recommended' },
      { label: 'Business Expansion / Stock', value: 'business_expansion', icon: '🏪', description: 'Productive loan; eligible for business/LAP secured routing' },
      { label: 'Vehicle / Electric Scooter', value: 'vehicle_scooter', icon: '🛵', description: 'Asset-tied loan; eligible for lower hypothecation rates' },
      { label: 'Home Renovation / Purchase', value: 'home_renovation', icon: '🏡', description: 'Real estate asset improvement' },
      { label: 'Debt Consolidation', value: 'debt_consolidation', icon: '🔄', description: 'Clearing high-cost debt into single low-rate loan' },
      { label: 'Medical / Emergency', value: 'medical_emergency', icon: '🏥', description: 'Urgent liquidity need' },
      { label: 'Other Personal Need', value: 'other', icon: '💳', description: 'General personal financing' },
    ],
    defaultValue: 'personal_loan_unsecured',
  },

  // --- MUST QUESTION 2: Amount Wanted ---
  {
    id: 'loanAmountRequested',
    stepNumber: 2,
    isMust: true,
    category: 'purpose',
    title: 'How much money do you want to borrow?',
    subtitle: 'Enter the target loan principal in Indian Rupees (₹).',
    type: 'currency',
    min: 10000,
    max: 50000000,
    step: 10000,
    defaultValue: 500000,
    placeholder: 'e.g. ₹5,00,000',
    impactNote: 'Sets the benchmark for FOIR calculations, monthly EMI, and loan amount comparison.',
  },

  // --- MUST QUESTION 3: Income Type ---
  {
    id: 'incomeType',
    stepNumber: 3,
    isMust: true,
    category: 'income',
    title: 'What type of income do you earn?',
    subtitle: 'Underwriting models use different documentation and FOIR rules for each employment category.',
    type: 'select',
    impactNote: 'Determines baseline interest rate tier, FOIR debt caps (30% vs 35%), and adaptive questions.',
    options: [
      {
        label: 'Salaried (Top MNC / Govt / Listed Corporate)',
        value: 'salaried_mnc_govt',
        icon: '🏢',
        description: 'Consistent monthly payslip and Form 16',
      },
      {
        label: 'Salaried (Private Firm / SME / Startup)',
        value: 'salaried_private_sme',
        icon: '💼',
        description: 'Regular salary with private employer',
      },
      {
        label: 'Self-Employed (Business / Kirana / Trader)',
        value: 'self_employed_business',
        icon: '🏪',
        description: 'Income derived from own business / shop / trade',
      },
      {
        label: 'Gig Worker / Freelancer / Informal Cash',
        value: 'gig_informal_variable',
        icon: '🛵',
        description: 'Platform delivery, rideshare, tailoring, or variable cash income',
      },
    ],
    defaultValue: 'salaried_mnc_govt',
  },

  // --- MUST QUESTION 4: Net Monthly Income ---
  {
    id: 'monthlyNetIncome',
    stepNumber: 4,
    isMust: true,
    category: 'income',
    title: 'What is your net monthly take-home income?',
    subtitle: 'In-hand amount deposited in your bank account or average monthly cash earnings in ₹.',
    type: 'currency',
    min: 10000,
    max: 2000000,
    step: 5000,
    defaultValue: 80000,
    placeholder: 'e.g. ₹80,000',
    impactNote: 'The primary denominator in all FOIR, maximum sanction, and safe EMI calculations.',
  },

  // --- MUST QUESTION 5: Existing EMIs ---
  {
    id: 'existingMonthlyEmis',
    stepNumber: 5,
    isMust: true,
    category: 'debt',
    title: 'How much do you pay in existing monthly EMIs?',
    subtitle: 'Sum of all active car loans, home loans, personal loans, or app EMIs.',
    type: 'currency',
    min: 0,
    max: 1000000,
    step: 1000,
    defaultValue: 0,
    placeholder: 'e.g. ₹14,000 (Enter 0 if none)',
    impactNote: 'Directly deducted from your allowable FOIR debt capacity to determine safe room for new EMI.',
  },

  // --- MUST QUESTION 6: Monthly Household Expenses ---
  {
    id: 'monthlyHouseholdExpenses',
    stepNumber: 6,
    isMust: true,
    category: 'income',
    title: 'What are your monthly household living expenses?',
    subtitle: 'Rent, groceries, utilities, school fees, transport, and insurance.',
    type: 'currency',
    min: 0,
    max: 1000000,
    step: 2000,
    defaultValue: 30000,
    placeholder: 'e.g. ₹28,000',
    impactNote: 'Ensures safe free cash flow buffer after all living costs and loan EMIs.',
  },

  // --- MUST QUESTION 7: Age ---
  {
    id: 'age',
    stepNumber: 7,
    isMust: true,
    category: 'profile',
    title: 'What is your age?',
    subtitle: 'Lenders restrict maximum loan tenure so that the loan finishes before retirement age (60–65 yrs).',
    type: 'number',
    min: 21,
    max: 75,
    step: 1,
    defaultValue: 30,
    placeholder: 'e.g. 29',
    impactNote: 'Validates maximum allowable loan tenure and life-stage risk factors.',
  },

  // --- MUST QUESTION 8: Credit Score ---
  {
    id: 'creditScoreBand',
    stepNumber: 8,
    isMust: true,
    category: 'profile',
    title: 'What is your Credit Score (CIBIL / Experian)?',
    subtitle: 'Select your score bracket. "Unknown" is never penalized to zero—it widens the rate band.',
    type: 'select',
    impactNote: 'Directly dictates the interest rate pricing tier and confidence rating.',
    options: [
      { label: '750+ (Excellent / Prime)', value: 'excellent_750_plus', icon: '🌟', description: 'Lowest bank rates (10.5%–12.5%)' },
      { label: '700 – 749 (Good)', value: 'good_700_749', icon: '👍', description: 'Standard market rates (+1.25% spread)' },
      { label: '650 – 699 (Fair / Average)', value: 'fair_650_699', icon: '⚖️', description: 'Mid-tier rates (+3.5% spread)' },
      { label: 'Below 650 (Poor / High Risk)', value: 'poor_below_650', icon: '⚠️', description: 'Non-prime NBFC rates or rejection risk' },
      { label: 'I Don\'t Know / Never Checked', value: 'unknown', icon: '❓', description: 'Unknown is never zero: rate band is widened with lower confidence' },
    ],
    defaultValue: 'excellent_750_plus',
  },

  // --- ADAPTIVE QUESTION A1 (Salaried Only): Experience ---
  {
    id: 'workExperienceYears',
    stepNumber: 9,
    isMust: false,
    category: 'adaptive',
    title: 'How many years of total work experience do you have?',
    subtitle: 'Stable employment history improves credit confidence with prime lenders.',
    type: 'number',
    min: 0,
    max: 40,
    step: 1,
    defaultValue: 5,
    placeholder: 'e.g. 5',
    impactNote: 'Experience >= 4 yrs qualifies for interest rate discounts up to 0.5% and boosts confidence to HIGH.',
    shouldShow: (answers) =>
      answers.incomeType === 'salaried_mnc_govt' || answers.incomeType === 'salaried_private_sme',
  },

  // --- ADAPTIVE QUESTION A2 (Self-Employed Only): Business Vintage & Owned Shop/Asset ---
  {
    id: 'businessVintageYears',
    stepNumber: 10,
    isMust: false,
    category: 'adaptive',
    title: 'How many years has your business or shop been running?',
    subtitle: 'Vintage proves commercial stability to banks.',
    type: 'number',
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 10,
    placeholder: 'e.g. 14',
    impactNote: 'Vintage > 5 yrs lowers business risk premium by 0.75%.',
    shouldShow: (answers) => answers.incomeType === 'self_employed_business',
  },

  {
    id: 'commercialPropertyAssetValue',
    stepNumber: 11,
    isMust: false,
    category: 'adaptive',
    title: 'Do you own a shop, commercial property, or house? (Value in ₹)',
    subtitle: 'Owning unencumbered property enables routing to Secured LAP with much lower interest rates.',
    type: 'currency',
    min: 0,
    max: 100000000,
    step: 100000,
    defaultValue: 0,
    placeholder: 'e.g. ₹45,00,000 (Enter 0 if none)',
    impactNote: 'If property value >= 1.5x loan amount, routes to Secured LAP at ~9.5%–11.5% with 10-yr tenure.',
    shouldShow: (answers) =>
      answers.incomeType === 'self_employed_business' ||
      answers.incomeType === 'gig_informal_variable' ||
      (answers.loanAmountRequested || 0) >= 800000,
  },

  // --- ADAPTIVE QUESTION A3 (Debt Details & Bounces): If Existing EMIs > 0 ---
  {
    id: 'existingAvgInterestRatePercent',
    stepNumber: 12,
    isMust: false,
    category: 'adaptive',
    title: 'What is the approximate interest rate on your current loans?',
    subtitle: 'Helps detect high-interest predatory app loans vs standard bank debt.',
    type: 'number',
    min: 5,
    max: 60,
    step: 1,
    defaultValue: 12,
    placeholder: 'e.g. 12% (or 33% for instant app loans)',
    impactNote: 'Rates >= 25% flag predatory debt distress and trigger debt restructuring / DO NOT BORROW advice.',
    shouldShow: (answers) => (answers.existingMonthlyEmis || 0) > 0,
  },

  {
    id: 'recentBouncesLast6Months',
    stepNumber: 13,
    isMust: false,
    category: 'adaptive',
    title: 'Have you had any ECS/NACH loan EMI payment bounces in the last 6 months?',
    subtitle: 'Payment bounces are the #1 red flag in lender bureau pulls.',
    type: 'number',
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 0,
    placeholder: 'e.g. 0 or 1',
    impactNote: 'Recent bounces add +2% to +3.5% risk spread and can trigger "Do Not Borrow" on high debt ratios.',
    shouldShow: (answers) => (answers.existingMonthlyEmis || 0) > 0,
  },

  // --- ADAPTIVE QUESTION A4 (Household Co-Applicant): Spouse / Co-Earner ---
  {
    id: 'spouseOrCoApplicantIncome',
    stepNumber: 14,
    isMust: false,
    category: 'adaptive',
    title: 'Does your spouse or family member earn income to co-apply? (₹/mo)',
    subtitle: 'Co-applicant income directly expands household debt service capacity.',
    type: 'currency',
    min: 0,
    max: 1000000,
    step: 5000,
    defaultValue: 0,
    placeholder: 'e.g. ₹18,000 (Enter 0 if none)',
    impactNote: 'Adds to total household debt servicing pool, expanding safe loan sanction limits.',
  },
];
