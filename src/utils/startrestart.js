const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");

export function disableRestart() {
  startBtn.disabled = false;
  restartBtn.disabled = true;
  startBtn.style.cursor = "pointer";
  restartBtn.style.cursor = "not-allowed";
}
export function enableRestart() {
  startBtn.disabled = true;
  startBtn.style.cursor = "not-allowed";
  restartBtn.disabled = false;
  restartBtn.style.cursor = "pointer";
}
