export const getPicURL = (picture) => {
  return new Promise((res, rej) => {
    if (!picture) "../../assets/example_pictures/robot.png";

    const uint8 = new Uint8Array(picture);
    const blob = new Blob([uint8], { type: "image/jpeg" });

    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    };

    reader.onerror = () => {
      rej(error);
    };

    reader.readAsDataURL(blob);
  });
};