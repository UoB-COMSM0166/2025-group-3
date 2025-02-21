import MapLoader from "./MapLoader";

export default class GameController {
    // properties
    gameModel;

    constructor(gameModel) { 
        this.gameModel = gameModel;
        this.gameModel.selectedLevel = 0;
    }

    newGame() {
        let levelIndex = this.gameModel.selectedLevel;
        let mapLoader = new MapLoader(this.gameModel, levelIndex);
        mapLoader.loadGame();
        console.log("GameController.newGame done");
        console.log(this.gameModel);
    }
    

  
}