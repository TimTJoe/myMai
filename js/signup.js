import { getElement, getValue } from "./utils.js";
import { setItem, getItem } from "./crud.js";

//register user
getElement("reg_form").addEventListener("submit", (e) => {
  e.preventDefault();
  let error_tag = getElement("error_msg");
  let success_msg = getElement("success_msg");

  let username = getValue("username");
  let fullname = getValue("fullname");
  let password = getValue("password");
  let email = getValue("email");

  //store data in object type
  let user_data = { fullname, username, password };

  let save_data = setItem("reg_data", user_data);
  if (save_data == null) {
    error_tag.innerHTML = "Registration fails. Please try again.";
  } else {
    //redirect to signin
    success_msg.innerHTML = "Registration is successful";
    location.href = "signin.html";
  }
});
