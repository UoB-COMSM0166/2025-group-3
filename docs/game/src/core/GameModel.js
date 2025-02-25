import { GAME_STATE } from './Utils.js';

export default class GameModel {
    // properties
    gameState;
    selectedLevel;
    firstGameStarted;
    assets;
    levelHeight;
    levelWidth;
    capooX;
    capooY;
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
        this.merge = [];
        this.ice = [];
        this.spring = [];
        this.switches = [];
        this.keysItem = [];//keys item in game
        this.elevatingWalls = [];
        this.flag = [];

        this.offsetX = 0; 
        this.offsetY = 0;  
        this.keys = {}; //keys pressed by keyboard
        this.messages = []; 
    }
    
    
}