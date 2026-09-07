import { PERSONAS } from '../../data/personas';
import { evaluateBorrower } from '../evaluateBorrower';

console.log('====================================================');
console.log('RUNNING BORROWER COPILOT ENGINE VALIDATION');
console.log('====================================================\n');

PERSONAS.forEach((persona) => {
  console.log(`\n----------------------------------------------------`);
  console.log(`TESTING PERSONA: ${persona.name} (${persona.tagline})`);
  console.log(`----------------------------------------------------`);

  const result = evaluateBorrower(persona.data);

  console.log(`Verdict: ${result.verdict} -> ${result.verdictTitle}`);
  console.log(`Summary Reason: ${result.verdictReason}\n`);

  console.log(`Output 1: Likely Lender Sanction vs Safe Borrower Amount`);
  console.log(`  - Likely Lender: ₹${(result.likelyLenderSanctionMin / 100000).toFixed(1)}L – ₹${(result.likelyLenderSanctionMax / 100000).toFixed(1)}L`);
  console.log(`  - Safe Borrower: ₹${(result.safeBorrowerAmountMin / 100000).toFixed(1)}L – ₹${(result.safeBorrowerAmountMax / 100000).toFixed(1)}L`);
  console.log(`  - Advice: ${result.recommendedAmountAction}\n`);

  console.log(`Output 2: Fair Interest Rate & All-in APR`);
  console.log(`  - Nominal Rate Band: ${result.fairRateMinPercent}% – ${result.fairRateMaxPercent}%`);
  console.log(`  - Est. Processing Fee: ${result.estimatedProcessingFeePercent}%`);
  console.log(`  - All-in APR: ${result.allInAprMinPercent}% – ${result.allInAprMaxPercent}%`);
  console.log(`  - Confidence: ${result.confidenceScore} (${result.rateConfidenceReason})\n`);

  console.log(`Output 3: Safe EMI Ceiling & FOIR`);
  console.log(`  - Safe New EMI Ceiling: ₹${result.safeEmiCeilingMonthly.toLocaleString('en-IN')}/mo`);
  console.log(`  - Existing FOIR: ${result.currentExistingFoirPercent}% | Proposed FOIR: ${result.proposedFoirPercent}% (Safe Cap: ${result.safeFoirPercent}%)\n`);

  console.log(`Output 4: Product Routing & Stress Test`);
  console.log(`  - Product: ${result.productRecommendation.productTitle} (Routed to Secured: ${result.productRecommendation.isRoutedToSecured})`);
  console.log(`  - Stress Scenario (-20% Income): Stressed FOIR ${result.stressTest.stressedFoirPercent}%, Cash Buffer: ₹${result.stressTest.cashBufferRemaining.toLocaleString('en-IN')}`);
  console.log(`  - Stress Verdict: ${result.stressTest.stressVerdictText}\n`);

  console.log(`Negotiation Card Summary:`);
  console.log(`  - Safe Amount: ${result.negotiationCard.safeAmountRecommendation}`);
  console.log(`  - Target Rate: ${result.negotiationCard.targetInterestRateBand}`);
  console.log(`  - Key Talking Points: ${result.negotiationCard.talkingPoints.length} points generated`);
});

console.log('\n====================================================');
console.log('ALL PERSONAS EVALUATED SUCCESSFULLY');
console.log('====================================================\n');
