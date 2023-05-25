const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorBtn = document.getElementById('scissor-btn');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const displayResult = document.querySelector('.display-result');
const restartBtn = document.querySelector('.restart-btn');
//Game Logic & Score Count
let playerScoreCount = 0;
let computerScoreCount = 0;
function game(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        displayResult.textContent = "It's a tie";
    } else if (playerSelection === 'rock' && computerSelection === 'scissor') {
        playerScoreCount++;
        displayResult.textContent = 'You win! Rock beats Scissor';
    } else if (playerSelection === 'rock' && computerSelection === 'paper') {
        computerScoreCount++;
        displayResult.textContent = 'You lose! Paper beats Rock';
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        playerScoreCount++;
        displayResult.textContent = 'You win! Paper beats Rock';
    } else if (playerSelection === 'paper' && computerSelection === 'scissor') {
        computerScoreCount++;
        displayResult.textContent = 'You lose! Scissor beats Paper';
    } else if (playerSelection === 'scissor' && computerSelection === 'paper') {
        playerScoreCount++;
        displayResult.textContent = 'You win! Scissor beats Paper';
    } else if (playerSelection === 'scissor' && computerSelection === 'rock') {
        computerScoreCount++;
        displayResult.textContent = 'You lose! Rock beats Scissor';
    }
    playerScore.textContent = playerScoreCount;
    computerScore.textContent = computerScoreCount;
};
//Computer Selection
function computerPlay() {
    let computerSelection = Math.floor(Math.random() * 3);
    if (computerSelection === 0) {
        return 'rock';
    } else if (computerSelection === 1) {
        return 'paper';
    } else {
        return 'scissor';
    }
}

//User Selection
rockBtn.addEventListener('click', () => game('rock', computerPlay()));
paperBtn.addEventListener('click', () => game('paper', computerPlay()));
scissorBtn.addEventListener('click', () => game('scissor', computerPlay()));


//Resetting the score
restartBtn.addEventListener('click', function() {
    playerScoreCount = 0;
    computerScoreCount = 0;
    playerScore.textContent = playerScoreCount;
    computerScore.textContent = computerScoreCount;
    displayResult.textContent = 'Choose your attack!';
})
