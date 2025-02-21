import AbstractItem from './AbstractItem.js';

export default class PotionTrigger extends AbstractItem {
    // properties
    id;

    constructor(x, y, imgIndex, levelIndex, id) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
    }
}