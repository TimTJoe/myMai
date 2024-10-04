import { getElement, ready, redirect } from "./utils.js";

ready(() => {
  let settingURL = window.location.href.split("/").pop();
  if (settingURL == "settings.html") {
    let signoutBtn = getElement("signoutBtn");

    signoutBtn.addEventListener("click", () => {
      window.localStorage.removeItem("login_data");
      redirect("signin.html");
    });
  } else {
    //do nothing
  }

  let settingsBtn = getElement("settingsBtn");
  settingsBtn.addEventListener("click", () => {
    redirect("settings.html");
  });
});
