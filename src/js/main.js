const canvas = document.getElementById("canvas");
const plane = document.getElementById("plane");
const flyBtn = document.getElementById("flyBtn");
const gamebg = document.querySelector(".gamebg");
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

const enemy = document.querySelectorAll(".enemy");
const gameControl = document.getElementById("game-control");

plane.style.position = "absolute";
plane.style.left = "100px";
plane.style.top = "100px";

const keyframes = `
    @keyframes moveBackground {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }
`;

styleElement.sheet.insertRule(keyframes);

gameControl.style.animation = "moveBackground 200s linear infinite";

const canvasHeight = canvas.offsetHeight;

let downInterval;
let upInterval;
let isFlying = false;

function moveDown() {
  const newTop = parseInt(plane.style.top) + 1;

  if (newTop <= canvasHeight - 100) {
    plane.style.top = newTop + "px";
  }
}

function moveUp() {
  const currentTop = parseInt(plane.style.top) + 1;
  const newTop = currentTop - 5;

  if (newTop >= 0) {
    plane.style.top = newTop + "px";
  } else {
    stopFlying();
  }
}

function startFlying() {
  if (!isFlying) {
    plane.style.rotate = "-15deg";
    clearInterval(downInterval);
    upInterval = setInterval(moveUp, 10);
    isFlying = true;
  }
}

function stopFlying() {
  if (isFlying) {
    plane.style.rotate = "0deg";
    clearInterval(upInterval);
    downInterval = setInterval(moveDown, 10);
    isFlying = false;
  }
}

downInterval = setInterval(moveDown, 10);

flyBtn.addEventListener("mousedown", startFlying);
flyBtn.addEventListener("mouseup", stopFlying);

flyBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
