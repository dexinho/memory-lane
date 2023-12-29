import { URL } from "./globalVar.js";

const pictureInput = document.querySelector("#picture-input");

pictureInput.addEventListener("change", async () => {
  const file = pictureInput.files[0];

  if (file) {
    const blob = new Blob([file]);

    await fetch(`${URL}/upload/picture`, {
      method: "POST",
      body: blob,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  }
});
