import { GAME_STATE } from './Utils.js';

// 用于初始化所有关卡所需要的所有图层
// 存放所有关卡的所有图层数据
export default class GameModel {
    // properties
    gameState;
    selectedLevel; // 初始化0,之后用户选择关卡更改这里的值
    firstGameStarted;
    assets;
    levelHeight;
    levelWidth;
    decorate;
    trap;
    coll;
    merge;
    ice;
    spring;
    switches;
    keysItem;
    flag;
    elevatingWalls;
    offsetX;
    offsetY;
    keys;
    messages;
    cat;
    potion;
    flagp;

    constructor() {
        // global state
        this.gameState= GAME_STATE.START;
        this.selectedLevel= 0;
        this.firstGameStarted= true;
        this.assets= {};

        // utilized by MapLoader
        this.levelHeight = []; // number of tiles
        this.levelWidth = [];
        this.decorate = [];
        this.trap = [];
        this.coll = [];
        this.ground = [];
        this.merge = [];
        this.ice = [];
        this.spring = [];
        this.switches = [];
        this.keysItem = [];//keys item in game
        this.elevatingWalls = [];
        this.flag = [];
        this.flagp=0; //用来屏蔽黄油刚开始分开的时候(不然还在安全距离内就会开始判定)
        this.climb = [];
        this.cat = []; // 存储每一关的主角猫对象
        /* 地图未设置黄油层, 即默认所有关卡开始时猫和黄油都是一体的, 其对象存在cat中, 
           之后再考虑是否要设计分离的单独黄油数组 */

        this.offsetX = 0; 
        this.offsetY = 0;  
        this.keys = {}; //keys pressed by keyboard
        this.messages = []; 

        this.potion; // 用于存储黄油对象
    }
    
    
}