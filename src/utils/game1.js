const gameContainer = document.querySelector('#game1-container');
const countMoves = document.querySelector('.count-moves');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const cards = document.querySelectorAll('.card');

fetch("src/jsondata/game1cards.json")
    .then(response => response.json())
    .then(cardsData => {
        cardsData.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = cardData.num;
            card.style.backgroundImage = `url(${cardData.img})`;
            gameContainer.appendChild(card);
        })
    });

startBtn.addEventListener('click', () => {})
restartBtn.addEventListener('click', () => {})

