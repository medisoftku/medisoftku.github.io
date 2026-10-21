//All code beyond this point was written by AI, concept of game, art/sprites, and comments of course still by me

//Sprites for ores
const SPRITES = {
  iron: 'https://raw.githubusercontent.com/medisoftku/medisoftku.github.io/refs/heads/main/OREiron.png',
  gold: 'https://raw.githubusercontent.com/medisoftku/medisoftku.github.io/refs/heads/main/ORElimestone.png',
  copper: 'https://raw.githubusercontent.com/medisoftku/medisoftku.github.io/refs/heads/main/OREorange.png',
  silver: 'https://raw.githubusercontent.com/medisoftku/medisoftku.github.io/refs/heads/main/ORElead.png',
  stone: 'https://raw.githubusercontent.com/medisoftku/medisoftku.github.io/refs/heads/main/OREstone.png'
};

//establishes html connections
const displayBox = document.getElementById('displayBox');
const container = document.querySelector('.container');

//Sizing of game
const BOARD_WIDTH = 448;
const BOARD_HEIGHT = 600;
const TILE_SIZE = 112;
//list of non-iron metals
const METALS = ['gold', 'copper', 'silver', 'stone'];

//establishes rows
let rows = [];
//creates score
let score = 0;
//tracks iron tiles tapped
let ironCount = 0;
//high score retrieval from localStorage
let highScore = localStorage.getItem('oreBuster_highScore') || 0;
//timer variables (20-second limit)
let timeLeft = 20;
let timerInterval = null;
//speed of game scroll
let scrollSpeed = 180; // Base speed in pixels per second
const SPEED_ACCELERATION = 10; // Pixels per second increase per second elapsed
//variables to check if game still running
let isGameOver = false;
let lastTime = 0;
let scoreElement = null;

//Initial start box
function showStartScreen() {
  displayBox.innerHTML = `
    <div class="readyBox" style="height: 420px; top: 10%; padding: 15px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
      <h1 style="margin: 0; font-size: 2rem;">Ore Buster</h1>
      <div class="howToPlay" style="text-align: center;">
        <p style="margin: 3px 0; font-size: 0.95rem;"><strong>How to Play:</strong></p>
        <p style="margin: 3px 0; font-size: 0.85rem;">Tap as many <strong>IRON</strong> ores as you can before the 20-second timer runs out!</p>
        <div class="ironPreviewContainer" style="display: flex; align-items: center; justify-content: center; gap: 8px; margin: 6px 0;">
          <span style="font-size: 0.9rem;">Target Iron:</span>
          <img src="${SPRITES.iron}" alt="Iron Ore" class="ironPreviewTile" style="width: 80px; height: 80px; border-radius: 4px; border: 2px solid #1a1007;">
        </div>
        <p style="margin: 3px 0; font-size: 0.8rem; color: #a30000;">Warning: Tapping other metals deducts points!</p>
        <p style="margin: 5px 0 0 0; font-size: 0.95rem; font-weight: bold;">High Score: ${highScore}</p>
      </div>
      <span style="text-decoration: none;">
        <div class="start" id="start"><h2 style="color:white; margin: 0; font-size: 1.2rem;">Start</h2></div>
      </span>
    </div>
  `;

  const startBtn = document.getElementById('start');
  if (startBtn) {
    startBtn.addEventListener('pointerdown', startGame);
  }
}

// Start game loop
function startGame() {
  // Clear Start Box overlay UI
  displayBox.innerHTML = '';

  // Creates overlay for Score
  scoreElement = document.createElement('div');
  scoreElement.id = 'hud-score';
  updateHUD();
  container.appendChild(scoreElement);

  // Reset game
  score = 0;
  ironCount = 0;
  timeLeft = 20;
  scrollSpeed = 180;
  isGameOver = false;
  lastTime = 0;
  rows = [];

  // Start 20 second countdown
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateHUD();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame('Time is up!');
    }
  }, 1000);

  // Remove rows when restarting
  const existingRows = container.querySelectorAll('.grid-row');
  existingRows.forEach((row) => row.remove());

  // Fill board with rows
  for (let y = BOARD_HEIGHT - TILE_SIZE; y >= -TILE_SIZE; y -= TILE_SIZE) {
    spawnRow(y);
  }

  //Animation loop
  requestAnimationFrame(updateGameLoop);
}

//Update score
function updateHUD() {
  if (scoreElement) {
    scoreElement.textContent = `Time: ${timeLeft}s | Score: ${score} | Iron: ${ironCount}`;
  }
}

//4 column row
function spawnRow(yPosition) {
  const rowElement = document.createElement('div');
  rowElement.classList.add('grid-row');

  // Randomly choose 1 column for iron
  const ironColIndex = Math.floor(Math.random() * 4);
  const rowData = {
    element: rowElement,
    y: yPosition,
    ironClicked: false,
  };

  for (let col = 0; col < 4; col++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    let metalType = '';
    if (col === ironColIndex) {
      metalType = 'iron';
    } else {
      metalType = METALS[Math.floor(Math.random() * METALS.length)];
    }

    tile.classList.add(`metal-${metalType}`);
    tile.dataset.type = metalType;

    // Apply GitHub sprite image if available
    if (SPRITES[metalType]) {
      tile.style.backgroundImage = `url('${SPRITES[metalType]}')`;
      tile.style.backgroundSize = 'cover';
      tile.style.backgroundPosition = 'center';
    }

    //Pointerdown/touch
    tile.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handleTileTap(tile, rowData);
    });

    rowElement.appendChild(tile);
  }

  // Set initial position
  rowElement.style.transform = `translateY(${yPosition}px)`;
  container.appendChild(rowElement);
  rows.push(rowData);
}

//Player taps
function handleTileTap(tile, rowData) {
  if (isGameOver) return;

  const type = tile.dataset.type;

  if (type === 'iron') {
    // Only register iron tile tap once per tile
    if (!tile.classList.contains('clicked')) {
      tile.classList.add('clicked');
      rowData.ironClicked = true;

      //Score keeper, increase speed progressively
      score += 10;
      ironCount += 1; // Tracks how many irons pressed
      scrollSpeed += 4;
      updateHUD();
    }
  } else {
    // Deduct score if wrong metal tapped
    if (!tile.classList.contains('clicked')) {
      tile.classList.add('clicked', 'wrong');
      
      score -= 5; // Penalty for tapping non-iron metal
      updateHUD();
    }
  }
}

// Main game loop
function updateGameLoop(currentTime) {
  if (isGameOver) return;

  if (!lastTime) lastTime = currentTime;
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Continuously speeds up scrolling over time
  scrollSpeed += SPEED_ACCELERATION * deltaTime;

  //Moves rows up
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    row.y -= scrollSpeed * deltaTime;
    row.element.style.transform = `translateY(${row.y}px)`;

    //Check if row scrolled past top edge
    if (row.y <= -TILE_SIZE) {
      // Remove offscreen elements
      row.element.remove();
      rows.splice(i, 1);
    }
  }

  //New row at bottom of screen
  const lowestRow = rows[rows.length - 1];
  if (lowestRow && lowestRow.y <= BOARD_HEIGHT - TILE_SIZE) {
    const newY = lowestRow.y + TILE_SIZE;
    spawnRow(newY);
  }

  requestAnimationFrame(updateGameLoop);
}

// Game over screen
function endGame(reason) {
  isGameOver = true;
  if (timerInterval) clearInterval(timerInterval);

  // Check and update High Score
  let isNewHighScore = false;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('oreBuster_highScore', highScore);
    isNewHighScore = true;
  }

  //Remove score display
  if (scoreElement) scoreElement.remove();

  displayBox.innerHTML = `
    <div class="readyBox" style="height: 340px; top: 18%; padding: 15px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
      <h1 style="margin: 0; font-size: 1.8rem;">Game Over</h1>
      <p style="margin: 2px 0; font-size: 0.9rem;">${reason}</p>
      <div style="text-align: center;">
        <h2 style="margin: 4px 0; font-size: 1.2rem;">Final Score: ${score} ${isNewHighScore ? '<span style="color: #1b7e1b; font-size: 0.8rem;"><br>NEW HIGH SCORE!</span>' : ''}</h2>
        <h3 style="margin: 4px 0; font-size: 1rem;">High Score: ${highScore}</h3>
        <h3 style="margin: 4px 0; font-size: 1rem;">Iron Mined: ${ironCount}</h3>
      </div>
      <span style="text-decoration: none;">
        <div class="start" id="restart"><h2 style="color:white; margin: 0; font-size: 1.1rem;">Play Again</h2></div>
      </span>
    </div>
  `;
  //Restart button
  const restartBtn = document.getElementById('restart');
  if (restartBtn) {
    restartBtn.addEventListener('pointerdown', startGame);
  }
}

//Starting screen(upon loading page)
showStartScreen();