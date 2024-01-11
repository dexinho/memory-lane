import { displayTimelines } from "./displayFrontPage.js";
import { URL } from "./URL.js";

const confirmationPopUpMsg = (msg) => {
  const confirmationPopUpT = document.querySelector("#confirmation-pop-up-t");

  confirmationPopUpT.textContent = msg;
  confirmationPopUpT.showModal();
  document.body.style.overflow = "auto";

  setTimeout(() => {
    confirmationPopUpT.close();
  }, 1500);
};

const TIMELINE_CREATION_DATA = {
  timeline_background_color: "",
  timeline_date_created: Date.now(),
  timeline_date_updated: Date.now(),
  timeline_font_color: "",
  timeline_font_family: "",
  timeeline_id: 0,
  timeline_is_public: 0,
  timeline_owner_id: 0,
  timeline_picture_data: null,
  timeline_title: "",
  timeline_view_count: 0,
  user_first_name: "",
  user_last_name: "",
};

export const createNewTimeline = () => {
  const uploadBtn = document.querySelector(".upload-memory-picture-btn-t");
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
  const inputElement = document.querySelector(".memory-picture-input-t");
  const formElement = document.querySelector(".timeline-memory-form-t");
  const timelinePublishBtnT = document.querySelector("#timeline-publish-btn-t");

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
  inputElement: picUpload,
  uploadedPictureHolderDiv,
}) => {
  uploadBtn.addEventListener("click", (e) => {
    picUpload.click();
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  picUpload.addEventListener("change", () => {
    const file = picUpload.files[0];

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
  const timelineMemoriesCountDivT = document.querySelector(
    "#timeline-memories-count-div-t"
  );

  let memorySlotCount = timelineMemorySlotsT.childElementCount;

  timelineMemoryNumberT.forEach((memoryNumber, index) => {
    memoryNumber.textContent = index + 1;
  });

  timelineMemoriesCountDivT.textContent = `Memories(${memorySlotCount}): `;
};

const publishTimeline = async () => {
  try {
    const timelineCreationFormT = document.querySelector(
      "#timeline-creation-form-t"
    );
    const timelineMemoryFormT = document.querySelectorAll(
      ".timeline-memory-form-t"
    );
    const timelineCreationDialogT = document.querySelector(
      "#timeline-creation-dialog-t"
    );

    const timelineForm = new FormData(timelineCreationFormT);
    const ownerID = localStorage.loggedUserID;

    timelineForm.append("timeline_owner_id", ownerID);
    const formObject = Object.fromEntries(timelineForm);

    Object.assign(TIMELINE_CREATION_DATA, formObject);

    const response = await fetch(`${URL}/timelines/post-timeline`, {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      confirmationPopUpMsg("Unable to publish timeline!");
      return;
    }

    const timelineID = await response.json();
    await updateTimelineMemories({
      timelineID,
      formElements: timelineMemoryFormT,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user-id");

    if (!userID) displayTimelines({ timelines: [TIMELINE_CREATION_DATA], toAppend: false });

    confirmationPopUpMsg("Timeline published!");
    timelineCreationDialogT.close();
  } catch (err) {
    console.log(err);
  }
};

const updateTimelineMemories = async ({ timelineID, formElements }) => {
  TIMELINE_CREATION_DATA.timeline_owner_id = timelineID;

  formElements.forEach(async (form, index) => {
    const formData = new FormData(form);
    const memoryForm = Object.fromEntries(formData);
    const pictureBlob = new Blob([memoryForm.memory_picture_input_t]);

    const memoryDescription = memoryForm.memory_description_textarea_t;

    if (index === formElements.length - 1)
      TIMELINE_CREATION_DATA.timeline_picture_data = pictureBlob;

    const pictureID = await uploadPicture(pictureBlob);

    const memoryToAdd = new FormData();
    memoryToAdd.append("memory_description", memoryDescription);
    memoryToAdd.append("memory_picture_id", pictureID);
    memoryToAdd.append("memory_timeline_id", timelineID);

    await fetch(`${URL}/timelines/add-memory`, {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(memoryToAdd)),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

const uploadPicture = async (pictureBlob) => {
  const pictureUploadResponse = await fetch(`${URL}/upload/picture`, {
    method: "POST",
    body: pictureBlob,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });

  return await pictureUploadResponse.json();
};

export const timelineCreationMemoriesSmoothScroll = () => {
  const timelineMemorySlotsT = document.querySelector(
    ".timeline-memory-slots-t"
  );
  const timelineMemorySlotT = document.querySelectorAll(
    ".timeline-memory-slot-t"
  );

  let prevScrollPosition = timelineMemorySlotsT.scrollTop;

  timelineMemorySlotsT.addEventListener("scroll", () => {
    let slotHeight = parseInt(
      getComputedStyle(timelineMemorySlotT[0]).height,
      10
    );
    let slotPadding = parseInt(
      getComputedStyle(timelineMemorySlotsT).paddingTop,
      10
    );

    let scrollOffset = slotHeight + slotPadding;
    let currentScrollPosition = timelineMemorySlotsT.scrollTop;

    if (currentScrollPosition > prevScrollPosition) {
      const nextSnapPosition =
        Math.ceil(currentScrollPosition / scrollOffset) * scrollOffset;
      timelineMemorySlotsT.scrollTo({
        top: nextSnapPosition,
        behavior: "smooth",
      });
    } else {
      const prevSnapPosition =
        Math.floor(currentScrollPosition / scrollOffset) * scrollOffset;
      timelineMemorySlotsT.scrollTo({
        top: prevSnapPosition,
        behavior: "smooth",
      });
    }

    prevScrollPosition = currentScrollPosition;
  });
};
