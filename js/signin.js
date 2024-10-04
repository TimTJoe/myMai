import { getElement, getValue } from "./utils.js";
import { setItem, getItem } from "./crud.js";

//sign in user
getElement("signin_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let error_tag = getElement("error_msg");
  let success_tag = getElement("success_msg");
  let reg_data = getItem("reg_data");
  let username = getValue("username");
  let password = getValue("password");

  let login_data = { username, password, isAuth: true };

  if (reg_data == null) {
    error_tag.innerHTML = "User don't have an account.";
  } else if (reg_data.username === username && reg_data.password === password) {
    let save_data = setItem("login_data", login_data);
    if (save_data == null) {
      error_tag.innerHTML = "An error occured. Please try again. ";
    } else {
      success_tag.innerHTML = "Sign in successfully.";
      //redirect
      location.href = "/budget.html";
    }
  } else {
    error_tag.innerHTML = "Username or password incorrect.";
  }
});
