import React from 'react';
import { Compass, ShieldCheck, Cpu, ArrowRight, XCircle, Sparkles, Layers } from 'lucide-react';

export const WalkthroughViewer: React.FC = () => {
  return (
    <div className="glass-panel" style={{ padding: '36px', maxWidth: '1080px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(16, 185, 129, 0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <Compass size={26} color="#38bdf8" />
        </div>
        <div>
          <span className="badge badge-primary" style={{ fontSize: '0.7rem', marginBottom: '6px' }}>
            5-Minute Walkthrough & Domain Defense
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Borrower Copilot: Technical & Domain Walkthrough
          </h2>
        </div>
      </div>

      {/* Section 1: Core Philosophy */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} />
          1. The Core Philosophy: Leveling the Information Asymmetry
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>
          Retail borrowing in India is structurally asymmetric. Lenders deploy automated underwriting matrices to maximize <strong>loan book volume and interest margins</strong>, pushing applicants right up to the 50% Fixed Obligation to Income Ratio (FOIR) regulatory ceiling.
        </p>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Borrowers optimize for <strong>family solvency and emergency liquidity</strong>. The gap between what a bank will greedily sanction and what a borrower can safely pay without entering a debt spiral is where financial distress occurs. <strong>Borrower Copilot</strong> levels this playing field as an independent, transparent decision engine.
        </p>
      </div>

      {/* Section 2: The 4 Outputs */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="var(--accent-indigo)" />
          2. The 4 Major Outputs Explained
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Output 1</span>
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Should I Borrow?</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Issues explicit verdicts: <strong>BORROW</strong>, <strong>BORROW LESS</strong>, or <strong>DON'T BORROW</strong>. Consumption loans (e.g. weddings) receive a strict -5% FOIR penalty.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Output 2</span>
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Number A vs. B</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Contrasts <strong>Number A</strong> (Bank's aggressive sanction at 50% FOIR) against <strong>Number B</strong> (Safe Borrower Ceiling at 30%–35% FOIR) with clear guidance on which to use.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>Output 3</span>
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Fair Rate & All-in APR</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Realistic reducing interest rate bands + true RBI IRR APR (factoring in 1.25% fee + 18% GST). Follows <em>"Unknown is Never Zero"</em> for unverified bureau scores.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Output 4</span>
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Safe EMI Ceiling</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Determines monthly installment headroom and compares 2, 3, 4, and 5-year tenures showing monthly cash outflow vs. total interest bled over time.
            </p>
          </div>

        </div>
      </div>

      {/* Section 3: The 3 Benchmark Personas */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-amber)" />
          3. Three Benchmark Personas Run-Through
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>👩</span>
                <strong style={{ fontSize: '0.95rem', color: '#fff' }}>Priya — Salaried MNC Engineer (Bengaluru)</strong>
              </div>
              <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>Verdict: BORROW LESS</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Earns ₹1.1L/mo with 780 CIBIL and ₹14k car EMI. Asks for ₹8L wedding loan. The bank will willingly sanction up to ₹13.5L (Number A), but Copilot advises borrowing only <strong>₹5.0L – ₹6.5L</strong> (Number B). A wedding does not generate cash flow, and ₹8L pushes total debt obligations to 37% and stressed FOIR to 46%.
            </p>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>👨</span>
                <strong style={{ fontSize: '0.95rem', color: '#fff' }}>Ravi — Kirana Store Owner (Jaipur)</strong>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Product Routing: Secured LAP</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Earns ₹65k/mo cash with no credit history, seeking ₹15L inventory loan. Unsecured personal loans would be rejected or priced at punitive 20%+ NBFC rates. Copilot detects his unencumbered ₹45L commercial shop and routes him to <strong>Secured Loan Against Property (LAP)</strong> at <strong>9.5%–11.5%</strong> with safe 33% LTV, saving him over ₹6 Lakhs in interest.
            </p>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>👩‍👧</span>
                <strong style={{ fontSize: '0.95rem', color: '#fff' }}>Anita — Gig Economy Delivery Worker (Delhi NCR)</strong>
              </div>
              <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>Verdict: DON'T BORROW</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Earns ₹28k/mo with 2 dependents, 1 recent bounce, and 3 active digital app loans at 32%+ APR. Seeking ₹1.5L for an electric delivery vehicle. Copilot sounds an alarm: her stressed cash flow is already in negative deficit. Fresh debt accelerates default. Copilot prescribes debt restructuring and OEM battery-lease programs first.
            </p>
          </div>

        </div>
      </div>

      {/* Section 4: Architecture & Decoupled Rules Engine */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={18} color="var(--accent-cyan)" />
          4. Decoupled Architecture & Client-Side Privacy
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
          The computational logic is packaged as a pure TypeScript domain rules engine in <code>src/rules/</code>. It contains zero UI or DOM dependencies, allowing 100% deterministic unit testing and sub-10ms evaluation latency.
        </p>
        <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '20px' }}>
          <li><strong>100% Local-First & Private:</strong> Zero server calls, no database, no bureau footprint.</li>
          <li><strong>Explainable Mathematics:</strong> Every output provides a <em>"Why this number?"</em> mathematical explainer with formulas and benchmarks.</li>
          <li><strong>Stress Scenario Simulator:</strong> Dynamically tests user solvency under -10% to -40% cash flow shocks.</li>
          <li><strong>1-Screen Negotiation Card:</strong> Printable battle-ready cheat sheet with exact scripts and walk-away triggers.</li>
        </ul>
      </div>

      {/* Section 5: Roadmap & Prioritization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <ArrowRight size={16} color="var(--accent-emerald)" />
            <strong style={{ fontSize: '0.95rem', color: '#fff' }}>What We Would Build Next</strong>
          </div>
          <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '18px' }}>
            <li><strong>Client-Side OCR Bank Statement Reader:</strong> Drop in PDF statements to extract EMIs and bounces without uploading data.</li>
            <li><strong>KFS Red-Flag Scanner:</strong> Automated parsing of Key Fact Statements for hidden prepayment penalties.</li>
            <li><strong>Multilingual Voice Interface:</strong> Regional vernacular audio guidance for Tier-2/3 borrowers.</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <XCircle size={16} color="var(--accent-rose)" />
            <strong style={{ fontSize: '0.95rem', color: '#fff' }}>What We Intentionally Cut</strong>
          </div>
          <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '18px' }}>
            <li><strong>Credit Bureau API Pulls:</strong> Avoids spam marketing calls and invasive KYC hurdles.</li>
            <li><strong>Bank Lead-Gen Affiliate Links:</strong> Zero sponsored placement to preserve strict borrower advocacy.</li>
            <li><strong>Complex Budgeting Features:</strong> Keeps the app laser-focused on rapid lending decision support in under 3 minutes.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default WalkthroughViewer;
