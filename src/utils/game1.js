import { disableRestart, enableRestart } from "./startrestart.js";

const grid = document.querySelector(".grid");
const displayMoves = document.querySelector(".count-moves");
const displayTimer = document.querySelector(".timer");
const displayResult = document.querySelector(".display-result");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const cards = document.querySelectorAll(".card");
let cardsArray = [];
let cardsChosenId = [];
let moves = 0;
let timer;

// CREATE BOARD
function createBoard() {
  for (let i = 0; i < cardsArray.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
    displayResult.textContent = "";
  }
}
// FLIP CARD IF MATCH
function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosenId.push(cardId);
  this.classList.add("flip");
  this.innerHTML = `<img src="${cardsArray[cardId].img}" alt="${cardsArray[cardId].name}">`;
  if (cardsChosenId.length === 2) {
    setTimeout(checkForMatch, 300);
  }
}
// SET TIMER, STOP TIMER
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
//REMOVE DISPLAY RESULT
function removeDisplayResult() {
  setTimeout(() => {
    displayResult.textContent = "";
  }, 2500);
}

// CHECK FOR MATCH AND ADD MOVES
function checkForMatch() {
  let cards = document.querySelectorAll(".card");
  let firstCard = cards[cardsChosenId[0]];
  let secondCard = cards[cardsChosenId[1]];
  if (cardsChosenId[0] === cardsChosenId[1]) {
    displayResult.textContent = "You have clicked the same image!";
    removeDisplayResult();
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    moves++;
  } else if (firstCard.innerHTML === secondCard.innerHTML) {
    displayResult.textContent = "You found a match!";
    removeDisplayResult();
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    moves++;
  } else {
    displayResult.textContent = "Sorry, try again!";
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.innerHTML = "";
    secondCard.innerHTML = "";
    moves++;
  }
  //Once user completes all matches, display alert and stop timer
  if (document.querySelectorAll(".flip").length === cardsArray.length) {
    setTimeout(() => {
      displayResult.textContent = `Congratulations! You found all the matches! Your time is ${displayTimer.textContent} seconds with ${moves} moves!`;
    }, 10000);
    stopTimer(timer);
  }
  cardsChosenId = [];
  displayMoves.textContent = moves;
}

//START AND RESTART BUTTON
function startGame() {
  restartBtn.style.display = "inline-block";
  restartGame();
  setTimer();
  //Retrieve data and Randomize the cards
  fetch("src/jsondata/game1cards.json")
    .then((response) => response.json())
    .then((cardsData) => {
      cardsData.sort(() => 0.5 - Math.random());
      cardsData.forEach((card) => {
        cardsArray.push(card);
      });
      createBoard();
    });
  enableRestart();
}
function restartGame() {
  cardsArray = [];
  cardsChosenId = [];
  grid.innerHTML = "";
  displayMoves.textContent = 0;
  displayTimer.textContent = 0;
  disableRestart();
  stopTimer(timer);
}
//EVENT LISTENER
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

//Default board
function setUpBoard() {
  for (let i = 0; i < 12; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", i);
    grid.appendChild(card);
    card.style.cursor = "not-allowed";
    displayResult.textContent = "Click Start to play!";
    restartBtn.style.cursor = "not-allowed";
    restartBtn.disabled = true;
  }
}
setUpBoard();
