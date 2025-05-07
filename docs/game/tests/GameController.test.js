import GameController from "./GameController";
import MapLoader from "./MapLoader";

jest.mock("./MapLoader"); // Mock MapLoader 以避免真实加载地图

describe("GameController Tests", () => {
  
  //测试 GameController 初始化
  test("GameController should initialize with a gameModel", () => {
      const mockGameModel = { selectedLevel: null };
      const controller = new GameController(mockGameModel);
      
      expect(controller.gameModel).toBe(mockGameModel);
      expect(controller.gameModel.selectedLevel).toBe(0);
  });

  //测试 newGame() 方法
  test("newGame should load assets and initialize map", () => {
      const mockGameModel = { assets: {}, selectedLevel: 0 };
      const controller = new GameController(mockGameModel);
      
      controller.newGame();
      
      expect(mockGameModel.assets.startscreenbg).toBeDefined();
      expect(MapLoader).toHaveBeenCalledWith(mockGameModel, 0);
  });

  //测试 moveCapoo() 方法
  test("moveCapoo should reset position when falling into water", () => {
      const mockGameModel = {
          selectedLevel: 0,
          cat: [{ x: 100, y: 200, iniX: 0, iniY: 0 }],
          water: [{ data: [1] }],
          levelWidth: [1]
      };

      const controller = new GameController(mockGameModel);
      
      jest.spyOn(controller, "inWater").mockReturnValue(true);
      
      controller.moveCapoo();

      expect(mockGameModel.cat[0].x).toBe(0);
      expect(mockGameModel.cat[0].y).toBe(0);
  });

  //测试 movePotion() 方法
  test("movePotion should update position when merged", () => {
      const mockGameModel = {
          selectedLevel: 0,
          potion: { x: 50, y: 50 },
          cat: [{ x: 100, y: 100, isMerged: true }]
      };

      const controller = new GameController(mockGameModel);
      controller.movePotion();

      expect(mockGameModel.potion.x).toBe(100);
      expect(mockGameModel.potion.y).toBe(100);
  });

  //测试 isColliding() 方法
  test("isColliding should detect collision", () => {
      const mockGameModel = {
          selectedLevel: 0,
          coll: [{ data: [1] }],
          levelWidth: [1]
      };

      const controller = new GameController(mockGameModel);
      
      const result = controller.isColliding(10, 10, 0, 10, [1]);

      expect(result).toBe(true);
  });

  //测试 getKey() 方法
  test("getKey should update key count", () => {
      const mockGameModel = {
          selectedLevel: 0,
          cat: [{ keyNum: 0 }],
          keysItem: [[{ visible: true, isNear: jest.fn().mockReturnValue(true) }]]
      };

      const controller = new GameController(mockGameModel);
      
      controller.getkey(50, 50, 0);

      expect(mockGameModel.cat[0].keyNum).toBe(1);
      expect(mockGameModel.keysItem[0][0].visible).toBe(false);
  });

  // 测试 controlMergedWall() 方法
  test("controlMergedWall should toggle merge wall visibility", () => {
      const mockGameModel = {
          selectedLevel: 0,
          cat: [{ isMerged: true }],
          merge: [{ visible: false }]
      };

      const controller = new GameController(mockGameModel);
      controller.controlMergedWall();

      expect(mockGameModel.merge[0].visible).toBe(true);
  });

  //测试 controlElevatingWall() 方法
  test("controlElevatingWall should move walls when switch is activated", () => {
      const mockGameModel = {
          selectedLevel: 0,
          cat: [{ x: 50, y: 50 }],
          elevatingWalls: [[{ id: 1, move: jest.fn() }]],
          switches: [[{ id: 1, isNear: jest.fn().mockReturnValue(true), beActivated: false }]]
      };

      const controller = new GameController(mockGameModel);
      
      controller.controlElevatingWall();

      expect(mockGameModel.elevatingWalls[0][0].move).toHaveBeenCalled();
  });

});