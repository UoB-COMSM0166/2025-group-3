// load assets used in game levels, such as json, images etc.
// every level has to new a MapLoader object to load the level 
// (this process is controlled by GameController)
// the MapLoader object will parse the json file and create objects in the gameModel

import Capoo from "../entities/characters/Capoo";
import Potion from "../entities/characters/Potion";
import ElevatingWalls from "../entities/items/ElevatingWalls";
import Flag from "../entities/items/Flag";
import KeysItem from "../entities/items/KeysItem";
import Switches from "../entities/items/Switches";
import Climb from "../entities/terrain/Climb";
import Coll from "../entities/terrain/Coll";
import Ground from "../entities/terrain/Ground";
import Decorate from "../entities/terrain/Decorate";
import Ice from "../entities/terrain/Ice";
import Merge from "../entities/terrain/Merge";
import Spring from "../entities/terrain/Spring";
import Trap from "../entities/terrain/Trap";
import Water from "../entities/terrain/Water";
import { CONSTANT } from "./Utils";


export default class MapLoader {
    // properties
    gameModel;
    levelIndex;
    levelData;
    
    constructor(gameModel, levelIndex) {
        // set properties
        this.gameModel = gameModel;
        //this.levelIndex = levelIndex; // which level to load
        //this.levelData = {};  // store parsed json data
        this.levelData = [];  // store parsed json data - each element represents a level's json object

       
    }

    loadGame() {
        //this.gameModel.assets.startscreenbg = loadImage("/asset/startscreenbg.png");
        //this.gameModel.assets.selectscreenbg = loadImage("/asset/selectscreenbg.png");
        //this.gameModel.assets.level1bg = loadImage("/asset/level1bg.png");
        //this.gameModel.assets.level2bg = loadImage("/asset/level2bg.png");

        // this.gameModel.assets.startscreenbg_cloud1 = loadImage("/asset/bg/clouds/ocean-3-3-1.png");
        // this.gameModel.assets.startscreenbg_cloud2 = loadImage("/asset/bg/clouds/ocean-3-3-2.png");
        // this.gameModel.assets.startscreenbg_cloud3 = loadImage("/asset/bg/clouds/ocean-3-4.png");

        //loadJSON('../../asset/level1.json', (jsonData) => this.parseJSON(jsonData)); // Use arrow function to bind context
        //loadJSON('../../asset/level2-test.json', (jsonData) => this.parseJSON(jsonData));

        // Level mapping relationship
        // const levelMap = {
        //     0: "../../asset/level1.json",
        //     1: "../../asset/level2-test.json"
        // };

        const levels = [
            "/asset/level1.json",
            "/asset/level2.json",
            "/asset/level3.json",
            "/asset/level4.json",
            "/asset/level5.json",
            "/asset/level6.json",
            "/asset/level7.json",
            "/asset/level8.json",
        ];
        
        // Avoid this.levelIndex affecting all levels, load each level independently
        levels.forEach((levelPath, index) => {
            loadJSON(levelPath, (jsonData) => this.parseJSON(jsonData, index));
        });


        // if (levelPath) {
        //     loadJSON(levelPath, (jsonData) => this.parseJSON(jsonData, selectedLevel));
        // } else {
        //     console.error(`Invalid level index: ${selectedLevel}`);
        // }

        this.gameModel.assets.icon = loadImage("/asset/spritesheet.png");
        this.gameModel.assets.testcat = loadImage("/asset/testcat.png");
        this.gameModel.assets.bg = loadImage("/asset/backgrounds.png");
        this.gameModel.assets.teachCommand = loadImage("/asset/teachCommand.png");
    }

    // Load the json file and parse it
    parseJSON(jsonData, index) {
        this.levelData[index] = jsonData;  // Store each level's data independently
        console.log(`Loaded level ${index}:`, this.levelData[index]); // Each level's json object

         // array initialization
         this.gameModel.levelHeight[index] = 0;
         this.gameModel.levelWidth[index] = 0;
         this.gameModel.decorate[index] = []; 
         this.gameModel.trap[index] = [];
         this.gameModel.water[index] = [];
         this.gameModel.coll[index] = [];
         this.gameModel.merge[index] = [];
         this.gameModel.ice[index] = [];
         this.gameModel.spring[index] = [];
         this.gameModel.switches[index] = [];
         this.gameModel.keysItem[index] = [];
         this.gameModel.elevatingWalls[index] = [];
         this.gameModel.flag[index] = null;

        //this.levelData = jsonData; 
        //console.log(this.levelData); 

        this.gameModel.levelHeight[index] = this.levelData[index].height;
        this.gameModel.levelWidth[index] = this.levelData[index].width; 
        this.getColl(index);    
        this.getGround(index);
        this.getDecorate(index);
        this.getTrap(index);
        this.getWater(index);
        this.getMerge(index);
        this.getIce(index);
        this.getSpring(index);
        this.getInteract(index);
        this.getClimb(index);
        this.getCatPosition(index);
        console.log("ParseJSON done");

        console.log("this.levelIndex", index);
    }

    // Get the initial position coordinates of the cat from the map for each level
    getCatPosition(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "cat");
        let catX = Layer.objects[0].x + CONSTANT.CAT_WIDTH/2; // Align the cat's display position with the map position
        let catY = Layer.objects[0].y;
        this.gameModel.cat[index] = new Capoo(catX, catY, index);
        this.gameModel.potion=new Potion(0,0);
        
    }

    getColl(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "coll");
        this.gameModel.coll[index] = new Coll(Layer.data, index);
    }

    getGround(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "ground");
        this.gameModel.ground[index] = new Ground(Layer.data, index);
    }

    getClimb(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "climb");
        this.gameModel.climb[index] = new Climb(Layer.data, index);
    }

    getDecorate(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "decorate");
        this.gameModel.decorate[index] = new Decorate(Layer.data, index);
    }

    getTrap(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "trap");
        this.gameModel.trap[index] = new Trap(Layer.data, index);
    }

    getWater(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "water");
        this.gameModel.water[index] = new Water(Layer.data, index);
    }

    getMerge(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "merge");
        this.gameModel.merge[index] = new Merge(Layer.data, index);
    }

    getIce(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "ice");
        this.gameModel.ice[index] = new Ice(Layer.data,index);
    }

    getSpring(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "spring");
        this.gameModel.spring[index] = new Spring(Layer.data, index);
    }

    getInteract(index){
        let Layer = this.levelData[index].layers.find(layer => layer.name === "interact");
        let keyNum = 0;
        let switchNum = 0;
        let elevatingWallNum = 0;
        for(let i = 0; i < Layer.objects.length; i++){
            let interType = Layer.objects[i].type;
            if(interType === "key"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                this.gameModel.keysItem[index][keyNum++] = new KeysItem(x,y,imgIndex,index);
            }
            else if(interType === "switch"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                let id = Layer.objects[i].properties.find(p => p.name === "id").value;
                this.gameModel.switches[index][switchNum++] = new Switches(x,y,imgIndex,index,id);
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
                this.gameModel.elevatingWalls[index][elevatingWallNum++] = new ElevatingWalls(x,y,imgIndex,index,id,range,towards);
                //console.log(elevatingWalls);
            }
            else if(interType === "flag"){
                let x = Layer.objects[i].x;
                let y = Layer.objects[i].y - CONSTANT.TILE_SIZE;
                let imgIndex = Layer.objects[i].gid;
                this.gameModel.flag[index] = new Flag(x,y,imgIndex,index);
            }
        }
    }
}