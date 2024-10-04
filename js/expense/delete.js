import {
  getElement,
  getState,
  ready,
  redirect,
  showSnackbar,
} from "../utils.js";
import { getItem } from "../crud.js";

ready(() => {
  let dialog = getElement("delete_expense_dialog");
  let allExpenses = getItem("expenses");
  let state = getState();

  getElement("open_delete_expense").addEventListener("click", () => {
    dialog.classList.remove("hidden");
    dialog.classList.add("visible");
  });
  getElement("close_delete_expense").addEventListener("click", (e) => {
    dialog.classList.remove("visible");
    dialog.classList.add("hidden");
  });

  getElement("cancel_delete").addEventListener("click", () => {
    dialog.classList.remove("visible");
    dialog.classList.add("hidden");
  });

  getElement("confirm_delete").addEventListener("click", () => {
    let updatedExpenses = allExpenses.filter((expense) => expense.id !== state);
    window.localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    showSnackbar("Expense Deleted");
    setTimeout(() => {
      redirect("expense.html");
    }, 600);
  });
});
