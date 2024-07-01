const canvas = document.getElementById("canvas");
const plane = document.getElementById("plane");
const flyBtn = document.getElementById("flyBtn");
const gamebg = document.querySelector(".gamebg");
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

const bgMusic = document.getElementById("bgMusic");
const destroy = document.getElementById("destroy");
const jump = document.getElementById("jump");

function playMusic() {
  bgMusic.play();
}
function pauseMusic() {
  bgMusic.pause();
}

let destroyPlayed = false;

function playDestroy() {
  if (!destroyPlayed) {
    destroy.play();
    destroyPlayed = true;
  }
}

function playJump() {
  jump.currentTime = 0; // Restart the sound
  jump.play();
}

const enemy = document.querySelectorAll(".enemy"); // Use querySelectorAll for getting all enemies
const gameControl = document.getElementById("game-control");
const enemyGroup1 = document.getElementById("enemy-group1");
const enemyGroup2 = document.getElementById("enemy-group2");
const enemyGroup3 = document.getElementById("enemy-group3");
const enemyGroup4 = document.getElementById("enemy-group4");
const endScreen = document.getElementById("end-screen");

const enemyGroups = [enemyGroup1, enemyGroup2, enemyGroup3, enemyGroup4];

const getRandomNumberBetween = (min, max) => Math.random() * (max - min) + min;

const getRandomEnemyGroup = () => {
  const randomIndex = Math.floor(Math.random() * enemyGroups.length);
  return enemyGroups[randomIndex];
};

const createEnemies = (count) => {
  let currentPosition = 0;

  for (let i = 0; i < count; i++) {
    const randomEnemyGroup = getRandomEnemyGroup();
    const clone = randomEnemyGroup.cloneNode(true);
    currentPosition += 400 + getRandomNumberBetween(50, 100);
    clone.style.position = "absolute";
    clone.style.height = "100%";
    clone.style.left = currentPosition + "px";
    clone.id = `${randomEnemyGroup.id}-clone-${i}`;
    gameControl.appendChild(clone);
  }

  const lastEnemyGroup = currentPosition;

  const checkWinCondition = () => {
    const planeRect = plane.getBoundingClientRect();
    const winPosition = lastEnemyGroup;

    if (parseInt(plane.style.left) > winPosition) {
      showWinScreen();
    }
  };

  setInterval(checkWinCondition, 5000);
};

function showWinScreen() {
  const winText = document.createElement("div");
  winText.id = "win-text";
  winText.style.position = "absolute";
  winText.style.top = "50%";
  winText.style.left = "50%";
  winText.style.transform = "translate(-50%, -50%)";
  winText.style.zIndex = "50";
  winText.textContent = "You Win!";
  winText.style.color = "#fff";
  winText.style.fontSize = "36px";
  winText.style.textAlign = "center";
  gameControl.appendChild(winText);

  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.style.padding = "20px 40px";
  playAgainBtn.style.fontSize = "24px";
  playAgainBtn.style.backgroundColor = "#fff";
  playAgainBtn.style.color = "#000";
  playAgainBtn.style.border = "none";
  playAgainBtn.style.cursor = "pointer";
  playAgainBtn.style.marginTop = "20px";
  playAgainBtn.style.display = "block";
  playAgainBtn.style.marginLeft = "auto";
  playAgainBtn.style.marginRight = "auto";
  playAgainBtn.addEventListener("click", () => {
    location.reload();
  });

  gameControl.appendChild(playAgainBtn);
}

createEnemies(30);

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

gameControl.style.animation = "moveBackground 150s linear infinite";

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

let isMusicPlaying = false;

function moveUp() {
  const currentTop = parseInt(plane.style.top);
  const newTop = currentTop - 5;

  if (newTop >= 0) {
    plane.style.top = newTop + "px";
  } else {
    stopFlying();
  }
  playJump();
}

function startFlying() {
  if (!isFlying) {
    plane.style.rotate = "-15deg";
    clearInterval(downInterval);
    upInterval = setInterval(moveUp, 15);
    isFlying = true;
  }
}

function stopFlying() {
  if (isFlying) {
    plane.style.rotate = "0deg";
    clearInterval(upInterval);
    downInterval = setInterval(moveDown, 15);
    isFlying = false;
  }
}

downInterval = setInterval(moveDown, 5);

flyBtn.addEventListener("mousedown", startFlying);
flyBtn.addEventListener("touchstart", startFlying);
flyBtn.addEventListener("mouseup", stopFlying);
flyBtn.addEventListener("touchend", stopFlying);
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    startFlying();
  }
});
document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    stopFlying();
  }
});

flyBtn.addEventListener("click", (event) => {
  event.preventDefault();
});

// Function to check for collision
function checkCollision() {
  const planeRect = plane.getBoundingClientRect();
  const enemies = document.querySelectorAll(".enemy");

  for (const enemy of enemies) {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      planeRect.left < enemyRect.left + enemyRect.width &&
      planeRect.left + planeRect.width > enemyRect.left &&
      planeRect.top < enemyRect.top + enemyRect.height &&
      planeRect.top + planeRect.height > enemyRect.top
    ) {
      return true;
    }
  }
  return false;
}

function pauseGame() {
  gameControl.style.animationPlayState = "paused";
  clearInterval(upInterval);
  clearInterval(downInterval);
  // pauseMusic();
  isFlying = false;

  // Show the end screen
  const endScreen = document.getElementById("end-screen");
  endScreen.style.display = "flex";

  // Check if the play again button already exists
  let playAgainBtn = document.getElementById("play-again-btn");
  if (!playAgainBtn) {
    playAgainBtn = document.createElement("button");
    playAgainBtn.id = "play-again-btn";
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.style.padding = "25px 100px";
    playAgainBtn.style.backgroundColor = "transparent";
    playAgainBtn.style.border = "none";
    playAgainBtn.style.cursor = "pointer";
    playAgainBtn.style.marginTop = "20px";
    playAgainBtn.style.backgroundSize = "cover";
    playAgainBtn.style.backgroundRepeat = "no-repeat";
    playAgainBtn.style.backgroundPosition = "center";
    playAgainBtn.style.color = "#fff"; // Set text color if needed
    playAgainBtn.style.textIndent = "-9999px"; // Hide text off-screen

    endScreen.appendChild(playAgainBtn);
  }

  playDestroy();

  playAgainBtn.addEventListener("click", () => {
    // playMusic();
    location.reload();
  });
}

// Game loop to check for collisions
setInterval(() => {
  if (checkCollision()) {
    pauseGame();
    disableFlyButton();
  }
}, 100);

function disableFlyButton() {
  // Disable button and remove event listeners
  flyBtn.disabled = true;
  flyBtn.removeEventListener("mousedown", startFlying);
  flyBtn.removeEventListener("mouseup", stopFlying);
  flyBtn.removeEventListener("touchstart", startFlying);
  flyBtn.removeEventListener("touchend", stopFlying);
}
