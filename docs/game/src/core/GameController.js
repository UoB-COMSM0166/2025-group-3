import MapLoader from "./MapLoader";
import { CONSTANT, Message } from "./Utils";
import Potion from "../entities/characters/Potion";
import {setShowBack,setShowPotion,PotionX,PotionY,setFacingLeft,setFacingRight} from "../core/Utils";
//import { assets } from "../main";

// 用于所有关卡的控制和交互

/*  
    已解决碰撞时误判的bug
    地图新增一个ground层, 该层不显示在游戏中, 仅用于检测真正的上下边碰撞
*/

export default class GameController {
    // properties
    gameModel;
    

    constructor(gameModel) { 
        this.gameModel = gameModel;
        this.gameModel.selectedLevel = 0;
    }

    // 读取地图文件到gameModel
    newGame() {
        this.gameModel.assets.startscreenbg = loadImage("/asset/startscreenbg.png")
        let mapLoader = new MapLoader(this.gameModel, this.gameModel.selectedLevel); 
        mapLoader.loadGame();
        
        //console.log("GameController.newGame done");// 测试
        //console.log(this.gameModel);// 测试
    }
    
    // 控制猫的坐标移动, 以及遍历所有交互, 相当于原来类里的update
    moveCapoo() {
        let selectedLevel = this.gameModel.selectedLevel;
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;
        let newX = this.gameModel.cat[selectedLevel].x;
        let newY = this.gameModel.cat[selectedLevel].y;
        let catW = CONSTANT.CAT_WIDTH;
        let catH = CONSTANT.CAT_HEIGHT;
        let offSetHalf = -catW/2; /* 猫实际坐标在猫图像正下方, 但是猫显示坐标在猫左侧半个身距处
                                    因此所有计算都向左偏移半个身距(-catW/2) */
        let offSetFeet = catH/10; /* 用于猫纵坐标的脚底距离偏移 */
        
        /* ------------------和所有对象层的交互----------------- */

        // 检查是否按下R键重置位置
        if (this.gameModel.keys['r'] || this.gameModel.keys['R']) {
            window.assets.death.play();
            let message1 = "Restarting level...";
            this.gameModel.messages.push(new Message(message1, width/2, 4*height/5, 2000, 30, {}, "restart"));
            this.reLife();
            return;
        }

        // 检查是否碰到钥匙
        this.getkey(this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y, selectedLevel); 

        // 钥匙满时, flag设置为显示
        if(this.gameModel.cat[selectedLevel].keyNum == this.gameModel.keysItem[selectedLevel].length){
            //console.log("旗子显示");
            this.gameModel.flag[selectedLevel].visible = true;
        }

        /* ------------------和所有碰撞层的交互----------------- */

        // 控制黄油分离  待完成
        // 按X键分离
        

        // if(this.gameModel.keys['h']||this.gameModel.keys['H']){
        //     this.gameModel.potion.setPotionPosition(100,100);       
        //  }



        // 判断猫是否入水(以最下边中心点计算), 重置回出生点
        if(this.inWater(this.gameModel.cat[selectedLevel].x-catW/2, this.gameModel.cat[selectedLevel].y, 
            selectedLevel, tileSize, levelWidth)){

            window.assets.death.play();

            let message1 = "Cats dissolve easily in water!"
            this.gameModel.messages.push(new Message(message1,width/2,4*height/5,2000,30,{},"death"));

            this.reLife();
            return;
        }


        

        
        // 判断猫是否碰到陷阱(上下边分別检测两个点), 重置回出生点
        let offSetTrapped = catW/4;
        let beTrapedUp = this.beTraped(this.gameModel.cat[selectedLevel].x-offSetTrapped, this.gameModel.cat[selectedLevel].y-catH, 
            selectedLevel, tileSize, levelWidth)
            ||this.beTraped(this.gameModel.cat[selectedLevel].x+offSetTrapped, this.gameModel.cat[selectedLevel].y-catH, 
                selectedLevel, tileSize, levelWidth);
        let beTrapedBottom = this.beTraped(this.gameModel.cat[selectedLevel].x-offSetTrapped, this.gameModel.cat[selectedLevel].y-offSetFeet*2, 
            selectedLevel, tileSize, levelWidth) 
            || this.beTraped(this.gameModel.cat[selectedLevel].x+offSetTrapped, this.gameModel.cat[selectedLevel].y-offSetFeet*2, 
                selectedLevel, tileSize, levelWidth);
        if(beTrapedUp || beTrapedBottom){
            
            window.assets.death.play();

            let message1 = "You are trapped!"
            this.gameModel.messages.push(new Message(message1,width/2,4*height/5,2000,30,{},"death"));

            this.reLife();
            return;
        }


        // 计算猫是否处于攀爬墙位置(给予一个offSetClimb的差值, 确保不是在刚碰到攀爬梯子的边缘时就能攀爬)
        let offSetClimb = catW/4;  // 用于攀爬墙的水平偏移量
        
        let catCanClimb = this.canClimb(this.gameModel.cat[selectedLevel].x+offSetHalf+offSetClimb, this.gameModel.cat[selectedLevel].y-offSetFeet, 
            selectedLevel, tileSize, levelWidth) // 左下角, 向上偏移一个脚底距离
        || this.canClimb(this.gameModel.cat[selectedLevel].x+catW+offSetHalf-offSetClimb, this.gameModel.cat[selectedLevel].y-offSetFeet,
            selectedLevel, tileSize, levelWidth); // 右下角, 向上偏移一个脚底距离


        // 计算是否弹簧床(取下方中点, 和左右1/5点)
        let offSetSpring = catW/5;
        let catUseSpring = this.canUseSpring(this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y-offSetFeet,
            selectedLevel, tileSize, levelWidth)
            || this.canUseSpring(this.gameModel.cat[selectedLevel].x + offSetSpring, this.gameModel.cat[selectedLevel].y-offSetFeet,
                selectedLevel, tileSize, levelWidth)
            || this.canUseSpring(this.gameModel.cat[selectedLevel].x - offSetSpring, this.gameModel.cat[selectedLevel].y-offSetFeet,
                selectedLevel, tileSize, levelWidth);
        if(catUseSpring){ // 给一个向上的加速度
            //console.log("弹簧床");
            window.assets.spring.play();
            //this.gameModel.cat[selectedLevel].velocityY = Math.abs(this.gameModel.cat[selectedLevel].velocityY) * 0.2;
            this.gameModel.cat[selectedLevel].velocityY = this.gameModel.cat[selectedLevel].jumpStrength * 2; // 赋予向上的初速度
            this.gameModel.cat[selectedLevel].onGround = false; // 进入空中
        }

        // 水平移动的按键控制
        if (this.gameModel.keys['ArrowLeft']) {
            newX -= this.gameModel.cat[selectedLevel].speed; 
            setFacingLeft();
        }
        if (this.gameModel.keys['ArrowRight']) {
            newX += this.gameModel.cat[selectedLevel].speed;
            setFacingRight();
        }
            
        // 攀爬墙 垂直移动的按键控制
        if(catCanClimb){
            if (this.gameModel.keys['ArrowUp']) {
                newY -= this.gameModel.cat[selectedLevel].speed;
            }
            if (this.gameModel.keys['ArrowDown']) {
                newY += this.gameModel.cat[selectedLevel].speed;
            }
        }

        // 合体时按空格可以持续向上飞
        if(this.gameModel.keys[" "] && this.gameModel.cat[selectedLevel].isMerged){
            this.gameModel.cat[selectedLevel].velocityY = this.gameModel.cat[selectedLevel].jumpStrength; // 赋予向上的初速度
            this.gameModel.cat[selectedLevel].onGround = false; // 进入空中
        }

        

        // 不在攀爬墙上时需要施加重力, 确保向下落下
        if(!catCanClimb){
            this.gameModel.cat[selectedLevel].velocityY += this.gameModel.cat[selectedLevel].gravity; // 施加向下的重力加速度
            newY += this.gameModel.cat[selectedLevel].velocityY;
        }

        // 检查猫的四条边界是否碰撞: 每条边取至少三个点
        /* 水平方向偏移半个身距(-catW/2), 并且竖直方向偏移一个脚底距离(offSetFeet=-catH/10)
           注意碰撞检测不可以阉割, 因为猫的大小>>图块大小, 减少检测点会导致卡墙里 */

        let left   = this.isColliding(newX+offSetHalf, newY-catH/3-offSetFeet, selectedLevel, tileSize, levelWidth) // 左边中间两个点
            || this.isColliding(newX+offSetHalf, newY-catH*2/3-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth) // 左上角
            || this.isColliding(newX+offSetHalf, newY-offSetFeet*3/2, selectedLevel, tileSize, levelWidth);  // 左下角向上一点

        let right  = this.isColliding(newX+catW+offSetHalf, newY-catH/3-offSetFeet, selectedLevel, tileSize, levelWidth)  // 右边中间两个点
            || this.isColliding(newX+catW+offSetHalf, newY-catH*2/3-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+catW+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth) // 右上
            || this.isColliding(newX+catW+offSetHalf, newY-offSetFeet*3/2, selectedLevel, tileSize, levelWidth);  //右下角向上一点

        let topOffset = catH/5; // 只用于top的偏移量,相当于加上罐子高度, 因为碰到顶的时候必有罐子在身上
        let top    = this.isCollidingWithGround(newX+catW/3+offSetHalf, newY-catH-offSetFeet-topOffset, selectedLevel, tileSize, levelWidth) // 上方中间两个点
            || this.isCollidingWithGround(newX+2*catW/3+offSetHalf, newY-catH-offSetFeet-topOffset, selectedLevel, tileSize, levelWidth) 
            || this.isCollidingWithGround(newX+offSetHalf, newY-catH-offSetFeet-topOffset, selectedLevel, tileSize, levelWidth)     //左上角
            || this.isCollidingWithGround(newX+catW+offSetHalf, newY-catH-offSetFeet-topOffset, selectedLevel, tileSize, levelWidth); //右上角

        let bottom = this.isCollidingWithGround(newX+catW/3+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth) // 下方中间两个点
            || this.isCollidingWithGround(newX+2*catW/3+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isCollidingWithGround(newX+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth) // 左下角
            || this.isCollidingWithGround(newX+catW+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth);  // 右下角
        
        // 真正的顶部碰撞: 新位置碰撞top且新位置上方也碰撞top, 并且角色不在下落状态中
        let topUp = this.isColliding(newX+catW/3+offSetHalf, newY-catH-offSetFeet-70-topOffset, selectedLevel, tileSize, levelWidth) // 上方中间两个点
        || this.isColliding(newX+2*catW/3+offSetHalf, newY-catH-offSetFeet-70-topOffset, selectedLevel, tileSize, levelWidth) 
        || this.isColliding(newX+offSetHalf, newY-catH-offSetFeet-70-topOffset, selectedLevel, tileSize, levelWidth)     //左上角
        || this.isColliding(newX+catW+offSetHalf, newY-catH-offSetFeet-70-topOffset, selectedLevel, tileSize, levelWidth); //右上角

        let topReal = top && topUp && (this.gameModel.cat[selectedLevel].velocityY <= 0 || catCanClimb);

        // 真正的底部碰撞: 新位置bottom且新位置下方也碰撞bottom, 并且角色不在上升状态中
        let bottomDown = this.isColliding(newX+catW/3+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth) // 下方中间两个点
            || this.isColliding(newX+2*catW/3+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth) // 左下角
            || this.isColliding(newX+catW+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth);  // 右下角

        let bottomReal = bottom && bottomDown && ( this.gameModel.cat[selectedLevel].velocityY >= 0 || catCanClimb);

        //console.log(top + "|"+ topUp + "|"+ topReal + "||" +bottom + "|"+ bottomDown + "|"+ bottomReal);

        //console.log(right + "|"+ left + "||" + topReal + "|"+ bottomReal);

        // 处理水平碰撞
        if (!left && !right) { 
            this.gameModel.cat[selectedLevel].x = newX; // 无碰撞可移动
        } 

        // 处理垂直碰撞
        if (topReal) { // 碰到天花板时给一个轻微反弹, 防止角色停滞
            this.gameModel.cat[selectedLevel].velocityY = Math.abs(this.gameModel.cat[selectedLevel].velocityY) * 0.2; 
        }        
        else if (!topReal && !bottomReal) { // 没有上方和下方碰撞时, 竖直方向自由落体
            this.gameModel.cat[selectedLevel].y = newY;
            if(!catCanClimb){ // 不在攀爬墙上时, 重力生效
                this.gameModel.cat[selectedLevel].onGround = false; // 空中
            }
        } else if(bottomReal) { // 碰到地面
             if (this.gameModel.cat[selectedLevel].velocityY > 0) { // 在下落并且有碰撞地面时, 设置状态为在地上
                this.gameModel.cat[selectedLevel].onGround = true;
                //this.gameModel.cat[selectedLevel].velocityY = -this.gameModel.cat[selectedLevel].velocityY * 0.1; // 轻微反弹，而不是完全清零
             }
             this.gameModel.cat[selectedLevel].velocityY = 0; // 碰到地面时停止竖直向下的速度
        }

        // 测试
        //console.log("是否在地上: " + this.gameModel.cat[selectedLevel].onGround);
    }

    //Potion移动逻辑
    movePotion() {
        let selectedLevel = this.gameModel.selectedLevel;
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;
        let newX = this.gameModel.potion.x;
        let newY = this.gameModel.potion.y;
        let potionW = CONSTANT.POTION_WIDTH;  // 需要定义 POTION_WIDTH
        let potionH = CONSTANT.POTION_HEIGHT; // 需要定义 POTION_HEIGHT
        let offSetHalf = -potionW / 2;
        let offSetFeet = potionH / 2; 
        let isOnIce=false;
    
        // 水平方向偏移量
        let offSetClimb = potionW / 4;
        this.gameModel.potion.updatePotion(this.gameModel.cat[selectedLevel].x,this.gameModel.cat[selectedLevel].y);
        
        // 判断罐子是否碰到水，如果碰到水则重置生命
        if(!this.gameModel.cat[selectedLevel].isMerged && 
           this.inWater(this.gameModel.potion.x, this.gameModel.potion.y, selectedLevel, tileSize, levelWidth)){
            window.assets.death.play();
            let message = "No water with my pot！";
            this.gameModel.messages.push(new Message(message, width/2, 4*height/5, 2000, 30, {}, "death"));
            this.reLife();
            return;
        }

        // 判断猫是否在冰上
        if(this.beIced(this.gameModel.potion.x, this.gameModel.potion.y+offSetFeet, 
            selectedLevel, tileSize, levelWidth) && !this.gameModel.cat[selectedLevel].isMerged){
            isOnIce=true;
        }else{
            isOnIce=false;
        }


        if((this.gameModel.keys["a"] || this.gameModel.keys["d"]) && !this.gameModel.cat[selectedLevel].isMerged && isOnIce){
            let message1 = "Ice! Pot can't jump!"
            this.gameModel.messages.push(new Message(message1,width/2,4*height/5,2000,30,{},"No Jump"));
        }
        
        //检测是否可以合体
        if(Math.abs(newX-this.gameModel.cat[selectedLevel].x)<100 && Math.abs(newY-this.gameModel.cat[selectedLevel].y)<100 && this.gameModel.flagp>50){
            this.gameModel.cat[selectedLevel].isMerged = true;
            setShowBack(true);
            setShowPotion(false);
            this.gameModel.flagp=0;
        }
        
        if(!this.gameModel.cat[selectedLevel].isMerged && this.gameModel.flagp<60){
            this.gameModel.flagp++;
        }    //用来屏蔽黄油刚开始分开的时候
     

        if(this.gameModel.cat[selectedLevel].isMerged 
            && (this.gameModel.keys['s']||this.gameModel.keys['S'])&& this.gameModel.flagp<60){
                this.gameModel.cat[selectedLevel].isMerged = false;

                // 修改spinelayer, 猫和黄油分开渲染
                this.gameModel.potion.x=this.gameModel.cat[selectedLevel].x;
                // 黄油分离时初始位置向上偏移，避免立即碰撞检测
                this.gameModel.potion.y=this.gameModel.cat[selectedLevel].y;
                // 给黄油一个向上的初速度
                this.gameModel.potion.velocityY = -10;
                this.gameModel.potion.speed =0; // 减小水平初速度
                this.gameModel.potion.tanshe = false;
                setShowBack(false);
                setShowPotion(true); 
        }


        if ((this.gameModel.keys['A']||this.gameModel.keys['a']) && this.gameModel.potion.tanshe && !isOnIce && !this.gameModel.cat[selectedLevel].isMerged ) {     
            // 如果能左弹射且按下a键
            if (this.gameModel.potion.canShootLeft) {
                // 检查弹射起始位置
                if (this.gameModel.cat[selectedLevel].isMerged) {
                    // 合体状态：从猫的位置弹射
                    this.gameModel.cat[selectedLevel].isMerged = false;
                    this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
                    this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y - 30;
                    setShowBack(false);
                    setShowPotion(true);
                } else {
                    // 分离状态：从potion当前位置弹射，保持当前位置不变
                    // 不需要修改potion的位置
                }
                
                // 设置速度和状态变量
                this.gameModel.potion.speed = -10; // 减小水平初速度
                this.gameModel.potion.velocityY = -15; // 减小竖直初速度
                this.gameModel.potion.gravityScale = 0.4; // 大幅降低重力比例
                this.gameModel.potion.tanshe = false; // 禁用弹射状态直到下次碰撞
                this.gameModel.potion.onWall = false; // 弹射时重置墙上状态
                this.gameModel.potion.onGround = false; // 弹射时重置地面状态
                this.gameModel.potion.wallFrameCount = 0; // 重置墙上帧计数
            }
        }

        if ((this.gameModel.keys['D']||this.gameModel.keys['d']) && this.gameModel.potion.tanshe && !isOnIce && !this.gameModel.cat[selectedLevel].isMerged) {
            // 如果能右弹射且按下d键
            if (this.gameModel.potion.canShootRight) {
                // 检查弹射起始位置
                if (this.gameModel.cat[selectedLevel].isMerged) {
                    // 合体状态：从猫的位置弹射
                    this.gameModel.cat[selectedLevel].isMerged = false;
                    this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
                    this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y - 30;
                    setShowBack(false);
                    setShowPotion(true);
                } else {
                    // 分离状态：从potion当前位置弹射，保持当前位置不变
                    // 不需要修改potion的位置
                }
                
                // 设置速度和状态变量
                this.gameModel.potion.speed = 10; // 减小水平初速度
                this.gameModel.potion.velocityY = -15; // 减小竖直初速度
                this.gameModel.potion.gravityScale = 0.4; // 大幅降低重力比例
                this.gameModel.potion.tanshe = false; // 禁用弹射状态直到下次碰撞
                this.gameModel.potion.onWall = false; // 弹射时重置墙上状态
                this.gameModel.potion.onGround = false; // 弹射时重置地面状态
                this.gameModel.potion.wallFrameCount = 0; // 重置墙上帧计数
            }
        }

        if (this.gameModel.cat[selectedLevel].isMerged) {
            // 如果结合，面包跟随猫的位置
            this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
            this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y-30;
            this.gameModel.potion.tanshe = true; // 在猫身上时可以弹射
            
            // 合体状态下，可以向两个方向弹射
            this.gameModel.potion.canShootLeft = true;
            this.gameModel.potion.canShootRight = true;
        } 
        else {
            // 简化的碰撞检测函数
            let checkCollision = (x, y) => {
                return this.isColliding(x, y, selectedLevel, tileSize, levelWidth);
            };
            
            // 检查四个关键点的碰撞
            // 左侧碰撞检测点调整，向右偏移一点
            let leftCollision = checkCollision(newX + offSetHalf, newY - potionH/2);
            // 右侧碰撞检测点调整，向左偏移一点
            let rightCollision = checkCollision(newX + potionW + offSetHalf, newY - potionH/2);
            
            // 底部检测三个点，向上偏移一点，提高底部碰撞的准确性
            // 减少右下角检测点的使用，防止与右侧墙壁误判
            let bottomLeftCollision = checkCollision(newX + offSetHalf , newY );
            let bottomMiddleCollision = checkCollision(newX + potionW/2 + offSetHalf, newY);
            // 如果检测到右侧墙壁碰撞，则不检测右下角
            let bottomRightCollision = rightCollision ? false : checkCollision(newX + potionW + offSetHalf, newY );
            let bottomCollision = bottomLeftCollision || bottomMiddleCollision || bottomRightCollision;
            
            // 根据碰撞情况设置弹射方向
            if (leftCollision || rightCollision) {
                // 标记为在墙上
                this.gameModel.potion.onWall = true;
                this.gameModel.potion.speed = 0; // 碰到墙速度归零
                
                // 如果刚刚开始触墙，初始化墙上帧计数和初始速度
                if (!this.gameModel.potion.wallFrameCount) {
                    this.gameModel.potion.wallFrameCount = 0;
                    this.gameModel.potion.velocityY = 0.5; // 设置初始下滑速度为0.5
                }
                
                // 根据碰撞的位置，设置可弹射的方向
                this.gameModel.potion.canShootLeft = !leftCollision; // 左边有墙就不能向左弹射
                this.gameModel.potion.canShootRight = !rightCollision; // 右边有墙就不能向右弹射
                
                this.gameModel.potion.tanshe = true; // 在墙上可以弹射
            }
            
            // 检查是否在地面上
            if (bottomCollision) {
                this.gameModel.potion.onGround = true;
                this.gameModel.potion.speed *= 0.8; // 减缓水平速度
                // 在地面上时，如果速度很小，直接设置为0防止持续滑动
                if (Math.abs(this.gameModel.potion.speed) < 0.5) {
                    this.gameModel.potion.speed = 0;
                }
                this.gameModel.potion.velocityY = 0;
                
                // 只有在不靠墙的情况下，地面才能重设弹射方向
                // 保留墙壁碰撞的限制优先级
                if (!leftCollision) {
                    this.gameModel.potion.canShootLeft = true;
                }
                if (!rightCollision) {
                    this.gameModel.potion.canShootRight = true;
                }
                
                this.gameModel.potion.tanshe = true; // 可以弹射
            } else {
                this.gameModel.potion.onGround = false;
            }
            
            // 如果既不在墙上也不在地上，应用重力
            if (!this.gameModel.potion.onWall && !this.gameModel.potion.onGround) {
                // 应用重力，根据gravityScale调整重力大小
                let gravityFactor = this.gameModel.potion.gravityScale || 1.0;
                if (this.gameModel.potion.velocityY < 20) { // 降低最大下落速度上限
                    this.gameModel.potion.velocityY += 2 * gravityFactor;
                }
                // 重置墙上帧计数
                this.gameModel.potion.wallFrameCount = 0;
            } else if (this.gameModel.potion.onWall) {
                // 墙上下滑不受gravityScale影响
                // 增加墙上帧计数
                this.gameModel.potion.wallFrameCount++;
                
                // 前10帧使用较小的加速度，保证速度不超过2
                if (this.gameModel.potion.wallFrameCount < 10) {
                    // 在前10帧内，使速度平滑增加到接近2，但不超过2
                    this.gameModel.potion.velocityY += 0.15;
                    if (this.gameModel.potion.velocityY > 2) {
                        this.gameModel.potion.velocityY = 2;
                    }
                } else {
                    // 10帧后使用曲线增加公式，加速度随帧数增加而增加
                    // 使用 0.05 + (帧数-10)/300 的公式，使加速度非常缓慢地增加
                    let accelerationFactor = 0.05 + (this.gameModel.potion.wallFrameCount - 10) / 300;
                    this.gameModel.potion.velocityY += accelerationFactor;
                }
            }
            
            // 尝试移动到新位置
            let testX = newX + this.gameModel.potion.speed;
            let testY = newY + this.gameModel.potion.velocityY;
            
            // 检查新位置是否有碰撞
            let wouldCollideLeftX = this.gameModel.potion.speed < 0 && 
                checkCollision(testX + offSetHalf, newY - potionH/2);
            let wouldCollideRightX = this.gameModel.potion.speed > 0 && 
                checkCollision(testX + potionW + offSetHalf, newY - potionH/2);
            let wouldCollideX = wouldCollideLeftX || wouldCollideRightX;
            
            // 垂直碰撞检测
            let wouldCollideBottomY = this.gameModel.potion.velocityY > 0 && (
                checkCollision(newX + offSetHalf, testY ) || 
                checkCollision(newX + potionW/2 + offSetHalf, testY ) || 
                // 如果检测到右侧墙壁碰撞，则不检测右下角
                (wouldCollideRightX ? false : checkCollision(newX + potionW + offSetHalf, testY ))
            );
            let wouldCollideTopY = this.gameModel.potion.velocityY < 0 && (
                checkCollision(newX + offSetHalf , testY - potionH ) || 
                checkCollision(newX + potionW/2 + offSetHalf, testY - potionH) || 
                checkCollision(newX + potionW + offSetHalf, testY - potionH )
            );
            let wouldCollideY = wouldCollideBottomY || wouldCollideTopY;
            
            // 如果水平方向有碰撞，停止水平移动并缓慢下滑
            if (wouldCollideX) {
                this.gameModel.potion.speed = 0; // 停止水平移动
                this.gameModel.potion.onWall = true; // 标记在墙上
                
                // 如果刚刚开始触墙，初始化墙上帧计数和初始速度
                if (!this.gameModel.potion.wallFrameCount) {
                    this.gameModel.potion.wallFrameCount = 0;
                    this.gameModel.potion.velocityY = 0.5; // 设置初始下滑速度为0.5
                }
                
                // 根据碰撞的位置，设置可弹射的方向
                this.gameModel.potion.canShootLeft = !wouldCollideLeftX; // 左边有墙就不能向左弹射
                this.gameModel.potion.canShootRight = !wouldCollideRightX; // 右边有墙就不能向右弹射
                
                this.gameModel.potion.tanshe = true; // 在墙上可以弹射
            } else {
                // 否则执行水平移动
                this.gameModel.potion.x = testX;
                // 不在这里重置onWall状态，只有在弹射或触地时才重置
            }
            
            // 如果垂直方向有碰撞，停止垂直移动
            if (wouldCollideY) {
                if (wouldCollideBottomY) {
                    // 如果是底部碰撞，设置地面状态
                    this.gameModel.potion.onGround = true;
                    //this.gameModel.potion.onWall = false; // 接触地面时重置墙上状态
                    this.gameModel.potion.canShootLeft = true;
                    this.gameModel.potion.canShootRight = true;
                    this.gameModel.potion.tanshe = true;
                    this.gameModel.potion.velocityY = 0; // 垂直速度清零
                    this.gameModel.potion.speed = 0; // 落地时水平速度也清零
                    this.gameModel.potion.wallFrameCount = 0; // 重置墙上帧计数
                    
                } else if (wouldCollideTopY) {
                    // 顶部碰撞时将velocityY设为0
                    this.gameModel.potion.velocityY = 0;
                }
            } else {
                // 否则执行垂直移动
                this.gameModel.potion.y = testY;
            }
        }
    }
    


    // 计算给定坐标是否在碰撞层
    isColliding(px, py, selectedLevel, tileSize, levelWidth){ 
        
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 碰撞检测：如果这个格子是碰撞体(非0), 返回 true
        let isColliding = this.gameModel.coll[selectedLevel].data[tileIndex] !== 0;
        
        // 合体墙检测
        let collWithMergedWall = false;
        let hasMergedWall = this.gameModel.merge[selectedLevel].data[tileIndex] !== 0;
        let mergeWallvisible = this.gameModel.merge[selectedLevel].visible;
        if(hasMergedWall && mergeWallvisible){
            collWithMergedWall = true;
        }

        // 机关墙检测
        let collwithElevatingWall = false;
        for(let i = 0; i < this.gameModel.elevatingWalls[selectedLevel].length; i++){
            if(this.gameModel.elevatingWalls[selectedLevel][i].isColling(px, py, tileSize, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)){
                collwithElevatingWall = true;
            }
        }

        return isColliding || collWithMergedWall || collwithElevatingWall;
    }

    isCollidingWithGround(px, py, selectedLevel, tileSize, levelWidth){ 
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;
        // 和ground的碰撞检测
        let isColliding = this.gameModel.ground[selectedLevel].data[tileIndex] !== 0;
        // 合体墙检测
        let collWithMergedWall = false;
        let hasMergedWall = this.gameModel.merge[selectedLevel].data[tileIndex] !== 0;
        let mergeWallvisible = this.gameModel.merge[selectedLevel].visible;
        if(hasMergedWall && mergeWallvisible){
            collWithMergedWall = true;
        }
        // 机关墙检测
        let collwithElevatingWall = false;
        for(let i = 0; i < this.gameModel.elevatingWalls[selectedLevel].length; i++){
            if(this.gameModel.elevatingWalls[selectedLevel][i].isColling(px, py, tileSize, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)){
                collwithElevatingWall = true;
            }
        }
        return isColliding || collWithMergedWall || collwithElevatingWall;
    }


    // 计算是否碰到水
    inWater(px, py, selectedLevel, tileSize, levelWidth){

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 检测：如果这个格子是水, 返回真
        return this.gameModel.water[selectedLevel].data[tileIndex] !== 0;
    }

    beIced(px, py, selectedLevel, tileSize, levelWidth){

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 检测：如果这个格子是冰, 返回真
        return this.gameModel.ice[selectedLevel].data[tileIndex] !== 0;
    }


    // 计算是否碰到陷阱
    beTraped(px, py, selectedLevel, tileSize, levelWidth){

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 检测：如果这个格子是trap, 返回真
        return this.gameModel.trap[selectedLevel].data[tileIndex] !== 0;
    }


    // 计算是否在攀爬墙
    canClimb(px, py, selectedLevel, tileSize, levelWidth){

        // 传递的坐标所处的格子行列和索引
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        return this.gameModel.climb[selectedLevel].data[tileIndex] !== 0;
    }

    // 计算是否在弹簧床
    canUseSpring(px, py, selectedLevel, tileSize, levelWidth){

        // 传递的坐标所处的格子行列和索引
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        return this.gameModel.spring[selectedLevel].data[tileIndex] !== 0;
    }


    // 计算给定坐标是否碰到钥匙
    getkey(px, py, selectedLevel){
        for(let i = 0; i < this.gameModel.keysItem[selectedLevel].length; i++){
            if(this.gameModel.keysItem[selectedLevel][i].visible 
                && this.gameModel.keysItem[selectedLevel][i].isNear(px,py,CONSTANT.TILE_SIZE,CONSTANT.CAT_WIDTH,CONSTANT.CAT_HEIGHT)){
                window.assets.getKey.play();
                this.gameModel.keysItem[selectedLevel][i].visible = false;
                this.gameModel.cat[selectedLevel].keyNum++;
                //console.log("钥匙数量:", this.gameModel.cat[selectedLevel].keyNum);
            }
        }
    }


    // 根据猫和黄油是否分离来控制合体墙是否显示
    controlMergedWall(){
        let selectedLevel = this.gameModel.selectedLevel;
        if(this.gameModel.cat[selectedLevel].isMerged){
            this.gameModel.merge[selectedLevel].visible = true;
        }
        else{
            this.gameModel.merge[selectedLevel].visible = false;
        }
    }

    reLife(){
        let selectedLevel = this.gameModel.selectedLevel;
        this.gameModel.cat[selectedLevel].x = this.gameModel.cat[selectedLevel].iniX;
        this.gameModel.cat[selectedLevel].y = this.gameModel.cat[selectedLevel].iniY;
        this.gameModel.cat[selectedLevel].isMerged = true;
    }

    // 猫触碰开关时, 机关墙自动移动
    controlElevatingWall(){
        let selectedLevel = this.gameModel.selectedLevel;
        // 机关的更新
        for(let i=0; i<this.gameModel.elevatingWalls[selectedLevel].length; i++){
            this.gameModel.elevatingWalls[selectedLevel][i].update();
        }
       
        // 开关的控制
        for(let i=0; i<this.gameModel.switches[selectedLevel].length; i++){ // 遍历所有开关
            // 如果猫触碰到开关(并且不在无效状态时), 则开关状态反转, 并切换开关图标
            // 设置无效状态并计时开始, 防止短时间多次触发同一开关
            if(this.gameModel.switches[selectedLevel][i].isNear(
                    this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y, 
                    CONSTANT.TILE_SIZE, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)
                && !this.gameModel.switches[selectedLevel][i].invincible ){
                window.assets.switch.play();
                this.gameModel.switches[selectedLevel][i].invincible = true; // 设置无效状态
                this.gameModel.switches[selectedLevel][i].invincibleTimer = 0;//重置计时器
                let img = this.gameModel.switches[selectedLevel][i].iniImgIndex;
                if(this.gameModel.switches[selectedLevel][i].beActivated){ // 开关素材切换
                    this.gameModel.switches[selectedLevel][i].imgIndex = img;
                } else {
                    this.gameModel.switches[selectedLevel][i].imgIndex = img+1;
                }
                // 开关状态反转
                this.gameModel.switches[selectedLevel][i].beActivated = !this.gameModel.switches[selectedLevel][i].beActivated;
            }
            // 开关状态切换时, 通知机关墙块移动
            if(this.gameModel.switches[selectedLevel][i].prevState !== this.gameModel.switches[selectedLevel][i].beActivated){
                for(let j=0; j<this.gameModel.elevatingWalls[selectedLevel].length; j++){
                    if(this.gameModel.elevatingWalls[selectedLevel][j].id === this.gameModel.switches[selectedLevel][i].id){
                        this.gameModel.elevatingWalls[selectedLevel][j].move();
                    }
                }
            }
            // 更新开关状态
            this.gameModel.switches[selectedLevel][i].prevState = this.gameModel.switches[selectedLevel][i].beActivated;
        
            // 机关在无敌状态下: 计时器增加
            if (this.gameModel.switches[selectedLevel][i].invincible) {
                this.gameModel.switches[selectedLevel][i].invincibleTimer++;
            } 
            // 如果在无效状态下+无效时间计时到最大值, 则停止无敌状态
            if (this.gameModel.switches[selectedLevel][i].invincible 
                && this.gameModel.switches[selectedLevel][i].invincibleTimer >= this.gameModel.switches[selectedLevel][i].invincibleDuration) {
                this.gameModel.switches[selectedLevel][i].invincible = false;
                this.gameModel.switches[selectedLevel][i].invincibleTimer = 0;
            }
        }
    }




  
}
