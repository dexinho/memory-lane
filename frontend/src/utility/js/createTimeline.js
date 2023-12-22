const pictureInput = document.querySelector("#picture-input");

pictureInput.addEventListener("change", async () => {
  const file = pictureInput.files[0];
  const url = `http://${host}:${PORT}`;

  if (file) {
    const blob = new Blob([file]);

    await fetch(`${url}/upload/picture`, {
      method: "POST",
      body: blob,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  }
});
