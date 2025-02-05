
/*  ============= global constant ============== */
let canvasWidth = 500; 
let canvasHeight = 500;
let tileSize = 70;
let levelList = [];
let frameInterval = 18;
 
/*  ============= global variable ============= */
let levelHeight = []; // number of tiles
let levelWidth = [];

// store the layers of every level
let player = []; //暂未确定cat和attach机制, 暂时只设一个数组
let decorate = []; 
let trap = [];
let coll = [];
let merge = [];
let ice = [];
let spring = [];
let switches = [];
let keysItem = [];//keys item in game
let flag = [];

let offsetX = 0;  
let offsetY = 0;  
let keys = {}; //keys pressed by keyboard
let messages = []; 

/*  ============= utility function ============= */

// index in png -> coordinate in png
function getTilePosition(i) {
    let row = Math.floor((i - 1) / 30);  
    let col = (i - 1) % 30;              
    let xCoordinate = col * (tileSize + tilemargin) + 2;  
    let yCoordinate = row * (tileSize + tilemargin) + 2;  
    return { x: xCoordinate, y: yCoordinate };
}

// index in data arr -> coordinate on canvas
function getDrawPosition(i, levelIndex) {
    let row = Math.floor(i / levelWidth[levelIndex]);  
    let col = i % levelWidth[levelIndex];  
    let xCoordinate = col * tileSize;  
    let yCoordinate = row * tileSize; 
    return { x: xCoordinate, y: yCoordinate };
}


/* ============= other tool classes ============= */


