# Implementation Plan: Expense & Budget Visualizer

## Overview

Simplified implementation plan for the Expense & Budget Visualizer web application. Built with vanilla HTML, CSS, and JavaScript using Chart.js for visualization and Local Storage for persistence.

## Tasks

- [x] 1. Create project structure
  - Create css/ directory with empty style.css file
  - Create js/ directory with empty script.js file
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 2. Create HTML structure (index.html)
  - Set up HTML5 document with meta tags
  - Add transaction form (item name, amount, category dropdown: Food/Transport/Fun)
  - Add balance display container (ID: balance-display)
  - Add transaction list container (ID: transaction-list)
  - Add pie chart container (canvas with ID: expense-chart)
  - Include Chart.js via CDN
  - Link css/style.css and js/script.js
  - _Requirements: 1.1, 1.4, 2.1, 3.1, 4.1, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [x] 3. Create CSS styling (css/style.css)
  - Style form elements (inputs, select, button)
  - Style balance display (large, bold text)
  - Style transaction list items (name, amount, category, delete button)
  - Style chart container
  - Add error message styling
  - _Requirements: 2.1, 2.2, 3.1, 4.1, 7.3, 7.5_

- [x] 4. Create JavaScript logic (js/script.js)
  - Define CATEGORIES array: ['Food', 'Transport', 'Fun']
  - Define Local Storage key: 'transactions'
  - Implement Transaction and State data models
  - Implement loadState() and saveState() for Local Storage
  - Implement input validation (non-empty fields, positive amount)
  - Implement addTransaction() with unique ID generation
  - Implement deleteTransaction() by ID
  - Implement calculateBalance() summing all transaction amounts
  - Implement formatCurrency() for Rp display with comma separators
  - Implement calculateCategoryTotals() for pie chart data
  - Implement Chart.js pie chart initialization and updateChart()
  - Implement renderTransactions() to display transaction list
  - Implement form submit handler with validation
  - Implement delete button click handler
  - Wire all components together in initialize() function
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4_

## Notes

- All JavaScript logic in single js/script.js file
- Chart.js loaded via CDN
- Refer to design.md for implementation details and algorithm descriptions
- Property-based testing not applicable (UI rendering and Local Storage operations)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["4.1"] }
  ]
}
```