import * as RenderLogic from './RenderLogic.js';
import { CONSTANT, GAME_STATE } from "../core/Utils";

export default class GameView {
    constructor(gameModel) {
        this.gameModel = gameModel;
        this.assets = this.gameModel.assets;
    }

    // main function of GameView
    render() {
        const stateHandlers = {
            [GAME_STATE.START]: this.drawStartScreen.bind(this),
            [GAME_STATE.LEVEL_SELECT]: this.drawLevelSelectScreen.bind(this),
            [GAME_STATE.PLAYING]: this.drawGameScreen.bind(this),
            [GAME_STATE.LEVEL_COMPLETE]: this.drawLevelCompleteScreen.bind(this),
            [GAME_STATE.GAME_OVER]: this.drawGameOverScreen.bind(this),
        };
        if (stateHandlers[this.gameModel.gameState]) {
            stateHandlers[this.gameModel.gameState]();
        } else {
            console.log("Unknown State");
        }
    }

    drawStartScreen() {
        background(100, 150, 200);
        textAlign(CENTER, CENTER);
        textSize(32);
        strokeWeight(3);
        text("Press ENTER to start", width / 2, height / 2);
    }

    drawLevelSelectScreen() {
        //console.log("GameView level gameModel: ");
        //console.log(this.gameModel);
        background(137, 172, 206);
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(0, 0, 0);
        strokeWeight(3);
        stroke(255, 255, 255);
        text("Use LEFT/RIGHT to chose\nPress SPACE to begin", width / 2, 100);
        for (let i = 0; i < CONSTANT.LEVEL_LIST.length; i++) {
            let size = 60;
            let x = width / 2 - (CONSTANT.LEVEL_LIST.length * size) / 2 + i * size;
            let y = height / 2;
            if (i === this.gameModel.selectedLevel) {
                fill(255, 255, 0); // color when selected
            } else {
                fill(200, 200, 200);
            }
            rect(x, y, size, size, 10); // draw buttons
            fill(0, 0, 0);
            textSize(26);
            strokeWeight(3);
            stroke(255, 255, 255);
            text(CONSTANT.LEVEL_LIST[i], x + size / 2, y + size / 2);
        }
    }

    drawGameScreen() {
        // 显示实体
        RenderLogic.showEntities(this.gameModel, this.assets);
        //console.log("GameView render done");

        // 显示所有提示消息
        for (let i = 0; i < this.gameModel.messages.length; i++) {
            this.gameModel.messages[i].show();
        }
        // 删除已过期的第一条消息
        if (this.gameModel.messages.length > 0 && this.gameModel.messages[0].isExpired()) {
            this.gameModel.messages.shift();
        }
    }

    drawGameOverScreen() {}

    drawLevelCompleteScreen() {}
}