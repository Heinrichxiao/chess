class Piece {
  constructor(x, y, isWhite) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize, y * tileSize);
    
    this.isWhite = isWhite;
  }
  
  copy() {
    let n = new (eval(this.constructor.name))(this.matrixPosition.x, this.matrixPosition.y, this.isWhite);
    n.pieceType = this.pieceType;
    if (this.hasMoved != undefined) {
      n.hasMoved = this.hasMoved;
    }
    return n;
  }
}

class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.pieceType = 'K';
    this.hasMoved = false;
  }
  
  show() {
    if (this.isWhite) {
      image(whitePieces[1], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    } else {
      image(blackPieces[1], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    }
  }
  
  canMoveTo(ex,ey) {
    if (ex > 7 || ex < 0 || ey > 7 || ey < 0) {
      return false;
    }
    if (board.board[ey][ex] != 0) {
      if (board.board[ey][ex].isWhite == this.isWhite) {
        return false;
      }
    }
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    let difference = p5.Vector.sub(createVector(ex, ey), createVector(sx, sy));
    // all correct differences
    let differences = [createVector(0, 1), createVector(1, 0), createVector(1, 1), createVector(0, -1), createVector(-1, 0), createVector(-1, -1), createVector(-1, 1), createVector(1, -1)];
    for (let d of differences) {
      if (d.x == difference.x && d.y == difference.y) {
        this.hasMoved = true;
        return true;
      }
    }
    if (this.hasMoved == false) {
      if (this.isWhite) {
        if (sx == 4 && sy == 7) {
          if (difference.x > 0) {
            if (board.board[7][7] != 0) {
              if (board.board[7][7].pieceType == 'R') {
                if (board.board[7][7].isWhite == this.isWhite) {
                  if (board.board[7][7].hasMoved == false) {
                    if (difference.y == 0 && difference.x == 2) {
                      if (board.board[7][5] == 0) {
                        if (board.board[7][6] == 0) {
                          board.board[7][7] = 0;
                          board.board[7][5] = new Rook(5, 7, this.isWhite);
                          board.board[7][5].hasMoved = true;
                          this.hasMoved = true;
                          return true;
                        }
                      }
                    }
                  }
                }
              }
            }
          } else if (difference.x < 0) {
            if (board.board[7][0] != 0) {
              if (board.board[7][0].pieceType == 'R') {
                if (board.board[7][0].isWhite == this.isWhite) {
                  if (board.board[7][0].hasMoved == false) {
                    if (difference.y == 0 && difference.x == -2) {
                      if (board.board[7][1] == 0) {
                        if (board.board[7][2] == 0) {
                          if (board.board[7][3] == 0) {
                            board.board[7][0] = 0;
                            board.board[7][3] = new Rook(3, 7, this.isWhite);
                            board.board[7][3].hasMoved = true;
                            this.hasMoved = true;
                            return true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else if (this.isWhite == false) {
        if (sx == 4 && sy == 0) {
          if (difference.x > 0) {
            if (board.board[0][7] != 0) {
              if (board.board[0][7].pieceType == 'R') {
                if (board.board[0][7].isWhite == this.isWhite) {
                  if (board.board[0][7].hasMoved == false) {
                    if (difference.y == 0 && difference.x == 2) {
                      if (board.board[0][5] == 0) {
                        if (board.board[0][6] == 0) {
                          board.board[0][7] = 0;
                          board.board[0][5] = new Rook(5, 0, this.isWhite);
                          board.board[0][5].hasMoved = true;
                          this.hasMoved = true;
                          return true;
                        }
                      }
                    }
                  }
                }
              }
            }
          } else if (difference.x < 0) {
            if (board.board[0][0] != 0) {
              if (board.board[0][0].pieceType == 'R') {
                if (board.board[0][0].isWhite == this.isWhite) {
                  if (board.board[0][0].hasMoved == false) {
                    if (difference.y == 0 && difference.x == -2) {
                      if (board.board[0][1] == 0) {
                        if (board.board[0][2] == 0) {
                          if (board.board[0][3] == 0) {
                            board.board[0][0] = 0;
                            board.board[0][3] = new Rook(3, 0, this.isWhite);
                            board.board[0][3].hasMoved = true;
                            this.hasMoved = true;
                            return true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }
  
  isCheck() {
    let x = this.matrixPosition.x;
    let y = this.matrixPosition.y;
    // Check for rooks
    for (let i = 1, piece = 0; piece == 0 && x + i <= 7; i++) {
      piece = board.board[y][x + i];
      if ((piece.pieceType == 'R' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    for (let i = -1, piece = 0; piece == 0 && x + i >= 0; i--) {
      piece = board.board[y][x + i];
      if ((piece.pieceType == 'R' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    for (let i = 1, piece = 0; piece == 0 && y + i <= 7; i++) {
      piece = board.board[y + i][x];
      if ((piece.pieceType == 'R' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    for (let i = -1, piece = 0; piece == 0 && y + i >= 0; i--) {
      piece = board.board[y + i][x];
      if ((piece.pieceType == 'R' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    
    // Checks for bishops
    for (let i = 1, piece = 0; piece == 0 && x + i <= 7 && y + i <= 7; i++) {
      piece = board.board[y + i][x + i];
      if ((piece.pieceType == 'B' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    for (let i = -1, piece = 0; piece == 0 && x + i >= 0 && y + i >= 0; i--) {
      piece = board.board[y + i][x + i];
      if ((piece.pieceType == 'B' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    for (let i = 1, piece = 0; piece == 0 && y + i <= 7 && x - i >= 0; i++) {
      piece = board.board[y + i][x - i];
      if ((piece.pieceType == 'B' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    for (let i = -1, piece = 0; piece == 0 && y + i >= 0 && x - i <= 7; i--) {
      piece = board.board[y + i][x - i];
      if ((piece.pieceType == 'B' || piece.pieceType == 'Q') && piece.isWhite != this.isWhite) {
        return true;
      }
    }
    // Check for knights
    let knightDifferences = [createVector(2, 1), createVector(2, -1), createVector(1, -2), createVector(-1, -2), createVector(-2, -1), createVector(-2, 1), createVector(-1, 2), createVector(1, 2)];
    for (let d of knightDifferences) {
      if (d.y + y >= 0 && d.y + y <= 7 && d.x + x >= 0 && d.x + x <= 7) {
        if (board.board[d.y + y][d.x + x].pieceType == 'N' && board.board[d.y + y][d.x + x].isWhite != this.isWhite) {
          return true;
        }
      }
    }
    
    // Check for pawns
    if (this.isWhite) {
      let pawnDifferences = [createVector(-1, -1), createVector(1, -1)];
      for (let d of pawnDifferences) {
        if (d.y + y >= 0 && d.y + y <= 7 && d.x + x >= 0 && d.x + x <= 7) {
          if (board.board[d.y + y][d.x + x].pieceType == 'P' && board.board[d.y + y][d.x + x].isWhite != this.isWhite) {
            return true;
          }
        }
      }
    } else {
      let pawnDifferences = [createVector(-1, 1), createVector(1, 1)];
      for (let d of pawnDifferences) {
        if (d.y + y >= 0 && d.y + y <= 7 && d.x + x >= 0 && d.x + x <= 7) {
          if (board.board[d.y + y][d.x + x].pieceType == 'P' && board.board[d.y + y][d.x + x].isWhite != this.isWhite) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.pieceType = 'Q';
  }
  
  show() {
    if (this.isWhite) {
      image(whitePieces[4], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    } else {
      image(blackPieces[4], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    }
  }
  
  canMoveTo(ex,ey) {
    if (ex > 7 || ex < 0 || ey > 7 || ey < 0) {
      return false;
    }
    if (board.board[ey][ex] != 0) {
      if (board.board[ey][ex].isWhite == this.isWhite) {
        return false;
      }
    }
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    let difference = p5.Vector.sub(createVector(ex, ey), createVector(sx, sy));
    if (difference.x == 0) {
      if (difference.y > 0) {
        for (let i = 1; i < difference.y; i++) {
          let scanningPos = createVector(sx, sy + i);
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      } else if (difference.y < 0) {
        for (let i = difference.y+1; i < 0; i++) {
          let scanningPos = createVector(sx, sy + i);
          console.log(scanningPos)
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      }
      return true;
    } 
    if (difference.y == 0) { 
      if (difference.x > 0) {
        for (let i = 1; i < difference.x; i++) {
          let scanningPos = createVector(sx + i, sy);
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      } else if (difference.x < 0) {
        for (let i = difference.x; i < -1; i++) {
          let scanningPos = createVector(sx + i, sy);
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      }
      return true;
    }
    if (difference.x == difference.y) {
      if (difference.x == 0) {
        return false;
      }
      if (difference.x > 0) {
        for (let i = 1; i < difference.x; i++) {
          let scan = createVector(sx + i, sy + i);
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      } else if (difference.x < 0) {
        for (let i = difference.x + 1; i < 0; i++) {
          let scan = createVector(sx + i, sy + i);
          
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      }
      return true;
    }
    if (difference.x == -difference.y) {
      if (difference.x == 0) {
        return false;
      }
      if (difference.x > 0) {
        for (let i = 1; i < difference.x; i++) {
          let scan = createVector(sx + i, sy - i);
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      } else if (difference.x < 0) {
        for (let i = difference.x + 1; i < 0; i++) {
          let scan = createVector(sx + i, sy - i);
          
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}
class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.pieceType = 'R';
    this.hasMoved = false;
  }
  
  show() {
    if (this.isWhite) {
      image(whitePieces[5], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    } else {
      image(blackPieces[5], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    }
  }
  
  canMoveTo(ex,ey) {
    if (ex > 7 || ex < 0 || ey > 7 || ey < 0) {
      return false;
    }
    if (board.board[ey][ex] != 0) {
      print(ey, ex)
      if (board.board[ey][ex].isWhite == this.isWhite) {
        return false;
      }
    }
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    let difference = p5.Vector.sub(createVector(ex, ey), createVector(sx, sy));
    if (difference.x == 0) {
      if (difference.y > 0) {
        for (let i = 1; i < difference.y; i++) {
          let scanningPos = createVector(sx, sy + i);
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      } else if (difference.y < 0) {
        for (let i = difference.y+1; i < 0; i++) {
          let scanningPos = createVector(sx, sy + i);
          console.log(scanningPos)
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      }
      return true;
    } 
    if (difference.y == 0) { 
      if (difference.x > 0) {
        for (let i = 1; i < difference.x; i++) {
          let scanningPos = createVector(sx + i, sy);
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      } else if (difference.x < 0) {
        for (let i = difference.x; i < -1; i++) {
          let scanningPos = createVector(sx + i, sy);
          if (board.board[scanningPos.y][scanningPos.x] != 0) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.pieceType = 'N';
  }
  
  show() {
    if (this.isWhite) {
      image(whitePieces[2], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    } else {
      image(blackPieces[2], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    }
  }
  
  canMoveTo(ex,ey) {
    if (ex > 7 || ex < 0 || ey > 7 || ey < 0) {
      return false;
    }
    if (board.board[ey][ex] != 0) {
      if (board.board[ey][ex].isWhite == this.isWhite) {
        return false;
      }
    }
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    let difference = p5.Vector.sub(createVector(ex, ey), createVector(sx, sy));
    // all correct differences
    let differences = [createVector(2, 1), createVector(2, -1), createVector(1, -2), createVector(-1, -2), createVector(-2, -1), createVector(-2, 1), createVector(-1, 2), createVector(1, 2)];
    for (let d of differences) {
      if (d.x == difference.x && d.y == difference.y) {
        return true;
      }
    }
    return false;
  }
  
  getMoves() {
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    // all correct differences
    let maybePossible = [createVector(2, 1), createVector(2, -1), createVector(1, -2), createVector(-1, -2), createVector(-2, -1), createVector(-2, 1), createVector(-1, 2), createVector(1, 2)];
    let possible = [];
    for (let d of maybePossible) {
      if (this.canMoveTo(d.x, d.y)) {
        possible.push(d);
      }
    }
    return possible;
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.pieceType = 'B';
  }
  
  show() {
    if (this.isWhite) {
      image(whitePieces[0], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    } else {
      image(blackPieces[0], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    }
  }
  
  canMoveTo(ex,ey) {
    if (board.board[ey][ex] != 0) {
      if (board.board[ey][ex].isWhite == this.isWhite) {
        return false;
      }
    }
    
    if (ex > 7 || ex < 0 || ey > 7 || ey < 0) {
      return false;
    }
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    let difference = p5.Vector.sub(createVector(ex, ey), createVector(sx, sy));
    if (difference.x == difference.y) {
      if (difference.x == 0) {
        return false;
      }
      if (difference.x > 0) {
        for (let i = 1; i < difference.x; i++) {
          let scan = createVector(sx + i, sy + i);
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      } else if (difference.x < 0) {
        for (let i = difference.x + 1; i < 0; i++) {
          let scan = createVector(sx + i, sy + i);
          
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      }
      return true;
    }
    if (difference.x == -difference.y) {
      if (difference.x == 0) {
        return false;
      }
      if (difference.x > 0) {
        for (let i = 1; i < difference.x; i++) {
          let scan = createVector(sx + i, sy - i);
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      } else if (difference.x < 0) {
        for (let i = difference.x + 1; i < 0; i++) {
          let scan = createVector(sx + i, sy - i);
          
          if (board.board[scan.y][scan.x] != 0) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  
  getMoves() {
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    // all correct differences
    let maybePossible = [createVector(1, 1), createVector(2, 2), createVector(3, 3), createVector(4, 4), createVector(5, 5), createVector(6, 6), createVector(7, 7), createVector(-1, -1), createVector(-2, -2), createVector(-3, -3), createVector(-4, -4), createVector(-5, -5), createVector(-6, -6), createVector(-7, -7), createVector(1, -1), createVector(2, -2), createVector(3, -3), createVector(4, -4), createVector(5, -5), createVector(6, -6), createVector(7, -7), createVector(-1, 1), createVector(-2, 2), createVector(-3, 3), createVector(-4, 4), createVector(-5, 5), createVector(-6, 6), createVector(-7, 7)];
    let possible = [];
    for (let d of maybePossible) {
      if (this.canMoveTo(d.x, d.y)) {
        possible.push(d);
      }
    }
    return possible;
  }
}
class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.pieceType = 'P';
  }
  
  show() {
    if (this.isWhite) {
      image(whitePieces[3], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    } else {
      image(blackPieces[3], this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
    }
  }
  
  canMoveTo(ex,ey) {
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    
    if (ex > 7 || ex < 0 || ey > 7 || ey < 0) {
      return false;
    }
    if (!this.isWhite) {
      if ((ex - 1 != sx) && (ex + 1 != sx) && ex != sx) {
        return false;
      }
      if (sy == ey) {
        return false;
      }
      if (sy == 1) {
        if (!(ey == 2 || ey == 3)) {
          return false;
        }
        if (ey == 2) {
          if (ex - 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
          if (ex + 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
        }
        if (board.board[sy + 1][sx] != 0) {
          return false;
        }
      } else {
        if (sy + 1 != ey) {
          return false;
        } else {
          if (ex - 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
          if (ex + 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
          if (board.board[sy + 1][sx] != 0) {
            return false;
          }
          
        }
      }
      return true;
    } else {
      if ((ex - 1 != sx) && (ex + 1 != sx) && ex != sx) {
        return false;
      }
      if (sy == ey) {
        return false;
      }
      if (sy == 6) {
        if (!(ey == 5 || ey == 4)) {
          return false;
        }
        if (ey == 5) {
          if (ex - 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
          if (ex + 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
        }
        if (board.board[sy - 1][sx] != 0) {
          return false;
        }
      } else {
        if (sy - 1 != ey) {
          return false;
        } else {
          if (ex - 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
          if (ex + 1 == sx) {
            if (board.board[ey][ex] != 0) {
              return true;
            } else {
              return false;
            }
          }
          if (board.board[sy - 1][sx] != 0) {
            return false;
          }
          
        }
      }
      return true;
    }
  }
  
  getMoves() {
    let sx = this.matrixPosition.x;
    let sy = this.matrixPosition.y;
    // all correct differences
    let maybePossible = [createVector()];
    let possible = [];
    for (let d of maybePossible) {
      if (this.canMoveTo(d.x, d.y)) {
        possible.push(d);
      }
    }
    return possible;
  }
}