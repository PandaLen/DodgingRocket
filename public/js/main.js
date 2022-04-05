let canvas, rocket;

function centerCanvas() {
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function setup() {
    canvas = createCanvas(1280, 720);
    rocket = new Rocket(50, height / 2 - 35);
}

function draw() {
    centerCanvas();
    canvas.background(color(0,0,0));
    rocket.draw();
}