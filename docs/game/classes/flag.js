class Flag{
    constructor(x, y, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;

        // control frame animation
        this.frameCounter = 0; 
        this.frameIndex = 0; 
        this.animationFrames = [imgIndex, imgIndex+1]; 
    }


    show() {
        this.frameCounter++;
        if (this.frameCounter % frameInterval === 0) { 
            this.frameIndex = (this.frameIndex + 1) % this.animationFrames.length;
            this.imgIndex = this.animationFrames[this.frameIndex];
        }
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

    // to judge if the flag is near the player
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