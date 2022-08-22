import Sketch from 'react-p5';

const cellSize = 15;
const cellCount = 40;
const cells = [];
const cellStack = [];
let finished = false;
const solutionStack = [];
let solutionFound = false;

const setup = (p5, parentRef) => {
  p5.createCanvas(601, 601).parent(parentRef);
  for (let i = 0; i < cellCount; i++) {
    const row = [];
    for (let j = 0; j < cellCount; j++) {
      row.push(new Cell(i, j));
    }
    cells.push(row);
  }

  // Create openings for beginning and end
  cells[0][0].walls = {
    top: false,
    right: true,
    bottom: true,
    left: false
  };

  cells[cellCount - 1][cellCount - 1].walls = {
    top: true,
    right: false,
    bottom: false,
    left: true
  };

  // We start out in the top right, so visit there first
  cells[0][0].visited = true;
  cellStack.push(cells[0][0]);
}

const draw = (p5) => {
  p5.background(0);
  cells.forEach(row => {
    row.forEach(cell => {
      cell.show(p5);
    })
  });
  if (!finished) {
    for (let i = 0; i < 10; i++) {
      stepAlgorithm(p5);
    }
  } else {
    drawSolutionStack(p5);
    p5.noLoop();
  }
}

function drawSolutionStack(p5) {
  p5.stroke(255, 255, 0);
  for (let i = 0; i < solutionStack.length - 1; i++) {
    const x1 = solutionStack[i].col * cellSize + cellSize * 0.5;
    const y1 = solutionStack[i].row * cellSize + cellSize * 0.5;
    const x2 = solutionStack[i + 1].col * cellSize + cellSize * 0.5;
    const y2 = solutionStack[i + 1].row * cellSize + cellSize * 0.5;
    p5.line(x1, y1, x2, y2);
  }
}

function getNeighbors(current) {
  const row = current.row;
  const col = current.col;
  const neighbors = [];
  // Top
  if (row > 0 && !cells[row - 1][col].visited) {
    neighbors.push(cells[row - 1][col]);
  }
  // Right
  if (col < cellCount - 1 && !cells[row][col + 1].visited) {
    neighbors.push(cells[row][col + 1]);
  }
  // Bottom
  if (row < cellCount - 1 && !cells[row + 1][col].visited) {
    neighbors.push(cells[row + 1][col]);
  }
  // Left
  if (col > 0 && !cells[row][col - 1].visited) {
    neighbors.push(cells[row][col - 1]);
  }
  return neighbors;
}

const removeWalls = (current, next) => {
  // Are they horizontal or vertical?
  if (current.row == next.row) {
    // Is current on the left or right?
    if (current.col < next.col) {
      current.walls.right = false;
      next.walls.left = false;
    } else {
      current.walls.left = false;
      next.walls.right = false;
    }
  } else {
    // Is current on the top or bottom?
    if (current.row < next.row) {
      current.walls.bottom = false;
      next.walls.top = false;
    } else {
      current.walls.top = false;
      next.walls.bottom = false;
    }
  }

}

const stepAlgorithm = (p5) => {
  let done = false;
  if (cellStack.length != 0) {
    const current = cellStack.pop();

    // Create stack for solution to be shown
    if (current.row == cellCount - 1 && current.col == cellCount - 1 && !solutionFound) {
      solutionFound = true;
      cellStack.forEach(c => {
        solutionStack.push({
          row: c.row,
          col: c.col
        });
      })
    }

    const neighbors = getNeighbors(current);
    if (neighbors.length > 0) {
      cellStack.push(current);
      const next = neighbors[Math.floor(p5.random(neighbors.length))];
      done = true;

      // Draw current cell
      p5.fill(255);
      p5.rect(next.col * cellSize, next.row * cellSize, cellSize, cellSize);

      removeWalls(current, next);
      next.visited = true;
      cellStack.push(next);
    }
    if (!done) {
      p5.noStroke();
      p5.fill(255);
      p5.rect(current.i * cellSize, current.j * cellSize, cellSize, cellSize);
    }
  } else {
    finished = true;
  }

}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
  }

  show(p5) {
    p5.stroke(255);
    p5.strokeWeight(1);
    const x = cellSize * this.col;
    const y = cellSize * this.row;
    if (this.walls.top) {
      p5.line(x, y, x + cellSize, y);
    }
    if (this.walls.right) {
      p5.line(x + cellSize, y, x + cellSize, y + cellSize);
    }
    if (this.walls.bottom) {
      p5.line(x + cellSize, y + cellSize, x, y + cellSize);
    }
    if (this.walls.left) {
      p5.line(x, y + cellSize, x, y);
    }

    if (this.visited) {
      p5.fill(255, 0, 255, 100);
      p5.noStroke();
      p5.rect(x, y, cellSize, cellSize);
    }
  }
}

export default function Maze() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}