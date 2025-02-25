export const CONSTANT = Object.freeze({
    GAME_WIDTH: 6400,
    GAME_HEIGHT: 4800,
    TILE_SIZE: 70, //70
    TILE_MARGIN: 0,
    LEVEL_LIST: [],
    FRAME_INTERVAL: 18
});

export const GAME_STATE = Object.freeze({
    START: "start",
    LEVEL_SELECT: "levelSelect",
    PLAYING: "playing",
    LEVEL_COMPLETE: "levelComplete",
    GAME_OVER: "game_over",
  });

// export const stateHandlers = {
//     [GAME_STATE.START]: drawStartScreen,
//     [GAME_STATE.LEVEL_SELECT]: drawLevelSelectScreen,
//     [GAME_STATE.PLAYING]: drawGameScreen,
//     [GAME_STATE.LEVEL_COMPLETE]: drawLevelCompleteScreen,
//     [GAME_STATE.GAME_OVER]: drawGameOverScreen,
// };
