class AbstractCharacter extends AbstractEntity {
    // properties
    x;
    y;
    iniX;
    iniY;
    speed;
    maxhp;
    hp;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.iniX = x; //记录出生点坐标
        this.iniY = y;
        this.speed = 10;
        this.maxhp = 5; 
        this.hp = 5; 
    }
}