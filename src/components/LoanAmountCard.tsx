import React from 'react';
import { EvaluationResult, NumberExplainer } from '../types/borrower';
import { HelpCircle, Info, Landmark, ShieldCheck } from 'lucide-react';

interface LoanAmountCardProps {
  evaluation: EvaluationResult;
  onOpenExplainer: (explainer: NumberExplainer) => void;
}

export const LoanAmountCard: React.FC<LoanAmountCardProps> = ({ evaluation, onOpenExplainer }) => {
  const {
    likelyLenderSanctionMin,
    likelyLenderSanctionMax,
    safeBorrowerAmountMin,
    safeBorrowerAmountMax,
    recommendedAmountAction,
    loanAmountExplainer,
  } = evaluation;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Landmark size={20} color="#3b82f6" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Output 2
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              How Much Can I Borrow?
            </h3>
          </div>
        </div>

        <button
          onClick={() => onOpenExplainer(loanAmountExplainer)}
          className="btn-secondary"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          title="See detailed calculation breakdown"
        >
          <HelpCircle size={14} />
          <span>Why this number?</span>
        </button>
      </div>

      {/* Two Numbers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        
        {/* Number A: Likely Lender Sanction */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Number A · Bank's Maximum
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>Up to 50% FOIR</span>
          </div>
          
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#94a3b8' }}>
            ₹{(likelyLenderSanctionMin / 100000).toFixed(1)}L – ₹{(likelyLenderSanctionMax / 100000).toFixed(1)}L
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            What commercial lenders may approve based on maximum allowable debt ratios.
          </p>
        </div>

        {/* Number B: Safe Amount for Borrower */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.5))',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
              Number B · Safe for You
            </span>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
              <ShieldCheck size={12} />
              Recommended
            </span>
          </div>

          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>
            ₹{(safeBorrowerAmountMin / 100000).toFixed(1)}L – ₹{(safeBorrowerAmountMax / 100000).toFixed(1)}L
          </div>
          <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px' }}>
            Maximum amount you should borrow without straining your monthly living budget.
          </p>
        </div>

      </div>

      {/* Guidance Callout */}
      <div
        style={{
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Info size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.85rem', color: '#bfdbfe' }}>
          <strong>Which number should you use?</strong> {recommendedAmountAction}
        </div>
      </div>

    </div>
  );
};
