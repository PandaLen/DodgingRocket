const form = document.getElementById('form');

let canvas, rocket;
let time = 0;
let scoreCount = 0;
let hpCount = 3;
let asteroids = [];

let gameConfig = {
    ingame: true,

}

function centerCanvas() {
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function setup() {
    canvas = createCanvas(1280, 720);
    rocket = new Rocket(50, height / 2 - 35);
    hitSound.setVolume(0.4);
    explosion.setVolume(0.4);
    document.getElementById('score').innerHTML = `Score: ${scoreCount}`;
    document.getElementById('hp').innerHTML = `HP: ${hpCount}`;
}

function draw() {
    centerCanvas();
    if (gameConfig.ingame) {
        time++;
        canvas.background(color(0, 0, 0));
        rocket.draw();
        if (time % 30 == 0) {
            asteroids.push(new Asteroid());
        }
        asteroids.forEach(function (asteroid, index, array) {
            asteroid.draw();
            if (rocket.detectCollision(asteroid)) {
                array.splice(index, 1);
                if (hpCount > 0) {
                    hpCount--;
                    hitSound.play();
                    document.getElementById('hp').innerHTML = `<p>HP: ${hpCount}</p>`;
                } else {
                    explosion.play();
                    gameConfig.ingame = false;
                    array = [];
                    canvas.remove();
                    gameOver();
                }
            }
            if (asteroid.x < -150) {
                array.splice(index, 1);
                scoreCount++;
                document.getElementById('score').innerHTML = `<p>Score: ${scoreCount}</p>`;
            }
        });
    }
}

function gameOver() {
    document.getElementById('yes').innerHTML = '<h2 class="gameOver">Game Over</h2>';
    document.getElementById('yes').innerHTML += `<p class="score2">Score: ${scoreCount}</p>`;
    form.style.display = 'block';
}