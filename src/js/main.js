const canvas = document.getElementById("canvas");
const plane = document.getElementById("plane");
const flyBtn = document.getElementById("flyBtn");
const gamebg = document.querySelector(".gamebg");
const enemy = document.querySelectorAll(".enemy");
// const gameControl = document.getElementById("game-control");

plane.style.position = "absolute";
plane.style.left = "100px";
plane.style.top = "100px";

const canvasHeight = canvas.offsetHeight;

let downInterval; // Interval for moving down
let upInterval; // Interval for moving up
let isFlying = false;

function moveDown() {
  const newTop = parseInt(plane.style.top) + 1; // Move down by 1px

  if (newTop <= canvasHeight - 100) {
    plane.style.top = newTop + "px";
  }
}

function moveUp() {
  const currentTop = parseInt(plane.style.top) + 1;
  const newTop = currentTop - 5; // Move up by 10px

  if (newTop >= 0) {
    plane.style.top = newTop + "px";
  } else {
    stopFlying();
  }
}

function startFlying() {
  if (!isFlying) {
    plane.style.rotate = "-15deg";
    clearInterval(downInterval); // Stop moving down
    upInterval = setInterval(moveUp, 10); // Start moving up continuously
    isFlying = true;
  }
}

function stopFlying() {
  if (isFlying) {
    plane.style.rotate = "0deg";
    clearInterval(upInterval); // Stop moving up
    downInterval = setInterval(moveDown, 10); // Resume moving down
    isFlying = false;
  }
}

// Start moving down by default
downInterval = setInterval(moveDown, 10);

flyBtn.addEventListener("mousedown", startFlying);
flyBtn.addEventListener("mouseup", stopFlying);

// Prevent default behavior of the button
flyBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
