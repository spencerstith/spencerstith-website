class Particle {

  constructor(pos =  p5.createVector(0, 0, 0), vel =  p5.createVector(0, 0, 0), acc =  p5.createVector(0, 0, 0)) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
  }

  setColor(col) {
    this.color = col;
  }

  show() {
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