
// The switch to control the elevatingWall

class Switch{
    constructor(x, y, imgIndex, levelIndex, id) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;
        this.id = id;
        this.beActivated = false; // The current state
        this.prevState = false; // state in previous frame
    }

    // caluate the position of player and update the state of switch
    update() {
        if (this.isNear(player[this.levelIndex].x, player[this.levelIndex].y)) {
            this.beActivated = !this.beActivated;
        }
        // call the elevatingWall to moveif the state changed
        if (this.prevState !== this.beActivated) {
            for (let i = 0; i < elevatingWalls[this.levelIndex].length; i++) {
                if (elevatingWalls[this.levelIndex][i].id === this.id) {
                    elevatingWalls[this.levelIndex][i].move();
                }
            }
        }
        this.prevState = this.beActivated;
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