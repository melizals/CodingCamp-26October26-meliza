# Requirements Document

## Introduction

The Expense & Budget Visualizer is a web application that helps users track their daily expenses and visualize spending patterns by category. Users can add transactions with item names, amounts, and categories, view a scrollable list of all transactions, see their total balance, and explore spending distribution through a pie chart. All data is stored locally in the browser using the Local Storage API.

## Glossary

- **Expense Budget Visualizer**: The web application that tracks and visualizes user expenses
- **Transaction**: A single expense entry containing an item name, amount, and category
- **Category**: A classification for expenses (Food, Transport, Fun)
- **Total Balance**: The sum of all transaction amounts
- **Chart**: A pie chart visualization showing spending distribution by category
- **Local Storage**: Browser storage API used to persist data between sessions

## Requirements

### Requirement 1: Add Transaction

**User Story:** As a user, I want to add a new transaction, so that I can record my daily expenses.

#### Acceptance Criteria

1. WHERE a valid transaction form is submitted, THE Expense Budget Visualizer SHALL add the transaction to the list
2. WHEN a transaction is added, THE Expense Budget Visualizer SHALL update the Total Balance
3. WHEN a transaction is added, THE Expense Budget Visualizer SHALL update the Chart
4. IF any form field is empty, THEN THE Expense Budget Visualizer SHALL display an error message
5. WHERE the Category field contains Food, Transport, or Fun, THE Expense Budget Visualizer SHALL store the transaction

### Requirement 2: Display Transaction List

**User Story:** As a user, I want to view all my transactions, so that I can see my expense history.

#### Acceptance Criteria

1. THE Expense Budget Visualizer SHALL display a scrollable list of all transactions
2. WHERE a transaction exists, THE Expense Budget Visualizer SHALL display its Item Name, Amount, and Category
3. WHEN a delete action is performed on a transaction, THE Expense Budget Visualizer SHALL remove the transaction from the list
4. WHEN a transaction is removed, THE Expense Budget Visualizer SHALL update the Total Balance
5. WHEN a transaction is removed, THE Expense Budget Visualizer SHALL update the Chart

### Requirement 3: Display Total Balance

**User Story:** As a user, I want to see my total balance, so that I can track my overall spending.

#### Acceptance Criteria

1. THE Expense Budget Visualizer SHALL display the Total Balance at the top of the interface
2. WHEN a transaction is added, THE Expense Budget Visualizer SHALL recalculate and update the Total Balance
3. WHEN a transaction is deleted, THE Expense Budget Visualizer SHALL recalculate and update the Total Balance
4. THE Total Balance SHALL display values in Indonesian Rupiah format (Rp prefix with comma as thousands separator)

### Requirement 4: Display Spending Chart

**User Story:** As a user, I want to see a visual representation of my spending by category, so that I can understand my spending patterns.

#### Acceptance Criteria

1. THE Expense Budget Visualizer SHALL display a pie chart showing spending distribution by category
2. WHERE a category has transactions, THE Chart SHALL show that category's percentage of total spending
3. WHEN a transaction is added, THE Expense Budget Visualizer SHALL update the Chart
4. WHEN a transaction is deleted, THE Expense Budget Visualizer SHALL update the Chart
5. THE Chart SHALL use amounts in Indonesian Rupiah for calculations

### Requirement 5: Persist Data in Local Storage

**User Story:** As a user, I want my data to persist between browser sessions, so that I don't lose my transaction history.

#### Acceptance Criteria

1. WHEN a transaction is added, THE Expense Budget Visualizer SHALL save it to Local Storage
2. WHEN a transaction is deleted, THE Expense Budget Visualizer SHALL update Local Storage
3. WHEN the page loads, THE Expense Budget Visualizer SHALL load transactions from Local Storage
4. WHEN the page loads, THE Expense Budget Visualizer SHALL recalculate and display the Total Balance from Local Storage
5. WHEN the page loads, THE Expense Budget Visualizer SHALL render the Chart from Local Storage data

### Requirement 6: Input Validation

**User Story:** As a user, I want to ensure all fields are filled correctly, so that I don't have incomplete transaction records.

#### Acceptance Criteria

1. IF the Item Name field is empty when submitted, THEN THE Expense Budget Visualizer SHALL prevent form submission and display an error
2. IF the Amount field is empty when submitted, THEN THE Expense Budget Visualizer SHALL prevent form submission and display an error
3. IF the Amount field contains a non-positive value when submitted, THEN THE Expense Budget Visualizer SHALL prevent form submission and display an error
4. IF the Category field is empty when submitted, THEN THE Expense Budget Visualizer SHALL prevent form submission and display an error

### Requirement 7: User Interface Display

**User Story:** As a user, I want a clean and intuitive interface, so that I can easily track my expenses.

#### Acceptance Criteria

1. WHERE a page loads, THE Expense Budget Visualizer SHALL display a form for adding transactions
2. WHERE a page loads, THE Expense Budget Visualizer SHALL display the Total Balance prominently
3. WHERE transactions exist, THE Expense Budget Visualizer SHALL display them in a scrollable list
4. WHERE transactions exist, THE Expense Budget Visualizer SHALL display the Chart below the list
5. THE Interface SHALL use a clean, minimal design with clear visual hierarchy
6. THE Typography SHALL be readable with appropriate font sizes and spacing