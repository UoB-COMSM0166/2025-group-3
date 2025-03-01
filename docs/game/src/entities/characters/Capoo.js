import AbstractCharacter from "./AbstractCharacter";

export default class Capoo extends AbstractCharacter {
    constructor(x, y) {
      super(x, y);
      this.speed = 10;

      this.iniX = x; // 记录初始坐标, 用于死亡后重置回出生点
      this.iniY = y;

      // 重力参数
      this.velocityY = 0; // 垂直速度
      this.gravity = 0.4; // 重力
      this.jumpStrength = -12; // 跳跃初速度
      this.onGround = false; // 是否在地面上

      this.facingRight = true; // 记录朝向, 用于控制翻转
      this.isMerged = true; // 是否与黄油合并


    }
}