import AbstractEntity from "../AbstractEntity";

export default class AbstractCharacter extends AbstractEntity {
    // properties
    x;
    y;
    iniX;
    iniY;
    speed;
    maxhp;
    hp;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.iniX = x; 
        this.iniY = y;
        this.speed = 10;
        this.maxhp = 5; 
        this.hp = 5; 
    }
}