import Sketch from 'react-p5';
import { fromAngle } from './helpers';

let center, left, right;

const setup = (p5, parentRef) => {
  p5.createCanvas(600, 600).parent(parentRef);
  p5.rectMode(p5.CENTER);
  center = new Group(p5, p5.createVector(300, 500), 2000, 5);
  left = new Group(p5, p5.createVector(150, 500), 1000, 3);
  right = new Group(p5, p5.createVector(450, 500), 1000, 3);
}

const draw = (p5) => {
  p5.background(0);
  center.show(p5);
  left.show(p5);
  right.show(p5);
  p5.stroke(255);
  p5.line(0, 510, p5.width, 510);
}

class Group {
  constructor(p5, loc, number, multi) {
    this.loc = loc;
    this.number = number;
    this.parts = [];
    for (let i = 0; i < number; i++) {
      this.parts[i] = new Particle(p5, p5.createVector(loc.x, loc.y), multi);
    }
  }

  show(p5) {
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].show(p5);
    }
  }
}

class Particle {
  constructor(p5, pos, multi) {
    this.pos = pos;
    this.multi = multi;
    this.original = p5.createVector(pos.x, pos.y);
    this.construct(p5);
    this.acc = p5.createVector(0, 0.05).mult(multi);
    this.size = p5.random(3);
  }

  show(p5) {
    p5.fill('#BEF0F5');
    p5.noStroke();
    if (this.pos.y > 500) {
      this.construct(p5);
    }
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    p5.rect(this.pos.x, this.pos.y, this.size, this.size);
  }

  construct(p5) {
    this.pos = p5.createVector(this.original.x, this.original.y);
    this.angle = p5.random(-p5.QUARTER_PI - p5.HALF_PI + p5.PI / 4.5, -p5.QUARTER_PI - p5.PI / 4.5);
    this.vel = fromAngle(p5, this.angle).mult(p5.random(this.multi * 2, this.multi * 3));
  }
}

export default function Fountain() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}