function generateArray(rows, cols) {
  let array = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
}

class Board {
  constructor() {
    this.board = generateArray(8, 8);
    
    // White Pieces
    this.board[0][4] = new King(4, 0, false);
    this.board[0][3] = new Queen(3, 0, false);
    this.board[0][0] = new Rook(0, 0, false);
    this.board[0][1] = new Knight(1, 0, false);
    this.board[0][2] = new Bishop(2, 0, false);
    this.board[0][5] = new Bishop(5, 0, false);
    this.board[0][6] = new Knight(6, 0, false);
    this.board[0][7] = new Rook(7, 0, false);
    this.board[1][0] = new Pawn  (0, 1, false);
    this.board[1][1] = new Pawn  (1, 1, false);
    this.board[1][2] = new Pawn  (2, 1, false);
    this.board[1][3] = new Pawn  (3, 1, false);
    this.board[1][4] = new Pawn  (4, 1, false);
    this.board[1][5] = new Pawn  (5, 1, false);
    this.board[1][6] = new Pawn  (6, 1, false);
    this.board[1][7] = new Pawn  (7, 1, false);
    
    
    // White Pieces
    this.board[7][4] = new King  (4, 7, true);
    this.board[7][3] = new Queen (3, 7, true);
    this.board[7][0] = new Rook  (0, 7, true);
    this.board[7][1] = new Knight(1, 7, true);
    this.board[7][2] = new Bishop(2, 7, true);
    this.board[7][5] = new Bishop(5, 7, true);
    this.board[7][6] = new Knight(6, 7, true);
    this.board[7][7] = new Rook  (7, 7, true);
    this.board[6][0] = new Pawn  (0, 6, true);
    this.board[6][1] = new Pawn  (1, 6, true);
    this.board[6][2] = new Pawn  (2, 6, true);
    this.board[6][3] = new Pawn  (3, 6, true);
    this.board[6][4] = new Pawn  (4, 6, true);
    this.board[6][5] = new Pawn  (5, 6, true);
    this.board[6][6] = new Pawn  (6, 6, true);
    this.board[6][7] = new Pawn  (7, 6, true);
    this.prevs = [];
    
    this.turn = true;
  }
  
  show() {
    for (let i = 0; i < 8; i++) {
      let row = this.board[i];
      for (let j = 0; j < 8; j++) {
        let piece = row[j];
        stroke(255);
        strokeWeight(2);
        if (piece instanceof Piece) {
          piece.show();
        }
      }
    }
  }
  
  undo() {
    this.board = this.prevs.pop();
    this.turn = !this.turn;
  }
  
  move(start, end, piece) {
    this.prevs.push(this.copyBoard());
    
    this.board[end.y][end.x] = piece;
    this.board[start.y][start.x] = 0;
    print(end);
    piece.matrixPosition = end;
    piece.pixelPosition = p5.Vector.mult(end, tileSize);
    this.turn = !this.turn;
  }
  
  tryToMove() {
    let position = selectedPiece.pixelPosition;
    let x = round(position.x / tileSize);
    let y = round(position.y / tileSize);
    if (selectedPiece.canMoveTo(x, y) && x < 8 && x >= 0 && y < 8 && y >= 0) {
      if (check != -1) {
        let end = createVector(floor(mouseX / tileSize), floor(mouseY / tileSize));
        this.move(selectedPiece.matrixPosition, end, selectedPiece);
        isCheck();
        if (check == -1) {
          selectedPiece = undefined;
          return;
        } else {
          print("1"+this.turn)
          this.undo();
          print("2"+this.turn)
          this.turn = !this.turn;
        }
      } else {
      }
      let end = createVector(floor(mouseX / tileSize), floor(mouseY / tileSize));
      this.move(selectedPiece.matrixPosition, end, selectedPiece);
      isCheck();
      if (check != -1) {
        if ((check == 0 && this.turn == false) || (check == 1 && this.turn == true)) {
          this.undo();
        }
      }
    } else {
      selectedPiece.pixelPosition.x = selectedPiece.matrixPosition.x*tileSize;
      selectedPiece.pixelPosition.y = selectedPiece.matrixPosition.y*tileSize;
    }
    selectedPiece = undefined;
    isCheck();
  }
  
  copyBoard() {
    let originalBoard = [];
    for (let rowNum in board.board) {
      let row = [];
      for (let col in board.board[0]) {
        if (board.board[rowNum][col] instanceof Piece) {
          row.push(board.board[rowNum][col].copy());
        } else {
          row.push(0);
        }
      }
      originalBoard.push(row);
    }
    return originalBoard;
  }
}