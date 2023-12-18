import { host, PORT } from "../js/url.js";

const pictureInput = document.querySelector("#picture-input");

// pictureInput.addEventListener("change", async () => {
//   const file = pictureInput.files[0];
//   const url = `http://${host}:${PORT}`;

//   if (file) {
//     const formData = new FormData();
//     formData.append("image", file);

//     const data = await fetch(`${url}/uploadPicture`, {
//       method: "POST",
//       body: formData,
//     });

//     console.log(data);
//   }
// });

pictureInput.addEventListener("change", async () => {
  const file = pictureInput.files[0];
  const url = `http://${host}:${PORT}`;

  if (file) {
    // const arrayBuffer = await file.arrayBuffer();
    // const headers = {
    //   'Content-Type': 'application/octet-stream'
    // }

    // const formData = new FormData();
    // formData.append("image", file);

    const blob = new Blob([file]);

    const data = await fetch(`${url}/test`, {
      method: "POST",
      body: blob,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  }
});
