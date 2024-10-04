import { getItem, saveItems } from "../crud.js";
import {
  getElement,
  setValue,
  getValue,
  ready,
  getState,
  setState,
  showSnackbar,
  redirect,
} from "../utils.js";
let state = getState();
let expenses = getItem("expenses");
let expense = expenses.filter((item) => item.id == state);

ready(() => {
  expense = expense[0];
  setValue("edit_name", expense.name);
  setValue("edit_cost", expense.cost);
  setValue("edit_currency", expense.currency);
  setValue("edit_date", expense.date);

  document.querySelector(
    `.edit_category option[value*='${expense.category.toLowerCase()}'`
  ).selected = true;
});

getElement("edit_expense_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let edit_expense_dialog = getElement("edit_expense_dialog");
  //find the index of the selected item
  let index = expenses.findIndex((item) => item.id == state);

  //udpate expenses based on marching index
  expenses[index].name = getValue("edit_name");
  expenses[index].cost = getValue("edit_cost");
  expenses[index].currency = getValue("edit_currency");
  expenses[index].category = getValue("edit_category");
  expenses[index].date = getValue("edit_date");

  //update expense in localstorage
  window.localStorage.setItem("expenses", JSON.stringify(expenses));
  //redirect to view page and set state
  setState(state, "expense/details.html");
  showSnackbar("Expense Edited Successfully");
  setTimeout(() => {
    edit_expense_dialog.classList.remove("visible");
    edit_expense_dialog.classList.add("hidden");
    redirect("expense/details.html");
  }, 700);
});
