import { getItem } from "../../crud.js";
import { ready, getMonthName, getElement } from "../../utils.js";

ready(() => {
  let expenses = getItem("expenses");

  function filterExpenses(expenses) {
    const monthTotals = expenses.reduce((acc, { cost, date }) => {
      const month = getMonthName(date);
      acc[month] = (acc[month] || 0) + parseFloat(cost);
      return acc;
    }, {});

    return Object.keys(monthTotals).map((month) => ({
      month,
      cost: monthTotals[month],
    }));
  }

  let filteredExpenses = filterExpenses(expenses);
  filteredExpenses.sort((a, b) => b.cost - a.cost);

  const labels = filteredExpenses.map((expense) => expense.month);
  const data = filteredExpenses.map((expense) => expense.cost);

  const colors = data.map((cost, index) => {
    if (index === 0) return "rgb(255, 99, 132)";
    if (index === 1) return "rgb(54, 162, 235)";
    return "rgb(75, 192, 192)";
  });

  const expenseCtx = getElement("monthlyExpense").getContext("2d");

  new Chart(expenseCtx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Month with highest expense",
          data: data,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  
});
