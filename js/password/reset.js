import { getElement, getValue } from "/js/utils.js";
import { getItem, setItem } from "/js/crud.js";

getElement("reset_password_form").addEventListener("submit", (e) => {
  e.preventDefault();

  let error_tag = getElement("error_msg");
  let success_tag = getElement("success_msg");
  let reg_data = getItem("reg_data");
  let username = getValue("username");
  let new_password = getValue("password");

  if (reg_data == null) {
    error_tag.innerHTML = "You don't have an account. Please sign up.";
  } else if (reg_data.username === username) {
    reg_data.password = new_password;
    let updatedItem = setItem("reg_data", reg_data);
    if (updatedItem.password === new_password) {
      error_tag.innerHTML = null;
      success_tag.innerHTML =
        "Password reset sucessfully. <a href='/html/signin.htm'> Sign in</a>";
    } else {
      success_tag.innerHTML = null;
      error_tag.innerHTML = "Password reset fails. Please try again.";
    }
  } else {
    error_tag.innerHTML = "Username is incorrect.";
  }
});
