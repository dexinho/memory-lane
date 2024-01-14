import { URL } from "./URL.js";
import { getPicURL } from "./getPicURL.js";
import { urlNavigation } from "./URL.js";
import { toggleLoadingAnimation } from "./loadingAnimation.js";

export const timelineSlotsT = document.createElement("div");

const TIMELINE_CREATION_DATA = {
  timeline_background_color: "",
  timeline_date_created: Date.now(),
  timeline_date_updated: Date.now(),
  timeline_font_color: "",
  timeline_font_family: "",
  timeline_id: 0,
  timeline_is_public: 0,
  timeline_owner_id: 0,
  timeline_picture_data: null,
  timeline_title: "",
  timeline_view_count: 0,
  user_first_name: "",
  user_last_name: "",
};

const confirmationPopUpMsg = (msg) => {
  const confirmationPopUpT = document.querySelector("#confirmation-pop-up-t");

  confirmationPopUpT.textContent = msg;
  confirmationPopUpT.showModal();
  document.body.style.overflow = "auto";

  setTimeout(() => {
    confirmationPopUpT.close();
  }, 1500);
};

export const displayTimelines = async ({ timelines, toAppend = true }) => {
  if (timelines.length === 0) noTimelinesToShow();

  try {
    await Promise.all(
      timelines.map(async (timeline) => {
        const timelineSlotT = document.createElement("div");
        const timelineOwnerViewsT = document.createElement("div");
        const ownerProfileNameT = document.createElement("div");
        const roundPic = document.createElement("div");
        const timelineOwnerName = document.createElement("div");
        const viewsT = document.createElement("div");
        const timelineDescriptionDivT = document.createElement("div");
        const timelineDescriptionT = document.createElement("div");
        const timelinePictureDivT = document.createElement("div");
        const createdUpdatedT = document.createElement("div");
        const createdT = document.createElement("div");
        const createdText = document.createElement("div");
        const createdDate = document.createElement("div");
        const updatedText = document.createElement("div");
        const updatedDate = document.createElement("div");
        const updatedT = document.createElement("div");

        const timelineOwnerProfilePictureT = document.createElement("img");
        const timelinePresentPictureT = document.createElement("img");
        const logOutBtn = document.createElement("button");

        timelineSlotT.className = "timeline-slot-t";
        timelineOwnerViewsT.className = "timeline-owner-views-t";
        ownerProfileNameT.className = "owner-profile-name-t";
        roundPic.className = "round-pic";
        timelineOwnerName.className =
          "timeline-owner-name cursor-pointer hover-name";
        viewsT.className = "views-t";
        timelineSlotT.className = "timeline-slot-t";
        timelineDescriptionDivT.className = "timeline-description-div-t";
        timelineDescriptionT.className = "timeline-description-t";
        timelinePictureDivT.className = "timeline-picture-div-t cursor-pointer";
        createdUpdatedT.className = "created-updated-t";
        createdT.className = "created-t";
        createdText.className = "created-text";
        createdDate.className = "created-date";
        updatedT.className = "updated-t";
        timelineOwnerProfilePictureT.className =
          "timeline-owner-profile-picture-t";
        logOutBtn.className = "log-out-btn";
        timelinePresentPictureT.className = "timeline-present-picture-t";

        timelinePresentPictureT.id = `timeline-id-${timeline.timeline_id}`;

        timelineOwnerName.textContent = `${timeline.user_first_name} ${timeline.user_last_name}`;
        viewsT.textContent = `Views: ${timeline.timeline_view_count}`;
        timelineDescriptionT.textContent = timeline.timeline_title;

        createdText.textContent = "Created";
        updatedText.textContent = "Updated";
        createdDate.textContent = new Date(
          timeline.timeline_date_created
        ).toLocaleDateString("en-bs");
        updatedDate.textContent = new Date(
          timeline.timeline_date_updated
        ).toLocaleDateString("en-bs");

        if (toAppend) timelineSlotsT.append(timelineSlotT);
        else timelineSlotsT.prepend(timelineSlotT);

        ownerProfileNameT.append(roundPic);
        ownerProfileNameT.append(timelineOwnerName);

        timelineOwnerViewsT.append(ownerProfileNameT);
        timelineOwnerViewsT.append(viewsT);

        timelineDescriptionDivT.append(timelineDescriptionT);

        timelinePictureDivT.append(timelinePresentPictureT);

        createdT.append(createdText);
        createdT.append(createdDate);
        updatedT.append(updatedText);
        updatedT.append(updatedDate);

        createdUpdatedT.append(createdT);
        createdUpdatedT.append(updatedT);

        timelineSlotT.append(timelineOwnerViewsT);
        timelineSlotT.append(timelineDescriptionDivT);
        timelineSlotT.append(timelinePictureDivT);
        timelineSlotT.append(createdUpdatedT);

        const getUserPictureResponse = await fetch(
          `${URL}/users/get-profile-picture?user_id=${timeline.timeline_owner_id}`
        );

        if (!getUserPictureResponse.ok) {
          console.error(
            `Error fetching profile picture for user: ${timeline.user_first_name} ${timeline.user_last_name}:`,
            getUserPictureResponse.status
          );
          return;
        }

        const userPicture = await getUserPictureResponse.json();

        timelineOwnerProfilePictureT.src = await getPicURL(
          userPicture.user_picture_data.data
        );

        timelinePresentPictureT.src = await getPicURL(
          timeline.timeline_picture_data.data || timeline.timeline_picture_data
        );

        timelinePresentPictureT.addEventListener("click", () =>
          handleTimelineOpening({
            timelineID: timeline.timeline_id,
            timelineTitle: timeline.timeline_title,
            timelineOwnerPicURL: timelineOwnerProfilePictureT.src,
            timelineBackgroundColor: timeline.timeline_background_color,
            timelineFontFamily: timeline.timeline_font_family,
            timelineFontColor: timeline.timeline_font_color,
          })
        );

        timelineOwnerName.addEventListener("click", () => {
          const url = `../html/timelines.html?user-id=${timeline.timeline_owner_id}`;
          urlNavigation(url);
        });

        roundPic.append(timelineOwnerProfilePictureT);
      })
    );
  } catch (err) {
    console.log("Error displaying timelines", err);
  }
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

    const userNameT = document.querySelector(".user-name-t");

    TIMELINE_CREATION_DATA.timeline_id = timelineID;
    TIMELINE_CREATION_DATA.timeline_owner_id = localStorage.loggedUserID;
    TIMELINE_CREATION_DATA.user_first_name =
      userNameT.textContent.split(" ")[0];
    TIMELINE_CREATION_DATA.user_last_name = userNameT.textContent.split(" ")[1];

    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("user-id");

    if (!userID || userID === localStorage.loggedUserID)
      await displayTimelines({
        timelines: [TIMELINE_CREATION_DATA],
        toAppend: false,
      });

    confirmationPopUpMsg("Timeline published!");
    timelineCreationDialogT.close();
  } catch (err) {
    console.log(err);
  }
};

const addPictureBlobToTimelineCreation = (pictureBlob) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(pictureBlob);
    reader.onload = () => {
      TIMELINE_CREATION_DATA.timeline_picture_data = reader.result;
      res();
    };

    reader.onerror = () => {
      rej(new Error("Error reading pictureBlob"));
    };
  });
};

const updateTimelineMemories = async ({ timelineID, formElements }) => {
  TIMELINE_CREATION_DATA.timeline_owner_id = localStorage.loggedUserID;

  return new Promise(async (res) => {
    for (let i = 0; i < formElements.length; i++) {
      const form = formElements[i];
      const formData = new FormData(form);
      const memoryForm = Object.fromEntries(formData);
      const pictureBlob = new Blob([memoryForm.memory_picture_input_t]);
      const memoryDescription = memoryForm.memory_description_textarea_t;

      const pictureID = await uploadPicture(pictureBlob);

      if (i + 1 === formElements.length)
        await addPictureBlobToTimelineCreation(pictureBlob);

      const memoryToAdd = new FormData();
      memoryToAdd.append("memory_description", memoryDescription);
      memoryToAdd.append("memory_picture_id", pictureID);
      memoryToAdd.append("memory_timeline_id", timelineID);

      await fetch(`${URL}/timelines/post-memory`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(memoryToAdd)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (i + 1 === formElements.length) res();
    }
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

const handleTimelineDeletion = (openedTimelineDialog) => {
  const timelineDeleteTimelineT = document.querySelector(
    "#timeline-delete-timeline-t"
  );
  const timelineAreYouSureHolderT = document.querySelector(
    "#timeline-are-you-sure-holder-t"
  );
  const timelineDeletionDecisionBtnsT = document.querySelectorAll(
    ".timeline-deletion-decision-btns-t"
  );

  const handleDeletionDecision = (event) => {
    if (event.target.textContent === "Yes") {
      openedTimelineDialog.close();
      timelineDeleteTimelineT.removeEventListener("click", openDecisionWindow);
    }

    timelineAreYouSureHolderT.style.display = "none";

    timelineDeletionDecisionBtnsT.forEach((decisionBtn) => {
      decisionBtn.removeEventListener("click", handleDeletionDecision);
    });
  };

  const openDecisionWindow = () => {
    timelineAreYouSureHolderT.style.display = "flex";

    timelineDeletionDecisionBtnsT.forEach((decisionBtn) => {
      decisionBtn.addEventListener("click", handleDeletionDecision);
    });
  };

  timelineDeleteTimelineT.addEventListener("click", openDecisionWindow);
};

const handleTimelineOpening = async ({
  timelineID,
  timelineTitle,
  timelineOwnerPicURL,
  timelineBackgroundColor,
  timelineFontFamily,
  timelineFontColor,
}) => {
  console.log(timelineBackgroundColor, timelineFontFamily, timelineFontColor);
  const timelineOpenedDialogT = document.querySelector(
    "#timeline-opened-dialog-t"
  );
  const timelineMemorySlotsT = document.querySelector("#timeline-memory-slots");
  const timelineMemoriesTitleT = document.querySelector(
    "#timeline-memories-title-t"
  );
  const timelineMemoriesOwnerPicT = document.querySelector(
    "#timeline-memories-owner-pic-t"
  );
  const timelineMemoryPictureZoomedHolderT = document.querySelector(
    "#timeline-memory-picture-zoomed-holder-t"
  );
  const timelineMemoryPictureDescriptionT = document.querySelector(
    "#timeline-memory-picture-description-t"
  );
  const timelineMemoryPictureZoomedT = document.querySelector(
    "#timeline-memory-picture-zoomed-t"
  );
  const timelineDeleteTimelineT = document.querySelector(
    "#timeline-delete-timeline-t"
  );
  const timelineTimelineSideT = document.querySelectorAll(
    ".timeline-timeline-side-t"
  );

  toggleLoadingAnimation();

  timelineOpenedDialogT.style.backgroundColor =
    timelineBackgroundColor || "white";
  timelineOpenedDialogT.style.fontStyle = timelineFontFamily || "sans-serif";

  timelineMemorySlotsT.innerHTML = "";

  const getMemoriesResponse = await fetch(
    `${URL}/timelines/get-memories?timeline_id=${timelineID}`
  );

  if (!getMemoriesResponse.ok) return;

  const memories = await getMemoriesResponse.json();

  if (memories.length === 0) return;

  const timelineOwnerID = memories[0].timeline_owner_id;

  timelineTimelineSideT.forEach((sideBtn) => {
    if (memories.length < 4) {
      sideBtn.style.visibility = "hidden";
    } else {
      sideBtn.style.visibility = "visible";
    }
  });

  if (Number(timelineOwnerID) === Number(localStorage.loggedUserID)) {
    timelineDeleteTimelineT.style.visibility = "visible";
    handleTimelineDeletion(timelineOpenedDialogT);
  } else {
    timelineDeleteTimelineT.style.visibility = "hidden";
    await postTimelineVisit({
      visitedTimelineID: timelineID,
      vistorUserID: localStorage.loggedUserID,
    });
  }

  timelineMemoriesTitleT.textContent = timelineTitle;
  timelineMemoriesOwnerPicT.src = timelineOwnerPicURL;

  await Promise.all(
    memories.reduceRight((promises, memory, index) => {
      const promise = (async () => {
        const timelineMemorySlotT = document.createElement("div");
        const picHolderT = document.createElement("div");
        const timelineMemoryPictureT = document.createElement("img");

        const timelineMemoryPositionDotT = document.createElement("div");
        const timelineMemoryDateT = document.createElement("div");

        timelineMemorySlotT.className = "timeline-memory-slot";
        timelineMemoryPictureT.className = "timeline-memory-picture-t";
        timelineMemoryPositionDotT.className = "timeline-memory-position-dot-t";
        timelineMemoryDateT.className = "timeline-memory-date-t";

        const red = Math.floor(Math.random() * 100) + 100;
        const green = Math.floor(Math.random() * 100) + 100;
        const blue = Math.floor(Math.random() * 100) + 100;

        timelineMemoryPositionDotT.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

        timelineMemoryDateT.textContent = new Date(
          memory.memory_date
        ).toLocaleDateString("en-bs");
        timelineMemoryPictureT.src = await getPicURL(memory.picture_data.data);

        timelineMemoryPictureT.addEventListener("click", () => {
          timelineMemoryPictureZoomedHolderT.style.display = "flex";
          timelineMemoryPictureDescriptionT.style.color =
            timelineFontColor || "black";
          timelineMemoryPictureDescriptionT.textContent =
            memory.memory_description || "No memory description.";

          timelineMemoryPictureZoomedT.src = timelineMemoryPictureT.src;
          timelineOpenedDialogT.close();

          timelineMemoryPictureZoomedT.addEventListener(
            "click",
            () => {
              timelineMemoryPictureZoomedHolderT.style.display = "none";
              timelineOpenedDialogT.showModal();
            },
            { once: true }
          );
        });

        timelineMemorySlotsT.append(timelineMemorySlotT);

        timelineMemorySlotT.append(picHolderT);
        timelineMemorySlotT.append(timelineMemoryPositionDotT);
        timelineMemorySlotT.append(timelineMemoryDateT);

        picHolderT.append(timelineMemoryPictureT);

        let slotWidth = parseInt(
          getComputedStyle(timelineMemorySlotT).width,
          10
        );
        let slotOffset = 0;

        if (memories.length === 1) {
          slotOffset += 1;
        } else if (memories.length === 2) {
          slotOffset += 0.5;
        }

        timelineMemorySlotT.style.right = `${
          slotWidth * (memories.length - index - slotOffset)
        }px`;
      })();

      return [...promises, promise];
    }, [])
  );

  timelineOpenedDialogT.showModal();
  document.body.style.overflow = "hidden";
  toggleLoadingAnimation();
};

export const makeTimelineSideBtnsFunctional = () => {
  let offsetX = 0;
  let intervalId;
  let shiftX = 20;

  const timelineOpenedDialogT = document.querySelector(
    "#timeline-opened-dialog-t"
  );
  const timelineCloseMemoriesBtnT = document.querySelector(
    ".timeline-close-memories-btn-t"
  );
  const timelineTimelineSideT = document.querySelectorAll(
    ".timeline-timeline-side-t"
  );
  const timelineMemorySlotsT = document.querySelector("#timeline-memory-slots");

  timelineCloseMemoriesBtnT.addEventListener("click", () => {
    offsetX = 0;
    timelineMemorySlotsT.style.transform = `translate(0, 0)`;
    timelineOpenedDialogT.close();
    document.body.style.overflow = "auto";
  });

  timelineTimelineSideT.forEach((sideBtn) => {
    sideBtn.addEventListener("mousedown", () => {
      intervalId = setInterval(updateOffset, 10);
    });

    document.addEventListener("mouseup", () => {
      clearInterval(intervalId);
    });

    function updateOffset() {
      const numberOfPictures = timelineMemorySlotsT.childElementCount - 3;
      const slotWidth = parseInt(
        getComputedStyle(timelineMemorySlotsT.firstElementChild).width,
        10
      );

      if (
        sideBtn.id === "timeline-timeline-left-t" &&
        slotWidth > (offsetX + 10) / numberOfPictures
      )
        offsetX += shiftX;
      else if (sideBtn.id === "timeline-timeline-right-t" && offsetX - 10 >= 0)
        offsetX -= shiftX;

      timelineMemorySlotsT.style.transform = `translate(${offsetX}px, 0)`;
    }
  });
};

const noTimelinesToShow = () => {
  const filterHolder = document.querySelector("#filter-holder-t");

  const timelineSlotT = document.createElement("div");
  const timelineDescriptionDivT = document.createElement("div");
  const timelineDescriptionT = document.createElement("div");
  const timelinePictureDivT = document.createElement("div");
  const timelinePresentPictureT = document.createElement("img");

  timelineDescriptionDivT.className = "timeline-description-div-t";
  timelinePresentPictureT.className = "timeline-present-picture-t";
  timelineDescriptionT.className = "timeline-description-t";
  timelinePictureDivT.className = "timeline-picture-div-t cursor-pointer";
  timelineSlotT.className = "timeline-slot-t";

  timelinePresentPictureT.src =
    "../../assets/example_pictures/no_timelines_text.png";

  timelineSlotsT.append(timelineSlotT);
  timelinePictureDivT.append(timelinePresentPictureT);
  timelineSlotT.append(timelinePictureDivT);

  timelineSlotT.style.border = "0";
  timelineSlotT.style.padding = "3rem";
  filterHolder.style.visibility = "hidden";
};

const postTimelineVisit = async ({ visitedTimelineID, vistorUserID }) => {
  const timelineVisitBody = {
    visited_timeline_id: visitedTimelineID,
    visitor_user_id: vistorUserID,
  };

  await fetch(`${URL}/timelines/post-timeline-visit`, {
    method: "POST",
    body: JSON.stringify(timelineVisitBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
