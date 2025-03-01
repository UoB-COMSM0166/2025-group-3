import AbstractCharacter from "./AbstractCharacter";

export default class Capoo extends AbstractCharacter {
    constructor(x, y) {
      super(x, y);
      this.speed = 10;

      this.iniX = x; // 记录初始坐标, 用于死亡后重置回出生点
      this.iniY = y;

      // 跳跃参数
      this.velocityY = 0; // 垂直速度
      this.gravity = 0.5; // 重力
      this.jumpStrength = -10; // 跳跃初速度
      this.onGround = false; // 是否在地面上
    }
}