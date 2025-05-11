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
  gameModel = new GameModel();
  gameController = new GameController(gameModel);
  gameView = new GameView(gameModel);
}

window.setup = function () {
  createCanvas(window.innerWidth, window.innerHeight);
  //scale(0.1);

  // 禁用浏览器缩放
  document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // 禁用触摸板缩放
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });

  // 禁用键盘缩放
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
      e.preventDefault();
    }
  });

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

  window.assets.textFont1 = loadFont("/asset/fonts/comic.ttf");
  //window.assets.textFont2 = loadFont("/asset/fonts/GILSANUB.TTF");
  //console.log("Main preload done");

  // 用于背景素材, 在gamemodel中加载太慢了
  window.assets.startscreenbg = loadImage("/asset/startscreenbg.png");
  window.assets.selectscreenbg = loadImage("/asset/selectscreenbg.png");
  window.assets.levelCompletebg = loadImage("/asset/bg/Summer6-new.png");
  window.assets.level1bg = loadImage("/asset/bg/Summer8-new.png");
  window.assets.level2bg = loadImage("/asset/bg/Summer5-new.png");
  window.assets.level3bg = loadImage("/asset/bg/Summer3.png");
  window.assets.level4bg = loadImage("/asset/bg/nature3.png");
  window.assets.level5bg = loadImage("/asset/bg/ocean2.png");
  window.assets.level6bg = loadImage("/asset/bg/night1.png");
  window.assets.level7bg = loadImage("/asset/bg/ocean4.png");
  window.assets.level8bg = loadImage("/asset/bg/Summer7.png");
  window.assets.title = loadImage("/asset/title.png");

  // 用于开始界面和选关界面的移动云朵素材, 必须在preload中加载, 不可以在gamemodel中加载(因为是异步的)
  window.assets.startscreenbg_cloud1 = loadImage("/asset/bg/clouds/ocean-3-3-1.png");
  window.assets.startscreenbg_cloud2 = loadImage("/asset/bg/clouds/ocean-3-3-2.png");
  window.assets.startscreenbg_cloud3 = loadImage("/asset/bg/clouds/ocean-3-4.png");
  window.assets.startscreenbg_cloud4 = loadImage("/asset/bg/clouds/clouds-5-3.png");

  //window.assets.selectscreenbg_cloud1 = loadImage("/asset/bg/clouds/cloud-2-2.png");
  window.assets.selectscreenbg_cloud2 = loadImage("/asset/bg/clouds/cloud-2-3.png");

  //window.assets.selectscreenbg_cloud3 = loadImage("/asset/bg/clouds/cloud-2-4.png");
  window.assets.selectscreenbg_cloud4 = loadImage("/asset/bg/clouds/cloud-7-4-1.png");

  //window.assets.arrow = loadImage("/asset/up-arrow.png");

  // 保证所有音频素材都加载完再开始游戏
  let checkSoundsLoaded = setInterval(() => {
    if (window.allSoundsLoaded) {
        clearInterval(checkSoundsLoaded);
        console.log("All sounds are loaded! Starting game...");
        
        window.assets.bgm.setVolume(1);  // 设置音量
        window.assets.userSelectLevel.setVolume(0.4);  
        window.assets.death.setVolume(0.4);
        window.assets.bgm.loop();  // 循环播放
        textFont(window.assets.textFont1);

        console.log("Main setup done");
        // background(220);
        gameController.newGame(); // 读取地图文件到gameModel

        loop();  // 在音频加载完后启动 draw()
    }
  }, 1);

  noLoop(); // 防止 draw() 在 setup() 完成前运行
    
}
  
window.draw = function () {
  // 限制最大帧率为60fps
  const targetFrameRate = 60;
  const currentTime = millis();
  const elapsedTime = currentTime - (window.lastDrawTime || 0);
  
  if (elapsedTime < 1000 / targetFrameRate) {
    // 如果时间间隔太短，跳过这一帧
    return;
  }
  
  // 记录当前时间为上一次绘制时间
  window.lastDrawTime = currentTime;
  
  // 确保所有音频加载完成后再执行游戏逻辑
  if (!window.allSoundsLoaded || !gameView) { 
    let bgColor = color('#d0f0ff'); // 柔和的天蓝色
    background(bgColor);

    // 添加一些白色的圆点作为可爱的装饰
    background('#a7ddf5'); // 柔和的Capoo蓝色
    noStroke();
    fill(255); // 白色圆点
    let spacing = 60; // 每行每列间隔
    let dotSize = 20;
    for (let y = 0; y < height + spacing; y += spacing) {
      for (let x = 0; x < width + spacing; x += spacing) {
        let offset = (y / spacing) % 2 === 0 ? 0 : spacing / 2; // 实现交错排列（像图里那样）
        ellipse(x + offset, y, dotSize);
      }
    }

    fill('#444');
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Comic Sans MS'); // 可改为更萌字体
    textSize(32);
    text("Loading...", width / 2, height / 2 + 60);
    return;
  }

  gameView.render();
  
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
      // 移除console.log减少内存占用
      gameModel.gameState = GAME_STATE.LEVEL_COMPLETE;
    }
  }
}

// 只在初始化时设置一次键盘事件监听器，防止重复添加
document.addEventListener("DOMContentLoaded", function() {
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
  }, { passive: false });
});

window.keyPressed = function () {
  // 游戏开始、选关和完成界面不需要处理重复按键
  if (gameModel.gameState === GAME_STATE.START && keyCode === ENTER) {
      window.assets.userStartGame.play();
      gameModel.gameState = GAME_STATE.INSTRUCTION; // 从START状态改为先进入INSTRUCTION状态
  }
  
  else if (gameModel.gameState === GAME_STATE.INSTRUCTION && keyCode === ENTER) {
      // 从游戏说明界面按回车进入选关界面
      gameModel.gameState = GAME_STATE.LEVEL_SELECT;
      window.assets.userSelectLevel.play();
  }
  
  else if (gameModel.gameState === GAME_STATE.LEVEL_SELECT) {
      if (keyCode === LEFT_ARROW) {
        gameModel.selectedLevel = Math.max(0, gameModel.selectedLevel - 1);
        console.log("selectedLevel: " + gameModel.selectedLevel);
      } 
      else if (keyCode === RIGHT_ARROW) {
        gameModel.selectedLevel = Math.min(CONSTANT.LEVEL_LIST.length - 1, gameModel.selectedLevel + 1);
        console.log("selectedLevel: " + gameModel.selectedLevel);
      } 
      else if (keyCode === ENTER) {  // 按下空格的时候进入该关卡
        gameModel.gameState = GAME_STATE.PLAYING;
        window.assets.userSelectLevel.play();
        // 游戏内容重置, 包括人物位置和钥匙数量, 物品的显示也全部重置
        gameModel.cat[gameModel.selectedLevel].x = gameModel.cat[gameModel.selectedLevel].iniX;
        gameModel.cat[gameModel.selectedLevel].y = gameModel.cat[gameModel.selectedLevel].iniY;
        gameModel.cat[gameModel.selectedLevel].keyNum = 0;
        // 重置钥匙
        for(let i=0; i<gameModel.keysItem[gameModel.selectedLevel].length; i++){
          gameModel.keysItem[gameModel.selectedLevel][i].visible = true; 
        }
        // 重置机关墙
        for(let i=0; i<gameModel.elevatingWalls[gameModel.selectedLevel].length; i++){
          gameModel.elevatingWalls[gameModel.selectedLevel][i].x =
            gameModel.elevatingWalls[gameModel.selectedLevel][i].iniX; 
          gameModel.elevatingWalls[gameModel.selectedLevel][i].y =
            gameModel.elevatingWalls[gameModel.selectedLevel][i].iniY;
          gameModel.elevatingWalls[gameModel.selectedLevel][i].moving = false;
          gameModel.elevatingWalls[gameModel.selectedLevel][i].beActivated = false;
        }
        // 重置机关
        for(let i=0; i<gameModel.switches[gameModel.selectedLevel].length; i++){
          gameModel.switches[gameModel.selectedLevel][i].invincible = false;
          gameModel.switches[gameModel.selectedLevel][i].beActivated = false;
          gameModel.switches[gameModel.selectedLevel][i].prevState = false;
        }
      }
  } 

  else if(gameModel.gameState === GAME_STATE.PLAYING){
    // 只处理按键按下事件，不处理长按期间的重复触发
    if (!gameModel.keys[key]) {
      // 设置按键状态
      gameModel.keys[key] = true;
      
      // 这些按键只在刚按下时触发一次的操作
      if(key === 'h' || key === 'H'){
        gameModel.showHelp = !gameModel.showHelp;
        return;
      }
      
      // 处理ESC键
      if (keyCode === ESCAPE) { 
        if (!gameModel.showHelp) { // 按下esc, 如果没有展示游戏说明, 则展示
            gameModel.showHelp = true;
            gameModel.keysESC = true; 
        } else {
            gameModel.showHelp = false; // 按下两次esc, 退出到选关页面
            gameModel.keysESC = false;
            gameModel.gameState = GAME_STATE.LEVEL_SELECT;
        }
        return;
      }
    }
    
    // 如果显示帮助界面，阻止其他按键操作游戏
    if (gameModel.showHelp) {
      return;
    }
  }
  
  else if (gameModel.gameState === GAME_STATE.GAME_OVER && key === 'r') {
      gameModel.gameState = GAME_STATE.START;
  }
  
  else if (gameModel.gameState === GAME_STATE.LEVEL_COMPLETE) {
      if (keyCode === ESCAPE) {
          gameModel.gameState = GAME_STATE.LEVEL_SELECT;
      } else {
          if (gameModel.selectedLevel < CONSTANT.LEVEL_LIST.length - 1) {
              gameModel.selectedLevel++;
              gameModel.gameState = GAME_STATE.PLAYING;
          } else {
              gameModel.gameState = GAME_STATE.LEVEL_SELECT;
          }
      }
  }
}

// 松开键盘后停止人物移动
window.keyReleased = function() {
  if (gameModel.keys[key] !== undefined) {
    // 优化：直接删除按键状态，不设置为false
    delete gameModel.keys[key];
  }
}
// window.mousePressed = function () {}
// window.mouseReleased = function () {}

// 浏览器窗口大小变化时自适应改变画布大小
window.windowResized = function () {
    //resizeCanvas(window.innerWidth, window.innerHeight);
    const zoomLevel = window.devicePixelRatio;
    console.log("当前缩放比例:", zoomLevel);
}


