import {
  timelineUserProfileT,
  timelinesDivT,
  loginPopUpMsgT,
  userNameT,
  userProfilePicT,
  logOutBtnT,
} from "./querySelectors.js";

import { getPicURL } from "./getPicURL.js";
import { URL, urlNavigation } from "./URL.js";
import { handleUserSearch } from "./findUser.js";
import { createNewTimeline as handleTimelineCreation } from "./timelines.js";
import { timelineCreationMemoriesSmoothScroll } from "./timelines.js";

const timelineQueryOptions = {
  timelineShowcaseOffset: 0,
  timelineShowcaseLimit: 3,
  sortChoice: "updated",
  sortOrder: "ASC",
};

let areTimelinesLeftToDisplay = true;
const timelineSlotsT = document.createElement("div");

const displayLoggedUserHeader = async () => {
  try {
    const loggedUserID = localStorage.loggedUserID;
    const userProfileImgT = document.createElement("img");
    userProfileImgT.id = "user-profile-img-t";

    areTimelinesLeftToDisplay = true;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const getLoggedUserData = await fetch(
      `${URL}/users/get-user-data?id=${loggedUserID}`
    );

    const loggedUserData = await getLoggedUserData.json();
    userProfileImgT.src = await getPicURL(loggedUserData.picture_data?.data);

    userNameT.textContent = `${loggedUserData.user_first_name} ${loggedUserData.user_last_name}`;

    userNameT.addEventListener("click", () => {
      const url = `../html/timelines.html?user-id=${loggedUserID}`;
      urlNavigation(url);
    });

    userProfilePicT.append(userProfileImgT);
  } catch (err) {
    console.log(err);
  }
};

export const displayCurrentPageLogoAndName = async ({ picture, name }) => {
  const sortCreatedTimelinesDivT = document.createElement("div");

  const currentTimelineHolderT = document.createElement("div");
  const currentTimelinePicT = document.createElement("img");
  const currentTimelineName = document.createElement("div");

  const filterHolderT = document.createElement("div");
  const filterTextIconT = document.createElement("div");
  const filterTextT = document.createElement("div");
  const filterIconT = document.createElement("i");
  const filterDropdownT = document.createElement("div");
  const filterDropdownOptionViews = document.createElement("div");
  const filterDropdownOptionUpdated = document.createElement("div");
  const filterOptionViewsHigh = document.createElement("div");
  const filterOptionViewsLow = document.createElement("div");
  const filterOptionUpdatedNew = document.createElement("div");
  const filterOptionUpdatedOld = document.createElement("div");
  const fiterBrT = document.createElement("div");

  filterTextIconT.className = "hover-pointer-rgba03";
  filterIconT.className = "fa-solid fa-filter filter-icon";
  filterOptionViewsHigh.className = "hover-pointer-rgba08 pct filter-option-t";
  filterOptionViewsLow.className = "hover-pointer-rgba08 pct filter-option-t";
  filterOptionUpdatedOld.className = "hover-pointer-rgba08 pct filter-option-t";
  filterOptionUpdatedNew.className =
    "hover-pointer-rgba08 pct filter-option-t filter-option-toggle-t";
  filterDropdownOptionViews.className = "pct color-white";
  filterDropdownOptionUpdated.className = "pct color-white";
  filterHolderT.id = "filter-holder-t";
  filterTextIconT.id = "filter-text-icon-t";
  filterTextT.id = "filter-text-t";
  filterDropdownT.id = "filter-dropdown-t";
  fiterBrT.id = "filter-br-t";
  // const sortTimelinesSelectT = document.createElement("select");

  // const sortBy = document.createElement("option");
  // const sortByViewsAsc = document.createElement("option");
  // const sortByViewsDes = document.createElement("option");
  // const sortByold = document.createElement("option");
  // const sortByNew = document.createElement("option");

  timelineSlotsT.id = "timeline-slots-t";
  sortCreatedTimelinesDivT.id = "sort-created-timelines-div-t";
  // sortTimelinesSelectT.id = "sort-timelines-select-t";

  currentTimelineHolderT.id = "current-timeline-holder-t";
  currentTimelinePicT.id = "current-timeline-pic-t";
  currentTimelineName.id = "current-timeline-name-t";

  currentTimelinePicT.className = "round-pic-b";

  // sortBy.textContent = "SORT BY";
  // sortByViewsAsc.textContent = "Highest views";
  // sortByViewsDes.textContent = "Lowest views";
  // sortByold.textContent = "Oldest timelines";
  // sortByNew.textContent = "Newest timelines";

  currentTimelinePicT.src = picture
    ? picture
    : "../../../src/assets/favicon/favicon.png";
  currentTimelineName.textContent = name ? name : "Home Page";
  filterTextT.textContent = "Sort By";
  filterDropdownOptionViews.textContent = "Views";
  filterDropdownOptionUpdated.textContent = "Updated";
  filterOptionViewsHigh.textContent = "High";
  filterOptionViewsLow.textContent = "Low";
  filterOptionUpdatedNew.textContent = "New";
  filterOptionUpdatedOld.textContent = "Old";

  filterDropdownT.append(filterDropdownOptionUpdated);
  filterDropdownT.append(filterDropdownOptionViews);
  filterDropdownT.append(fiterBrT);
  filterDropdownT.append(filterOptionUpdatedNew);
  filterDropdownT.append(filterOptionViewsHigh);
  filterDropdownT.append(filterOptionUpdatedOld);
  filterDropdownT.append(filterOptionViewsLow);

  // sortByViewsAsc.value = "highest-views";
  // sortByViewsDes.value = "lowest-views";
  // sortByold.value = "old-timelines";
  // sortByNew.value = "new-timelines";

  timelinesDivT.append(sortCreatedTimelinesDivT);
  timelinesDivT.append(timelineSlotsT);

  sortCreatedTimelinesDivT.append(currentTimelineHolderT);
  sortCreatedTimelinesDivT.append(filterHolderT);

  filterHolderT.append(filterTextIconT);
  filterTextIconT.append(filterTextT);
  filterTextIconT.append(filterIconT);
  filterHolderT.append(filterDropdownT);
  // sortCreatedTimelinesDivT.append(sortTimelinesSelectT);

  // sortTimelinesSelectT.append(sortBy);
  // sortTimelinesSelectT.append(sortByViewsAsc);
  // sortTimelinesSelectT.append(sortByViewsDes);
  // sortTimelinesSelectT.append(sortByNew);
  // sortTimelinesSelectT.append(sortByold);

  currentTimelineHolderT.append(currentTimelinePicT);
  currentTimelineHolderT.append(currentTimelineName);
};

const noTimelinesToShow = () => {
  const sortTimelines = document.querySelector("#sort-timelines-select-t");

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
  sortTimelines.style.visibility = "hidden";
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

        timelineDescriptionT.style.fontFamily = timeline.timeline_font_family;
        timelineDescriptionT.style.color = timeline.timeline_font_color;
        timelineSlotT.style.backgroundColor =
          timeline.timeline_background_color;

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
          `${URL}/users/get-profile-picture?id=${timeline.timeline_owner_id}`
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
          timeline.timeline_picture_data.data
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

const handleUserScroll = () => {
  let areTimelinesLoading = false;
  window.addEventListener("scroll", async () => {
    console.log(areTimelinesLeftToDisplay)
    if (areTimelinesLoading || !areTimelinesLeftToDisplay) return;

    try {
      const currentScrollY = window.scrollY + window.innerHeight;
      const fullWindowHeight = document.documentElement.scrollHeight;
      const timelineSlot = document.querySelector(".timeline-slot-t");
      const timelineSlotHeight = parseInt(
        getComputedStyle(timelineSlot).height,
        10
      );

      if (fullWindowHeight >= currentScrollY + timelineSlotHeight) return;

      const urlParams = new URLSearchParams(window.location.search);
      const userID = urlParams.get("user-id");

      areTimelinesLoading = true;
      timelineQueryOptions.timelineShowcaseOffset += 3;

      const timelines = await getTimelines(userID);

      if (timelines.length > 0) {
        await displayTimelines({ timelines });
      } else areTimelinesLeftToDisplay = false;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      areTimelinesLoading = false;
    }
  });
};

logOutBtnT.addEventListener("click", () => {
  localStorage.loggedUserID = "";
  const url = "../../../index.html";

  urlNavigation(url);
});

const checkUrlParameters = async () => {
  const timelineHeader = {};
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get("user-id");

  if (localStorage.justLoggedIn) {
    timelineUserProfileT.style.display = "none";
    loginPopUpMsgT.showModal();

    localStorage.justLoggedIn = "";
  }

  try {
    await displayLoggedUserHeader();
    const timelines = await getTimelines(userID);

    const userDataResponse = await fetch(
      `${URL}/users/get-user-data?id=${userID || localStorage.loggedUserID}`
    );
    const userData = await userDataResponse.json();

    if (userID) {
      timelineHeader.picture = await getPicURL(userData.picture_data.data);
      timelineHeader.name = `${userData.user_first_name} ${userData.user_last_name}`;
    }

    await displayCurrentPageLogoAndName(timelineHeader);

    if (timelines.length === 0) {
      areTimelinesLeftToDisplay = false;
    }

    await displayTimelines({ timelines });
    makeTimelinesFilterable();
  } catch (err) {
    console.log(err);
  } finally {
    loginPopUpMsgT.close();
    timelineUserProfileT.style.display = "grid";
  }
};

const getTimelines = async (userID) => {
  try {
    let query = "";

    if (userID) {
      query = `${URL}/timelines/get-timelines?id=${userID}&offset=${timelineQueryOptions.timelineShowcaseOffset}&limit=${timelineQueryOptions.timelineShowcaseLimit}&sort%20choice${timelineQueryOptions.sortChoice}&sort%20order=${timelineQueryOptions.sortOrder}`;
    } else {
      query = `${URL}/timelines/get-timelines?offset=${timelineQueryOptions.timelineShowcaseOffset}&limit=${timelineQueryOptions.timelineShowcaseLimit}&sort%20choice=${timelineQueryOptions.sortChoice}&sort%20order=${timelineQueryOptions.sortOrder}`;

      if (Number(userID) === Number(localStorage.loggedUserID)) {
        query += `&${owner}=true`;
      }
    }

    const getTimelinesResponse = await fetch(query);

    if (!getTimelinesResponse.ok)
      throw new Error(`HTTP error! Status: ${getTimelinesResponse.status}`);

    const timelines = await getTimelinesResponse.json();

    return timelines;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const handleHomePageBtn = () => {
  const homeBtnT = document.querySelector("#home-btn-t");
  const url = "../html/timelines.html";

  homeBtnT.addEventListener("click", () => urlNavigation(url));
};

const makeTimelinesFilterable = () => {
  const filter = document.querySelector("#filter-holder-t");
  const filterDropdownT = document.querySelector("#filter-dropdown-t");
  const filterOptionsT = document.querySelectorAll(".filter-option-t");

  filter.addEventListener("click", () => {
    filterDropdownT.classList.toggle("filter-dropdown-display-toggle-t");
  });

  handleFilterOptions(filterOptionsT);
};

const handleFilterOptions = (options) => {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((option) =>
        option.classList.remove("filter-option-toggle-t")
      );

      option.classList.add("filter-option-toggle-t");

      sortTimelineByFilterOptions();
    });
  });
};

const sortTimelineByFilterOptions = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get("user-id");

  const filterOptionToggleT = document.querySelector(".filter-option-toggle-t");

  if (filterOptionToggleT.textContent === "New") {
    timelineQueryOptions.sortOrder = "ASC";
    timelineQueryOptions.sortChoice = "updated";
  } else if (filterOptionToggleT.textContent === "Old") {
    timelineQueryOptions.sortOrder = "DESC";
    timelineQueryOptions.sortChoice = "updated";
  } else if (filterOptionToggleT.textContent === "High") {
    timelineQueryOptions.sortOrder = "DESC";
    timelineQueryOptions.sortChoice = "views";
  } else if (filterOptionToggleT.textContent === "Low") {
    timelineQueryOptions.sortOrder = "ASC";
    timelineQueryOptions.sortChoice = "views";
  }

  timelineQueryOptions.timelineShowcaseOffset = 0;
  timelineQueryOptions.timelineShowcaseLimit = 3;
  areTimelinesLeftToDisplay = true;

  try {
    const timelines = await getTimelines(userID);
    const timelineSlotsT = document.querySelector("#timeline-slots-t");
    timelineSlotsT.innerHTML = "";

    console.log(timelines);

    displayTimelines({ timelines });
  } catch (err) {
    console.log(err);
  }
};

checkUrlParameters();
handleUserSearch();
handleTimelineCreation();
handleUserScroll();
handleHomePageBtn();
timelineCreationMemoriesSmoothScroll();
