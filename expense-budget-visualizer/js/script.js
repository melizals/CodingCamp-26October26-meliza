/**
 * Expense & Budget Visualizer
 * JavaScript application logic
 */

// ============================================
// Constants and Configuration
// ============================================

const CATEGORIES = ['Food', 'Transport', 'Fun'];
const LOCAL_STORAGE_KEY = 'transactions';

// ============================================
// State Management
// ============================================

/**
 * State data model containing all transactions
 * @typedef {Object} State
 * @property {Transaction[]} transactions - Array of transaction objects
 */

/**
 * Transaction data model
 * @typedef {Object} Transaction
 * @property {string} id - Unique identifier
 * @property {string} itemName - Description of expense
 * @property {number} amount - Expense amount (positive)
 * @property {string} category - Category (Food, Transport, or Fun)
 * @property {string} createdAt - ISO 8601 timestamp
 */

// Application state
let state = {
  transactions: []
};

// Chart.js instance
let expenseChart = null;

// ============================================
// Local Storage Operations
// ============================================

/**
 * Load state from Local Storage
 * @returns {State} The loaded state or default state if none exists
 */
function loadState() {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Validate the structure
      if (Array.isArray(parsed)) {
        state.transactions = parsed;
      } else if (parsed.transactions && Array.isArray(parsed.transactions)) {
        state.transactions = parsed.transactions;
      } else {
        state.transactions = [];
      }
    }
  } catch (error) {
    console.error('Error loading state from Local Storage:', error);
    state.transactions = [];
  }
  return state;
}

/**
 * Save state to Local Storage
 * @returns {boolean} True if save was successful
 */
function saveState() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.transactions));
    return true;
  } catch (error) {
    console.error('Error saving state to Local Storage:', error);
    return false;
  }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format a number as Indonesian Rupiah
 * @param {number} amount - The amount to format
 * @returns {string} Formatted string (e.g., "Rp 1,000,000")
 */
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
}

/**
 * Generate a unique transaction ID
 * @returns {string} Unique identifier using Date.now() + random
 */
function generateId() {
  return String(Date.now()) + String(Math.floor(Math.random() * 1000));
}

/**
 * Get current ISO timestamp
 * @returns {string} ISO 8601 formatted date string
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}

// ============================================
// Validation Functions
// ============================================

/**
 * Validate transaction form data
 * @param {Object} formData - The form data to validate
 * @returns {{isValid: boolean, errors: string[]}} Validation result
 */
function validateTransaction(formData) {
  const errors = [];

  // Validate item name
  if (!formData.itemName || formData.itemName.trim() === '') {
    errors.push('Item Name is required');
  }

  // Validate amount
  if (!formData.amount || formData.amount === '') {
    errors.push('Amount is required');
  } else {
    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum)) {
      errors.push('Amount must be a valid number');
    } else if (amountNum <= 0) {
      errors.push('Amount must be a positive number');
    }
  }

  // Validate category
  if (!formData.category || formData.category === '') {
    errors.push('Category is required');
  } else if (!CATEGORIES.includes(formData.category)) {
    errors.push('Invalid category selected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================
// Core Business Logic
// ============================================

/**
 * Add a new transaction to the state
 * @param {Object} transactionData - The transaction data to add
 * @returns {Transaction|null} The created transaction or null if validation failed
 */
function addTransaction(transactionData) {
  const validation = validateTransaction(transactionData);

  if (!validation.isValid) {
    console.error('Transaction validation failed:', validation.errors);
    return null;
  }

  const transaction = {
    id: generateId(),
    itemName: transactionData.itemName.trim(),
    amount: parseFloat(transactionData.amount),
    category: transactionData.category,
    createdAt: getCurrentTimestamp()
  };

  state.transactions.push(transaction);

  if (saveState()) {
    return transaction;
  } else {
    // Revert on save failure
    state.transactions.pop();
    return null;
  }
}

/**
 * Delete a transaction by ID
 * @param {string} id - The transaction ID to delete
 * @returns {boolean} True if deletion was successful
 */
function deleteTransaction(id) {
  const initialLength = state.transactions.length;
  state.transactions = state.transactions.filter(t => t.id !== id);

  if (state.transactions.length < initialLength) {
    return saveState();
  }

  return false;
}

/**
 * Calculate the total balance from all transactions
 * @returns {number} The sum of all transaction amounts
 */
function calculateBalance() {
  return state.transactions.reduce((total, transaction) => {
    return total + (transaction.amount || 0);
  }, 0);
}

/**
 * Calculate totals for each category
 * @returns {Object} Category totals with Food, Transport, and Fun
 */
function calculateCategoryTotals() {
  const totals = {
    Food: 0,
    Transport: 0,
    Fun: 0
  };

  state.transactions.forEach(transaction => {
    if (totals.hasOwnProperty(transaction.category)) {
      totals[transaction.category] += transaction.amount || 0;
    }
  });

  return totals;
}

// ============================================
// UI Rendering Functions
// ============================================

/**
 * Display or hide error message
 * @param {string|null} message - The error message or null to clear
 */
function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message || '';
    errorElement.style.display = message ? 'block' : 'none';
  }
}

/**
 * Render the transaction list to the DOM
 */
function renderTransactions() {
  const listElement = document.getElementById('transaction-ul');
  if (!listElement) return;

  listElement.innerHTML = '';

  if (state.transactions.length === 0) {
    listElement.innerHTML = '<li class="empty-message">No transactions yet. Add your first transaction above!</li>';
    return;
  }

  // Sort transactions by creation date (newest first)
  const sortedTransactions = [...state.transactions].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  sortedTransactions.forEach(transaction => {
    const li = document.createElement('li');
    li.className = 'transaction-item';
    li.dataset.id = transaction.id;

    li.innerHTML = `
      <div class="transaction-info">
        <span class="transaction-name">${escapeHtml(transaction.itemName)}</span>
        <span class="transaction-category category-${transaction.category.toLowerCase()}">${transaction.category}</span>
      </div>
      <div class="transaction-amount-section">
        <span class="transaction-amount">${formatCurrency(transaction.amount)}</span>
        <button class="delete-btn" data-id="${transaction.id}">×</button>
      </div>
    `;

    listElement.appendChild(li);
  });
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Update the balance display
 */
function updateBalance() {
  const balanceElement = document.getElementById('balance-amount');
  if (balanceElement) {
    const balance = calculateBalance();
    balanceElement.textContent = formatCurrency(balance);
  }
}

// ============================================
// Chart Functions
// ============================================

/**
 * Initialize the Chart.js pie chart
 */
function initializeChart() {
  const canvas = document.getElementById('expense-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [...CATEGORIES],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${formatCurrency(value)} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

/**
 * Update the chart with current category data
 */
function updateChart() {
  if (!expenseChart) return;

  const categoryTotals = calculateCategoryTotals();

  expenseChart.data.datasets[0].data = [
    categoryTotals.Food,
    categoryTotals.Transport,
    categoryTotals.Fun
  ];

  expenseChart.update();
}

// ============================================
// Event Handlers
// ============================================

/**
 * Handle form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  // Clear previous error
  showError(null);

  // Get form data
  const formData = {
    itemName: document.getElementById('item-name').value,
    amount: document.getElementById('amount').value,
    category: document.getElementById('category').value
  };

  // Validate and add transaction
  const validation = validateTransaction(formData);

  if (!validation.isValid) {
    showError(validation.errors.join('. '));
    return;
  }

  const transaction = addTransaction(formData);

  if (transaction) {
    // Clear form
    event.target.reset();

    // Update UI
    renderTransactions();
    updateBalance();
    updateChart();

    console.log('Transaction added:', transaction);
  } else {
    showError('Failed to save transaction. Please try again.');
  }
}

/**
 * Handle delete button click
 * @param {Event} event - The click event
 */
function handleDeleteClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.dataset.id;

    if (deleteTransaction(id)) {
      // Update UI
      renderTransactions();
      updateBalance();
      updateChart();

      console.log('Transaction deleted:', id);
    } else {
      showError('Failed to delete transaction. Please try again.');
    }
  }
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the application
 */
function initialize() {
  // Load state from Local Storage
  loadState();

  // Get DOM elements
  const form = document.getElementById('transaction-form');
  const transactionList = document.getElementById('transaction-ul');

  // Set up event listeners
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  if (transactionList) {
    transactionList.addEventListener('click', handleDeleteClick);
  }

  // Initialize UI components
  renderTransactions();
  updateBalance();
  initializeChart();

  console.log('Expense & Budget Visualizer initialized');
  console.log('Loaded transactions:', state.transactions.length);
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);