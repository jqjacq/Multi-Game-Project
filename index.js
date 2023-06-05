

//Add gradient to the background of each grid item when hover
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(gridItem => {
  gridItem.addEventListener('mouseover', () => {
    gridItem.classList.add('gradient');
  });
  gridItem.addEventListener('mouseout', () => {
    gridItem.classList.remove('gradient');
  });
}
);

