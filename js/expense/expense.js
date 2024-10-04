import { getItem } from "../crud.js";

import {
  formatDate,
  getElement,
  setState,
  handleDialog,
  ready,
  getBudgetBalance,
  getTotalExpense,
} from "../utils.js";

import { budgetCategories } from "../data.js";

export function renderExpenses() {
  let expenses = getItem("expenses");
  let blocks = getElement("expense_blocks");

  if (expenses !== null && expenses.length !== 0 && expenses !== undefined) {
    expenses.reverse().forEach((item, key) => {
      let formatedDate = formatDate(item.date);

      let block = `
          <section class="tabular-section colbox" id="${key}">
            <span class="section-flexbox ">
              <h4 class="section-headline">${item.name}</h4>
              <h4 class="section-headline">
                ${Number(item.cost).toLocaleString()}
                <small>${item.currency.toUpperCase()}</small> 
              </h4>
            </span>
            <span class="section-flexbox">
              <h5 class="section-subline">${formatedDate}</h5>
              <h5 class="section-subline">${item.category}</h5>
            </span>
          </section>
      `;

      blocks.insertAdjacentHTML("beforeend", block);
      document.getElementById(key).addEventListener("click", (e) => {
        setState(item.id, "expense/details.htm");
        window.location.href = "/expense/details.htm";
      });
    });
  } else {
    console.log("expenses table is empty");
  }
}

ready(() => {

  handleDialog("dialog", "open-dialog", "close-dialog");

  getElement("expenseTotal").innerHTML = getTotalExpense().toLocaleString();

  getElement("budgetBalance").innerHTML = getBudgetBalance().toLocaleString();
  renderExpenses();

    budgetCategories.forEach((category) => {
      getElement("expense_category").insertAdjacentHTML(
        "beforeend",
        `<option value="${category}" class="form-option">${category}</option>`
      );
    });
});
