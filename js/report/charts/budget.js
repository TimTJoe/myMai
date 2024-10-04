import { getItem } from "../../crud.js";
import { ready, getMonthName, getElement } from "../../utils.js";

ready(() => {
  let budgets = getItem("budgets");

  function filterBudget(budgets) {
    const categoryTotals = budgets.reduce((acc, { amount, category }) => {
      acc[category] = (acc[category] || 0) + parseFloat(amount);
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((category) => ({
      category,
      amount: categoryTotals[category],
    }));
  }

  const filteredBudget = filterBudget(budgets);
  filteredBudget.sort((a, b) => b.amount - a.amount);

  // Prepare data for Chart.js
  const labels = filteredBudget.map((budget) => budget.category);
  const data = filteredBudget.map((budget) => budget.amount);

  // Assign colors
  const colors = data.map((amount, index) => {
    if (index === 0) return "rgb(255, 99, 132)"; // Highest
    if (index === 1) return "rgb(54, 162, 235)"; // Second highest
    return "rgb(75, 192, 192)"; // Least
  });

  const budgetCtx = getElement("monthlyBudget").getContext("2d");
  new Chart(budgetCtx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Top Budget Category",
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
