import { getItem } from "./crud.js";

export function getElement(id) {
  let elem = document.getElementById(id);
  if (elem == null) {
    return null;
  } else {
    return elem;
  }
}

export function getValue(element) {
  let elem = getElement(element);
  if (elem !== null) {
    return elem.value;
  } else {
    return null;
  }
}

export function setValue(elemeId, value) {
  document.getElementById(elemeId).value = value;
}

export function redirect(page) {
  window.location.href = "/html/" + page;
}

export function setState(state, url, name = null) {
  history.pushState({ id: state }, { name: name }, `/html/${url}`);
}

export function getState() {
  let state = window.history.state?.id;
  if (state !== false) {
    return state;
  } else {
    return null;
  }
}

export const showSnackbar = (text) => {
  const snackbar = getElement("snackbar");
  snackbar.innerHTML = text;
  snackbar.classList.remove("hidden");
  snackbar.classList.add("visible");
  setTimeout(() => {
    snackbar.classList.remove("visible");
  }, 4000);
};

export function formatDate(date) {
  let _date = new Date(date);
  let formatedDate = new Intl.DateTimeFormat("us-EN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(_date);

  return formatedDate;
}

export function ready(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

export function handleDialog(dialogId, open, close) {
  const dialog = getElement(dialogId);
  const openButton = getElement(open);
  const closeButton = getElement(close);

  const toggleDialog = () => {
    dialog.classList.toggle("hidden");
    dialog.classList.toggle("visible");
  };

  if (openButton && closeButton) {
    openButton.addEventListener("click", toggleDialog);
    closeButton.addEventListener("click", toggleDialog);
  }
}

export function exchangeMoney(amount, to) {
  let ex_rate = 191;
  if (to.toUpperCase() === "USD") {
    let new_amount = ex_rate / Number(amount);
    return parseFloat(new_amount).toFixed(2);
  } else if (to.toUpperCase() === "LRD") {
    return Number(amount) * ex_rate;
  } else {
    return null;
  }
}

//let namespace
export function getTotalExpense() {
  let allExpenses = getItem("expenses");
  let totalExpense =
    allExpenses?.reduce((sum, expense) => sum + parseFloat(expense.cost), 0) ||
    0;
  return totalExpense;
}

export function getTotalBudget() {
  let allBudgets = getItem("budgets");
  let totalBudget =
    allBudgets?.reduce((sum, item) => sum + parseFloat(item.amount), 0) || 0;
  return totalBudget;
}

export function getBudgetBalance() {
  let totalBudget = getTotalBudget();
  let totalExpense = getTotalExpense();

  return totalBudget - totalExpense;
}

export function getTopExpense() {
  let expenses = getItem("expenses");
  let topExpenses;
  if (expenses !== null && expenses.length !== 0 && expenses !== undefined) {
    topExpenses = expenses
      .map((item) => ({ ...item, cost: parseFloat(item.cost) }))
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 3);
    return topExpenses;
  } else {
    return null;
  }
}

export function loadScript(file) {
  let script = document.createElement("script");
  script.type = "module";
  script.src = "/js/" + file;
  document.body.appendChild(script);
}

export function getMonthName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long" });
}