import AbstractItem from './AbstractItem.js';

export default class Switches extends AbstractItem {
    // properties
    id;

    constructor(x, y, imgIndex, levelIndex, id) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
        this.iniImgIndex = imgIndex;
        this.beActivated = false; // 当前状态, 如果开关是开的状态则是true
        this.prevState = false; // 上一次状态

        // 用于开关的无效状态参数(开关被触发后进入100帧无效时间, 防止多次触发)
        this.invincible = false; // 是否处于无效状态
        this.invincibleTimer = 0; // 计时器
        this.invincibleDuration = 100; // 无敌持续时间

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