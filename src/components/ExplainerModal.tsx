import React, { useEffect } from 'react';
import { NumberExplainer } from '../types/borrower';
import { X, Calculator, BookOpen, Check } from 'lucide-react';

interface ExplainerModalProps {
  explainer: NumberExplainer | null;
  onClose: () => void;
}

export const ExplainerModal: React.FC<ExplainerModalProps> = ({ explainer, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!explainer) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calculator size={20} color="#818cf8" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Mathematical Breakdown
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                {explainer.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '6px', borderRadius: '8px', border: 'none', background: 'rgba(255, 255, 255, 0.06)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Summary */}
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            borderLeft: '4px solid #6366f1',
            padding: '12px 14px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '20px',
            fontSize: '0.88rem',
            color: '#e2e8f0',
            lineHeight: 1.5,
          }}
        >
          {explainer.oneSentenceSummary}
        </div>

        {/* Step-by-Step Breakdown Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Calculation Steps & Inputs
          </div>
          {explainer.steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                background: step.isHighlight
                  ? 'rgba(16, 185, 129, 0.12)'
                  : idx % 2 === 0
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'transparent',
                border: step.isHighlight ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
              }}
            >
              <div style={{ flex: '1 1 auto', paddingRight: '12px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: step.isHighlight ? 700 : 500, color: step.isHighlight ? '#fff' : '#cbd5e1' }}>
                  {step.label}
                </div>
                {step.formulaOrDetail && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {step.formulaOrDetail}
                  </div>
                )}
              </div>

              <div
                style={{
                  fontSize: step.isHighlight ? '1.1rem' : '0.95rem',
                  fontWeight: 700,
                  color: step.isNegative ? '#f87171' : step.isHighlight ? '#10b981' : '#f8fafc',
                  fontFamily: 'JetBrains Mono, monospace',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.value}
              </div>
            </div>
          ))}
        </div>

        {/* Rule Reference Footer */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}
        >
          <BookOpen size={15} color="#94a3b8" />
          <span>
            <strong>Governing Principle:</strong> {explainer.ruleReference}
          </span>
        </div>

      </div>
    </div>
  );
};
