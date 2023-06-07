const countScore = document.querySelector('.count-score');
const lives = document.querySelector('.lives');
const bricksContainer = document.getElementById("bricks-container");
const displayResult = document.querySelector('.display-result');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');

// Set canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set ball
const ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Set paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let userRightPressed = false;
let userLeftPressed = false;

//Event listeners for paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Handle keyboard controls
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

// Draw ball function
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();
}
//Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0000ff80";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
  

// Set game
function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas
    drawBall();
    drawPaddle();
    //Bounce off the walls without disppearing into the wall
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        //Game over if ball hits bottom wall
    } else if(y + dy > canvas.height-ballRadius) { 
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            displayResult.textContent = "GAME OVER"
            //reload in 3 seconds
            setTimeout(() => {
            document.location.reload();
            }, 3000);
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    //Move paddle left and right
    if (userRightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (userLeftPressed && paddleX > 0) {
        paddleX = Math.max(paddleX - 7, 0);
    }      

      
    //Move board
    x += dx;
    y += dy;
}
const interval = setInterval(startGame, 10);


startBtn.addEventListener('click', () => {
    setInterval(startGame, 10);
});

// Set game over


// //Blocks
// ctx.beginPath();
// ctx.rect(10, 20, 75, 20);
// ctx.fillStyle = "#FF0000"; //Red
// ctx.fill();
// ctx.closePath();
