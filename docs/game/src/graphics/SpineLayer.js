import * as THREE from 'three';
import * as spine from "@esotericsoftware/spine-threejs";
import { showCapoo/*, CapooX, CapooY*/ } from '../main';
//import { cat } from '../GameModel';



let scene, camera, renderer; // 场景, 相机, 渲染器
let canvas; // 画布
let lastFrameTime = Date.now() / 1000;  // 上一帧时间,用于计算动画的时间增量
let baseUrl = "../../asset/spine/"; 

// 4 套 Spine 模型资源（主体、脸部、帽子、背部）
let atlas;
let assetManager;
let atlasLoader;
let skeletonMesh;
let skeletonFile = "capoo_basic_002.json";
let atlasFile = "capoo_basic_002.atlas";
let animation = "run";

let atlas1;
let assetManager1;
let atlasLoader1;
let skeletonMesh1;
let skeletonFile1 = "capoo_basic_face_001.json";
let atlasFile1 = "capoo_basic_face_001.atlas";
let animation1 = "basic";

let atlas2;
let assetManager2;
let atlasLoader2;
let skeletonMesh2;
let skeletonFile2 = "capoo_hat_102.json";
let atlasFile2 = "capoo_hat_102.atlas";
let animation2 = "animation";

let atlas3;
let assetManager3;
let atlasLoader3;
let skeletonMesh3;
let skeletonFile3 = "capoo_back_102.json";
let atlasFile3 = "capoo_back_102.atlas";
let animation3 = "animation";

// 初始化 Three.js 场景
// 创建 Three.js 场景、相机、渲染器，并将 <canvas> 添加到网页
function init() {
    // create the THREE.JS camera, scene and renderer (WebGL)
    let width = window.innerWidth,
    height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
    camera.position.y = 0;
    camera.position.z = 400;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);
    canvas = renderer.domElement;

    // set the canvas to be full screen, above main layer
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none"; // prevent canvas from blocking pointer events

    // load the assets required to display the Raptor model
    assetManager = new spine.AssetManager(baseUrl);
    assetManager.loadText(skeletonFile);
    assetManager.loadTextureAtlas(atlasFile);

    assetManager1 = new spine.AssetManager(baseUrl);
    assetManager1.loadText(skeletonFile1);
    assetManager1.loadTextureAtlas(atlasFile1);

    assetManager2 = new spine.AssetManager(baseUrl);
    assetManager2.loadText(skeletonFile2);
    assetManager2.loadTextureAtlas(atlasFile2);

    assetManager3 = new spine.AssetManager(baseUrl);
    assetManager3.loadText(skeletonFile3);
    assetManager3.loadTextureAtlas(atlasFile3);

    //console.log("SpineLayer initialized");
    requestAnimationFrame(load);
}

// 加载 Spine 模型
// 加载角色的 .json 骨骼结构和 .atlas 纹理贴图，并将其渲染到 Three.js 场景中
function load(name, scale) {
    console.log("SpineLayer loading");
    if (assetManager.isLoadingComplete()  //等待资源加载完成后，创建模型并添加到场景
        && assetManager1.isLoadingComplete() 
        && assetManager2.isLoadingComplete() 
        && assetManager3.isLoadingComplete()) {
        //console.log("SpineLayer loading complete:" + assetManager.isLoadingComplete());


        // --------------加载 Capoo 主体-------------

        // Load the texture atlas using name.atlas and name.png from the AssetManager.
        // The function passed to TextureAtlas is used to resolve relative paths.
        atlas = assetManager.require(atlasFile);
        // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
        atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        // Create a SkeletonJson instance for parsing the .json file.
        let skeletonJson = new spine.SkeletonJson(atlasLoader);
        // Set the scale to apply during parsing, parse the file, and create a new skeleton.
        skeletonJson.scale = 0.4;
        let skeletonData = skeletonJson.readSkeletonData(
            assetManager.require(skeletonFile)
        );
        // Create a SkeletonMesh from the data and attach it to the scene
        skeletonMesh = new spine.SkeletonMesh({ skeletonData: skeletonData });
        skeletonMesh.state.setAnimation(0, animation, true);
        scene.add(skeletonMesh);

        // --------------加载 Capoo 脸-------------
        // add face
        atlas1 = assetManager1.require(atlasFile1);
        atlasLoader1 = new spine.AtlasAttachmentLoader(atlas1);
        let skeletonJson1 = new spine.SkeletonJson(atlasLoader1);
        skeletonJson1.scale = 0.4;
        let skeletonData1 = skeletonJson1.readSkeletonData(
            assetManager1.require(skeletonFile1)
        );
        skeletonMesh1 = new spine.SkeletonMesh({ skeletonData: skeletonData1 });
        skeletonMesh1.state.setAnimation(0, animation1, true);
        scene.add(skeletonMesh1);

        // --------------加载 Capoo 帽子-------------
        // add hat
        atlas2 = assetManager2.require(atlasFile2);
        atlasLoader2 = new spine.AtlasAttachmentLoader(atlas2);
        let skeletonJson2 = new spine.SkeletonJson(atlasLoader2);
        skeletonJson2.scale = 0.4;
        let skeletonData2 = skeletonJson2.readSkeletonData(
            assetManager2.require(skeletonFile2)
        );
        skeletonMesh2 = new spine.SkeletonMesh({ skeletonData: skeletonData2 });
        skeletonMesh2.state.setAnimation(0, animation2, true);
        scene.add(skeletonMesh2);

        // --------------加载 Capoo 背部(需要分离)-------------
        // add back
        atlas3 = assetManager3.require(atlasFile3);
        atlasLoader3 = new spine.AtlasAttachmentLoader(atlas3);
        let skeletonJson3 = new spine.SkeletonJson(atlasLoader3);
        skeletonJson3.scale = 0.4;
        let skeletonData3 = skeletonJson3.readSkeletonData(
            assetManager3.require(skeletonFile3)
        );
        skeletonMesh3 = new spine.SkeletonMesh({ skeletonData: skeletonData3 });
        skeletonMesh3.state.setAnimation(0, animation3, true);
        scene.add(skeletonMesh3);

        requestAnimationFrame(render);
    } else requestAnimationFrame(load);
}


// 不断更新并渲染动画
let lastTime = Date.now();
function render() {
    // 计算 delta（两帧之间的时间差），用于动画更新
    // calculate delta time for animation purposes
    let now = Date.now() / 1000;
    let delta = now - lastFrameTime;
    lastFrameTime = now;

    // resize canvas to use full page, adjust camera/renderer
    resize();

    // update the animation
    skeletonMesh.update(delta);
    skeletonMesh1.update(delta);
    skeletonMesh2.update(delta);
    skeletonMesh3.update(delta);

    // set the position of Capoo
    // skeletonMesh.position.set(CapooX, CapooY, 0);
    
    // 更新所有模型的动画状态
    // Synchronize the body_face bone of skeletonMesh1 with skeletonMesh
    let bodyFaceSlot = skeletonMesh.skeleton.findBone("body_face_root");
    let faceBodySlot = skeletonMesh1.skeleton.findBone("root");
    skeletonMesh1.position.set(bodyFaceSlot.worldX - faceBodySlot.worldX, bodyFaceSlot.worldY - faceBodySlot.worldY, 1); 

    let bodyHatSlot = skeletonMesh.skeleton.findBone("hat");
    let hatBodySlot = skeletonMesh2.skeleton.findBone("root");
    skeletonMesh2.position.set(bodyHatSlot.worldX - hatBodySlot.worldX, bodyHatSlot.worldY - hatBodySlot.worldY, 1); 

    let bodyBackSlot = skeletonMesh.skeleton.findBone("back");
    let backBodySlot = skeletonMesh3.skeleton.findBone("root");
    skeletonMesh3.position.set(bodyBackSlot.worldX - backBodySlot.worldX, bodyBackSlot.worldY - backBodySlot.worldY, -1);

    // render the scene
    if (typeof showCapoo !== "undefined") {
        skeletonMesh.visible = showCapoo;
        skeletonMesh1.visible = showCapoo;
        skeletonMesh2.visible = showCapoo;
        skeletonMesh3.visible = showCapoo;
    }
    //console.log("showCapoo:" + showCapoo);

    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
}

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (canvas.width != w || canvas.height != h) {
    canvas.width = w;
    canvas.height = h;
    }

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
}

init();
