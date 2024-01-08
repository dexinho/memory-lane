import { URL } from "./globalVar.js";

const timelineCreationDialogT = document.querySelector(
  "#timeline-creation-dialog-t"
);
const createNewTimelineBtnT = document.querySelector(
  "#create-new-timeline-btn-t"
);
const closeTimelineCreationBtnT = document.querySelector(
  "#close-timeline-creation-btn-t"
);

const timelineNewMemoryBtnT = document.querySelector(
  "#timeline-new-memory-btn-t"
);
const uploadedPictureHolderDiv = document.querySelector(
  ".uploaded-memory-picture-holder-t"
);
const uploadBtn = document.querySelector(".upload-memory-picture-btn-t");
const formElement = document.querySelector(".timeline-memory-form-t");
const inputElement = document.querySelector(".memory-picture-input-t");
const timelineMemoriesCountDivT = document.querySelector(
  "#timeline-memories-count-div-t"
);

const timelinePublishBtnT = document.querySelector("#timeline-publish-btn-t");

export const handleTimelineCreation = () => {
  createNewTimelineBtnT.addEventListener("click", () => {
    timelineCreationDialogT.showModal();
    document.body.style.overflow = "hidden";
  });

  closeTimelineCreationBtnT.addEventListener("click", () => {
    timelineCreationDialogT.close();
    document.body.style.overflow = "auto";
  });

  timelineNewMemoryBtnT.addEventListener("click", addTimelineSlot);

  handleMemorySlotUpload({
    uploadBtn,
    formElement,
    inputElement,
    uploadedPictureHolderDiv,
  });

  timelinePublishBtnT.addEventListener("click", publishTimeline);
};

const addTimelineSlot = () => {
  const timelineMemorySlotsT = document.querySelector(
    ".timeline-memory-slots-t"
  );
  const memorySlotDiv = document.createElement("div");
  memorySlotDiv.classList.add("timeline-memory-slot-t");

  const formElement = document.createElement("form");
  formElement.setAttribute("action", "POST");
  formElement.classList.add("timeline-memory-form-t");

  const memoryNumberDiv = document.createElement("div");
  memoryNumberDiv.classList.add("timeline-memory-number-t");

  const memoryInputsDiv = document.createElement("div");
  memoryInputsDiv.classList.add("timeline-memory-inputs-t");

  const textareaElement = document.createElement("textarea");
  textareaElement.setAttribute("name", "memory_description_textarea_t");
  textareaElement.classList.add("memory-description-textarea-t");
  textareaElement.setAttribute("cols", "30");
  textareaElement.setAttribute("rows", "3");
  textareaElement.setAttribute("placeholder", "Memory description...");

  const inputElement = document.createElement("input");
  inputElement.setAttribute("name", "memory_picture_input_t");
  inputElement.setAttribute("for", "memory-picture-input-t");
  inputElement.setAttribute("type", "file");
  inputElement.classList.add("memory-picture-input-t");

  const uploadBtnDiv = document.createElement("div");
  const uploadBtn = document.createElement("button");
  uploadBtn.classList.add("upload-memory-picture-btn-t");
  uploadBtn.textContent = "UPLOAD PICTURE";
  uploadBtnDiv.appendChild(uploadBtn);

  const uploadedPictureHolderDiv = document.createElement("div");
  uploadedPictureHolderDiv.classList.add("uploaded-memory-picture-holder-t");

  const deleteBtnDiv = document.createElement("div");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "timeline-remove-slot-t");
  deleteBtnDiv.appendChild(deleteIcon);

  memoryInputsDiv.appendChild(textareaElement);
  memoryInputsDiv.appendChild(inputElement);
  memoryInputsDiv.appendChild(uploadBtnDiv);
  memoryInputsDiv.appendChild(uploadedPictureHolderDiv);

  formElement.appendChild(memoryNumberDiv);
  formElement.appendChild(memoryInputsDiv);
  formElement.appendChild(deleteBtnDiv);

  memorySlotDiv.appendChild(formElement);

  timelineMemorySlotsT.appendChild(memorySlotDiv);

  timelineMemorySlotsT.scrollTop = timelineMemorySlotsT.scrollHeight;
  textareaElement.focus();

  deleteIcon.addEventListener("click", () => {
    timelineMemorySlotsT.removeChild(memorySlotDiv);
    updateMemorySlotCount();
  });

  handleMemorySlotUpload({
    uploadBtn,
    formElement,
    inputElement,
    uploadedPictureHolderDiv,
  });

  updateMemorySlotCount();
};

const handleMemorySlotUpload = ({
  uploadBtn,
  formElement,
  inputElement,
  uploadedPictureHolderDiv,
}) => {
  uploadBtn.addEventListener("click", (e) => {
    inputElement.click();

    // if (file) {
    //   const blob = new Blob([file]);

    //   await fetch(`${URL}/upload/picture`, {
    //     method: "POST",
    //     body: blob,
    //     headers: {
    //       "Content-Type": "application/octet-stream",
    //     },
    //   });
    // }
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  inputElement.addEventListener("change", () => {
    const file = inputElement.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const imageURL = e.target.result;

      const image = new Image();
      image.src = imageURL;

      uploadedPictureHolderDiv.innerHTML = "";
      uploadedPictureHolderDiv.appendChild(image);
    };
  });
};

const updateMemorySlotCount = () => {
  const timelineMemorySlotsT = document.querySelector(
    ".timeline-memory-slots-t"
  );
  const timelineMemoryNumberT = document.querySelectorAll(
    ".timeline-memory-number-t"
  );
  let memorySlotCount = timelineMemorySlotsT.childElementCount;

  console.log(timelineMemoryNumberT);

  timelineMemoryNumberT.forEach((memoryNumber, index) => {
    memoryNumber.textContent = index + 1;
  });

  timelineMemoriesCountDivT.textContent = `Memories(${memorySlotCount}): `;
};

const publishTimeline = async () => {
  try {
    const memoryForms = document.querySelectorAll(".timeline-memory-form-t");
    const slots = [];

    memoryForms.forEach((form) => {
      const formEntries = new FormData(form);
      const data = Object.fromEntries(formEntries);

      data.memory_picture_input_t = new Blob([data.memory_picture_input_t]);

      slots.push(data);
    });

    console.log(slots);
  } catch (err) {
    console.log(err);
  }
};
