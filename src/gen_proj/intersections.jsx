import Sketch from 'react-p5';
import { fromAngle } from './helpers';

let ver;
let hor;
let pg;

const setup = (p5, parentRef) => {
  p5.createCanvas(600, 600).parent(parentRef);
  let segments = 7;
  let dist = p5.width / (segments + 1);
  ver = [];
  hor = [];
  for (let i = 0; i < segments; i++) {
    let begin = dist * 3 / 2;
    let loc = begin + dist * i;
    let rate = 0.09 / segments * (i + 1);
    ver.push(new Rotator(p5, p5.createVector(loc, dist / 2), rate, 0.75 * dist, true));
    hor.push(new Rotator(p5, p5.createVector(dist / 2, loc), rate, 0.75 * dist, false));
  }
  pg = p5.createGraphics(600, 600);
}

const draw = (p5) => {
   p5.background(0);
   p5.stroke(255, 100);

  // Draw all lines
  for (let i = 0; i < ver.length; i++) {
    ver[i].show(p5);
    hor[i].show(p5);
    ver[i].update();
    hor[i].update();
  }
  pg.stroke(255);

  for (let i = 0; i < ver.length; i++) {
    for (let j = 0; j < hor.length; j++) {
      let x = ver[i].pos.x + ver[i].pointer.x;
      let y = hor[j].pos.y + hor[j].pointer.y;
      pg.point(x, y);
    }
  }
  p5.image(pg, 0, 0);
  if (p5.frameCount == 500) {
    p5.save('test.png');
  }
}

class Rotator {
  constructor(p5, pos, rate, radius, isVertical) {
    this.pos = pos;
    this.rate = rate;
    this.radius = radius;
    this.isVertical = isVertical;
    this.pointer = fromAngle(p5, 0.0);
    this.pointer.setMag(radius / 2);
  }

  update() {
    this.pointer.rotate(this.rate);
  }

  show(p5) {
    p5.noFill();
     p5.stroke(255);
    p5.circle(this.pos.x, this.pos.y, this.radius);

    p5.push();
    p5.translate(this.pos.x, this.pos.y);
    p5.line(0, 0, this.pointer.x, this.pointer.y);
    p5.pop();
     p5.stroke(255, 100);
    if (this.isVertical) {
      p5.line(this.pos.x + this.pointer.x, 0, this.pos.x + this.pointer.x, p5.height);
    } else {
      p5.line(0, this.pos.y + this.pointer.y, p5.width, this.pos.y + this.pointer.y);
    }
  }
}

export default function Intersections() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}