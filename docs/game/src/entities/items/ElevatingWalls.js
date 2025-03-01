import AbstractItem from './AbstractItem.js';

export default class ElevatingWalls extends AbstractItem {
    // properties
    id;
    range;
    towards;

    constructor(x,y,imgIndex,levelIndex,id,range,towards) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
        this.range = range;
        this.towards = towards;
    }

    // 判断某个点是否处于机关墙块的范围内
    isColling(px, py, tileSize, catW, catH) { 
        let d = 30; 

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