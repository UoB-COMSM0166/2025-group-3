import AbstractCharacter from "./AbstractCharacter";

export default class Capoo extends AbstractCharacter {
    constructor(x, y) {
      super(x, y);
      this.speed = 10;

      this.iniX = x; // Record initial coordinates, used to reset to spawn point after death
      this.iniY = y;

      // Gravity parameters
      this.velocityY = 0; // Vertical velocity
      this.gravity = 0.4; // Gravity
      this.jumpStrength = -12; // Initial jump velocity
      this.onGround = false; // Whether on the ground

      this.facingRight = true; // Record facing direction, used for flipping control
      this.isMerged = true; // Whether merged with butter

      this.keyNum = 0; // Number of keys
    }
}