---
name: invoice-billing-expert
description: Combined guidelines for billing document templates, legal tax structures, print styling, and external quotation rules.
version: 1.0.0
category: finance
tags:
  - billing
  - invoice
  - template
  - quotation
  - print
---

# Invoice & Billing Expert - Unified Guidelines

This skill provides comprehensive instructions for designing, formatting, and writing professional billing documents (quotations, estimates, and invoices) for international and regional clients, combining layout best practices with strict citation rules.

---

## 1. Core Structural Components

Every quotation or invoice document must contain the following structural regions:

| Component | Description | Requirements |
|---|---|---|
| **Header & Branding** | Hexagon logo and professional business title. | Bold typography, visual dividers, dynamic colored accents. |
| **Metadata Bar** | Unique ID, issue date, validity/due date, prepared for, prepared by. | Clear grid layout, readable icons, precise metadata alignment. |
| **Project Overview** | A short, high-level summary of the contract scope. | Clean text card layout with rounded borders. |
| **Deliverables Table** | List of scope items with descriptions and checkboxes. | Structured lists with standard Lucide/SVG indicators. |
| **Financial Costing** | Table of charges, taxes, and final totals. | Structured columns (Description, Amount) with clean highlights for Total. |
| **Payment Schedule** | Milestones or installment breakdowns. | Grouped card layout showing advance deposit and final balances. |
| **Terms & Conditions** | Delivery timelines, support details, and credentials. | Grouped info cards with distinct icons. |
| **Footer & Totals** | Final signature block, designed-by label, and prominent grand total. | Bleed-to-edge dark background containing total cost highlight box. |

---

## 2. Layout, PDF Sizing, and Print CSS

For print-ready output, documents must be designed to fit exactly on a single A4 page without clipping, stacking, or overflow.

### Page Sizing Rule
Use the standard A4 dimensions: **`210mm` width by `297mm` height** (equivalent to `794px` by `1122px` at 96 DPI).

### Print CSS Constraints
Add the following stylesheet overrides for `@media print` to guarantee a single-page, borderless result:
```css
@media print {
  @page {
    size: A4 portrait;
    margin: 0mm !important; /* Forces borderless printing */
  }
  html, body {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
  .no-print {
    display: none !important;
  }
  .print-container {
    width: 210mm !important;
    height: 297mm !important;
    max-height: 297mm !important;
    min-height: 297mm !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
}
```

### Layout Stacking Fix
- Do **NOT** use responsive Tailwind breakpoints (`sm:`, `md:`, `lg:`) on the root container grid or flex elements. 
- Layout columns must be locked (e.g., `grid-cols-12`, `col-span-7`, `flex-row`) to prevent mobile-style stacking inside browser print engine viewports.

---

## 3. Regional Taxes & Legal Codes

When generating commercial invoices, verify and calculate regional tax structures:

1. **GST (India / Australia)**: Add a **18% GST** (India) or **10% GST** (Australia) itemized line where applicable. Include the business GSTIN or ABN number.
2. **VAT (European Union)**: Include the seller and buyer VAT numbers. For cross-border B2B sales in the EU, include the text:
   `"Reverse Charge - VAT to be paid by recipient"`
3. **Sales Tax (United States)**: Calculate local state sales tax (e.g., California 7.25% base) if selling tangible items.
4. **Fapiao (China)**: Add the corporate tax registration number.

---

## 4. External Quotations & Citations Rules

If quoting any external legal code, official terms, or template reference, adhere strictly to the following citation formatting rules:

1. **Always use fenced code blocks**: All quotations from external sources must live inside code blocks (` ``` `). Never use the Markdown blockquote syntax (`>`).
2. **Translation pairing**: Place the original text and its translation inside the same code block separated by exactly one blank line. Do not insert horizontal rules or put translations in parentheses.
3. **Citations on the next line**: The source reference (e.g., `[Author (YYYY/MM), location]`) must sit on the line immediately following the closing code block fence.
4. **No bare numbers**: Banish citations like `[1]` or `[2]`. Always use label-based sources.

### Example of Compliant Citation
```markdown
```
This is the original text quoted from the Hostinger terms.

This is the translation of the terms if in a different working language.
```
[hostinger-tos (2026/01), Section 4.2]
```

---

## 5. Invoicing Best Practices

1. **Auto-Calculate Totals**: Never hardcode calculated fields (Subtotals, Taxes, Grand Totals) in scripts; always double-check arithmetic programmatically.
2. **Clear Payment Instructions**: Provide explicit details (Bank Transfer, Account Numbers, UPI details) to ensure friction-free payments.
3. **Late Payment Penalty Clauses**: Explicitly state payment deadlines (e.g. Net 30) and interest penalties for overdue balances.
