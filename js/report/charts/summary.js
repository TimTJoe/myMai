import {
  ready,
  getElement,
  getTotalBudget,
  getTotalExpense,
} from "/js/utils.js";

ready(() => {
  let totalExpense = getTotalExpense();
  let totalBudget = getTotalBudget();
  let reportSummary = getElement("reportSummary").getContext("2d");

  let dataValues = [totalExpense, totalBudget];

  const data = {
    labels: [`Expense: ${totalExpense}`, `Budget: ${totalBudget}`],
    datasets: [
      {
        label: "Summary",
        data: dataValues,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      },
    ],

    
  };

  const config = {
    type: "pie",
    data: data,
    options: {},
  };

  new Chart(reportSummary, config);
});
