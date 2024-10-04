import { getItem, setItem } from "../crud.js";
import {
  getBudgetBalance,
  getElement,
  getTotalBudget,
  getTotalExpense,
  ready,
} from "../utils.js";

import { allMonths, budgetCategories } from "../data.js";

ready(() => {
  let currency = getItem("currency");
  let allBudgets = getItem("budgets");
  let selectTag = getElement("month");
  let categoryTag = getElement("category");
  let currencySwitch = getElement("currency_switch");
  let tbody = getElement("tbody");

  //set total budget

  getElement("budget_total").innerHTML = getTotalBudget().toLocaleString();

  getElement("total_expense").innerHTML = getTotalExpense().toLocaleString();

  getElement("budget_balance").innerHTML = getBudgetBalance().toLocaleString();

  allMonths.forEach((month) => {
    selectTag.insertAdjacentHTML(
      "beforeend",
      `<option value="${month}">${month}</option>`
    );
  });

  budgetCategories.forEach((category) => {
    categoryTag.insertAdjacentHTML(
      "beforeend",
      `<option value="${category}" class="form-option">${category}</option>`
    );
  });

  //display budgets items to the page
  allBudgets?.reverse().forEach((budget) => {
    let amount = 0;
    if (currency === "USD") {
      amount = budget.amount / 191;
    } else {
      amount = budget.amount;
    }
    let tr = `
            <section class="tabular-section flexbox" >
            <p class="section-headline">${budget.month}</p>
              <p class="section-headline">${budget.category}</p>
              <p class="section-headline flexbox">$: ${Number(
                amount
              ).toLocaleString()} 
                <small class="section-tagline">${currency}</small>
              </p>
            </section>
            `;

    tbody.insertAdjacentHTML("beforeend", tr);
  });

  //add currency of choice to localstorage
  currencySwitch.addEventListener("click", () => {
    if (currencySwitch.checked) {
      setItem("currency", "LRD");
    } else {
      setItem("currency", "USD");
    }
  });

  //persist currency slider state
  if (currency === "USD") {
    currencySwitch.checked = false;
  } else if (currency === "LRD") {
    currencySwitch.checked = true;
  }
});
