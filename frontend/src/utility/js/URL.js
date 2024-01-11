const host = "localhost";
const PORT = 3000;

export const URL = `http://${host}:${PORT}`;

export const urlNavigation = (url) => {
  const a = document.createElement("a");
  a.href = url;

  a.click();
};
