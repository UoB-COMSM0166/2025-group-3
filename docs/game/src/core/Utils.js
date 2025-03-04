//几个控制动画用的参数
export let showPotion = false;
export let showBack = true;
export let PotionX = 0;
export let PotionY = 0;

export const CONSTANT = Object.freeze({
  GAME_WIDTH: 6400,  //windowWidth
  GAME_HEIGHT: 3200,  //windowHeight
  TILE_SIZE: 70, //70
  TILE_MARGIN: 0,
  LEVEL_LIST: [1,2],
  FRAME_INTERVAL: 18,
  CAT_WIDTH: 160,
  CAT_HEIGHT: 112,
  POTION_WIDTH: 20,
  POTION_HEIGHT: 20
});

//用于修改全局变量是否显示分离的罐子
export function setShowPotion(value) {
  showPotion = value;
}


//用于修改全局变量是否显示背上的罐子
export function setShowBack(value) {
  showBack = value;
}


//修改Potion动画坐标的几个参数
export function setPotionX(value) {
  PotionX = value;
}

export function setPotionY(value) {
  PotionY = value;
}

// enum of possible game states
export const GAME_STATE = Object.freeze({
  START: "start",
  LEVEL_SELECT: "levelSelect",
  PLAYING: "playing",
  LEVEL_COMPLETE: "levelComplete",
  GAME_OVER: "game_over",
});


export class Message {
  constructor(text, x, y, duration, size, options = {}, messageType = "default") {
    this.text = text;
    this.x = x;
    this.y = y;
    this.duration = duration;
    this.size = size;
    this.alpha = 220

    // 默认选项，覆盖默认值
    this.options = Object.assign({
      maxbgAlpha: 200,   // 背景透明度
      maxtextAlpha: 220, // 文本透明度
      textAlign: CENTER,
      textColor: color(255, 255, 255),
      backgroundColor: color(0, 0, 0),
      borderColor: color(255, 255, 255),
      borderWidth: 2,
      font: "Arial",
      scaling: false,     // 是否应用文字大小变化效果
      changeAlpha: false, // 是否应用渐变
      textPos: "center",  // 文字的位置
    }, options);

    this.messageType = messageType;
    this.startTime = millis();
  }

  // 显示消息
  show() {
    let elapsedTime = millis() - this.startTime;

    let textAlpha = this.alpha;
    // 控制透明度渐变
    if(this.options.changeAlpha){
      if (elapsedTime <= this.duration) {
        // 计算渐显透明度：逐渐增加透明度，直到达到 maxtextAlpha
        textAlpha = map(elapsedTime, 0, this.duration, 0, this.options.maxtextAlpha);
        textAlpha = constrain(textAlpha, 0, this.options.maxtextAlpha); // 确保透明度在 0 到 maxtextAlpha 之间
      } else {
        this.alpha = this.options.maxtextAlpha; // 完全显示
      }
    }

    //console.log("Showing message:", this.text, "at position:", this.x, this.y);
    // 如果启用文字大小渐变效果
    let textSizeValue = this.size;
    if (this.options.scaling) {
      textSizeValue = this.size + Math.sin(elapsedTime / 450) * 4; // 文字大小动态变化
    }

    this.applyMessageTypeAdjustments();

    //this.drawMessageBackground(textSizeValue, bgalpha, textalpha);
    this.drawMessageText(textSizeValue, textAlpha);
  }

  // 根据不同的 messageType 调整消息显示方式
  applyMessageTypeAdjustments() {
    switch (this.messageType) {
      case "Title":
        this.options.textAlign = CENTER;
        this.options.textColor = color(108, 140, 240); // 浅蓝色
        this.options.backgroundColor = color(0, 0, 0, 150); // 半透明黑色背景
        this.options.borderColor = color(255, 255, 143); // 边框颜色
        this.options.borderWidth = 10;  // 边框宽度
        break;

      case "startScreen":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 255, 255);
        this.options.backgroundColor = color(0, 0, 139);
        this.options.borderColor = color(173, 216, 140); 
        this.options.borderWidth = 10;  
        break;

      case "levelSelectScreen":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 255, 255);
        this.options.borderColor = color(255, 150, 180); 
        this.options.borderWidth = 10;  
        break;

        case "Tip":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 255, 255);
        this.options.borderColor = color(255, 150, 180)
        this.options.borderWidth = 10;  
        break;

      case "playing":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 255, 255);
        this.options.borderColor = color(255, 100, 100)
        this.options.borderWidth = 40;
        this.size = 30;  
        break;

      case "gameOver":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 0, 0);
        this.options.backgroundColor = color(0, 0, 0, 180); // 暗色背景
        this.size = 40;
        break;

      default:
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 255, 255);
        this.options.backgroundColor = color(0, 0, 0, 200);
        break;
    }
  }

  // 绘制消息的背景
  drawMessageBackground(textSizeValue, bgalpha) {
    textAlign(this.options.textAlign, CENTER);
    rectMode(CENTER);

    // 绘制背景
    fill(this.options.backgroundColor.levels[0], this.options.backgroundColor.levels[1], this.options.backgroundColor.levels[2], bgalpha);
    let lines = this.countLines(this.text);
    let boxWidth = Math.max(200, textWidth(this.text) + textSizeValue);
    let boxHeight = textSizeValue * lines * 1.5;

    rect(this.x, this.y - textSizeValue * 0.1, boxWidth, boxHeight, textSizeValue / 2);
  }

  // 绘制消息文本
drawMessageText(textSizeValue, textalpha) {
  // 使用渐变的透明度来控制文本的显示
  fill(this.options.textColor.levels[0], 
       this.options.textColor.levels[1], 
       this.options.textColor.levels[2], 
       textalpha);  // 这里使用渐变透明度

  strokeWeight(this.options.borderWidth);
  stroke(this.options.borderColor.levels[0], 
         this.options.borderColor.levels[1], 
         this.options.borderColor.levels[2], 
         textalpha);  // 这里也应用渐变的透明度到边框

  textSize(textSizeValue);
  textAlign(CENTER, CENTER);
  text(this.text, this.x, this.y);
}

  // 判断消息是否过期
  isExpired() {
    return millis() - this.startTime > this.duration;
  }

  // 计算行数
  countLines(text) {
    return text.split('\n').length;
  }
}