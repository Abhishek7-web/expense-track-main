// Get references to DOM elements
const analysisTbody = document.getElementById('analysis-tbody');
const balance = document.getElementById('balance');
const totalExpenses = document.getElementById('total-expenses');
const totalIncomes = document.getElementById('total-incomes');

// Function to calculate and update the report
function generateReport() {
  // Clear existing table rows
  analysisTbody.innerHTML = '';

  // Retrieve data from localStorage
  const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
  const incomesData = JSON.parse(localStorage.getItem('incomes')) || [];

  // Object to store category-wise totals
  const categoryData = {};

  // Aggregate expenses data
  expensesData.forEach((expense) => {
    const { category, amount } = expense;
    if (!categoryData[category]) {
      categoryData[category] = { expenses: 0, incomes: 0 };
    }
    categoryData[category].expenses += amount;
  });

  // Aggregate incomes data
  incomesData.forEach((income) => {
    const { category, amount } = income;
    if (!categoryData[category]) {
      categoryData[category] = { expenses: 0, incomes: 0 };
    }
    categoryData[category].incomes += amount;
  });

  // Populate the report table
  let totalExpensesValue = 0;
  let totalIncomesValue = 0;

  Object.keys(categoryData).forEach((category) => {
    const { expenses, incomes } = categoryData[category];
    const net = incomes - expenses;

    // Create a new row for the table
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${category}</td>
      <td>₹${expenses.toFixed(2)}</td>
      <td>₹${incomes.toFixed(2)}</td>
      <td>₹${net.toFixed(2)}</td>
    `;
    analysisTbody.appendChild(row);

    // Update totals
    totalExpensesValue += expenses;
    totalIncomesValue += incomes;
  });

  // Update the balance and totals
  balance.textContent = `₹${(totalIncomesValue - totalExpensesValue).toFixed(2)}`;
  totalExpenses.textContent = `₹${totalExpensesValue.toFixed(2)}`;
  totalIncomes.textContent = `₹${totalIncomesValue.toFixed(2)}`;
}

// Initialize the report generation when the page loads
window.addEventListener('load', generateReport);
