import AbstractCharacter from "./AbstractCharacter";

export default class Potion extends AbstractCharacter {
    constructor(x, y) {
        super(x, y);
        this.facingRight = true; // 记录朝向, 用于跳跃的方向, 初始默认向右

        // 重力参数 可删除
        this.velocityY = 0; // 垂直速度
        this.gravity = 0.4; // 重力
        this.jumpStrength = -12; // 跳跃初速度
        this.onGround = false; // 是否在地面上


      }
}