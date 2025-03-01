export const CONSTANT = Object.freeze({
    GAME_WIDTH: 6400,  //windowWidth
    GAME_HEIGHT: 3200,  //windowHeight
    TILE_SIZE: 70, //70
    TILE_MARGIN: 0,
    LEVEL_LIST: [1,2],
    FRAME_INTERVAL: 18,
    CAT_WIDTH: 160,
    CAT_HEIGHT: 112
});

// enum of possible game states
export const GAME_STATE = Object.freeze({
    START: "start",
    LEVEL_SELECT: "levelSelect",
    PLAYING: "playing",
    LEVEL_COMPLETE: "levelComplete",
    GAME_OVER: "game_over",
  });


/* 该类仅作测试, 设计UI时还需更改
   消息存在闪烁问题, 但Message类内代码无误, 原因未知? */
export class Message {
    constructor(text,x,y,duration,size,maxbgAlpha=200,maxtextAlpha=220,
                r1=255,g1=255,b1=255,r2=0,g2=0,b2=0,r3=255,g3=255,b3=255) {
      // 注意传递的实参x,y应该是文字中心的坐标,因为show方法的绘制模式设定为CENTER
      this.text = text;
      this.x = x;
      this.y = y;
      this.duration = duration;
      this.size = size;
      this.maxbgAlpha = maxbgAlpha; // 控制最大背景透明度,不传入参数默认200
      this.maxtextAlpha = maxtextAlpha;// 控制最大文字透明度,不传入参数默认200
      this.r1 = r1; // 背景颜色, 不传递实参则默认白色
      this.g1 = g1;
      this.b1 = b1;
      this.r2 = r2; // 文字颜色, 默认黑色
      this.g2 = g2;
      this.b2 = b2;
      this.r3 = r3; // 边框颜色, 默认白色
      this.g3 = g3;
      this.b3 = b3;
      this.startTime = millis(); // 记录消息出现的时间
    }
  
    // 显示文字和文字框, 并有渐入渐出效果
    show() {
      let hasExisted = millis() - this.startTime; // 消息已经持续时间
      let bgalpha; // 背景透明度
      let textalpha; // 文字透明度

      // 随时间变化计算透明度取值
      if (hasExisted < this.duration/3 ) { // 渐入
        bgalpha = map(hasExisted, 0, this.duration/3, 0, this.maxbgAlpha); // 范围映射
        textalpha = map(hasExisted, 0, this.duration/3, 0, this.maxtextAlpha); 
      } else { // 渐出
        if(hasExisted >= 2*this.duration/3){
          bgalpha = map(hasExisted, 2*this.duration/3, this.duration, this.maxbgAlpha, 0);
          textalpha = map(hasExisted, 2*this.duration/3, this.duration, this.maxtextAlpha, 0);
        } 
        else{ // 中间时段透明度保持不变为最大值
          bgalpha = this.maxbgAlpha; 
          textalpha = this.maxtextAlpha;
        } 
      }

      // 使用计算出的透明度绘制消息背景和内容
      textAlign(CENTER, CENTER);
      rectMode(CENTER);
      fill(this.r1, this.g1, this.b1, bgalpha); 
      textSize(this.size);
      strokeWeight(this.size/6);
      stroke(this.r3, this.g3, this.b3, textalpha); // 消息边框
      let lines = this.countLines(this.text); // 以换行符为标准计算文本有几行
      rect(this.x, this.y - this.size*0.1, textWidth(this.text)+this.size, this.size*lines*1.5, this.size/2); // 消息背景
      fill(this.r2, this.g2, this.b2, textalpha); 
      text(this.text, this.x, this.y); // 消息文字内容

    }
 
    // 判断消息是否过期: 当前时间-开始时间>设定的持续时间 
    isExpired() {
      return millis() - this.startTime > this.duration;
    }

    // 使用 split() 方法分割字符串并计算行数, 用于多行消息时自动计算位置
    countLines(text) {
      return text.split('\n').length;
  }
}



