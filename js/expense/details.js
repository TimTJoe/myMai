import { getItem } from "../crud.js";
import { handleDialog } from "../utils.js";
import {
  formatDate,
  getElement,
  getState,
  ready,
  showSnackbar,
} from "../utils.js";

ready(() => {
  let allExpense = getItem("expenses");
  let state = getState();
  let detailsBody = getElement("expenseBody");
  let expense = allExpense.filter((expense) => expense.id == state);
  expense = expense[0];

  let item = `
     <section class="item" >
        <h4 class="font sm">Expense Name</h4>
        <h2 class="font lg">${expense.name}</h2>
    </section>
     <section class="item">
        <h4 class="font sm"> Cost</h4>
        <h2 class="font lg">${expense.currency.toUpperCase()}: ${parseFloat(
    expense.cost
  ).toLocaleString()}</h2>
    </section>
     <section class="item">
        <h4 class="font sm"> Budget Category</h4>
        <h2 class="font lg">${expense.category}</h2>
    </section>
     <section class="item">
        <h4 class="font sm"> Date </h4>
        <h2 class="font lg">${formatDate(expense.date)}</h2>
    </section>
    `;

  detailsBody.insertAdjacentHTML("beforeend", item);

  //handle dialogs
  handleDialog("edit_expense_dialog", "edit_expense_btn", "close-dialog");
});
