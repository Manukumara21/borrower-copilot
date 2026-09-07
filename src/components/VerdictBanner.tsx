import React from 'react';
import { EvaluationResult } from '../types/borrower';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface VerdictBannerProps {
  evaluation: EvaluationResult;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ evaluation }) => {
  const {
    verdict,
    verdictTitle,
    verdictReason,
    verdictDetailedRationale,
    actionableNextSteps,
    confidenceScore,
  } = evaluation;

  let bannerClass = 'badge-success';
  let bannerBorder = 'rgba(16, 185, 129, 0.4)';
  let bannerBg = 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.6))';
  let Icon = CheckCircle2;
  let iconColor = '#10b981';

  if (verdict === 'BORROW_LESS') {
    bannerClass = 'badge-warning';
    bannerBorder = 'rgba(245, 158, 11, 0.4)';
    bannerBg = 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(15, 23, 42, 0.6))';
    Icon = AlertTriangle;
    iconColor = '#f59e0b';
  } else if (verdict === 'DONT_BORROW') {
    bannerClass = 'badge-danger';
    bannerBorder = 'rgba(239, 68, 68, 0.4)';
    bannerBg = 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(15, 23, 42, 0.6))';
    Icon = XCircle;
    iconColor = '#ef4444';
  }

  return (
    <div
      className="glass-panel animate-fade-in"
      style={{
        padding: '24px',
        border: `1.5px solid ${bannerBorder}`,
        background: bannerBg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        
        {/* Left Verdict Content */}
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span className={`badge ${bannerClass}`} style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
              <Icon size={16} />
              {verdict === 'BORROW' ? 'BORROW' : verdict === 'BORROW_LESS' ? 'BORROW LESS' : 'DON\'T BORROW'}
            </span>

            <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={13} />
              Confidence: {confidenceScore}
            </span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            {verdictTitle}
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '16px' }}>
            {verdictReason}
          </p>

          {/* Rationale Bullet Points */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>
              Underwriting Rationale:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {verdictDetailedRationale.map((point, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: iconColor, marginTop: '2px' }}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Quick Summary Card */}
        <div
          style={{
            flex: '0 0 280px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 700 }}>
            Key Actionable Next Steps
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {actionableNextSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <ArrowRight size={14} style={{ color: 'var(--accent-indigo)', flexShrink: 0, marginTop: '3px' }} />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
