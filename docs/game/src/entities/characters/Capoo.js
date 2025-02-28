import AbstractCharacter from "./AbstractCharacter";

export default class Capoo extends AbstractCharacter {
    constructor(x, y) {
      super(x, y);
      this.speed = 10;
    }
}