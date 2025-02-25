import GameModel from "./core/GameModel";
import GameController from "./core/GameController";
import GameView from "./graphics/GameView";
import { CONSTANT } from "./core/Utils";

// global variables
let gameModel;
let gameController;
let gameView;
export let showCapoo = true;
export let CapooX = 400; //400
export let CapooY = 2500; //2500

window.preload = function () {
  console.log("Main preload done");
    // 暂定为加载开始画面的背景图片和音乐、字体等， 游戏关卡内的图片和json在MapLoader.js中加载
}

window.setup = function () {
    // createCanvas(CONSTANT.GAME_WIDTH, CONSTANT.GAME_HEIGHT);
    createCanvas(window.innerWidth, window.innerHeight);
    gameModel = new GameModel();
    gameController = new GameController(gameModel);
    gameView = new GameView(gameModel);
    console.log("Main setup done");
    // background(220);
    gameController.newGame();
  }
  
  window.draw = function () {
    gameView.render();

  // stateHandlers (in GlobalState.js) 
  // is an object that contains functions
  // that draw the screen for each state

//   if (stateHandlers[globalState.gameState]) {
//     stateHandlers[globalState.gameState]();
//   } else {
//     console.log("Unknown State");
//   }

  window.addEventListener("keydown", function(event) {
    let keysToPrevent = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]; // 只阻止这些按键
    if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
      }
    });
}

window.keyPressed = function () {
     if (keyCode === ENTER) {
          showCapoo = !showCapoo;
     }
     if (keyCode === LEFT_ARROW) {
          CapooX -= 100;
     }
      if (keyCode === RIGHT_ARROW) {
          CapooX += 100;
     }
      if (keyCode === UP_ARROW) {
          CapooY -= 100;
      }
      if (keyCode === DOWN_ARROW) {
          CapooY += 100;
      }
//   // if (globalState.gameState === "start" && keyCode === ENTER) {
//   //   globalState.gameState = "levelSelect";
//   // } else if (globalState.gameState === "levelSelect") {
//   //   if (keyCode === LEFT_ARROW) {
//   //     selectedLevel = max(0, selectedLevel - 1);
//   //   } else if (keyCode === RIGHT_ARROW) {
//   //     selectedLevel = min(levelList.length - 1, selectedLevel + 1);
//   //   } else if (keyCode === 32) {  // Space
//   //     globalState.gameState = "playing";
//   //   }
//   // } else if (globalState.gameState === "gameOver" && key === 'r') {
//   //   globalState.gameState = "start";
//   // }
//   // else if(globalState.gameState ==="playing"){
//   //   keys[key] = true;// record the key pressed
//   //   console.log(key + " " + keyCode);//test
//   // }
//   // else if (globalState.gameState === "levelComplete") {
//   //   // ESC -> select level
//   //   if (keyCode === ESCAPE) {
//   //     globalState.gameState = "levelSelect";
//   //   } else {
//   //     // next level
//   //     if (selectedLevel < levelList.length - 1) {
//   //       selectedLevel++;
//   //       globalState.gameState = "playing";
//   //     } else {
//   //       globalState.gameState = "levelSelect"; // the last level -> select level
//   //     }
//   //   }
//   // }
}

// function keyReleased() {}
// function mousePressed() {}
// function mouseReleased() {}