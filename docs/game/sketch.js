let gameState = "start"; 
let selectedLevel = 0;  
let firstGameStarted = true; 

function setup() {
  createCanvas(gameWidth, gameHeight);
}

function draw() {
  background(220);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "levelSelect") {
    drawLevelSelectScreen();
  } else if (gameState === "playing") {
    drawGameScreen();
  } else if (gameState === "gameOver") {
    drawGameOverScreen();
  } else if (gameState === "levelComplete") {
    drawLevelCompleteScreen();
  }
}

function drawStartScreen() {
  background(100, 150, 200);
  textAlign(CENTER, CENTER);
  textSize(32);
  strokeWeight(3);
  text("Press ENTER to start", width/2, height/2);
}


function drawLevelSelectScreen() {
  background(137, 172, 206);
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(0, 0, 0);
  strokeWeight(3);
  stroke(255, 255, 255);
  text("Use LEFT/RIGHT to chose\nPress SPACE to begin", width/2, 100);
  for (let i = 0; i < levels.length; i++) {
    let size = 60;
    let x = width/2 - (levels.length*size)/2 + i*size; 
    let y = height/2;
    if (i === selectedLevel) {
      fill(255, 255, 0); // color when selected
    } else {
      fill(200, 200, 200);
    }
    rect(x, y, size, size, 10); // draw buttons
    fill(0, 0, 0);
    textSize(26);
    strokeWeight(3);
    stroke(255, 255, 255);
    text(levels[i], x + size/2, y + size/2); 
  }
}


function drawGameScreen() {
  coll[selectedLevel].show();
  trap[selectedLevel].update();
  trap[selectedLevel].show();
  decorate[selectedLevel].show();
  merge[selectedLevel].show();
  ice[selectedLevel].show();
  spring[selectedLevel].update();
  spring[selectedLevel].show();

  for(let i =0; i<keysItem[selectedLevel].length; i++){
    keysItem[selectedLevel][i].show();
  }
  for(let i =0; i<elevatingWalls[selectedLevel].length; i++){
    elevatingWalls[selectedLevel][i].update();
    elevatingWalls[selectedLevel][i].show();
  }
  for(let i =0; i<switches[selectedLevel].length; i++){
    switches[selectedLevel][i].update();
    switches[selectedLevel][i].show();
  }
  flag[selectedLevel].show();
  player[selectedLevel].update();
  player[selectedLevel].show();

}


function drawGameOverScreen() {}


function drawLevelCompleteScreen() {}


function keyPressed() {}
function keyReleased() {}


function mousePressed() {}
function mouseReleased() {}