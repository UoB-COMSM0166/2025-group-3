//机关控制的升降墙类

class EvelatingWall{
    //构造函数
    constructor(x, y, imgIndex, levelIndex, id, range, towards) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;

        this.id = id; // 属于哪个开关
        this.towards = towards; // 升降方向
        this.range = range;// 可以运动的瓦片长度有多少个
        this.pixelRange = (range-1)*tileSize;

        // 敌人自动巡逻参数
        this.iniX = x; // 记录起始位置
        this.facingLeft = true; // 最开始都向左侧移动
    }

    //update

    //show

    //行为方法
}