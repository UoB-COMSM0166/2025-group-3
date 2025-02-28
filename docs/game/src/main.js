import GameModel from "./core/GameModel";
import GameController from "./core/GameController";
import GameView from "./graphics/GameView";
import { CONSTANT, GAME_STATE } from "./core/Utils";

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
    window.addEventListener("keydown", function(event) {
      let keysToPrevent = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]; // 只阻止这些按键
      if (keysToPrevent.includes(event.key)) {
          event.preventDefault();
      }
    });
}

window.keyPressed = function () {
    //  if (keyCode === ENTER) {
    //       showCapoo = !showCapoo;
    //  }
    //  if (keyCode === LEFT_ARROW) {
    //       CapooX -= 100;
    //  }
    //   if (keyCode === RIGHT_ARROW) {
    //       CapooX += 100;
    //  }
    //   if (keyCode === UP_ARROW) {
    //       CapooY -= 100;
    //   }
    //   if (keyCode === DOWN_ARROW) {
    //       CapooY += 100;
    //   }
  if (gameModel.gameState === GAME_STATE.START && keyCode === ENTER) {
      gameModel.gameState = GAME_STATE.LEVEL_SELECT;
  } else if (gameModel.gameState === GAME_STATE.LEVEL_SELECT) {
      if (keyCode === LEFT_ARROW) {
        gameModel.selectedLevel = max(0, gameModel.selectedLevel - 1);
      } else if (keyCode === RIGHT_ARROW) {
        gameModel.selectedLevel = min(CONSTANT.LEVEL_LIST.length - 1, gameModel.selectedLevel + 1);
      } else if (keyCode === 32) {  // Space
        gameModel.gameState = GAME_STATE.PLAYING;
      }
  } else if (gameModel.gameState === GAME_STATE.GAME_OVER && key === 'r') {
      gameModel.gameState = GAME_STATE.START;
  }
  else if(gameModel.gameState === GAME_STATE.PLAYING) {
      keys[key] = true;// record the key pressed
      console.log(key + " " + keyCode);//test
  }
  else if (gameModel.gameState === GAME_STATE.LEVEL_COMPLETE) {
      // ESC -> select level
      if (keyCode === ESCAPE) {
          gameModel.gameState = GAME_STATE.LEVEL_SELECT;
      } else {
        // next level
          if (gameModel.selectedLevel < CONSTANT.LEVEL_LIST.length - 1) {
              gameModel.selectedLevel++;
              gameModel.gameState = GAME_STATE.PLAYING;
          } else {
              gameModel.gameState = GAME_STATE.LEVEL_SELECT; // the last level -> select level
          }
      }
  }
}

// window.keyReleased = function () {}
// window.mousePressed = function () {}
// window.mouseReleased = function () {}