// Lending Market Benchmarks and Baseline Assumptions (Indian Context)

export const LENDING_CONSTANTS = {
  // FOIR (Fixed Obligation to Income Ratio) Limits
  FOIR_LIMITS: {
    CONSERVATIVE_SAFE_SALARIED: 0.35, // 35% safe limit for salaried
    CONSERVATIVE_SAFE_SELF_EMPLOYED: 0.30, // 30% safe limit for self-employed/variable
    CONSERVATIVE_SAFE_LOW_INCOME: 0.28, // 28% for income < ₹30,000
    LENDER_AGGRESSIVE_SALARIED: 0.50, // 50% bank standard for salaried
    LENDER_AGGRESSIVE_SELF_EMPLOYED: 0.45, // 45% bank standard for business
    HIGH_RISK_DISTRESS_THRESHOLD: 0.45, // Pre-existing debt > 45% is distress
  },

  // Base Interest Rate Bands by Product Category (% per annum)
  BASE_RATES: {
    PERSONAL_LOAN_PRIME: { min: 10.5, max: 12.5, typicalFeePct: 1.0 }, // CIBIL 750+, Salaried MNC
    PERSONAL_LOAN_STANDARD: { min: 12.5, max: 15.5, typicalFeePct: 1.5 }, // CIBIL 700-749
    PERSONAL_LOAN_SUBPRIME: { min: 16.0, max: 22.0, typicalFeePct: 2.5 }, // CIBIL < 650 or unverified
    LAP_SECURED_PROPERTY: { min: 9.25, max: 11.5, typicalFeePct: 0.75 }, // Loan Against Property
    BUSINESS_LOAN_SECURED: { min: 9.5, max: 12.0, typicalFeePct: 1.0 },
    TWO_WHEELER_LOAN: { min: 11.0, max: 15.0, typicalFeePct: 1.5 },
    DIGITAL_APP_PREDATORY_WARNING: { min: 28.0, max: 36.0, typicalFeePct: 4.0 },
  },

  // Credit Score Adjustments to Base Rate
  CREDIT_SCORE_RATE_SPREADS: {
    excellent_750_plus: 0.0, // Best rate
    good_700_749: 1.25, // +1.25%
    fair_650_699: 3.5, // +3.5%
    poor_below_650: 7.0, // +7.0%
    unknown: 2.5, // Spread uncertainty: wider band +- 2.5%
  },

  // Default Processing Fee (%) & GST
  FEES: {
    STANDARD_PROCESSING_FEE_PCT: 1.25,
    GST_ON_FEES_PCT: 18.0, // 18% GST in India
    MAX_FAIR_PROCESSING_FEE_PCT: 1.5, // Above this is excessive
  },

  // Loan to Value (LTV) Caps
  LTV_LIMITS: {
    LAP_COMMERCIAL_PROPERTY: 0.55, // 55% max loan against commercial shop
    LAP_RESIDENTIAL_PROPERTY: 0.65, // 65% max loan against residential
    VEHICLE_TWO_WHEELER: 0.85, // 85% on-road price
  },

  // Stress Scenario Assumptions
  STRESS_TEST: {
    DEFAULT_INCOME_DROP_PCT: 20, // 20% income reduction shock
    DEFAULT_RATE_HIKE_BPS: 200, // 2.00% interest rate hike
    CRITICAL_STRESS_FOIR: 0.50, // If stress pushes FOIR > 50%, severe warning
  },

  // Tenure defaults by product (Years)
  DEFAULT_TENURES: {
    PERSONAL_LOAN: 3, // 36 months typical
    LAP_PROPERTY: 10, // 120 months typical for property loan
    TWO_WHEELER: 3, // 36 months typical
  },
};
