import { getItem } from "./crud.js";
import { redirect, getElement, loadScript } from "./utils.js";
let login_data = getItem("login_data");

window.onload = () => {
  let currency = getItem("currency");
  if (currency !== null) {
    window.localStorage.setItem("currency", JSON.stringify("LRD"));
  }
  console.log("currency" + currency);
  //check if user is authenticated
  if (login_data !== null) {
    //do nothing
  } else {
    redirect("/signin.html");
  }

  //load notification script
  loadScript("notification.js");
  loadScript("settings.js");
};
