# Customer 360 implementation

The former Nasabah module is now Customer 360 in CMS and mobile. Existing customer IDs, conversion links and access permissions are preserved.

## Coverage
- Overview: recorded funds, credit outstanding, relationship completeness, dormant accounts, maturities, open tasks, opportunities and complaints.
- Profile: CIF, NIK, identity, addresses, employment, contact, AO/RM, conversion and referral provenance, correction approval, active/inactive status.
- Portfolio: funding and credit products, limits, outstanding, collectibility and maturity.
- Accounts and transactions: active/dormant/closed accounts, dated balances, transaction history, date filters and cashflow summaries.
- Credit and collateral: facilities, collateral appraisals, location, ownership, associated documents and application history.
- Interaction and complaint history: unified timeline, channels, follow-up tasks, complaint PIC, priority, target, status and resolution history.
- Relationship intelligence: owned products, product gaps, working-capital/funding/payroll context, related customers and creation of cross-sell opportunities. Suggestions are deterministic CRM rules, not AI predictions.
- Documents: PDF/JPEG/PNG uploads up to 3 MB, credit/collateral references, expiry, authenticated previews and downloads, visit photo links.
- Related work: Tasks and Opportunities use existing workflows.
- Audit and sources: audit records, provenance, dated positions and read-only source protection.

## Integration boundaries
Core Banking, LOS, WhatsApp, email and call centre feeds are not connected. Financial and channel records can be entered manually and are labeled accordingly. Real bank feeds and AI scoring require separate integration. No artificial balances or automatic messaging are claimed.

## Verification
All ten tab renderers, HTML escaping, product gaps, transaction validation, complaint resolution rules, source protection, document upload/download signatures and cross-AO file access checks covered by automated checks. Both Netlify builds and shared backend production build checked. Browser visual QA was unavailable in this environment.

## Cross-sell user flow (RFI Modul 2f)
1. Open Customer 360 and click the customer row.
2. Click **Cross-sell** in the detail header, the Overview highlight or the second tab.
3. Check **Produk yang dimiliki**, consolidated from portfolio, accounts and credit facilities.
4. Review **Payroll, Kredit & Dana Opportunity** and filter the **Daftar peluang Cross-sell**.
5. Expand **Lihat alasan & data pendukung**. Missing products are labeled gaps requiring confirmation, not confirmed needs. Six RFI source categories are shown with their availability.
6. Click **Tinjau & buat Opportunity**. Confirm the customer need, select an active master product and acknowledge review. Payroll without a matching master product requires explicit selection.
7. Complete the existing Opportunity form: indicative value, basis, target close and AO. Cross-sell origin and category are retained in the opportunity name and need description. Submit to create the pipeline item. Existing active opportunities for the same customer/product open directly to avoid duplication.
8. Alternatively use **Buat Task follow-up** before creating an Opportunity.

Payroll indication requires a positive employee count and explicit payroll bank = Bank lain. Unknown bank information does not create a payroll recommendation. Credit and funding indications use recorded needs and supporting CRM context. These are not suitability decisions or AI scores.

Automated checks additionally cover all Cross-sell categories, six evidence sources, payroll qualification, product ownership exclusion and active-opportunity deduplication. Visual browser QA was not available.
