const loginForm = document.querySelector("#login-form");
const submitBtn = document.querySelector("#submit-btn");
import { displayLoggedUser, displayTimelines } from "./src/utility/js/loginSuccessful.js";
import { host, PORT } from "./src/utility/js/url.js";

submitBtn.addEventListener("click", async (e) => {
  const formEntries = new FormData(loginForm);
  const url = `http://${host}:${PORT}`
  e.preventDefault();

  try {
    const response = await fetch(`${url}/validateLogin`, {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formEntries)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const loggedUserData = await response.json();
      const getTimelines = await fetch(`${url}/getTimelines`)
      const timelines = await getTimelines.json()

      console.log(loggedUserData)
      console.log(timelines)

      // displayLoggedUser(loggedUserData)
      // displayTimelines(timelines)
    } else if (response.status === 404){
      console.log('login failed')
      // loginFailed()
    } else {
      console.log('server error')
    }

  } catch (err) {
    console.log(err);
  }
});
