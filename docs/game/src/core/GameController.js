import MapLoader from "./MapLoader";

// 用于所有关卡的控制
export default class GameController {
    // properties
    gameModel;

    constructor(gameModel) { 
        this.gameModel = gameModel;
        this.gameModel.selectedLevel = 0;
    }

    // 读取地图文件到gameModel
    newGame() {
        let mapLoader = new MapLoader(this.gameModel, this.gameModel.selectedLevel); 
        mapLoader.loadGame();
        
        //console.log("GameController.newGame done");// 测试
        //console.log(this.gameModel);// 测试
    }
    
    // 控制猫移动
    moveCapoo() {
        let selectedLevel = this.gameModel.selectedLevel;
        if (this.gameModel.keys['ArrowLeft']) {
            this.gameModel.cat[selectedLevel].x -= this.gameModel.cat[selectedLevel].speed; 
        }
        if (this.gameModel.keys['ArrowRight']) {
            this.gameModel.cat[selectedLevel].x += this.gameModel.cat[selectedLevel].speed;
        }
    }
  
}