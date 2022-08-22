import Sketch from 'react-p5';

let left;
let right;
let convergence = 0.5;

const setup = (p5, parentRef) => {
  p5.createCanvas(1200, 600).parent(parentRef);
  left = new Cluster(p5, 300, 150, false);
  right = new Cluster(p5, 900, 150, true);
}

const draw = (p5) => {
   p5.background(0);
   p5.strokeWeight(5);
  left.step(p5);
  right.step(p5);

}

class Cluster {
  constructor(p5, xCenter, pCount, chaos) {
    this.xCenter = xCenter;
    this.chaos = chaos;
    this.particles = [];
    for (let i = 0; i < pCount; i++) {
      let radius = chaos ? p5.random(175, 300) : 250;
      let amplitude = chaos ? p5.random(5, 50) : 25
      let vel = chaos ? p5.random(0.005, 0.05) : 0.02;

      let red = chaos ? p5.random(150, 255) : p5.random(200, 255);
      let green = chaos ? p5.random(50, 250) : p5.random(100, 200);
      let blue = chaos ? p5.random(0, 150) : p5.random(0, 100);

      this.particles.push(new Particle(p5, radius, amplitude, vel, i * p5.TWO_PI / pCount, {
        r: red,
        g: green,
        b: blue
      }));
    }
  }

  step(p5) {
    this.particles.forEach(p => {
      p5.push();
      p5.translate(this.xCenter, p5.height * 0.5);
      p.update(p5);
      p.show(p5);
      p5.pop();
    })
  }
}

class Particle {
  constructor(p5, radius, amplitude, vel, rotation, color) {
    this.radius = radius;
    this.amplitude = amplitude;
    this.vel = vel;
    this.rotation = rotation;
    this.angle = 0;
    this.wave = p5.random(p5.TWO_PI);
    this.color = color;
  }

  update(p5) {
    this.angle += this.vel;
    this.wave += this.vel * 5;
    this.rod = this.radius + this.amplitude * p5.sin(this.wave);


    // this.radius -= convergence;
    //this.vel += convergence / 10000;
  }

  show(p5) {
    p5.push();
     p5.stroke(this.color.r, this.color.g, this.color.b);
     p5.rotate(this.rotation);

    let x = this.rod * p5.cos(this.angle);
    let y = this.rod * p5.sin(this.angle);

    p5.point(x, y);
    p5.pop();
  }
}

export default function Project04() {
  return (
    <Sketch setup={setup} draw={draw} />
  );
}