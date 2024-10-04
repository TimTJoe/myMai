import { getTopExpense } from "../utils.js";


// Step 2: JavaScript to create the chart
let topExpenses = getTopExpense();
let labelValues, dataValues;

if (topExpenses !== null) {
  
  labelValues = [
    topExpenses[0]?.name,
    topExpenses[1]?.name,
    topExpenses[2]?.name,
  ];
  dataValues = [
    topExpenses[0]?.cost,
    topExpenses[1]?.cost,
    topExpenses[2]?.cost,
  ];
}

const ctx = document.getElementById("topExpenseGraph").getContext("2d");

export const data = {
  labels: labelValues,
  datasets: [
    {
      label: "Top 3 Expenditures",
      data: dataValues,
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

new Chart(ctx, config);
