// Get the canvas elements for the charts
const expenseChartCanvas = document.getElementById('expense-chart-container');
const incomeChartCanvas = document.getElementById('income-chart-container');

// Add an event listener to the window load event
window.addEventListener('load', () => {
  // Fetch stored data for expenses and incomes from localStorage
  const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
  const incomesData = JSON.parse(localStorage.getItem('incomes')) || [];

  // Process the data to group by category
  const expenseCategoryData = aggregateDataByCategory(expensesData);
  const incomeCategoryData = aggregateDataByCategory(incomesData);

  // Render the charts using Chart.js
  renderPieChart(expenseChartCanvas, 'Expenses by Category', expenseCategoryData);
  renderPieChart(incomeChartCanvas, 'Incomes by Category', incomeCategoryData);
});

/**
 * Aggregates data by category and calculates totals.
 * @param {Array} data - Array of data objects with `category` and `amount` fields.
 * @returns {Object} - Aggregated data with categories as keys and totals as values.
 */
function aggregateDataByCategory(data) {
  return data.reduce((acc, item) => {
    const { category, amount } = item;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
}

/**
 * Renders a pie chart using Chart.js.
 * @param {HTMLElement} canvas - The canvas element where the chart will be rendered.
 * @param {string} title - The title of the chart.
 * @param {Object} categoryData - An object with categories as keys and totals as values.
 */
function renderPieChart(canvas, title, categoryData) {
  const categories = Object.keys(categoryData);
  const values = Object.values(categoryData);

  // Generate dynamic colors for each category
  const colors = generateColors(categories.length);

  // Create the pie chart
  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}

/**
 * Generates a set of background and border colors for the chart.
 * @param {number} count - Number of colors to generate.
 * @returns {Object} - Object with `background` and `border` color arrays.
 */
function generateColors(count) {
  const baseColors = [
    'rgba(255, 99, 132, 0.6)', // Red
    'rgba(54, 162, 235, 0.6)', // Blue
    'rgba(255, 206, 86, 0.6)', // Yellow
    'rgba(75, 192, 192, 0.6)', // Teal
    'rgba(153, 102, 255, 0.6)', // Purple
    'rgba(255, 159, 64, 0.6)', // Orange
  ];

  // Repeat base colors if count exceeds the base array length
  const background = Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  const border = background.map(color => color.replace('0.6', '1')); // Adjust opacity for borders

  return { background, border };
}
