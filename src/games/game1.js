import { cardArray } from "../jsondata/game1cards.json";

const result = document.querySelector(".result");
const lives = document.querySelector(".lives");
const game1Container = document.querySelector("#game1-container");

const createBoard = () => {
  const card = document.createElement("img");
  for (let i = 0; i < cardArray.length; i++) {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    board.appendChild(item);
  }
  game1Container.appendChild(board);
};

createBoard();
