# 🛡️ Borrower Copilot — Lokta Build Challenge

> **A decision-support web application that empowers loan borrowers to become the best-informed person in the room when talking to lenders.**

---

## ⚡ Quick Start (< 2 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Launch development server
npm run dev
```

Open **`http://localhost:5173`** in any modern web browser.

To run production build:
```bash
npm run build
npm run preview
```

To run rules engine validation tests:
```bash
npx tsx src/rules/__tests__/testPersonas.ts
```

---

## 🎯 Deliverables & Key Documentation

- **[RULES.md](./RULES.md)**: Full decision rules matrix formatted in `What · Value · Why · Source` as required by the challenge.
- **[PERSONAS.md](./PERSONAS.md)**: Full run-throughs and transcripts for **Priya**, **Ravi**, and **Anita** showing the 4 outputs, stress test, and negotiation cards.

---

## 🌟 Key Features

1. **The 4 Major Outputs**:
   - 🟢 **Output 1 — Should I Borrow?**: 🟢 BORROW / 🟡 BORROW LESS / 🔴 DON'T BORROW with deep underwriting explanations.
   - 🏛️ **Output 2 — How Much Can I Borrow?**: Number A (Likely Lender Sanction) vs Number B (Safe Borrower Amount) with explicit guidance on which number to use.
   - 📊 **Output 3 — What is a Fair Rate?**: Realistic rate bands (e.g. 10.5%–12.25%) + RBI-compliant All-in APR (including fees & GST) + Confidence Score.
   - 📅 **Output 4 — What EMI Should I Agree To?**: Safe monthly EMI ceiling + interactive tenure trade-off matrix (monthly EMI vs total interest across 2, 3, 4, 5+ years).
2. **Stress Scenario Simulator**:
   - Interactive slider allowing users to simulate -10% to -40% income drops to test cash flow resilience.
3. **1-Screen Lender Negotiation Card**:
   - Printable & copyable cheat sheet with exact quotable scripts, target rate/fee caps, borrower leverage points, and "Do Not Sign" walk-away triggers.
4. **"Why this number?" Mathematical Explainers**:
   - Interactive modal on every output breaking down the exact formulas, inputs, and intermediate deductions.
5. **1-Click Persona Switcher**:
   - Instant testing for **Priya** (Salaried MNC, wedding loan), **Ravi** (Kirana owner routed to Secured LAP), and **Anita** (Gig worker with predatory app loans warned to restructure).
6. **Adaptive Questions with Impact Notes**:
   - 8 Must Questions + Contextual follow-up branches (Salaried vs Business/Asset vs Gig).
   - Every question displays an impact badge explaining how the answer alters calculations.

---

## 🏗️ Architecture: Decoupled Rules Engine

```
src/
├── types/borrower.ts          # Pure domain models and contract types
├── rules/                     # The "Brain" (Decoupled from React UI)
│   ├── affordability.ts       # FOIR, Safe vs Lender amounts, cash flow buffers
│   ├── interestRate.ts        # Risk-tier pricing matrix, RBI All-in APR solver
│   ├── productRouting.ts      # Unsecured PL vs Secured LAP vs EV hypothecation
│   ├── stressTest.ts          # Income drop (-20%) and rate shock simulation
│   ├── confidence.ts          # "Confidence widens with silence" uncertainty scoring
│   └── evaluateBorrower.ts    # Master evaluation pipeline generating the 4 outputs
├── questions/
│   └── questionTree.ts        # 8 Must questions + adaptive follow-ups with impact tags
├── data/
│   ├── personas.ts            # Pre-configured test cases (Priya, Ravi, Anita)
│   └── assumptions.ts         # Benchmarks, fee structures, and credit spreads
└── components/                # Modern, glassmorphic UI components
```

---

## 🔒 Privacy & Local-First Philosophy
- **No Login or Registration**
- **No Database Required**
- **No Credit Bureau Pulls or External APIs**
- **100% Client-Side Pure Calculation Engine**
