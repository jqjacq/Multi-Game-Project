// const playerScore = document.querySelector('.player-score');
// const computerScore = document.querySelector('.computer-score');
const startBtn = document.querySelector(".start-btn");
const displayResult = document.getElementById("message");
const restartBtn = document.querySelector(".restart-btn");
const board = document.querySelector(".gameBoard");
const boxes = document.querySelectorAll("[data-cell]");
const winningCombos = [
  [0, 1, 2], // horizontal
  [3, 4, 5], // horizontal
  [6, 7, 8], // horizontal
  [0, 3, 6], // vertical
  [1, 4, 7], // vertical
  [2, 5, 8], // vertical
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];
let playerX;
let playerO;
let isPlayerOTurn = false;
let currentTurn;
restartBtn.style.display = "none";

function startGame() {
  restartBtn.style.display = "block";
  startBtn.disabled = true;
  isPlayerOTurn = false;
  boxes.forEach((box) => {
    box.classList.remove("playerX");
    box.classList.remove("playerO");
    box.removeEventListener("click", handleBoxClick);
    box.addEventListener("click", handleBoxClick, { once: true });
  });
  setPlayerHover();
}

function handleBoxClick(e) {
  const box = e.target;
  let currentTurn = isPlayerOTurn ? "playerO" : "playerX";
  placeMark(box, currentTurn);
  if (checkWin(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setPlayerHover();
  }
}
//End game
function endGame(draw) {
  if (draw) {
    displayResult.textContent = "Draw!";
  } else {
    displayResult.textContent = `${isPlayerOTurn ? "O's" : "X's"} Wins!`;
  }
  displayResult.classList.add("show");
  boxes.forEach((box) => {
    box.removeEventListener("click", handleBoxClick);
  });
  console.log(displayResult);
}
//Check for draw
function isDraw() {
  return [...boxes].every((box) => {
    return box.classList.contains(playerX) || box.classList.contains(playerO);
  });
}
//Add mark to board
function placeMark(box, currentTurn) {
  box.classList.add(currentTurn);
}
// Swap turns
function swapTurns() {
  isPlayerOTurn = !isPlayerOTurn;
}
//Player's turn to place mark
function setPlayerHover() {
  board.classList.remove(playerX);
  board.classList.remove(playerO);
  if (isPlayerOTurn) {
    board.classList.add(playerO);
    displayResult.textContent = "Plater 2: O's Turn";
  } else {
    board.classList.add(playerX);
    displayResult.textContent = "Player 1: X's Turn";
  }
}
//Check for winning condition
function checkWin(currentTurn) {
  return winningCombos.some((combo) => {
    return combo.every((index) => {
      return boxes[index].classList.contains(currentTurn);
    });
  });
}
function restartGame() {
  startGame();
  displayResult.textContent = "";
  displayResult.classList.remove("show");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
