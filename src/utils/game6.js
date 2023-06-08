// const countScore = document.querySelector(".count-score");
// const timer = document.querySelector(".timer");
// const food = document.getElementById("food");
// const displayResult = document.querySelector(".display-result");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvas_ctx = gameCanvas.getContext("2d");
//Color of the canvas and snake
const boardBorder = "black";
const boardBackground = "white";
const snakeBorder = "red";
const snakeColor = "green";
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];
let changingDirection = false;
let dx = 10; // Horizontal velocity
let dy = 0; // Vertical velocity

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", changeDirection);
function startGame() {
  if (gameOver()) return;
  let changingDirection = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawSnake();
    moveSnake();
    startGame();
  }, 100);
  startBtn.disabled = true;
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
function drawSnakePart(snakePart) {
  gameCanvas_ctx.strokestyle = snakeBorder;
  gameCanvas_ctx.fillStyle = snakeColor;
  gameCanvas_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  gameCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function gameOver() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  //Prevent the snake from reversing
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}
//Move snake - Horizontal
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }; //Snake head
  snake.unshift(head); //Add new head to the beginning of snake body
  snake.pop();
}

startGame();
