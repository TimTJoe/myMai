import {
  getElement,
  getValue,
  ready,
  showSnackbar,
  exchangeMoney,
} from "../utils.js";
import { getItem, saveItems } from "../crud.js";

ready(() => {
  let dialog = getElement("set_budget_dialog");
  getElement("open_dialog").addEventListener("click", () => {
    dialog.classList.add("visible");
  });
  getElement("close_set_budget_dialog").addEventListener("click", () => {
    dialog.classList.remove("visible");
    dialog.classList.add("hidden");
  });

  getElement("set_budget_form").addEventListener("submit", (event) => {
    event.preventDefault();

    let category = getValue("category");
    let amount = getValue("amount");
    let currency = getValue("currency");
    let month = getValue("month");

    let new_amount = exchangeMoney(amount, currency);

    let new_budget = { category, amount, currency, month };

    let response = saveItems("budgets", new_budget);
    if (response !== null) {
      showSnackbar("Budget Added Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } else {
      console.log("an error occured.");
    }
  });
});
