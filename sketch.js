let board;
let tileSize;
let whitePieces = [];
let blackPieces = [];
let selectedPiece;
let canvas;
let check = -1;
let bg;

function preload() {
  let pieces = ["b", "k", "n", "p", "q", "r"];
  for (let piece of pieces) {
    whitePieces.push(loadImage(`images/Chess_${piece}lt60.png`));
    blackPieces.push(loadImage(`images/Chess_${piece}dt60.png`));
  }
  bg = loadImage("images/board.png");
}

function setup() {
  let canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight;
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.style('margin', 'auto');
  tileSize = width / 8;
  board = new Board();
}

function draw() {
  background(bg);
  board.show();
  if (selectedPiece) {
    let mousePosition = createVector(mouseX - (tileSize / 2), mouseY - (tileSize / 2));
    selectedPiece.pixelPosition = mousePosition;
  }
  if (check == 1) {
    noStroke();
    textSize(128);
    textAlign(CENTER);
    fill(0);
    text('Check!', width / 2, height / 2);
  }
  if (check == 0) {
    noStroke();
    textSize(128);
    textAlign(CENTER);
    fill(255);
    text('Check!', width / 2, height / 2);
  }
}

function mousePressed() {
  let x = floor(mouseX / tileSize);
  let y = floor(mouseY / tileSize);
  if (x < 8 && x >= 0 && y < 8 && y >= 0) {
    let piece = board.board[y][x];
    if (piece && piece.isWhite == board.
        turn) {
      piece.pixelPosition = createVector(mouseX - (tileSize / 2), mouseY - (tileSize / 2));
      selectedPiece = piece;
    }
  }
}

function isCheck() {
  check = -1;
  checkChecks:
  for (let i in board.board) {
    let row = board.board[i];
    for (let j in board.board) {
      let piece = row[j];
      if (piece.pieceType == 'K') {
        let isCheck = piece.isCheck();
        if (isCheck) {
          if (piece.isWhite) {
            check = 0;
          } else if (piece.isWhite != true) {
            check = 1;
          }
          break checkChecks;
        }
      }
    }
  }
}

function mouseReleased() {
  if (selectedPiece) {
    board.tryToMove();
  }
}