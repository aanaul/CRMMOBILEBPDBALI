# BPD Bali - Light workspace design system

Reference: user's Geofence screenshot, 27 November 2026. Apply to CMS and mobile, preserving business behavior and access permissions.

## Visual contract
- White surfaces on #f5f7fc, fine #dfe7f2 borders, minimal elevation.
- Primary #0875d1 (darkened slightly from the visual reference for white-label contrast); selected #e8f4ff with #0069bf text.
- Main ink #1b304e; secondary #596e8b. Muted labels remain readable and never communicate status alone.
- Shared sans-serif family: IBM Plex Sans / Inter / platform fallback. Body 16px; operational labels 14px; secondary metadata 12-13px. CMS tables 14px, mobile editable inputs 16px.
- Spacing rhythm 4/8/12/16/24/32px; default surface radius 10px, field/button radius 8px, chips fully rounded.
- Desktop controls 36-40px. Mobile controls >=44px; bottom navigation and safe areas preserved.
- Primary buttons solid blue; secondary white/bordered; destructive red text; selected filters blue-tinted, never dark blocks.
- Content tabs use a blue underline; filtering chips use pills. Selection has aria state in addition to color.
- Tables use a faint header, thin row dividers, no exaggerated shadows or alternating heavy stripes. Action buttons must never split their labels.
- Dashboard/Customer/attendance/profile heroes use light surfaces and a small blue accent rather than dark gradients.
- Keep all existing forms, filters, handlers, dialog controls, account/branch scopes and data unchanged.

## Validation
Check Login, branch picker, every top-level module, representative details and forms; native and component-bridged dropdowns; enabled/hover/focus/disabled states; CMS and mobile. No visual rendering claim without browser evidence. Temporary component review fixtures must not ship.
