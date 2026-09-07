// Domain Types for Borrower Copilot

export type LoanPurpose =
  | 'wedding'
  | 'business_expansion'
  | 'vehicle_scooter'
  | 'home_renovation'
  | 'medical_emergency'
  | 'debt_consolidation'
  | 'education'
  | 'consumer_goods'
  | 'other';

export type IncomeType =
  | 'salaried_mnc_govt'
  | 'salaried_private_sme'
  | 'self_employed_business'
  | 'gig_informal_variable';

export type CreditScoreBand =
  | 'excellent_750_plus'
  | 'good_700_749'
  | 'fair_650_699'
  | 'poor_below_650'
  | 'unknown';

export type LoanProductType =
  | 'personal_loan_unsecured'
  | 'loan_against_property_lap'
  | 'business_loan_secured'
  | 'two_wheeler_loan'
  | 'gold_loan'
  | 'digital_app_loan';

export interface BorrowerInput {
  // --- MUST Questions (8 Core) ---
  purpose: LoanPurpose;
  loanAmountRequested: number; // in INR
  incomeType: IncomeType;
  monthlyNetIncome: number; // in INR take-home
  existingMonthlyEmis: number; // in INR
  monthlyHouseholdExpenses: number; // in INR (rent, food, bills)
  age: number;
  creditScoreBand: CreditScoreBand;

  // --- ADAPTIVE Questions (Context-specific) ---
  // Salaried specifics
  workExperienceYears?: number; // e.g. 5 yrs
  employerTier?: 'top_mnc_govt' | 'established_mid' | 'early_startup_unlisted';

  // Self-Employed / Kirana / Business specifics
  businessVintageYears?: number; // e.g. 14 yrs
  itrReportedAnnualIncome?: number; // e.g. ₹4,20,000/yr
  commercialPropertyAssetValue?: number; // e.g. ₹45,00,000 for shop
  isCashIncomeHeavy?: boolean;

  // Existing debt & repayment specifics
  existingLoanCount?: number;
  existingAvgInterestRatePercent?: number; // e.g. 30% for app loans
  recentBouncesLast6Months?: number; // e.g. 1
  isPredatoryDebtPresent?: boolean;

  // Household & Co-borrower
  spouseOrCoApplicantIncome?: number; // e.g. ₹18,000
  dependentsCount?: number;
  isSpouseUnemployed?: boolean;
}

export type VerdictStatus = 'BORROW' | 'BORROW_LESS' | 'DONT_BORROW';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface TenureOption {
  tenureYears: number;
  tenureMonths: number;
  monthlyEmi: number;
  totalInterestPaid: number;
  totalPayment: number;
  foirPercent: number;
  isRecommended: boolean;
  warningNote?: string;
}

export interface ExplainerStep {
  label: string;
  value: string;
  formulaOrDetail?: string;
  isNegative?: boolean;
  isHighlight?: boolean;
}

export interface NumberExplainer {
  title: string;
  oneSentenceSummary: string;
  steps: ExplainerStep[];
  ruleReference: string;
}

export interface ProductRecommendation {
  primaryProduct: LoanProductType;
  productTitle: string;
  isRoutedToSecured: boolean;
  routingReason: string;
  alternativeProduct?: string;
  ltvPercent?: number;
}

export interface StressScenarioResult {
  shockType: 'income_drop_20' | 'rate_hike_200bps' | 'custom_shock';
  originalIncome: number;
  stressedIncome: number;
  stressedEmi: number;
  stressedFoirPercent: number;
  safeLimitFoirPercent: number;
  isManageable: boolean;
  stressVerdictText: string;
  cashBufferRemaining: number;
}

export interface NegotiationTalkingPoint {
  topic: string;
  quoteScript: string;
  targetMetric: string;
  leverageReason: string;
  lenderCounterStrategy: string;
}

export interface NegotiationCardData {
  borrowerName?: string;
  requestedAmount: number;
  safeAmountRecommendation: string;
  targetInterestRateBand: string;
  maxAcceptableEmi: number;
  maxAcceptableProcessingFeePercent: number;
  keyStrengths: string[];
  vulnerabilitiesToMitigate: string[];
  talkingPoints: NegotiationTalkingPoint[];
  doNotSignTriggers: string[];
}

export interface EvaluationResult {
  // Output 1 — Verdict
  verdict: VerdictStatus;
  verdictTitle: string;
  verdictReason: string;
  verdictDetailedRationale: string[];
  actionableNextSteps: string[];

  // Output 2 — Loan Amount
  likelyLenderSanctionMin: number;
  likelyLenderSanctionMax: number;
  safeBorrowerAmountMin: number;
  safeBorrowerAmountMax: number;
  recommendedAmountAction: string;
  loanAmountExplainer: NumberExplainer;

  // Output 3 — Fair Interest Rate & All-in APR
  fairRateMinPercent: number;
  fairRateMaxPercent: number;
  estimatedProcessingFeePercent: number;
  allInAprMinPercent: number;
  allInAprMaxPercent: number;
  rateConfidence: ConfidenceLevel;
  rateConfidenceReason: string;
  rateExplainer: NumberExplainer;

  // Output 4 — Safe EMI Ceiling & Tenure Comparison
  safeEmiCeilingMonthly: number;
  lenderMaxEmiMonthly: number;
  safeFoirPercent: number;
  currentExistingFoirPercent: number;
  proposedFoirPercent: number;
  recommendedTenureYears: number;
  tenureOptions: TenureOption[];
  emiExplainer: NumberExplainer;

  // Stress Test
  stressTest: StressScenarioResult;

  // Product Routing (e.g. Secured LAP for Ravi)
  productRecommendation: ProductRecommendation;

  // Confidence & Transparency ("Confidence widens with silence")
  confidenceScore: ConfidenceLevel;
  confidenceReasons: string[];
  missingDataWarnings: string[];

  // Negotiation Card
  negotiationCard: NegotiationCardData;
}
