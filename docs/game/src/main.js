import GameModel from "./core/GameModel";
import GameController from "./core/GameController";
import GameView from "./graphics/GameView";
import { CONSTANT, GAME_STATE } from "./core/Utils";

// global variables
let gameModel;
let gameController;
let gameView;
export let showCapoo = true;

window.assets = {}; 
/* window.assets 是全局变量, 用于存储游戏关卡外的图片素材, 和所有的音频素材, 字体素材等
  (音频素材必须在preload加载, 无法放在gameModel中)
  gameModel.assets 只用于加载关卡内的图像素材, 对应的 loadImage 函数在 MapLoader.js 中 */

let soundsLoaded = 0; // 用于计数音频个数
const totalSounds = 10; // !!改成所有音频素材的数量!!

window.preload = function () {
  

  function soundLoaded() {
    soundsLoaded++;
    console.log(`Sound loaded: ${soundsLoaded}/${totalSounds}`);
    if (soundsLoaded === totalSounds) {
        console.log("All sounds loaded! Ready to start the game.");
        window.allSoundsLoaded = true;
    }
}

  window.assets.bgm = loadSound("/asset/sounds/background_music.wav",soundLoaded);

  window.assets.splitPotion = loadSound("/asset/sounds/effect_e010_splitPotion.wav",soundLoaded);
  window.assets.getPotion = loadSound("/asset/sounds/effect_e012_getPotion.wav",soundLoaded);

  window.assets.getKey = loadSound("/asset/sounds/effect_e002_getkey.wav",soundLoaded);
  window.assets.death = loadSound("/asset/sounds/effect_e014_death.wav",soundLoaded);
  window.assets.spring = loadSound("/asset/sounds/effect_e016_spring.wav",soundLoaded);
  window.assets.switch = loadSound("/asset/sounds/effect_e021_switch.wav",soundLoaded);
  window.assets.levelComplete = loadSound("/asset/sounds/effect_e026_levelComplete.mp3",soundLoaded);

  window.assets.userStartGame = loadSound("/asset/sounds/effect_e017_miaomiaomiao.wav",soundLoaded); 
  window.assets.userSelectLevel = loadSound("/asset/sounds/effect_e020_miao.wav",soundLoaded);


  //console.log("Main preload done");
}

window.setup = function () {

  // 保证所有音频素材都加载完再开始游戏
  let checkSoundsLoaded = setInterval(() => {
    if (window.allSoundsLoaded) {
        clearInterval(checkSoundsLoaded);
        console.log("All sounds are loaded! Starting game...");
        // createCanvas(CONSTANT.GAME_WIDTH, CONSTANT.GAME_HEIGHT);
        createCanvas(window.innerWidth, window.innerHeight);

        window.assets.bgm.setVolume(1);  // 设置音量
        window.assets.userSelectLevel.setVolume(0.4);  
        window.assets.death.setVolume(0.4);
        window.assets.bgm.loop();  // 循环播放

        gameModel = new GameModel();
        gameController = new GameController(gameModel);
        gameView = new GameView(gameModel);
        console.log("Main setup done");
        // background(220);
        gameController.newGame(); // 读取地图文件到gameModel

        loop();  // 在音频加载完后启动 draw()
    }
  }, 1);

  noLoop(); // 防止 draw() 在 setup() 完成前运行
    
}
  
window.draw = function () {
  // 确保所有音频加载完成后再执行游戏逻辑
  if (!window.allSoundsLoaded || !gameView) {
    console.log("Waiting for sounds to load or gameView to initialize...");
    return;
  }

  gameView.render();
  // 阻止默认按键行为
  window.addEventListener("keydown", function(event) {
    let keysToPrevent = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]; // 只阻止这些按键
    if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
    }
    // 阻止浏览器缩放
    if (event.ctrlKey) {
      if (event.key === "-" || event.key === "+") {
          event.preventDefault();
      }
    }
  });
    
  // 游戏界面的所有状态和位置更新函数
  let selectedLevel = gameModel.selectedLevel;
  if (gameModel.gameState === GAME_STATE.PLAYING) {
    gameController.moveCapoo();
    gameController.movePotion();
    gameController.controlMergedWall();
    gameController.controlElevatingWall();

    // 判定是否触碰旗帜结束当前关卡
    if (gameModel.flag[selectedLevel].visible && gameModel.flag[selectedLevel].isNear(
      gameModel.cat[selectedLevel].x, gameModel.cat[selectedLevel].y,
      CONSTANT.TILE_SIZE, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)) {
      window.assets.levelComplete.play();
      console.log("关卡完成");
      gameModel.gameState = GAME_STATE.LEVEL_COMPLETE;
    }
      
  }

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
      window.assets.userStartGame.play();
      gameModel.gameState = GAME_STATE.LEVEL_SELECT;
  } else if (gameModel.gameState === GAME_STATE.LEVEL_SELECT) {
      if (keyCode === LEFT_ARROW) {
        gameModel.selectedLevel = Math.max(0, gameModel.selectedLevel - 1);
        console.log("selectedLevel: " + gameModel.selectedLevel);
      } else if (keyCode === RIGHT_ARROW) {
        gameModel.selectedLevel = Math.min(CONSTANT.LEVEL_LIST.length - 1, gameModel.selectedLevel + 1);
        console.log("selectedLevel: " + gameModel.selectedLevel);
      } else if (keyCode === 32) {  // Space
        gameModel.gameState = GAME_STATE.PLAYING;
        window.assets.userSelectLevel.play();
      }
  } else if (gameModel.gameState === GAME_STATE.GAME_OVER && key === 'r') {
      gameModel.gameState = GAME_STATE.START;
  }
  else if(gameModel.gameState === GAME_STATE.PLAYING) {
      gameModel.keys[key] = true;// record the key pressed
      //console.log(key + " " + keyCode);//test
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

// 松开键盘后停止人物移动
window.keyReleased = function() {
  if (gameModel.keys[key] !== undefined) {
    gameModel.keys[key] = false;
  }
}
// window.mousePressed = function () {}
// window.mouseReleased = function () {}

// 浏览器窗口大小变化时自适应改变画布大小
window.windowResized = function () {
    resizeCanvas(window.innerWidth, window.innerHeight);
}


