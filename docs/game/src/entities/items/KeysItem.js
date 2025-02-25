import AbstractItem from './AbstractItem.js';

export default class KeysItem extends AbstractItem {
    // properties
    frameCounter;
    frameIndex;
    animationFrames;
    
    constructor(x,y,imgIndex,levelIndex){
        super(x,y,imgIndex,levelIndex);
        this.frameCounter = 0; 
        this.frameIndex = 0; 
        this.animationFrames = [imgIndex, imgIndex+1]; 
    }
}