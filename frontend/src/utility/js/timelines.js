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

        timelineSlotT.id = `timeline-slot-id-${timeline.timeline_id}`;
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
            timelineIsPublic: timeline.timeline_is_public,
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

export const handleTimelineCreation = async () => {
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

  const timelineDeleteTimelineT = document.querySelector(
    "#timeline-delete-timeline-t"
  );

  timelineDeleteTimelineT.style.visibility = "hidden";

  const resetTimelineCreationInputs = () => {
    const timelineCreationTitleT = document.querySelector(
      "#timeline-creation-title-t"
    );
    const timelineSettingsInputsT = document.querySelectorAll(
      ".timeline-settings-input-t"
    );
    const timelineMemorySlotsT = document.querySelector(
      ".timeline-memory-slots-t"
    );
    const timelineMemoriesCountDivT = document.querySelector(
      "#timeline-memories-count-div-t"
    );
    const timelineTitleInputT = document.querySelector(
      "#timeline-title-input-t"
    );

    const timelinePublishDivT = document.querySelector(
      "#timeline-publish-div-t"
    );

    const timelinePublishBtnT = document.createElement("button");

    timelinePublishBtnT.id = "timeline-publish-btn-t";
    timelinePublishBtnT.textContent = "PUBLISH TIMELINE";

    timelinePublishBtnT.addEventListener("click", () => {
      publishTimeline();
    });

    timelinePublishDivT.innerHTML = "";
    timelinePublishDivT.append(timelinePublishBtnT);

    timelineCreationTitleT.textContent = "TIMELINE CREATION";
    timelineMemoriesCountDivT.textContent = "Memories(1)";
    timelineTitleInputT.value = "";

    timelineSettingsInputsT.forEach((settingInput) => {
      if (settingInput.id === "timeline-is-public-input-t")
        settingInput.checked = 1;
      else settingInput.value = "";
    });

    timelineMemorySlotsT.innerHTML = "";
    addMemorySlot();
  };

  createNewTimelineBtnT.addEventListener("click", () => {
    resetTimelineCreationInputs();
    timelineCreationDialogT.showModal();
    document.body.style.overflow = "hidden";
  });

  closeTimelineCreationBtnT.addEventListener("click", () => {
    timelineCreationDialogT.close();
  });

  const timelineOpenedDialogT = document.querySelector(
    "#timeline-opened-dialog-t"
  );

  timelineOpenedDialogT.addEventListener(
    "close",
    () => {
      document.body.style.overflow = "auto";
    },
    { once: true }
  );

  timelineCreationDialogT.addEventListener("close", () => {
    timelineCreationDialogT.close();
    if (!timelineOpenedDialogT.open) document.body.style.overflow = "auto";
  });

  timelineNewMemoryBtnT.addEventListener("click", addMemorySlot);
};

const createTimelineMemoryForm = async (
  { memoryDescription, memoryImageBlob } = ""
) => {
  const timelineMemorySlotsT = document.querySelector(
    ".timeline-memory-slots-t"
  );
  const memorySlotDiv = document.createElement("div");
  const memoryImage = new Image();

  memorySlotDiv.classList.add("timeline-memory-slot-t");

  const timelineMemoryFormT = document.createElement("form");
  timelineMemoryFormT.setAttribute("action", "POST");
  timelineMemoryFormT.classList.add("timeline-memory-form-t");

  const memoryNumberDiv = document.createElement("div");
  memoryNumberDiv.classList.add("timeline-memory-number-t");

  const timelineMemoryInputT = document.createElement("div");
  timelineMemoryInputT.classList.add("timeline-memory-inputs-t");

  const memoryDescriptionTextareaT = document.createElement("textarea");
  memoryDescriptionTextareaT.setAttribute(
    "name",
    "memory_description_textarea_t"
  );
  memoryDescriptionTextareaT.classList.add("memory-description-textarea-t");
  memoryDescriptionTextareaT.setAttribute("cols", "30");
  memoryDescriptionTextareaT.setAttribute("rows", "3");
  memoryDescriptionTextareaT.setAttribute(
    "placeholder",
    "Memory description..."
  );

  const memoryPictureInputT = document.createElement("input");
  memoryPictureInputT.setAttribute("name", "memory_picture_input_t");
  memoryPictureInputT.setAttribute("for", "memory-picture-input-t");
  memoryPictureInputT.setAttribute("type", "file");
  memoryPictureInputT.classList.add("memory-picture-input-t");

  const uploadBtnDiv = document.createElement("div");
  const uploadMemoryPictureBtn = document.createElement("button");
  uploadMemoryPictureBtn.classList.add("upload-memory-picture-btn-t");
  uploadMemoryPictureBtn.textContent = "UPLOAD PICTURE";
  uploadBtnDiv.append(uploadMemoryPictureBtn);

  const uploadedPictureHolderDiv = document.createElement("div");
  uploadedPictureHolderDiv.classList.add("uploaded-memory-picture-holder-t");

  const deleteBtnDiv = document.createElement("div");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "timeline-remove-slot-t");
  deleteBtnDiv.append(deleteIcon);

  uploadedPictureHolderDiv.append(memoryImage);

  timelineMemoryInputT.append(memoryDescriptionTextareaT);
  timelineMemoryInputT.append(memoryPictureInputT);
  timelineMemoryInputT.append(uploadBtnDiv);
  timelineMemoryInputT.append(uploadedPictureHolderDiv);

  timelineMemoryFormT.append(memoryNumberDiv);
  timelineMemoryFormT.append(timelineMemoryInputT);
  timelineMemoryFormT.append(deleteBtnDiv);

  memorySlotDiv.append(timelineMemoryFormT);

  timelineMemorySlotsT.append(memorySlotDiv);

  memoryNumberDiv.textContent = "1";
  timelineMemorySlotsT.scrollTop = timelineMemorySlotsT.scrollHeight;
  memoryDescriptionTextareaT.focus();

  deleteIcon.addEventListener("click", () => {
    timelineMemorySlotsT.removeChild(memorySlotDiv);
    updateMemorySlotCount();
  });

  timelineMemoryFormT.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  let pictureFile;

  if (memoryImageBlob) memoryImage.src = await getPicURL(memoryImageBlob);
  if (memoryDescription) memoryDescriptionTextareaT.value = memoryDescription;

  return {
    uploadMemoryPictureBtn,
    memoryPictureInputT,
    uploadedPictureHolderDiv,
  };
};

const addMemorySlot = async ({ memoryDescription, memoryImageBlob } = "") => {
  const memoryFormElements = await createTimelineMemoryForm({
    memoryDescription,
    memoryImageBlob,
  });

  console.log(memoryFormElements);

  handleMemorySlotUpload(memoryFormElements);

  updateMemorySlotCount();
};

const handleMemorySlotUpload = ({
  uploadMemoryPictureBtn,
  memoryPictureInputT,
  uploadedPictureHolderDiv,
}) => {
  uploadMemoryPictureBtn.addEventListener("click", (e) => {
    memoryPictureInputT.click();
  });

  memoryPictureInputT.addEventListener("change", () => {
    const file = memoryPictureInputT.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const imageURL = e.target.result;

      const image = new Image();
      image.src = imageURL;

      uploadedPictureHolderDiv.innerHTML = "";
      uploadedPictureHolderDiv.append(image);
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

const timelineCreationPopUpMsg = (msg) => {
  const timelineCreationPopUpMsgT = document.querySelector(
    "#timeline-creation-pop-up-msg-t"
  );
  timelineCreationPopUpMsgT.style.display = "flex";
  timelineCreationPopUpMsgT.style.backgroundColor = "black";
  timelineCreationPopUpMsgT.textContent = msg;
  setTimeout(() => {
    timelineCreationPopUpMsgT.style.display = "none";
  }, 1500);
};

const publishTimeline = async (viewCount) => {
  const timelineMemorySlotsT = document.querySelector(
    ".timeline-memory-slots-t"
  );

  if (timelineMemorySlotsT.childElementCount < 1) {
    let msg = "Timeline needs at least 1 memory!";
    timelineCreationPopUpMsg(msg);
    return;
  }

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
    timelineForm.append("timeline_view_count", viewCount || 0);
    const formObject = Object.fromEntries(timelineForm);

    Object.assign(TIMELINE_CREATION_DATA, formObject);

    const postTimelineResponse = await fetch(`${URL}/timelines/post-timeline`, {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!postTimelineResponse.ok) {
      confirmationPopUpMsg("Unable to publish timeline!");
      return;
    }

    const timelineID = await postTimelineResponse.json();
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

    if (typeof viewCount === "number")
      confirmationPopUpMsg("Timeline updated!");
    else confirmationPopUpMsg("Timeline published!");

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
  toggleLoadingAnimation();
  return new Promise(async (res) => {
    for (let i = 0; i < formElements.length; i++) {
      const uploadedMemoryPictureHolderT = document.querySelectorAll(
        ".uploaded-memory-picture-holder-t"
      );
      const memoryImage = uploadedMemoryPictureHolderT[i].firstElementChild;

      const form = formElements[i];
      const formData = new FormData(form);
      const memoryFormObject = Object.fromEntries(formData);

      let pictureBlob;

      const timelineOpenedDialogT = document.querySelector(
        "#timeline-opened-dialog-t"
      );
      const timelineCreationDialogT = document.querySelector(
        "#timeline-creation-dialog-t"
      );

      timelineOpenedDialogT.close();
      timelineCreationDialogT.close();

      if (memoryFormObject.memory_picture_input_t.size !== 0)
        pictureBlob = new Blob([memoryFormObject.memory_picture_input_t]);
      else {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = memoryImage.width;
        canvas.height = memoryImage.height;

        canvas.style.width = memoryImage.width + "px";
        canvas.style.height = memoryImage.height + "px";

        context.drawImage(memoryImage, 0, 0, canvas.width, canvas.height);

        pictureBlob = await new Promise((res) => {
          canvas.toBlob((blob) => {
            res(blob);
          }, "image/jpeg");
        });
      }

      console.log(pictureBlob);

      const memoryDescription = memoryFormObject.memory_description_textarea_t;

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
    toggleLoadingAnimation();
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

// export const timelineCreationMemoriesSmoothScroll = () => {
//   const timelineMemorySlotsT = document.querySelector(
//     ".timeline-memory-slots-t"
//   );

//   let prevScrollPosition = timelineMemorySlotsT.scrollTop;

//   timelineMemorySlotsT.addEventListener("scroll", () => {
//     const timelineMemorySlotT = document.querySelector(
//       ".timeline-memory-slot-t"
//     );

//     let slotHeight = parseInt(getComputedStyle(timelineMemorySlotT).height, 10);
//     let slotPadding = parseInt(
//       getComputedStyle(timelineMemorySlotsT).paddingTop,
//       10
//     );

//     let scrollOffset = slotHeight + slotPadding;
//     let currentScrollPosition = timelineMemorySlotsT.scrollTop;

//     if (currentScrollPosition > prevScrollPosition) {
//       const nextSnapPosition =
//         Math.ceil(currentScrollPosition / scrollOffset) * scrollOffset;
//       timelineMemorySlotsT.scrollTo({
//         top: nextSnapPosition,
//         behavior: "smooth",
//       });
//     } else {
//       const prevSnapPosition =
//         Math.floor(currentScrollPosition / scrollOffset) * scrollOffset;
//       timelineMemorySlotsT.scrollTo({
//         top: prevSnapPosition,
//         behavior: "smooth",
//       });
//     }

//     prevScrollPosition = currentScrollPosition;
//   });
// };

const handleTimelineDeletion = async (timelineID) => {
  const timelineDeleteTimelineBtnT = document.querySelector(
    ".timeline-delete-timeline-btn-t"
  );
  const timelineAreYouSureHolderT = document.querySelector(
    "#timeline-are-you-sure-holder-t"
  );
  const timelineDeletionDecisionBtnsT = document.querySelectorAll(
    ".timeline-deletion-decision-btns-t"
  );
  const timelineOpenedDialogT = document.querySelector(
    "#timeline-opened-dialog-t"
  );
  const timelineCreationDialogT = document.querySelector(
    "#timeline-creation-dialog-t"
  );

  timelineDeleteTimelineBtnT.style.visibility = "visible";

  const handleDeletionDecision = async (event) => {
    if (event.target.value === "Yes") {
      timelineOpenedDialogT.close();
      timelineCreationDialogT.close();
      const response = await deleteTimeline(timelineID);

      if (response === 204) {
        setTimeout(() => {
          const url = "";
          urlNavigation(url);
        }, 500);

        let msg = "Successfully deleted timeline";
        confirmationPopUpMsg(msg);
        console.log("Successfully deleted timeline: ", timelineID);

        const timelineSlotsT = document.querySelector("#timeline-slots-t");
        const timelineSlotT = document.querySelector(
          `#timeline-slot-id-${timelineID}`
        );

        timelineSlotsT.removeChild(timelineSlotT);
      }
    }

    timelineAreYouSureHolderT.style.display = "none";

    timelineDeletionDecisionBtnsT.forEach((decisionBtn) => {
      decisionBtn.removeEventListener("click", handleDeletionDecision);
    });
  };

  timelineOpenedDialogT.addEventListener(
    "close",
    () => {
      timelineDeleteTimelineBtnT.removeEventListener(
        "click",
        openDecisionWindow
      );
    },
    { once: true }
  );

  timelineCreationDialogT.addEventListener(
    "close",
    () => {
      timelineDeleteTimelineBtnT.removeEventListener(
        "click",
        openDecisionWindow
      );
    },
    { once: true }
  );

  const openDecisionWindow = () => {
    timelineAreYouSureHolderT.style.display = "flex";

    timelineDeletionDecisionBtnsT.forEach((decisionBtn) => {
      decisionBtn.addEventListener("click", handleDeletionDecision);
    });
  };

  timelineDeleteTimelineBtnT.addEventListener("click", openDecisionWindow);
};

const deleteTimeline = async (timelineID) => {
  console.log("deleteTimeline");
  const deleteTimelineResponse = await fetch(
    `${URL}/timelines/delete-timeline/${timelineID}`,
    {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    }
  );

  return deleteTimelineResponse.status;
};

const handleTimelineSettings = async ({
  timelineOpenSettingsT,
  timelineTitle,
  timelineFontFamily,
  timelineFontColor,
  timelineBackgroundColor,
  timelineIsPublic,
  memories,
  timelineID,
}) => {
  console.log("handleTimelineSettings");
  const timelineCreationDialogT = document.querySelector(
    "#timeline-creation-dialog-t"
  );
  const timelineCreationTitleT = document.querySelector(
    "#timeline-creation-title-t"
  );
  const timelineTitleInputT = document.querySelector("#timeline-title-input-t");
  const timelineSettingsInputsT = document.querySelectorAll(
    ".timeline-settings-input-t"
  );
  const timelineOpenedDialogT = document.querySelector(
    "#timeline-opened-dialog-t"
  );

  const timelineSettingsOpened = async () => {
    const timelineMemorySlotsT = document.querySelector(
      ".timeline-memory-slots-t"
    );

    timelineCreationDialogT.showModal();
    document.body.style.overflow = "hidden";

    timelineMemorySlotsT.innerHTML = "";
    timelineCreationTitleT.textContent = "TIMELINE SETTINGS";
    timelineTitleInputT.value = timelineTitle;

    timelineSettingsInputsT.forEach((settingInput) => {
      if (settingInput.id === "timeline-font-family-input-t")
        settingInput.value = timelineFontFamily;
      else if (settingInput.id === "timeline-font-color-input-t")
        settingInput.value = timelineFontColor;
      else if (settingInput.id === "timeline-background-color-input-t")
        settingInput.value = timelineBackgroundColor;
      else if (settingInput.id === "timeline-is-public-input-t")
        settingInput.checked = timelineIsPublic ? 1 : 0;
    });

    memories.forEach((memory) => {
      addMemorySlot({
        memoryDescription: memory.memory_description,
        memoryImageBlob: memory.picture_data.data,
      });
    });

    const timelinePublishBtnT = document.querySelector(
      "#timeline-publish-btn-t"
    );
    timelinePublishBtnT.textContent = "UPDATE TIMELINE";
    timelinePublishBtnT.id = "timeline-publish-btn-t";

    const timelineViewCountResponse = await fetch(
      `${URL}/timelines/get-timeline-view-count?timeline_id=${timelineID}`
    );

    if (!timelineViewCountResponse.ok) return;

    const timelineViewCount = await timelineViewCountResponse.json();

    const timelinePublishDivT = document.querySelector(
      "#timeline-publish-div-t"
    );
    const timelineUpdateBtnT = document.createElement("button");

    timelinePublishDivT.innerHTML = "";
    timelineUpdateBtnT.textContent = "UPDATE TIMELINE";
    timelineUpdateBtnT.id = "timeline-publish-btn-t";
    timelinePublishDivT.append(timelineUpdateBtnT);

    const publishAndDeleteTimeline = async () => {
      console.log("publishAndDeleteTimeline");
      await deleteTimeline(timelineID);
      await publishTimeline(timelineViewCount);

      timelineOpenedDialogT.close();
      timelineCreationDialogT.close();
    };

    timelineCreationDialogT.addEventListener("close", () => {
      timelineUpdateBtnT.removeEventListener("click", publishAndDeleteTimeline);
    });
    timelineUpdateBtnT.addEventListener("click", publishAndDeleteTimeline);
  };

  timelineOpenedDialogT.addEventListener(
    "close",
    () => {
      timelineOpenSettingsT.removeEventListener(
        "click",
        timelineSettingsOpened
      );

      document.body.style.overflow = "auto";
    },
    { once: true }
  );

  timelineOpenSettingsT.addEventListener("click", timelineSettingsOpened);
};

const handleTimelineOpening = async ({
  timelineID,
  timelineTitle,
  timelineOwnerPicURL,
  timelineBackgroundColor,
  timelineFontFamily,
  timelineFontColor,
  timelineIsPublic,
}) => {
  console.log("opened timeline id", timelineID);
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
  const timelineTimelineSideT = document.querySelectorAll(
    ".timeline-timeline-side-t"
  );
  const timelineOpenSettingsT = document.querySelector(
    ".timeline-open-settings-t"
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
    timelineOpenSettingsT.style.visibility = "visible";
    await handleTimelineSettings({
      timelineOpenSettingsT,
      timelineTitle,
      timelineFontFamily,
      timelineFontColor,
      timelineBackgroundColor,
      timelineIsPublic,
      memories,
      timelineID,
    });
    await handleTimelineDeletion(timelineID);
  } else {
    timelineOpenSettingsT.style.visibility = "hidden";
    await postTimelineVisit({
      visitedTimelineID: timelineID,
      vistorUserID: localStorage.loggedUserID,
    });
  }

  timelineMemoriesTitleT.textContent = timelineTitle;
  timelineMemoriesOwnerPicT.src = timelineOwnerPicURL;

  await putMemoriesIntoSlots({
    memories,
    timelineMemorySlotsT,
    timelineOpenedDialogT,
    timelineFontColor,
  });

  timelineOpenedDialogT.showModal();
  document.body.style.overflow = "hidden";
  toggleLoadingAnimation();
};

const putMemoriesIntoSlots = async ({
  memories,
  timelineMemorySlotsT,
  timelineOpenedDialogT,
  timelineFontColor,
}) => {
  const timelineMemoryPictureZoomedHolderT = document.querySelector(
    "#timeline-memory-picture-zoomed-holder-t"
  );
  const timelineMemoryPictureDescriptionT = document.querySelector(
    "#timeline-memory-picture-description-t"
  );
  const timelineMemoryPictureZoomedT = document.querySelector(
    "#timeline-memory-picture-zoomed-t"
  );

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
          slotWidth * (memories.length - index - 1 + slotOffset)
        }px`;
      })();

      return [...promises, promise];
    }, [])
  );
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
    const updateOffset = () => {
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
    };

    sideBtn.addEventListener("mousedown", () => {
      intervalId = setInterval(updateOffset, 10);
    });

    document.addEventListener("mouseup", () => {
      clearInterval(intervalId);
    });
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
