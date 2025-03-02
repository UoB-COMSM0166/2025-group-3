import MapLoader from "./MapLoader";
import { CONSTANT, Message } from "./Utils";
import Potion from "../entities/characters/Potion";
import {setShowBack,setShowPotion} from "../core/Utils";

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

        // 检查是否碰到钥匙
        this.getkey(this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y, selectedLevel); 

        // 钥匙满时, flag设置为显示
        if(this.gameModel.cat[selectedLevel].keyNum == this.gameModel.keysItem[selectedLevel].length){
            console.log("旗子显示");
            this.gameModel.flag[selectedLevel].visible = true;
        }

        /* ------------------和所有碰撞层的交互----------------- */

        // 控制黄油分离  待完成
        // 按X键分离
        if(this.gameModel.cat[selectedLevel].isMerged 
            && (this.gameModel.keys['X']||this.gameModel.keys['x'])){
                console.log("分离");
                //this.gameModel.cat[selectedLevel].isMerged = false;
                // 新建黄油类, 给一个初始向上初速度?
                // 修改spinelayer, 猫和黄油分开渲染?
                this.gameModel.potion.x=this.gameModel.cat[selectedLevel].x;
                this.gameModel.potion.y=this.gameModel.cat[selectedLevel].y;
                setShowBack(false);
                setShowPotion(true);
                
                
        }

        if(this.gameModel.keys['h']||this.gameModel.keys['H']){
            this.gameModel.potion.setPotionPosition(100,100);       
         }



        // 判断猫是否入水(以最下边中心点计算), 重置回出生点
        if(this.inTrap(this.gameModel.cat[selectedLevel].x-catW/2, this.gameModel.cat[selectedLevel].y, 
            selectedLevel, tileSize, levelWidth)){
            // 播放死亡音效等

            let message1 = "Cats dissolve easily in water!"
            this.gameModel.messages.push(new Message(message1,width/2,4*height/5,3000,100,{},"playing"));

            this.gameModel.cat[selectedLevel].x = this.gameModel.cat[selectedLevel].iniX;
            this.gameModel.cat[selectedLevel].y = this.gameModel.cat[selectedLevel].iniY;
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
            console.log("弹簧床");
            //this.gameModel.cat[selectedLevel].velocityY = Math.abs(this.gameModel.cat[selectedLevel].velocityY) * 0.2;
            this.gameModel.cat[selectedLevel].velocityY = this.gameModel.cat[selectedLevel].jumpStrength * 2; // 赋予向上的初速度
            this.gameModel.cat[selectedLevel].onGround = false; // 进入空中
        }

        // 水平移动的按键控制
        if (this.gameModel.keys['ArrowLeft']) {
            newX -= this.gameModel.cat[selectedLevel].speed; 
        }
        if (this.gameModel.keys['ArrowRight']) {
            newX += this.gameModel.cat[selectedLevel].speed;
        }
            
        // 攀爬墙 垂直移动的按键控制
        if(catCanClimb){
            console.log("可以攀爬");
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

        // 检查猫的四条边界是否碰撞: 每条边取两个点
        /* 水平方向偏移半个身距(-catW/2), 并且竖直方向偏移一个脚底距离(offSetFeet=-catH/10)
           注意碰撞检测不可以阉割, 因为猫的大小>>图块大小, 减少检测点会导致卡墙里 */

        let left   = this.isColliding(newX+offSetHalf, newY-catH/3-offSetFeet, selectedLevel, tileSize, levelWidth) // 左边中间两个点
            || this.isColliding(newX+offSetHalf, newY-catH*2/3-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth);  // 左上角

        let right  = this.isColliding(newX+catW+offSetHalf, newY-catH/3-offSetFeet, selectedLevel, tileSize, levelWidth)  // 右边中间两个点
            || this.isColliding(newX+catW+offSetHalf, newY-catH*2/3-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+catW+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth);  // 右上

        let top    = this.isCollidingWithGround(newX+catW/3+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth) // 上方中间两个点
            || this.isCollidingWithGround(newX+2*catW/3+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth) 
            || this.isCollidingWithGround(newX+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth)     //左上角
            || this.isCollidingWithGround(newX+catW+offSetHalf, newY-catH-offSetFeet, selectedLevel, tileSize, levelWidth); //右上角

        let bottom = this.isCollidingWithGround(newX+catW/3+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth) // 下方中间两个点
            || this.isCollidingWithGround(newX+2*catW/3+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isCollidingWithGround(newX+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth) // 左下角
            || this.isCollidingWithGround(newX+catW+offSetHalf, newY-offSetFeet, selectedLevel, tileSize, levelWidth);  // 右下角
        
        // 真正的顶部碰撞: 新位置碰撞top且新位置上方也碰撞top, 并且角色不在下落状态中
        let topUp = this.isColliding(newX+catW/3+offSetHalf, newY-catH-offSetFeet -70, selectedLevel, tileSize, levelWidth) // 上方中间两个点
        || this.isColliding(newX+2*catW/3+offSetHalf, newY-catH-offSetFeet-70, selectedLevel, tileSize, levelWidth) 
        || this.isColliding(newX+offSetHalf, newY-catH-offSetFeet-70, selectedLevel, tileSize, levelWidth)     //左上角
        || this.isColliding(newX+catW+offSetHalf, newY-catH-offSetFeet-70, selectedLevel, tileSize, levelWidth); //右上角

        let topReal = top && topUp && this.gameModel.cat[selectedLevel].velocityY <= 0;;

        // 真正的底部碰撞: 新位置bottom且新位置下方也碰撞bottom, 并且角色不在上升状态中
        let bottomDown = this.isColliding(newX+catW/3+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth) // 下方中间两个点
            || this.isColliding(newX+2*catW/3+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth) // 左下角
            || this.isColliding(newX+catW+offSetHalf, newY-offSetFeet+70, selectedLevel, tileSize, levelWidth);  // 右下角

        let bottomReal = bottom && bottomDown && this.gameModel.cat[selectedLevel].velocityY >= 0;

        //console.log(top + "|"+ topUp + "|"+ topReal + "||" +bottom + "|"+ bottomDown + "|"+ bottomReal);


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
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;
        let newX = this.gameModel.potion.getx;
        let newY = this.gameModel.potion.gety;
        let potionW = CONSTANT.POTION_WIDTH;  // 需要定义 POTION_WIDTH
        let potionH = CONSTANT.POTION_HEIGHT; // 需要定义 POTION_HEIGHT
        let offSetHalf = -potionW / 2;
        let offSetFeet = potionH / 10; 
    
        // 水平方向偏移量
        let offSetClimb = potionW / 4;
    
    
        // // 检测是否可以攀爬
        // let potionCanClimb = this.canClimb(newX + offSetHalf + offSetClimb, newY - offSetFeet,
        //     this.gameModel.selectedLevel, tileSize, levelWidth) 
        //     || this.canClimb(newX + potionW + offSetHalf - offSetClimb, newY - offSetFeet,
        //     this.gameModel.selectedLevel, tileSize, levelWidth);
    
        // 水平移动
        if (this.gameModel.keys['a']) {
            newX -= this.gameModel.potion.speed; 
        }
        if (this.gameModel.keys['d']) {
            newX += this.gameModel.potion.speed;
        }
    
        // // 攀爬墙时的垂直移动
        // if (potionCanClimb) {
        //     if (this.gameModel.keys['w']) {
        //         newY -= this.gameModel.potion.speed;
        //     }
        //     if (this.gameModel.keys['s']) {
        //         newY += this.gameModel.potion.speed;
        //     }
        // }
    
        // // 如果按空格，让 potion 上升
        // if (this.gameModel.keys[" "]) {
        //     this.gameModel.potion.velocityY = this.gameModel.potion.jumpStrength;
        //     this.gameModel.potion.onGround = false;
        // }
    
        // // 不在攀爬墙上时，应用重力
        // if (!potionCanClimb) {
        //     this.gameModel.potion.velocityY += this.gameModel.potion.gravity;
        //     newY += this.gameModel.potion.velocityY;
        // }
    
        // // **碰撞检测**
        // let left = this.isColliding(newX + offSetHalf, newY - potionH / 3 - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isColliding(newX + offSetHalf, newY - potionH * 2 / 3 - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isColliding(newX + offSetHalf, newY - potionH - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth);
    
        // let right = this.isColliding(newX + potionW + offSetHalf, newY - potionH / 3 - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isColliding(newX + potionW + offSetHalf, newY - potionH * 2 / 3 - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isColliding(newX + potionW + offSetHalf, newY - potionH - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth);
    
        // let bottom = this.isCollidingWithGround(newX + potionW / 3 + offSetHalf, newY - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isCollidingWithGround(newX + 2 * potionW / 3 + offSetHalf, newY - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isCollidingWithGround(newX + offSetHalf, newY - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth)
        //     || this.isCollidingWithGround(newX + potionW + offSetHalf, newY - offSetFeet, this.gameModel.selectedLevel, tileSize, levelWidth);
    
        // // 水平方向的碰撞处理
        // if (!left && !right) { 
        //     this.gameModel.potion.x = newX;
        // } 
    
        // // 处理垂直碰撞
        // if (!bottom) { 
        //     this.gameModel.potion.y = newY;
        //     if (!potionCanClimb) { 
        //         this.gameModel.potion.onGround = false;
        //     }
        // } else { 
        //     this.gameModel.potion.velocityY = 0;
        //     this.gameModel.potion.onGround = true;
        // }
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
            console.log("碰到合体墙");
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
            console.log("碰到合体墙");
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
    inTrap(px, py, selectedLevel, tileSize, levelWidth){

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // 检测：如果这个格子是水, 返回真
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
                //assets.getDiamondSound.play();//播放音效
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
                console.log("猫触碰到开关");
                // 添加音效....
                this.gameModel.switches[selectedLevel][i].invincible = true; // 设置无效状态
                this.gameModel.switches[selectedLevel][i].invincibleTimer = 0;//重置计时器
                let img = this.gameModel.switches[selectedLevel][i].iniImgIndex;
                if(this.gameModel.switches[selectedLevel][i].beActivated){ // 开关素材切换
                    this.gameModel.switches[selectedLevel][i].imgIndex = img+1;
                } else {
                    this.gameModel.switches[selectedLevel][i].imgIndex = img;
                }
                // 开关状态反转
                this.gameModel.switches[selectedLevel][i].beActivated = !this.gameModel.switches[selectedLevel][i].beActivated;
            }
            // 开关状态切换时, 通知机关墙块移动
            if(this.gameModel.switches[selectedLevel][i].prevState !== this.gameModel.switches[selectedLevel][i].beActivated){
                console.log("开关状态切换, 机关墙移动");
                for(let j=0; j<this.gameModel.elevatingWalls[selectedLevel].length; j++){
                    if(this.gameModel.elevatingWalls[selectedLevel][j].id === this.gameModel.switches[selectedLevel][i].id){
                        this.gameModel.elevatingWalls[selectedLevel][j].move();
                        console.log("机关墙应该在移动");
                        console.log( this.gameModel.elevatingWalls[selectedLevel][j].range);
                        console.log( this.gameModel.elevatingWalls[selectedLevel][j].pixelRange);
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
