import { BorrowerInput } from '../types/borrower';

export interface PersonaPreset {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  city: string;
  description: string;
  data: BorrowerInput;
  keyEvaluationNote: string;
}

export const PERSONAS: PersonaPreset[] = [
  {
    id: 'priya',
    name: 'Priya',
    tagline: '29 yrs · Bengaluru · Salaried MNC Software Engineer',
    avatar: '👩‍💻',
    city: 'Bengaluru',
    description:
      'High earner (₹1.10L/mo) with prime credit score (780) and 5 yrs at large MNC. Carries existing ₹14k car EMI. Wants ₹8L personal loan for a wedding.',
    keyEvaluationNote:
      'Strong credit profile, but ₹8L personal loan for non-productive wedding expense creates excessive monthly pressure when added to car EMI + rent. Verdict: 🟡 BORROW LESS (₹5.5L–₹6.5L).',
    data: {
      purpose: 'wedding',
      loanAmountRequested: 800000, // ₹8,00,000
      incomeType: 'salaried_mnc_govt',
      monthlyNetIncome: 110000, // ₹1,10,000
      existingMonthlyEmis: 14000, // ₹14,000 car EMI
      monthlyHouseholdExpenses: 28000, // ₹28,000 rent/expenses
      age: 29,
      creditScoreBand: 'excellent_750_plus', // 780 score
      workExperienceYears: 5,
      employerTier: 'top_mnc_govt',
      spouseOrCoApplicantIncome: 0,
      recentBouncesLast6Months: 0,
      existingAvgInterestRatePercent: 9.0,
    },
  },
  {
    id: 'ravi',
    name: 'Ravi',
    tagline: '42 yrs · Mysuru · Kirana Store Owner (14 Yrs)',
    avatar: '🏪',
    city: 'Mysuru',
    description:
      'Runs established grocery store with ₹40k–80k cash income (ITR ₹4.2L/yr). Owns commercial shop worth ₹45 Lakhs unencumbered. No formal credit history. Wants ₹15L to fund second stock line and delivery vehicle.',
    keyEvaluationNote:
      'Unsecured ₹15L loan will fail or attract predatory 22%+ rates due to cash income & no bureau history. System routes him to Secured LAP/MSME against ₹45L shop asset at ~9.5%–11.5% with combined household income (wife ₹18k). Verdict: 🟢 BORROW (VIA SECURED LAP).',
    data: {
      purpose: 'business_expansion',
      loanAmountRequested: 1500000, // ₹15,00,000
      incomeType: 'self_employed_business',
      monthlyNetIncome: 60000, // Avg ₹60,000 cash income
      existingMonthlyEmis: 0,
      monthlyHouseholdExpenses: 24000,
      age: 42,
      creditScoreBand: 'unknown', // No credit history
      businessVintageYears: 14,
      itrReportedAnnualIncome: 420000, // ₹4.2L ITR
      commercialPropertyAssetValue: 4500000, // ₹45L owned shop
      isCashIncomeHeavy: true,
      spouseOrCoApplicantIncome: 18000, // Wife earns ₹18,000
      recentBouncesLast6Months: 0,
    },
  },
  {
    id: 'anita',
    name: 'Anita',
    tagline: '35 yrs · Hubballi · Gig Delivery & Home Tailoring',
    avatar: '🛵',
    city: 'Hubballi',
    description:
      'Earns ₹26k–30k/mo across gig work and tailoring. 2 children; husband unemployed for 8 months. Trapped in 3 instant app loans (₹35k outstanding at 30%+ interest) with 1 recent bounce. Wants ₹1.5L for electric scooter.',
    keyEvaluationNote:
      'Severe debt stress, predatory 30%+ loans, unemployed spouse, and recent bounce. Adding ₹1.5L unsecured debt would trigger default spiral. Verdict: 🔴 DON\'T BORROW UNSECURED / RESTRUCTURE FIRST. Advises paying off 30% loans first & exploring EV captive micro-leases.',
    data: {
      purpose: 'vehicle_scooter',
      loanAmountRequested: 1500000 / 10, // ₹1,50,000
      incomeType: 'gig_informal_variable',
      monthlyNetIncome: 28000, // Avg ₹28,000
      existingMonthlyEmis: 4500, // Repaying high-interest app loans
      monthlyHouseholdExpenses: 20000, // Living expenses with 2 kids
      age: 35,
      creditScoreBand: 'poor_below_650', // Due to bounce and app loans
      existingLoanCount: 3,
      existingAvgInterestRatePercent: 33.0, // 30%+ predatory rates
      recentBouncesLast6Months: 1, // 1 bounce
      isPredatoryDebtPresent: true,
      isSpouseUnemployed: true,
      dependentsCount: 2,
    },
  },
];
