let canvas, rocket;
let time = 0;
let score = 0;
let hp = 3;
let asteroids = [];

function centerCanvas() {
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function setup() {
    canvas = createCanvas(1280, 720);
    rocket = new Rocket(50, height / 2 - 35);
    hitSound.setVolume(0.4);
}

function draw() {
    centerCanvas();
    time++;
    canvas.background(color(0, 0, 0));
    rocket.draw();
    if (time % 50 == 0) {
        asteroids.push(new Asteroid());
    }
    asteroids.forEach(function (asteroid, index, array) {
        asteroid.draw();
        if (rocket.detectCollision(asteroid)) {
            array.splice(index, 1);
            if (hp > 0) {
                hp--;
                console.log(hp);
                hitSound.play();
            }
        }
        if (asteroid.x < -150) {
            array.splice(index, 1);
            score++;
        }
    });
}

