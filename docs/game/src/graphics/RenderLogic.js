import { CONSTANT } from '../core/Utils.js';
//import { showCapoo/*, CapooX, CapooY*/ } from '../main';

export function getTilePosition(i) {
    i--; // 测试地图导出json后坐标从2开始, 需调整为1
    let row = Math.floor((i - 1) / 30);
    let col = (i - 1) % 30;
    let xCoordinate = col * (CONSTANT.TILE_SIZE + CONSTANT.TILE_MARGIN);
    let yCoordinate = row * (CONSTANT.TILE_SIZE + CONSTANT.TILE_MARGIN);
    return { x: xCoordinate, y: yCoordinate };
}

export function getDrawPosition(i) {
    let row = Math.floor(i / 100);
    let col = i % 100;
    let xCoordinate = col * CONSTANT.TILE_SIZE;
    let yCoordinate = row * CONSTANT.TILE_SIZE;
    return { x: xCoordinate, y: yCoordinate };
}

export function showEntities(gameModel, assets) {
    let levelIndex = gameModel.selectedLevel;
    // let offsetX = (gameModel.player[levelIndex].x - CONSTANT.GAME_WIDTH / 2);
    // let offsetY = (gameModel.player[levelIndex].y - CONSTANT.GAME_HEIGHT / 2);
    let offsetX = gameModel.cat[levelIndex].x - window.innerWidth / 2;
    let offsetY = gameModel.cat[levelIndex].y - window.innerHeight / 2;

    const checkDataLoaded = setInterval(() => {
        if (gameModel.coll.length > 0) { // 确保数据已经加载
            console.log("数据已加载:", gameModel.coll[0]);
            clearInterval(checkDataLoaded); // 停止轮询
            image(gameModel.assets.bg, 0, 0, windowWidth, windowHeight * 5 / 4);
            showTerrain(gameModel.coll[levelIndex], offsetX, offsetY, assets);
            showTerrain(gameModel.decorate[levelIndex], offsetX, offsetY, assets);
            showTerrain(gameModel.trap[levelIndex], offsetX, offsetY, assets);
            showTerrain(gameModel.ice[levelIndex], offsetX, offsetY, assets);
            showTerrain(gameModel.spring[levelIndex], offsetX, offsetY, assets);      
            showTerrain(gameModel.merge[levelIndex], offsetX, offsetY, assets);      
            for(let i =0; i<gameModel.keysItem[levelIndex].length; i++){
                showItem(gameModel.keysItem[levelIndex][i], offsetX, offsetY, assets, true);
            }
            for(let i =0; i<gameModel.elevatingWalls[levelIndex].length; i++){
                // elevatingWalls[selectedLevel][i].update();
                showItem(gameModel.elevatingWalls[levelIndex][i], offsetX, offsetY, assets, false);
            }
            for(let i =0; i<gameModel.switches[levelIndex].length; i++){
            // switches[selectedLevel][i].update();
                showItem(gameModel.switches[levelIndex][i], offsetX, offsetY, assets, false);
            }
            showItem(gameModel.flag[levelIndex], offsetX, offsetY, assets, true);
        }
    }, 10); // 每 10ms 检查一次

    

    // showItem(gameModel.flag[levelIndex], offsetX, offsetY, assets);

    // // 显示钥匙
    // gameModel.keysItem[levelIndex].forEach((key) => {
    //     showItem(key, offsetX, offsetY, assets);
    // });

    // // 显示升降墙
    // gameModel.elevatingWalls[levelIndex].forEach((wall) => {
    //     showEntity(wall, offsetX, offsetY, assets);
    // });

    // // 显示开关
    // gameModel.switches[levelIndex].forEach((switchItem) => {
    //     showEntity(switchItem, offsetX, offsetY, assets);
    // });

    // // 显示旗帜

    
}

function showTerrain(entity, offsetX, offsetY, assets) {
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
        let coord2 = getDrawPosition(i, entity.levelIndex);
        image(
            assets.icon,
            coord2.x - offsetX, coord2.y - offsetY,
            CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            coord1.x, coord1.y,
            CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE
        );
    }
}

function showItem(entity, offsetX, offsetY, assets, isAnimated) {
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