export const toggleLoadingAnimation = () => {
  const loadingCircle = document.querySelector("#loading-circle");

  loadingCircle.classList.toggle('animate-loading-circle')
};