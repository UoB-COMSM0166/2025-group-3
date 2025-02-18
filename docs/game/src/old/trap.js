// 沼泽陷阱类
// Desciribe the water/marsh area that the cat cannot swim in.

class Trap{
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
                this.nextFrameData[i] -= 48;
            }
        }
        // switch in these two arrays to change animation
        this.nowFrameData = this.data;
    }

    // update frame animation
    update(){
        this.frameCounter++;
        if (this.frameCounter % frameInterval === 0) { 
            if (this.nowFrameData === this.data) {
                this.nowFrameData = this.nextFrameData;
            } else {
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

}
