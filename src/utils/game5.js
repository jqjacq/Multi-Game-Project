const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const bear = document.querySelector('.bear');
const holes = document.querySelectorAll('.holes');
const displayScore = document.querySelector('.count-score');
const displayTimer = document.querySelector('.timer');
const displayResult = document.querySelector('.display-result');
let score = 0; 
let currentTime = 25;
let timerId = null; 
let hitBear; 

function generateBearandScore() {
    //Prevent bear from appearing in the same hole
    holes.forEach((hole) => hole.classList.remove('bear'));
    //Randomly generate bear
    let randomHole = holes[Math.floor(Math.random() * 9)];
    randomHole.classList.add('bear');
    let hitBear = randomHole.id; //Get the id of the hole with the bear
    //Keep track of the score when the bear is hit and remove the bear
    holes.forEach(hole => {
        hole.style.cursor = 'pointer';
        hole.addEventListener('mousedown', function() {
            if(hole.id == hitBear) {
                score++;
                displayScore.textContent = score;
                hitBear = null; 
            }
        })
    })
}
//Move bear
function moveBear() {
    if(currentTime == 25) {
        timerId = setInterval(generateBearandScore, 750);
    } else if (currentTime == 15) {
        timerId = setInterval(generateBearandScore, 500);
    } else {
        timerId = setInterval(generateBearandScore, 250);
    } 
}
function countDown() {
    let countDownTimerId = setInterval(function() {
        currentTime--;
        displayTimer.textContent = currentTime;
        if(currentTime == 0) {
            clearInterval(timerId);
            clearInterval(countDownTimerId);
            displayResult.textContent = `Game Over! Your scored ${score} points`;   
            holes.forEach(hole => hole.style.cursor = 'default');
        }
    }, 1000)

}
//Start game
startBtn.addEventListener('click', function() { 
   moveBear();
   countDown();
   startBtn.disabled = true;
})
