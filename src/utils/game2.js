import { disableRestart, enableRestart } from "./startrestart.js";

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorBtn = document.getElementById("scissor-btn");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const displayResult = document.querySelector(".display-result");
const displayAllResult = document.querySelector(".display-all-result");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
displayResult.textContent = "Click Start to play!";
//Game Logic & Score Count
let playerScoreCount = 0;
let computerScoreCount = 0;
scissorBtn.style.cursor = "default";
paperBtn.style.cursor = "default";
rockBtn.style.cursor = "default";

function game(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    displayResult.textContent = "It's a tie!";
  } else if (playerSelection === "✊" && computerSelection === "✌️") {
    playerScoreCount++;
    displayResult.textContent = `You win! Rock beats Scissor.`;
  } else if (playerSelection === "✊" && computerSelection === "🤚") {
    computerScoreCount++;
    displayResult.textContent = `You lose! Paper beats Rock.`;
  } else if (playerSelection === "🤚" && computerSelection === "✊") {
    playerScoreCount++;
    displayResult.textContent = "You win! Paper beats Rock.";
  } else if (playerSelection === "🤚" && computerSelection === "✌️") {
    computerScoreCount++;
    displayResult.textContent = "You lose! Scissor beats Paper.";
  } else if (playerSelection === "✌️" && computerSelection === "🤚") {
    playerScoreCount++;
    displayResult.textContent = "You win! Scissor beats Paper.";
  } else if (playerSelection === "✌️" && computerSelection === "✊") {
    computerScoreCount++;
    displayResult.textContent = "You lose!";
  }
  playerScore.textContent = playerScoreCount;
  computerScore.textContent = computerScoreCount;
  displayAllResult.textContent = `You: ${playerSelection} ${computerSelection} :Computer`;
}
//Computer Selection
function computerPlay() {
  let computerSelection = Math.floor(Math.random() * 3);
  if (computerSelection === 0) {
    return "✊";
  } else if (computerSelection === 1) {
    return "🤚";
  } else {
    return "✌️";
  }
}

//Disable rock, paper, scissor buttons
function disableBtn() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorBtn.disabled = true;
}
disableBtn();
//Enable rock, paper, scissor buttons
function enableBtn() {
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorBtn.disabled = false;
}

// restartBtn.style.display = "block";
//Resetting the score
startBtn.addEventListener("click", function () {
  enableRestart();
  playerScoreCount = 0;
  computerScoreCount = 0;
  playerScore.textContent = playerScoreCount;
  computerScore.textContent = computerScoreCount;
  displayResult.textContent = "Choose your attack!";
  scissorBtn.style.cursor = "pointer";
  paperBtn.style.cursor = "pointer";
  rockBtn.style.cursor = "pointer";
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorBtn.disabled = false;
  //User Selection
  rockBtn.addEventListener("click", () => game("✊", computerPlay()));
  paperBtn.addEventListener("click", () => game("🤚", computerPlay()));
  scissorBtn.addEventListener("click", () => game("✌️", computerPlay()));
});

restartBtn.addEventListener("click", function () {
  playerScoreCount = 0;
  computerScoreCount = 0;
  playerScore.textContent = playerScoreCount;
  computerScore.textContent = computerScoreCount;
  displayResult.textContent = "";
  disableRestart();
});
