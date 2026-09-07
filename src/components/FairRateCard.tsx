import React from 'react';
import { EvaluationResult, NumberExplainer } from '../types/borrower';
import { HelpCircle, Percent, ShieldCheck, AlertCircle, FileCheck } from 'lucide-react';

interface FairRateCardProps {
  evaluation: EvaluationResult;
  onOpenExplainer: (explainer: NumberExplainer) => void;
}

export const FairRateCard: React.FC<FairRateCardProps> = ({ evaluation, onOpenExplainer }) => {
  const {
    fairRateMinPercent,
    fairRateMaxPercent,
    estimatedProcessingFeePercent,
    allInAprMinPercent,
    allInAprMaxPercent,
    rateConfidence,
    rateConfidenceReason,
    rateExplainer,
  } = evaluation;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Percent size={20} color="#8b5cf6" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Output 3
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              What is a Fair Interest Rate & APR?
            </h3>
          </div>
        </div>

        <button
          onClick={() => onOpenExplainer(rateExplainer)}
          className="btn-secondary"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          title="See rate and APR calculation breakdown"
        >
          <HelpCircle size={14} />
          <span>Why this number?</span>
        </button>
      </div>

      {/* Main Rate Display Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        
        {/* Nominal Fair Rate Band */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(15, 23, 42, 0.5))',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c4b5fd', textTransform: 'uppercase' }}>
              Target Interest Rate Band
            </span>
            <span className={`badge ${rateConfidence === 'HIGH' ? 'badge-success' : rateConfidence === 'MEDIUM' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
              {rateConfidence} CONFIDENCE
            </span>
          </div>

          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#c4b5fd' }}>
            {fairRateMinPercent}% – {fairRateMaxPercent}%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Nominal reducing-balance rate you should expect from top lenders.
          </p>
        </div>

        {/* RBI All-in APR (including fees + GST) */}
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
              RBI All-in APR (True Cost)
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
              <FileCheck size={12} />
              Includes Fees
            </span>
          </div>

          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc' }}>
            {allInAprMinPercent}% – {allInAprMaxPercent}%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Reflects nominal rate plus {estimatedProcessingFeePercent}% upfront fee + 18% GST.
          </p>
        </div>

      </div>

      {/* Negotiation guidance badge */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <AlertCircle size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <strong>Lender Negotiation Rule:</strong> A quote above ~{fairRateMaxPercent}% deserves active negotiation. Ask for written disclosure of all-in APR.
        </div>
      </div>

    </div>
  );
};
