import { URL } from "./globalVar.js";

const pictureInput = document.querySelector("#picture-input");
const timelineCreationDialogT = document.querySelector(
  "#timeline-creation-dialog-t"
);
const createNewTimelineBtnT = document.querySelector(
  "#create-new-timeline-btn-t"
);
const closeTimelineCreationBtnT = document.querySelector(
  "#close-timeline-creation-btn-t"
);

// pictureInput.addEventListener("change", async () => {
//   const file = pictureInput.files[0];

//   if (file) {
//     const blob = new Blob([file]);

//     await fetch(`${URL}/upload/picture`, {
//       method: "POST",
//       body: blob,
//       headers: {
//         "Content-Type": "application/octet-stream",
//       },
//     });
//   }
// });

export const handleTimelineCreation = () => {
  createNewTimelineBtnT.addEventListener("click", () => {
    timelineCreationDialogT.showModal();
  });

  closeTimelineCreationBtnT.addEventListener("click", () => {
    timelineCreationDialogT.close();
  });
};
