export const CONSTANT = Object.freeze({
    GAME_WIDTH: 6400,  //windowWidth
    GAME_HEIGHT: 3200,  //windowHeight
    TILE_SIZE: 70, //70
    TILE_MARGIN: 0,
    LEVEL_LIST: [1,2],
    FRAME_INTERVAL: 18,
    CAT_SIZE: 210
});

// enum of possible game states
export const GAME_STATE = Object.freeze({
    START: "start",
    LEVEL_SELECT: "levelSelect",
    PLAYING: "playing",
    LEVEL_COMPLETE: "levelComplete",
    GAME_OVER: "game_over",
  });
