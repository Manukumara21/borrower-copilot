import React, { useState } from 'react';
import { BorrowerInput, NumberExplainer } from './types/borrower';
import { PERSONAS, PersonaPreset } from './data/personas';
import { evaluateBorrower } from './rules/evaluateBorrower';
import { Header } from './components/Header';
import { VerdictBanner } from './components/VerdictBanner';
import { LoanAmountCard } from './components/LoanAmountCard';
import { FairRateCard } from './components/FairRateCard';
import { SafeEMICard } from './components/SafeEMICard';
import { StressTestCard } from './components/StressTestCard';
import { ProductRoutingCard } from './components/ProductRoutingCard';
import { ExplainerModal } from './components/ExplainerModal';
import { NegotiationCardModal } from './components/NegotiationCardModal';
import { Questionnaire } from './components/Questionnaire';
import { RulesViewer } from './components/RulesViewer';
import { Edit3, Sparkles } from 'lucide-react';

const DEFAULT_ANSWERS: BorrowerInput = {
  purpose: 'personal_loan_unsecured' as any,
  loanAmountRequested: 500000,
  incomeType: 'salaried_mnc_govt',
  monthlyNetIncome: 80000,
  existingMonthlyEmis: 12000,
  monthlyHouseholdExpenses: 30000,
  age: 32,
  creditScoreBand: 'excellent_750_plus',
  workExperienceYears: 5,
};

export const App: React.FC = () => {
  // Start with Priya loaded by default for immediate evaluation
  const [activePersonaId, setActivePersonaId] = useState<string | null>('priya');
  const [answers, setAnswers] = useState<BorrowerInput>(PERSONAS[0].data);
  const [viewMode, setViewMode] = useState<'dashboard' | 'questionnaire'>('dashboard');
  const [activeTab, setActiveTab] = useState<'app' | 'rules'>('app');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Modals
  const [activeExplainer, setActiveExplainer] = useState<NumberExplainer | null>(null);
  const [showNegotiationModal, setShowNegotiationModal] = useState<boolean>(false);

  // Dynamic evaluation from rules engine
  const evaluation = evaluateBorrower(answers);

  const handleSelectPersona = (persona: PersonaPreset) => {
    setActivePersonaId(persona.id);
    setAnswers({ ...persona.data });
    setViewMode('dashboard');
    setActiveTab('app');
  };

  const handleReset = () => {
    setActivePersonaId(null);
    setAnswers({ ...DEFAULT_ANSWERS });
    setCurrentStepIndex(0);
    setViewMode('questionnaire');
    setActiveTab('app');
  };

  const handleAnswerChange = (field: keyof BorrowerInput, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Top Navigation */}
      <Header
        activePersonaId={activePersonaId}
        onSelectPersona={handleSelectPersona}
        onReset={handleReset}
        onOpenNegotiationCard={() => setShowNegotiationModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', flex: 1, width: '100%' }}>

        {activeTab === 'rules' ? (
          <RulesViewer />
        ) : viewMode === 'questionnaire' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="badge badge-neutral" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>
                Adaptive Assessment
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
                Tell Us About Your Financial Situation
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                No bureau pulls, no database, no login. Everything is calculated transparently from your inputs.
              </p>
            </div>

            <Questionnaire
              answers={answers}
              onChangeAnswer={handleAnswerChange}
              currentStepIndex={currentStepIndex}
              setCurrentStepIndex={setCurrentStepIndex}
              onFinish={() => setViewMode('dashboard')}
            />
          </div>
        ) : (
          /* Dashboard Results View */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Top Persona Context Banner */}
            {activePersonaId && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }}>
                    {PERSONAS.find((p) => p.id === activePersonaId)?.avatar}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                      Active Test Persona: {PERSONAS.find((p) => p.id === activePersonaId)?.name} ({PERSONAS.find((p) => p.id === activePersonaId)?.city})
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {PERSONAS.find((p) => p.id === activePersonaId)?.keyEvaluationNote}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setViewMode('questionnaire')}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '5px 12px' }}
                  >
                    <Edit3 size={13} />
                    <span>Edit Answers</span>
                  </button>
                </div>
              </div>
            )}

            {/* Output 1: Verdict Banner */}
            <VerdictBanner evaluation={evaluation} />

            {/* Product Routing Banner (Secured LAP vs Unsecured) */}
            <ProductRoutingCard product={evaluation.productRecommendation} />

            {/* Core Outputs 2, 3, 4 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {/* Output 2: How much can I borrow? */}
              <LoanAmountCard evaluation={evaluation} onOpenExplainer={setActiveExplainer} />

              {/* Output 3: What is a fair interest rate? */}
              <FairRateCard evaluation={evaluation} onOpenExplainer={setActiveExplainer} />
            </div>

            {/* Output 4: Safe EMI Ceiling & Tenure Comparison Table */}
            <SafeEMICard evaluation={evaluation} onOpenExplainer={setActiveExplainer} />

            {/* Stress Test Simulation Card */}
            <StressTestCard evaluation={evaluation} input={answers} />

            {/* Bottom Action Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 24px',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                  Ready to Speak with a Lender?
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Take your personalized Negotiation Cheat Sheet with you to avoid accepting high-cost rates or predatory terms.
                </p>
              </div>

              <button
                onClick={() => setShowNegotiationModal(true)}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <Sparkles size={16} />
                <span>Open 1-Screen Negotiation Card</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Explainer Modal (Math breakdown when "Why this number?" is clicked) */}
      <ExplainerModal explainer={activeExplainer} onClose={() => setActiveExplainer(null)} />

      {/* 1-Screen Negotiation Card Modal */}
      {showNegotiationModal && (
        <NegotiationCardModal
          cardData={evaluation.negotiationCard}
          onClose={() => setShowNegotiationModal(false)}
        />
      )}

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          background: 'rgba(11, 15, 25, 0.6)',
        }}
      >
        <p>
          Borrower Copilot · Built for the Lokta Build Challenge · Decoupled Domain Rules Engine · Pure Client-Side Computation
        </p>
      </footer>

    </div>
  );
};

export default App;