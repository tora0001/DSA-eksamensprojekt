"use strict";

window.addEventListener("load", start);
let mines = 9;
function start() {
  console.log("Welcome to bomb cleaner");
  document.querySelector("#start-game").addEventListener("click", startGame);
  createGrid(8, 8);
}

function startGame() {
  console.log("Game has started");
  document.querySelector("#start-game").remove();
}

function createGrid(rows, cols) {
  let gameGrid = [];

  for (let i = 0; i < rows; i++) {
    gameGrid[i] = new Array(cols).fill(0);
  }

  let flattenedGrid = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      flattenedGrid.push({ row: r, col: c, value: 0 });
    }
  }

  for (let i = 0; i < flattenedGrid.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [flattenedGrid[i], flattenedGrid[j]] = [flattenedGrid[j], flattenedGrid[i]];
  }
  console.log(flattenedGrid);

  for (let i = 0; i < mines; i++) {
    flattenedGrid[i].value = -1;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const flatGridIndex = flattenedGrid.find((element) => element.col === c && element.row === r);
      gameGrid[r][c] = flatGridIndex.value;
    }
  }
  console.log(gameGrid);
}

// function yatesAlgo(array) {
//   for (let i = 0; i < array.length - 1; i++) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }

//   console.log(array);
// }

function placeMines() {}

// function neighborAlgorithm(gameGrid, row, col)
//   // const directions = [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1];
//   // for (let r = 0; r < rows; r++) {
//   //   for (let c = 0; r < cols; c++)
//   // }

function registerClick() {
  winCondition();
  lossCondition();
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
