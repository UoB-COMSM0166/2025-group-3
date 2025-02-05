class Coll{

    constructor(data, levelIndex) {
        this.data = data;
        this.levelIndex = levelIndex;
    }

    // draw the collision on canvas
    show() {
        let offsetX = (player[this.levelIndex].x - gameWidth / 2);
        let offsetY = (player[this.levelIndex].y - gameHeight / 2);
        for(let i=0; i<this.data.length; i++){
            let tileId = this.data[i]; 
            if (tileId === 0) {  // igonore empty tiles
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