import * as RenderLogic from './RenderLogic.js';

export default class GameView {
    constructor(gameModel) {
        this.gameModel = gameModel;
        this.assets = this.gameModel.assets;
    }

    // main function of GameView
    render() {
        RenderLogic.showEntities(this.gameModel, this.assets);
        console.log("GameView render done");
    }

    drawStartScreen() {
        background(100, 150, 200);
        textAlign(CENTER, CENTER);
        textSize(32);
        strokeWeight(3);
        text("Press ENTER to start", width / 2, height / 2);
    }

    drawLevelSelectScreen() {
        background(137, 172, 206);
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(0, 0, 0);
        strokeWeight(3);
        stroke(255, 255, 255);
        text("Use LEFT/RIGHT to chose\nPress SPACE to begin", width / 2, 100);
        for (let i = 0; i < levelList.length; i++) {
            let size = 60;
            let x = width / 2 - (levelList.length * size) / 2 + i * size;
            let y = height / 2;
            if (i === selectedLevel) {
                fill(255, 255, 0); // color when selected
            } else {
                fill(200, 200, 200);
            }
            rect(x, y, size, size, 10); // draw buttons
            fill(0, 0, 0);
            textSize(26);
            strokeWeight(3);
            stroke(255, 255, 255);
            text(levelList[i], x + size / 2, y + size / 2);
        }
    }

    drawGameScreen() {
        this.render();
    }

    drawGameOverScreen() {}

    drawLevelCompleteScreen() {}
}