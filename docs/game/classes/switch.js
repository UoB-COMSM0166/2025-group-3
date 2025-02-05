
// 机关开关
// 在cat类里添加方法检测位置是否接近每一个开关, 接近切换开关状态(switch[levelIndex][i].beActivated取反)
class Switch{
    constructor(x, y, imgIndex, levelIndex, id) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;
        this.id = id;
        this.beActivated = false;
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

    // to judge if the switch is near the player
    isNear(px, py) {
        let d = -3; 
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