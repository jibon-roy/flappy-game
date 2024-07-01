const canvas = document.getElementById("canvas");
const plane = document.getElementById("plane");
const flyBtn = document.getElementById("flyBtn");
const gamebg = document.querySelector(".gamebg");
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

const enemy = document.querySelector(".enemy");
const gameControl = document.getElementById("game-control");
const enemyGroup1 = document.getElementById("enemy-group1");
const enemyGroup2 = document.getElementById("enemy-group2");
const enemyGroup3 = document.getElementById("enemy-group3");
const enemyGroup4 = document.getElementById("enemy-group4");

const enemyGroups = [enemyGroup1, enemyGroup2, enemyGroup3, enemyGroup4];

const getRandomNumberBetween = (min, max) => Math.random() * (max - min) + min;

const createEnemies = (count) => {
  let currentPosition = 0; // Initial position

  for (let i = 0; i < count; i++) {
    enemyGroups.forEach((enemyGroup, index) => {
      const clone = enemyGroup.cloneNode(true);
      currentPosition += 500 + getRandomNumberBetween(50, 100); // Add 500px plus a random value between 300 and 500px
      clone.style.position = "absolute";
      clone.style.height = "100%"; // Ensure the position style is set to absolute
      clone.style.left = currentPosition + "px";
      clone.id = `${enemyGroup.id}-clone-${i}-${index}`; // Assign a unique id to each clone
      gameControl.appendChild(clone);
      console.log(`Appended ${clone.id} at position ${clone.style.left}`);
    });
  }
};

// Create 21 enemies per group
createEnemies(21);

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

  if (newTop <= canvasHeight - 150) {
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
