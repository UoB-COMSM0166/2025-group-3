// load assets used in game levels, such as json, images etc.
// every level has to new a MapLoader object to load the level 
// (this process is controlled by GameController)
// the MapLoader object will parse the json file and create objects in the gameModel

import Capoo from "../entities/characters/Capoo";
import ElevatingWalls from "../entities/items/ElevatingWalls";
import Flag from "../entities/items/Flag";
import KeysItem from "../entities/items/KeysItem";
import Switches from "../entities/items/Switches";
import Climb from "../entities/terrain/Climb";
import Coll from "../entities/terrain/Coll";
import Decorate from "../entities/terrain/Decorate";
import Ice from "../entities/terrain/Ice";
import Merge from "../entities/terrain/Merge";
import Spring from "../entities/terrain/Spring";
import Trap from "../entities/terrain/Trap";
import { CONSTANT } from "./Utils";


export default class MapLoader {
    // properties
    gameModel;
    levelIndex;
    levelData;
    
    constructor(gameModel, levelIndex) {
        // set properties
        this.gameModel = gameModel;
        this.levelIndex = levelIndex; // which level to load
        this.levelData = {};  // store parsed json data

        // array initialization
        this.gameModel.levelHeight[levelIndex] = 0;
        this.gameModel.levelWidth[levelIndex] = 0;
        this.gameModel.decorate[levelIndex] = []; 
        this.gameModel.trap[levelIndex] = [];
        this.gameModel.coll[levelIndex] = [];
        this.gameModel.merge[levelIndex] = [];
        this.gameModel.ice[levelIndex] = [];
        this.gameModel.spring[levelIndex] = [];
        this.gameModel.switches[levelIndex] = [];
        this.gameModel.keysItem[levelIndex] = [];
        this.gameModel.elevatingWalls[levelIndex] = [];
        this.gameModel.flag[levelIndex] = null;
    }

    loadGame() {
        loadJSON('../../asset/level1.json', (jsonData) => this.parseJSON(jsonData)); // Use arrow function to bind context
        this.gameModel.assets.icon = loadImage("../../asset/spritesheet.png");
        this.gameModel.assets.testcat = loadImage("../../asset/testcat.png");//仅作测试,后续删除
        this.gameModel.assets.bg = loadImage("../../asset/backgrounds.png");
        this.gameModel.assets.teachCommand = loadImage("../../asset/teachCommand.png");
    }

    // Load the json file and parse it
    parseJSON(jsonData) {
        this.levelData = jsonData; 
        console.log(this.levelData); // test
        this.gameModel.levelHeight[this.levelIndex] = this.levelData.height;
        this.gameModel.levelWidth[this.levelIndex] = this.levelData.width; 
        this.getColl();    
        this.getDecorate();
        this.getTrap();
        this.getMerge();
        this.getIce();
        this.getSpring();
        this.getInteract();
        this.getClimb();
        this.getCatPosition();
        console.log("ParseJSON done");
    }

    // 从地图获取每一关猫的初始位置坐标
    getCatPosition(){
        let Layer = this.levelData.layers.find(layer => layer.name === "cat");
        let catX = Layer.objects[0].x + CONSTANT.CAT_WIDTH/2; // 让猫的显示位置和地图位置对齐
        let catY = Layer.objects[0].y;
        this.gameModel.cat[this.levelIndex] = new Capoo(catX, catY, this.levelIndex);
        
    }

    getColl(){
        let Layer = this.levelData.layers.find(layer => layer.name === "coll");
        this.gameModel.coll[this.levelIndex] = new Coll(Layer.data, this.levelIndex);
    }

    getClimb(){
        let Layer = this.levelData.layers.find(layer => layer.name === "climb");
        this.gameModel.climb[this.levelIndex] = new Climb(Layer.data, this.levelIndex);
    }

    getDecorate(){
        let Layer = this.levelData.layers.find(layer => layer.name === "decorate");
        this.gameModel.decorate[this.levelIndex] = new Decorate(Layer.data, this.levelIndex);
    }

    getTrap(){
        let Layer = this.levelData.layers.find(layer => layer.name === "trap");
        this.gameModel.trap[this.levelIndex] = new Trap(Layer.data, this.levelIndex);
    }

    getMerge(){
        let Layer = this.levelData.layers.find(layer => layer.name === "merge");
        this.gameModel.merge[this.levelIndex] = new Merge(Layer.data, this.levelIndex);
    }

    getIce(){
        let Layer = this.levelData.layers.find(layer => layer.name === "ice");
        this.gameModel.ice[this.levelIndex] = new Ice(Layer.data, this.levelIndex);
    }

    getSpring(){
        let Layer = this.levelData.layers.find(layer => layer.name === "spring");
        this.gameModel.spring[this.levelIndex] = new Spring(Layer.data, this.levelIndex);
    }

    getInteract(){
        let Layer = this.levelData.layers.find(layer => layer.name === "interact");
        let keyNum = 0;
        let switchNum = 0;
        let elevatingWallNum = 0;
        for(let i = 0; i < Layer.objects.length; i++){
            let interType = Layer.objects[i].type;
            if(interType === "key"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                this.gameModel.keysItem[this.levelIndex][keyNum++] = new KeysItem(x,y,imgIndex,this.levelIndex);
            }
            else if(interType === "switch"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                let id = Layer.objects[i].properties.find(p => p.name === "id").value;
                this.gameModel.switches[this.levelIndex][switchNum++] = new Switches(x,y,imgIndex,this.levelIndex,id);
                //console.log(switches);
            }
            else if(interType === "elevator"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                let id = Layer.objects[i].properties.find(p => p.name === "id").value;
                let range = Layer.objects[i].properties.find(p => p.name === "range").value;
                let towards = Layer.objects[i].properties.find(p => p.name === "towards").value;
                //console.log("range: "+ range);
                this.gameModel.elevatingWalls[this.levelIndex][elevatingWallNum++] = new ElevatingWalls(x,y,imgIndex,this.levelIndex,id,range,towards);
                //console.log(elevatingWalls);
            }
            else if(interType === "flag"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                this.gameModel.flag[this.levelIndex] = new Flag(x,y,imgIndex,this.levelIndex);
            }
        }
    }
}