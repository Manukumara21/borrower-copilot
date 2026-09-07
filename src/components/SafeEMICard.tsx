import React from 'react';
import { EvaluationResult, NumberExplainer } from '../types/borrower';
import { HelpCircle, Calendar, ArrowUpDown, Check, AlertCircle } from 'lucide-react';

interface SafeEMICardProps {
  evaluation: EvaluationResult;
  onOpenExplainer: (explainer: NumberExplainer) => void;
}

export const SafeEMICard: React.FC<SafeEMICardProps> = ({ evaluation, onOpenExplainer }) => {
  const {
    safeEmiCeilingMonthly,
    safeFoirPercent,
    proposedFoirPercent,
    tenureOptions,
    emiExplainer,
  } = evaluation;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={20} color="#f59e0b" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Output 4
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              What EMI Ceiling Should I Agree To?
            </h3>
          </div>
        </div>

        <button
          onClick={() => onOpenExplainer(emiExplainer)}
          className="btn-secondary"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          title="See EMI ceiling calculation breakdown"
        >
          <HelpCircle size={14} />
          <span>Why this number?</span>
        </button>
      </div>

      {/* Primary Safe Ceiling Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(15, 23, 42, 0.5))',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fcd34d', textTransform: 'uppercase' }}>
            Maximum Safe Monthly EMI Capacity
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fcd34d' }}>
            ₹{safeEmiCeilingMonthly.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ month</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Safe FOIR Ceiling: <strong style={{ color: '#fff' }}>{safeFoirPercent}%</strong>
          </div>
          <div style={{ fontSize: '0.8rem', color: proposedFoirPercent > safeFoirPercent ? '#f87171' : '#4ade80' }}>
            Proposed Total FOIR: <strong>{proposedFoirPercent}%</strong>
          </div>
        </div>
      </div>

      {/* Tenure Trade-Off Matrix Table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Tenure Trade-Off Analysis (Monthly EMI vs Total Interest)
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            💡 Longer tenure = lower EMI but higher total interest
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 10px' }}>Tenure</th>
                <th style={{ padding: '8px 10px' }}>Monthly EMI</th>
                <th style={{ padding: '8px 10px' }}>Total Interest</th>
                <th style={{ padding: '8px 10px' }}>Total Payment</th>
                <th style={{ padding: '8px 10px' }}>Total FOIR</th>
                <th style={{ padding: '8px 10px', textAlign: 'right' }}>Suitability</th>
              </tr>
            </thead>
            <tbody>
              {tenureOptions.map((opt) => {
                const isOverBudget = opt.monthlyEmi > safeEmiCeilingMonthly * 1.08;
                return (
                  <tr
                    key={opt.tenureYears}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      background: opt.isRecommended ? 'rgba(16, 185, 129, 0.07)' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '10px', fontWeight: 600, color: '#fff' }}>
                      {opt.tenureYears} Years ({opt.tenureMonths} mo)
                    </td>
                    <td style={{ padding: '10px', fontWeight: 700, color: isOverBudget ? '#f87171' : '#fcd34d' }}>
                      ₹{opt.monthlyEmi.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px', color: '#94a3b8' }}>
                      ₹{opt.totalInterestPaid.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px', color: '#cbd5e1' }}>
                      ₹{opt.totalPayment.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px', color: opt.foirPercent > safeFoirPercent ? '#f87171' : '#4ade80' }}>
                      {opt.foirPercent.toFixed(1)}%
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      {opt.isRecommended ? (
                        <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                          <Check size={11} />
                          Best Fit
                        </span>
                      ) : isOverBudget ? (
                        <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>
                          Above Budget
                        </span>
                      ) : (
                        <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                          Alternative
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
