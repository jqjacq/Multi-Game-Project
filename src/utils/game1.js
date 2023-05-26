const grid = document.querySelector(".grid");
const displayMoves = document.querySelector(".count-moves");
const displayTimer = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const cards = document.querySelectorAll(".card");
let cardsArray = [];
let cardsChosen = [];
let cardsChosenId = [];
let moves = 0;
let timer;

//TODO
// Fix move count bug --it is counting every click
// Recognize when card is flipped as a match
// Flip card back over if not a match
// Add where when user completes game, timer stops and displays result
function randomizedCard(cardsData) {
  let randomizedCard = cardsData.sort(() => 0.5 - Math.random());
  randomizedCard.forEach((cardData) => {
    cardsArray.push(cardData);
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = cardData.num;
    card.style.backgroundImage = `url("src/imgs/game1imgs/front.png")`;
    //User clicks on card and it flips
    card.addEventListener("click", function () {
      card.style.backgroundImage = `url(${cardData.img})`;
      cardsChosenId.push(cardData.num);
      checkForMatching(card);
      countMoves();
    });
    grid.appendChild(card);
  });
}
function setTimer() {
  stopTimer();
  let time = 0;
  timer = setInterval(() => {
    time++;
    displayTimer.textContent = time;
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
}
function countMoves() {
  moves++;
  displayMoves.textContent = moves;
}

function startGame() {
  restartGame();
  setTimer();
  //Retrieve data and Randomize the cards
  fetch("src/jsondata/game1cards.json")
    .then((response) => response.json())
    .then((cardsData) => {
      let randomizedCards = randomizedCard(cardsData);
    });
  startBtn.disabled = true;
  restartBtn.disabled = false;
}
function restartGame() {
  cardsArray = [];
  cardsChosen = [];
  cardsChosenId = [];
  grid.innerHTML = "";
  displayMoves.textContent = 0;
  displayTimer.textContent = 0;
  startBtn.disabled = false;
  restartBtn.disabled = true;
  stopTimer(timer);
}
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function checkForMatching(cardsData) {
  const cards = document.querySelectorAll(".card");
  const cardOneId = cardsChosenId[0];
  const cardTwoId = cardsChosenId[1];

  //if card matches, keep flipped
  //if card does not match, flip back
  if (cardsChosen[0] == cardsChosen[1]) {
  } else {
    // setTimeout(() => {
    //   cards[
    //     cardOneId
    //   ].style.backgroundImage = `url("../imgs/game1imgs/front.png")`;
    //   cards[
    //     cardTwoId
    //   ].style.backgroundImage = `url("../imgs/game1imgs/front.png")`;
    // }, 1000);
  }
  // cardsChosen = [];
  // cardsChosenId = [];
  // displayMoves.textContent = moves;
  // displayResult.textContent = result;
}

// function flipCards() {
//   const cardId = this.getAttribute("id");
//   cardsChosen.push(cardsData[cardId].name);
//   cardsChosenId.push(cardId);
//   this.classList.add("flip");
//   if (cardsChosen.length === 2) {
//     setTimeout(checkForMatching, 500);
//   }
// }
