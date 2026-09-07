# RULES.md — Decision Rules, Thresholds & Lending Matrix

> **Project**: Borrower Copilot (Lokta Build Challenge)  
> **Format Standard**: `What · Value · Why · Source`  
> **Philosophy**: Transparent, explainable, borrower-advocate decision support.

---

## 1. Primary Decision Rules Matrix

| What | Value | Why | Source |
| :--- | :--- | :--- | :--- |
| **Safe Salaried Debt Ceiling (FOIR)** | **30% – 35% of Net Income** | Limits total monthly debt service obligations to allow at least 65% of net income for rent, living expenses, family emergencies, and retirement savings. Prevents over-leveraging. | My Judgement (Conservative Financial Planning Standard) |
| **Lender Aggressive Debt Ceiling (FOIR)** | **50% (Salaried) / 45% (Self-Employed / Variable)** | Standard commercial bank underwriting limit. Banks will willingly sanction loans up to 50% FOIR because their business model maximizes loan book size, even when it strains borrower liquidity. | Indian Retail Underwriting Norms (HDFC Bank, SBI, ICICI) |
| **Consumption Loan FOIR Penalty** | **-5% (Cap at 30% FOIR)** | Loans for weddings, social events, vacations, or lifestyle purchases do not generate future cash flow or build tangible wealth. Warrants a strictly conservative ceiling compared to productive investments. | My Judgement |
| **High Living Expense Adjustment** | **-1.5% to -2% FOIR reduction** | Triggered when declared rent/household expenses exceed 25% of net income (common in Tier-1 cities like Bengaluru/Mumbai), ensuring debt doesn't eat into non-negotiable living costs. | My Judgement (Cash-Flow Based Underwriting) |
| **Low Income Protection Ceiling** | **26% – 28% Safe FOIR** | For net income under ₹30,000/month, discretionary margins are minimal; any small shock leads to starvation or default. | RBI Microfinance Lending Directives (Prudential Limits) |
| **Prime Personal Loan Base Rate** | **10.5% – 12.25% p.a. (Nominal reducing)** | Fair market rate band for prime salaried borrowers (Tier-1 employer, CIBIL 750+, zero bounces). | BankBazaar / Paisabazaar Q1 2026 Prime Rates |
| **Standard Personal Loan Base Rate** | **12.5% – 15.5% p.a.** | Standard market pricing for Tier-2 firms or CIBIL 700–749. | Indian Retail Lending Benchmark |
| **Credit Score Penalty Spreads** | **750+: 0%<br>700–749: +1.25%<br>650–699: +3.5%<br>&lt;650: +7.0% to +10.0%** | Risk-based credit spread ladder reflecting probability of default across bureau score tiers. | TransUnion CIBIL / Experian Risk Tiering Norms |
| **"Unknown is Never Zero" Rule** | **Spread Widened by ±2.5%; Confidence = LOW** | If a borrower does not know their credit score, the system NEVER assigns 0 or 300 (which would falsely label them as high risk). Instead, the estimated rate band expands and uncertainty is explicitly flagged. | Lokta Challenge Core Requirement |
| **"Confidence Widens with Silence"** | **High (≥4 verified anchors), Medium (2–3 anchors), Low (&lt;2 or missing bureau/income)** | Measures completeness of user disclosure. Fewer answers directly widen rate bands and downgrade confidence indicators. | Lokta Challenge Core Requirement |
| **Secured LAP Product Routing Trigger** | **Asset Value ≥ 1.5× Loan Amount & Loan ≥ ₹8,00,000** | High-ticket borrowing (>₹8L) or informal cash income with unencumbered commercial/residential property is routed to Secured Loan Against Property (LAP) rather than unsecured personal loans. | MSME Banking / Retail Mortgage Underwriting |
| **Secured LAP Interest Rate Band** | **9.25% – 11.25% p.a. (up to 10–15 yr tenure)** | Secured mortgage backing drastically reduces bank loss-given-default (LGD), yielding 4%–10% lower rates than unsecured credit. | Indian Commercial Bank LAP Lending Schedules |
| **Two-Wheeler / EV Hypothecation Rule** | **11.0% – 14.5% p.a. (up to 3–4 yr tenure)** | Vehicle asset hypothecation offers lower rates and subsidized OEM/battery-lease structures compared to personal loans. | Automobile Finance Industry Benchmarks |
| **"Do Not Borrow" Predatory Debt Trigger** | **Existing debt interest rate ≥ 25% + recent bounce OR proposed FOIR &gt; 50%** | When a borrower is already trapped in high-cost instant app loans (30%+ APR) with payment distress, fresh borrowing accelerates default. Copilot advises restructuring and consolidation first. | Responsible Digital Lending Code of Conduct (FACE / DLAI) |
| **"Borrow Less" Trigger** | **Requested Loan Amount &gt; Safe Borrower Amount Max** | Triggered when a lender would technically sanction the amount, but monthly EMI breaches safe cash-flow limits (e.g. Priya's ₹8L wedding ask). | Lokta Challenge Core Requirement |
| **Standard Processing Fee Benchmark** | **1.0% – 1.25% of loan amount (+ 18% GST)** | Fair institutional fee range for retail personal and secured loans. Fees above 1.5% are flagged as excessive in the Negotiation Card. | RBI Circular on Fair Lending Practices |
| **All-in APR Calculation Formula** | **Internal Rate of Return (IRR) equating net disbursement to EMI stream** | Equates net cash received ($P - \text{Fees} - \text{GST}$) to the stream of monthly EMIs, revealing true annualized borrowing cost. | RBI Key Fact Statement (KFS) Regulatory Mandate |
| **Stress Scenario Shock Parameter** | **-20% Net Monthly Income Drop** | Evaluates whether the borrower can continue paying EMIs without defaulting if income drops by 20% due to slowdown, variable pay loss, or temporary disruption. | Lokta Challenge Core Requirement |
| **Critical Stress Threshold** | **Stressed FOIR &gt; 45% or Monthly Deficit &lt; ₹0** | If a 20% income reduction pushes total debt payments above 45% of stressed income or creates negative cash flow, a warning is raised. | Stress Underwriting & Liquidity Planning |

---

## 2. Mathematical Formulas Reference

### A. Equated Monthly Installment (Reducing Balance EMI)
$$EMI = P \times r \times \frac{(1+r)^n}{(1+r)^n - 1}$$
Where:
- $P$ = Loan Principal (INR)
- $r$ = Monthly interest rate = $\frac{\text{Annual Nominal Rate}}{12 \times 100}$
- $n$ = Loan tenure in months

### B. Maximum Supported Principal From Monthly EMI
$$P = EMI \times \frac{(1+r)^n - 1}{r \times (1+r)^n}$$

### C. Fixed Obligation to Income Ratio (FOIR)
$$\text{FOIR (\%)} = \frac{\text{Existing Monthly EMIs} + \text{Proposed Loan EMI}}{\text{Net Monthly Income}} \times 100$$

### D. All-in APR (Annual Percentage Rate)
$$\text{Net Disbursement} = P - (\text{Fee} \times P) \times (1 + \text{GST})$$
$$\text{Net Disbursement} = \sum_{t=1}^{n} \frac{EMI}{(1 + \frac{APR}{12})^t}$$
Solved via Newton-Raphson iteration.

---

## 3. Defense and Justifications for Interview Review

- **Why separate Lender Sanction from Safe Borrower Amount?**
  Lenders optimize for volume and interest earnings subject to regulatory ceilings (50% FOIR). Borrowers optimize for financial survival, emergency buffers, and wealth creation. The gap between what a bank will lend and what a borrower can safely afford is where financial distress originates.
- **Why is Priya advised to BORROW LESS (₹5.5L–₹6.5L instead of ₹8L)?**
  Her income (₹1.1L) is high and credit score (780) is prime, but she already pays ₹14k car EMI and ₹28k rent. A wedding is a non-productive consumption expense. Adding a ₹26k EMI for ₹8L pushes her total debt to 37% and stressed FOIR to 46%. Capping at ~₹5.5L–₹6.5L keeps total debt within the safe 28%–30% ceiling.
- **Why is Ravi routed to Secured LAP?**
  Ravi has no CIBIL score and variable cash income. An unsecured personal loan for ₹15L would either be outright rejected or priced at punitive NBFC rates (20%+). By leveraging his unencumbered commercial shop worth ₹45L, he unlocks Secured LAP at ~9.5%–11.5% with a safe 33% LTV and up to 10–15 years tenure.
- **Why is Anita advised to NOT BORROW?**
  Anita earns ₹28k/mo with an unemployed spouse, 2 children, a recent EMI bounce, and 3 active digital app loans at 30%+ interest. Taking another ₹1.5L unsecured loan will push her stressed cash flow to a severe negative deficit (-₹7,900/mo). Her immediate priority must be restructuring and clearing predatory debt first.
