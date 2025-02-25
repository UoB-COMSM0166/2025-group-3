// export function showEntities() {
//     image(
//         assets.testcat,
//         this.x, this.y, 
//         210, 210
//     ); //cat show
// }

// export function animateEntites(){

// }

// index in png -> coordinate in png
export function getTilePosition(i) {
    i --;// 此地图导出json后坐标从2开始(原因未知?), 需调整为1
    let row = Math.floor((i - 1) / 30);  
    let col = (i - 1) % 30;              
    let xCoordinate = col * (tileSize + tilemargin);  
    let yCoordinate = row * (tileSize + tilemargin);  
    return { x: xCoordinate, y: yCoordinate };
}

// index in data arr -> coordinate on canvas
export function getDrawPosition(i, levelIndex) {
    let row = Math.floor(i / levelWidth[levelIndex]);  
    let col = i % levelWidth[levelIndex];  
    let xCoordinate = col * tileSize;  
    let yCoordinate = row * tileSize; 
    return { x: xCoordinate, y: yCoordinate };
}

export function collshow() {
    let offsetX = (player[this.levelIndex].x - gameWidth / 2);
    let offsetY = (player[this.levelIndex].y - gameHeight / 2);
    for(let i=0; i<this.data.length; i++){
        let tileId = this.data[i]; 
        if (tileId === 0) {  // igonore empty tiles
            continue;  
        }
        let coord1 = getTilePosition(tileId);
        let coord2 = getDrawPosition(i, this.levelIndex);
        image(
            assets.icon,  
            coord2.x-offsetX, coord2.y-offsetY,  
            tileSize, tileSize,    
            coord1.x, coord1.y,  
            tileSize, tileSize      
        );
    }
}

export function decorateShow() {
    let offsetX = (player[this.levelIndex].x - gameWidth / 2);
    let offsetY = (player[this.levelIndex].y - gameHeight / 2);
    for(let i=0; i<this.data.length; i++){
        let tileId = this.data[i]; 
        if (tileId === 0) {  
            continue;  
        }
        let coord1 = getTilePosition(tileId);
        let coord2 = getDrawPosition(i, this.levelIndex);
        image(
            assets.icon,  
            coord2.x-offsetX, coord2.y-offsetY,  
            tileSize, tileSize,    
            coord1.x, coord1.y,  
            tileSize, tileSize      
        );
    }
}

export function climbShow() {
    let offsetX = (player[this.levelIndex].x - windowWidth / 2);
    let offsetY = (player[this.levelIndex].y - windowHeight / 2);
    for(let i=0; i<this.data.length; i++){
        let tileId = this.data[i]; 
        if (tileId === 0) {  // igonore empty tiles
            continue;  
        }
        let coord1 = getTilePosition(tileId);
        let coord2 = getDrawPosition(i, this.levelIndex);
        image(
            assets.icon,  
            coord2.x-offsetX, coord2.y-offsetY,  
            tileSize, tileSize,    
            coord1.x, coord1.y,  
            tileSize, tileSize      
        );
    }
}