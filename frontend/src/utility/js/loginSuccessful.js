export const displayLoggedUser = (loggedUserData) => {
  const userProfilePicT = document.querySelector(".user-profile-pic-t");
  const userNameT = document.querySelector(".user-name-t");

  const userProfileImgT = document.createElement("img");

  userProfilePicT.append(userProfileImgT);

  userNameT.textContent = loggedUserData.first_name + loggedUserData.last_name;
};

export const displayTimelines = (timelines) => {
  const timelineSlotsT = document.querySelector("#timeline-slots-t");

  timelines.forEach((timeline) => {
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
    timelineOwnerName.className = "timeline-owner-name cursor-pointer scale-up";
    viewsT.className = "views-t";
    timelineSlotT.className = "timeline-slot-t";
    timelineDescriptionDivT.className = "timeline-description-div-t";
    timelineDescriptionT.className = "timeline-description-t";
    timelinePictureDivT.className = "timeline-picture-t cursor-pointer";
    createdUpdatedT.className = "created-updated-t";
    createdT.className = "created-t";
    createdText.className = "created-text";
    createdDate.className = "created-date";
    updatedT.className = "updated-t";
    timelineOwnerProfilePictureT.className = "timeline-owner-profile-picture-t";
    logOutBtn.className = "log-out-btn";
    timelinePresentPictureT.className = 'timeline-present-picture-t'

    timelinePresentPictureT.id = `timeline-id-${timeline.timeline_id}`;

    viewsT.textContent = timeline.view_count;
    timelineDescriptionT.textContent = timeline.timeline_title;
    createdText.textContent = "Created";
    updatedText.textContent = "Updated";
    createdText.textContent = timeline.date_created;
    createdText.textContent = timeline.date_updated;
    timelineOwnerName.textContent = timelines.first_name + timelines.last_name;

    timelineSlotsT.append(timelineSlotT);

    ownerProfileNameT.appendChild(roundPic);
    ownerProfileNameT.appendChild(timelineOwnerName);

    timelineOwnerViewsT.appendChild(ownerProfileNameT);
    timelineOwnerViewsT.appendChild(viewsT);

    timelineDescriptionDivT.appendChild(timelineDescriptionT);

    timelinePictureDivT.appendChild(timeline-present-picture);

    createdT.appendChild(createdText);
    createdT.appendChild(createdDate);

    updatedT.appendChild(updatedText);
    updatedT.appendChild(updatedDate);

    createdUpdatedT.appendChild(createdT);
    createdUpdatedT.appendChild(updatedT);

    timelineSlotT.appendChild(timelineOwnerViewsT);
    timelineSlotT.appendChild(timelineDescriptionDivT);
    timelineSlotT.appendChild(timelinePictureDivT);
    timelineSlotT.appendChild(createdUpdatedT);
  });
};
