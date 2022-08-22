import Sketch from 'react-p5';
import { fromAngle } from './helpers';

let N = 0;
let total = 200;
let r;
let delta;

const setup = (p5, parentRef) => {
  p5.createCanvas(800, 800).parent(parentRef)
  r = p5.width / 2 - 16;
  delta = p5.TWO_PI / total;

  p5.noFill();
  p5.stroke(255);
}

const draw = (p5) => {
  N += 0.01;
  p5.background(0);
  p5.translate(p5.width / 2, p5.height / 2);
  p5.circle(0, 0, r * 2);

  for (let i = 0; i < total; i++) {
    let temp = getLocation(p5, i * delta);
    p5.circle(temp.x, temp.y, 2);
    let next = getLocation(p5, getNextAngle(i));
    p5.line(temp.x, temp.y, next.x, next.y);
  }
}

function getNextAngle(input) {
  return (input * N) % total * delta;
}

function getLocation(p5, angle) {
  let ret = fromAngle(p5, angle + p5.PI);
  ret.setMag(r);
  return ret;
}

export default function TTables() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}