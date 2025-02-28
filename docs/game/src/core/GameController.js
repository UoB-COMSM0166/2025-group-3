import MapLoader from "./MapLoader";
import { CONSTANT } from "./Utils";

// 用于所有关卡的控制和交互
export default class GameController {
    // properties
    gameModel;
    

    constructor(gameModel) { 
        this.gameModel = gameModel;
        this.gameModel.selectedLevel = 0;
    }

    // 读取地图文件到gameModel
    newGame() {
        let mapLoader = new MapLoader(this.gameModel, this.gameModel.selectedLevel); 
        mapLoader.loadGame();
        
        //console.log("GameController.newGame done");// 测试
        //console.log(this.gameModel);// 测试
    }
    
    // 控制猫移动, 相当于原来类里的update
    /* 猫实际坐标在猫图像正下方, 但是猫显示坐标在猫左侧半个身距处
       因此所有计算都向左偏移半个身距(-catW/2) */
    moveCapoo() {
        let selectedLevel = this.gameModel.selectedLevel;
        let newX = this.gameModel.cat[selectedLevel].x;
        let newY = this.gameModel.cat[selectedLevel].y;
        let catW = CONSTANT.CAT_WIDTH;
        let catH = CONSTANT.CAT_HEIGHT;

        // 判断猫是否入水(以最下边中心点计算), 重置回出生点
        if(this.inTrap(this.gameModel.cat[selectedLevel].x-catW/2, this.gameModel.cat[selectedLevel].y)){
            // 播放死亡音效等
            this.gameModel.cat[selectedLevel].x = this.gameModel.cat[selectedLevel].iniX;
            this.gameModel.cat[selectedLevel].y = this.gameModel.cat[selectedLevel].iniY;
            return;
        }

        if (this.gameModel.keys['ArrowLeft']) {
            newX -= this.gameModel.cat[selectedLevel].speed; 
        }
        if (this.gameModel.keys['ArrowRight']) {
            newX += this.gameModel.cat[selectedLevel].speed;
        }
        // 竖直移动, 仅用于垂直方向碰撞检测测试, 后续删除
        if (this.gameModel.keys['ArrowUp']) {
            newY -= this.gameModel.cat[selectedLevel].speed;
        }
        if (this.gameModel.keys['ArrowDown']) {
            newY += this.gameModel.cat[selectedLevel].speed;
        }

        // 检查玩家四条边界是否碰撞: 每条边取两个点

        // let left   = this.isColliding(newX, newY - catH/3) || this.isColliding(newX, newY - catH*2/3);  // 左边中间两个点
        // let right  = this.isColliding(newX + catW, newY - catH/3) || this.isColliding(newX + catW, newY - catH*2/3);  // 右边中间两个点
        // let top    = this.isColliding(newX + catW/3, newY - catH) || this.isColliding(newX + 2*catW/3, newY - catH) ;  // 上方中间两个点
        // let bottom = this.isColliding(newX + catW/3, newY) || this.isColliding(newX + 2*catW/3, newY);  // 下方中间两个点
        
        // 水平方向偏移半个身距(-catW/2), 并且竖直方向偏移一个脚底距离(-catH/10)
        /* 注意碰撞检测不可以阉割, 因为猫的大小>>图块大小 */

        let left   = this.isColliding(newX-catW/2, newY-catH/3-catH/10) // 左边中间两个点
            || this.isColliding(newX-catW/2, newY-catH*2/3-catH/10)
            || this.isColliding(newX-catW/2, newY-catH-catH/10);  // 左上角

        let right  = this.isColliding(newX+catW-catW/2, newY-catH/3-catH/10)  // 右边中间两个点
            || this.isColliding(newX+catW-catW/2, newY-catH*2/3-catH/10)
            || this.isColliding(newX+catW-catW/2, newY-catH-catH/10);  // 右上

        let top    = this.isColliding(newX+catW/3-catW/2, newY-catH-catH/10) // 上方中间两个点
            || this.isColliding(newX+2*catW/3-catW/2, newY-catH-catH/10) 
            || this.isColliding(newX-catW/2, newY-catH-catH/10)     //左上角
            || this.isColliding(newX+catW-catW/2, newY-catH-catH/10); //右上角

        let bottom = this.isColliding(newX+catW/3-catW/2, newY-catH/10) // 下方中间两个点
            || this.isColliding(newX+2*catW/3-catW/2, newY-catH/10)
            || this.isColliding(newX-catW/2, newY-catH/10) // 左下角
            || this.isColliding(newX+catW-catW/2, newY-catH/10);  // 右下角

        
        if( left || right || top || bottom){ // 测试
            console.log("碰撞了");
        }

        // 处理水平碰撞
        if (!left && !right) { 
            this.gameModel.cat[selectedLevel].x = newX; // 无碰撞可移动
        }
        // 处理垂直碰撞
        if (!top && !bottom) {
            this.gameModel.cat[selectedLevel].y = newY;
            //this.onGround = false; // 空中状态
        } else {
            // if (this.velocityY > 0) { // 只有下落时才会停在地面上
            //     this.onGround = true;
            // }
            // this.velocityY = 0; // 停止竖直速度
        }
    }

    // 计算给定坐标是否在碰撞层
    isColliding(px, py) {
        let selectedLevel = this.gameModel.selectedLevel;
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 碰撞检测：如果这个格子是碰撞体(非0), 返回 true
        return this.gameModel.coll[selectedLevel].data[tileIndex] !== 0;
    }


    // 计算是否碰到水
    inTrap(px, py){
        let selectedLevel = this.gameModel.selectedLevel;
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 碰撞检测：如果这个格子是水, 返回真
        return this.gameModel.trap[selectedLevel].data[tileIndex] !== 0;
    }
  
}