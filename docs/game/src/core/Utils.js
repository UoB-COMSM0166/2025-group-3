//Parameters for controlling animation
export let showPotion = false;
export let showBack = true;
export let PotionX = 0;
export let PotionY = 0;
export let isFacingRight = true;



export const CONSTANT = Object.freeze({
  GAME_WIDTH: 6400,  //windowWidth
  GAME_HEIGHT: 3200,  //windowHeight
  TILE_SIZE: 70, //70
  TILE_MARGIN: 0,
  LEVEL_LIST: [1,2,3,4,5,6,7,8],
  FRAME_INTERVAL: 18,
  CAT_WIDTH: 80,
  CAT_HEIGHT: 50,
  POTION_WIDTH: 40,
  POTION_HEIGHT: 70
});

//Used to modify the global variable for displaying the separated pot
export function setShowPotion(value) {
  showPotion = value;
}


//Used to modify the global variable for displaying the pot on the back
export function setShowBack(value) {
  showBack = value;
}


//Parameters for modifying Potion animation coordinates
export function setPotionX(value) {
  PotionX = value;
}

export function setPotionY(value) {
  PotionY = value;
}

export function setFacingLeft() {
  isFacingRight = false;
}

export function setFacingRight() {
  isFacingRight = true;
}

// enum of possible game states
export const GAME_STATE = Object.freeze({
  START: "start",
  INSTRUCTION: "instruction",
  LEVEL_SELECT: "levelSelect",
  PLAYING: "playing",
  LEVEL_COMPLETE: "levelComplete",
  GAME_OVER: "game_over",
  ALLCOMPLETED:"all_completed",
});


export class Message {
  constructor(text, x, y, duration, size, options = {}, messageType = "default") {
    this.text = text;
    this.x = x;
    this.y = y;
    this.duration = duration;
    this.size = size;
    this.alpha = 220

    // Default options, override default values
    this.options = Object.assign({
      maxbgAlpha: 200,   // Background transparency
      maxtextAlpha: 220, // Text transparency
      textAlign: CENTER,
      textColor: color(255, 255, 255),
      backgroundColor: color(0, 0, 0),
      borderColor: color(255, 255, 255),
      borderWidth: 2,
      font: "Comic Sans MS",
      scaling: false,     // Whether to apply text size change effect
      changeAlpha: false, // Whether to apply gradient
      textPos: "center",  // Position of the text
    }, options);

    this.messageType = messageType;
    this.startTime = millis();
  }

  // Display message
  show() {
    let elapsedTime = millis() - this.startTime;

    let textAlpha = this.alpha;
    // Control transparency gradient
    if(this.options.changeAlpha){
      if (elapsedTime <= this.duration) {
        // Calculate fade-in transparency: gradually increase transparency until reaching maxtextAlpha
        textAlpha = map(elapsedTime, 0, this.duration, 0, this.options.maxtextAlpha);
        textAlpha = constrain(textAlpha, 0, this.options.maxtextAlpha); // Ensure transparency is between 0 and maxtextAlpha
      } else {
        this.alpha = this.options.maxtextAlpha; // Fully displayed
      }
    }

    //console.log("Showing message:", this.text, "at position:", this.x, this.y);
    // If text size gradient effect is enabled
    let textSizeValue = this.size;
    if (this.options.scaling) {
      textSizeValue = this.size + Math.sin(elapsedTime / 450) * 4; // Dynamic change in text size
    }

    this.applyMessageTypeAdjustments();

    //this.drawMessageBackground(textSizeValue, bgalpha, textalpha);
    this.drawMessageText(textSizeValue, textAlpha);
  }

  // Adjust message display based on different messageType
  applyMessageTypeAdjustments() {
    switch (this.messageType) {
      case "Title":
        this.options.textAlign = CENTER;
        this.options.textColor = color(108, 140, 240); // Light blue
        this.options.backgroundColor = color(0, 0, 0, 150); // Semi-transparent black background
        this.options.borderColor = color(255, 255, 143); // Border color
        this.options.borderWidth = 10;  // Border width
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
        this.options.borderWidth = 6;  
        break;

      case "death":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 165, 0);
        this.options.borderColor = color(255, 255, 255);
        this.options.borderWidth = 4;
        this.size = 30;  
        break;

      case "gameOver":
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 0, 0);
        this.options.backgroundColor = color(0, 0, 0, 180); // Dark background
        this.size = 40;
        break;

      default:
        this.options.textAlign = CENTER;
        this.options.textColor = color(255, 255, 255);
        this.options.backgroundColor = color(0, 0, 0, 200);
        break;
    }
  }

  // Draw message background
  drawMessageBackground(textSizeValue, bgalpha) {
    textAlign(this.options.textAlign, CENTER);
    rectMode(CENTER);

    // Draw background
    fill(this.options.backgroundColor.levels[0], this.options.backgroundColor.levels[1], this.options.backgroundColor.levels[2], bgalpha);
    let lines = this.countLines(this.text);
    let boxWidth = Math.max(200, textWidth(this.text) + textSizeValue);
    let boxHeight = textSizeValue * lines * 1.5;

    rect(this.x, this.y - textSizeValue * 0.1, boxWidth, boxHeight, textSizeValue / 2);
  }

  // Draw message text
drawMessageText(textSizeValue, textalpha) {
  // Use gradient transparency to control text display
  fill(this.options.textColor.levels[0], 
       this.options.textColor.levels[1], 
       this.options.textColor.levels[2], 
       textalpha);  // Use gradient transparency here

  strokeWeight(this.options.borderWidth);
  stroke(this.options.borderColor.levels[0], 
         this.options.borderColor.levels[1], 
         this.options.borderColor.levels[2], 
         textalpha);  // Also apply gradient transparency to the border

  textSize(textSizeValue);
  textAlign(CENTER, CENTER);
  text(this.text, this.x, this.y);
}

  // Check if message is expired
  isExpired() {
    return millis() - this.startTime > this.duration;
  }

  // Count number of lines
  countLines(text) {
    return text.split('\n').length;
  }
}