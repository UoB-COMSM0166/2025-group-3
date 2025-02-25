import AbstractItem from './AbstractItem.js';

export default class Switches extends AbstractItem {
    // properties
    id;

    constructor(x, y, imgIndex, levelIndex, id) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
    }
}