import AbstractItem from './AbstractItem.js';

export default class ElevatingWalls extends AbstractItem {
    // properties
    id;
    range;
    towards;

    constructor(x,y,imgIndex,levelIndex,id,range,towards) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
        this.range = range;// 应该移动的距离(tile数量)
        this.towards = towards; // 从地图中读取的, 应该朝向哪里移动

        this.pixelRange = (range-1)*70; // 应该移动的距离(像素)

        this.iniX = x; // 初始坐标, 不可更改
        this.iniY = y;
        this.iniTargetX; // 初始目标坐标,不可更改
        this.iniTargetY;

        this.targetX = x;  // 移动的时候要移动到的目标坐标, 需要根据状态切换为iniX或iniTargetX
        this.targetY = y;

        this.beActivated = false; // 是否被激活 (由开关通知)
        this.speed = 20; 


        this.moving = false; // 是否处于移动状态
        this.movingTimer = 0; // 计时器
        this.movingDuration = 100; // 移动的持续时间

        // 初始化目标位置 
        switch (this.towards) {
            case "up": 
                this.iniTargetX = x;
                this.iniTargetY = y - this.pixelRange;
                break;
            case "down":
                this.iniTargetX = x;
                this.iniTargetY = y + this.pixelRange;
                break;
            case "left":
                this.iniTargetX = x - this.pixelRange;
                this.iniTargetY = y;
                break;
            case "right":
                this.iniTargetX = x + this.pixelRange;
                this.iniTargetY = y;
                break;
        }
    }

    // 判断某个点是否处于机关墙块的范围内
    isColling(px, py, tileSize, catW, catH) { 
        let d = 30; 

        let centX = this.x + tileSize/2;
        let centY = this.y + tileSize/2;

        if(centX >= px - catW/2 - d && centX <= px + catW/2 +d 
            && centY >= py - catH - d && centY <= py + d){
            return true;
        } else {
            return false;
        }
    }


    // 更新每一帧的坐标(若处于移动状态)
    update() {
        if (!this.moving) return; // 不在移动状态，直接返回

        this.movingTimer++;
        let progress = this.movingTimer / this.movingDuration; // 计算当前移动进度（0~1）

        if (progress >= 1) { // 移动完成
            this.x = this.targetX;
            this.y = this.targetY;
            this.moving = false; // 停止移动
            this.movingTimer = 0; // 计时器重置
        } else { // 正在移动中, 差值计算当前帧的位置
            let startX = this.beActivated ? this.iniX : this.iniTargetX;
            let endX = this.beActivated ? this.iniTargetX : this.iniX;
            let startY = this.beActivated ? this.iniY : this.iniTargetY;
            let endY = this.beActivated ? this.iniTargetY : this.iniY;

            this.x = startX + (endX - startX) * progress;
            this.y = startY + (endY - startY) * progress;
        }
    }
    

    // 该函数由开关类触发, 用来设定机关移动的目标位置
    move() {
        this.beActivated = !this.beActivated; // 确保每次调用 move() 方法时,机关墙的移动方向是交替变化的

        // 机关墙被激活时, 设置目标位置
        if (this.beActivated) {
            this.targetX = this.iniTargetX;
            this.targetY = this.iniTargetY;
        } else {
            this.targetX = this.iniX;
            this.targetY = this.iniY;
        }

        // 启动移动
        this.moving = true;
        this.movingTimer = 0; // 计时器归零
    }




}