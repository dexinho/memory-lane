import { URL } from "./globalVar.js";
import { getPicURL } from "./getPicURL.js";

const searchWindowHolderT = document.querySelector("#search-window-holder-t");
const refreshSearchBarT = document.querySelector("#refresh-search-bar-t");

export const handleUserSearch = () => {
  const searchUserInputT = document.querySelector("#search-user-input-t");
  let isFetching = false;

  refreshSearchBarT.addEventListener("click", () => {
    searchWindowHolderT.style.display = "none";
    refreshSearchBarT.style.display = "none";

    searchUserInputT.value = "";
  });

  searchUserInputT.addEventListener("input", async (e) => {
    try {
      if (isFetching || e.data === " ") return;

      const searchQuery = searchUserInputT.value.replace(/\s+/g, " ").trim();

      if (!searchQuery) {
        searchWindowHolderT.style.display = "none";
        refreshSearchBarT.style.display = "none";

        return;
      }

      isFetching = true;

      refreshSearchBarT.style.display = "block";

      const response = await fetch(`${URL}/users/search?q=${searchQuery}`);

      if (response.ok) {
        const userData = await response.json();

        await createSearchSlots(userData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log("finally");
      isFetching = false;
    }
  });
};

const createSearchSlots = async (userData) => {
  const searchWindowSlotsT = document.querySelector("#search-window-slots-t");

  searchWindowSlotsT.innerHTML = "";
  searchWindowHolderT.style.display = "block";

  if (userData.length === 0) {
    searchWindowSlotsT.textContent = "No users found!";
    return;
  }

  return Promise.all(
    userData.map(async (user) => {
      try {
        const searchWindowSlotT = document.createElement("div");
        const searchWindowSlotPictureT = document.createElement("div");
        const searchWindowSlotNameT = document.createElement("div");
        const img = document.createElement("img");

        const picURL = await getPicURL(user.picture_data.data);
        img.src = picURL;

        searchWindowSlotT.id = `search-slot-${user.user_id}`;

        searchWindowSlotT.className = "search-window-slot-t";
        searchWindowSlotPictureT.className = "search-window-slot-picture-t";
        searchWindowSlotNameT.className = "search-window-slot-name-t";

        searchWindowSlotNameT.textContent = `${user.user_first_name} ${user.user_last_name}`;

        searchWindowSlotsT.append(searchWindowSlotT);

        searchWindowSlotT.append(searchWindowSlotPictureT);
        searchWindowSlotT.append(searchWindowSlotNameT);

        searchWindowSlotPictureT.append(img);

        // searchWindowSlotT.addEventListener('click', () => {
        //   const id =
        // })
      } catch (err) {
        console.log(err);
      }
    })
  ).then(() => {
    console.log("All promises res");
  });
};
