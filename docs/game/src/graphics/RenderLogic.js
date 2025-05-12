import { CONSTANT } from '../core/Utils.js';
//import { showCapoo/*, CapooX, CapooY*/ } from '../main';
import {PotionX,PotionY} from "../core/Utils.js";


export function getTilePosition(i) {
    i--; // Test map exported json starts from 2, need to adjust to 1
    let row = Math.floor((i - 1) / 30); // 30 tiles per row in the tile png
    let col = (i - 1) % 30;
    let xCoordinate = col * (CONSTANT.TILE_SIZE + CONSTANT.TILE_MARGIN);
    let yCoordinate = row * (CONSTANT.TILE_SIZE + CONSTANT.TILE_MARGIN);
    return { x: xCoordinate, y: yCoordinate };
}

export function getDrawPosition(i, levelWidth) {
    let row = Math.floor(i / levelWidth); // Replace 100 with map width
    let col = i % levelWidth;
    let xCoordinate = col * CONSTANT.TILE_SIZE;
    let yCoordinate = row * CONSTANT.TILE_SIZE;
    return { x: xCoordinate, y: yCoordinate };
}

// export function showEntities(gameModel, assets) {
//     const checkDataLoaded = setInterval(() => {
//         if (gameModel.coll.length > 0) { // Make sure data is loaded
            /* This part moved to the drawGameScreen method in GameView file */
//         }
//     }, 1); // Check every 10ms
// }

export function showTerrain(entity, offsetX, offsetY, assets, levelWidth) {
    if (!entity) {
        console.log("!!!!!noentitey!!!!!");
        return;
    }
    //console.log("showEntity");
    //console.log(entity);

    for(let i=0; i<entity.data.length; i++){
        let tileId = entity.data[i]; 
        if (tileId === 0) {  // igonore empty tiles
            continue;  
        }
        let coord1 = getTilePosition(tileId);
        let coord2 = getDrawPosition(i, levelWidth);
        image(
            assets.icon,
            coord2.x - offsetX, coord2.y - offsetY,
            CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            coord1.x, coord1.y,
            CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE
        );
    }
}

export function showItem(entity, offsetX, offsetY, assets, isAnimated) {
    if (isAnimated) {
        entity.frameCounter++;
        if (entity.frameCounter % CONSTANT.FRAME_INTERVAL === 0) { 
            entity.frameIndex = (entity.frameIndex + 1) % entity.animationFrames.length;
            entity.imgIndex = entity.animationFrames[entity.frameIndex];
        }
    }
    let coord = getTilePosition(entity.imgIndex);
    // let offsetX = (player[this.levelIndex].x - gameWidth / 2);
    // let offsetY = (player[this.levelIndex].y - gameHeight / 2);
    image(
        assets.icon,
        entity.x - offsetX, entity.y - offsetY,
        CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
        coord.x, coord.y,
        CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE
    );
}