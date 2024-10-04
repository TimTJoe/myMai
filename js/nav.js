import { getElement } from "./utils.js";

const nav = getElement("main_nav");

const menu = getElement("menu_items");

let menuitems = ["expense", "budget", "report"];
let cur_path = window.location.href.split("/").pop();

menuitems.forEach((text) => {
  let item = text + ".html";
  let a = document.createElement("a");

  a.classList.add("item");
  a.classList.remove("active");
  if (cur_path === item) {
    document.title = text.toUpperCase() + " - myMai";
    a.classList.add("active");
  }

  a.href = "/" + item;
  a.textContent = text;
  menu.appendChild(a);
});
