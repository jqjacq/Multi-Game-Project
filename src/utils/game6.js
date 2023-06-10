import { disableRestart, enableRestart } from "./startrestart.js";

const gameCanvas = document.getElementById("gameCanvas");
const gameCanvas_ctx = gameCanvas.getContext("2d");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const displayResult = document.querySelector(".display-result");
const displayScore = document.querySelector(".display-score");
//Color of the canvas and snake
const boardBorder = "white";
const boardBackground = "black";
const snakeBorder = "darkgreen";
const snakeColor = "green";
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];
let score = 0;
let time = 0;
let changingDirection = false;
let foodX;
let foodY;
let dx = 10; // Horizontal velocity
let dy = 0; // Vertical velocity
let increaseSpeed;

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    startGame();
  }
});
document.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", function () {
  location.reload();
  disableRestart();
});

function startGame() {
  if (checkCollision())
    return (displayResult.textContent = `Game Over! You scored ${score} points!`);
  let changingDirection = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();
    startGame();
  }, 100);
  enableRestart();
}

//Draw border around canvas
function clearCanvas() {
  gameCanvas_ctx.fillStyle = boardBackground;
  gameCanvas_ctx.strokestyle = boardBorder;
  gameCanvas_ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  gameCanvas_ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
//Draw Snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}
//Draw food
function drawFood() {
  gameCanvas_ctx.fillStyle = "red";
  gameCanvas_ctx.strokestyle = "darkred";
  gameCanvas_ctx.fillRect(foodX, foodY, 10, 10);
  gameCanvas_ctx.strokeRect(foodX, foodY, 10, 10);
}
function drawSnakePart(snakePart) {
  gameCanvas_ctx.strokestyle = snakeBorder;
  gameCanvas_ctx.fillStyle = snakeColor;
  gameCanvas_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  gameCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function checkCollision() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}
//Randomize location of food
function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function generateFood() {
  foodX = randomFood(0, gameCanvas.width - 10);
  foodY = randomFood(0, gameCanvas.height - 10);
  snake.forEach(function HasSnakeEatFood(part) {
    const hasEaten = part.x == foodX && part.y == foodY;
    if (hasEaten) generateFood();
  });
}

function changeDirection(event) {
  const leftKey = 37;
  const rightKey = 39;
  const upKey = 38;
  const downKey = 40;
  //Prevent the snake from reversing
  const keyPressed = event.keyCode;
  const up = dy === -10;
  const down = dy === 10;
  const right = dx === 10;
  const left = dx === -10;
  if (keyPressed === leftKey && !right) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === upKey && !down) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === rightKey && !left) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === downKey && !up) {
    dx = 0;
    dy = 10;
  }
}
//Set timer when game starts
function setTimer() {
  setInterval(function () {
    time++;
    displayTimer.textContent = time;
  }, 1000);
}
//Move snake - Horizontal
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }; //Snake head
  snake.unshift(head); //Add new head to the beginning of snake body
  const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEatenFood) {
    score += 10; //Increase score
    displayScore.textContent = score;
    generateFood(); //Generate new food location
  } else {
    snake.pop(); //Remove the last part of snake body
  }
}

generateFood();
