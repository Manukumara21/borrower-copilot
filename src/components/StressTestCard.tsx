import React, { useState } from 'react';
import { BorrowerInput, EvaluationResult } from '../types/borrower';
import { evaluateStressTest } from '../rules/stressTest';
import { Activity, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

interface StressTestCardProps {
  evaluation: EvaluationResult;
  input: BorrowerInput;
}

export const StressTestCard: React.FC<StressTestCardProps> = ({ evaluation, input }) => {
  const [incomeDropPct, setIncomeDropPct] = useState<number>(20);

  // Re-run stress test dynamically based on slider
  const dynamicStress = evaluateStressTest(
    input,
    evaluation.tenureOptions[0]?.monthlyEmi || evaluation.safeEmiCeilingMonthly,
    incomeDropPct
  );

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={20} color="#ef4444" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Stress Scenario Simulation
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              What Happens If Your Income Drops?
            </h3>
          </div>
        </div>

        <span className={`badge ${dynamicStress.isManageable ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.75rem' }}>
          {dynamicStress.isManageable ? 'Manageable Buffer' : 'Vulnerable to Shock'}
        </span>
      </div>

      {/* Interactive Slider */}
      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingDown size={15} color="var(--accent-indigo)" />
            Simulate Sudden Income Reduction:
          </label>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ef4444' }}>
            -{incomeDropPct}% Drop
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="40"
          step="5"
          value={incomeDropPct}
          onChange={(e) => setIncomeDropPct(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>-10% (Minor dip)</span>
          <span>-20% (Standard Lokta stress)</span>
          <span>-40% (Severe recession / illness)</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Normal Income</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>₹{dynamicStress.originalIncome.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stressed Income</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f87171' }}>₹{dynamicStress.stressedIncome.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Stressed FOIR</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: dynamicStress.stressedFoirPercent > 45 ? '#f87171' : '#4ade80' }}>
            {dynamicStress.stressedFoirPercent}%
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Remaining Buffer</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: dynamicStress.cashBufferRemaining < 0 ? '#ef4444' : '#10b981' }}>
            ₹{dynamicStress.cashBufferRemaining.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Stress Verdict Banner */}
      <div
        style={{
          background: dynamicStress.isManageable ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          border: `1px solid ${dynamicStress.isManageable ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {dynamicStress.isManageable ? (
          <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
        ) : (
          <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
        )}
        <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
          {dynamicStress.stressVerdictText}
        </div>
      </div>

    </div>
  );
};
