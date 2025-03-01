import MapLoader from "./MapLoader";
import { CONSTANT, Message } from "./Utils";

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
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;
        let newX = this.gameModel.cat[selectedLevel].x;
        let newY = this.gameModel.cat[selectedLevel].y;
        let catW = CONSTANT.CAT_WIDTH;
        let catH = CONSTANT.CAT_HEIGHT;

        // 判断猫是否入水(以最下边中心点计算), 重置回出生点
        if(this.inTrap(this.gameModel.cat[selectedLevel].x-catW/2, this.gameModel.cat[selectedLevel].y, 
            selectedLevel, tileSize, levelWidth)){
            // 播放死亡音效等

            let message1 = "Don't jump into water!"
            this.gameModel.messages.push(new Message(message1,width/2,4*height/5,3000,20,200,200,255,159,237));

            this.gameModel.cat[selectedLevel].x = this.gameModel.cat[selectedLevel].iniX;
            this.gameModel.cat[selectedLevel].y = this.gameModel.cat[selectedLevel].iniY;
            return;
        }

        // 计算猫是否处于攀爬墙位置(给予一个offSetClimb的差值, 确保不是在刚碰到攀爬梯子的边缘时就能攀爬)
        let offSetClimb = catW/4;  // 用于攀爬墙的水平偏移量
        let offSetFeet = catH/10; // 用于猫纵坐标的脚底距离偏移
        let catCanClimbY = this.canClimbY(this.gameModel.cat[selectedLevel].x-catW/2+offSetClimb, this.gameModel.cat[selectedLevel].y-offSetFeet, 
                selectedLevel, tileSize, levelWidth) // 左下角, 向上偏移一个脚底距离
            || this.canClimbY(this.gameModel.cat[selectedLevel].x+catW-catW/2-offSetClimb, this.gameModel.cat[selectedLevel].y-offSetFeet,
                selectedLevel, tileSize, levelWidth); // 右下角, 向上偏移一个脚底距离
        

        let catCanClimbX = this.canClimbX(this.gameModel.cat[selectedLevel].x-catW/2+offSetClimb, this.gameModel.cat[selectedLevel].y-offSetFeet, 
                selectedLevel, tileSize, levelWidth) // 左下角, 向上偏移一个脚底距离
            || this.canClimbX(this.gameModel.cat[selectedLevel].x+catW-catW/2-offSetClimb, this.gameModel.cat[selectedLevel].y-offSetFeet,
                selectedLevel, tileSize, levelWidth); // 右下角, 向上偏移一个脚底距离


        // 水平移动的按键控制
        if(!catCanClimbY){ // 攀爬到一半时不能水平移动
            if (this.gameModel.keys['ArrowLeft']) {
                newX -= this.gameModel.cat[selectedLevel].speed; 
            }
            if (this.gameModel.keys['ArrowRight']) {
                newX += this.gameModel.cat[selectedLevel].speed;
            }
        }
        
            
        // 攀爬墙 垂直移动的按键控制
        if(catCanClimbY || catCanClimbX){
            console.log("可以攀爬");
            if (this.gameModel.keys['ArrowUp']) {
                newY -= this.gameModel.cat[selectedLevel].speed;
            }
            if (this.gameModel.keys['ArrowDown']) {
                newY += this.gameModel.cat[selectedLevel].speed;
            }
        }


        // 跳跃, 仅用于测试, 后续删除
        // if (this.gameModel.keys[" "] && this.onGround) {
        //     this.gameModel.cat[selectedLevel].velocityY = this.gameModel.cat[selectedLevel].jumpStrength; // 赋予向上的初速度
        //     this.gameModel.cat[selectedLevel].onGround = false; // 进入空中
        // }
        // 不在攀爬墙上时需要施加重力, 确保向下落下
        if(!catCanClimbY && !catCanClimbX){
            this.gameModel.cat[selectedLevel].velocityY += this.gameModel.cat[selectedLevel].gravity; // 施加向下的重力加速度
            newY += this.gameModel.cat[selectedLevel].velocityY;
        }

        // 检查猫的四条边界是否碰撞: 每条边取两个点

        // let left   = this.isColliding(newX, newY - catH/3) || this.isColliding(newX, newY - catH*2/3);  // 左边中间两个点
        // let right  = this.isColliding(newX + catW, newY - catH/3) || this.isColliding(newX + catW, newY - catH*2/3);  // 右边中间两个点
        // let top    = this.isColliding(newX + catW/3, newY - catH) || this.isColliding(newX + 2*catW/3, newY - catH) ;  // 上方中间两个点
        // let bottom = this.isColliding(newX + catW/3, newY) || this.isColliding(newX + 2*catW/3, newY);  // 下方中间两个点
        
        // 水平方向偏移半个身距(-catW/2), 并且竖直方向偏移一个脚底距离(offSetFeet=-catH/10)
        /* 注意碰撞检测不可以阉割, 因为猫的大小>>图块大小 */

        let left   = this.isColliding(newX-catW/2, newY-catH/3-offSetFeet, selectedLevel, tileSize, levelWidth) // 左边中间两个点
            || this.isColliding(newX-catW/2, newY-catH*2/3-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX-catW/2, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth);  // 左上角

        let right  = this.isColliding(newX+catW-catW/2, newY-catH/3-offSetFeet, selectedLevel, tileSize, levelWidth)  // 右边中间两个点
            || this.isColliding(newX+catW-catW/2, newY-catH*2/3-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+catW-catW/2, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth);  // 右上

        let top    = this.isColliding(newX+catW/3-catW/2, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth) // 上方中间两个点
            || this.isColliding(newX+2*catW/3-catW/2, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth) 
            || this.isColliding(newX-catW/2, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth)     //左上角
            || this.isColliding(newX+catW-catW/2, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth); //右上角

        let bottom = this.isColliding(newX+catW/3-catW/2, newY-offSetFeet, selectedLevel, tileSize, levelWidth) // 下方中间两个点
            || this.isColliding(newX+2*catW/3-catW/2, newY-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX-catW/2, newY-offSetFeet, selectedLevel, tileSize, levelWidth) // 左下角
            || this.isColliding(newX+catW-catW/2, newY-offSetFeet, selectedLevel, tileSize, levelWidth);  // 右下角

        
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
            if(!catCanClimbY && !catCanClimbX){ // 不在攀爬墙上时, 重力生效
                this.gameModel.cat[selectedLevel].onGround = false; // 空中
            }
        } else if(bottom) { // 碰到地面
             if (this.gameModel.cat[selectedLevel].velocityY > 0) { // 在下落并且有碰撞地面时, 设置状态为在地上
                this.gameModel.cat[selectedLevel].onGround = true;
             }
             this.gameModel.cat[selectedLevel].velocityY = 0; // 碰到地面时停止竖直向下的速度
        }

        // 测试
        console.log("是否在地上: " + this.gameModel.cat[selectedLevel].onGround);
    }

    // 计算给定坐标是否在碰撞层
    isColliding(px, py, selectedLevel, tileSize, levelWidth){ 
        
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 碰撞检测：如果这个格子是碰撞体(非0), 返回 true
        return this.gameModel.coll[selectedLevel].data[tileIndex] !== 0;
    }


    // 计算是否碰到水
    inTrap(px, py, selectedLevel, tileSize, levelWidth){

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 检测：如果这个格子是水, 返回真
        return this.gameModel.trap[selectedLevel].data[tileIndex] !== 0;
    }

    // 计算是否在攀爬墙且没有到达边界, 此时只能垂直移动不能水平移动
    canClimbY(px, py, selectedLevel, tileSize, levelWidth){

        // 传递的坐标所处的格子行列和索引
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 这个格子的正上方格子的索引
        let tileIndexUp = (row-1) * levelWidth[selectedLevel] + col;
        // 这个格子的正下方格子的索引
        let tileIndexDown = (row+1) * levelWidth[selectedLevel] + col;

        let flag = this.gameModel.climb[selectedLevel].data[tileIndex] !== 0; // 这个格子是攀爬墙
        let flagUp = this.gameModel.climb[selectedLevel].data[tileIndexUp] !== 0; // 这个格子上方是攀爬墙
        let flagDown = this.gameModel.climb[selectedLevel].data[tileIndexDown] !== 0; // 这个格子下方是攀爬墙

        return flag && flagUp && flagDown;
        //return this.gameModel.climb[selectedLevel].data[tileIndex] !== 0;
    }

    // 计算是否在攀爬墙边界处, 此时可以水平和垂直移动
    canClimbX(px, py, selectedLevel, tileSize, levelWidth){
        // 传递的坐标所处的格子行列和索引
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 这个格子的正上方格子的索引
        let tileIndexUp = (row-1) * levelWidth[selectedLevel] + col;
        // 这个格子的正下方格子的索引
        let tileIndexDown = (row+1) * levelWidth[selectedLevel] + col;

        let flag = this.gameModel.climb[selectedLevel].data[tileIndex] !== 0; // 这个格子是攀爬墙
        let flagUp = this.gameModel.climb[selectedLevel].data[tileIndexUp] !== 0; // 这个格子上方是攀爬墙
        let flagDown = this.gameModel.climb[selectedLevel].data[tileIndexDown] !== 0; // 这个格子下方是攀爬墙

        return (flag && !flagUp) || (flag && !flagDown);

    }
  
}
