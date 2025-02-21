import AbstractItem from './AbstractItem.js';

export default class MagicalBox extends AbstractItem {
    data;
    levelIndex;

    constructor(data, levelIndex) {
      super();
        this.data = data;
        this.levelIndex = levelIndex;
    }
}