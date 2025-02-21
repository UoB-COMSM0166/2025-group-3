import AbstractItem from './AbstractItem.js';

export default class CapooTrigger extends AbstractItem {
    // properties
    id;

    constructor(x, y, imgIndex, levelIndex, id) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
    }
}