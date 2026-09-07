import { BorrowerInput, ProductRecommendation } from '../types/borrower';

/**
 * Determines optimal loan product structure (Secured LAP vs Unsecured PL vs Vehicle/Asset)
 */
export function evaluateProductRouting(input: BorrowerInput): ProductRecommendation {
  const assetValue = input.commercialPropertyAssetValue || 0;
  const isBusinessPurpose = input.purpose === 'business_expansion';
  const isVehiclePurpose = input.purpose === 'vehicle_scooter';
  const isLargeTicket = input.loanAmountRequested >= 800000;

  // 1. High-ticket or informal profile with substantial property asset -> Route to Secured LAP
  if (
    assetValue >= input.loanAmountRequested * 1.5 &&
    (isBusinessPurpose || isLargeTicket || input.incomeType === 'self_employed_business' || input.isCashIncomeHeavy)
  ) {
    const ltvPercent = Number(((input.loanAmountRequested / assetValue) * 100).toFixed(1));
    return {
      primaryProduct: 'loan_against_property_lap',
      productTitle: 'Secured Loan Against Property (LAP) / MSME Mortgage',
      isRoutedToSecured: true,
      routingReason: `You own commercial/residential property worth ₹${(assetValue / 100000).toFixed(1)}L. Taking an unsecured loan for ₹${(input.loanAmountRequested / 100000).toFixed(1)}L would attract punitive 18%–24% rates or rejection due to informal cash income. A Secured LAP offers 9.25%–11.25% interest, up to 10–15 year tenure, and a safe LTV of only ${ltvPercent}%.`,
      alternativeProduct: 'Unsecured Business Loan (Higher Rate)',
      ltvPercent,
    };
  }

  // 2. Two-Wheeler / Electric Scooter specific routing
  if (isVehiclePurpose) {
    return {
      primaryProduct: 'two_wheeler_loan',
      productTitle: 'Hypothecated Two-Wheeler / EV Asset Loan',
      isRoutedToSecured: true,
      routingReason:
        'Secured against the vehicle itself (hypothecation), providing lower interest rates (11%–14%) compared to general personal loans, with manufacturer subsidies or battery leasing options.',
      alternativeProduct: 'Personal Loan (Higher Interest)',
    };
  }

  // 3. Predatory debt flag
  if (input.isPredatoryDebtPresent || (input.existingAvgInterestRatePercent || 0) >= 25) {
    return {
      primaryProduct: 'personal_loan_unsecured',
      productTitle: 'Debt Restructuring & Consolidation Plan',
      isRoutedToSecured: false,
      routingReason:
        'You have high-cost loans (>30% APR). Instead of taking fresh unsecured debt, the priority must be consolidating or clearing existing predatory loans to prevent default.',
    };
  }

  // Default: Standard Unsecured Personal Loan
  return {
    primaryProduct: 'personal_loan_unsecured',
    productTitle: 'Standard Unsecured Personal Loan',
    isRoutedToSecured: false,
    routingReason:
      'Standard unsecured borrowing based on personal income and credit profile. No collateral required.',
  };
}
