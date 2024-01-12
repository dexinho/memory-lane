export const getPicURL = (pictureData) => {
  return new Promise((res, rej) => {
    if (!pictureData) "../../assets/example_pictures/robot.png";
    
    const uint8 = new Uint8Array(pictureData);
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