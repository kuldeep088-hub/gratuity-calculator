# Gratuity Calculator (freegratuitycalculator.com)

A high-precision gratuity calculation platform for Indian employees and HR teams, adhering strictly to the **Payment of Gratuity Act, 1972** and **Section 10(10)** of the Income Tax Act, 1961. Designed with the Vercel Geist aesthetic (`DESIGN.md`).

## ✨ Key Features

- **Covered vs. Not Covered under Gratuity Act 1972**:
  - Covered formula: `(15 × Last Drawn Salary × Tenure) ÷ 26` (with rounding for service > 6 months).
  - Non-covered formula: `(15 × 10-month Avg Salary × Completed Years) ÷ 30`.
  - Government Employee option (100% tax-free up to ₹25 Lakhs).
- **Section 10(10) Tax Exemption Engine**: Computes exact tax-exempt vs. taxable gratuity with visual segmented progress bar.
- **Tenure Breakdown**: Dual years + extra months inputs with automated statutory rounding.
- **5-Year Eligibility Guard**: Explains the 4 years 240 days rule and death/disablement waivers.
- **Career Accumulation Matrix**: Dynamic milestone forecast with annual salary increment projections.
- **CTC-to-Basic Splitter**: Helps users split monthly CTC into basic pay.
- **Instant Export**: Print / PDF statement generation and one-click clipboard summary sharing.

## 🚀 Development

```bash
# Start Astro dev server in background mode
npx astro dev --background

# Server status & logs
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## 🔄 Automatic GitHub Sync

To automatically watch this folder and push any file updates directly to GitHub:

```bash
npm run sync:watch
```

Whenever you modify and save any file, the watcher debounces for 3 seconds, stages the changes, creates an auto-timestamped commit, and pushes to `origin main`.
