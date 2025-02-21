export const CONSTANT = Object.freeze({
    GAME_WIDTH: 1280,
    GAME_HEIGHT: 720,
    TILE_SIZE: 70,
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


// index in png -> coordinate in png
export function getTilePosition(i) {
    i --;// 此地图导出json后坐标从2开始(原因未知?), 需调整为1
    let row = Math.floor((i - 1) / 30);  
    let col = (i - 1) % 30;              
    let xCoordinate = col * (tileSize + tilemargin);  
    let yCoordinate = row * (tileSize + tilemargin);  
    return { x: xCoordinate, y: yCoordinate };
}

// index in data arr -> coordinate on canvas
export function getDrawPosition(i, levelIndex) {
    let row = Math.floor(i / levelWidth[levelIndex]);  
    let col = i % levelWidth[levelIndex];  
    let xCoordinate = col * tileSize;  
    let yCoordinate = row * tileSize; 
    return { x: xCoordinate, y: yCoordinate };
}