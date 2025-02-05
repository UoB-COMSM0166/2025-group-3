// Parse the map(json) of the first level into objects
let Level1Data = {};  
let levelIndex = 0;

// initialize arrays
player[levelIndex] = null; 
decorate[levelIndex] = []; 
trap[levelIndex] = [];
coll[levelIndex] = [];
merge[levelIndex] = [];
ice[levelIndex] = [];
spring[levelIndex] = [];
switches[levelIndex] = [];
key[levelIndex] = [];

// Load the json file and parse it
function ParseJSON(jsonData) {
    Level1Data = jsonData; 
    console.log(Level1Data); // test
    levelHeight[levelIndex] = Level1Data.height;
    levelWidth[levelIndex] = Level1Data.width; 
    getPlayer();
    getColl();    
    getDecorate();
    getTrap();
    getMerge();
    getIce();
    getSpring();
    getInteract();
}
$.getJSON('asset/level1.json', ParseJSON);

// parse functions

// 此函数需删除. 
// 暂时从测试地图文件中加载一个图片作为player(cat), 用于初步测试
function getPlayer(){
    let playerLayer = Level1Data.layers.find(layer => layer.name === "player");
    let playerObject = playerLayer.objects.find(player => player.name === "player1");
    tileindex = playerObject.gid;
    let x = playerObject.x;
    let y = playerObject.y - 210/2;
    player[levelIndex] = new Cat(x, y);
}

function getColl(){
    let collisionLayer = Level1Data.layers.find(layer => layer.name === "coll");
    coll[levelIndex] = new Coll(collisionLayer.data, levelIndex);
}

function getDecorate(){
    let Layer = Level1Data.layers.find(layer => layer.name === "decorate");
    decorate[levelIndex] = new Decorate(Layer.data, levelIndex);
}

function getTrap(){
    let Layer = Level1Data.layers.find(layer => layer.name === "trap");
    trap[levelIndex] = new Trap(Layer.data, levelIndex);
}

function getMerge(){
    let Layer = Level1Data.layers.find(layer => layer.name === "merge");
    merge[levelIndex] = new Merge(Layer.data, levelIndex);
}

function getIce(){
    let Layer = Level1Data.layers.find(layer => layer.name === "ice");
    ice[levelIndex] = new Ice(Layer.data, levelIndex);
}

function getSpring(){
    let Layer = Level1Data.layers.find(layer => layer.name === "spring");
    spring[levelIndex] = new Spring(Layer.data, levelIndex);
}

function getInteract(){
    let Layer = Level1Data.layers.find(layer => layer.name === "interact");
    let keyNum = 0;
    let switchNum = 0;
    for(let i = 0; i < Layer.objects.length; i++){
        let interType = Layer.objects[i].type;
        if(interType === "key"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            keysItem[levelIndex][keyNum++] = new OneDiamond(x,y,imgIndex,levelIndex);
        }
        else if(interType === "switch"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            switches[levelIndex][switchNum++] = new OneBox(x,y,imgIndex,levelIndex);
        }
        else if(interType === "elevator"){
            //暂缺
        }
        else if(interType === "flag"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            flag[levelIndex] = new Flag(x,y,imgIndex,levelIndex);
        }
    }
}
