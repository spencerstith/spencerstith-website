import Sketch from 'react-p5';

let size = 500;
let tileSize = size / 25;
let totalTiles = size / tileSize;
let board;
let player;
let direction;
let hasFruit, isAlive;

const setup = (p5, parentRef) => {
  p5.createCanvas(500, 500).parent(parentRef);
  initPlayer();
  initBoard(p5);
  p5.frameRate(10);
  direction = 1;
  hasFruit = false;
  isAlive = true;
}

const draw = (p5) => {
   p5.background(0);
  updatePlayer();
  drawBoard(p5);
}

function updatePlayer() {
  //Update the head's location with a deep copy
  let xVal = player[0][0];
  let yVal = player[0][1];
  let newLocation = [xVal, yVal];
  switch (direction) {
    case 1:
      newLocation[1] -= 1;
      break;
    case 2:
      newLocation[0] += 1;
      break;
    case 3:
      newLocation[1] += 1;
      break;
    case 4:
      newLocation[0] -= 1;
      break;
  }

  //Move everything into the last tile's position
  for (let i = 0; i < player.length; i++) {
    let current = player[i];
    player[i] = newLocation;
    newLocation = current;
  }
  //Add on a new block if head got the fruit
  if (hasFruit) {
    player.push(newLocation);
    hasFruit = false;
  }

  //Check for being out of bounds
  let xCoord = player[0][0];
  let yCoord = player[0][1];
  if (xCoord < 0 || xCoord >= totalTiles || yCoord < 0 || yCoord >= totalTiles) {
    isAlive = false;
  }

  //Check to see if he's eating himself
  for (let i = 1; i < player.length; i++) {
    if (player[0][0] == player[i][0] && player[0][1] == player[i][1]) {
      isAlive = false;
    }
  }
}

function initPlayer() {
  player = [];
  //Add the initial player location
  let half = parseInt(totalTiles / 2);
  let initialCoords = [half, half];
  let daBut = [half + 1, half];
  player.push(initialCoords);
  player.push(daBut);
}

function initBoard(p5) {
  //New set of tiles
  board = [];
  //Fill board with empty tiles
  for (let i = 0; i < totalTiles; i++) {
    let temp = [];
    for (let j = 0; j < totalTiles; j++) {
      temp.push(new Tile(i, j));
    }
    board.push(temp);
  }
  //Randomly placeFruit
  board[p5.int(p5.random(totalTiles))][p5.int(p5.random(totalTiles))].placeFruit();
}

function drawBoard(p5) {
  if (isAlive) {
    //Place all player locations on board
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].removePlayer();
      }
    }
    for (let i = 0; i < player.length; i++) {
      let x = player[i][0];
      let y = player[i][1];
      board[x][y].placePlayer();
    }
    //Go through all tiles and color correctly
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].drawTile(p5);
        //Also see if the snake has eaten the fruit
        if (board[i][j].hasFruit && player[0][0] == i && player[0][1] == j) {
          hasFruit = true;
          board[i][j].removeFruit();
          //Have to make sure the fruit doesn't place underneath the snake
          let xF = p5.int(p5.random(totalTiles));
          let yF = p5.int(p5.random(totalTiles));
          while (onSnake(xF, yF)) {
            xF = p5.int(p5.random(totalTiles));
            yF = p5.int(p5.random(totalTiles));
          }
          board[xF][xF].placeFruit();
        }
      }
    }
  } else {
    gameOver(p5);
  }
}

function onSnake(x, y) {
  let ontop = false;
  for (let i = 0; i < player.length; i++) {
    if (player[i][0] == x && player[i][1] == y) {
      ontop = true;
    }
  }
  return ontop;
}

function gameOver(p5) {
  // p5.background(0);
  p5.fill(255);
  p5.textSize(20);
  p5.text("you died", 200, 200);
}

const keyPressed = (p5) => {
  switch (p5.key) {
    case 'a':
      direction = 4;
      break;
    case 's':
      direction = 3;
      break;
    case 'd':
      direction = 2;
      break;
    case 'w':
      direction = 1;
      break;
  }
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hasPlayer = false;
    this.hasFruit = false;
  }

  drawTile(p5) {
    if (this.hasPlayer) {
      p5.fill(255);
    } else if (this.hasFruit) {
      p5.fill(15, 65, 175);
    } else {
      p5.fill(0);
    }
    let tileX = p5.map(this.x, 0, totalTiles, 0, p5.width);
    let tileY = p5.map(this.y, 0, totalTiles, 0, p5.height);
    p5.rect(tileX, tileY, tileSize, tileSize);
  }

  placePlayer() {
    this.hasPlayer = true;
  }

  removePlayer() {
    this.hasPlayer = false;
  }

  placeFruit() {
    this.hasFruit = true;
  }

  removeFruit() {
    this.hasFruit = false;
  }
}

export default function Snake() {
  return (
    <Sketch setup={setup} draw={draw} keyPressed={keyPressed}/>
  );
}