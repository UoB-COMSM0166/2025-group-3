import {globalState, GAME_STATE, stateHandlers} from "./core/Utils.js";

function preload() {
    globalState.assets.icon = loadImage("asset/spritesheet.png");
    globalState.assets.testcat = loadImage("asset/testcat.png");//仅作测试,后续删除
}

function setup() {
  createCanvas(gameWidth, gameHeight);
}

function draw() {
  background(220);
  // stateHandlers (in GlobalState.js) 
  // is an object that contains functions
  // that draw the screen for each state
  if (stateHandlers[globalState.gameState]) {
    stateHandlers[globalState.gameState]();
  } else {
    console.log("Unknown State");
  }

  window.addEventListener("keydown", function(event) {
    let keysToPrevent = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]; // 只阻止这些按键
    if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
    }
});

}




function keyPressed() {
  if (globalState.gameState === "start" && keyCode === ENTER) {
    globalState.gameState = "levelSelect";
  } else if (globalState.gameState === "levelSelect") {
    if (keyCode === LEFT_ARROW) {
      selectedLevel = max(0, selectedLevel - 1);
    } else if (keyCode === RIGHT_ARROW) {
      selectedLevel = min(levelList.length - 1, selectedLevel + 1);
    } else if (keyCode === 32) {  // Space
      globalState.gameState = "playing";
    }
  } else if (globalState.gameState === "gameOver" && key === 'r') {
    globalState.gameState = "start";
  }
  else if(globalState.gameState ==="playing"){
    keys[key] = true;// record the key pressed
    console.log(key + " " + keyCode);//test
  }
  else if (globalState.gameState === "levelComplete") {
    // ESC -> select level
    if (keyCode === ESCAPE) {
      globalState.gameState = "levelSelect";
    } else {
      // next level
      if (selectedLevel < levelList.length - 1) {
        selectedLevel++;
        globalState.gameState = "playing";
      } else {
        globalState.gameState = "levelSelect"; // the last level -> select level
      }
    }
  }
}

function keyReleased() {}
function mousePressed() {}
function mouseReleased() {}