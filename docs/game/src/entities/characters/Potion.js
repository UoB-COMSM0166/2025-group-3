import AbstractCharacter from "./AbstractCharacter";
import {setPotionX,setPotionY,PotionX,PotionY} from "../../core/Utils";

export default class Potion extends AbstractCharacter {
    constructor(x=0, y=0) {
        super(x, y);
        this.facingRight = false; // 记录朝向, 用于跳跃的方向, 初始默认向右
        this.facingLeft = false; 

        // 重力参数 可删除
        this.velocityY = 0; // 垂直速度
        this.gravity = 0.4; // 重力
        this.jumpStrength = -12; // 跳跃初速度
        this.onGround = false; // 是否在地面上
        this.tanshe=true; //弹射起步
        this.onWall=false;

      }

    setPotionPosition(x,y){
      this.x=x;
      this.y=y;
    }  

    updatePotion(x,y){
      setPotionX((this.x-x)/2.5);
      setPotionY((y-this.y)/2.6);
    }

    getx(){
      return PotionX;
    }

    gety(){
      return PotionY;
    }
}