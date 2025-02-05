//弹簧床类
//目前设定是玩家靠近弹簧时,弹簧自动进行帧动画切换持续一段时间自动停止.
class Spring {
    constructor(data, levelIndex) {
        this.data = data;
        this.levelIndex = levelIndex;
        // control frame animation
        this.frameCounter = 0; 
        // copy the data array
        this.nextFrameData = new Array(this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            this.nextFrameData[i] = this.data[i];
            if(this.nextFrameData[i] !== 0){
                this.nextFrameData[i] -= 1;
            }
        }
        // switch in these two arrays to change animation
        this.nowFrameData = this.data;

        this.isAnimating = false; // 动画开关
        this.animationDuration = 50; // 控制弹簧动画持续的帧数
    }

    // update frame animation
    update(){
        if (this.isNear(player[this.levelIndex].x, player[this.levelIndex].y)) {
            this.isAnimating = true; // 触碰时启动动画
            this.frameCounter = 0;   // 重新计时
        }
            
        if (this.isAnimating) {
            this.frameCounter++;
            if (this.frameCounter % frameInterval === 0) { 
                if (this.nowFrameData === this.data) {
                    this.nowFrameData = this.nextFrameData;
                } else {
                    this.nowFrameData = this.data;
                }
            }
            // 超过时长停止动画
            if (this.frameCounter >= this.animationDuration) {
                this.isAnimating = false;
                this.nowFrameData = this.data; 
            }
        }
    }

    // draw the trap on canvas
    show() {
        let offsetX = (player[this.levelIndex].x - gameWidth / 2);
        let offsetY = (player[this.levelIndex].y - gameHeight / 2);
        for(let i = 0; i < this.nowFrameData.length; i++){
            let tileId = this.nowFrameData[i]; 
            if (tileId === 0) { // igonore empty tiles
                continue;  
            }
            let coord1 = getTilePosition(tileId);
            let coord2 = getDrawPosition(i, this.levelIndex);
            image(
                assets.icon,  
                coord2.x-offsetX, coord2.y-offsetY,  
                tileSize, tileSize,    
                coord1.x, coord1.y,  
                tileSize, tileSize      
            );
        }
    }

    // to judge if the spring is near the player
    isNear(px, py) {
        let d = -3; 
        // move pxpy to the center of the player
        px += tileSize/2;
        py += tileSize/2;
        let centX = this.x + tileSize/2;
        let centY = this.y + tileSize/2;
        if (px >= (centX - tileSize - d) && px <= (centX + tileSize + d )
            && py >= (centY - tileSize - d) && py <= (centY + tileSize + d) ) {
            return true}
        else {return false}
    }
    
}