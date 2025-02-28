import AbstractCharacter from "./AbstractCharacter";

export default class Capoo extends AbstractCharacter {
    constructor(x, y) {
      super(x, y);
      this.speed = 10;

      this.iniX = x; // 记录初始坐标, 用于死亡后重置回出生点
      this.iniY = y;
    }
}