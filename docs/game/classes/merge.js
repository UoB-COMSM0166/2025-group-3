// 合体墙
// 根据cat类中的是否合体标志来决定展示与否,初始默认全部展示?
// 具体机制尚未确定,后续再更改
// cat类中update方法中每次合体解体时,merge[levelIndex].visible取反
// merge[levelIndex].visible为真时,需要在cat类中进行碰撞检测
class Merge {
    constructor(data, levelIndex) {
        this.data = data;
        this.levelIndex = levelIndex;
        this.visible = true;
    }

    show() {
        if(this.visible){
            let offsetX = (player[this.levelIndex].x - gameWidth / 2);
            let offsetY = (player[this.levelIndex].y - gameHeight / 2);
            for(let i=0; i<this.data.length; i++){
                let tileId = this.data[i]; 
                if (tileId === 0) {  
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
        
    }
}