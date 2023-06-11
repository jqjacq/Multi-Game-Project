import { disableRestart, enableRestart } from "./startrestart.js";

const countScore = document.querySelector(".count-score");
const lives = document.querySelector(".lives");
const bricksContainer = document.getElementById("bricks-container");
const displayResult = document.querySelector(".display-result");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");

//SETTING CANVAS, BALL, PADDLE, AND BRICKS
// Set canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set ball
const ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height - 15;
let dx = 3;
let dy = -3;
// Set paddle

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let userRightPressed = false;
let userLeftPressed = false;

//Set bricks - cols and rows
const brickRowCount = 6;
const brickColumnCount = 8;
const brickWidth = 50;
const brickHeight = 10;
const brickPadding = 5;
const brickOffsetTop = 25;
const brickOffsetLeft = 20;
const bricks = [];
for (let cols = 0; cols < brickColumnCount; cols++) {
  bricks[cols] = [];
  for (let rows = 0; rows < brickRowCount; rows++) {
    bricks[cols][rows] = { x: 0, y: 0, status: 1 };
  }
}
//Set score
let score = 0;
//Set lives
let liveCount = 3;

//HANDLE KEYBOARD CONTROLS
//Event listeners for paddle pressing left and right keys and mouse movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Handle keyboard controls & mouse controls
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    userRightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    userLeftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    userRightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    userLeftPressed = false;
  }
}
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

//DETECT COLLISION
function collisionDetection() {
  for (let cols = 0; cols < brickColumnCount; cols++) {
    for (let rows = 0; rows < brickRowCount; rows++) {
      const b = bricks[cols][rows];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            displayResult.textContent = "YOU WIN, CONGRATULATIONS!";
            setTimeout(() => {
              document.location.reload();
            }, 5000);
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

//DRAW BALL, PADDLE, AND BRICKS
// Draw ball function
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
//Draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#3f3e3e";
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

//Draw bricks
function drawBricks() {
  for (let cols = 0; cols < brickColumnCount; cols++) {
    for (let rows = 0; rows < brickRowCount; rows++) {
      if (bricks[cols][rows].status === 1) {
        const brickX = cols * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = rows * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[cols][rows].x = brickX;
        bricks[cols][rows].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//Draw score
function drawScore() {
  ctx.font = "12px 'Orbitron', sans-serif";
  ctx.fillStyle = "black";
  ctx.fontWeight = "bold";
  ctx.fillText(`Score: ${score}`, 8, 20);
}
function drawLives() {
  ctx.font = "12px 'Orbitron', sans-serif";
  ctx.fillStyle = "black";
  ctx.fontWeight = "bold";
  ctx.fillText(`Lives: ${liveCount}`, canvas.width - 65, 20);
}

// Set game
function startGame() {
  enableRestart();
  canvas.style.cursor = "pointer";
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas
  drawBall();
  drawPaddle();
  drawBricks();
  drawLives();
  collisionDetection();
  drawScore();

  //Bounce off the walls without disppearing into the wall
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    //Game over if ball hits bottom wall
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      liveCount--;
      if (!liveCount || liveCount < 0) {
        displayResult.textContent = "GAME OVER";
        liveCount = 0;
        setTimeout(() => {
          document.location.reload();
        }, 3000);
        clearInterval(interval);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  //Move paddle left and right
  if (userRightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX = Math.min(paddleX + 11, canvas.width - paddleWidth);
  } else if (userLeftPressed && paddleX > 0) {
    paddleX = Math.max(paddleX - 11, 0);
  }

  //Move board
  x += dx;
  y += dy;
}

drawBall();
drawPaddle();
drawBricks();

//Start and restart button
startBtn.addEventListener("click", (e) => {
  setInterval(startGame, 10);
  enableRestart();
});

restartBtn.addEventListener("click", (e) => {
  document.location.reload();
  disableRestart();
});
