let img, fnt;
let brushSize = 20;
let isErasing = false;

function preload() {
  img = loadImage('/paper.png');
  fnt = loadFont('/Bruno.ttf');
}

function setup() {
  createCanvas(384*2, 260*2);
  image(img, 0, 0, 384*2, 260*2);
  textSize(20);
  textFont(fnt);
  fill(150);
  noStroke();
  text("Help\nPress e to erase\nPress d to draw\nPress p to increase brush size\nPress m to decrease brush size\nPress r to reset", 10, 30);
}

function draw() {
  if (mouseIsPressed) {
    if (isErasing) {
      eraseBackground(mouseX, mouseY, brushSize);
    } else {
      strokeWeight(brushSize);
      stroke(random(255),random(255),random(255));
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}

function eraseBackground(x, y, size) {
  let scaledX = map(x, 0, width, 0, img.width);
  let scaledY = map(y, 0, height, 0, img.height);
  let scaledSize = map(size, 0, width, 0, img.width) * 2;
  let imgData = img.get(scaledX - scaledSize / 2, scaledY - scaledSize / 2, scaledSize, scaledSize);
  image(imgData, x - size, y - size, size * 2, size * 2);
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    isErasing = true;
  } else if (key === 'd' || key === 'D') {
    isErasing = false;
  }
}

function keyTyped() {
  if (key === 'p' || key === 'P') {
    brushSize += 5;
  } else if (key === 'm' || key === 'M') {
    brushSize = max(5, brushSize - 5);
  } else if (key === 'r' || key === 'R') {
    setup();
  }
}