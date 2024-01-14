import {
  registrationFormR,
  submitRegisterBtn,
  passwordInputR,
  confirmPasswordInputR,
  registrationPopUpMsgR,
} from "./querySelectors.js";
import { URL } from "./URL.js";

submitRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(submitRegisterBtn)

  if (passwordInputR.value === confirmPasswordInputR.value)
    handleUserRegistration();
  else displayPopUpMsg("Passwords must match!");
});

const handleUserRegistration = async () => {
  try {
    const formEntries = new FormData(registrationFormR);

    const registrationResponse = await fetch(`${URL}/authentication/register`, {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formEntries)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (registrationResponse.ok) {
      displayPopUpMsg("Registered successfully!");

      setTimeout(() => {
        const a = document.createElement("a");
        a.href = "../../../index.html";
        a.click();
      }, 1000);
    } else if (registrationResponse.status === 409)
      displayPopUpMsg("Email already exists!");
  } catch (err) {
    console.log(err);
  }
};

const displayPopUpMsg = (msg) => {
  registrationPopUpMsgR.style.display = "block";
  registrationPopUpMsgR.textContent = msg;

  setTimeout(() => {
    registrationPopUpMsgR.style.display = "none";
  }, 1000);
};
