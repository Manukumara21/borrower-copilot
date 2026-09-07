# PERSONAS.md — Comprehensive Test Run-Throughs

> **Borrower Copilot Build Challenge**  
> Documented test runs for the three benchmark borrowers evaluated against the decision rules engine.

---

# Persona 1 — 👩 Priya (Salaried MNC Software Engineer, Bengaluru)

### 1. Questions & Answers Profile
1. **Loan Purpose**: Wedding / Social Event
2. **Loan Amount Requested**: ₹8,00,000
3. **Income Type**: Salaried (Top MNC / Govt)
4. **Net Monthly Take-Home Income**: ₹1,10,000
5. **Existing Monthly EMIs**: ₹14,000 (Car loan, 2 years remaining)
6. **Monthly Household Expenses**: ₹28,000 (Rent & living costs in Bengaluru)
7. **Age**: 29
8. **Credit Score**: 780 (Prime / 750+)
9. **Work Experience**: 5 Years (Top MNC)
10. **Recent Bounces**: 0

---

### 2. Four Major Outputs

#### Output 1 — Should I Borrow?
- **Verdict**: 🟡 **BORROW LESS FOR FINANCIAL SAFETY**
- **Primary Reason**: You asked for ₹8.0L, but a safer amount for your profile is **₹5.0L – ₹6.5L**. Adding a new ₹26,500 EMI for an ₹8L wedding loan to your existing ₹14,000 car EMI pushes your total debt ratio to **36.7%**, putting excessive pressure on monthly savings and rent.
- **Underwriting Rationale**:
  - Wedding expenses are non-productive consumption that do not generate cash flow.
  - While banks will eagerly approve up to ₹13.5L, conservative financial planning caps total debt at 28.5%–30% of income.

#### Output 2 — How Much Can I Borrow?
- **Number A (Likely Lender Sanction)**: **₹11.5L – ₹13.5L** (Bank will approve up to 50% FOIR)
- **Number B (Safe Amount for You)**: **₹5.0L – ₹6.5L** (Capped to protect emergency buffers)
- **Which Number to Use**: **Use the Safe Borrower Amount (Number B)** when applying to lenders. Do not let bank sales agents push you to the ₹11L+ sanction limit.

#### Output 3 — What is a Fair Interest Rate & All-in APR?
- **Target Interest Rate Band**: **10.50% – 12.25% p.a.** (Reducing balance)
- **Standard Processing Fee**: **1.25% + 18% GST** (≈ ₹10,000 – ₹12,000)
- **RBI True All-in APR**: **11.53% – 13.29%**
- **Confidence Rating**: **HIGH** (Verified 780 CIBIL score + 5-yr MNC track record)

#### Output 4 — What EMI Ceiling Should I Agree To?
- **Safe Monthly EMI Ceiling**: **₹18,000 – ₹20,000 / month** (Room remaining after ₹14,000 car EMI)
- **Tenure Trade-Off Matrix**:
  | Tenure | Monthly EMI | Total Interest Paid | Total Payment | FOIR (%) | Suitability |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | **2 Years** | ₹28,800 | ₹91,200 | ₹6,91,200 | 38.9% | Above Safe Ceiling |
  | **3 Years** | **₹19,750** | **₹1,11,000** | **₹7,11,000** | **30.7%** | 🟢 **Recommended Best Fit** |
  | **4 Years** | ₹15,600 | ₹1,48,800 | ₹7,48,800 | 26.9% | Lower EMI, Higher Interest |
  | **5 Years** | ₹13,100 | ₹1,86,000 | ₹7,86,000 | 24.6% | Excessive Interest for Wedding |

---

### 3. Stress Scenario Simulation (-20% Income Drop)
- **Original Net Income**: ₹1,10,000 $\rightarrow$ **Stressed Income**: ₹88,000
- **Total Debt Obligations**: ₹14,000 (Car) + ₹19,750 (New Loan) = ₹33,750
- **Stressed FOIR**: **38.4%** (Within 45% critical limit)
- **Remaining Buffer After Rent & Expenses**: ₹26,250 free monthly surplus.
- **Stress Verdict**: ⚠️ *Tight Budget: Manageable, but wedding loan should not exceed ₹6L.*

---

### 4. Priya's Negotiation Card (Cheat Sheet)
```text
┌─────────────────────────────────────────────────────────────────┐
│              BORROWER COPILOT — LENDER NEGOTIATION CARD          │
│                      Profile: Priya (Bengaluru)                 │
├─────────────────────────────────────────────────────────────────┤
│ Target Loan: ₹5.5L – ₹6.5L (Reject lender offers of ₹8L–₹13L)    │
│ Target Interest Rate Band: 10.5% – 12.25% p.a.                  │
│ Safe Monthly EMI Ceiling: ₹19,500 / month                        │
│ Max Processing Fee: ≤ 1.0% + GST (Demand fee waiver)            │
│                                                                 │
│ KEY BORROWER LEVERAGE:                                          │
│ • Prime CIBIL Score: 780 with zero-default history              │
│ • 5 Years continuous employment with Tier-1 MNC                 │
│ • High debt servicing track record on existing car loan         │
│                                                                 │
│ EXACT QUOTE TO HOLD UP TO THE LENDER:                           │
│ "My CIBIL score is 780 with 5 years at an MNC. Premier banks    │
│ are offering 10.5%–11.5% for prime profiles. If your quote       │
│ exceeds 12.25% or charges more than 1% processing fee, I will   │
│ take the pre-approved offer from my salary account bank."       │
│                                                                 │
│ WALK-AWAY RED FLAGS:                                            │
│ ✕ Any interest rate above 12.5%                                 │
│ ✕ Mandatory bundled loan insurance without opt-out disclosure   │
│ ✕ Processing fee exceeding ₹7,500                               │
└─────────────────────────────────────────────────────────────────┘
```

---

# Persona 2 — 👨 Ravi (Kirana Store Owner, Mysuru)

### 1. Questions & Answers Profile
1. **Loan Purpose**: Business Expansion (Second stock line + delivery vehicle)
2. **Loan Amount Requested**: ₹15,00,000
3. **Income Type**: Self-Employed Business / Kirana
4. **Net Monthly Income**: ₹60,000 (₹40k–₹80k cash earnings; ITR ₹4,20,000/yr)
5. **Existing Monthly EMIs**: ₹0 (Debt free)
6. **Monthly Household Expenses**: ₹24,000
7. **Age**: 42
8. **Credit Score**: *Unknown / None*
9. **Business Vintage**: 14 Years running Kirana store
10. **Owned Property Asset**: **₹45,00,000** (Commercial shop, clear title)
11. **Co-Applicant Income**: ₹18,000/mo (Wife's income)

---

### 2. Four Major Outputs

#### Output 1 — Should I Borrow?
- **Verdict**: 🟢 **SAFE TO BORROW (ROUTED TO SECURED LOAN)**
- **Primary Reason**: Your request of ₹15.0L is sound and productive for business inventory and vehicle asset generation. Because you have cash income and no bureau score, **an unsecured personal loan would fail or cost 22%+**. By pledging your ₹45L commercial shop, you are routed to a **Secured Loan Against Property (LAP) / MSME Mortgage** at a low ~10% interest rate and safe 33% LTV.
- **Underwriting Rationale**:
  - Combined household income: ₹60,000 + ₹18,000 = ₹78,000/mo.
  - Zero existing debt gives full monthly capacity for a long-tenure secured loan.

#### Output 2 — How Much Can I Borrow?
- **Number A (Likely Lender Sanction)**: **₹25.0L – ₹29.0L** (Based on 55% LTV against ₹45L shop)
- **Number B (Safe Amount for You)**: **₹16.0L – ₹18.5L** (To keep EMI under ₹22,000)
- **Which Number to Use**: You can comfortably borrow your requested **₹15,00,000** under Secured LAP.

#### Output 3 — What is a Fair Interest Rate & All-in APR?
- **Target Interest Rate Band**: **8.75% – 13.00% p.a.** (Secured LAP base 9.5%–11.25%, widened due to unknown credit score)
- **Standard Processing Fee**: **0.75% + 18% GST**
- **RBI True All-in APR**: **9.13% – 13.40%**
- **Confidence Rating**: **MEDIUM** (Unknown credit score widens band; 14-yr vintage & ₹45L property anchors asset safety)

#### Output 4 — What EMI Ceiling Should I Agree To?
- **Safe Monthly EMI Ceiling**: **₹23,500 / month** (30% of ₹78,000 household income)
- **Tenure Trade-Off Matrix (Secured LAP)**:
  | Tenure | Monthly EMI | Total Interest Paid | Total Payment | FOIR (%) | Suitability |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | **5 Years** | ₹31,900 | ₹4,14,000 | ₹19,14,000 | 40.8% | Tight for cash flow |
  | **7 Years** | ₹25,100 | ₹6,08,000 | ₹21,08,000 | 32.1% | Manageable |
  | **10 Years**| **₹19,800**| **₹8,76,000** | **₹23,76,000** | **25.3%**| 🟢 **Recommended Best Fit** |
  | **15 Years**| ₹16,400 | ₹14,52,000 | ₹29,52,000 | 21.0% | Lower EMI, High Interest |

---

### 3. Stress Scenario Simulation (-20% Income Drop)
- **Original Household Income**: ₹78,000 $\rightarrow$ **Stressed Income**: ₹62,400
- **Proposed 10-Yr LAP EMI**: ₹19,800
- **Stressed FOIR**: **31.7%** (Comfortably below 45% critical limit)
- **Remaining Buffer**: ₹18,600 monthly cash surplus.
- **Stress Verdict**: ✅ *Resilient: Productive loan creates additional revenue; shop collateral prevents debt stress.*

---

### 4. Ravi's Negotiation Card (Cheat Sheet)
```text
┌─────────────────────────────────────────────────────────────────┐
│              BORROWER COPILOT — LENDER NEGOTIATION CARD          │
│                       Profile: Ravi (Mysuru)                    │
├─────────────────────────────────────────────────────────────────┤
│ Target Loan: ₹15,00,000 (Structure as Secured LAP / MSME Loan)  │
│ Target Interest Rate Band: 9.5% – 11.25% p.a.                   │
│ Safe Monthly EMI Ceiling: ₹20,000 / month (10-Year Tenure)       │
│ Max Processing Fee: ≤ 0.75% + GST                               │
│                                                                 │
│ KEY BORROWER LEVERAGE:                                          │
│ • Pledging ₹45,00,000 commercial shop (LTV is ultra-safe 33%)   │
│ • 14 Years established business running in same location        │
│ • Zero existing debt obligations                                │
│ • Combined ₹78,000 household income with spouse co-applying     │
│                                                                 │
│ EXACT QUOTE TO HOLD UP TO THE LENDER:                           │
│ "I am offering an unencumbered commercial property worth ₹45    │
│ Lakhs with 14 years business vintage. I will not accept high-   │
│ cost unsecured business loans at 18%–22%. I require a Secured   │
│ MSME / LAP facility at 9.5%–11% with a 10-year repayment term." │
│                                                                 │
│ WALK-AWAY RED FLAGS:                                            │
│ ✕ Lender trying to sell unsecured loan at 18%+ for 'fast login' │
│ ✕ Processing fee over 1% on secured property mortgage           │
│ ✕ Tenure shorter than 7 years (causes cash flow strain)         │
└─────────────────────────────────────────────────────────────────┘
```

---

# Persona 3 — 👩 Anita (Gig Delivery & Home Tailoring, Hubballi)

### 1. Questions & Answers Profile
1. **Loan Purpose**: Vehicle / Electric Scooter
2. **Loan Amount Requested**: ₹1,50,000
3. **Income Type**: Gig / Informal Variable Cash (Platform delivery + tailoring)
4. **Net Monthly Income**: ₹28,000 (₹26k–₹30k range)
5. **Existing Monthly EMIs**: ₹4,500 (Repaying 3 active instant app loans)
6. **Monthly Household Expenses**: ₹20,000 (2 children; husband unemployed 8 months)
7. **Age**: 35
8. **Credit Score**: Poor / Below 650 (Due to instant app inquiries & 1 bounce)
9. **Existing Loans**: 3 app loans totaling ₹35,000 at **33% interest**
10. **Recent Bounces**: 1 in last month

---

### 2. Four Major Outputs

#### Output 1 — Should I Borrow?
- **Verdict**: 🔴 **DO NOT BORROW UNSECURED / RESTRUCTURE FIRST**
- **Primary Reason**: Taking a fresh unsecured loan right now is extremely dangerous. You are already paying **₹4,500/month on 3 predatory app loans at 33%+ interest**, had a recent payment bounce, and your spouse is unemployed. Adding a ₹7,500 EMI for an unsecured ₹1.5L loan will push total debt to **43%**, directly triggering default.
- **Actionable Advice**:
  1. Do not take fresh private or app loans.
  2. Clear or consolidate the 33% high-interest loans first.
  3. Explore OEM electric scooter captive financing with battery-as-a-service / lease where the vehicle is hypothecated at subsidized rates.

#### Output 2 — How Much Can I Borrow?
- **Number A (Likely Lender Sanction)**: **₹1.6L – ₹1.9L** (Aggressive predatory lenders will push fresh loans)
- **Number B (Safe Amount for You)**: **₹60,000 – ₹70,000** (Or ₹0 until existing app loans cleared)
- **Which Number to Use**: **Do not take the lender's loan**. Restructure existing loans first.

#### Output 3 — What is a Fair Interest Rate & All-in APR?
- **Target Interest Rate Band**: **18.75% – 27.25% p.a.** (Reflects non-prime tier due to bounce & app loans)
- **All-in APR**: **20.02% – 28.64%**
- **Confidence Rating**: **MEDIUM** (High risk signals confirmed)

#### Output 4 — What EMI Ceiling Should I Agree To?
- **Safe Monthly EMI Ceiling**: **₹2,500 / month** (Only ₹2,500 room remaining above existing ₹4,500 app debt)
- **Tenure Trade-Off Analysis**:
  - A standard 2-year loan for ₹1.5L requires an EMI of ~₹7,600/month.
  - Adding ₹7,600 to existing ₹4,500 debt = **₹12,100/mo total debt (43.2% FOIR)**.
  - This leaves only ₹15,900 for a family of 4, which is below basic living costs.

---

### 3. Stress Scenario Simulation (-20% Income Drop)
- **Original Income**: ₹28,000 $\rightarrow$ **Stressed Income**: ₹22,400
- **Total Debt with New Loan**: ₹12,100
- **Stressed FOIR**: **54.0%** (Severe distress threshold breached)
- **Monthly Cash Deficit**: **-₹7,906 / month** (Deficit means missed loan payments and starvation)
- **Stress Verdict**: 🚨 *High Default Risk: Immediate payment bounce and debt trap.*

---

### 4. Anita's Negotiation Card (Restructuring Cheat Sheet)
```text
┌─────────────────────────────────────────────────────────────────┐
│              BORROWER COPILOT — LENDER NEGOTIATION CARD          │
│                      Profile: Anita (Hubballi)                  │
├─────────────────────────────────────────────────────────────────┤
│ Target Action: RESTUCTURE & CONSOLIDATE FIRST (Avoid fresh debt) │
│ Safe Max EMI: ₹2,500 / month (Do not accept any EMI > ₹3,000)   │
│ Target Rate for Debt Consolidation: < 16% (Replace 33% loans)   │
│ Vehicle Option: Hypothecated EV Subsidy / Battery Subscription   │
│                                                                 │
│ KEY BORROWER LEVERAGE:                                          │
│ • Income from 2 active occupations (delivery + tailoring)       │
│ • Commercial asset generates direct daily delivery earnings     │
│ • Eligible for PM e-Drive / EV green mobility state subsidies   │
│                                                                 │
│ EXACT QUOTE TO HOLD UP TO THE LENDER / FINANCIER:               │
│ "I will not take an unsecured personal loan at 24%–30%. I am     │
│ buying a commercial electric scooter for delivery work. I want   │
│ hypothecated vehicle financing under the green mobility subsidy  │
│ with an EMI below ₹2,500/month, or a battery subscription."      │
│                                                                 │
│ WALK-AWAY RED FLAGS:                                            │
│ ✕ Any digital app loan with weekly deduction or daily interest  │
│ ✕ Loans charging upfront processing fees above 2.5%             │
│ ✕ Taking fresh debt before closing the 3 existing app loans     │
└─────────────────────────────────────────────────────────────────┘
```
