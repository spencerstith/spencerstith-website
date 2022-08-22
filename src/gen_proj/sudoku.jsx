import Sketch from 'react-p5';

let board;
let cp;
let forwards;

const setup = (p5, parentRef) => {
  p5.createCanvas(600, 600).parent(parentRef);
  board = new Board(p5.width, p5.height, 2, 2);
  let values = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]

  ];
  let cells = [];
  for (let i = 0; i < values.length; i++) {
    let row = [];
    for (let j = 0; j < values[i].length; j++) {
      row.push(new Cell(
        0,
        values[i][j],
        values[i][j] ? true : false
      ))
    }
    cells.push(row);
  }
  board.populate(cells, true);
  p5.fill(255);
   p5.stroke(255);
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.textSize(30);

  cp = { i: 0, j: 0 };
  forwards = true;
}

const draw = (p5) => {
  // Finds the next position, either next or previous. Accounts for multiple permanent tiles in a row.
  while (board.cells[cp.i][cp.j].tf) {
    if (forwards) {
      cp = board.getNextPosition(cp.i, cp.j);
    } else {
      cp = board.getPreviousPosition(cp.i, cp.j);
    }
  }

  /**
   * Enter a while loop to continuously increase the tile's value until we either:
   * - Get to a maximum value (10 is out of bounds)
   * - The current number in the tile is valid
   * 
   * If value is at max value
   *      Reset current value to 0
   *      Make current position the previous available spot
   * If valid
   *      Make current position the next available spot
   */
  while (true) {
    board.cells[cp.i][cp.j].value++;
    if (board.cells[cp.i][cp.j].value >= 10) {
      board.cells[cp.i][cp.j].value = 0;
      cp = board.getPreviousPosition(cp.i, cp.j);
      forwards = false;
      break;
    }

    if (isValidAtPosition(cp.i, cp.j)) {
      cp = board.getNextPosition(cp.i, cp.j);
      forwards = true;
      break;
    }
  }
  // We are at the end of the board. Stop and finish program
  if (cp.i == 9 && cp.j == 0 && isValidAtPosition(8, 8)) {
    p5.noLoop();
  }
   p5.background(0);
  board.show(p5);

}

function isValidAtPosition(i, j) {
  return isValidRow(i) && isValidColumn(j) && isValidSquare(i, j);
}

function isValidRow(row) {
  let checked = [];
  for (let j = 0; j < board.cells[row].length; j++) {
    if (board.cells[row][j].value != 0) {
      if (checked.includes(board.cells[row][j].value)) {
        return false;
      } else {
        checked.push(board.cells[row][j].value);
      }
    }
  }
  return true;
}

function isValidColumn(col) {
  let checked = [];
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i][col].value != 0) {
      if (checked.includes(board.cells[i][col].value)) {
        return false;
      } else {
        checked.push(board.cells[i][col].value);
      }
    }
  }
  return true;
}

function isValidSquare(i, j) {
  let horizontalSquare = Math.floor(j / 3);
  let verticalSquare = Math.floor(i / 3);

  let startI = verticalSquare * 3;
  let startJ = horizontalSquare * 3;

  let checked = [];
  for (let m = 0; m < 3; m++) {
    for (let n = 0; n < 3; n++) {
      if (board.cells[startI + m][startJ + n].value != 0) {
        if (checked.includes(board.cells[startI + m][startJ + n].value)) {
          return false;
        } else {
          checked.push(board.cells[startI + m][startJ + n].value);
        }
      }
    }
  }
  return true;
}

class Board {
  constructor(width, height, rows, cols, cells = []) {
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.cells = cells;
    this.colScale = width / cols;
    this.rowScale = height / rows;
  }

  populate(cells, forceDimensions = false) {
    this.cells = cells;
    if (forceDimensions) {
      this.rows = cells.length;
      this.cols = cells[0].length;
      this.colScale = this.width / this.cols;
      this.rowScale = this.height / this.rows;
    }
  }

  show(p5) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Cells display
        if (this.cells[i][j].value) {
          p5.text(this.cells[i][j].value, j * this.colScale + this.colScale * 0.5, i * this.rowScale + this.rowScale * 0.5);
        }
        // Vertical line diplay
        p5.line(j * this.colScale, 0, j * this.colScale, p5.height);
        // Horizontal line display
        p5.line(0, i * this.rowScale, p5.width, i * this.rowScale);
      }
    }
  }

  getNextPosition(i, j) {
    if (j == this.cols - 1) return {
      i: i + 1,
      j: 0
    };
    return {
      i: i,
      j: j + 1
    }
  }

  getPreviousPosition(i, j) {
    if (j == 0) return {
      i: i - 1,
      j: this.cols - 1
    };
    return {
      i: i,
      j: j - 1
    }
  }
}

class Cell {
  constructor(fill, value, tf = false) {
    this.fill = fill;
    this.value = value;
    this.tf = tf;
  }
}

export default function Sudoku() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}