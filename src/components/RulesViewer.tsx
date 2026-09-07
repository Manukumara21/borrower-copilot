import React from 'react';
import { BookOpen, ShieldCheck, Scale, Calculator, ArrowRight } from 'lucide-react';

export const RulesViewer: React.FC = () => {
  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={22} color="#818cf8" />
        </div>
        <div>
          <span className="badge badge-neutral" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
            RULES.md In-App Reference
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            Decision Rules, Thresholds & Lending Matrix
          </h2>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
        As mandated by the Lokta Build Challenge, every rule, threshold, interest band, and calculation is transparently defined below in the format: <code>what · value · why · source</code>.
      </p>

      {/* Rules Table */}
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 10px', width: '22%' }}>What (Rule / Parameter)</th>
              <th style={{ padding: '12px 10px', width: '18%' }}>Value / Threshold</th>
              <th style={{ padding: '12px 10px', width: '38%' }}>Why (Financial Rationale)</th>
              <th style={{ padding: '12px 10px', width: '22%' }}>Source</th>
            </tr>
          </thead>
          <tbody>
            
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Safe Salaried FOIR</td>
              <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>30% – 35% Net Income</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Leaves 65%+ for living expenses, rent, and emergency buffers without cash flow strain.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>My Judgement (Prudent Planning)</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Lender Aggressive FOIR</td>
              <td style={{ padding: '12px 10px', color: '#f59e0b', fontWeight: 600 }}>50% (Salaried), 45% (Self-emp)</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Standard commercial bank underwriting ceiling; approves higher loans than borrowers should safely take.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Indian Retail Banking Norms (HDFC / SBI)</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Consumption Loan FOIR Cap</td>
              <td style={{ padding: '12px 10px', color: '#f59e0b', fontWeight: 600 }}>30% Net Income</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Wedding/lifestyle loans do not build assets or generate income; warrants lower borrowing ceiling.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>My Judgement</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Prime Personal Loan Base Rate</td>
              <td style={{ padding: '12px 10px', color: '#818cf8', fontWeight: 600 }}>10.5% – 12.25% p.a.</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Offered to prime borrowers with 750+ CIBIL score and stable Tier-1 MNC/Govt employment.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>BankBazaar / Paisabazaar Q1 2026 Data</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Loan Against Property (LAP) Base Rate</td>
              <td style={{ padding: '12px 10px', color: '#818cf8', fontWeight: 600 }}>9.25% – 11.25% p.a.</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Secured by physical commercial/residential asset; much lower risk for the lender.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Indian Housing & Mortgage Market</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Unknown Credit Score Rule</td>
              <td style={{ padding: '12px 10px', color: '#38bdf8', fontWeight: 600 }}>Unknown is never zero (Spread widened ±2.5%)</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Missing credit score does not penalize borrower to subprime; widens rate band with LOW confidence.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Lokta Challenge Explicit Requirement</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Secured LAP Routing Rule</td>
              <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>Asset Value ≥ 1.5× Loan & Ticket ≥ ₹8L</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Routes borrowers with informal cash income & property assets (like Ravi) away from high-cost unsecured debt.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>MSME Credit Underwriting Framework</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>"Do Not Borrow" Distress Triggers</td>
              <td style={{ padding: '12px 10px', color: '#ef4444', fontWeight: 600 }}>Debt rate ≥ 25% + bounce + FOIR &gt; 35%</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Prevents debt trap for borrowers already carrying predatory 30%+ instant app loans (like Anita).</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Responsible Lending Code of Conduct</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Stress Scenario Shock Factor</td>
              <td style={{ padding: '12px 10px', color: '#ef4444', fontWeight: 600 }}>-20% Net Income Drop</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Evaluates if monthly obligations remain manageable (FOIR ≤ 45%) during job loss or commercial downturn.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Lokta Challenge Spec</td>
            </tr>

            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>RBI All-in APR Standard</td>
              <td style={{ padding: '12px 10px', color: '#c4b5fd', fontWeight: 600 }}>IRR equating net disbursement to EMIs</td>
              <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Discloses true annualized borrowing cost factoring in 1.25% processing fees and 18% GST.</td>
              <td style={{ padding: '12px 10px', color: '#94a3b8' }}>RBI Guidelines on Key Fact Statement (KFS)</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
