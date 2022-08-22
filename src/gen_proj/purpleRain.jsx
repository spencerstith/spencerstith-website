import Sketch from 'react-p5';

let drops;
let saved = false;

const setup = (p5, parentRef) => {
  p5.createCanvas(600, 600).parent(parentRef)
  //stroke(200, 0, 255);
  drops = [];
  let xVel = p5.random(-10, 10);
  for (let i = 0; i < 200; i++) {
    let size = p5.random(5);

    let drop = new Drop(
      new Particle(
        p5,
        p5.createVector(p5.random(p5.width), p5.random(p5.height)),
        p5.createVector(xVel, size * 2.5)
      ),
      size
    );
    drop.particle.setColor({ r: 200, g: 0, b: 200 });
    drops.push(drop);
  }
  p5.textSize(25);
  p5.textAlign(p5.CENTER, p5.CENTER);
}

const draw = (p5) => {
  p5.background(0);
  drops.forEach(d => {
    d.activate(p5);
  })
  p5.fill(255);
  p5.noStroke();
  p5.text("i miss you", p5.width * 0.75, p5.height * 0.25);
}

class Drop {
  constructor(particle, size) {
    this.particle = particle;
    this.size = size;
  }

  activate(p5) {
    if (this.particle.pos.y >= p5.height) {
      this.particle.pos.y = 0;
    }
    if (this.particle.pos.x >= p5.width) {
      this.particle.pos.x = 0;
    } else if (this.particle.pos.x <= 0) {
      this.particle.pos.x = p5.width;
    }

    p5.strokeWeight(this.size);
    //stroke(200, 0, 200);
    this.particle.show(p5);
    this.particle.update();
  }
}

class Particle {

  constructor(p5, pos = p5.createVector(0, 0, 0), vel = p5.createVector(0, 0, 0), acc = p5.createVector(0, 0, 0)) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
  }

  setColor(col) {
    this.color = col;
  }

  show(p5) {
    if (typeof this.color === 'object' && this.color !== 'null') {
      p5.stroke(this.color == undefined ? 255 : this.color.r, this.color.g, this.color.b);
    } else {
      p5.stroke(this.color == undefined ? 255 : this.color);
    }
    p5.point(this.pos.x, this.pos.y, this.pos.z);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
}

export default function PurpleRain() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}