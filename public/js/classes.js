let rocketSprite;

function preload() {
    rocketSprite = loadImage("../img/rocket.png");
  }

class Rocket {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.w = 120;
        this.h = 70;
    }
    draw(){
        rect(this.x, this.y, this.w, this.h);
        noFill();
        image(rocketSprite.get(0, 0, this.w, this.h), this.x, this.y);

        // Pohyb nahoru
        if(keyIsDown(87)){
            if (this.y > 0) this.y -= 7;
        }
        // Pohyb doprava
        if (keyIsDown(68)) {
            if (this.x < width - this.w) this.x += 7;
          }
          // Pohyb dolů
          if (keyIsDown(83)) {
            if (this.y < height - this.h) this.y += 7;
          }
        // Pohyb doleva
        if (keyIsDown(65)) {
            if (this.x > 0) this.x -= 7;
          }
    }
}