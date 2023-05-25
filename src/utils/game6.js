const countScore = document.querySelector('.count-score');
const timer = document.querySelector('.timer');
const snakeContainer = document.getElementById("snake-container");
const snake = document.getElementById("snake");
const food = document.getElementById("food");
const displayResult = document.querySelector('.display-result');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');

const snakeCanvas = document.getElementById("snakeCanvas");
const snakeCanvas_ctx = gameCanvas.getContext("2d");

gameCanvas_ctx.fillStyle = 'lightblue';  
gameCanvas_ctx.strokestyle = 'darkblue';
gameCanvas_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
gameCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);