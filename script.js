"use strict";

window.addEventListener("load", start);

let mines = 15;
let rows = 10;
let cols = 10;
let gameGrid = [];

function start() {
  console.log("Welcome to bomb cleaner");
  document.querySelector("#start-game").addEventListener("click", startGame);
}

function startGame() {
  console.log("Game has started");
  document.querySelector("#start-game").remove();
  createGrid(rows, cols);
}

function createGrid(rows, cols) {
  for (let row = 0; row < rows; row++) {
    gameGrid[row] = new Array(cols).fill(0);
  }

  let flattenedGrid = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      flattenedGrid.push({ row: row, col: col, value: 0 });
    }
  }

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

  renderGrid();
}

function renderGrid() {
  const container = document.querySelector("#game-container");

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const gameTile = document.createElement("button");
      gameTile.dataset.row = row;
      gameTile.dataset.col = col;
      gameTile.textContent = "";

      gameTile.addEventListener("click", () => handleClick(row, col));

      container.appendChild(gameTile);
    }
  }
}

function neighborAlgorithm(gameGrid, row, col) {
  const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);

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

  console.log(`Mines around (${row}, ${col}): ${mineCount}`);

  if (mineCount == 0) {
    gameTile.textContent = "";
  } else {
    gameTile.textContent = mineCount;
  }
}

function handleClick(row, col) {
  const tileValue = gameGrid[row][col];
  const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);

  neighborAlgorithm(gameGrid, row, col);

  console.log(gameTile);

  if (tileValue === -1) {
    gameLost();
  } else {
    gameTile.disabled = true;
  }
}

function winCheck() {
  const remainingTiles = something;

  if (remainingTiles == mines) {
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
      }
    }
  }
  console.log("You lost the game!");
}
