import AbstractCharacter from "./AbstractCharacter";
import {setPotionX,setPotionY,PotionX,PotionY} from "../../core/Utils";

export default class Potion extends AbstractCharacter {
    constructor(x=0, y=0) {
        super(x, y);
        this.facingRight = false; // Records facing direction, used for jump direction, initially default to right
        this.facingLeft = false; 

        // Gravity parameters (can be deleted)
        this.velocityY = 0; // Vertical velocity
        this.gravity = 0.4; // Gravity
        this.jumpStrength = -12; // Initial jump velocity
        this.onGround = false; // Whether on the ground
        this.tanshe=true; //Ejection start
        this.onWall=false;
        this.scale=0.8;
        this.canShootLeft = true; // Initially can shoot to the left
        this.canShootRight = true; // Initially can shoot to the right
    }


    updatePotion(x,y){
      setPotionX((this.x-x)*this.scale+10);
      setPotionY((y-this.y)*this.scale+10);
    }

}