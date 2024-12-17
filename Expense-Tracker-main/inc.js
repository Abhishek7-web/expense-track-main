const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addIncomeButton = document.getElementById('add-income');
const transactionList = document.getElementById('transaction-list');
const clearAllButton = document.getElementById('clear-all');
const totalAmountDiv = document.getElementById('total-amount');

// Load incomes on page load
window.addEventListener('load', () => {
  fetchIncomes();
});

// Fetch incomes from the database
function fetchIncomes() {
  fetch('fetch_income.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        transactionList.innerHTML = ''; // Clear existing records
        let totalAmount = 0;

        data.incomes.forEach(income => {
          addTransaction(
            income.id,
            income.category,
            income.date,
            income.description,
            parseFloat(income.amount)
          );
          totalAmount += parseFloat(income.amount);
        });

        updateTotalAmount(totalAmount);
      } else {
        alert(data.message || 'Failed to fetch incomes.');
      }
    })
    .catch(error => console.error('Error fetching incomes:', error));
}

// Add income
addIncomeButton.addEventListener('click', () => {
  const category = categorySelect.value.trim();
  const date = dateInput.value.trim();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!category || !date || !description || isNaN(amount) || amount <= 0) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  fetch('add_income.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, date, description, amount })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        fetchIncomes(); // Refresh incomes
        categorySelect.value = '';
        dateInput.value = '';
        descriptionInput.value = '';
        amountInput.value = '';
        alert(data.message || 'Income added successfully.');
      } else {
        alert(data.message || 'Failed to add income.');
      }
    })
    .catch(error => console.error('Error adding income:', error));
});

// Clear all incomes
clearAllButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all income records?')) {
    fetch('clear_income.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchIncomes(); // Refresh incomes
          alert(data.message || 'All incomes cleared.');
        } else {
          alert(data.message || 'Failed to clear incomes.');
        }
      })
      .catch(error => console.error('Error clearing incomes:', error));
  }
});

// Add transaction to the list
function addTransaction(id, category, date, description, amount) {
  const listItem = document.createElement('li');
  listItem.textContent = `₹${amount.toFixed(2)} received from ${description} (${category}) on ${date}`;

  // Add delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => {
    deleteIncome(id);
  });

  listItem.appendChild(deleteButton);
  transactionList.appendChild(listItem);
}

// Delete income
function deleteIncome(id) {
  if (confirm('Are you sure you want to delete this income?')) {
    fetch('delete_income.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchIncomes(); // Refresh incomes
          alert(data.message || 'Income deleted successfully.');
        } else {
          alert(data.message || 'Failed to delete income.');
        }
      })
      .catch(error => console.error('Error deleting income:', error));
  }
}

// Update total amount
function updateTotalAmount(totalAmount) {
  totalAmountDiv.textContent = `Total Amount Received: ₹${totalAmount.toFixed(2)}`;
}
