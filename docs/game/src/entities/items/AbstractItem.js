import AbstractEntity from "../AbstractEntity";

export default class AbstractItem extends AbstractEntity {
    // properties
    x;
    y;
    imgIndex;
    levelIndex;

    // constructor
    constructor(x,y,imgIndex,levelIndex) {
        super();
        this.x = x;
        this.y = y;
        this.imgIndex = imgIndex;
        this.levelIndex = levelIndex;
    }
}