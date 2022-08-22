import Sketch from 'react-p5';
import { fromAngle } from './helpers';

let flowfield, particles;

let debug = false;

const setup = (p5, parentRef) => {
  p5.createCanvas(600, 600).parent(parentRef);

  flowfield = new FlowField(p5, 10);
  flowfield.update(p5);

  particles = [];
  for (let i = 0; i < 5000; i++) {
    let start = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    particles.push(new Particle(p5, start, p5.random(2, 8)));
  }
  p5.background(255);
}

const draw = (p5) => {
  flowfield.update(p5);
  particles.forEach(p => {
    p.follow(p5, flowfield);
    p.run(p5);
  });
}

class FlowField {
  constructor(p5, res) {
    this.scl = res;
    this.cols = p5.floor(p5.width / res) + 1;
    this.rows = p5.floor(p5.height / res) + 1;
    this.vectors = Array(this.cols * this.rows);
    this.inc = 0.1;
    this.zoff = 0;
  }

  update(p5) {
    let xoff = 0;
    for (let y = 0; y < this.rows; y++) {
      let yoff = 0;
      for (let x = 0; x < this.cols; x++) {
        let angle = p5.noise(xoff, yoff, this.zoff) * p5.TWO_PI * 4;

        let v = fromAngle(p5, angle);
        v.setMag(1);
        let index = x + y * this.cols;
        this.vectors[index] = v;

        xoff += this.inc;
      }
      yoff += this.inc;
    }
    this.zoff += 0.004;
  }

  display(p5) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let v = this.vectors[index];

        p5.stroke(0, 0, 0, 100);
        p5.strokeWeight(0.5);
        p5.push();
        p5.translate(x * this.scl, y * this.scl);
        p5.rotate(v.heading());
        p5.line(0, 0, this.scl, 0);
        p5.pop();
      }
    }
  }
}

class Particle {
  constructor(p5, start, maxSpeed) {
    this.maxSpeed = maxSpeed;
    this.pos = start;
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.previousPos = this.pos.copy();
  }

  run(p5) {
    this.update();
    this.edges(p5);
    this.show(p5);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show(p5) {
    p5.stroke(0, 5);
    p5.strokeWeight(1);
    p5.line(this.pos.x, this.pos.y, this.previousPos.x, this.previousPos.y);
    //p5.point(pos.x, pos.y);
    this.updatePreviousPos();
  }

  edges(p5) {
    if (this.pos.x > p5.width) {
      this.pos.x = 0;
      this.updatePreviousPos();
    }
    if (this.pos.x < 0) {
      this.pos.x = p5.width;
      this.updatePreviousPos();
    }
    if (this.pos.y > p5.height) {
      this.pos.y = 0;
      this.updatePreviousPos();
    }
    if (this.pos.y < 0) {
      this.pos.y = p5.height;
      this.updatePreviousPos();
    }
  }

  updatePreviousPos() {
    this.previousPos.x = this.pos.x;
    this.previousPos.y = this.pos.y;
  }

  follow(p5, flowfield) {
    let x = p5.floor(this.pos.x / flowfield.scl);
    let y = p5.floor(this.pos.y / flowfield.scl);
    let index = x + y * flowfield.cols;

    let force = flowfield.vectors[index];
    this.applyForce(force);
  }
}

export default function Hair() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}