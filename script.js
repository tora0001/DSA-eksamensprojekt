"use strict";

window.addEventListener("load", start);

let mines = 10;
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

// function yatesAlgo(array) {
//   for (let i = 0; i < array.length - 1; i++) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }

//   console.log(array);
// }

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

// function neighborAlgorithm(gameGrid, row, col)
//   // const directions = [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1];
//   // for (let r = 0; r < rows; r++) {
//   //   for (let c = 0; r < cols; c++)
//   // }

function handleClick(row, col) {
  const tileValue = gameGrid[row][col];
  const gameTile = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);

  if (tileValue === -1) {
    gameTile.textContent = "💣";
    gameLost();
  } else {
    gameTile.textContent = tileValue === 0 ? "" : tileValue;
    gameTile.disabled = true;
  }
}

function revealCell() {}

function winCondition() {
  if (remainingTiles == mines) {
    gameWon();
  } else {
    return;
  }
}

function lossCondition() {
  if (clickedTile[i][j] == -1) {
    gameLost();
  } else {
    return;
  }
}

function gameWon() {
  console.log("You win!");
}

function gameLost() {
  console.log("You lost the game!");
}

// Load spillet med grid
// Randomize bomber
// Afgør tal ift. bomber
// Når felt trykkes på, tjek hvilket felt det er.
