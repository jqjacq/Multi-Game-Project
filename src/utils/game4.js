const countScore = document.querySelector('.count-score');
const lives = document.querySelector('.lives');
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const bricksContainer = document.getElementById("bricks-container");
const displayResult = document.querySelector('.display-result');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');

// Set canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Blocks
ctx.beginPath();
ctx.rect(10, 20, 75, 20);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

//Ball
ctx.beginPath();
ctx.arc(250, 280, 5, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

//Paddle
ctx.beginPath();
ctx.rect(200, 300, 100, 10); // x, y, width, height
ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
ctx.fill();
ctx.stroke();
ctx.closePath();