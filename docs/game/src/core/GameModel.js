import { GAME_STATE } from './Utils.js';

// Used to initialize all layers needed for all levels
// Stores all layer data for all levels
export default class GameModel {
    // properties
    gameState;
    selectedLevel; // Initialize to 0, later changed when user selects a level
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
        this.water = [];
        this.coll = [];
        this.ground = [];
        this.merge = [];
        this.ice = [];
        this.spring = [];
        this.switches = [];
        this.keysItem = [];//keys item in game
        this.elevatingWalls = [];
        this.flag = [];
        this.flagp=0; //Used to block butter right after separation (prevents detection while still within safe distance)
        this.climb = [];
        this.cat = []; // Stores the main cat object for each level
        /* Map doesn't have a butter layer, meaning cat and butter are merged by default at the start of all levels, their object is stored in cat */

        this.offsetX = 0; 
        this.offsetY = 0;  
        this.keys = {}; //keys pressed by keyboard
        this.keysESC = false; // Records whether ESC has been pressed
        this.showHelp = false;
        this.messages = []; 

        this.potion; // Used to store the butter object
    }
    
    
}