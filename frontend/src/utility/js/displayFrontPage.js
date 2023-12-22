let picturesLoaded = 0;

const displayFrontPage = async () => {
  try {
    const loggedUserEmail = JSON.parse(localStorage.getItem("loggedUserEmail"));
    const userProfileImgT = document.createElement("img");
    userProfileImgT.id = "user-profile-img-t";

    timelinesDivT.style.display = "none";
    loginPopUpMsg.style.display = "flex";
    timelineUserProfileT.style.position = "none";

    const getTimelines = await fetch(`${url}/timelines/get-timelines`);

    if (getTimelines.ok) {
      const getLoggedUserData = await fetch(
        `${url}/users/data?email=${loggedUserEmail}`
      );

      const timelines = await getTimelines.json();
      const loggedUserData = await getLoggedUserData.json();

      userNameT.textContent = `${loggedUserData.user_first_name} ${loggedUserData.user_last_name}`;

      const data = await displayTimelines(timelines);
      console.log("finished");
      console.log(data);

      userProfileImgT.src = await getPicURL(loggedUserData.picture_data?.data);
      userProfilePicT.append(userProfileImgT);

      timelineUserProfileT.style.display = "flex";
      timelinesDivT.style.display = "flex";
      loginPopUpMsg.style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
};

const displayTimelines = async (timelines) => {
  return new Promise(async (res) => {
    try {
      const getUsersPictures = await fetch(`${url}/users/profile-pictures`);
      if (!getUsersPictures.ok) return;

      const usersPictures = await getUsersPictures.json();

      const timelineSlotsT = document.createElement("div");
      const sortCreateTimelinesDivT = document.createElement("div");
      const createNewTimelineBtnT = document.createElement("button");
      const sortTimelinesSelectT = document.createElement("select");

      const sortBy = document.createElement("option");
      const sortByViewsAsc = document.createElement("option");
      const sortByViewsDes = document.createElement("option");
      const sortByold = document.createElement("option");
      const sortByNew = document.createElement("option");

      timelineSlotsT.id = "timeline-slots-t";
      sortCreateTimelinesDivT.id = "sort-create-timelines-div-t";
      sortTimelinesSelectT.id = "sort-timelines-select-t";
      createNewTimelineBtnT.id = "create-new-timeline-btn-t";
      sortBy.textContent = "SORT BY";
      sortByViewsAsc.textContent = "Views asc";
      sortByViewsDes.textContent = "views des";
      sortByold.textContent = "Old";
      sortByNew.textContent = "New";
      createNewTimelineBtnT.textContent = "NEW TIMLINE";

      sortByViewsAsc.value = "views-asc";
      sortByViewsDes.value = "views-des";
      sortByold.value = "old";
      sortByNew.value = "new";

      timelinesDivT.append(timelineSlotsT);
      timelineSlotsT.append(sortCreateTimelinesDivT);

      sortCreateTimelinesDivT.append(createNewTimelineBtnT);
      sortCreateTimelinesDivT.append(sortTimelinesSelectT);

      sortTimelinesSelectT.append(sortBy);
      sortTimelinesSelectT.append(sortByViewsAsc);
      sortTimelinesSelectT.append(sortByViewsDes);
      sortTimelinesSelectT.append(sortByold);
      sortTimelinesSelectT.append(sortByNew);

      timelines.forEach(async (timeline) => {
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
          "timeline-owner-name cursor-pointer scale-up";
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
        viewsT.textContent = timeline.timeline_view_count;
        timelineDescriptionT.textContent = timeline.timeline_title;

        createdText.textContent = "Created";
        updatedText.textContent = "Updated";
        createdDate.textContent = new Date(
          timeline.timeline_date_created
        ).toLocaleDateString("en-bs");
        updatedDate.textContent = new Date(
          timeline.timeline_date_updated
        ).toLocaleDateString("en-bs");

        timelineDescriptionT.style.fontFamily = timeline.timeline_font_family;
        timelineDescriptionT.style.color = timeline.timeline_font_color;
        timelineSlotT.style.backgroundColor =
          timeline.timeline_background_color;

        timelineSlotsT.append(timelineSlotT);

        ownerProfileNameT.appendChild(roundPic);
        ownerProfileNameT.appendChild(timelineOwnerName);

        timelineOwnerViewsT.appendChild(ownerProfileNameT);
        timelineOwnerViewsT.appendChild(viewsT);

        timelineDescriptionDivT.appendChild(timelineDescriptionT);

        timelinePictureDivT.appendChild(timelinePresentPictureT);

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

        timelineOwnerProfilePictureT.src = await getPicURL(
          usersPictures[timeline.timeline_owner_id].data
        );
        timelinePresentPictureT.src = await getPicURL(
          timeline.timeline_picture_data.data
        );

        roundPic.appendChild(timelineOwnerProfilePictureT);
        if (++picturesLoaded === 1) res(picturesLoaded);
      });
    } catch (err) {
      console.log(err);
    }
  });
};

const getPicURL = (picture) => {
  return new Promise((res, rej) => {
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

const delayMS = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

logOutBtnT.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = "../../../index.html";
  a.click();
});

displayFrontPage();
