window.addEventListener("load", start);

function start() {
  console.log("Welcome to Jorden er giftig i Gaza-striben");
  document.querySelector("#start-game").addEventListener("click", startGame);
}

function startGame() {
  console.log("Game has started");
  document.querySelector("#start-game").remove();
}

function createGrid() {}

function placeMines() {} //*fisher algorithm

function neighborAlgorithm() {}

function revealCell() {}

function winCondition() {}

function lossCondition() {}

// Load spillet med grid
// Randomize bomber
// Afgør tal ift. bomber

//Når felt trykkes på, tjek hvilket felt det er.
