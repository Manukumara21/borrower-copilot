import { BorrowerInput, StressScenarioResult } from '../types/borrower';
import { LENDING_CONSTANTS } from '../data/assumptions';

/**
 * Simulates a severe financial stress test scenario (-20% income drop or +200 bps rate hike)
 */
export function evaluateStressTest(
  input: BorrowerInput,
  proposedMonthlyEmi: number,
  incomeDropPct: number = LENDING_CONSTANTS.STRESS_TEST.DEFAULT_INCOME_DROP_PCT
): StressScenarioResult {
  const originalIncome = input.monthlyNetIncome + (input.spouseOrCoApplicantIncome || 0);
  const stressedIncome = Math.round(originalIncome * (1 - incomeDropPct / 100));

  const totalMonthlyEmi = proposedMonthlyEmi + (input.existingMonthlyEmis || 0);
  const stressedFoirPercent =
    stressedIncome > 0 ? Number(((totalMonthlyEmi / stressedIncome) * 100).toFixed(1)) : 100;

  const livingExpenses = input.monthlyHouseholdExpenses || 0;
  const cashBufferRemaining = stressedIncome - livingExpenses - totalMonthlyEmi;

  const safeLimitFoirPercent = 45; // Critical stress threshold
  const isManageable = stressedFoirPercent <= safeLimitFoirPercent && cashBufferRemaining >= 0;

  let stressVerdictText = '';
  if (stressedFoirPercent > 55 || cashBufferRemaining < -5000) {
    stressVerdictText = `🚨 High Default Risk: If your income drops ${incomeDropPct}%, your monthly debt obligations would consume ${stressedFoirPercent}% of income, leaving a ₹${Math.abs(cashBufferRemaining).toLocaleString('en-IN')} monthly deficit.`;
  } else if (!isManageable) {
    stressVerdictText = `⚠️ Tight Budget: If income drops ${incomeDropPct}%, your debt ratio reaches ${stressedFoirPercent}%. Cash flow will be very tight with only ₹${Math.max(0, cashBufferRemaining).toLocaleString('en-IN')} margin for emergencies.`;
  } else {
    stressVerdictText = `✅ Resilient: If income drops ${incomeDropPct}%, debt obligations remain manageable at ${stressedFoirPercent}% FOIR with ₹${cashBufferRemaining.toLocaleString('en-IN')} free monthly buffer.`;
  }

  return {
    shockType: 'income_drop_20',
    originalIncome,
    stressedIncome,
    stressedEmi: totalMonthlyEmi,
    stressedFoirPercent,
    safeLimitFoirPercent,
    isManageable,
    stressVerdictText,
    cashBufferRemaining,
  };
}
