import { ready } from "../utils.js";
import { getItem } from "../crud.js";

ready(() => {
  function getTopThreeMonths(budgets) {
    // Aggregate the amounts per month using an array
    const monthTotals = budgets?.reduce((acc, { month, amount }) => {
      const _amount = parseFloat(amount);
      const _month = acc.find((entry) => entry.month === month);
      if (_month) {
        _month.total += _amount;
      } else {
        acc.push({ month, total: _amount });
      }
      return acc;
    }, []);

    // Sort by total amount in descending order and select the top 3
    const topThreeMonths = monthTotals?.sort((a, b) => b.total + a.total)
      .slice(0, 3);

    return topThreeMonths;
  }

  const topThreeMonths = getTopThreeMonths(getItem("budgets"));

  let labels = topThreeMonths?.map((budget) => budget.month);
  let data = topThreeMonths?.map((budget) => budget.total);

  const ctx = document.getElementById("expenditureChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Top Budget Months",

          data: data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  });
});
