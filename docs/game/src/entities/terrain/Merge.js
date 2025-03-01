import AbstractTerrain from './AbstractTerrain.js';

export default class Merge extends AbstractTerrain {
    constructor(data, levelIndex) {
      super(data, levelIndex);
      this.visible = true; // 根据猫和黄油的分离改变值
    }
}