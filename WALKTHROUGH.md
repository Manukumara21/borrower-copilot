# 🧭 WALKTHROUGH.md — 5-Minute Technical & Domain Walkthrough

> **Project**: Borrower Copilot (Lokta Build Challenge)  
> **Author**: Borrower Copilot Engineering & Financial Domain Team  
> **Target Audience**: Challenge Evaluators, Product Judges, and Technical Underwriters  
> **Reading Time**: ~5 Minutes

---

## 1. Executive Summary & Core Philosophy

Retail borrowing is structurally asymmetric. Lenders deploy sophisticated automated underwriting engines, credit bureau scoring models, and aggressive sales quotas designed to optimize **loan book volume and interest margin**, constrained only by upper regulatory ceilings (typically 50% Fixed Obligation to Income Ratio or FOIR).

Borrowers, on the other hand, optimize for **financial survival, family liquidity, and long-term solvency**. The delta between what a financial institution will eagerly sanction and what a household can safely service without entering debt spiral is where financial distress originates.

**Borrower Copilot** exists to turn the borrower into the **best-informed person in the room**. It is not a lead-generation aggregator for banks, nor does it sell loans. It is an independent, transparent borrower-advocate decision engine that calculates what is safe, exposes predatory traps, and equips users with actionable negotiation leverage.

---

## 2. The 4 Major Outputs: Domain Reasoning

### 🟢 Output 1 — Should I Borrow?
- **Verdicts**:
  - 🟢 **BORROW**: The requested amount sits safely within conservative FOIR thresholds, cash buffers remain healthy, and loan purpose aligns with productive or sustainable goals.
  - 🟡 **BORROW LESS**: The requested loan is approved by banks (under 50% FOIR) but breaches safe household debt limits (e.g., Priya's ₹8L wedding request). The copilot computes a rational downsized range (e.g., ₹5.0L–₹6.5L) that preserves emergency margins.
  - 🔴 **DON'T BORROW / RESTRUCTURE FIRST**: Taking on debt creates immediate negative cash flows or default risk (e.g., Anita's active predatory 30%+ digital app loans with recent EMI bounce). Copilot refuses to rubber-stamp high-cost borrowing.
- **Underwriting Philosophy**: Consumption debt (weddings, vacations, gadgets) warrants a -5% FOIR penalty because it produces no future cash flows.

### 🏛️ Output 2 — How Much Can I Borrow? (Number A vs. Number B)
- **Number A (Likely Lender Sanction)**: The maximum amount a commercial bank or NBFC will willingly disburse based on institutional 50% FOIR limits and aggressive multiplier tables.
- **Number B (Safe Borrower Amount)**: The maximum principal calculated against a conservative 30%–35% FOIR ceiling, after deducting fixed obligations, rent, and buffer reserves.
- **Which Number to Use**: The Copilot explicitly instructs the user: **"Always apply for Number B. Number A represents the lender's risk appetite, not your family's safety."**

### 📊 Output 3 — What is a Fair Interest Rate & All-in APR?
- **Risk-Tiered Pricing Matrix**: Maps credit scores, employer tiers, and loan products to realistic market rate bands (e.g., 10.5%–12.25% for prime salaried borrowers; 9.25%–11.25% for secured LAP).
- **True RBI All-in APR**: Solves the exact Internal Rate of Return (IRR) discounting net disbursement ($P - \text{Fees} - \text{GST}$) against the stream of monthly EMIs, unmasking hidden 1.25%+ processing fees.
- **"Unknown is Never Zero"**: If a borrower doesn't know their bureau score, the engine **never** assumes default or penalizes them with a subprime 300 score. Instead, the estimated rate band widens symmetrically (±2.5%) and flags the estimate.
- **"Confidence Widens with Silence"**: Confidence rating (HIGH, MEDIUM, LOW) is determined by the depth of user inputs. The less verified data provided, the wider the rate spread and the lower the confidence score.

### 📅 Output 4 — What EMI Ceiling Should I Agree To?
- **Safe Monthly EMI Ceiling**: The exact rupee ceiling a borrower should commit to each month without exhausting emergency liquidity.
- **Tenure Trade-Off Matrix**: Displays side-by-side comparisons across 2, 3, 4, and 5-year tenures, showing monthly installment vs. total interest bleeding. It highlights the optimal sweet spot (balancing affordable monthly cash flow against cumulative interest cost).

---

## 3. Stress Scenario Simulator & Negotiation Card

### ⚡ Stress Scenario Simulator (-10% to -40% Income Drop)
A static plan that works only when times are good is a bad plan. Borrowers frequently face variable pay cuts, industry slowdowns, job transitions, or medical emergencies.
- Interactive slider dynamically simulates a **-20% default income drop** (configurable up to -40%).
- Recalculates **Stressed FOIR** and **Net Monthly Discretionary Surplus**.
- Immediately flags if the borrower enters a critical deficit or breaches the 45% stressed debt threshold.

### 📋 1-Screen Lender Negotiation Card
A printable, copy-ready cheat sheet designed for the user to hold during phone calls or branch visits with loan officers:
- **Target Interest Rate Cap** (e.g., "Do not accept above 11.75%").
- **Processing Fee Cap** (e.g., "Cap at 1.0% + GST; insist on fee waiver").
- **Word-for-Word Negotiation Scripts** (e.g., *"My CIBIL score is 780 and I have pre-approved quotes from competing PSU banks at 10.5%. What is your best rate discount?"*).
- **Borrower Leverage Points** (e.g., Salary account relationship, low LTV collateral, zero historical defaults).
- **"Do Not Sign" Walk-Away Triggers** (e.g., Mandatory bundled insurance, flat-rate vs reducing-rate tricks, prepayment lock-ins).

---

## 4. Architecture & Technical Design

### Decoupled Domain Rules Engine
The core business logic is implemented as a **pure TypeScript domain engine** completely decoupled from React and presentation code:

```
src/
├── types/borrower.ts          # Pure domain models and contract types
├── rules/                     # Pure business logic (The "Brain")
│   ├── affordability.ts       # FOIR calculations, Safe vs Lender amounts
│   ├── interestRate.ts        # Pricing matrix, risk spreads, IRR All-in APR
│   ├── productRouting.ts      # Unsecured vs Secured LAP vs EV asset routing
│   ├── stressTest.ts          # Income reduction stress scenarios
│   ├── confidence.ts          # Uncertainty scoring ("confidence widens with silence")
│   └── evaluateBorrower.ts    # Master evaluation pipeline generating all 4 outputs
├── questions/
│   └── questionTree.ts        # 8 Must questions + contextual branching & impact notes
├── data/
│   ├── personas.ts            # Built-in benchmark personas (Priya, Ravi, Anita)
│   └── assumptions.ts         # Banking benchmarks, credit spreads, fee limits
└── components/                # Modular React UI (Glassmorphic, responsive, accessible)
```

### Key Architectural Strengths:
1. **Deterministic & Testable**: The rules engine runs anywhere—Node.js, edge workers, unit test runners, or mobile apps—without DOM or React dependencies.
2. **100% Client-Side Privacy**: Zero data leaves the borrower's device. No login, no backend database, no third-party tracking, and zero credit bureau footprints.
3. **Transparent Mathematics ("Why this number?")**: Every calculated number exposes an explainer object detailing inputs, formulas, benchmarks, and intermediate steps.

---

## 5. Walkthrough of the 3 Test Personas

### 👩 Persona 1: Priya — Salaried MNC Engineer (Bengaluru)
- **Profile**: ₹1,10,000/mo net salary, ₹14,000 car EMI, ₹28,000 rent, 780 CIBIL.
- **Request**: ₹8,00,000 for a wedding (unsecured personal loan).
- **Copilot Evaluation**:
  - **Verdict**: 🟡 **BORROW LESS** (Safe amount: ₹5.0L – ₹6.5L).
  - **Lender Sanction (Number A)**: ₹11.5L – ₹13.5L (Bank willingly lends up to 50% FOIR).
  - **Fair Rate & APR**: 10.50% – 12.25% (All-in APR: 11.53% – 13.29% with 1.25% processing fee).
  - **Safe EMI**: ₹19,750/mo on a 3-year tenure (keeps FOIR at safe 30.7%).
  - **Stress Test**: Under a -20% income drop (to ₹88k), stressed FOIR reaches 38.4% with ₹26,250 free surplus remaining.

### 👨 Persona 2: Ravi — Kirana Store Owner (Jaipur)
- **Profile**: ₹65,000/mo cash business income, ₹0 CIBIL score (new to formal credit), ₹45L unencumbered commercial shop asset.
- **Request**: ₹15,00,000 for shop inventory expansion.
- **Copilot Evaluation**:
  - **Product Routing**: 🔄 **Routed from Unsecured PL to Secured Loan Against Property (LAP)**.
  - **Verdict**: 🟢 **BORROW (SECURED LAP ROUTE)**.
  - **Lender Sanction (Number A)**: ₹18.0L – ₹22.0L.
  - **Safe Amount (Number B)**: ₹12.0L – ₹15.0L (Safe 33% LTV against ₹45L shop).
  - **Fair Rate & APR**: 9.50% – 11.50% (Saves Ravi ₹6,00,000+ in interest over predatory 18%–24% NBFC unsecured personal loans).
  - **Tenure**: 7–10 years manageable installment.

### 👩‍👧 Persona 3: Anita — Gig Economy Worker (Delhi NCR)
- **Profile**: ₹28,000/mo variable gig delivery earnings, 2 dependents, 1 recent EMI bounce, 3 active digital instant app loans at 32%–36% APR.
- **Request**: ₹1,50,000 to purchase an electric commercial delivery two-wheeler.
- **Copilot Evaluation**:
  - **Verdict**: 🔴 **DON'T BORROW / RESTRUCTURE FIRST**.
  - **Reason**: Stressed cash flow is already in negative deficit (-₹3,500/mo). Taking another loan pushes stressed FOIR to 68%, risking catastrophic default.
  - **Prescription**: Prioritize debt consolidation of the 32%+ predatory app loans, request loan restructuring, and look for OEM battery-subscription EV programs rather than personal debt.

---

## 6. Trade-Offs Made During Development

| Decision Made | Trade-Off Accepted | Justification |
| :--- | :--- | :--- |
| **Pure Client-Side Engine** | No persistent server-side profile sync across devices | Guarantees 100% borrower privacy, zero bureau spam, and instant sub-10ms evaluation speeds without backend overhead. |
| **Rules Engine vs. ML Black Box** | Requires curated rule matrices and manual regulatory tuning | Critical for financial advocacy: an AI that cannot explain the exact mathematical formula behind its advice cannot be trusted by a borrower facing a loan officer. |
| **8-Question Adaptive Intake** | Doesn't collect every granular bank statement line-item | Minimizes drop-off. Collects the highest-signal financial anchors first, with contextual branching for specific profiles. |
| **Conservative FOIR Thresholds (30%–35%)** | Suggests lower loan amounts than banks are willing to sanction | Deliberate borrower-first stance: our goal is borrower solvency and liquidity, not maximizing bank disbursement volume. |

---

## 7. What We Would Build Next (Roadmap)

1. **OCR Document Reader (Client-Side WASM / Tesseract)**:
   - Allow borrowers to drop in a PDF bank statement or sanction letter.
   - Automatically extract existing EMIs, bounce history, and hidden fees without data leaving the browser.
2. **KFS (Key Fact Statement) Scanner & Red-Flag Detector**:
   - Parse RBI-mandated Key Fact Statements to spot hidden penal interest, foreclosure penalties, and bundled insurance charges.
3. **Multilingual Regional Voice Interface**:
   - Voice-based Q&A in Hindi, Tamil, Telugu, and Marathi for Tier-2/3 MSME borrowers and gig economy workers like Ravi and Anita.
4. **Interactive Amortization & Prepayment Simulator**:
   - Show how paying an extra ₹1,000/month or 1 extra EMI per year shaves years off loan tenure and saves lakhs in interest.

---

## 8. What We Would Cut (Ruthless Prioritization)

1. **Complex Credit Bureau Integrations**:
   - Direct bureau API integration requires KYC, consent verification, and leads to predatory credit card marketing. We cut this in favor of self-reported score bands and the "Unknown is Never Zero" rule.
2. **Lender Lead-Gen Referral Links**:
   - We strictly avoid affiliate referral buttons ("Click here to apply at Bank X"). Referral fees introduce direct conflicts of interest that undermine borrower trust.
3. **Extraneous Budgeting & Expense Tracking Features**:
   - Borrower Copilot is a specialized lending decision-support weapon, not a generic personal finance budgeting app. Keeping the scope focused ensures the user gets immediate answers in under 3 minutes.
