let rocketSprite, asteroidSprite;
let hitSound, explosion;

function preload() {
  rocketSprite = loadImage("../img/rocket.png");
  asteroidSprite = loadImage("../img/meteor.png");

  hitSound = loadSound("../audio/hit.wav");
  explosion = loadSound("../audio/explosion.wav");
}

class Rocket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 120;
    this.h = 70;
  }
  detectCollision(asteroid) {
    return collideRectRect(
      this.x,
      this.y,
      this.w,
      this.h,
      asteroid.x,
      asteroid.y,
      asteroid.size,
      asteroid.size
    );
  }
  draw() {
    rect(this.x, this.y, this.w, this.h);
    noFill();
    noStroke();
    image(rocketSprite.get(0, 0, this.w, this.h), this.x, this.y);

    // Pohyb nahoru
    if (keyIsDown(87)) {
      if (this.y > 0) this.y -= 9;
    }
    // Pohyb doprava
    if (keyIsDown(68)) {
      if (this.x < width - this.w) this.x += 9;
    }
    // Pohyb dolů
    if (keyIsDown(83)) {
      if (this.y < height - this.h) this.y += 9;
    }
    // Pohyb doleva
    if (keyIsDown(65)) {
      if (this.x > 0) this.x -= 9;
    }
  }
}

class Asteroid {
  constructor() {
    this.size = 130;
    this.y = random(0, height - this.size);
    this.x = width + 100;
    this.speed = random(5, 10);
  }
  move() {
    this.x -= this.speed;
  }
  draw() {
    rect(this.x, this.y, this.size, this.size);
    this.move();
    noStroke();
    image(asteroidSprite.get(0, 0, this.size, this.size), this.x, this.y);
  }
}