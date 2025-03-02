import AbstractItem from './AbstractItem.js';

export default class KeysItem extends AbstractItem {
    // properties
    frameCounter;
    frameIndex;
    animationFrames;
    visible;
    
    constructor(x,y,imgIndex,levelIndex){
        super(x,y,imgIndex,levelIndex);
        this.frameCounter = 0; 
        this.frameIndex = 0; 
        this.animationFrames = [imgIndex, imgIndex+1]; 
        this.visible = true;
    }

    isNear(px, py, tileSize, catW, catH) { 
        let d = 20; 

        let centX = this.x + tileSize/2;
        let centY = this.y + tileSize/2;

        if(centX >= px - catW/2 - d && centX <= px + catW/2 +d 
            && centY >= py - catH - d && centY <= py + d){
            return true;
        } else {
            return false;
        }
    }
}