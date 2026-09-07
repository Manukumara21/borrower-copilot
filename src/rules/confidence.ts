import { BorrowerInput, ConfidenceLevel } from '../types/borrower';

export function evaluateConfidence(input: BorrowerInput): {
  confidenceScore: ConfidenceLevel;
  confidenceReasons: string[];
  missingDataWarnings: string[];
} {
  const confirmedPoints: string[] = [];
  const missingWarnings: string[] = [];

  // Income verified
  if (input.monthlyNetIncome > 0) {
    confirmedPoints.push('Net monthly take-home income declared');
  }

  // Credit Score Check
  if (input.creditScoreBand === 'unknown') {
    missingWarnings.push('Credit score is unknown (estimated range has been widened)');
  } else {
    confirmedPoints.push(`Credit score bracket confirmed (${input.creditScoreBand.replace('_', ' ')})`);
  }

  // Expense Check
  if ((input.monthlyHouseholdExpenses || 0) > 0) {
    confirmedPoints.push('Monthly household living expenses factored in');
  } else {
    missingWarnings.push('Living expenses unconfirmed (using benchmark estimates)');
  }

  // Employment details
  if (input.incomeType === 'salaried_mnc_govt') {
    if ((input.workExperienceYears || 0) > 0) {
      confirmedPoints.push(`${input.workExperienceYears} years employment track record verified`);
    } else {
      missingWarnings.push('Employer vintage not specified');
    }
  } else if (input.incomeType === 'self_employed_business') {
    if ((input.businessVintageYears || 0) > 0) {
      confirmedPoints.push(`${input.businessVintageYears} years business vintage confirmed`);
    }
    if ((input.commercialPropertyAssetValue || 0) > 0) {
      confirmedPoints.push('Collateral asset valuation provided');
    }
  }

  // Score determination
  let score: ConfidenceLevel = 'HIGH';
  if (missingWarnings.length >= 2 || input.creditScoreBand === 'unknown' || input.incomeType === 'gig_informal_variable') {
    score = missingWarnings.length >= 3 ? 'LOW' : 'MEDIUM';
  }

  return {
    confidenceScore: score,
    confidenceReasons: confirmedPoints,
    missingDataWarnings: missingWarnings,
  };
}
