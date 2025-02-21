import AbstractItem from './AbstractItem.js';

export default class MovableBox extends AbstractItem {
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
}