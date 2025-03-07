import * as RenderLogic from './RenderLogic.js';
import { CONSTANT, GAME_STATE, Message} from "../core/Utils.js";
import { showItem, showTerrain } from "./RenderLogic.js";

export default class GameView {
    constructor(gameModel) {
        this.gameModel = gameModel;
        this.assets = this.gameModel.assets;
        this.img = this.gameModel.assets.rightArrow;
        this.titleMessage = new Message("Capoo", window.innerWidth / 2, window.innerHeight / 5-50, 10000, 200, {}, "Title"); // 标题消息
        this.enterMessage = new Message("Press ENTER To Start", window.innerWidth / 2, window.innerHeight/1.5, 10000, 50, { scaling: true }, "startScreen"); // 动态变化大小的消息
        this.selectMessage = new Message("Use LEFT/RIGHT To Choose\nPress SPACE To Start", window.innerWidth / 2, window.innerHeight / 5-10, 10000, 50, {}, "levelSelectScreen");
        this.tipMessage = new Message("Tip：Do you konw:\nA cat always lands with its feet down\nBread always lands on the creamed side", window.innerWidth / 2, window.innerHeight / 1.2, 1500, 30, {changeAlpha: true}, "Tip");
    
        this.startScreenClouds = [ // 初始化开始界面的云朵
            { img: window.assets.startscreenbg_cloud1, x: 0, y: 560, speed: 1.4, scale: 2 },
            { img: window.assets.startscreenbg_cloud2, x: 1000, y: 600, speed: 1, scale: 2 },
            { img: window.assets.startscreenbg_cloud3, x: 900, y: 300, speed: 2.4, scale: 1.7 },
            { img: window.assets.startscreenbg_cloud2, x: 150, y: 570, speed: 1.3, scale: 2 },
            { img: window.assets.startscreenbg_cloud1, x: 860, y: 400, speed: 1.7, scale: 2.1 },
            { img: window.assets.startscreenbg_cloud2, x: 2000, y: 630, speed: 2, scale: 2 },
            { img: window.assets.startscreenbg_cloud1, x: 1200, y: 210, speed: 2.3, scale: 2.2 },
            { img: window.assets.startscreenbg_cloud3, x: 700, y: 400, speed: 2.4, scale: 1.8 },
            { img: window.assets.startscreenbg_cloud4, x: 10, y: 40, speed: 2, scale: 1.2 },
            { img: window.assets.startscreenbg_cloud4, x: 60, y: 320, speed: 1.6, scale: 1.5 },
        ];

        this.selectScreenClouds = [ 
            { img: window.assets.selectscreenbg_cloud4, x: 0, y: 560, speed: 1.4, scale: 1.2 },
            { img: window.assets.selectscreenbg_cloud4, x: 300, y: 390, speed: 1, scale: 1.1 },
            { img: window.assets.selectscreenbg_cloud2, x: 20, y: 240, speed: 2, scale: 1.3 },
            { img: window.assets.selectscreenbg_cloud4, x: 860, y: 500, speed: 1.7, scale: 1 },
            { img: window.assets.selectscreenbg_cloud2, x: 1000, y: 390, speed: 2.3, scale: 1 },
            { img: window.assets.selectscreenbg_cloud2, x: 1900, y: 340, speed: 2.1, scale: 1.7 },
            { img: window.assets.selectscreenbg_cloud4, x: 1400, y: 560, speed: 1.8, scale: 1.6 },
            { img: window.assets.selectscreenbg_cloud2, x: 700, y: 720, speed: 1.5, scale: 1.3 },
        ];
    }

    // main function of GameView
    render() {
        //console.log('Current game state:', this.gameModel.gameState);

        const stateHandlers = {
            [GAME_STATE.START]: this.drawStartScreen.bind(this),
            [GAME_STATE.LEVEL_SELECT]: this.drawLevelSelectScreen.bind(this),
            [GAME_STATE.PLAYING]: this.drawGameScreen.bind(this),
            [GAME_STATE.LEVEL_COMPLETE]: this.drawLevelCompleteScreen.bind(this),
            [GAME_STATE.GAME_OVER]: this.drawGameOverScreen.bind(this),
        };
        if (stateHandlers[this.gameModel.gameState]) {
            stateHandlers[this.gameModel.gameState]();
        } else {
            console.log("Unknown State");
        }
    }


    drawStartScreen() {
        
        //background(173, 216, 230);
        image(window.assets.startscreenbg, 0, 0, window.innerWidth, window.innerHeight);

        // 绘制和更新云朵
        for (let cloud of this.startScreenClouds) {
            if (cloud.img) {  
                let w = cloud.img.width * cloud.scale; //  按 scale 缩放宽度
                let h = cloud.img.height * cloud.scale; //  按 scale 缩放高度
        
                image(cloud.img, cloud.x, cloud.y, w, h); // 传入缩放后的宽高
                cloud.x -= cloud.speed; //  让云朵向左移动
        
                //  如果云朵完全离开屏幕左侧，就从右侧重新出现
                if (cloud.x + w < 0) { 
                    cloud.x = window.innerWidth; // 让它从屏幕右侧重新进入
                }
            }
        }

        this.enterMessage.show();
        this.titleMessage.show();
    }




    drawLevelSelectScreen() {
        
        //console.log("GameView level gameModel: ");
        //console.log(this.gameModel);
        background(255, 182, 193);
        image(window.assets.selectscreenbg, 0, 0, windowWidth, windowHeight);

        // 绘制和更新云朵
        for (let cloud of this.selectScreenClouds) {
            if (cloud.img) {  
                let w = cloud.img.width * cloud.scale; //  按 scale 缩放宽度
                let h = cloud.img.height * cloud.scale; //  按 scale 缩放高度
        
                image(cloud.img, cloud.x, cloud.y, w, h); // 传入缩放后的宽高
                cloud.x -= cloud.speed; //  让云朵向左移动
        
                //  如果云朵完全离开屏幕左侧，就从右侧重新出现
                if (cloud.x + w < 0) { 
                    cloud.x = window.innerWidth; // 让它从屏幕右侧重新进入
                }
            }
        }

        this.selectMessage.show();
        this.tipMessage.show();

        for (let i = 0; i < CONSTANT.LEVEL_LIST.length; i++) {
            let size = 60;
            let x = width / 2 - (CONSTANT.LEVEL_LIST.length * size) / 2 + i * size;
            let y = height / 2;
            if (i === this.gameModel.selectedLevel) {
                fill(152, 255, 152);
                strokeWeight(3);
                stroke(255, 255, 255); // color when selected
            } else {
                fill(200, 200, 200);
                strokeWeight(3);
                stroke(255, 255, 255);
            }
            rect(x, y, size, size, 10); // draw buttons
            fill(0, 0, 0);
            textSize(26);
            text(CONSTANT.LEVEL_LIST[i], x + size / 2, y + size / 2);
        }
    }

    drawGameScreen() {
        // 显示实体
        //RenderLogic.showEntities(this.gameModel, this.assets);
        //console.log("GameView render done");
        let gameModel = this.gameModel;
        let assets = this.assets;
        let levelIndex = gameModel.selectedLevel;
        let levelWidth = gameModel.levelWidth[gameModel.selectedLevel]; // 当前关卡的宽度
        let offsetX = gameModel.cat[levelIndex].x - window.innerWidth / 2;
        let offsetY = gameModel.cat[levelIndex].y - window.innerHeight / 2;
        //console.log("地图宽度:", levelWidth);
        //console.log("数据已加载:", gameModel.coll[0]);
        //clearInterval(checkDataLoaded); // 停止轮询
        if(levelIndex == 0){
            image(gameModel.assets.level1bg, 0, 0, windowWidth, windowHeight * 5 / 4);
        }else if(levelIndex == 1){
            image(gameModel.assets.level2bg, 0, 0, windowWidth, windowHeight * 5 / 4);
        }
        image(gameModel.assets.level2bg, 0, 0, windowWidth, windowHeight * 5 / 4);
        
        for(let i =0; i<gameModel.elevatingWalls[levelIndex].length; i++){
            // elevatingWalls[selectedLevel][i].update();
            showItem(gameModel.elevatingWalls[levelIndex][i], offsetX, offsetY, assets, false);
        } // 机关墙需要显示在碰撞层下面,因此先加载
        showTerrain(gameModel.coll[levelIndex], offsetX, offsetY, assets, levelWidth);
        showTerrain(gameModel.decorate[levelIndex], offsetX, offsetY, assets, levelWidth);
        showTerrain(gameModel.trap[levelIndex], offsetX, offsetY, assets, levelWidth);
        showTerrain(gameModel.water[levelIndex], offsetX, offsetY, assets, levelWidth);
        showTerrain(gameModel.ice[levelIndex], offsetX, offsetY, assets, levelWidth);
        showTerrain(gameModel.climb[levelIndex], offsetX, offsetY, assets, levelWidth);
        showTerrain(gameModel.spring[levelIndex], offsetX, offsetY, assets, levelWidth);   
        if(gameModel.merge[levelIndex].visible){
            showTerrain(gameModel.merge[levelIndex], offsetX, offsetY, assets, levelWidth);      
        }     
        for(let i =0; i<gameModel.keysItem[levelIndex].length; i++){
            if(gameModel.keysItem[levelIndex][i].visible){
                showItem(gameModel.keysItem[levelIndex][i], offsetX, offsetY, assets, true);
            }
        }
        for(let i =0; i<gameModel.switches[levelIndex].length; i++){
        // switches[selectedLevel][i].update();
            showItem(gameModel.switches[levelIndex][i], offsetX, offsetY, assets, false);
        }
        if(gameModel.flag[levelIndex].visible){
            showItem(gameModel.flag[levelIndex], offsetX, offsetY, assets, true);
        }
        //    gameModel.potion.updatePotion(gameModel.potion.x-gameModel.cat[levelIndex].x,gameModel.potion.y-gameModel.cat[levelIndex].y);
        
        //console.log("tag:potion",gameModel.potion.x,gameModel.cat[levelIndex].x,gameModel.potion.y,gameModel.cat[levelIndex].y,PotionX,PotionY);
        //gameModel.potion.updatePotion(1000,1000);
        image(gameModel.assets.teachCommand, 0, 0, 1920/5, 1080/5);
        let keyshi = RenderLogic.getTilePosition(429), keykong = RenderLogic.getTilePosition(430);
        if(this.gameModel.cat[levelIndex].keyNum == 0){
            image(
                assets.icon,
                window.innerHeight/10 - 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keykong.x, keykong.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keykong.x, keykong.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10 + 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keykong.x, keykong.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
        }
        if(this.gameModel.cat[levelIndex].keyNum == 1){
            image(
                assets.icon,
                window.innerHeight/10 - 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keyshi.x, keyshi.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keykong.x, keykong.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10 + 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keykong.x, keykong.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
        }
        if(this.gameModel.cat[levelIndex].keyNum == 2){
            image(
                assets.icon,
                window.innerHeight/10 - 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keyshi.x, keyshi.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keyshi.x, keyshi.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10 + 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keykong.x, keykong.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
        }
        if(this.gameModel.cat[levelIndex].keyNum == 3){
            image(
                assets.icon,
                window.innerHeight/10 - 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keyshi.x, keyshi.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keyshi.x, keyshi.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
            image(
                assets.icon,
                window.innerHeight/10 + 50, window.innerWidth/8,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
                keyshi.x, keyshi.y,
                CONSTANT.TILE_SIZE, CONSTANT.TILE_SIZE,
            );
        }


        // 显示所有提示消息
        for (let i = 0; i < this.gameModel.messages.length; i++) {
            this.gameModel.messages[i].show();
        }
        // 删除已过期的第一条消息
        for (let i = this.gameModel.messages.length - 1; i >= 0; i--) {
            if (this.gameModel.messages[i].isExpired()) {
                // 延迟删除消息，避免频繁渲染
                setTimeout(() => {
                    this.gameModel.messages.splice(i, 1); // 删除消息
                }, 10);
            }
        }
    }

    drawGameOverScreen() {}

    drawLevelCompleteScreen() { // 仅测试, 待修改
        let width = window.innerWidth;
        let height = window.innerHeight;
        background(123, 180, 145);
        //...这里插入关卡选择背景图片
        textAlign(CENTER, CENTER);
        textSize(26);
        fill(0, 0, 0);
        strokeWeight(3);
        stroke(255, 255, 255);
        text("Level Complete!", width/2, height/2 - 50);
        textSize(20);
        strokeWeight(2);
        text("Press ANY KEY for next level", width/2, height/2 +50);
        text("Press ESC to return to level select", width/2, height/2 +100);
    }
}