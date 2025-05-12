import GameModel from "./core/GameModel";
import GameController from "./core/GameController";
import GameView from "./graphics/GameView";
import { CONSTANT, GAME_STATE } from "./core/Utils";


// global variables
let gameModel;
let gameController;
let gameView;
export let showCapoo = true;
// Add a global variable for facial-expression switching
window.currentFaceIndex = 0;

window.assets = {}; 
/*  window.assets is a global object that stores image assets used outside levels,
    as well as all audio and font assets.
    (Audio must be loaded in preload; it cannot live inside gameModel.)
    gameModel.assets is only for per-level image assets; see loadImage in MapLoader.js. */

let soundsLoaded = 0;      // Counter for loaded audio files
const totalSounds = 10;    // !!Change this to match the real number of audio assets!!

window.preload = function () {
  gameModel = new GameModel();
  gameController = new GameController(gameModel);
  gameView = new GameView(gameModel);
}

window.setup = function () {
  createCanvas(window.innerWidth, window.innerHeight);
  //scale(0.1);

  // Disable browser zoom (wheel + Ctrl)
  document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // Disable track-pad pinch zoom
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  // Disable keyboard zoom shortcuts
  document.addEventListener('keydown', function (e) {
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

  window.assets.bgm = loadSound("/asset/sounds/background_music.wav", soundLoaded);

  window.assets.splitPotion = loadSound("/asset/sounds/effect_e010_splitPotion.wav", soundLoaded);
  window.assets.getPotion = loadSound("/asset/sounds/effect_e012_getPotion.wav", soundLoaded);

  window.assets.getKey = loadSound("/asset/sounds/effect_e002_getkey.wav", soundLoaded);
  window.assets.death = loadSound("/asset/sounds/effect_e014_death.wav", soundLoaded);
  window.assets.spring = loadSound("/asset/sounds/effect_e016_spring.wav", soundLoaded);
  window.assets.switch = loadSound("/asset/sounds/effect_e021_switch.wav", soundLoaded);
  window.assets.levelComplete = loadSound("/asset/sounds/effect_e026_levelComplete.mp3", soundLoaded);

  window.assets.userStartGame = loadSound("/asset/sounds/effect_e017_miaomiaomiao.wav", soundLoaded);
  window.assets.userSelectLevel = loadSound("/asset/sounds/effect_e020_miao.wav", soundLoaded);

  window.assets.textFont1 = loadFont("/asset/fonts/comic.ttf");
  //window.assets.textFont2 = loadFont("/asset/fonts/GILSANUB.TTF");
  //console.log("Main preload done");

  // Background images are loaded here because doing it inside gameModel was too slow
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
  window.assets.completed = loadImage("/asset/bg/completed.png");
  window.assets.instructionbg = loadImage("/asset/bg/instructionbg.png");
  window.assets.title = loadImage("/asset/title.png");

  // Moving-cloud sprites for start / level-select screens; must load in preload
  // (Cannot load in gameModel because that is asynchronous)
  window.assets.startscreenbg_cloud1 = loadImage("/asset/bg/clouds/ocean-3-3-1.png");
  window.assets.startscreenbg_cloud2 = loadImage("/asset/bg/clouds/ocean-3-3-2.png");
  window.assets.startscreenbg_cloud3 = loadImage("/asset/bg/clouds/ocean-3-4.png");
  window.assets.startscreenbg_cloud4 = loadImage("/asset/bg/clouds/clouds-5-3.png");

  //window.assets.selectscreenbg_cloud1 = loadImage("/asset/bg/clouds/cloud-2-2.png");
  window.assets.selectscreenbg_cloud2 = loadImage("/asset/bg/clouds/cloud-2-3.png");

  //window.assets.selectscreenbg_cloud3 = loadImage("/asset/bg/clouds/cloud-2-4.png");
  window.assets.selectscreenbg_cloud4 = loadImage("/asset/bg/clouds/cloud-7-4-1.png");

  //window.assets.arrow = loadImage("/asset/up-arrow.png");

  // Ensure all audio assets are loaded before starting the game
  let checkSoundsLoaded = setInterval(() => {
    if (window.allSoundsLoaded) {
      clearInterval(checkSoundsLoaded);
      console.log("All sounds are loaded! Starting game...");

      window.assets.bgm.setVolume(1);
      window.assets.userSelectLevel.setVolume(0.4);
      window.assets.death.setVolume(0.4);
      window.assets.bgm.loop();     // Loop background music
      textFont(window.assets.textFont1);

      console.log("Main setup done");
      // background(220);
      gameController.newGame();     // Load the map file into gameModel

      // Make sure the game starts on the intro screen
      gameModel.gameState = GAME_STATE.START;
      //gameModel.gameState = GAME_STATE.INSTRUCTION;

      loop();                       // Start draw() once audio is ready
    }
  }, 1);

  noLoop();                         // Prevent draw() from running before setup() completes
}

window.draw = function () {
  // Cap frame rate at 60 FPS
  const targetFrameRate = 60;
  const currentTime = millis();
  const elapsedTime = currentTime - (window.lastDrawTime || 0);

  if (elapsedTime < 1000 / targetFrameRate) {
    // Skip this frame if it arrived too soon
    return;
  }

  window.lastDrawTime = currentTime;

  // Only run game logic after all audio has loaded
  if (!window.allSoundsLoaded || !gameView) {
    let bgColor = color('#d0f0ff'); // Soft sky-blue
    background(bgColor);

    // Draw some white dots as cute decoration
    background('#a7ddf5');         // Soft Capoo blue
    noStroke();
    fill(255);
    let spacing = 60;
    let dotSize = 20;
    for (let y = 0; y < height + spacing; y += spacing) {
      for (let x = 0; x < width + spacing; x += spacing) {
        // Create a staggered pattern (like in the design)
        let offset = (y / spacing) % 2 === 0 ? 0 : spacing / 2;
        ellipse(x + offset, y, dotSize);
      }
    }

    fill('#444');
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Comic Sans MS');      // Swap for an even cuter font if desired
    textSize(32);
    text("Loading...", width / 2, height / 2 + 60);
    return;
  }

  gameView.render();

  // Update all game state and positions
  let selectedLevel = gameModel.selectedLevel;
  if (gameModel.gameState === GAME_STATE.PLAYING) {
    gameController.moveCapoo();
    gameController.movePotion();
    gameController.controlMergedWall();
    gameController.controlElevatingWall();

    // Check whether the flag is touched to finish the level
    if (
      gameModel.flag[selectedLevel].visible &&
      gameModel.flag[selectedLevel].isNear(
        gameModel.cat[selectedLevel].x,
        gameModel.cat[selectedLevel].y,
        CONSTANT.TILE_SIZE,
        CONSTANT.CAT_WIDTH,
        CONSTANT.CAT_HEIGHT
      )
    ) {
      window.assets.levelComplete.play();
      gameModel.gameState = GAME_STATE.LEVEL_COMPLETE;
    }
  }
}

// Set up key handling once at startup so it isn’t added multiple times
document.addEventListener("DOMContentLoaded", function () {
  // Block default browser behavior for specific keys
  window.addEventListener(
    "keydown",
    function (event) {
      let keysToPrevent = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
      if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
      }
      // Block zoom shortcuts
      if (event.ctrlKey) {
        if (event.key === "-" || event.key === "+") {
          event.preventDefault();
        }
      }
    },
    { passive: false }
  );
});

// Cycle to the next facial expression
function changeFacialExpression() {
  window.currentFaceIndex = (window.currentFaceIndex + 1) % 16;
}

window.keyPressed = function () {
  // Any key press cycles the cat’s face while playing
  if (gameModel.gameState === GAME_STATE.PLAYING) {
    changeFacialExpression();
  }

  // Start-, select-, and complete-screens don’t need to handle repeat keys
  if (gameModel.gameState === GAME_STATE.START && keyCode === ENTER) {
    window.assets.userStartGame.play();
    gameModel.gameState = GAME_STATE.INSTRUCTION; // Move from START to INSTRUCTION
  } else if (gameModel.gameState === GAME_STATE.INSTRUCTION && keyCode === ENTER) {
    // In instruction screen, ENTER goes to level select
    gameModel.gameState = GAME_STATE.LEVEL_SELECT;
    window.assets.userSelectLevel.play();
  } else if (gameModel.gameState === GAME_STATE.LEVEL_SELECT) {
    if (keyCode === LEFT_ARROW) {
      gameModel.selectedLevel = Math.max(0, gameModel.selectedLevel - 1);
      console.log("selectedLevel: " + gameModel.selectedLevel);
    } else if (keyCode === RIGHT_ARROW) {
      gameModel.selectedLevel = Math.min(
        CONSTANT.LEVEL_LIST.length - 1,
        gameModel.selectedLevel + 1
      );
      console.log("selectedLevel: " + gameModel.selectedLevel);
    } else if (keyCode === ENTER) {  // Press ENTER to enter the selected level
      gameModel.gameState = GAME_STATE.PLAYING;
      window.assets.userSelectLevel.play();
      // Reset game content: positions, key count, item visibility, etc.
      gameModel.cat[gameModel.selectedLevel].x = gameModel.cat[gameModel.selectedLevel].iniX;
      gameModel.cat[gameModel.selectedLevel].y = gameModel.cat[gameModel.selectedLevel].iniY;
      gameModel.cat[gameModel.selectedLevel].keyNum = 0;

      // Reset keys
      for (let i = 0; i < gameModel.keysItem[gameModel.selectedLevel].length; i++) {
        gameModel.keysItem[gameModel.selectedLevel][i].visible = true;
      }
      // Reset elevating walls
      for (let i = 0; i < gameModel.elevatingWalls[gameModel.selectedLevel].length; i++) {
        gameModel.elevatingWalls[gameModel.selectedLevel][i].x =
          gameModel.elevatingWalls[gameModel.selectedLevel][i].iniX;
        gameModel.elevatingWalls[gameModel.selectedLevel][i].y =
          gameModel.elevatingWalls[gameModel.selectedLevel][i].iniY;
        gameModel.elevatingWalls[gameModel.selectedLevel][i].moving = false;
        gameModel.elevatingWalls[gameModel.selectedLevel][i].beActivated = false;
      }
      // Reset switches
      for (let i = 0; i < gameModel.switches[gameModel.selectedLevel].length; i++) {
        gameModel.switches[gameModel.selectedLevel][i].invincible = false;
        gameModel.switches[gameModel.selectedLevel][i].beActivated = false;
        gameModel.switches[gameModel.selectedLevel][i].prevState = false;
      }

      // Automatically show help for the first three levels
      if (gameModel.selectedLevel <= 2) {
        gameModel.showHelp = true;
      }
    }
  } else if (gameModel.gameState === GAME_STATE.PLAYING) {
    // Only handle the first key-down event (ignore auto-repeat)
    if (!gameModel.keys[key]) {
      // Record key state
      gameModel.keys[key] = true;

      // Actions that should only fire once on key-down
      if (key === 'h' || key === 'H') {
        gameModel.showHelp = !gameModel.showHelp;
        return;
      }

      // ESC: immediately return to level-select screen
      if (keyCode === ESCAPE) {
        if (gameModel.showHelp) {
          // If help is visible, just hide it
          gameModel.showHelp = false;
          gameModel.keysESC = false;
        } else {
          // Otherwise go back to level select
          gameModel.gameState = GAME_STATE.LEVEL_SELECT;
        }
        return;
      }
    }

    // Block other controls while help screen is visible
    if (gameModel.showHelp) {
      return;
    }
  } else if (gameModel.gameState === GAME_STATE.GAME_OVER && key === 'r') {
    gameModel.gameState = GAME_STATE.START;
  } else if (gameModel.gameState === GAME_STATE.LEVEL_COMPLETE) {
    if (keyCode === ESCAPE) {
      if (gameModel.selectedLevel === CONSTANT.LEVEL_LIST.length - 1) {
        gameModel.gameState = GAME_STATE.ALLCOMPLETED;
      } else {
        gameModel.gameState = GAME_STATE.LEVEL_SELECT;
      }
    } else {
      if (gameModel.selectedLevel === CONSTANT.LEVEL_LIST.length - 1) {
        gameModel.gameState = GAME_STATE.ALLCOMPLETED;
      } else if (gameModel.selectedLevel < CONSTANT.LEVEL_LIST.length - 1) {
        gameModel.selectedLevel++;
        gameModel.gameState = GAME_STATE.PLAYING;
      } else {
        gameModel.gameState = GAME_STATE.LEVEL_SELECT;
      }
    }
  } else if (gameModel.gameState === GAME_STATE.ALLCOMPLETED) {
    if (keyCode === ESCAPE) {
      gameModel.gameState = GAME_STATE.START;
    } else {
      gameModel.gameState = GAME_STATE.START;
    }
  }
}

// Stop character movement when keys are released
window.keyReleased = function () {
  if (gameModel.keys[key] !== undefined) {
    // Optimization: delete the key state instead of setting it to false
    delete gameModel.keys[key];
  }
}
// window.mousePressed = function () {}
// window.mouseReleased = function () {}

// Adapt the canvas to browser-window size changes
window.windowResized = function () {
  //resizeCanvas(window.innerWidth, window.innerHeight);
  const zoomLevel = window.devicePixelRatio;
  console.log("Current zoom ratio:", zoomLevel);
}
