import { getElement, getValue, redirect, showSnackbar } from "../utils.js";
import { getItem, saveItems } from "../crud.js";
import { renderExpenses } from "./expense.js";

//sign in user
getElement("add_expense_form").addEventListener("submit", (e) => {
  let allBudgets = getItem("budgets");
  e.preventDefault();

  const name = getValue("expense_name");
  const cost = getValue("expense_cost");
  const currency = getValue("expense_currency");
  const category = getValue("expense_category");
  const date = getValue("expense_date");
  let expense_data;

  expense_data = { id: Date.now(), name, cost, currency, category, date };

  let response = saveItems("expenses", expense_data);
  if (response !== null) {
    //get the category and amount key value
    const budgetMap = new Map(
      allBudgets.map((budget) => [budget.category, budget.amount])
    );

    //get the budget amount that marches the expense_data
    let budgetAmount = budgetMap.get(expense_data.category);
    if (budgetAmount) {
    }
    if (budgetAmount !== undefined && expense_data.cost > budgetAmount) {
      let bodyText = `Expense for ${expense_data.name} in ${expense_data.category} exceeds the budgeted amount`;
      let notificationData = {
        id: Date.now(),
        body: bodyText,
        status: false,
      };
      let response = saveItems("notifications", notificationData);
      console.log(bodyText);
    } else {
      console.log(
        `Expense for ${expense_data.category} ${expense_data.cost} doesn't exceed budgeted amount: ${budgetAmount}`
      );
    }

    renderExpenses();
    showSnackbar("Expense Added Successfully.");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  } else {
    error_tag.innerHTML = "An error occurred. Please try again.";
  }
});
