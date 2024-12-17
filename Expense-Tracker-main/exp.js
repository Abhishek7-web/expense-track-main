const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addExpenseButton = document.getElementById('add-expense');
const transactionList = document.getElementById('transaction-list');
const clearAllButton = document.getElementById('clear-all');
const totalAmountDiv = document.getElementById('total-amount');

// Retrieve the total amount from local storage
let totalAmount = parseFloat(localStorage.getItem('expenseTotalAmount')) || 0;

// Load transactions and initialize data when the page is loaded
window.addEventListener('load', () => {
  updateTotalAmount();

  // Fetch transactions from the backend on page load
  fetch('fetch_expenses.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        data.transactions.forEach(transaction => {
          addTransactionToList(
            transaction.id, 
            transaction.category, 
            transaction.date, 
            transaction.description, 
            transaction.amount
          );
        });
      } else {
        console.error('Failed to fetch transactions:', data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching transactions:', error);
    });
});

// Add a new expense
addExpenseButton.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent any default page reload

  const category = categorySelect.value.trim();
  const date = dateInput.value.trim();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!category || !date || !description || isNaN(amount) || amount <= 0) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  // Transaction object
  const transaction = { category, date, description, amount };

  try {
    // Send the transaction to the backend
    const response = await fetch('add_expense.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });

    const result = await response.json();

    if (result.success) {
      // Add the transaction to the list with the unique ID returned from the backend
      addTransactionToList(result.id, category, date, description, amount);

      // Update total amount
      totalAmount += amount;
      updateTotalAmount();

      // Clear the input fields
      categorySelect.value = '';
      dateInput.value = '';
      descriptionInput.value = '';
      amountInput.value = '';

      alert('Expense added successfully.');
    } else {
      alert(result.message || 'Failed to save expense. Please try again.');
    }
  } catch (error) {
    console.error('Error saving expense:', error);
    alert('An error occurred while saving the expense.');
  }
});

// Clear all expenses
clearAllButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all transactions?')) {
    fetch('clear_expenses.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          transactionList.innerHTML = ''; // Clear all transactions from the list
          totalAmount = 0;
          updateTotalAmount();
          alert('All transactions cleared successfully.');
        } else {
          alert(data.message || 'Failed to clear transactions.');
        }
      })
      .catch(error => {
        console.error('Error clearing transactions:', error);
        alert('An error occurred while clearing transactions.');
      });
  }
});

// Add a transaction to the list
function addTransactionToList(id, category, date, description, amount) {
  const listItem = document.createElement('li');
  listItem.textContent = `₹${amount.toFixed(2)} spent on ${description} (${category}) on ${date}`;

  // Delete button for each transaction
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => deleteTransaction(id, amount, listItem));

  listItem.appendChild(deleteButton);
  transactionList.appendChild(listItem);
}

// Delete a specific transaction
async function deleteTransaction(id, amount, listItem) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    try {
      // Send delete request to the backend
      const response = await fetch('delete_expense.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const result = await response.json();

      if (result.success) {
        totalAmount -= amount;
        updateTotalAmount();
        listItem.remove(); // Remove from DOM
        alert('Transaction deleted successfully.');
      } else {
        alert(result.message || 'Failed to delete transaction.');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('An error occurred while deleting the transaction.');
    }
  }
}

// Update the total amount displayed on the page
function updateTotalAmount() {
  totalAmountDiv.textContent = `Total Amount Spent: ₹${totalAmount.toFixed(2)}`;
  localStorage.setItem('expenseTotalAmount', totalAmount); // Persist total amount to local storage
}
