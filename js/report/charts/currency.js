import { getItem } from "../../crud.js";
import { getElement, ready } from "../../utils.js";

ready(() => {
  let expenses = getItem("expenses");
  let currencyCtx = getElement("currencyCompare").getContext("2d");

  let expensesData = expenses.reduce((acc, { cost, currency }) => {
    const parsedCost = parseFloat(cost);
    const existingCurrency = acc.find((item) => item.currency === currency);
    if (existingCurrency) {
      existingCurrency.totalCost += parsedCost;
    } else {
      acc.push({ currency, totalCost: parsedCost });
    }
    return acc;
  }, []);

  let mapData = new Map(
    expensesData.map((item) => [item.currency, item.totalCost])
  );
  let LRD = mapData.get("lrd");
  let USD = mapData.get("usd");

  const data = {
    labels: ["LRD", "USD"],
    datasets: [
      {
        label: "Summary",
        data: [LRD, USD],
        backgroundColor: ["rgb(13, 62, 107)", "rgb(24, 97, 91)"],
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {},
  };
  new Chart(currencyCtx, config);
});
