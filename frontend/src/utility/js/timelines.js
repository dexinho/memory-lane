// timelinePicDivT.forEach((timelinePic) => {
//   timelinePic.addEventListener("click", () => {
//     const cover = document.createElement("div");
//     document.body.append(cover);

//     cover.classList.toggle("body-cover");
//     document.body.classList.toggle("overflow");
//   });
// });

const timelineMemorySlotsT = document.querySelector(".timeline-memory-slots-t");
const timelineMemorySlotT = document.querySelectorAll(
  ".timeline-memory-slot-t"
);

export const scroll = () => {
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
