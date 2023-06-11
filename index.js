//Retrieve images from indeximgs folder

const gridImages = [
  {
      "index": 1,
      "name": "Matching Game",
     "img": "src/imgs/indeximgs/1.png"
  }, {
      "index": 2,
      "name": "Rock Paper Scissors",
      "img": "src/imgs/indeximgs/2.png"
  }, {
      "index": 3,
      "name": "Tic Tac Toe",
      "img": "src/imgs/indeximgs/3.png"
  }, {
      "index": 4,
      "name": "Breakout",
      "img": "src/imgs/indeximgs/4.png"
  }, {
      "index": 5,
      "name": "Whack A Bear",
      "img": "src/imgs/indeximgs/5.png"
  }, {
      "index": 6,
      "name": "Snake",
      "img": "src/imgs/indeximgs/6.png"
  }
]
//Have image appear behind the each of the grid-item text
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach((item, index) => {
  item.style.backgroundImage = `url(${gridImages[index].img})`;
  //Add classList to each grid-item
  item.classList.add("grid-images");
  item.addEventListener('mouseover', () => {
    item.style.opacity = '1';
    item.style.transform = 'scale(1.1)';
  });
  item.addEventListener('mouseout', () => {
    item.style.opacity = '0.8';
    item.style.transform = 'scale(1)';
  });
});

