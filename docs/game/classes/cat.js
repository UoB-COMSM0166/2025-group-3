//主角猫类
class Cat {

    // 构造函数
    constructor(x, y, imgIndex, levelIndex, speed, hp) {
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
    // 更新坐标update方法

    // show方法
    show() {
        image(
            assets.testcat,  // 源图像
            this.x, this.y,   // 在画布上绘制的左上角坐标
            210, 210,     // 在画布上绘制的宽度和高度
        );
    }
    
    // 其他行为方法

}
