import React, { useState } from 'react';
import { NegotiationCardData } from '../types/borrower';
import { X, Copy, Printer, Check, ShieldAlert, Sparkles, MessageSquare, AlertOctagon } from 'lucide-react';

interface NegotiationCardModalProps {
  cardData: NegotiationCardData;
  onClose: () => void;
}

export const NegotiationCardModal: React.FC<NegotiationCardModalProps> = ({ cardData, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
=== BORROWER COPILOT NEGOTIATION CARD ===
Borrower Profile: ${cardData.borrowerName || 'Borrower'}
Loan Wanted: ₹${cardData.requestedAmount.toLocaleString('en-IN')}
Recommended Safe Amount: ${cardData.safeAmountRecommendation}
Target Fair Interest Rate: ${cardData.targetInterestRateBand}
Max Safe Monthly EMI: ₹${cardData.maxAcceptableEmi.toLocaleString('en-IN')}/mo
Max Processing Fee: ≤ ${cardData.maxAcceptableProcessingFeePercent}%

KEY LEVERAGE POINTS:
${cardData.keyStrengths.map((s) => `• ${s}`).join('\n')}

QUOTABLE TALKING POINTS:
${cardData.talkingPoints.map((tp) => `[${tp.topic}]\nTarget: ${tp.targetMetric}\nQuote: ${tp.quoteScript}\n`).join('\n')}

DO NOT SIGN TRIGGERS:
${cardData.doNotSignTriggers.map((t) => `⚠️ ${t}`).join('\n')}
=========================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in printable-card"
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '94vh',
          overflowY: 'auto',
          padding: '30px',
          background: 'linear-gradient(135deg, #0b0f19, #172033)',
          border: '2px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Borrower Cheat Sheet
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                Your Lender Negotiation Card
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCopy}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              title="Print cheat sheet"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '6px', border: 'none', background: 'rgba(255, 255, 255, 0.08)' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 4 Pillar Targets Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Loan Wanted</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>₹{(cardData.requestedAmount / 100000).toFixed(1)}L</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.7rem', color: '#10b981', textTransform: 'uppercase' }}>Safe Amount</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{cardData.safeAmountRecommendation}</div>
          </div>

          <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ fontSize: '0.7rem', color: '#c4b5fd', textTransform: 'uppercase' }}>Target Rate Band</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c4b5fd' }}>{cardData.targetInterestRateBand}</div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '0.7rem', color: '#fcd34d', textTransform: 'uppercase' }}>Max EMI Ceiling</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fcd34d' }}>₹{cardData.maxAcceptableEmi.toLocaleString('en-IN')}</div>
          </div>

        </div>

        {/* Leverage Strengths */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>
            Your Leverage Points (Why Lenders Want You)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cardData.keyStrengths.map((str, idx) => (
              <span key={idx} className="badge badge-success" style={{ fontSize: '0.75rem', textTransform: 'none', padding: '6px 12px' }}>
                ✓ {str}
              </span>
            ))}
          </div>
        </div>

        {/* Quotable Talking Points */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 700 }}>
            Hold Up to the Lender: Quotable Scripts
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cardData.talkingPoints.map((tp, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageSquare size={14} />
                    {tp.topic}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                    Target: {tp.targetMetric}
                  </span>
                </div>

                <blockquote
                  style={{
                    fontSize: '0.9rem',
                    color: '#f8fafc',
                    fontStyle: 'italic',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    borderLeft: '3px solid #818cf8',
                    marginBottom: '8px',
                    lineHeight: 1.5,
                  }}
                >
                  {tp.quoteScript}
                </blockquote>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span><strong>Why it works:</strong> {tp.leverageReason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags / Do Not Sign Triggers */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '14px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <AlertOctagon size={16} color="#ef4444" />
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ef4444', fontWeight: 700 }}>
              "Walk Away / Do Not Sign" Triggers
            </h4>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#cbd5e1' }}>
            {cardData.doNotSignTriggers.map((trigger, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                <span>{trigger}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
