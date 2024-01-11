import {
  submitLoginBtn,
  loginPopUpMsgT,
  loginForm,
} from "./src/utility/js/querySelectors.js";
import { URL, urlNavigation } from "./src/utility/js/URL.js";

if (submitLoginBtn) {
  submitLoginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formEntries = new FormData(loginForm);

    console.log(JSON.stringify(Object.fromEntries(formEntries)));

    try {
      const response = await fetch(`${URL}/authentication/validate`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formEntries)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userID = await response.json();

        localStorage.loggedUserID = userID;
        localStorage.justLoggedIn = true;

        const url = "./src/utility/html/timelines.html";
        urlNavigation(url);
      } else if (response.status === 400)
        displayPopUpMsg("Incorrect Email or Password!");
      else displayPopUpMsg("Server error");
    } catch (err) {
      console.log(err);
    }
  });
}

const displayPopUpMsg = (msg) => {
  loginPopUpMsgT.style.display = "block";
  loginPopUpMsgT.textContent = msg;

  setTimeout(() => {
    loginPopUpMsgT.style.display = "none";
  }, 1000);
};
