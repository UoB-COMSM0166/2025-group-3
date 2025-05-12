import AbstractItem from './AbstractItem.js';

export default class Switches extends AbstractItem {
    // properties
    id;

    constructor(x, y, imgIndex, levelIndex, id) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
        this.iniImgIndex = imgIndex;
        this.beActivated = false; // Current state, true if the switch is in the on state
        this.prevState = false; // Previous state

        // Parameters for the invalid state of the switch (after being triggered, enters 100 frames of invalid time to prevent multiple triggers)
        this.invincible = false; // Whether it is in an invalid state
        this.invincibleTimer = 0; // Timer
        this.invincibleDuration = 100; // Invincible duration

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