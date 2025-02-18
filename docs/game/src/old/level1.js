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
keysItem[levelIndex] = [];
elevatingWalls[levelIndex] = [];

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
    //console.log("ParseJSON done");
}
$.getJSON('asset/level1.json', ParseJSON);

// parse functions

// 此函数需删除. 
// 暂时从测试地图文件中加载一个图片作为player(cat), 用于初步测试
function getPlayer(){
    let playerLayer = Level1Data.layers.find(layer => layer.name === "cat");
    let playerObject = playerLayer.objects.find(player => player.name === "cat1");
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
    let elevatingWallNum = 0;
    for(let i = 0; i < Layer.objects.length; i++){
        let interType = Layer.objects[i].type;
        if(interType === "key"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            keysItem[levelIndex][keyNum++] = new Key(x,y,imgIndex,levelIndex);
        }
        else if(interType === "switch"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            let id = Layer.objects[i].properties.find(p => p.name === "id").value;
            switches[levelIndex][switchNum++] = new Switch(x,y,imgIndex,levelIndex,id);
            //console.log(switches);
        }
        else if(interType === "elevator"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            let id = Layer.objects[i].properties.find(p => p.name === "id").value;
            let range = Layer.objects[i].properties.find(p => p.name === "range").value;
            let towards = Layer.objects[i].properties.find(p => p.name === "towards").value;
            //console.log("range: "+ range);
            elevatingWalls[levelIndex][elevatingWallNum++] = new ElevatingWall(x,y,imgIndex,levelIndex,id,range,towards);
            //console.log(elevatingWalls);
        }
        else if(interType === "flag"){
            let x = Layer.objects[i].x;
            let y = Layer.objects[i].y - tileSize;
            let imgIndex = Layer.objects[i].gid;
            flag[levelIndex] = new Flag(x,y,imgIndex,levelIndex);
        }
    }
}
