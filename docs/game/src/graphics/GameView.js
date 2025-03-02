import * as RenderLogic from './RenderLogic.js';
import { CONSTANT, GAME_STATE, Message} from "../core/Utils.js";

export default class GameView {
    constructor(gameModel) {
        this.gameModel = gameModel;
        this.assets = this.gameModel.assets;
        this.img = this.gameModel.assets.rightArrow;
        this.titleMessage = new Message("Capoo", window.innerWidth / 2, window.innerHeight / 5-50, 10000, 200, {}, "Title"); // 标题消息
        this.enterMessage = new Message("Press ENTER To Start", window.innerWidth / 2, window.innerHeight/1.5, 10000, 50, { scaling: true }, "startScreen"); // 动态变化大小的消息
        this.selectMessage = new Message("Use LEFT/RIGHT To Choose\nPress SPACE To Start", window.innerWidth / 2, window.innerHeight / 5-10, 10000, 50, {}, "levelSelectScreen");
        this.tipMessage = new Message("Tip：Do you konw:\nA cat always lands with its feet down\nBread always lands on the creamed side", window.innerWidth / 2, window.innerHeight / 1.2, 2400, 30, {changeAlpha: true}, "Tip");
    }

    // main function of GameView
    render() {
        //console.log('Current game state:', this.gameModel.gameState);

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
        background(173, 216, 230);
        this.enterMessage.show();
        this.titleMessage.show();
    }

    drawLevelSelectScreen() {
        //console.log("GameView level gameModel: ");
        //console.log(this.gameModel);
        background(255, 182, 193);

        this.selectMessage.show();
        this.tipMessage.show();

        for (let i = 0; i < CONSTANT.LEVEL_LIST.length; i++) {
            let size = 60;
            let x = width / 2 - (CONSTANT.LEVEL_LIST.length * size) / 2 + i * size;
            let y = height / 2;
            if (i === this.gameModel.selectedLevel) {
                fill(152, 255, 152);
                strokeWeight(3);
                stroke(255, 255, 255); // color when selected
            } else {
                fill(200, 200, 200);
                strokeWeight(3);
                stroke(255, 255, 255);
            }
            rect(x, y, size, size, 10); // draw buttons
            fill(0, 0, 0);
            textSize(26);
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
        for (let i = this.gameModel.messages.length - 1; i >= 0; i--) {
            if (this.gameModel.messages[i].isExpired()) {
                // 延迟删除消息，避免频繁渲染
                setTimeout(() => {
                    this.gameModel.messages.splice(i, 1); // 删除消息
                }, 10);
            }
        }
    }

    drawGameOverScreen() {}

    drawLevelCompleteScreen() {}
}