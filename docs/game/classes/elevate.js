// 机关控制的升降墙类 

// 相同id的开关触发时, 所有相同id的机关墙按照towards方向移动range个瓦片
// 移动一次: 开关关到开
// 回移一次: 开关从开到关

class ElevatingWall{
    constructor(x, y, imgIndex, levelIndex, id, range, towards) {
        this.x = x;
        this.y = y;

        this.iniX = x; // record initial position
        this.iniY = y;

        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;

        this.id = id; // Belongs to which switch
        this.towards = towards; 
        this.range = range; // range to move(in tiles)
        this.pixelRange = (range-1)*tileSize;

        this.targetX = x;  
        this.targetY = y;
        this.beActivated = false; // 是否被激活 (由开关通知)
        this.speed = 20; 

    }

    // 更新每一帧的坐标, 逐帧平滑移动
    update() {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;

        if (Math.abs(dx) > this.speed) {
            this.x += Math.sign(dx) * this.speed;
        } else {
            this.x = this.targetX;
        }

        if (Math.abs(dy) > this.speed) {
            this.y += Math.sign(dy) * this.speed;
        } else {
            this.y = this.targetY;
        }
    }
    

    show() {
        let coordinate = getTilePosition(this.imgIndex);
        let offsetX = (player[this.levelIndex].x - windowWidth / 2);
        let offsetY = (player[this.levelIndex].y - windowHeight / 2);
        image(
            assets.icon,  
            this.x-offsetX, this.y-offsetY,   
            tileSize, tileSize,    
            coordinate.x, coordinate.y,  
            tileSize, tileSize      
        );
        
    }


    // 该函数由开关类触发, 用来设定机关移动的目标位置
    move() {
        this.activated = !this.activated;
        if (this.activated) {
            switch (this.towards) {
                case "up":    this.targetY = this.iniY - this.pixelRange; break;
                case "down":  this.targetY = this.iniY + this.pixelRange; break;
                case "left":  this.targetX = this.iniX - this.pixelRange; break;
                case "right": this.targetX = this.iniX + this.pixelRange; break;
            }
        } else {
            this.targetX = this.iniX;
            this.targetY = this.iniY;
        }
    }

}