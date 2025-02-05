// 主角猫类
// 以下代码仅做地图交互测试 可完全删除


class Cat {

    constructor(x, y, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.iniX = x; //记录出生点坐标
        this.iniY = y;
        this.imgIndex = imgIndex;
        this.levelIndex = levelIndex;
        this.speed = 10;
        this.maxhp = 5; 
        this.hp = 5; 
    }
    
    update() {}
    
    show() {
        offsetX = this.x - gameWidth / 2;
        offsetY = this.y - gameHeight / 2;
  
        image(
            assets.testcat,
            this.x - offsetX, this.y - offsetY, 
            210, 210
        );

    }
    
    // 其他行为方法

}
