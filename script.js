"use strict";

window.addEventListener("load", start);

let mines = 10;
let rows = 10;
let cols = 10;
let gameGrid = [];
let clickedTiles = 0;

function start() {
  console.log("Welcome to bomb cleaner");
  document.querySelector("#start-game").addEventListener("click", startGame);
}

function startGame() {
  console.log("Game has started");
  document.querySelector("#start-game").textContent = "RESTART GAME";
  createGrid(rows, cols);
}

function createGrid(rows, cols) {
  clickedTiles = 0;

  for (let row = 0; row < rows; row++) {
    gameGrid[row] = new Array(cols).fill(0);
  }

  let flattenedGrid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      flattenedGrid.push({ row: row, col: col, value: 0 });
    }
  }
  //fisher-yates-shuffle
  for (let i = 0; i < flattenedGrid.length - 1; i++) {
    const randomTile = Math.floor(Math.random() * (i + 1));
    [flattenedGrid[i], flattenedGrid[randomTile]] = [flattenedGrid[randomTile], flattenedGrid[i]];
  }
  console.log(flattenedGrid);

  for (let i = 0; i < mines; i++) {
    flattenedGrid[i].value = -1;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const flatGridIndex = flattenedGrid.find((gameTile) => gameTile.col === col && gameTile.row === row);
      gameGrid[row][col] = flatGridIndex.value;
    }
  }
  console.log(gameGrid);

  calculateAllBombCounts();
  renderGrid();
}

function renderGrid() {
  const container = document.querySelector("#game-container");
  container.innerHTML = "";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const gameTile = document.createElement("button");
      gameTile.dataset.row = row;
      gameTile.dataset.col = col;
      gameTile.textContent = " ";

      gameTile.addEventListener("click", () => handleClick(row, col));
      gameTile.addEventListener("contextmenu", function putFlag(i) {
        i.preventDefault();
        if (gameTile.textContent === "🚩") {
          gameTile.textContent = " ";
        } else if (["", "1", "2", "3", "4", "5"].includes(gameTile.textContent)) {
          return false;
        } else {
          gameTile.textContent = "🚩";
        }
        return false;
      });

      container.appendChild(gameTile);
    }
  }
}

// Gives a value to every tile once grid loads
function calculateAllBombCounts() {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let row = 0; row < gameGrid.length; row++) {
    for (let col = 0; col < gameGrid[row].length; col++) {
      if (gameGrid[row][col] === -1) {
        continue;
      }

      let mineCount = 0;

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < gameGrid.length && newCol >= 0 && newCol < gameGrid[0].length) {
          if (gameGrid[newRow][newCol] === -1) {
            mineCount++;
          }
        }
      }
      gameGrid[row][col] = mineCount;
    }
  }
}

// Checks tileValue, changes textContent and decides wether to call revealTilesAlgo... Not really a neighborAlgorithm anymore
function neighborAlgorithm(gameGrid, row, col) {
  const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
  const tileValue = gameGrid[row][col];
  console.log(`Mines around (${row}, ${col}): ${tileValue}`);

  if (tileValue === 0) {
    gameTile.textContent = "";
    revealTilesAlgo(row, col);
  } else {
    gameTile.textContent = tileValue;
    addClickedTiles(gameTile);
  }
}

// Clicks every neighbor tile, and repeats for every clicked tile that also has value 0. Flood fill algorithm using BFS.
function revealTilesAlgo(row, col) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const queue = [[row, col]]; // a Queue datastructure(Array that we use as a queue)
  const visited = new Set(); // a Set datastructure

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();

    if (
      //checks for already visited tiles
      currentRow < 0 ||
      currentRow >= gameGrid.length ||
      currentCol < 0 ||
      currentCol >= gameGrid[0].length ||
      visited.has(`${currentRow},${currentCol}`)
    ) {
      continue;
    }

    visited.add(`${currentRow},${currentCol}`);

    const gameTile = document.querySelector(`button[data-row='${currentRow}'][data-col='${currentCol}']`);
    const tileValue = gameGrid[currentRow][currentCol];

    if (tileValue === -1) {
      continue;
    }

    gameTile.disabled = true;
    if (tileValue > 0) {
      gameTile.textContent = tileValue;
      addClickedTiles(gameTile);
    } else {
      gameTile.textContent = "";
      addClickedTiles(gameTile);

      for (const [dr, dc] of directions) {
        const newRow = currentRow + dr;
        const newCol = currentCol + dc;
        queue.push([newRow, newCol]);
      }
    }
  }
}

function addClickedTiles(gameTile) {
  if (!gameTile.classList.contains("clicked")) {
    clickedTiles++;
    gameTile.classList.add("clicked");
  }
}

function handleClick(row, col) {
  const tileValue = gameGrid[row][col];
  const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);

  neighborAlgorithm(gameGrid, row, col);

  if (tileValue === -1) {
    gameLost();
  } else {
    gameTile.disabled = true;
    // gameTile.classList.add("clicked");
    addClickedTiles(gameTile);
    winCheck();
  }
}

function winCheck() {
  //totalTiles
  //clickedTiles
  // const remainingTiles = totalTiles - clickedTiles;
  console.log(clickedTiles);

  if (clickedTiles === 90) {
    gameWon();
  } else {
    return;
  }
}

function gameWon() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tileValue = gameGrid[row][col];
      const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
      if (tileValue === -1) {
        gameTile.textContent = "💣";
      } else {
        gameTile.disabled = true;
        gameTile.textContent = "";
      }
    }
  }
  console.log("You win!");
}

function gameLost() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tileValue = gameGrid[row][col];
      const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
      if (tileValue === -1) {
        gameTile.textContent = "💣";
      } else {
        gameTile.disabled = true;
        gameTile.textContent = "";
      }
    }
  }
  console.log("You lost!");
}
