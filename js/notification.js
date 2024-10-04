import { getItem } from "./crud.js";
import { getElement, ready, redirect } from "./utils.js";

ready(() => {

  let notificationBtn = getElement("notificationBtn");
  notificationBtn.addEventListener("click", () => {
    redirect("notification.htm");
  });
});
