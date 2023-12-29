import {
  submitLoginBtn,
  loginPopUpMsg,
  loginForm,
} from "./src/utility/js/querySelectors.js";
import { URL } from "./src/utility/js/globalVar.js";

if (submitLoginBtn) {
  submitLoginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formEntries = new FormData(loginForm);

    try {
      const response = await fetch(`${URL}/authentication/validate`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formEntries)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.setItem(
          "loggedUserEmail",
          JSON.stringify(formEntries.get("email_input"))
        );
        const a = document.createElement("a");
        a.href = "./src/utility/html/timelines.html";
        a.click();
      } else if (response.status === 400)
        displayPopUpMsg("Incorrect Email or Password!");
      else displayPopUpMsg("Server error");
    } catch (err) {
      console.log(err);
    }
  });
}

const displayPopUpMsg = (msg) => {
  loginPopUpMsg.style.display = "block";
  loginPopUpMsg.textContent = msg;

  setTimeout(() => {
    loginPopUpMsg.style.display = "none";
  }, 1000);
};
