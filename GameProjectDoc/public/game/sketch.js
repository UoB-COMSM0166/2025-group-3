let gameState = "start"; // 当前游戏状态
let selectedLevel = 0;  // 选中的关卡索引, 从0开始
let firstGameStarted = true; // 游戏首次开始标志,用于显示游戏提示


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


// 开始界面
function drawStartScreen() {}

// 关卡选择界面
function drawLevelSelectScreen() {}

// 游戏界面
function drawGameScreen() {}

// 死亡界面
function drawGameOverScreen() {}

// 关节结束画面
function drawLevelCompleteScreen() {}

// 监听键盘
function keyPressed() {}
function keyReleased() {}

// 监听鼠标
function mousePressed() {}
function mouseReleased() {}