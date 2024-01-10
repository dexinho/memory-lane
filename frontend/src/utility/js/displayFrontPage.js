let picturesLoaded = 0;
const timelineSlotsT = document.createElement("div");

import {
  timelineUserProfileT,
  timelinesDivT,
  loginPopUpMsgT,
  userNameT,
  userProfilePicT,
  logOutBtnT,
} from "./querySelectors.js";

import { getPicURL } from "./getPicURL.js";
import { URL } from "./globalVar.js";
import { handleUserSearch } from "./findUser.js";
import { handleTimelineCreation } from "./createTimeline.js";
import { timelineCreationMemoriesSmoothScroll } from "./createTimeline.js";
const displayFrontPage = async () => {
  try {
    const loggedUserID = localStorage.loggedUserID;
    const userProfileImgT = document.createElement("img");
    userProfileImgT.id = "user-profile-img-t";

    timelinesDivT.style.display = "none";
    loginPopUpMsgT.style.display = "flex";
    timelineUserProfileT.style.position = "none";

    const getTimelines = await fetch(`${URL}/timelines/get-timelines`);

    if (getTimelines.ok) {
      const getLoggedUserData = await fetch(
        `${URL}/users/data?id=${loggedUserID}`
      );

      const timelines = await getTimelines.json();
      const loggedUserData = await getLoggedUserData.json();

      userNameT.textContent = `${loggedUserData.user_first_name} ${loggedUserData.user_last_name}`;

      await displayTimelinesHeader({});
      await displayTimelines(timelines);

      userProfileImgT.src = await getPicURL(loggedUserData.picture_data?.data);
      userProfilePicT.append(userProfileImgT);

      timelineUserProfileT.style.display = "grid";
      timelinesDivT.style.display = "flex";
      loginPopUpMsgT.style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
};

export const displayTimelinesHeader = async ({ picture, name }) => {
  const sortCreatedTimelinesDivT = document.createElement("div");

  const currentTimelineHolderT = document.createElement("div");
  const currentTimelinePicT = document.createElement("img");
  const currentTimelineName = document.createElement("div");

  const sortTimelinesSelectT = document.createElement("select");

  const sortBy = document.createElement("option");
  const sortByViewsAsc = document.createElement("option");
  const sortByViewsDes = document.createElement("option");
  const sortByold = document.createElement("option");
  const sortByNew = document.createElement("option");

  timelineSlotsT.id = "timeline-slots-t";
  sortCreatedTimelinesDivT.id = "sort-created-timelines-div-t";
  sortTimelinesSelectT.id = "sort-timelines-select-t";

  currentTimelineHolderT.id = "current-timeline-holder-t";
  currentTimelinePicT.id = "current-timeline-pic-t";
  currentTimelineName.id = "current-timeline-name-t";

  sortBy.textContent = "SORT BY";
  sortByViewsAsc.textContent = "Views asc";
  sortByViewsDes.textContent = "views des";
  sortByold.textContent = "Old";
  sortByNew.textContent = "New";

  currentTimelinePicT.src = picture
    ? picture
    : "../../../src/assets/favicon/favicon.png";
  currentTimelineName.textContent = name ? name : "Front Page";

  sortByViewsAsc.value = "views-asc";
  sortByViewsDes.value = "views-des";
  sortByold.value = "old";
  sortByNew.value = "new";

  timelinesDivT.append(timelineSlotsT);
  timelineSlotsT.append(sortCreatedTimelinesDivT);

  // sortCreateTimelinesDivT.append(createNewTimelineBtnT);
  sortCreatedTimelinesDivT.append(currentTimelineHolderT);
  sortCreatedTimelinesDivT.append(sortTimelinesSelectT);

  sortTimelinesSelectT.append();
  sortTimelinesSelectT.append(sortBy);
  sortTimelinesSelectT.append(sortByViewsAsc);
  sortTimelinesSelectT.append(sortByViewsDes);
  sortTimelinesSelectT.append(sortByold);
  sortTimelinesSelectT.append(sortByNew);

  currentTimelineHolderT.append(currentTimelinePicT);
  currentTimelineHolderT.append(currentTimelineName);
};

export const displayTimelines = async (timelines) => {
  return new Promise(async (res) => {
    try {
      const getUsersPictures = await fetch(`${URL}/users/profile-pictures`);
      if (!getUsersPictures.ok) return;

      const usersPictures = await getUsersPictures.json();

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

logOutBtnT.addEventListener("click", () => {
  localStorage.loggedUserID = "";

  const a = document.createElement("a");
  a.href = "../../../index.html";
  a.click();
});

displayFrontPage();
handleUserSearch();
handleTimelineCreation();
timelineCreationMemoriesSmoothScroll();
