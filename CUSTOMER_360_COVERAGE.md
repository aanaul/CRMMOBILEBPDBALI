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
