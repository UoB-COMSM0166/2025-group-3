import { CONSTANT } from '../core/Utils.js';
import CollideBrick from '../entities/terrain/CollideBrick.js';

export function getTilePosition(i) {
    i--; // 此地图导出json后坐标从2开始(原因未知?), 需调整为1
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
    let offsetX = 0;
    let offsetY = 0;

    const checkDataLoaded = setInterval(() => {
        if (gameModel.coll.length > 0) { // 确保数据已经加载
            console.log("数据已加载:", gameModel.coll[0]);
            clearInterval(checkDataLoaded); // 停止轮询
            showEntity(gameModel.coll[levelIndex], offsetX, offsetY, assets);
            console.log("showCollideBrick done");
        }
    }, 1000); // 每 100ms 检查一次
    // 显示碰撞砖块

    // // 显示装饰砖块
    // gameModel.decorate[levelIndex].forEach((brick) => {
    //     showEntity(brick, offsetX, offsetY, assets);
    // });
    // console.log("showDecorateBrick done");

    // // 显示陷阱
    // gameModel.trap[levelIndex].forEach((trap) => {
    //     showEntity(trap, offsetX, offsetY, assets);
    // });
    // console.log("showTrap done");

    // // 显示冰块
    // gameModel.ice[levelIndex].forEach((ice) => {
    //     showEntity(ice, offsetX, offsetY, assets);
    // });
    // console.log("showIce done");

    // // 显示弹簧
    // gameModel.spring[levelIndex].forEach((spring) => {
    //     showEntity(spring, offsetX, offsetY, assets);
    // });
    // console.log("showSpring done");

    // // 显示钥匙
    // gameModel.keysItem[levelIndex].forEach((key) => {
    //     showEntity(key, offsetX, offsetY, assets);
    // });
    // console.log("showKey done");

    // // 显示升降墙
    // gameModel.elevatingWalls[levelIndex].forEach((wall) => {
    //     showEntity(wall, offsetX, offsetY, assets);
    // });
    // console.log("showElevatingWall done");

    // // 显示开关
    // gameModel.switches[levelIndex].forEach((switchItem) => {
    //     showEntity(switchItem, offsetX, offsetY, assets);
    // });
    // console.log("showSwitch done");

    // // 显示旗帜
    // showEntity(gameModel.flag[levelIndex], offsetX, offsetY, assets);
    // console.log("showFlag done");

    // // 显示玩家
    // showEntity(gameModel.player[levelIndex], offsetX, offsetY, assets);
    // console.log("showPlayer done");
}

function showEntity(entity, offsetX, offsetY, assets) {
    if (!entity) {
        console.log("!!!!!noentitey!!!!!");
        return;
    }
    console.log("showEntity");
    console.log(entity);

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