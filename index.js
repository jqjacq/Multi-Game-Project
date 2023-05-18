const gridItem = document.querySelectorAll(".grid-item");
const increaseOpacity = (opacity) => {
  gridItem.forEach((item) => {
    item.style.opacity = opacity;
  });
};
