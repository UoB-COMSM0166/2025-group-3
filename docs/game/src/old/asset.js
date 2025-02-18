// 加载和存储所有素材对象
// load and store all assets in an object 

let assets = {};

function preload() {
    assets.icon = loadImage("asset/spritesheet.png");
    assets.testcat = loadImage("asset/testcat.png");//仅作测试,后续删除
}