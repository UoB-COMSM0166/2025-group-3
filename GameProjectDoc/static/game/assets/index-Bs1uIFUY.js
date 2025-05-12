var Kc=Object.defineProperty;var Jc=(r,e,t)=>e in r?Kc(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var v=(r,e,t)=>Jc(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();let jl=!1,Kl=!0,Ea=0,ba=0,dr=!0;const se=Object.freeze({GAME_WIDTH:6400,GAME_HEIGHT:3200,TILE_SIZE:70,TILE_MARGIN:0,LEVEL_LIST:[1,2,3,4,5,6,7,8],FRAME_INTERVAL:18,CAT_WIDTH:80,CAT_HEIGHT:50,POTION_WIDTH:40,POTION_HEIGHT:70});function Ns(r){jl=r}function Fs(r){Kl=r}function Qc(r){Ea=r}function eh(r){ba=r}function th(){dr=!1}function ih(){dr=!0}const Qe=Object.freeze({START:"start",INSTRUCTION:"instruction",LEVEL_SELECT:"levelSelect",PLAYING:"playing",LEVEL_COMPLETE:"levelComplete",GAME_OVER:"game_over",ALLCOMPLETED:"all_completed"});class ei{constructor(e,t,i,n,s,o={},a="default"){this.text=e,this.x=t,this.y=i,this.duration=n,this.size=s,this.alpha=220,this.options=Object.assign({maxbgAlpha:200,maxtextAlpha:220,textAlign:CENTER,textColor:color(255,255,255),backgroundColor:color(0,0,0),borderColor:color(255,255,255),borderWidth:2,font:"Comic Sans MS",scaling:!1,changeAlpha:!1,textPos:"center"},o),this.messageType=a,this.startTime=millis()}show(){let e=millis()-this.startTime,t=this.alpha;this.options.changeAlpha&&(e<=this.duration?(t=map(e,0,this.duration,0,this.options.maxtextAlpha),t=constrain(t,0,this.options.maxtextAlpha)):this.alpha=this.options.maxtextAlpha);let i=this.size;this.options.scaling&&(i=this.size+Math.sin(e/450)*4),this.applyMessageTypeAdjustments(),this.drawMessageText(i,t)}applyMessageTypeAdjustments(){switch(this.messageType){case"Title":this.options.textAlign=CENTER,this.options.textColor=color(108,140,240),this.options.backgroundColor=color(0,0,0,150),this.options.borderColor=color(255,255,143),this.options.borderWidth=10;break;case"startScreen":this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.backgroundColor=color(0,0,139),this.options.borderColor=color(173,216,140),this.options.borderWidth=10;break;case"levelSelectScreen":this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.borderColor=color(255,150,180),this.options.borderWidth=10;break;case"Tip":this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.borderColor=color(255,150,180),this.options.borderWidth=6;break;case"death":this.options.textAlign=CENTER,this.options.textColor=color(255,165,0),this.options.borderColor=color(255,255,255),this.options.borderWidth=4,this.size=30;break;case"gameOver":this.options.textAlign=CENTER,this.options.textColor=color(255,0,0),this.options.backgroundColor=color(0,0,0,180),this.size=40;break;default:this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.backgroundColor=color(0,0,0,200);break}}drawMessageBackground(e,t){textAlign(this.options.textAlign,CENTER),rectMode(CENTER),fill(this.options.backgroundColor.levels[0],this.options.backgroundColor.levels[1],this.options.backgroundColor.levels[2],t);let i=this.countLines(this.text),n=Math.max(200,textWidth(this.text)+e),s=e*i*1.5;rect(this.x,this.y-e*.1,n,s,e/2)}drawMessageText(e,t){fill(this.options.textColor.levels[0],this.options.textColor.levels[1],this.options.textColor.levels[2],t),strokeWeight(this.options.borderWidth),stroke(this.options.borderColor.levels[0],this.options.borderColor.levels[1],this.options.borderColor.levels[2],t),textSize(e),textAlign(CENTER,CENTER),text(this.text,this.x,this.y)}isExpired(){return millis()-this.startTime>this.duration}countLines(e){return e.split(`
`).length}}class nh{constructor(){v(this,"gameState");v(this,"selectedLevel");v(this,"firstGameStarted");v(this,"assets");v(this,"levelHeight");v(this,"levelWidth");v(this,"decorate");v(this,"trap");v(this,"coll");v(this,"merge");v(this,"ice");v(this,"spring");v(this,"switches");v(this,"keysItem");v(this,"flag");v(this,"elevatingWalls");v(this,"offsetX");v(this,"offsetY");v(this,"keys");v(this,"messages");v(this,"cat");v(this,"potion");v(this,"flagp");this.gameState=Qe.START,this.selectedLevel=0,this.firstGameStarted=!0,this.assets={},this.levelHeight=[],this.levelWidth=[],this.decorate=[],this.trap=[],this.water=[],this.coll=[],this.ground=[],this.merge=[],this.ice=[],this.spring=[],this.switches=[],this.keysItem=[],this.elevatingWalls=[],this.flag=[],this.flagp=0,this.climb=[],this.cat=[],this.offsetX=0,this.offsetY=0,this.keys={},this.keysESC=!1,this.showHelp=!1,this.messages=[],this.potion}}class Za{constructor(){}}class Jl extends Za{constructor(t,i){super();v(this,"x");v(this,"y");v(this,"iniX");v(this,"iniY");v(this,"speed");v(this,"maxhp");v(this,"hp");this.x=t,this.y=i,this.iniX=t,this.iniY=i,this.speed=10,this.maxhp=5,this.hp=5}}class sh extends Jl{constructor(e,t){super(e,t),this.speed=10,this.iniX=e,this.iniY=t,this.velocityY=0,this.gravity=.4,this.jumpStrength=-12,this.onGround=!1,this.facingRight=!0,this.isMerged=!0,this.keyNum=0}}class rh extends Jl{constructor(e=0,t=0){super(e,t),this.facingRight=!1,this.facingLeft=!1,this.velocityY=0,this.gravity=.4,this.jumpStrength=-12,this.onGround=!1,this.tanshe=!0,this.onWall=!1,this.scale=.8,this.canShootLeft=!0,this.canShootRight=!0}updatePotion(e,t){Qc((this.x-e)*this.scale+10),eh((t-this.y)*this.scale+10)}}class Rr extends Za{constructor(t,i,n,s){super();v(this,"x");v(this,"y");v(this,"imgIndex");v(this,"levelIndex");this.x=t,this.y=i,this.imgIndex=n,this.levelIndex=s}}class ah extends Rr{constructor(t,i,n,s,o,a,c){super(t,i,n,s);v(this,"id");v(this,"range");v(this,"towards");switch(this.id=o,this.range=a,this.towards=c,this.pixelRange=(a-1)*70,this.iniX=t,this.iniY=i,this.iniTargetX,this.iniTargetY,this.targetX=t,this.targetY=i,this.beActivated=!1,this.speed=20,this.moving=!1,this.movingTimer=0,this.movingDuration=100,this.towards){case"up":this.iniTargetX=t,this.iniTargetY=i-this.pixelRange;break;case"down":this.iniTargetX=t,this.iniTargetY=i+this.pixelRange;break;case"left":this.iniTargetX=t-this.pixelRange,this.iniTargetY=i;break;case"right":this.iniTargetX=t+this.pixelRange,this.iniTargetY=i;break}}isColling(t,i,n,s,o){let a=30,c=this.x+n/2,l=this.y+n/2;return c>=t-s/2-a&&c<=t+s/2+a&&l>=i-o-a&&l<=i+a}update(){if(!this.moving)return;this.movingTimer++;let t=this.movingTimer/this.movingDuration;if(t>=1)this.x=this.targetX,this.y=this.targetY,this.moving=!1,this.movingTimer=0;else{let i=this.beActivated?this.iniX:this.iniTargetX,n=this.beActivated?this.iniTargetX:this.iniX,s=this.beActivated?this.iniY:this.iniTargetY,o=this.beActivated?this.iniTargetY:this.iniY;this.x=i+(n-i)*t,this.y=s+(o-s)*t}}move(){this.beActivated=!this.beActivated,this.beActivated?(this.targetX=this.iniTargetX,this.targetY=this.iniTargetY):(this.targetX=this.iniX,this.targetY=this.iniY),this.moving=!0,this.movingTimer=0}}class oh extends Rr{constructor(t,i,n,s){super(t,i,n,s);v(this,"frameCounter");v(this,"frameIndex");v(this,"animationFrames");this.frameCounter=0,this.frameIndex=0,this.animationFrames=[n,n+1],this.visible=!1}isNear(t,i,n,s,o){let a=20,c=this.x+n/2,l=this.y+n/2;return c>=t-s/2-a&&c<=t+s/2+a&&l>=i-o-a&&l<=i+a}}class lh extends Rr{constructor(t,i,n,s){super(t,i,n,s);v(this,"frameCounter");v(this,"frameIndex");v(this,"animationFrames");v(this,"visible");this.frameCounter=0,this.frameIndex=0,this.animationFrames=[n,n+1],this.visible=!0}isNear(t,i,n,s,o){let a=20,c=this.x+n/2,l=this.y+n/2;return c>=t-s/2-a&&c<=t+s/2+a&&l>=i-o-a&&l<=i+a}}class ch extends Rr{constructor(t,i,n,s,o){super(t,i,n,s);v(this,"id");this.id=o,this.iniImgIndex=n,this.beActivated=!1,this.prevState=!1,this.invincible=!1,this.invincibleTimer=0,this.invincibleDuration=100}isNear(t,i,n,s,o){let a=20,c=this.x+n/2,l=this.y+n/2;return c>=t-s/2-a&&c<=t+s/2+a&&l>=i-o-a&&l<=i+a}}class Ni extends Za{constructor(e,t){super(),this.data=e,this.levelIndex=t}}class hh extends Ni{constructor(e,t){super(e,t)}}class dh extends Ni{constructor(e,t){super(e,t)}}class uh extends Ni{constructor(e,t){super(e,t)}}class fh extends Ni{constructor(e,t){super(e,t)}}class ph extends Ni{constructor(e,t){super(e,t)}}class mh extends Ni{constructor(e,t){super(e,t),this.visible=!0}}class gh extends Ni{constructor(e,t){super(e,t)}}class _h extends Ni{constructor(e,t){super(e,t)}}class xh extends Ni{constructor(e,t){super(e,t)}}class vh{constructor(e,t){v(this,"gameModel");v(this,"levelIndex");v(this,"levelData");this.gameModel=e,this.levelData=[]}loadGame(){["/2025-group-3/game/asset/level1.json","/2025-group-3/game/asset/level2.json","/2025-group-3/game/asset/level3.json","/2025-group-3/game/asset/level4.json","/2025-group-3/game/asset/level5.json","/2025-group-3/game/asset/level6.json","/2025-group-3/game/asset/level7.json","/2025-group-3/game/asset/level8.json"].forEach((t,i)=>{loadJSON(t,n=>this.parseJSON(n,i))}),this.gameModel.assets.icon=loadImage("/2025-group-3/game/asset/spritesheet.png"),this.gameModel.assets.testcat=loadImage("/2025-group-3/game/asset/testcat.png"),this.gameModel.assets.bg=loadImage("/2025-group-3/game/asset/backgrounds.png"),this.gameModel.assets.teachCommand=loadImage("/2025-group-3/game/asset/teachCommand.png")}parseJSON(e,t){this.levelData[t]=e,console.log(`Loaded level ${t}:`,this.levelData[t]),this.gameModel.levelHeight[t]=0,this.gameModel.levelWidth[t]=0,this.gameModel.decorate[t]=[],this.gameModel.trap[t]=[],this.gameModel.water[t]=[],this.gameModel.coll[t]=[],this.gameModel.merge[t]=[],this.gameModel.ice[t]=[],this.gameModel.spring[t]=[],this.gameModel.switches[t]=[],this.gameModel.keysItem[t]=[],this.gameModel.elevatingWalls[t]=[],this.gameModel.flag[t]=null,this.gameModel.levelHeight[t]=this.levelData[t].height,this.gameModel.levelWidth[t]=this.levelData[t].width,this.getColl(t),this.getGround(t),this.getDecorate(t),this.getTrap(t),this.getWater(t),this.getMerge(t),this.getIce(t),this.getSpring(t),this.getInteract(t),this.getClimb(t),this.getCatPosition(t),console.log("ParseJSON done"),console.log("this.levelIndex",t)}getCatPosition(e){let t=this.levelData[e].layers.find(s=>s.name==="cat"),i=t.objects[0].x+se.CAT_WIDTH/2,n=t.objects[0].y;this.gameModel.cat[e]=new sh(i,n,e),this.gameModel.potion=new rh(0,0)}getColl(e){let t=this.levelData[e].layers.find(i=>i.name==="coll");this.gameModel.coll[e]=new dh(t.data,e)}getGround(e){let t=this.levelData[e].layers.find(i=>i.name==="ground");this.gameModel.ground[e]=new uh(t.data,e)}getClimb(e){let t=this.levelData[e].layers.find(i=>i.name==="climb");this.gameModel.climb[e]=new hh(t.data,e)}getDecorate(e){let t=this.levelData[e].layers.find(i=>i.name==="decorate");this.gameModel.decorate[e]=new fh(t.data,e)}getTrap(e){let t=this.levelData[e].layers.find(i=>i.name==="trap");this.gameModel.trap[e]=new _h(t.data,e)}getWater(e){let t=this.levelData[e].layers.find(i=>i.name==="water");this.gameModel.water[e]=new xh(t.data,e)}getMerge(e){let t=this.levelData[e].layers.find(i=>i.name==="merge");this.gameModel.merge[e]=new mh(t.data,e)}getIce(e){let t=this.levelData[e].layers.find(i=>i.name==="ice");this.gameModel.ice[e]=new ph(t.data,e)}getSpring(e){let t=this.levelData[e].layers.find(i=>i.name==="spring");this.gameModel.spring[e]=new gh(t.data,e)}getInteract(e){let t=this.levelData[e].layers.find(o=>o.name==="interact"),i=0,n=0,s=0;for(let o=0;o<t.objects.length;o++){let a=t.objects[o].type;if(a==="key"){let c=t.objects[o].x,l=t.objects[o].y-se.TILE_SIZE,h=t.objects[o].gid;this.gameModel.keysItem[e][i++]=new lh(c,l,h,e)}else if(a==="switch"){let c=t.objects[o].x,l=t.objects[o].y-se.TILE_SIZE,h=t.objects[o].gid,d=t.objects[o].properties.find(u=>u.name==="id").value;this.gameModel.switches[e][n++]=new ch(c,l,h,e,d)}else if(a==="elevator"){let c=t.objects[o].x,l=t.objects[o].y-se.TILE_SIZE,h=t.objects[o].gid,d=t.objects[o].properties.find(g=>g.name==="id").value,u=t.objects[o].properties.find(g=>g.name==="range").value,f=t.objects[o].properties.find(g=>g.name==="towards").value;this.gameModel.elevatingWalls[e][s++]=new ah(c,l,h,e,d,u,f)}else if(a==="flag"){let c=t.objects[o].x,l=t.objects[o].y-se.TILE_SIZE,h=t.objects[o].gid;this.gameModel.flag[e]=new oh(c,l,h,e)}}}}class Mh{constructor(e){v(this,"gameModel");this.gameModel=e,this.gameModel.selectedLevel=0}newGame(){this.gameModel.assets.startscreenbg=loadImage("/2025-group-3/game/asset/startscreenbg.png"),new vh(this.gameModel,this.gameModel.selectedLevel).loadGame()}moveCapoo(){let e=this.gameModel.selectedLevel,t=se.TILE_SIZE,i=this.gameModel.levelWidth,n=this.gameModel.cat[e].x,s=this.gameModel.cat[e].y,o=se.CAT_WIDTH,a=se.CAT_HEIGHT,c=-o/2,l=a/10;if(this.gameModel.keys.r||this.gameModel.keys.R){window.assets.death.play();let y="Restarting level...";this.gameModel.messages.push(new ei(y,width/2,4*height/5,2e3,30,{},"restart")),this.reLife();return}if(this.getkey(this.gameModel.cat[e].x,this.gameModel.cat[e].y,e),this.gameModel.cat[e].keyNum==this.gameModel.keysItem[e].length&&(this.gameModel.flag[e].visible=!0),this.inWater(this.gameModel.cat[e].x-o/2,this.gameModel.cat[e].y,e,t,i)){window.assets.death.play();let y="Cats dissolve easily in water!";this.gameModel.messages.push(new ei(y,width/2,4*height/5,2e3,30,{},"death")),this.reLife();return}let h=o/4,d=this.beTraped(this.gameModel.cat[e].x-h,this.gameModel.cat[e].y-a,e,t,i)||this.beTraped(this.gameModel.cat[e].x+h,this.gameModel.cat[e].y-a,e,t,i),u=this.beTraped(this.gameModel.cat[e].x-h,this.gameModel.cat[e].y-l*2,e,t,i)||this.beTraped(this.gameModel.cat[e].x+h,this.gameModel.cat[e].y-l*2,e,t,i);if(d||u){window.assets.death.play();let y="You are trapped!";this.gameModel.messages.push(new ei(y,width/2,4*height/5,2e3,30,{},"death")),this.reLife();return}let f=o/4,g=this.canClimb(this.gameModel.cat[e].x+c+f,this.gameModel.cat[e].y-l,e,t,i)||this.canClimb(this.gameModel.cat[e].x+o+c-f,this.gameModel.cat[e].y-l,e,t,i),_=o/5;(this.canUseSpring(this.gameModel.cat[e].x,this.gameModel.cat[e].y-l,e,t,i)||this.canUseSpring(this.gameModel.cat[e].x+_,this.gameModel.cat[e].y-l,e,t,i)||this.canUseSpring(this.gameModel.cat[e].x-_,this.gameModel.cat[e].y-l,e,t,i))&&(window.assets.spring.play(),this.gameModel.cat[e].velocityY=this.gameModel.cat[e].jumpStrength*2,this.gameModel.cat[e].onGround=!1),this.gameModel.keys.ArrowLeft&&(n-=this.gameModel.cat[e].speed,th()),this.gameModel.keys.ArrowRight&&(n+=this.gameModel.cat[e].speed,ih()),g&&(this.gameModel.keys.ArrowUp&&(s-=this.gameModel.cat[e].speed),this.gameModel.keys.ArrowDown&&(s+=this.gameModel.cat[e].speed)),this.gameModel.keys[" "]&&this.gameModel.cat[e].isMerged&&(this.gameModel.cat[e].velocityY=this.gameModel.cat[e].jumpStrength,this.gameModel.cat[e].onGround=!1),g||(this.gameModel.cat[e].velocityY+=this.gameModel.cat[e].gravity,s+=this.gameModel.cat[e].velocityY);let m=this.isColliding(n+c,s-a/3-l,e,t,i)||this.isColliding(n+c,s-a*2/3-l,e,t,i)||this.isColliding(n+c,s-a-l,e,t,i)||this.isColliding(n+c,s-l*3/2,e,t,i),w=this.isColliding(n+o+c,s-a/3-l,e,t,i)||this.isColliding(n+o+c,s-a*2/3-l,e,t,i)||this.isColliding(n+o+c,s-a-l,e,t,i)||this.isColliding(n+o+c,s-l*3/2,e,t,i),x=a/5,M=this.isCollidingWithGround(n+o/3+c,s-a-l-x,e,t,i)||this.isCollidingWithGround(n+2*o/3+c,s-a-l-x,e,t,i)||this.isCollidingWithGround(n+c,s-a-l-x,e,t,i)||this.isCollidingWithGround(n+o+c,s-a-l-x,e,t,i),b=this.isCollidingWithGround(n+o/3+c,s-l,e,t,i)||this.isCollidingWithGround(n+2*o/3+c,s-l,e,t,i)||this.isCollidingWithGround(n+c,s-l,e,t,i)||this.isCollidingWithGround(n+o+c,s-l,e,t,i),S=this.isColliding(n+o/3+c,s-a-l-70-x,e,t,i)||this.isColliding(n+2*o/3+c,s-a-l-70-x,e,t,i)||this.isColliding(n+c,s-a-l-70-x,e,t,i)||this.isColliding(n+o+c,s-a-l-70-x,e,t,i),E=M&&S&&(this.gameModel.cat[e].velocityY<=0||g),R=this.isColliding(n+o/3+c,s-l+70,e,t,i)||this.isColliding(n+2*o/3+c,s-l+70,e,t,i)||this.isColliding(n+c,s-l+70,e,t,i)||this.isColliding(n+o+c,s-l+70,e,t,i),I=b&&R&&(this.gameModel.cat[e].velocityY>=0||g);!m&&!w&&(this.gameModel.cat[e].x=n),E?this.gameModel.cat[e].velocityY=Math.abs(this.gameModel.cat[e].velocityY)*.2:!E&&!I?(this.gameModel.cat[e].y=s,g||(this.gameModel.cat[e].onGround=!1)):I&&(this.gameModel.cat[e].velocityY>0&&(this.gameModel.cat[e].onGround=!0),this.gameModel.cat[e].velocityY=0)}movePotion(){let e=this.gameModel.selectedLevel,t=se.TILE_SIZE,i=this.gameModel.levelWidth,n=this.gameModel.potion.x,s=this.gameModel.potion.y,o=se.POTION_WIDTH,a=se.POTION_HEIGHT,c=-o/2,l=a/2,h=!1;if(this.gameModel.potion.updatePotion(this.gameModel.cat[e].x,this.gameModel.cat[e].y),!this.gameModel.cat[e].isMerged&&this.inWater(this.gameModel.potion.x,this.gameModel.potion.y,e,t,i)){window.assets.death.play();let d="No water with my pot！";this.gameModel.messages.push(new ei(d,width/2,4*height/5,2e3,30,{},"death")),this.reLife();return}if(this.beIced(this.gameModel.potion.x,this.gameModel.potion.y+l,e,t,i)&&!this.gameModel.cat[e].isMerged?h=!0:h=!1,(this.gameModel.keys.a||this.gameModel.keys.d)&&!this.gameModel.cat[e].isMerged&&h){let d="Ice! Pot can't jump!";this.gameModel.messages.push(new ei(d,width/2,4*height/5,2e3,30,{},"No Jump"))}if(Math.abs(n-this.gameModel.cat[e].x)<100&&Math.abs(s-this.gameModel.cat[e].y)<100&&this.gameModel.flagp>50&&(this.gameModel.cat[e].isMerged=!0,Fs(!0),Ns(!1),this.gameModel.flagp=0),!this.gameModel.cat[e].isMerged&&this.gameModel.flagp<60&&this.gameModel.flagp++,this.gameModel.cat[e].isMerged&&(this.gameModel.keys.s||this.gameModel.keys.S)&&this.gameModel.flagp<60&&(this.gameModel.cat[e].isMerged=!1,this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y,this.gameModel.potion.velocityY=-10,this.gameModel.potion.speed=0,this.gameModel.potion.tanshe=!1,Fs(!1),Ns(!0)),(this.gameModel.keys.A||this.gameModel.keys.a)&&this.gameModel.potion.tanshe&&!h&&!this.gameModel.cat[e].isMerged&&this.gameModel.potion.canShootLeft&&(this.gameModel.cat[e].isMerged&&(this.gameModel.cat[e].isMerged=!1,this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y-30,Fs(!1),Ns(!0)),this.gameModel.potion.speed=-10,this.gameModel.potion.velocityY=-15,this.gameModel.potion.gravityScale=.4,this.gameModel.potion.tanshe=!1,this.gameModel.potion.onWall=!1,this.gameModel.potion.onGround=!1,this.gameModel.potion.wallFrameCount=0),(this.gameModel.keys.D||this.gameModel.keys.d)&&this.gameModel.potion.tanshe&&!h&&!this.gameModel.cat[e].isMerged&&this.gameModel.potion.canShootRight&&(this.gameModel.cat[e].isMerged&&(this.gameModel.cat[e].isMerged=!1,this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y-30,Fs(!1),Ns(!0)),this.gameModel.potion.speed=10,this.gameModel.potion.velocityY=-15,this.gameModel.potion.gravityScale=.4,this.gameModel.potion.tanshe=!1,this.gameModel.potion.onWall=!1,this.gameModel.potion.onGround=!1,this.gameModel.potion.wallFrameCount=0),this.gameModel.cat[e].isMerged)this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y-30,this.gameModel.potion.tanshe=!0,this.gameModel.potion.canShootLeft=!0,this.gameModel.potion.canShootRight=!0;else{let d=(y,T)=>this.isColliding(y,T,e,t,i),u=d(n+c,s-a/2),f=d(n+o+c,s-a/2),g=d(n+c,s),_=d(n+o/2+c,s),p=f?!1:d(n+o+c,s),m=g||_||p;if((u||f)&&(this.gameModel.potion.onWall=!0,this.gameModel.potion.speed=0,this.gameModel.potion.wallFrameCount||(this.gameModel.potion.wallFrameCount=0,this.gameModel.potion.velocityY=.5),this.gameModel.potion.canShootLeft=!u,this.gameModel.potion.canShootRight=!f,this.gameModel.potion.tanshe=!0),m?(this.gameModel.potion.onGround=!0,this.gameModel.potion.speed*=.8,Math.abs(this.gameModel.potion.speed)<.5&&(this.gameModel.potion.speed=0),this.gameModel.potion.velocityY=0,u||(this.gameModel.potion.canShootLeft=!0),f||(this.gameModel.potion.canShootRight=!0),this.gameModel.potion.tanshe=!0):this.gameModel.potion.onGround=!1,!this.gameModel.potion.onWall&&!this.gameModel.potion.onGround){let y=this.gameModel.potion.gravityScale||1;this.gameModel.potion.velocityY<20&&(this.gameModel.potion.velocityY+=2*y),this.gameModel.potion.wallFrameCount=0}else if(this.gameModel.potion.onWall)if(this.gameModel.potion.wallFrameCount++,this.gameModel.potion.wallFrameCount<10)this.gameModel.potion.velocityY+=.15,this.gameModel.potion.velocityY>2&&(this.gameModel.potion.velocityY=2);else{let y=.05+(this.gameModel.potion.wallFrameCount-10)/300;this.gameModel.potion.velocityY+=y}let w=n+this.gameModel.potion.speed,x=s+this.gameModel.potion.velocityY,M=this.gameModel.potion.speed<0&&d(w+c,s-a/2),b=this.gameModel.potion.speed>0&&d(w+o+c,s-a/2),S=M||b,E=this.gameModel.potion.velocityY>0&&(d(n+c,x)||d(n+o/2+c,x)||(b?!1:d(n+o+c,x))),R=this.gameModel.potion.velocityY<0&&(d(n+c,x-a)||d(n+o/2+c,x-a)||d(n+o+c,x-a)),I=E||R;S?(this.gameModel.potion.speed=0,this.gameModel.potion.onWall=!0,this.gameModel.potion.wallFrameCount||(this.gameModel.potion.wallFrameCount=0,this.gameModel.potion.velocityY=.5),this.gameModel.potion.canShootLeft=!M,this.gameModel.potion.canShootRight=!b,this.gameModel.potion.tanshe=!0):this.gameModel.potion.x=w,I?E?(this.gameModel.potion.onGround=!0,this.gameModel.potion.canShootLeft=!0,this.gameModel.potion.canShootRight=!0,this.gameModel.potion.tanshe=!0,this.gameModel.potion.velocityY=0,this.gameModel.potion.speed=0,this.gameModel.potion.wallFrameCount=0):R&&(this.gameModel.potion.velocityY=0):this.gameModel.potion.y=x}}isColliding(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o,l=this.gameModel.coll[i].data[c]!==0,h=!1,d=this.gameModel.merge[i].data[c]!==0,u=this.gameModel.merge[i].visible;d&&u&&(h=!0);let f=!1;for(let g=0;g<this.gameModel.elevatingWalls[i].length;g++)this.gameModel.elevatingWalls[i][g].isColling(e,t,n,se.CAT_WIDTH,se.CAT_HEIGHT)&&(f=!0);return l||h||f}isCollidingWithGround(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o,l=this.gameModel.ground[i].data[c]!==0,h=!1,d=this.gameModel.merge[i].data[c]!==0,u=this.gameModel.merge[i].visible;d&&u&&(h=!0);let f=!1;for(let g=0;g<this.gameModel.elevatingWalls[i].length;g++)this.gameModel.elevatingWalls[i][g].isColling(e,t,n,se.CAT_WIDTH,se.CAT_HEIGHT)&&(f=!0);return l||h||f}inWater(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o;return this.gameModel.water[i].data[c]!==0}beIced(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o;return this.gameModel.ice[i].data[c]!==0}beTraped(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o;return this.gameModel.trap[i].data[c]!==0}canClimb(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o;return this.gameModel.climb[i].data[c]!==0}canUseSpring(e,t,i,n,s){let o=Math.floor(e/n),c=Math.floor(t/n)*s[i]+o;return this.gameModel.spring[i].data[c]!==0}getkey(e,t,i){for(let n=0;n<this.gameModel.keysItem[i].length;n++)this.gameModel.keysItem[i][n].visible&&this.gameModel.keysItem[i][n].isNear(e,t,se.TILE_SIZE,se.CAT_WIDTH,se.CAT_HEIGHT)&&(window.assets.getKey.play(),this.gameModel.keysItem[i][n].visible=!1,this.gameModel.cat[i].keyNum++)}controlMergedWall(){let e=this.gameModel.selectedLevel;this.gameModel.cat[e].isMerged?this.gameModel.merge[e].visible=!0:this.gameModel.merge[e].visible=!1}reLife(){let e=this.gameModel.selectedLevel;this.gameModel.cat[e].x=this.gameModel.cat[e].iniX,this.gameModel.cat[e].y=this.gameModel.cat[e].iniY,this.gameModel.cat[e].isMerged=!0}controlElevatingWall(){let e=this.gameModel.selectedLevel;for(let t=0;t<this.gameModel.elevatingWalls[e].length;t++)this.gameModel.elevatingWalls[e][t].update();for(let t=0;t<this.gameModel.switches[e].length;t++){if(this.gameModel.switches[e][t].isNear(this.gameModel.cat[e].x,this.gameModel.cat[e].y,se.TILE_SIZE,se.CAT_WIDTH,se.CAT_HEIGHT)&&!this.gameModel.switches[e][t].invincible){window.assets.switch.play(),this.gameModel.switches[e][t].invincible=!0,this.gameModel.switches[e][t].invincibleTimer=0;let i=this.gameModel.switches[e][t].iniImgIndex;this.gameModel.switches[e][t].beActivated?this.gameModel.switches[e][t].imgIndex=i:this.gameModel.switches[e][t].imgIndex=i+1,this.gameModel.switches[e][t].beActivated=!this.gameModel.switches[e][t].beActivated}if(this.gameModel.switches[e][t].prevState!==this.gameModel.switches[e][t].beActivated)for(let i=0;i<this.gameModel.elevatingWalls[e].length;i++)this.gameModel.elevatingWalls[e][i].id===this.gameModel.switches[e][t].id&&this.gameModel.elevatingWalls[e][i].move();this.gameModel.switches[e][t].prevState=this.gameModel.switches[e][t].beActivated,this.gameModel.switches[e][t].invincible&&this.gameModel.switches[e][t].invincibleTimer++,this.gameModel.switches[e][t].invincible&&this.gameModel.switches[e][t].invincibleTimer>=this.gameModel.switches[e][t].invincibleDuration&&(this.gameModel.switches[e][t].invincible=!1,this.gameModel.switches[e][t].invincibleTimer=0)}}}function ur(r){r--;let e=Math.floor((r-1)/30),i=(r-1)%30*(se.TILE_SIZE+se.TILE_MARGIN),n=e*(se.TILE_SIZE+se.TILE_MARGIN);return{x:i,y:n}}function Sh(r,e){let t=Math.floor(r/e),n=r%e*se.TILE_SIZE,s=t*se.TILE_SIZE;return{x:n,y:s}}function Fi(r,e,t,i,n){if(!r){console.log("!!!!!noentitey!!!!!");return}for(let s=0;s<r.data.length;s++){let o=r.data[s];if(o===0)continue;let a=ur(o),c=Sh(s,n);image(i.icon,c.x-e,c.y-t,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE)}}function Os(r,e,t,i,n){n&&(r.frameCounter++,r.frameCounter%se.FRAME_INTERVAL===0&&(r.frameIndex=(r.frameIndex+1)%r.animationFrames.length,r.imgIndex=r.animationFrames[r.frameIndex]));let s=ur(r.imgIndex);image(i.icon,r.x-e,r.y-t,se.TILE_SIZE,se.TILE_SIZE,s.x,s.y,se.TILE_SIZE,se.TILE_SIZE)}class wh{constructor(e){this.gameModel=e,this.assets=this.gameModel.assets,this.img=this.gameModel.assets.rightArrow,this.titleMessage=new ei("Capoo",window.innerWidth/2,window.innerHeight/5-50,1e4,200,{},"Title"),this.enterMessage=new ei("Press ENTER To Start",window.innerWidth/2,window.innerHeight/1.5,1e4,50,{scaling:!0},"startScreen"),this.selectMessage=new ei(`Use LEFT/RIGHT To Choose
Press ENTER To Start`,window.innerWidth/2,window.innerHeight/5-10,1e4,50,{},"levelSelectScreen"),this.tipMessage=new ei(`Tip: Do you know
a cat always lands with its feet down
Bread always lands on the creamed side`,window.innerWidth/2,window.innerHeight/1.2,3e3,30,{changeAlpha:!0},"Tip"),this.instructionTitle=new ei("Game Instructions",window.innerWidth/2,window.innerHeight/6,1e4,60,{},"Title"),this.instructionMessage=new ei(`You are a cute cat!
Collect all three keys to make the flag appear.
Reach the flag to complete the level.`,window.innerWidth/2,window.innerHeight/2+100,1e4,40,{},"Tip"),this.instructionContinue=new ei("Press ENTER to continue",window.innerWidth/2,window.innerHeight/1.2+50,1e4,30,{scaling:!0},"startScreen"),this.startScreenClouds=[{img:window.assets.startscreenbg_cloud1,x:0,y:560,speed:1.4,scale:2},{img:window.assets.startscreenbg_cloud2,x:1e3,y:600,speed:1,scale:2},{img:window.assets.startscreenbg_cloud3,x:900,y:300,speed:2.4,scale:1.7},{img:window.assets.startscreenbg_cloud2,x:150,y:570,speed:1.3,scale:2},{img:window.assets.startscreenbg_cloud1,x:860,y:400,speed:1.7,scale:2.1},{img:window.assets.startscreenbg_cloud2,x:2e3,y:630,speed:2,scale:2},{img:window.assets.startscreenbg_cloud1,x:1200,y:210,speed:2.3,scale:2.2},{img:window.assets.startscreenbg_cloud3,x:700,y:400,speed:2.4,scale:1.8},{img:window.assets.startscreenbg_cloud4,x:10,y:40,speed:2,scale:1.2},{img:window.assets.startscreenbg_cloud4,x:60,y:320,speed:1.6,scale:1.5}],this.selectScreenClouds=[{img:window.assets.selectscreenbg_cloud4,x:0,y:560,speed:1.4,scale:1.2},{img:window.assets.selectscreenbg_cloud4,x:300,y:390,speed:1,scale:1.1},{img:window.assets.selectscreenbg_cloud2,x:20,y:240,speed:2,scale:1.3},{img:window.assets.selectscreenbg_cloud4,x:860,y:500,speed:1.7,scale:1},{img:window.assets.selectscreenbg_cloud2,x:1e3,y:390,speed:2.3,scale:1},{img:window.assets.selectscreenbg_cloud2,x:1900,y:340,speed:2.1,scale:1.7},{img:window.assets.selectscreenbg_cloud4,x:1400,y:560,speed:1.8,scale:1.6},{img:window.assets.selectscreenbg_cloud2,x:700,y:720,speed:1.5,scale:1.3}]}render(){const e={[Qe.START]:this.drawStartScreen.bind(this),[Qe.INSTRUCTION]:this.drawInstructionScreen.bind(this),[Qe.LEVEL_SELECT]:this.drawLevelSelectScreen.bind(this),[Qe.PLAYING]:this.drawGameScreen.bind(this),[Qe.LEVEL_COMPLETE]:this.drawLevelCompleteScreen.bind(this),[Qe.GAME_OVER]:this.drawGameOverScreen.bind(this),[Qe.ALLCOMPLETED]:this.drawAllCompleted.bind(this)};e[this.gameModel.gameState]?e[this.gameModel.gameState]():console.log("Unknown State")}drawLoadingScreen(){background(255);let e=40;stripeOffset+=1,stripeOffset>=e*colors.length&&(stripeOffset=0);for(let t=-stripeOffset;t<height;t+=e){let i=int((t+stripeOffset)/e)%colors.length;fill(colors[i]),noStroke(),rect(0,t,width,e)}fill(0);for(let t=0;t<loadingText.length;t++){let i=width/2-(loadingText.length/2-t)*18,n=sin(frameCount*.15+letterJump[t])*10;text(loadingText[t],i,height/2+n)}}drawStartScreen(){image(window.assets.startscreenbg,0,0,window.innerWidth,window.innerHeight);for(let e of this.startScreenClouds)if(e.img){let t=e.img.width*e.scale,i=e.img.height*e.scale;image(e.img,e.x,e.y,t,i),e.x-=e.speed,e.x+t<0&&(e.x=window.innerWidth)}this.enterMessage.show(),this.titleMessage.show()}drawInstructionScreen(){image(window.assets.instructionbg,0,0,window.innerWidth,window.innerHeight);for(let e of this.startScreenClouds)if(e.img){let t=e.img.width*e.scale,i=e.img.height*e.scale;image(e.img,e.x,e.y,t,i),e.x-=e.speed,e.x+t<0&&(e.x=window.innerWidth)}textAlign(CENTER),fill(color(108,140,240)),stroke(color(255,255,143)),strokeWeight(10),textSize(120),text("Game Instructions",window.innerWidth/2,window.innerHeight/6),this.instructionMessage.show(),this.instructionContinue.show()}drawLevelSelectScreen(){background(255,182,193),image(window.assets.selectscreenbg,0,0,windowWidth,windowHeight);for(let e of this.selectScreenClouds)if(e.img){let t=e.img.width*e.scale,i=e.img.height*e.scale;image(e.img,e.x,e.y,t,i),e.x-=e.speed,e.x+t<0&&(e.x=window.innerWidth)}this.selectMessage.show(),this.tipMessage.show();for(let e=0;e<se.LEVEL_LIST.length;e++){let t=60,i=width/2-se.LEVEL_LIST.length*t/2+e*t,n=height/2;e===this.gameModel.selectedLevel?(fill(152,255,152),strokeWeight(3),stroke(255,255,255)):(fill(200,200,200),strokeWeight(3),stroke(255,255,255)),rect(i,n,t,t,10),fill(0,0,0),textSize(26),text(se.LEVEL_LIST[e],i+t/2,n+t/2)}}drawGameScreen(){let e=this.gameModel,t=this.assets,i=e.selectedLevel,n=e.levelWidth[e.selectedLevel],s=e.cat[i].x-window.innerWidth/2,o=e.cat[i].y-window.innerHeight/2;imageMode(CENTER),i==0?image(window.assets.level1bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==1?image(window.assets.level2bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==2?image(window.assets.level3bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==3?image(window.assets.level4bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==4?image(window.assets.level5bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==5?image(window.assets.level6bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==6?image(window.assets.level7bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):i==7&&image(window.assets.level8bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight),imageMode(CORNER);for(let h=0;h<e.elevatingWalls[i].length;h++)Os(e.elevatingWalls[i][h],s,o,t,!1);Fi(e.coll[i],s,o,t,n),Fi(e.decorate[i],s,o,t,n),Fi(e.trap[i],s,o,t,n),Fi(e.water[i],s,o,t,n),Fi(e.ice[i],s,o,t,n),Fi(e.climb[i],s,o,t,n),Fi(e.spring[i],s,o,t,n),e.merge[i].visible&&Fi(e.merge[i],s,o,t,n);for(let h=0;h<e.keysItem[i].length;h++)e.keysItem[i][h].visible&&Os(e.keysItem[i][h],s,o,t,!0);for(let h=0;h<e.switches[i].length;h++)Os(e.switches[i][h],s,o,t,!1);e.flag[i].visible&&Os(e.flag[i],s,o,t,!0);let a=ur(429),c=ur(430);this.gameModel.cat[i].keyNum==0&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE)),this.gameModel.cat[i].keyNum==1&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE)),this.gameModel.cat[i].keyNum==2&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE)),this.gameModel.cat[i].keyNum==3&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE)),fill(255),stroke(50,110,185),strokeWeight(5),textSize(window.innerWidth/38),textAlign(CORNER),text("ESC - Exit",window.innerHeight/20,window.innerWidth/25+12),text("H - Help",window.innerHeight/20,window.innerWidth/60),text("R - Reset",window.innerHeight/20,window.innerWidth/9);for(let h=0;h<this.gameModel.messages.length;h++)this.gameModel.messages[h].show();this.gameModel.messages.length>0&&(this.gameModel.messages=this.gameModel.messages.filter(h=>!h.isExpired())),this.gameModel.messages.length>10&&(this.gameModel.messages=this.gameModel.messages.slice(-10)),this.gameModel.showHelp&&this.showhelpscreen(i)}showhelpscreen(e){if(e==0&&e==1){fill(255,255,255,170),stroke(255),strokeWeight(5);let t=50;rect(t,t,window.innerWidth-2*t,window.innerHeight-2*t,25),textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),textSize(window.innerWidth/38),text("Find three keys and touch the flag to pass.",window.innerWidth/2,t+50),fill(255,255,153),stroke(255),text("3 Keys       Flag  ",window.innerWidth/2,t+90),fill(255),stroke(50,110,185),strokeWeight(5),text("Press                 to return to the game.",window.innerWidth/2,t+150),fill(61,170,110),stroke(255),text("   H                           ",window.innerWidth/2,t+150),fill(255),stroke(50,110,185),text("Press             to Exit.",window.innerWidth/2,t+190),fill(169,59,70),stroke(255),text("ESC  ",window.innerWidth/2,t+190),fill(255),stroke(50,110,185),textSize(window.innerWidth/50);let n=window.innerHeight/19,s=window.innerWidth/2,o=t+250;textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),text("You're a wizard cat.",s,o),o+=n,text("You can move by pressing                        and                       .",s,o),fill(43,177,235),stroke(255),text("                                       Right Arrow          Left Arrow",s,o),o+=n,fill(255),stroke(50,110,185),text("You can fly upwards infinitely by pressing               when you have the potion on your back.",s,o),fill(43,177,235),stroke(255),text("    SPACE",s,o),fill(255),stroke(50,110,185),o+=n,text("You can drop the potion by pressing     .",s,o),fill(43,177,235),stroke(255),text("                                                       S",s,o),fill(255),stroke(50,110,185),o+=n,text("You will automatically pick up the potion when you're close to it.",s,o),o+=n,text("You can climb ladders            by pressing                 and                      .",s,o),fill(60,179,113),stroke(255),text("                                 Tree                      Up Arrow         Down Arrow",s,o),textFont(window.assets.textFont1),o+=n,fill(255),stroke(50,110,185),text("Press ANY KEY to change cat's facial expression.",s,o),fill(43,177,235),stroke(255),text("                        ",s,o)}else if(e==2){fill(255,255,255,170),stroke(255),strokeWeight(5);let t=50;rect(t,t,window.innerWidth-2*t,window.innerHeight-2*t,25),textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),text("Find              and touch the           to pass.",window.innerWidth/2-20,window.innerHeight/2-window.innerHeight/3.1-60),fill(255,223,0),stroke(255),text("                       3 Keys                          Flag  ",window.innerWidth/2-200,window.innerHeight/2-window.innerHeight/3.1-60),fill(255),stroke(50,110,185),strokeWeight(5),textSize(window.innerWidth/38),text("Press         to return to the game.",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1),fill(61,170,110),stroke(255),text("   H                              ",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1),fill(255),stroke(50,110,185),text("Press            to Exit.",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1+window.innerWidth/24),fill(169,59,70),stroke(255),text("ESC  ",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1+window.innerWidth/24),fill(255),stroke(50,110,185);let n=window.innerWidth/2,s=window.innerHeight/2+window.innerHeight/13;textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),text("                        will disappear when you drop the pot.",n,s),fill(169,59,70),stroke(255),text(" ! Wall",n/1.6,s)}else{fill(255,255,255,170),stroke(255),strokeWeight(5);let t=50;rect(t,t,window.innerWidth-2*t,window.innerHeight-2*t,25),textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),text("Find              and touch the           to pass.",window.innerWidth/2-20,window.innerHeight/2-window.innerHeight/3.1-60),fill(255,223,0),stroke(255),text("                       3 Keys                          Flag  ",window.innerWidth/2-200,window.innerHeight/2-window.innerHeight/3.1-60),fill(255),stroke(50,110,185),strokeWeight(5),textSize(window.innerWidth/38),text("Press         to return to the game.",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1),fill(61,170,110),stroke(255),text("   H                              ",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1),fill(255),stroke(50,110,185),text("Press            to Exit.",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1+window.innerWidth/24),fill(169,59,70),stroke(255),text("ESC  ",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1+window.innerWidth/24),fill(255),stroke(50,110,185),textSize(window.innerWidth/50);let n=window.innerHeight/19,s=window.innerWidth/2,o=window.innerHeight/2+window.innerHeight/13;textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),text("You're a wizard cat.",s,o),o+=n,text("You can move by pressing                        and                       .",s,o),fill(43,177,235),stroke(255),text("                                       Right Arrow          Left Arrow",s,o),o+=n,fill(255),stroke(50,110,185),text("You can fly upwards infinitely by pressing               when you have the potion on your back.",s,o),fill(43,177,235),stroke(255),text("    SPACE",s,o),fill(255),stroke(50,110,185),o+=n,text("You can drop the potion by pressing     .",s,o),fill(43,177,235),stroke(255),text("                                                       S",s,o),fill(255),stroke(50,110,185),o+=n,text("You will automatically pick up the potion when you're close to it.",s,o),o+=n,text("You can climb ladders            by pressing                 and                      .",s,o),fill(60,179,113),stroke(255),text("                                 Tree                      Up Arrow         Down Arrow",s,o),textFont(window.assets.textFont1),o+=n,fill(255),stroke(50,110,185),text("Pot can be made to jump using      and        (except on          ).",s,o),fill(43,177,235),stroke(255),text("                                            A        D                     ICE",s,o)}}drawGameOverScreen(){}drawLevelCompleteScreen(){let e=window.innerWidth,t=window.innerHeight;image(window.assets.levelCompletebg,0,0,e,t),textAlign(CENTER,CENTER),textSize(window.innerWidth/25),fill(0,0,0),strokeWeight(5),stroke(255,255,255),text("Level Complete!",e/2,t/2+80),textSize(window.innerWidth/160),strokeWeight(5),text("Press ANY KEY for next level",e/2,t/2+200),text("Press ESC to return to level select",e/2,t/2+250)}drawAllCompleted(){image(window.assets.completed,0,0,width,height),image(window.assets.title,window.innerWidth/4,window.innerHeight/25,900,300),textSize(window.innerWidth/50);let e=window.innerWidth/2,t=window.innerHeight/2+window.innerHeight/13;textAlign(CENTER,CENTER),fill(255),stroke(255,150,180),strokeWeight(5),text(`Thanks for playing !
presented by YiBu MA, PeiXuan Li, Yu Qiu, JiaXin Fan, ShuYin Deng, JiaHao LIU`,e,t)}}let oe,qn,Ta,Br=!0;window.currentFaceIndex=0;window.assets={};let zr=0;const co=10;window.preload=function(){oe=new nh,qn=new Mh(oe),Ta=new wh(oe)};window.setup=function(){createCanvas(window.innerWidth,window.innerHeight),document.addEventListener("wheel",function(t){t.ctrlKey&&t.preventDefault()},{passive:!1}),document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("keydown",function(t){t.ctrlKey&&(t.key==="+"||t.key==="-"||t.key==="0")&&t.preventDefault()});function r(){zr++,console.log(`Sound loaded: ${zr}/${co}`),zr===co&&(console.log("All sounds loaded! Ready to start the game."),window.allSoundsLoaded=!0)}window.assets.bgm=loadSound("/2025-group-3/game/asset/sounds/background_music.wav",r),window.assets.splitPotion=loadSound("/2025-group-3/game/asset/sounds/effect_e010_splitPotion.wav",r),window.assets.getPotion=loadSound("/2025-group-3/game/asset/sounds/effect_e012_getPotion.wav",r),window.assets.getKey=loadSound("/2025-group-3/game/asset/sounds/effect_e002_getkey.wav",r),window.assets.death=loadSound("/2025-group-3/game/asset/sounds/effect_e014_death.wav",r),window.assets.spring=loadSound("/2025-group-3/game/asset/sounds/effect_e016_spring.wav",r),window.assets.switch=loadSound("/2025-group-3/game/asset/sounds/effect_e021_switch.wav",r),window.assets.levelComplete=loadSound("/2025-group-3/game/asset/sounds/effect_e026_levelComplete.mp3",r),window.assets.userStartGame=loadSound("/2025-group-3/game/asset/sounds/effect_e017_miaomiaomiao.wav",r),window.assets.userSelectLevel=loadSound("/2025-group-3/game/asset/sounds/effect_e020_miao.wav",r),window.assets.textFont1=loadFont("/2025-group-3/game/asset/fonts/comic.ttf"),window.assets.startscreenbg=loadImage("/2025-group-3/game/asset/startscreenbg.png"),window.assets.selectscreenbg=loadImage("/2025-group-3/game/asset/selectscreenbg.png"),window.assets.levelCompletebg=loadImage("/2025-group-3/game/asset/bg/Summer6-new.png"),window.assets.level1bg=loadImage("/2025-group-3/game/asset/bg/Summer8-new.png"),window.assets.level2bg=loadImage("/2025-group-3/game/asset/bg/Summer5-new.png"),window.assets.level3bg=loadImage("/2025-group-3/game/asset/bg/Summer3.png"),window.assets.level4bg=loadImage("/2025-group-3/game/asset/bg/nature3.png"),window.assets.level5bg=loadImage("/2025-group-3/game/asset/bg/ocean2.png"),window.assets.level6bg=loadImage("/2025-group-3/game/asset/bg/night1.png"),window.assets.level7bg=loadImage("/2025-group-3/game/asset/bg/ocean4.png"),window.assets.level8bg=loadImage("/2025-group-3/game/asset/bg/Summer7.png"),window.assets.completed=loadImage("/2025-group-3/game/asset/bg/completed.png"),window.assets.instructionbg=loadImage("/2025-group-3/game/asset/bg/instructionbg.png"),window.assets.title=loadImage("/2025-group-3/game/asset/title.png"),window.assets.startscreenbg_cloud1=loadImage("/2025-group-3/game/asset/bg/clouds/ocean-3-3-1.png"),window.assets.startscreenbg_cloud2=loadImage("/2025-group-3/game/asset/bg/clouds/ocean-3-3-2.png"),window.assets.startscreenbg_cloud3=loadImage("/2025-group-3/game/asset/bg/clouds/ocean-3-4.png"),window.assets.startscreenbg_cloud4=loadImage("/2025-group-3/game/asset/bg/clouds/clouds-5-3.png"),window.assets.selectscreenbg_cloud2=loadImage("/2025-group-3/game/asset/bg/clouds/cloud-2-3.png"),window.assets.selectscreenbg_cloud4=loadImage("/2025-group-3/game/asset/bg/clouds/cloud-7-4-1.png");let e=setInterval(()=>{window.allSoundsLoaded&&(clearInterval(e),console.log("All sounds are loaded! Starting game..."),window.assets.bgm.setVolume(1),window.assets.userSelectLevel.setVolume(.4),window.assets.death.setVolume(.4),window.assets.bgm.loop(),textFont(window.assets.textFont1),console.log("Main setup done"),qn.newGame(),oe.gameState=Qe.START,loop())},1);noLoop()};window.draw=function(){const e=millis();if(e-(window.lastDrawTime||0)<1e3/60)return;if(window.lastDrawTime=e,!window.allSoundsLoaded||!Ta){let n=color("#d0f0ff");background(n),background("#a7ddf5"),noStroke(),fill(255);let s=60,o=20;for(let a=0;a<height+s;a+=s)for(let c=0;c<width+s;c+=s){let l=a/s%2===0?0:s/2;ellipse(c+l,a,o)}fill("#444"),noStroke(),textAlign(CENTER,CENTER),textFont("Comic Sans MS"),textSize(32),text("Loading...",width/2,height/2+60);return}Ta.render();let i=oe.selectedLevel;oe.gameState===Qe.PLAYING&&(qn.moveCapoo(),qn.movePotion(),qn.controlMergedWall(),qn.controlElevatingWall(),oe.flag[i].visible&&oe.flag[i].isNear(oe.cat[i].x,oe.cat[i].y,se.TILE_SIZE,se.CAT_WIDTH,se.CAT_HEIGHT)&&(window.assets.levelComplete.play(),oe.gameState=Qe.LEVEL_COMPLETE))};document.addEventListener("DOMContentLoaded",function(){window.addEventListener("keydown",function(r){["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(r.key)&&r.preventDefault(),r.ctrlKey&&(r.key==="-"||r.key==="+")&&r.preventDefault()},{passive:!1})});function yh(){window.currentFaceIndex=(window.currentFaceIndex+1)%16}window.keyPressed=function(){if(oe.gameState===Qe.PLAYING&&yh(),oe.gameState===Qe.START&&keyCode===ENTER)window.assets.userStartGame.play(),oe.gameState=Qe.INSTRUCTION;else if(oe.gameState===Qe.INSTRUCTION&&keyCode===ENTER)oe.gameState=Qe.LEVEL_SELECT,window.assets.userSelectLevel.play();else if(oe.gameState===Qe.LEVEL_SELECT){if(keyCode===LEFT_ARROW)oe.selectedLevel=Math.max(0,oe.selectedLevel-1),console.log("selectedLevel: "+oe.selectedLevel);else if(keyCode===RIGHT_ARROW)oe.selectedLevel=Math.min(se.LEVEL_LIST.length-1,oe.selectedLevel+1),console.log("selectedLevel: "+oe.selectedLevel);else if(keyCode===ENTER){oe.gameState=Qe.PLAYING,window.assets.userSelectLevel.play(),oe.cat[oe.selectedLevel].x=oe.cat[oe.selectedLevel].iniX,oe.cat[oe.selectedLevel].y=oe.cat[oe.selectedLevel].iniY,oe.cat[oe.selectedLevel].keyNum=0;for(let r=0;r<oe.keysItem[oe.selectedLevel].length;r++)oe.keysItem[oe.selectedLevel][r].visible=!0;for(let r=0;r<oe.elevatingWalls[oe.selectedLevel].length;r++)oe.elevatingWalls[oe.selectedLevel][r].x=oe.elevatingWalls[oe.selectedLevel][r].iniX,oe.elevatingWalls[oe.selectedLevel][r].y=oe.elevatingWalls[oe.selectedLevel][r].iniY,oe.elevatingWalls[oe.selectedLevel][r].moving=!1,oe.elevatingWalls[oe.selectedLevel][r].beActivated=!1;for(let r=0;r<oe.switches[oe.selectedLevel].length;r++)oe.switches[oe.selectedLevel][r].invincible=!1,oe.switches[oe.selectedLevel][r].beActivated=!1,oe.switches[oe.selectedLevel][r].prevState=!1;oe.selectedLevel<=2&&(oe.showHelp=!0)}}else if(oe.gameState===Qe.PLAYING){if(!oe.keys[key]){if(oe.keys[key]=!0,key==="h"||key==="H"){oe.showHelp=!oe.showHelp;return}if(keyCode===ESCAPE){oe.showHelp?(oe.showHelp=!1,oe.keysESC=!1):oe.gameState=Qe.LEVEL_SELECT;return}}if(oe.showHelp)return}else oe.gameState===Qe.GAME_OVER&&key==="r"?oe.gameState=Qe.START:oe.gameState===Qe.LEVEL_COMPLETE?keyCode===ESCAPE?oe.selectedLevel===se.LEVEL_LIST.length-1?oe.gameState=Qe.ALLCOMPLETED:oe.gameState=Qe.LEVEL_SELECT:oe.selectedLevel===se.LEVEL_LIST.length-1?oe.gameState=Qe.ALLCOMPLETED:oe.selectedLevel<se.LEVEL_LIST.length-1?(oe.selectedLevel++,oe.gameState=Qe.PLAYING):oe.gameState=Qe.LEVEL_SELECT:oe.gameState===Qe.ALLCOMPLETED&&(keyCode,ESCAPE,oe.gameState=Qe.START)};window.keyReleased=function(){oe.keys[key]!==void 0&&delete oe.keys[key]};window.windowResized=function(){const r=window.devicePixelRatio;console.log("当前缩放比例:",r)};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $a="162",Eh=0,ho=1,bh=2,Ql=1,Th=2,Ai=3,nn=0,zt=1,gi=2,Ki=0,Pi=1,Aa=2,uo=3,fo=4,Ca=5,gn=100,Ah=101,Ch=102,po=103,mo=104,Rh=200,lr=201,Lh=202,Ra=203,La=204,bs=205,Ph=206,Ih=207,ec=208,Dh=209,Uh=210,Nh=211,Fh=212,Oh=213,kh=214,Bh=0,zh=1,Gh=2,fr=3,Hh=4,Vh=5,Wh=6,Xh=7,tc=0,Yh=1,qh=2,Ji=0,Zh=1,$h=2,jh=3,Kh=4,Jh=5,Qh=6,ed=7,ic=300,os=301,ls=302,Pa=303,Ia=304,Lr=306,pr=1e3,ii=1001,mr=1002,xt=1003,go=1004,td=1004,ms=1005,id=1005,bt=1006,Gr=1007,nd=1007,Sn=1008,sd=1008,Qi=1009,rd=1010,ad=1011,ja=1012,nc=1013,$i=1014,Ci=1015,Ts=1016,sc=1017,rc=1018,yn=1020,od=1021,ci=1023,ld=1024,cd=1025,En=1026,cs=1027,hd=1028,ac=1029,dd=1030,oc=1031,lc=1033,Hr=33776,Vr=33777,Wr=33778,Xr=33779,_o=35840,xo=35841,vo=35842,Mo=35843,cc=36196,So=37492,wo=37496,yo=37808,Eo=37809,bo=37810,To=37811,Ao=37812,Co=37813,Ro=37814,Lo=37815,Po=37816,Io=37817,Do=37818,Uo=37819,No=37820,Fo=37821,Yr=36492,Oo=36494,ko=36495,ud=36283,Bo=36284,zo=36285,Go=36286,fd=3200,pd=3201,md=0,gd=1,Xi="",fi="srgb",sn="srgb-linear",Ka="display-p3",Pr="display-p3-linear",gr="linear",at="srgb",_r="rec709",xr="p3",Pn=7680,Ho=519,_d=512,xd=513,vd=514,hc=515,Md=516,Sd=517,wd=518,yd=519,Da=35044,Vo="300 es",Ua=1035,Li=2e3,vr=2001;class us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const s=n.indexOf(t);s!==-1&&n.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let s=0,o=n.length;s<o;s++)n[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qr=Math.PI/180,Na=180/Math.PI;function en(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Bt(r,e,t){return Math.max(e,Math.min(t,r))}function Ed(r,e){return(r%e+e)%e}function Zr(r,e,t){return(1-t)*r+t*e}function Wo(r){return(r&r-1)===0&&r!==0}function Fa(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function _i(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function tt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}let et=class dc{constructor(e=0,t=0){dc.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*n+e.x,this.y=s*n+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};class We{constructor(e,t,i,n,s,o,a,c,l){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,o,a,c,l)}set(e,t,i,n,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=n,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],_=n[0],p=n[3],m=n[6],w=n[1],x=n[4],M=n[7],b=n[2],S=n[5],E=n[8];return s[0]=o*_+a*w+c*b,s[3]=o*p+a*x+c*S,s[6]=o*m+a*M+c*E,s[1]=l*_+h*w+d*b,s[4]=l*p+h*x+d*S,s[7]=l*m+h*M+d*E,s[2]=u*_+f*w+g*b,s[5]=u*p+f*x+g*S,s[8]=u*m+f*M+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*s*h+i*a*c+n*s*l-n*o*c}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,u=a*c-h*s,f=l*s-o*c,g=t*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(n*l-h*i)*_,e[2]=(a*i-n*o)*_,e[3]=u*_,e[4]=(h*t-n*c)*_,e[5]=(n*s-a*t)*_,e[6]=f*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-n*l,n*c,-n*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($r.makeScale(e,t)),this}rotate(e){return this.premultiply($r.makeRotation(-e)),this}translate(e,t){return this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new We;function uc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Mr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function bd(){const r=Mr("canvas");return r.style.display="block",r}const Xo={};function fc(r){r in Xo||(Xo[r]=!0,console.warn(r))}const Yo=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qo=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ks={[sn]:{transfer:gr,primaries:_r,toReference:r=>r,fromReference:r=>r},[fi]:{transfer:at,primaries:_r,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Pr]:{transfer:gr,primaries:xr,toReference:r=>r.applyMatrix3(qo),fromReference:r=>r.applyMatrix3(Yo)},[Ka]:{transfer:at,primaries:xr,toReference:r=>r.convertSRGBToLinear().applyMatrix3(qo),fromReference:r=>r.applyMatrix3(Yo).convertLinearToSRGB()}},Td=new Set([sn,Pr]),it={enabled:!0,_workingColorSpace:sn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Td.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const i=ks[e].toReference,n=ks[t].fromReference;return n(i(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return ks[r].primaries},getTransfer:function(r){return r===Xi?gr:ks[r].transfer}};function ts(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function jr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let In;class pc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{In===void 0&&(In=Mr("canvas")),In.width=e.width,In.height=e.height;const i=In.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=In}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Mr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),s=n.data;for(let o=0;o<s.length;o++)s[o]=ts(s[o]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ts(t[i]/255)*255):t[i]=ts(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ad=0;class mc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=en(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?s.push(Kr(n[o].image)):s.push(Kr(n[o]))}else s=Kr(n);i.url=s}return t||(e.images[this.uuid]=i),i}}function Kr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?pc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cd=0,si=class cr extends us{constructor(e=cr.DEFAULT_IMAGE,t=cr.DEFAULT_MAPPING,i=ii,n=ii,s=bt,o=Sn,a=ci,c=Qi,l=cr.DEFAULT_ANISOTROPY,h=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=en(),this.name="",this.source=new mc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pr:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pr:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}};si.DEFAULT_IMAGE=null;si.DEFAULT_MAPPING=ic;si.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,i=0,n=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*n+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*n+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*n+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,s;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,M=(f+1)/2,b=(m+1)/2,S=(h+u)/4,E=(d+_)/4,R=(g+p)/4;return x>M&&x>b?x<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(x),n=S/i,s=E/i):M>b?M<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(M),i=S/n,s=R/n):b<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(b),i=E/s,n=R/s),this.set(i,n,s,t),this}let w=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(d-_)/w,this.z=(u-h)/w,this.w=Math.acos((l+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rd extends us{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const n={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);const s=new si(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,n=e.textures.length;i<n;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new mc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cn extends Rd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class gc extends si{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=xt,this.minFilter=xt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ld extends si{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=xt,this.minFilter=xt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rs{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,s,o,a){let c=i[n+0],l=i[n+1],h=i[n+2],d=i[n+3];const u=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==u||l!==f||h!==g){let p=1-a;const m=c*u+l*f+h*g+d*_,w=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const b=Math.sqrt(x),S=Math.atan2(b,m*w);p=Math.sin(p*S)/b,a=Math.sin(a*S)/b}const M=a*w;if(c=c*p+u*M,l=l*p+f*M,h=h*p+g*M,d=d*p+_*M,p===1-a){const b=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=b,l*=b,h*=b,d*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,n,s,o){const a=i[n],c=i[n+1],l=i[n+2],h=i[n+3],d=s[o],u=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*d+c*f-l*u,e[t+1]=c*g+h*u+l*d-a*f,e[t+2]=l*g+h*f+a*u-c*d,e[t+3]=h*g-a*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(n/2),d=a(s/2),u=c(i/2),f=c(n/2),g=c(s/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-n)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(n+o)/f,this._z=(s+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(s-l)/f,this._x=(n+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-n)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+n*l-s*c,this._y=n*h+o*c+s*a-i*l,this._z=s*h+o*l+i*c-n*a,this._w=o*h-i*a-n*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+n*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=n,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*n+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=n*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,i=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*n,this.y=s[1]*t+s[4]*i+s[7]*n,this.z=s[2]*t+s[5]*i+s[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*n+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*n+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*n+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*n-a*i),h=2*(a*t-s*n),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*h,this.y=i+c*h+a*l-s*d,this.z=n+c*d+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n,this.y=s[1]*t+s[5]*i+s[9]*n,this.z=s[2]*t+s[6]*i+s[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=n*c-s*a,this.y=s*o-i*c,this.z=i*a-n*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Jr.copy(this).projectOnVector(e),this.sub(Jr)}reflect(e){return this.sub(Jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new Z,Zo=new Rs;class Ls{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ri):ri.fromBufferAttribute(s,o),ri.applyMatrix4(e.matrixWorld),this.expandByPoint(ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bs.copy(i.boundingBox)),Bs.applyMatrix4(e.matrixWorld),this.union(Bs)}const n=e.children;for(let s=0,o=n.length;s<o;s++)this.expandByObject(n[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ri),ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gs),zs.subVectors(this.max,gs),Dn.subVectors(e.a,gs),Un.subVectors(e.b,gs),Nn.subVectors(e.c,gs),Oi.subVectors(Un,Dn),ki.subVectors(Nn,Un),ln.subVectors(Dn,Nn);let t=[0,-Oi.z,Oi.y,0,-ki.z,ki.y,0,-ln.z,ln.y,Oi.z,0,-Oi.x,ki.z,0,-ki.x,ln.z,0,-ln.x,-Oi.y,Oi.x,0,-ki.y,ki.x,0,-ln.y,ln.x,0];return!Qr(t,Dn,Un,Nn,zs)||(t=[1,0,0,0,1,0,0,0,1],!Qr(t,Dn,Un,Nn,zs))?!1:(Gs.crossVectors(Oi,ki),t=[Gs.x,Gs.y,Gs.z],Qr(t,Dn,Un,Nn,zs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const wi=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],ri=new Z,Bs=new Ls,Dn=new Z,Un=new Z,Nn=new Z,Oi=new Z,ki=new Z,ln=new Z,gs=new Z,zs=new Z,Gs=new Z,cn=new Z;function Qr(r,e,t,i,n){for(let s=0,o=r.length-3;s<=o;s+=3){cn.fromArray(r,s);const a=n.x*Math.abs(cn.x)+n.y*Math.abs(cn.y)+n.z*Math.abs(cn.z),c=e.dot(cn),l=t.dot(cn),h=i.dot(cn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Pd=new Ls,_s=new Z,ea=new Z;class Ja{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Pd.setFromPoints(e).getCenter(i);let n=0;for(let s=0,o=e.length;s<o;s++)n=Math.max(n,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(_s,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ea.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(ea)),this.expandByPoint(_s.copy(e.center).sub(ea))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yi=new Z,ta=new Z,Hs=new Z,Bi=new Z,ia=new Z,Vs=new Z,na=new Z;class Id{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,t),yi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){ta.copy(e).add(t).multiplyScalar(.5),Hs.copy(t).sub(e).normalize(),Bi.copy(this.origin).sub(ta);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Hs),a=Bi.dot(this.direction),c=-Bi.dot(Hs),l=Bi.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(ta).addScaledVector(Hs,u),f}intersectSphere(e,t){yi.subVectors(e.center,this.origin);const i=yi.dot(this.direction),n=yi.dot(yi)-i*i,s=e.radius*e.radius;if(n>s)return null;const o=Math.sqrt(s-n),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,n=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,n=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||s>n||((s>i||isNaN(i))&&(i=s),(o<n||isNaN(n))&&(n=o),d>=0?(a=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||a>n)||((a>i||i!==i)&&(i=a),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,t,i,n,s){ia.subVectors(t,e),Vs.subVectors(i,e),na.crossVectors(ia,Vs);let o=this.direction.dot(na),a;if(o>0){if(n)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bi.subVectors(this.origin,e);const c=a*this.direction.dot(Vs.crossVectors(Bi,Vs));if(c<0)return null;const l=a*this.direction.dot(ia.cross(Bi));if(l<0||c+l>o)return null;const h=-a*Bi.dot(na);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,n,s,o,a,c,l,h,d,u,f,g,_,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,s,o,a,c,l,h,d,u,f,g,_,p)}set(e,t,i,n,s,o,a,c,l,h,d,u,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=n,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/Fn.setFromMatrixColumn(e,0).length(),s=1/Fn.setFromMatrixColumn(e,1).length(),o=1/Fn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=o*h,f=o*d,g=a*h,_=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=u-_*l,t[9]=-a*c,t[2]=_-u*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,_=l*d;t[0]=u+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+u*a,t[10]=o*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,_=l*d;t[0]=u-_*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const u=o*h,f=o*d,g=a*h,_=a*d;t[0]=c*h,t[4]=g*l-f,t[8]=u*l+_,t[1]=c*d,t[5]=_*l+u,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const u=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+_,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dd,e,Ud)}lookAt(e,t,i){const n=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),zi.crossVectors(i,Vt),zi.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),zi.crossVectors(i,Vt)),zi.normalize(),Ws.crossVectors(Vt,zi),n[0]=zi.x,n[4]=Ws.x,n[8]=Vt.x,n[1]=zi.y,n[5]=Ws.y,n[9]=Vt.y,n[2]=zi.z,n[6]=Ws.z,n[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],_=i[6],p=i[10],m=i[14],w=i[3],x=i[7],M=i[11],b=i[15],S=n[0],E=n[4],R=n[8],I=n[12],y=n[1],T=n[5],V=n[9],k=n[13],C=n[2],D=n[6],U=n[10],G=n[14],H=n[3],W=n[7],J=n[11],te=n[15];return s[0]=o*S+a*y+c*C+l*H,s[4]=o*E+a*T+c*D+l*W,s[8]=o*R+a*V+c*U+l*J,s[12]=o*I+a*k+c*G+l*te,s[1]=h*S+d*y+u*C+f*H,s[5]=h*E+d*T+u*D+f*W,s[9]=h*R+d*V+u*U+f*J,s[13]=h*I+d*k+u*G+f*te,s[2]=g*S+_*y+p*C+m*H,s[6]=g*E+_*T+p*D+m*W,s[10]=g*R+_*V+p*U+m*J,s[14]=g*I+_*k+p*G+m*te,s[3]=w*S+x*y+M*C+b*H,s[7]=w*E+x*T+M*D+b*W,s[11]=w*R+x*V+M*U+b*J,s[15]=w*I+x*k+M*G+b*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*c*d-n*l*d-s*a*u+i*l*u+n*a*f-i*c*f)+_*(+t*c*f-t*l*u+s*o*u-n*o*f+n*l*h-s*c*h)+p*(+t*l*d-t*a*f-s*o*d+i*o*f+s*a*h-i*l*h)+m*(-n*a*h-t*c*d+t*a*u+n*o*d-i*o*u+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],w=d*p*l-_*u*l+_*c*f-a*p*f-d*c*m+a*u*m,x=g*u*l-h*p*l-g*c*f+o*p*f+h*c*m-o*u*m,M=h*_*l-g*d*l+g*a*f-o*_*f-h*a*m+o*d*m,b=g*d*c-h*_*c-g*a*u+o*_*u+h*a*p-o*d*p,S=t*w+i*x+n*M+s*b;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/S;return e[0]=w*E,e[1]=(_*u*s-d*p*s-_*n*f+i*p*f+d*n*m-i*u*m)*E,e[2]=(a*p*s-_*c*s+_*n*l-i*p*l-a*n*m+i*c*m)*E,e[3]=(d*c*s-a*u*s-d*n*l+i*u*l+a*n*f-i*c*f)*E,e[4]=x*E,e[5]=(h*p*s-g*u*s+g*n*f-t*p*f-h*n*m+t*u*m)*E,e[6]=(g*c*s-o*p*s-g*n*l+t*p*l+o*n*m-t*c*m)*E,e[7]=(o*u*s-h*c*s+h*n*l-t*u*l-o*n*f+t*c*f)*E,e[8]=M*E,e[9]=(g*d*s-h*_*s-g*i*f+t*_*f+h*i*m-t*d*m)*E,e[10]=(o*_*s-g*a*s+g*i*l-t*_*l-o*i*m+t*a*m)*E,e[11]=(h*a*s-o*d*s-h*i*l+t*d*l+o*i*f-t*a*f)*E,e[12]=b*E,e[13]=(h*_*n-g*d*n+g*i*u-t*_*u-h*i*p+t*d*p)*E,e[14]=(g*a*n-o*_*n-g*i*c+t*_*c+o*i*p-t*a*p)*E,e[15]=(o*d*n-h*a*n+h*i*c-t*d*c-o*i*u+t*a*u)*E,this}scale(e){const t=this.elements,i=e.x,n=e.y,s=e.z;return t[0]*=i,t[4]*=n,t[8]*=s,t[1]*=i,t[5]*=n,t[9]*=s,t[2]*=i,t[6]*=n,t[10]*=s,t[3]*=i,t[7]*=n,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+i,l*a-n*c,l*c+n*a,0,l*a+n*c,h*a+i,h*c-n*o,0,l*c-n*a,h*c+n*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,s,o){return this.set(1,i,s,0,e,1,o,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,d=a+a,u=s*l,f=s*h,g=s*d,_=o*h,p=o*d,m=a*d,w=c*l,x=c*h,M=c*d,b=i.x,S=i.y,E=i.z;return n[0]=(1-(_+m))*b,n[1]=(f+M)*b,n[2]=(g-x)*b,n[3]=0,n[4]=(f-M)*S,n[5]=(1-(u+m))*S,n[6]=(p+w)*S,n[7]=0,n[8]=(g+x)*E,n[9]=(p-w)*E,n[10]=(1-(u+_))*E,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let s=Fn.set(n[0],n[1],n[2]).length();const o=Fn.set(n[4],n[5],n[6]).length(),a=Fn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),e.x=n[12],e.y=n[13],e.z=n[14],ai.copy(this);const l=1/s,h=1/o,d=1/a;return ai.elements[0]*=l,ai.elements[1]*=l,ai.elements[2]*=l,ai.elements[4]*=h,ai.elements[5]*=h,ai.elements[6]*=h,ai.elements[8]*=d,ai.elements[9]*=d,ai.elements[10]*=d,t.setFromRotationMatrix(ai),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,n,s,o,a=Li){const c=this.elements,l=2*s/(t-e),h=2*s/(i-n),d=(t+e)/(t-e),u=(i+n)/(i-n);let f,g;if(a===Li)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===vr)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,s,o,a=Li){const c=this.elements,l=1/(t-e),h=1/(i-n),d=1/(o-s),u=(t+e)*l,f=(i+n)*h;let g,_;if(a===Li)g=(o+s)*d,_=-2*d;else if(a===vr)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Fn=new Z,ai=new vt,Dd=new Z(0,0,0),Ud=new Z(1,1,1),zi=new Z,Ws=new Z,Vt=new Z,$o=new vt,jo=new Rs;class Di{constructor(e=0,t=0,i=0,n=Di.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,s=n[0],o=n[4],a=n[8],c=n[1],l=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Bt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return $o.makeRotationFromQuaternion(e),this.setFromRotationMatrix($o,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jo.setFromEuler(this),this.setFromQuaternion(jo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Di.DEFAULT_ORDER="XYZ";class _c{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nd=0;const Ko=new Z,On=new Rs,Ei=new vt,Xs=new Z,xs=new Z,Fd=new Z,Od=new Rs,Jo=new Z(1,0,0),Qo=new Z(0,1,0),el=new Z(0,0,1),kd={type:"added"},Bd={type:"removed"},sa={type:"childadded",child:null},ra={type:"childremoved",child:null};class Gt extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new Z,t=new Di,i=new Rs,n=new Z(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new vt},normalMatrix:{value:new We}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _c,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return On.setFromAxisAngle(e,t),this.quaternion.multiply(On),this}rotateOnWorldAxis(e,t){return On.setFromAxisAngle(e,t),this.quaternion.premultiply(On),this}rotateX(e){return this.rotateOnAxis(Jo,e)}rotateY(e){return this.rotateOnAxis(Qo,e)}rotateZ(e){return this.rotateOnAxis(el,e)}translateOnAxis(e,t){return Ko.copy(e).applyQuaternion(this.quaternion),this.position.add(Ko.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jo,e)}translateY(e){return this.translateOnAxis(Qo,e)}translateZ(e){return this.translateOnAxis(el,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Xs.copy(e):Xs.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(xs,Xs,this.up):Ei.lookAt(Xs,xs,this.up),this.quaternion.setFromRotationMatrix(Ei),n&&(Ei.extractRotation(n.matrixWorld),On.setFromRotationMatrix(Ei),this.quaternion.premultiply(On.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(kd),sa.child=e,this.dispatchEvent(sa),sa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bd),ra.child=e,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,e,Fd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Od,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let s=0,o=n.length;s<o;s++){const a=n[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));n.material=a}else n.material=s(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];n.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}Gt.DEFAULT_UP=new Z(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const oi=new Z,bi=new Z,aa=new Z,Ti=new Z,kn=new Z,Bn=new Z,tl=new Z,oa=new Z,la=new Z,ca=new Z;class xi{constructor(e=new Z,t=new Z,i=new Z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),oi.subVectors(e,t),n.cross(oi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(e,t,i,n,s){oi.subVectors(n,t),bi.subVectors(i,t),aa.subVectors(e,t);const o=oi.dot(oi),a=oi.dot(bi),c=oi.dot(aa),l=bi.dot(bi),h=bi.dot(aa),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,i,n,s,o,a,c){return this.getBarycoord(e,t,i,n,Ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ti.x),c.addScaledVector(o,Ti.y),c.addScaledVector(a,Ti.z),c)}static isFrontFacing(e,t,i,n){return oi.subVectors(i,t),bi.subVectors(e,t),oi.cross(bi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return oi.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),oi.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,s){return xi.getInterpolation(e,this.a,this.b,this.c,t,i,n,s)}containsPoint(e){return xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,s=this.c;let o,a;kn.subVectors(n,i),Bn.subVectors(s,i),oa.subVectors(e,i);const c=kn.dot(oa),l=Bn.dot(oa);if(c<=0&&l<=0)return t.copy(i);la.subVectors(e,n);const h=kn.dot(la),d=Bn.dot(la);if(h>=0&&d<=h)return t.copy(n);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(kn,o);ca.subVectors(e,s);const f=kn.dot(ca),g=Bn.dot(ca);if(g>=0&&f<=g)return t.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Bn,a);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return tl.subVectors(s,n),a=(d-h)/(d-h+(f-g)),t.copy(n).addScaledVector(tl,a);const m=1/(p+_+u);return o=_*m,a=u*m,t.copy(i).addScaledVector(kn,o).addScaledVector(Bn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function ha(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let nt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=it.workingColorSpace){return this.r=e,this.g=t,this.b=i,it.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=it.workingColorSpace){if(e=Ed(e,1),t=Bt(t,0,1),i=Bt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ha(o,s,e+1/3),this.g=ha(o,s,e),this.b=ha(o,s,e-1/3)}return it.toWorkingColorSpace(this,n),this}setStyle(e,t=fi){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=n[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fi){const i=xc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ts(e.r),this.g=ts(e.g),this.b=ts(e.b),this}copyLinearToSRGB(e){return this.r=jr(e.r),this.g=jr(e.g),this.b=jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fi){return it.fromWorkingColorSpace(Pt.copy(this),e),Math.round(Bt(Pt.r*255,0,255))*65536+Math.round(Bt(Pt.g*255,0,255))*256+Math.round(Bt(Pt.b*255,0,255))}getHexString(e=fi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.fromWorkingColorSpace(Pt.copy(this),t);const i=Pt.r,n=Pt.g,s=Pt.b,o=Math.max(i,n,s),a=Math.min(i,n,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case i:c=(n-s)/d+(n<s?6:0);break;case n:c=(s-i)/d+2;break;case s:c=(i-n)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=fi){it.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,n=Pt.b;return e!==fi?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(Ys);const i=Zr(Gi.h,Ys.h,t),n=Zr(Gi.s,Ys.s,t),s=Zr(Gi.l,Ys.l,t);return this.setHSL(i,n,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*n,this.g=s[1]*t+s[4]*i+s[7]*n,this.b=s[2]*t+s[5]*i+s[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Pt=new nt;nt.NAMES=xc;let zd=0;class bn extends us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=en(),this.name="",this.type="Material",this.blending=Pi,this.side=nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=bs,this.blendEquation=gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ho,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pn,this.stencilZFail=Pn,this.stencilZPass=Pn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(i.blending=this.blending),this.side!==nn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==La&&(i.blendSrc=this.blendSrc),this.blendDst!==bs&&(i.blendDst=this.blendDst),this.blendEquation!==gn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ho&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=n(e.textures),o=n(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Sr extends bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new Z,qs=new et;class ni{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Da,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return fc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)qs.fromBufferAttribute(this,t),qs.applyMatrix3(e),this.setXY(t,qs.x,qs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=_i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_i(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_i(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_i(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),n=tt(n,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Da&&(e.usage=this.usage),e}}class vc extends ni{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Mc extends ni{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tn extends ni{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Gd=0;const $t=new vt,da=new Gt,zn=new Z,Wt=new Ls,vs=new Ls,yt=new Z;class rn extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uc(e)?Mc:vc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,i){return $t.makeTranslation(e,t,i),this.applyMatrix4($t),this}scale(e,t,i){return $t.makeScale(e,t,i),this.applyMatrix4($t),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zn).negate(),this.translate(zn.x,zn.y,zn.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Tn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const s=t[i];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ja);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];vs.setFromBufferAttribute(a),this.morphTargetsRelative?(yt.addVectors(Wt.min,vs.min),Wt.expandByPoint(yt),yt.addVectors(Wt.max,vs.max),Wt.expandByPoint(yt)):(Wt.expandByPoint(vs.min),Wt.expandByPoint(vs.max))}Wt.getCenter(i);let n=0;for(let s=0,o=e.count;s<o;s++)yt.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(yt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)yt.fromBufferAttribute(a,l),c&&(zn.fromBufferAttribute(e,l),yt.add(zn)),n=Math.max(n,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ni(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<i.count;R++)a[R]=new Z,c[R]=new Z;const l=new Z,h=new Z,d=new Z,u=new et,f=new et,g=new et,_=new Z,p=new Z;function m(R,I,y){l.fromBufferAttribute(i,R),h.fromBufferAttribute(i,I),d.fromBufferAttribute(i,y),u.fromBufferAttribute(s,R),f.fromBufferAttribute(s,I),g.fromBufferAttribute(s,y),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const T=1/(f.x*g.y-g.x*f.y);isFinite(T)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(T),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(T),a[R].add(_),a[I].add(_),a[y].add(_),c[R].add(p),c[I].add(p),c[y].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let R=0,I=w.length;R<I;++R){const y=w[R],T=y.start,V=y.count;for(let k=T,C=T+V;k<C;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const x=new Z,M=new Z,b=new Z,S=new Z;function E(R){b.fromBufferAttribute(n,R),S.copy(b);const I=a[R];x.copy(I),x.sub(b.multiplyScalar(b.dot(I))).normalize(),M.crossVectors(S,I);const T=M.dot(c[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,T)}for(let R=0,I=w.length;R<I;++R){const y=w[R],T=y.start,V=y.count;for(let k=T,C=T+V;k<C;k+=3)E(e.getX(k+0)),E(e.getX(k+1)),E(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ni(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new Z,s=new Z,o=new Z,a=new Z,c=new Z,l=new Z,h=new Z,d=new Z;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),_=e.getX(u+1),p=e.getX(u+2);n.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,s),d.subVectors(n,s),h.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)n.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,s),d.subVectors(n,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let m=0;m<h;m++)u[g++]=l[f++]}return new ni(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,i=this.index.array,n=this.attributes;for(const a in n){const c=n[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,i);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const n={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(n[c]=h,s=!0)}s&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const il=new vt,hn=new Id,Zs=new Ja,nl=new Z,Gn=new Z,Hn=new Z,Vn=new Z,ua=new Z,$s=new Z,js=new et,Ks=new et,Js=new et,sl=new Z,rl=new Z,al=new Z,Qs=new Z,er=new Z;class vi extends Gt{constructor(e=new rn,t=new Sr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){const a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const a=this.morphTargetInfluences;if(s&&a){$s.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],d=s[c];h!==0&&(ua.fromBufferAttribute(d,e),o?$s.addScaledVector(ua,h):$s.addScaledVector(ua.sub(t),h))}t.add($s)}return t}raycast(e,t){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zs.copy(i.boundingSphere),Zs.applyMatrix4(s),hn.copy(e.ray).recast(e.near),!(Zs.containsPoint(hn.origin)===!1&&(hn.intersectSphere(Zs,nl)===null||hn.origin.distanceToSquared(nl)>(e.far-e.near)**2))&&(il.copy(s).invert(),hn.copy(e.ray).applyMatrix4(il),!(i.boundingBox!==null&&hn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hn)))}_computeIntersections(e,t,i){let n;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=o[p.materialIndex],w=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let M=w,b=x;M<b;M+=3){const S=a.getX(M),E=a.getX(M+1),R=a.getX(M+2);n=tr(this,m,e,i,l,h,d,S,E,R),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const w=a.getX(p),x=a.getX(p+1),M=a.getX(p+2);n=tr(this,o,e,i,l,h,d,w,x,M),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=o[p.materialIndex],w=Math.max(p.start,f.start),x=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let M=w,b=x;M<b;M+=3){const S=M,E=M+1,R=M+2;n=tr(this,m,e,i,l,h,d,S,E,R),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const w=p,x=p+1,M=p+2;n=tr(this,o,e,i,l,h,d,w,x,M),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}}}function Hd(r,e,t,i,n,s,o,a){let c;if(e.side===zt?c=i.intersectTriangle(o,s,n,!0,a):c=i.intersectTriangle(n,s,o,e.side===nn,a),c===null)return null;er.copy(a),er.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(er);return l<t.near||l>t.far?null:{distance:l,point:er.clone(),object:r}}function tr(r,e,t,i,n,s,o,a,c,l){r.getVertexPosition(a,Gn),r.getVertexPosition(c,Hn),r.getVertexPosition(l,Vn);const h=Hd(r,e,t,i,Gn,Hn,Vn,Qs);if(h){n&&(js.fromBufferAttribute(n,a),Ks.fromBufferAttribute(n,c),Js.fromBufferAttribute(n,l),h.uv=xi.getInterpolation(Qs,Gn,Hn,Vn,js,Ks,Js,new et)),s&&(js.fromBufferAttribute(s,a),Ks.fromBufferAttribute(s,c),Js.fromBufferAttribute(s,l),h.uv1=xi.getInterpolation(Qs,Gn,Hn,Vn,js,Ks,Js,new et)),o&&(sl.fromBufferAttribute(o,a),rl.fromBufferAttribute(o,c),al.fromBufferAttribute(o,l),h.normal=xi.getInterpolation(Qs,Gn,Hn,Vn,sl,rl,al,new Z),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new Z,materialIndex:0};xi.getNormal(Gn,Hn,Vn,d.normal),h.face=d}return h}class Ps extends rn{constructor(e=1,t=1,i=1,n=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:s,depthSegments:o};const a=this;n=Math.floor(n),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,n,o,2),g("x","z","y",1,-1,e,i,-t,n,o,3),g("x","y","z",1,-1,e,t,i,n,s,4),g("x","y","z",-1,-1,e,t,-i,n,s,5),this.setIndex(c),this.setAttribute("position",new Tn(l,3)),this.setAttribute("normal",new Tn(h,3)),this.setAttribute("uv",new Tn(d,2));function g(_,p,m,w,x,M,b,S,E,R,I){const y=M/E,T=b/R,V=M/2,k=b/2,C=S/2,D=E+1,U=R+1;let G=0,H=0;const W=new Z;for(let J=0;J<U;J++){const te=J*T-k;for(let re=0;re<D;re++){const ie=re*y-V;W[_]=ie*w,W[p]=te*x,W[m]=C,l.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[m]=S>0?1:-1,h.push(W.x,W.y,W.z),d.push(re/E),d.push(1-J/R),G+=1}}for(let J=0;J<R;J++)for(let te=0;te<E;te++){const re=u+te+D*J,ie=u+te+D*(J+1),O=u+(te+1)+D*(J+1),j=u+(te+1)+D*J;c.push(re,ie,j),c.push(ie,O,j),H+=6}a.addGroup(f,H,I),f+=H,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function hs(r){const e={};for(const t in r){e[t]={};for(const i in r[t]){const n=r[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function Nt(r){const e={};for(let t=0;t<r.length;t++){const i=hs(r[t]);for(const n in i)e[n]=i[n]}return e}function Vd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Sc(r){return r.getRenderTarget()===null?r.outputColorSpace:it.workingColorSpace}const Wd={clone:hs,merge:Nt};var Xd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ui extends bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xd,this.fragmentShader=Yd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Vd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?t.uniforms[n]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[n]={type:"m4",value:o.toArray()}:t.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class wc extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new Z,ol=new et,ll=new et;class ti extends wc{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Na*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Na*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,ol,ll),t.subVectors(ll,ol)}setViewOffset(e,t,i,n,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qr*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,s=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*n/c,t-=o.offsetY*i/l,n*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wn=-90,Xn=1;class qd extends Gt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ti(Wn,Xn,e,t);n.layers=this.layers,this.add(n);const s=new ti(Wn,Xn,e,t);s.layers=this.layers,this.add(s);const o=new ti(Wn,Xn,e,t);o.layers=this.layers,this.add(o);const a=new ti(Wn,Xn,e,t);a.layers=this.layers,this.add(a);const c=new ti(Wn,Xn,e,t);c.layers=this.layers,this.add(c);const l=new ti(Wn,Xn,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Li)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===vr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,s),e.setRenderTarget(i,1,n),e.render(t,o),e.setRenderTarget(i,2,n),e.render(t,a),e.setRenderTarget(i,3,n),e.render(t,c),e.setRenderTarget(i,4,n),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class yc extends si{constructor(e,t,i,n,s,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:os,super(e,t,i,n,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zd extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new yc(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Ps(5,5,5),s=new Ui({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:Ki});s.uniforms.tEquirect.value=t;const o=new vi(n,s),a=t.minFilter;return t.minFilter===Sn&&(t.minFilter=bt),new qd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,n){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,n);e.setRenderTarget(s)}}const fa=new Z,$d=new Z,jd=new We;class pn{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=fa.subVectors(i,t).cross($d.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(fa),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||jd.getNormalMatrix(e),n=this.coplanarPoint(fa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const dn=new Ja,ir=new Z;class Ec{constructor(e=new pn,t=new pn,i=new pn,n=new pn,s=new pn,o=new pn){this.planes=[e,t,i,n,s,o]}set(e,t,i,n,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Li){const i=this.planes,n=e.elements,s=n[0],o=n[1],a=n[2],c=n[3],l=n[4],h=n[5],d=n[6],u=n[7],f=n[8],g=n[9],_=n[10],p=n[11],m=n[12],w=n[13],x=n[14],M=n[15];if(i[0].setComponents(c-s,u-l,p-f,M-m).normalize(),i[1].setComponents(c+s,u+l,p+f,M+m).normalize(),i[2].setComponents(c+o,u+h,p+g,M+w).normalize(),i[3].setComponents(c-o,u-h,p-g,M-w).normalize(),i[4].setComponents(c-a,u-d,p-_,M-x).normalize(),t===Li)i[5].setComponents(c+a,u+d,p+_,M+x).normalize();else if(t===vr)i[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),dn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),dn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(dn)}intersectsSprite(e){return dn.center.set(0,0,0),dn.radius=.7071067811865476,dn.applyMatrix4(e.matrixWorld),this.intersectsSphere(dn)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(ir.x=n.normal.x>0?e.max.x:e.min.x,ir.y=n.normal.y>0?e.max.y:e.min.y,ir.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bc(){let r=null,e=!1,t=null,i=null;function n(s,o){t(s,o),i=r.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Kd(r,e){const t=e.isWebGL2,i=new WeakMap;function n(l,h){const d=l.array,u=l.usage,f=d.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,d,u),l.onUploadCallback();let _;if(d instanceof Float32Array)_=r.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=r.SHORT;else if(d instanceof Uint32Array)_=r.UNSIGNED_INT;else if(d instanceof Int32Array)_=r.INT;else if(d instanceof Int8Array)_=r.BYTE;else if(d instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function s(l,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(r.bindBuffer(d,l),f.count===-1&&g.length===0&&r.bufferSubData(d,0,u),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];t?r.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):r.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):r.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h&&(r.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const u=i.get(l);(!u||u.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const d=i.get(l);if(d===void 0)i.set(l,n(l,h));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,l,h),d.version=l.version}}return{get:o,remove:a,update:c}}class Ir extends rn{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(n),l=a+1,h=c+1,d=e/a,u=t/c,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const w=m*u-o;for(let x=0;x<l;x++){const M=x*d-s;g.push(M,-w,0),_.push(0,0,1),p.push(x/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let w=0;w<a;w++){const x=w+l*m,M=w+l*(m+1),b=w+1+l*(m+1),S=w+1+l*m;f.push(x,M,S),f.push(M,b,S)}this.setIndex(f),this.setAttribute("position",new Tn(g,3)),this.setAttribute("normal",new Tn(_,3)),this.setAttribute("uv",new Tn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.width,e.height,e.widthSegments,e.heightSegments)}}var Jd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,eu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,su=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ru=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,au=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ou=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,du=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,uu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_u=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Su=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Eu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Au=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ru=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Lu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Pu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Iu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Nu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ou=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ku=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Gu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Xu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Yu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$u=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ju=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ku=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ju=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ef=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,rf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,af=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,of=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,df=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ff=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,mf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,gf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,_f=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ef=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Af=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Rf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,If=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Df=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Ff=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Jf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ep=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ip=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ap=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,op=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_p=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ep=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Jd,alphahash_pars_fragment:Qd,alphamap_fragment:eu,alphamap_pars_fragment:tu,alphatest_fragment:iu,alphatest_pars_fragment:nu,aomap_fragment:su,aomap_pars_fragment:ru,batching_pars_vertex:au,batching_vertex:ou,begin_vertex:lu,beginnormal_vertex:cu,bsdfs:hu,iridescence_fragment:du,bumpmap_pars_fragment:uu,clipping_planes_fragment:fu,clipping_planes_pars_fragment:pu,clipping_planes_pars_vertex:mu,clipping_planes_vertex:gu,color_fragment:_u,color_pars_fragment:xu,color_pars_vertex:vu,color_vertex:Mu,common:Su,cube_uv_reflection_fragment:wu,defaultnormal_vertex:yu,displacementmap_pars_vertex:Eu,displacementmap_vertex:bu,emissivemap_fragment:Tu,emissivemap_pars_fragment:Au,colorspace_fragment:Cu,colorspace_pars_fragment:Ru,envmap_fragment:Lu,envmap_common_pars_fragment:Pu,envmap_pars_fragment:Iu,envmap_pars_vertex:Du,envmap_physical_pars_fragment:Xu,envmap_vertex:Uu,fog_vertex:Nu,fog_pars_vertex:Fu,fog_fragment:Ou,fog_pars_fragment:ku,gradientmap_pars_fragment:Bu,lightmap_fragment:zu,lightmap_pars_fragment:Gu,lights_lambert_fragment:Hu,lights_lambert_pars_fragment:Vu,lights_pars_begin:Wu,lights_toon_fragment:Yu,lights_toon_pars_fragment:qu,lights_phong_fragment:Zu,lights_phong_pars_fragment:$u,lights_physical_fragment:ju,lights_physical_pars_fragment:Ku,lights_fragment_begin:Ju,lights_fragment_maps:Qu,lights_fragment_end:ef,logdepthbuf_fragment:tf,logdepthbuf_pars_fragment:nf,logdepthbuf_pars_vertex:sf,logdepthbuf_vertex:rf,map_fragment:af,map_pars_fragment:of,map_particle_fragment:lf,map_particle_pars_fragment:cf,metalnessmap_fragment:hf,metalnessmap_pars_fragment:df,morphinstance_vertex:uf,morphcolor_vertex:ff,morphnormal_vertex:pf,morphtarget_pars_vertex:mf,morphtarget_vertex:gf,normal_fragment_begin:_f,normal_fragment_maps:xf,normal_pars_fragment:vf,normal_pars_vertex:Mf,normal_vertex:Sf,normalmap_pars_fragment:wf,clearcoat_normal_fragment_begin:yf,clearcoat_normal_fragment_maps:Ef,clearcoat_pars_fragment:bf,iridescence_pars_fragment:Tf,opaque_fragment:Af,packing:Cf,premultiplied_alpha_fragment:Rf,project_vertex:Lf,dithering_fragment:Pf,dithering_pars_fragment:If,roughnessmap_fragment:Df,roughnessmap_pars_fragment:Uf,shadowmap_pars_fragment:Nf,shadowmap_pars_vertex:Ff,shadowmap_vertex:Of,shadowmask_pars_fragment:kf,skinbase_vertex:Bf,skinning_pars_vertex:zf,skinning_vertex:Gf,skinnormal_vertex:Hf,specularmap_fragment:Vf,specularmap_pars_fragment:Wf,tonemapping_fragment:Xf,tonemapping_pars_fragment:Yf,transmission_fragment:qf,transmission_pars_fragment:Zf,uv_pars_fragment:$f,uv_pars_vertex:jf,uv_vertex:Kf,worldpos_vertex:Jf,background_vert:Qf,background_frag:ep,backgroundCube_vert:tp,backgroundCube_frag:ip,cube_vert:np,cube_frag:sp,depth_vert:rp,depth_frag:ap,distanceRGBA_vert:op,distanceRGBA_frag:lp,equirect_vert:cp,equirect_frag:hp,linedashed_vert:dp,linedashed_frag:up,meshbasic_vert:fp,meshbasic_frag:pp,meshlambert_vert:mp,meshlambert_frag:gp,meshmatcap_vert:_p,meshmatcap_frag:xp,meshnormal_vert:vp,meshnormal_frag:Mp,meshphong_vert:Sp,meshphong_frag:wp,meshphysical_vert:yp,meshphysical_frag:Ep,meshtoon_vert:bp,meshtoon_frag:Tp,points_vert:Ap,points_frag:Cp,shadow_vert:Rp,shadow_frag:Lp,sprite_vert:Pp,sprite_frag:Ip},de={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},mi={basic:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Nt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Nt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Nt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Nt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Nt([de.points,de.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Nt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Nt([de.common,de.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Nt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Nt([de.sprite,de.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Nt([de.common,de.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Nt([de.lights,de.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};mi.physical={uniforms:Nt([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const nr={r:0,b:0,g:0},un=new Di,Dp=new vt;function Up(r,e,t,i,n,s,o){const a=new nt(0);let c=s===!0?0:1,l,h,d=null,u=0,f=null;function g(p,m){let w=!1,x=m.isScene===!0?m.background:null;x&&x.isTexture&&(x=(m.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,c):x&&x.isColor&&(_(x,1),w=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Lr)?(h===void 0&&(h=new vi(new Ps(1,1,1),new Ui({name:"BackgroundCubeMaterial",uniforms:hs(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),un.copy(m.backgroundRotation),un.x*=-1,un.y*=-1,un.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(un.y*=-1,un.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Dp.makeRotationFromEuler(un)),h.material.toneMapped=it.getTransfer(x.colorSpace)!==at,(d!==x||u!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=r.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new vi(new Ir(2,2),new Ui({name:"BackgroundMaterial",uniforms:hs(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=it.getTransfer(x.colorSpace)!==at,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,d=x,u=x.version,f=r.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,m){p.getRGB(nr,Sc(r)),i.buffers.color.setClear(nr.r,nr.g,nr.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),c=m,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(a,c)},render:g}}function Np(r,e,t,i){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},c=p(null);let l=c,h=!1;function d(C,D,U,G,H){let W=!1;if(o){const J=_(G,U,D);l!==J&&(l=J,f(l.object)),W=m(C,G,U,H),W&&w(C,G,U,H)}else{const J=D.wireframe===!0;(l.geometry!==G.id||l.program!==U.id||l.wireframe!==J)&&(l.geometry=G.id,l.program=U.id,l.wireframe=J,W=!0)}H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,R(C,D,U,G),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function u(){return i.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(C){return i.isWebGL2?r.bindVertexArray(C):s.bindVertexArrayOES(C)}function g(C){return i.isWebGL2?r.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function _(C,D,U){const G=U.wireframe===!0;let H=a[C.id];H===void 0&&(H={},a[C.id]=H);let W=H[D.id];W===void 0&&(W={},H[D.id]=W);let J=W[G];return J===void 0&&(J=p(u()),W[G]=J),J}function p(C){const D=[],U=[],G=[];for(let H=0;H<n;H++)D[H]=0,U[H]=0,G[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:G,object:C,attributes:{},index:null}}function m(C,D,U,G){const H=l.attributes,W=D.attributes;let J=0;const te=U.getAttributes();for(const re in te)if(te[re].location>=0){const O=H[re];let j=W[re];if(j===void 0&&(re==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),re==="instanceColor"&&C.instanceColor&&(j=C.instanceColor)),O===void 0||O.attribute!==j||j&&O.data!==j.data)return!0;J++}return l.attributesNum!==J||l.index!==G}function w(C,D,U,G){const H={},W=D.attributes;let J=0;const te=U.getAttributes();for(const re in te)if(te[re].location>=0){let O=W[re];O===void 0&&(re==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),re==="instanceColor"&&C.instanceColor&&(O=C.instanceColor));const j={};j.attribute=O,O&&O.data&&(j.data=O.data),H[re]=j,J++}l.attributes=H,l.attributesNum=J,l.index=G}function x(){const C=l.newAttributes;for(let D=0,U=C.length;D<U;D++)C[D]=0}function M(C){b(C,0)}function b(C,D){const U=l.newAttributes,G=l.enabledAttributes,H=l.attributeDivisors;U[C]=1,G[C]===0&&(r.enableVertexAttribArray(C),G[C]=1),H[C]!==D&&((i.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,D),H[C]=D)}function S(){const C=l.newAttributes,D=l.enabledAttributes;for(let U=0,G=D.length;U<G;U++)D[U]!==C[U]&&(r.disableVertexAttribArray(U),D[U]=0)}function E(C,D,U,G,H,W,J){J===!0?r.vertexAttribIPointer(C,D,U,H,W):r.vertexAttribPointer(C,D,U,G,H,W)}function R(C,D,U,G){if(i.isWebGL2===!1&&(C.isInstancedMesh||G.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const H=G.attributes,W=U.getAttributes(),J=D.defaultAttributeValues;for(const te in W){const re=W[te];if(re.location>=0){let ie=H[te];if(ie===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){const O=ie.normalized,j=ie.itemSize,fe=t.get(ie);if(fe===void 0)continue;const Se=fe.buffer,me=fe.type,pe=fe.bytesPerElement,Le=i.isWebGL2===!0&&(me===r.INT||me===r.UNSIGNED_INT||ie.gpuType===nc);if(ie.isInterleavedBufferAttribute){const Te=ie.data,B=Te.stride,pt=ie.offset;if(Te.isInstancedInterleavedBuffer){for(let ye=0;ye<re.locationSize;ye++)b(re.location+ye,Te.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let ye=0;ye<re.locationSize;ye++)M(re.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let ye=0;ye<re.locationSize;ye++)E(re.location+ye,j/re.locationSize,me,O,B*pe,(pt+j/re.locationSize*ye)*pe,Le)}else{if(ie.isInstancedBufferAttribute){for(let Te=0;Te<re.locationSize;Te++)b(re.location+Te,ie.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Te=0;Te<re.locationSize;Te++)M(re.location+Te);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let Te=0;Te<re.locationSize;Te++)E(re.location+Te,j/re.locationSize,me,O,j*pe,j/re.locationSize*Te*pe,Le)}}else if(J!==void 0){const O=J[te];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(re.location,O);break;case 3:r.vertexAttrib3fv(re.location,O);break;case 4:r.vertexAttrib4fv(re.location,O);break;default:r.vertexAttrib1fv(re.location,O)}}}}S()}function I(){V();for(const C in a){const D=a[C];for(const U in D){const G=D[U];for(const H in G)g(G[H].object),delete G[H];delete D[U]}delete a[C]}}function y(C){if(a[C.id]===void 0)return;const D=a[C.id];for(const U in D){const G=D[U];for(const H in G)g(G[H].object),delete G[H];delete D[U]}delete a[C.id]}function T(C){for(const D in a){const U=a[D];if(U[C.id]===void 0)continue;const G=U[C.id];for(const H in G)g(G[H].object),delete G[H];delete U[C.id]}}function V(){k(),h=!0,l!==c&&(l=c,f(l.object))}function k(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:V,resetDefaultState:k,dispose:I,releaseStatesOfGeometry:y,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:M,disableUnusedAttributes:S}}function Fp(r,e,t,i){const n=i.isWebGL2;let s;function o(h){s=h}function a(h,d){r.drawArrays(s,h,d),t.update(d,s,1)}function c(h,d,u){if(u===0)return;let f,g;if(n)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,d,u),t.update(d,s,u)}function l(h,d,u){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(s,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Op(r,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,M=o||e.has("OES_texture_float"),b=x&&M,S=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:n,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:w,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:b,maxSamples:S}}function kp(r){const e=this;let t=null,i=0,n=!1,s=!1;const o=new pn,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,m=r.get(d);if(!n||g===null||g.length===0||s&&!p)s?h(null):l();else{const w=s?0:i,x=w*4;let M=m.clippingState||null;c.value=M,M=h(g,u,x,f);for(let b=0;b!==x;++b)M[b]=t[b];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=f+_*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,M=f;x!==_;++x,M+=4)o.copy(d[x]).applyMatrix4(w,a),o.normal.toArray(p,M),p[M+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Bp(r){let e=new WeakMap;function t(o,a){return a===Pa?o.mapping=os:a===Ia&&(o.mapping=ls),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Pa||a===Ia)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Zd(c.height);return l.fromEquirectangularTexture(r,o),e.set(o,l),o.addEventListener("dispose",n),t(l.texture,o.mapping)}else return null}}return o}function n(o){const a=o.target;a.removeEventListener("dispose",n);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class zp extends wc{constructor(e=-1,t=1,i=1,n=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=n+t,c=n-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Zn=4,cl=[.125,.215,.35,.446,.526,.582],_n=20,pa=new zp,hl=new nt;let ma=null,ga=0,_a=0;const mn=(1+Math.sqrt(5))/2,Yn=1/mn,dl=[new Z(1,1,1),new Z(-1,1,1),new Z(1,1,-1),new Z(-1,1,-1),new Z(0,mn,Yn),new Z(0,mn,-Yn),new Z(Yn,0,mn),new Z(-Yn,0,mn),new Z(mn,Yn,0),new Z(-mn,Yn,0)];class ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,n,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ma,ga,_a),e.scissorTest=!1,sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===os||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:Ts,format:ci,colorSpace:sn,depthBuffer:!1},n=fl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gp(s)),this._blurMaterial=Hp(s,e,t)}return n}_compileMaterial(e){const t=new vi(this._lodPlanes[0],e);this._renderer.compile(t,pa)}_sceneToCubeUV(e,t,i,n){const a=new ti(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(hl),h.toneMapping=Ji,h.autoClear=!1;const f=new Sr({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new vi(new Ps,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(hl),_=!0);for(let m=0;m<6;m++){const w=m%3;w===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):w===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const x=this._cubeSize;sr(n,w*x,m>2?x:0,x,x),h.setRenderTarget(n),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===os||e.mapping===ls;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const s=n?this._cubemapMaterial:this._equirectMaterial,o=new vi(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;sr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,pa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const s=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),o=dl[(n-1)%dl.length];this._blur(e,n-1,n,s,o)}t.autoClear=i}_blur(e,t,i,n,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,n,"latitudinal",s),this._halfBlur(o,e,i,i,n,"longitudinal",s)}_halfBlur(e,t,i,n,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new vi(this._lodPlanes[n],l),u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*_n-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):_n;p>_n&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_n}`);const m=[];let w=0;for(let E=0;E<_n;++E){const R=E/_,I=Math.exp(-R*R/2);m.push(I),E===0?w+=I:E<p&&(w+=2*I)}for(let E=0;E<m.length;E++)m[E]=m[E]/w;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-i;const M=this._sizeLods[n],b=3*M*(n>x-Zn?n-x+Zn:0),S=4*(this._cubeSize-M);sr(t,b,S,3*M,2*M),c.setRenderTarget(t),c.render(d,pa)}}function Gp(r){const e=[],t=[],i=[];let n=r;const s=r-Zn+1+cl.length;for(let o=0;o<s;o++){const a=Math.pow(2,n);t.push(a);let c=1/a;o>r-Zn?c=cl[o-r+Zn-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,p=2,m=1,w=new Float32Array(_*g*f),x=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let S=0;S<f;S++){const E=S%3*2/3-1,R=S>2?0:-1,I=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];w.set(I,_*g*S),x.set(u,p*g*S);const y=[S,S,S,S,S,S];M.set(y,m*g*S)}const b=new rn;b.setAttribute("position",new ni(w,_)),b.setAttribute("uv",new ni(x,p)),b.setAttribute("faceIndex",new ni(M,m)),e.push(b),n>Zn&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function fl(r,e,t){const i=new Cn(r,e,t);return i.texture.mapping=Lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function sr(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function Hp(r,e,t){const i=new Float32Array(_n),n=new Z(0,1,0);return new Ui({name:"SphericalGaussianBlur",defines:{n:_n,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function pl(){return new Ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function ml(){return new Ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Qa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vp(r){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Pa||c===Ia,h=c===os||c===ls;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new ul(r)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(l&&d&&d.height>0||h&&d&&n(d)){t===null&&(t=new ul(r));const u=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function n(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Wp(r){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=r.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Xp(r,e,t,i){const n={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}u.removeEventListener("dispose",o),delete n[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return n[u.id]===!0||(u.addEventListener("dispose",o),n[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)e.update(u[g],r.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],r.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let x=0,M=w.length;x<M;x+=3){const b=w[x+0],S=w[x+1],E=w[x+2];u.push(b,S,S,E,E,b)}}else if(g!==void 0){const w=g.array;_=g.version;for(let x=0,M=w.length/3-1;x<M;x+=3){const b=x+0,S=x+1,E=x+2;u.push(b,S,S,E,E,b)}}else return;const p=new(uc(u)?Mc:vc)(u,1);p.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Yp(r,e,t,i){const n=i.isWebGL2;let s;function o(f){s=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,g){r.drawElements(s,g,a,f*c),t.update(g,s,1)}function d(f,g,_){if(_===0)return;let p,m;if(n)p=r,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,g,a,f*c,_),t.update(g,s,_)}function u(f,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/c,g[m]);else{p.multiDrawElementsWEBGL(s,g,0,a,f,0,_);let m=0;for(let w=0;w<_;w++)m+=g[w];t.update(m,s,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function qp(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Zp(r,e){return r[0]-e[0]}function $p(r,e){return Math.abs(e[1])-Math.abs(r[1])}function jp(r,e,t){const i={},n=new Float32Array(8),s=new WeakMap,o=new Ct,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,d){const u=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==_){let k=function(){T.dispose(),s.delete(h),h.removeEventListener("dispose",k)};var f=k;p!==void 0&&p.texture.dispose();const m=h.morphAttributes.position!==void 0,w=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,M=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],S=h.morphAttributes.color||[];let E=0;m===!0&&(E=1),w===!0&&(E=2),x===!0&&(E=3);let R=h.attributes.position.count*E,I=1;R>e.maxTextureSize&&(I=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const y=new Float32Array(R*I*4*_),T=new gc(y,R,I,_);T.type=Ci,T.needsUpdate=!0;const V=E*4;for(let C=0;C<_;C++){const D=M[C],U=b[C],G=S[C],H=R*I*4*C;for(let W=0;W<D.count;W++){const J=W*V;m===!0&&(o.fromBufferAttribute(D,W),y[H+J+0]=o.x,y[H+J+1]=o.y,y[H+J+2]=o.z,y[H+J+3]=0),w===!0&&(o.fromBufferAttribute(U,W),y[H+J+4]=o.x,y[H+J+5]=o.y,y[H+J+6]=o.z,y[H+J+7]=0),x===!0&&(o.fromBufferAttribute(G,W),y[H+J+8]=o.x,y[H+J+9]=o.y,y[H+J+10]=o.z,y[H+J+11]=G.itemSize===4?o.w:1)}}p={count:_,texture:T,size:new et(R,I)},s.set(h,p),h.addEventListener("dispose",k)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)d.getUniforms().setValue(r,"morphTexture",l.morphTexture,t);else{let m=0;for(let x=0;x<u.length;x++)m+=u[x];const w=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(r,"morphTargetBaseInfluence",w),d.getUniforms().setValue(r,"morphTargetInfluences",u)}d.getUniforms().setValue(r,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const g=u===void 0?0:u.length;let _=i[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];i[h.id]=_}for(let M=0;M<g;M++){const b=_[M];b[0]=M,b[1]=u[M]}_.sort($p);for(let M=0;M<8;M++)M<g&&_[M][1]?(a[M][0]=_[M][0],a[M][1]=_[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(Zp);const p=h.morphAttributes.position,m=h.morphAttributes.normal;let w=0;for(let M=0;M<8;M++){const b=a[M],S=b[0],E=b[1];S!==Number.MAX_SAFE_INTEGER&&E?(p&&h.getAttribute("morphTarget"+M)!==p[S]&&h.setAttribute("morphTarget"+M,p[S]),m&&h.getAttribute("morphNormal"+M)!==m[S]&&h.setAttribute("morphNormal"+M,m[S]),n[M]=E,w+=E):(p&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),m&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),n[M]=0)}const x=h.morphTargetsRelative?1:1-w;d.getUniforms().setValue(r,"morphTargetBaseInfluence",x),d.getUniforms().setValue(r,"morphTargetInfluences",n)}}return{update:c}}function Kp(r,e,t,i){let n=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,d=e.get(c,h);if(n.get(d)!==l&&(e.update(d),n.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),n.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;n.get(u)!==l&&(u.update(),n.set(u,l))}return d}function o(){n=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Tc extends si{constructor(e,t,i,n,s,o,a,c,l,h){if(h=h!==void 0?h:En,h!==En&&h!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===En&&(i=$i),i===void 0&&h===cs&&(i=yn),super(null,n,s,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:xt,this.minFilter=c!==void 0?c:xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ac=new si,Cc=new Tc(1,1);Cc.compareFunction=hc;const Rc=new gc,Lc=new Ld,Pc=new yc,gl=[],_l=[],xl=new Float32Array(16),vl=new Float32Array(9),Ml=new Float32Array(4);function fs(r,e,t){const i=r[0];if(i<=0||i>0)return r;const n=e*t;let s=gl[n];if(s===void 0&&(s=new Float32Array(n),gl[n]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Mt(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function St(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Dr(r,e){let t=_l[e];t===void 0&&(t=new Int32Array(e),_l[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function Jp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Qp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2fv(this.addr,e),St(t,e)}}function em(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;r.uniform3fv(this.addr,e),St(t,e)}}function tm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4fv(this.addr,e),St(t,e)}}function im(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Ml.set(i),r.uniformMatrix2fv(this.addr,!1,Ml),St(t,i)}}function nm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;vl.set(i),r.uniformMatrix3fv(this.addr,!1,vl),St(t,i)}}function sm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;xl.set(i),r.uniformMatrix4fv(this.addr,!1,xl),St(t,i)}}function rm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function am(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2iv(this.addr,e),St(t,e)}}function om(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3iv(this.addr,e),St(t,e)}}function lm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4iv(this.addr,e),St(t,e)}}function cm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function hm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2uiv(this.addr,e),St(t,e)}}function dm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3uiv(this.addr,e),St(t,e)}}function um(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4uiv(this.addr,e),St(t,e)}}function fm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);const s=this.type===r.SAMPLER_2D_SHADOW?Cc:Ac;t.setTexture2D(e||s,n)}function pm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Lc,n)}function mm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Pc,n)}function gm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Rc,n)}function _m(r){switch(r){case 5126:return Jp;case 35664:return Qp;case 35665:return em;case 35666:return tm;case 35674:return im;case 35675:return nm;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return am;case 35668:case 35672:return om;case 35669:case 35673:return lm;case 5125:return cm;case 36294:return hm;case 36295:return dm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return fm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return gm}}function xm(r,e){r.uniform1fv(this.addr,e)}function vm(r,e){const t=fs(e,this.size,2);r.uniform2fv(this.addr,t)}function Mm(r,e){const t=fs(e,this.size,3);r.uniform3fv(this.addr,t)}function Sm(r,e){const t=fs(e,this.size,4);r.uniform4fv(this.addr,t)}function wm(r,e){const t=fs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function ym(r,e){const t=fs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Em(r,e){const t=fs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function bm(r,e){r.uniform1iv(this.addr,e)}function Tm(r,e){r.uniform2iv(this.addr,e)}function Am(r,e){r.uniform3iv(this.addr,e)}function Cm(r,e){r.uniform4iv(this.addr,e)}function Rm(r,e){r.uniform1uiv(this.addr,e)}function Lm(r,e){r.uniform2uiv(this.addr,e)}function Pm(r,e){r.uniform3uiv(this.addr,e)}function Im(r,e){r.uniform4uiv(this.addr,e)}function Dm(r,e,t){const i=this.cache,n=e.length,s=Dr(t,n);Mt(i,s)||(r.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==n;++o)t.setTexture2D(e[o]||Ac,s[o])}function Um(r,e,t){const i=this.cache,n=e.length,s=Dr(t,n);Mt(i,s)||(r.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==n;++o)t.setTexture3D(e[o]||Lc,s[o])}function Nm(r,e,t){const i=this.cache,n=e.length,s=Dr(t,n);Mt(i,s)||(r.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==n;++o)t.setTextureCube(e[o]||Pc,s[o])}function Fm(r,e,t){const i=this.cache,n=e.length,s=Dr(t,n);Mt(i,s)||(r.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==n;++o)t.setTexture2DArray(e[o]||Rc,s[o])}function Om(r){switch(r){case 5126:return xm;case 35664:return vm;case 35665:return Mm;case 35666:return Sm;case 35674:return wm;case 35675:return ym;case 35676:return Em;case 5124:case 35670:return bm;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Cm;case 5125:return Rm;case 36294:return Lm;case 36295:return Pm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Fm}}class km{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=_m(t.type)}}class Bm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Om(t.type)}}class zm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let s=0,o=n.length;s!==o;++s){const a=n[s];a.setValue(e,t[a.id],i)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function Sl(r,e){r.seq.push(e),r.map[e.id]=e}function Gm(r,e,t){const i=r.name,n=i.length;for(xa.lastIndex=0;;){const s=xa.exec(i),o=xa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===n){Sl(t,l===void 0?new km(a,r,e):new Bm(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new zm(a),Sl(t,d)),t=d}}}class hr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=e.getActiveUniform(t,n),o=e.getUniformLocation(t,s.name);Gm(s,o,this)}}setValue(e,t,i,n){const s=this.map[t];s!==void 0&&s.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,s=e.length;n!==s;++n){const o=e[n];o.id in t&&i.push(o)}return i}}function wl(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}const Hm=37297;let Vm=0;function Wm(r,e){const t=r.split(`
`),i=[],n=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=n;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Xm(r){const e=it.getPrimaries(it.workingColorSpace),t=it.getPrimaries(r);let i;switch(e===t?i="":e===xr&&t===_r?i="LinearDisplayP3ToLinearSRGB":e===_r&&t===xr&&(i="LinearSRGBToLinearDisplayP3"),r){case sn:case Pr:return[i,"LinearTransferOETF"];case fi:case Ka:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[i,"LinearTransferOETF"]}}function yl(r,e,t){const i=r.getShaderParameter(e,r.COMPILE_STATUS),n=r.getShaderInfoLog(e).trim();if(i&&n==="")return"";const s=/ERROR: 0:(\d+)/.exec(n);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+n+`

`+Wm(r.getShaderSource(e),o)}else return n}function Ym(r,e){const t=Xm(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qm(r,e){let t;switch(e){case Zh:t="Linear";break;case $h:t="Reinhard";break;case jh:t="OptimizedCineon";break;case Kh:t="ACESFilmic";break;case Qh:t="AgX";break;case ed:t="Neutral";break;case Jh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Zm(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.alphaToCoverage||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter($n).join(`
`)}function $m(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($n).join(`
`)}function jm(r){const e=[];for(const t in r){const i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Km(r,e){const t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=r.getActiveAttrib(e,n),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function $n(r){return r!==""}function El(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(r){return r.replace(Jm,eg)}const Qm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function eg(r,e){let t=Ve[e];if(t===void 0){const i=Qm.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Oa(t)}const tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tl(r){return r.replace(tg,ig)}function ig(r,e,t,i){let n="";for(let s=parseInt(e);s<parseInt(t);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Al(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	`;return r.isWebGL2&&(e+=`precision ${r.precision} sampler3D;
		precision ${r.precision} sampler2DArray;
		precision ${r.precision} sampler2DShadow;
		precision ${r.precision} samplerCubeShadow;
		precision ${r.precision} sampler2DArrayShadow;
		precision ${r.precision} isampler2D;
		precision ${r.precision} isampler3D;
		precision ${r.precision} isamplerCube;
		precision ${r.precision} isampler2DArray;
		precision ${r.precision} usampler2D;
		precision ${r.precision} usampler3D;
		precision ${r.precision} usamplerCube;
		precision ${r.precision} usampler2DArray;
		`),r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ng(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ql?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Th?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ai&&(e="SHADOWMAP_TYPE_VSM"),e}function sg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case os:case ls:e="ENVMAP_TYPE_CUBE";break;case Lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function rg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ls:e="ENVMAP_MODE_REFRACTION";break}return e}function ag(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case tc:e="ENVMAP_BLENDING_MULTIPLY";break;case Yh:e="ENVMAP_BLENDING_MIX";break;case qh:e="ENVMAP_BLENDING_ADD";break}return e}function og(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function lg(r,e,t,i){const n=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=ng(t),l=sg(t),h=rg(t),d=ag(t),u=og(t),f=t.isWebGL2?"":Zm(t),g=$m(t),_=jm(s),p=n.createProgram();let m,w,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter($n).join(`
`),m.length>0&&(m+=`
`),w=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter($n).join(`
`),w.length>0&&(w+=`
`)):(m=[Al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($n).join(`
`),w=[f,Al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ji?"#define TONE_MAPPING":"",t.toneMapping!==Ji?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Ji?qm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Ym("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($n).join(`
`)),o=Oa(o),o=El(o,t),o=bl(o,t),a=Oa(a),a=El(a,t),a=bl(a,t),o=Tl(o),a=Tl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,w=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Vo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const M=x+m+o,b=x+w+a,S=wl(n,n.VERTEX_SHADER,M),E=wl(n,n.FRAGMENT_SHADER,b);n.attachShader(p,S),n.attachShader(p,E),t.index0AttributeName!==void 0?n.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(p,0,"position"),n.linkProgram(p);function R(V){if(r.debug.checkShaderErrors){const k=n.getProgramInfoLog(p).trim(),C=n.getShaderInfoLog(S).trim(),D=n.getShaderInfoLog(E).trim();let U=!0,G=!0;if(n.getProgramParameter(p,n.LINK_STATUS)===!1)if(U=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,p,S,E);else{const H=yl(n,S,"vertex"),W=yl(n,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(p,n.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+k+`
`+H+`
`+W)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(C===""||D==="")&&(G=!1);G&&(V.diagnostics={runnable:U,programLog:k,vertexShader:{log:C,prefix:m},fragmentShader:{log:D,prefix:w}})}n.deleteShader(S),n.deleteShader(E),I=new hr(n,p),y=Km(n,p)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=n.getProgramParameter(p,Hm)),T},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vm++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=E,this}let cg=0;class hg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new dg(e),t.set(e,i)),i}}class dg{constructor(e){this.id=cg++,this.code=e,this.usedTimes=0}}function ug(r,e,t,i,n,s,o){const a=new _c,c=new hg,l=new Set,h=[],d=n.isWebGL2,u=n.logarithmicDepthBuffer,f=n.vertexTextures;let g=n.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,T,V,k,C){const D=k.fog,U=C.geometry,G=y.isMeshStandardMaterial?k.environment:null,H=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),W=H&&H.mapping===Lr?H.image.height:null,J=_[y.type];y.precision!==null&&(g=n.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const te=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,re=te!==void 0?te.length:0;let ie=0;U.morphAttributes.position!==void 0&&(ie=1),U.morphAttributes.normal!==void 0&&(ie=2),U.morphAttributes.color!==void 0&&(ie=3);let O,j,fe,Se;if(J){const st=mi[J];O=st.vertexShader,j=st.fragmentShader}else O=y.vertexShader,j=y.fragmentShader,c.update(y),fe=c.getVertexShaderID(y),Se=c.getFragmentShaderID(y);const me=r.getRenderTarget(),pe=C.isInstancedMesh===!0,Le=C.isBatchedMesh===!0,Te=!!y.map,B=!!y.matcap,pt=!!H,ye=!!y.aoMap,Ue=!!y.lightMap,Ce=!!y.bumpMap,Ye=!!y.normalMap,De=!!y.displacementMap,Fe=!!y.emissiveMap,lt=!!y.metalnessMap,P=!!y.roughnessMap,A=y.anisotropy>0,K=y.clearcoat>0,Q=y.iridescence>0,ae=y.sheen>0,ne=y.transmission>0,ze=A&&!!y.anisotropyMap,Pe=K&&!!y.clearcoatMap,ue=K&&!!y.clearcoatNormalMap,xe=K&&!!y.clearcoatRoughnessMap,Ge=Q&&!!y.iridescenceMap,le=Q&&!!y.iridescenceThicknessMap,mt=ae&&!!y.sheenColorMap,qe=ae&&!!y.sheenRoughnessMap,Ae=!!y.specularMap,we=!!y.specularColorMap,Ee=!!y.specularIntensityMap,Ke=ne&&!!y.transmissionMap,Oe=ne&&!!y.thicknessMap,ct=!!y.gradientMap,F=!!y.alphaMap,_e=y.alphaTest>0,Y=!!y.alphaHash,he=!!y.extensions;let ve=Ji;y.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(ve=r.toneMapping);const Ze={isWebGL2:d,shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:O,fragmentShader:j,defines:y.defines,customVertexShaderID:fe,customFragmentShaderID:Se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Le,instancing:pe,instancingColor:pe&&C.instanceColor!==null,instancingMorph:pe&&C.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:sn,alphaToCoverage:!!y.alphaToCoverage,map:Te,matcap:B,envMap:pt,envMapMode:pt&&H.mapping,envMapCubeUVHeight:W,aoMap:ye,lightMap:Ue,bumpMap:Ce,normalMap:Ye,displacementMap:f&&De,emissiveMap:Fe,normalMapObjectSpace:Ye&&y.normalMapType===gd,normalMapTangentSpace:Ye&&y.normalMapType===md,metalnessMap:lt,roughnessMap:P,anisotropy:A,anisotropyMap:ze,clearcoat:K,clearcoatMap:Pe,clearcoatNormalMap:ue,clearcoatRoughnessMap:xe,iridescence:Q,iridescenceMap:Ge,iridescenceThicknessMap:le,sheen:ae,sheenColorMap:mt,sheenRoughnessMap:qe,specularMap:Ae,specularColorMap:we,specularIntensityMap:Ee,transmission:ne,transmissionMap:Ke,thicknessMap:Oe,gradientMap:ct,opaque:y.transparent===!1&&y.blending===Pi&&y.alphaToCoverage===!1,alphaMap:F,alphaTest:_e,alphaHash:Y,combine:y.combine,mapUv:Te&&p(y.map.channel),aoMapUv:ye&&p(y.aoMap.channel),lightMapUv:Ue&&p(y.lightMap.channel),bumpMapUv:Ce&&p(y.bumpMap.channel),normalMapUv:Ye&&p(y.normalMap.channel),displacementMapUv:De&&p(y.displacementMap.channel),emissiveMapUv:Fe&&p(y.emissiveMap.channel),metalnessMapUv:lt&&p(y.metalnessMap.channel),roughnessMapUv:P&&p(y.roughnessMap.channel),anisotropyMapUv:ze&&p(y.anisotropyMap.channel),clearcoatMapUv:Pe&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ue&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:le&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:qe&&p(y.sheenRoughnessMap.channel),specularMapUv:Ae&&p(y.specularMap.channel),specularColorMapUv:we&&p(y.specularColorMap.channel),specularIntensityMapUv:Ee&&p(y.specularIntensityMap.channel),transmissionMapUv:Ke&&p(y.transmissionMap.channel),thicknessMapUv:Oe&&p(y.thicknessMap.channel),alphaMapUv:F&&p(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ye||A),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!U.attributes.uv&&(Te||F),fog:!!D,useFog:y.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:C.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&V.length>0,shadowMapType:r.shadowMap.type,toneMapping:ve,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Te&&y.map.isVideoTexture===!0&&it.getTransfer(y.map.colorSpace)===at,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===gi,flipSided:y.side===zt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:he&&y.extensions.derivatives===!0,extensionFragDepth:he&&y.extensions.fragDepth===!0,extensionDrawBuffers:he&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:he&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:he&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:he&&y.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionFragDepth:d||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ze.vertexUv1s=l.has(1),Ze.vertexUv2s=l.has(2),Ze.vertexUv3s=l.has(3),l.clear(),Ze}function w(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const V in y.defines)T.push(V),T.push(y.defines[V]);return y.isRawShaderMaterial===!1&&(x(T,y),M(T,y),T.push(r.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function x(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function M(y,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.instancingMorph&&a.enable(4),T.matcap&&a.enable(5),T.envMap&&a.enable(6),T.normalMapObjectSpace&&a.enable(7),T.normalMapTangentSpace&&a.enable(8),T.clearcoat&&a.enable(9),T.iridescence&&a.enable(10),T.alphaTest&&a.enable(11),T.vertexColors&&a.enable(12),T.vertexAlphas&&a.enable(13),T.vertexUv1s&&a.enable(14),T.vertexUv2s&&a.enable(15),T.vertexUv3s&&a.enable(16),T.vertexTangents&&a.enable(17),T.anisotropy&&a.enable(18),T.alphaHash&&a.enable(19),T.batching&&a.enable(20),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.alphaToCoverage&&a.enable(20),y.push(a.mask)}function b(y){const T=_[y.type];let V;if(T){const k=mi[T];V=Wd.clone(k.uniforms)}else V=y.uniforms;return V}function S(y,T){let V;for(let k=0,C=h.length;k<C;k++){const D=h[k];if(D.cacheKey===T){V=D,++V.usedTimes;break}}return V===void 0&&(V=new lg(r,T,y,s),h.push(V)),V}function E(y){if(--y.usedTimes===0){const T=h.indexOf(y);h[T]=h[h.length-1],h.pop(),y.destroy()}}function R(y){c.remove(y)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:w,getUniforms:b,acquireProgram:S,releaseProgram:E,releaseShaderCache:R,programs:h,dispose:I}}function fg(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function i(s,o,a){r.get(s)[o]=a}function n(){r=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function pg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Cl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Rl(){const r=[];let e=0;const t=[],i=[],n=[];function s(){e=0,t.length=0,i.length=0,n.length=0}function o(d,u,f,g,_,p){let m=r[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},r[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=_,m.group=p),e++,m}function a(d,u,f,g,_,p){const m=o(d,u,f,g,_,p);f.transmission>0?i.push(m):f.transparent===!0?n.push(m):t.push(m)}function c(d,u,f,g,_,p){const m=o(d,u,f,g,_,p);f.transmission>0?i.unshift(m):f.transparent===!0?n.unshift(m):t.unshift(m)}function l(d,u){t.length>1&&t.sort(d||pg),i.length>1&&i.sort(u||Cl),n.length>1&&n.sort(u||Cl)}function h(){for(let d=e,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:n,init:s,push:a,unshift:c,finish:h,sort:l}}function mg(){let r=new WeakMap;function e(i,n){const s=r.get(i);let o;return s===void 0?(o=new Rl,r.set(i,[o])):n>=s.length?(o=new Rl,s.push(o)):o=s[n],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function gg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new nt};break;case"SpotLight":t={position:new Z,direction:new Z,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return r[e.id]=t,t}}}function _g(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let xg=0;function vg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Mg(r,e){const t=new gg,i=_g(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new Z);const s=new Z,o=new vt,a=new vt;function c(h,d){let u=0,f=0,g=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let _=0,p=0,m=0,w=0,x=0,M=0,b=0,S=0,E=0,R=0,I=0;h.sort(vg);const y=d===!0?Math.PI:1;for(let V=0,k=h.length;V<k;V++){const C=h[V],D=C.color,U=C.intensity,G=C.distance,H=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=D.r*U*y,f+=D.g*U*y,g+=D.b*U*y;else if(C.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(C.sh.coefficients[W],U);I++}else if(C.isDirectionalLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity*y),C.castShadow){const J=C.shadow,te=i.get(C);te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,n.directionalShadow[_]=te,n.directionalShadowMap[_]=H,n.directionalShadowMatrix[_]=C.shadow.matrix,M++}n.directional[_]=W,_++}else if(C.isSpotLight){const W=t.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(D).multiplyScalar(U*y),W.distance=G,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,n.spot[m]=W;const J=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,J.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[m]=J.matrix,C.castShadow){const te=i.get(C);te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,n.spotShadow[m]=te,n.spotShadowMap[m]=H,S++}m++}else if(C.isRectAreaLight){const W=t.get(C);W.color.copy(D).multiplyScalar(U),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),n.rectArea[w]=W,w++}else if(C.isPointLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity*y),W.distance=C.distance,W.decay=C.decay,C.castShadow){const J=C.shadow,te=i.get(C);te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,te.shadowCameraNear=J.camera.near,te.shadowCameraFar=J.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=C.shadow.matrix,b++}n.point[p]=W,p++}else if(C.isHemisphereLight){const W=t.get(C);W.skyColor.copy(C.color).multiplyScalar(U*y),W.groundColor.copy(C.groundColor).multiplyScalar(U*y),n.hemi[x]=W,x++}}w>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=g;const T=n.hash;(T.directionalLength!==_||T.pointLength!==p||T.spotLength!==m||T.rectAreaLength!==w||T.hemiLength!==x||T.numDirectionalShadows!==M||T.numPointShadows!==b||T.numSpotShadows!==S||T.numSpotMaps!==E||T.numLightProbes!==I)&&(n.directional.length=_,n.spot.length=m,n.rectArea.length=w,n.point.length=p,n.hemi.length=x,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=S+E-R,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=I,T.directionalLength=_,T.pointLength=p,T.spotLength=m,T.rectAreaLength=w,T.hemiLength=x,T.numDirectionalShadows=M,T.numPointShadows=b,T.numSpotShadows=S,T.numSpotMaps=E,T.numLightProbes=I,n.version=xg++)}function l(h,d){let u=0,f=0,g=0,_=0,p=0;const m=d.matrixWorldInverse;for(let w=0,x=h.length;w<x;w++){const M=h[w];if(M.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),u++}else if(M.isSpotLight){const b=n.spot[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const b=n.rectArea[_];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),a.identity(),o.copy(M.matrixWorld),o.premultiply(m),a.extractRotation(o),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const b=n.hemi[p];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),p++}}}return{setup:c,setupView:l,state:n}}function Ll(r,e){const t=new Mg(r,e),i=[],n=[];function s(){i.length=0,n.length=0}function o(d){i.push(d)}function a(d){n.push(d)}function c(d){t.setup(i,d)}function l(d){t.setupView(i,d)}return{init:s,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Sg(r,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new Ll(r,e),t.set(s,[c])):o>=a.length?(c=new Ll(r,e),a.push(c)):c=a[o],c}function n(){t=new WeakMap}return{get:i,dispose:n}}class wg extends bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yg extends bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Eg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tg(r,e,t){let i=new Ec;const n=new et,s=new et,o=new Ct,a=new wg({depthPacking:pd}),c=new yg,l={},h=t.maxTextureSize,d={[nn]:zt,[zt]:nn,[gi]:gi},u=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:Eg,fragmentShader:bg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new rn;g.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new vi(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ql;let m=this.type;this.render=function(S,E,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;const I=r.getRenderTarget(),y=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),V=r.state;V.setBlending(Ki),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const k=m!==Ai&&this.type===Ai,C=m===Ai&&this.type!==Ai;for(let D=0,U=S.length;D<U;D++){const G=S[D],H=G.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;n.copy(H.mapSize);const W=H.getFrameExtents();if(n.multiply(W),s.copy(H.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/W.x),n.x=s.x*W.x,H.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/W.y),n.y=s.y*W.y,H.mapSize.y=s.y)),H.map===null||k===!0||C===!0){const te=this.type!==Ai?{minFilter:xt,magFilter:xt}:{};H.map!==null&&H.map.dispose(),H.map=new Cn(n.x,n.y,te),H.map.texture.name=G.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const J=H.getViewportCount();for(let te=0;te<J;te++){const re=H.getViewport(te);o.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),V.viewport(o),H.updateMatrices(G,te),i=H.getFrustum(),M(E,R,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===Ai&&w(H,R),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(I,y,T)};function w(S,E){const R=e.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Cn(n.x,n.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(E,null,R,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(E,null,R,f,_,null)}function x(S,E,R,I){let y=null;const T=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(T!==void 0)y=T;else if(y=R.isPointLight===!0?c:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const V=y.uuid,k=E.uuid;let C=l[V];C===void 0&&(C={},l[V]=C);let D=C[k];D===void 0&&(D=y.clone(),C[k]=D,E.addEventListener("dispose",b)),y=D}if(y.visible=E.visible,y.wireframe=E.wireframe,I===Ai?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const V=r.properties.get(y);V.light=R}return y}function M(S,E,R,I,y){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&y===Ai)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const k=e.update(S),C=S.material;if(Array.isArray(C)){const D=k.groups;for(let U=0,G=D.length;U<G;U++){const H=D[U],W=C[H.materialIndex];if(W&&W.visible){const J=x(S,W,I,y);S.onBeforeShadow(r,S,E,R,k,J,H),r.renderBufferDirect(R,null,k,J,S,H),S.onAfterShadow(r,S,E,R,k,J,H)}}}else if(C.visible){const D=x(S,C,I,y);S.onBeforeShadow(r,S,E,R,k,D,null),r.renderBufferDirect(R,null,k,D,S,null),S.onAfterShadow(r,S,E,R,k,D,null)}}const V=S.children;for(let k=0,C=V.length;k<C;k++)M(V[k],E,R,I,y)}function b(S){S.target.removeEventListener("dispose",b);for(const R in l){const I=l[R],y=S.target.uuid;y in I&&(I[y].dispose(),delete I[y])}}}function Ag(r,e,t){const i=t.isWebGL2;function n(){let F=!1;const _e=new Ct;let Y=null;const he=new Ct(0,0,0,0);return{setMask:function(ve){Y!==ve&&!F&&(r.colorMask(ve,ve,ve,ve),Y=ve)},setLocked:function(ve){F=ve},setClear:function(ve,Ze,st,Tt,qt){qt===!0&&(ve*=Tt,Ze*=Tt,st*=Tt),_e.set(ve,Ze,st,Tt),he.equals(_e)===!1&&(r.clearColor(ve,Ze,st,Tt),he.copy(_e))},reset:function(){F=!1,Y=null,he.set(-1,0,0,0)}}}function s(){let F=!1,_e=null,Y=null,he=null;return{setTest:function(ve){ve?pe(r.DEPTH_TEST):Le(r.DEPTH_TEST)},setMask:function(ve){_e!==ve&&!F&&(r.depthMask(ve),_e=ve)},setFunc:function(ve){if(Y!==ve){switch(ve){case Bh:r.depthFunc(r.NEVER);break;case zh:r.depthFunc(r.ALWAYS);break;case Gh:r.depthFunc(r.LESS);break;case fr:r.depthFunc(r.LEQUAL);break;case Hh:r.depthFunc(r.EQUAL);break;case Vh:r.depthFunc(r.GEQUAL);break;case Wh:r.depthFunc(r.GREATER);break;case Xh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Y=ve}},setLocked:function(ve){F=ve},setClear:function(ve){he!==ve&&(r.clearDepth(ve),he=ve)},reset:function(){F=!1,_e=null,Y=null,he=null}}}function o(){let F=!1,_e=null,Y=null,he=null,ve=null,Ze=null,st=null,Tt=null,qt=null;return{setTest:function(rt){F||(rt?pe(r.STENCIL_TEST):Le(r.STENCIL_TEST))},setMask:function(rt){_e!==rt&&!F&&(r.stencilMask(rt),_e=rt)},setFunc:function(rt,Dt,ui){(Y!==rt||he!==Dt||ve!==ui)&&(r.stencilFunc(rt,Dt,ui),Y=rt,he=Dt,ve=ui)},setOp:function(rt,Dt,ui){(Ze!==rt||st!==Dt||Tt!==ui)&&(r.stencilOp(rt,Dt,ui),Ze=rt,st=Dt,Tt=ui)},setLocked:function(rt){F=rt},setClear:function(rt){qt!==rt&&(r.clearStencil(rt),qt=rt)},reset:function(){F=!1,_e=null,Y=null,he=null,ve=null,Ze=null,st=null,Tt=null,qt=null}}}const a=new n,c=new s,l=new o,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,_=[],p=null,m=!1,w=null,x=null,M=null,b=null,S=null,E=null,R=null,I=new nt(0,0,0),y=0,T=!1,V=null,k=null,C=null,D=null,U=null;const G=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,W=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(J)[1]),H=W>=1):J.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),H=W>=2);let te=null,re={};const ie=r.getParameter(r.SCISSOR_BOX),O=r.getParameter(r.VIEWPORT),j=new Ct().fromArray(ie),fe=new Ct().fromArray(O);function Se(F,_e,Y,he){const ve=new Uint8Array(4),Ze=r.createTexture();r.bindTexture(F,Ze),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let st=0;st<Y;st++)i&&(F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY)?r.texImage3D(_e,0,r.RGBA,1,1,he,0,r.RGBA,r.UNSIGNED_BYTE,ve):r.texImage2D(_e+st,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ve);return Ze}const me={};me[r.TEXTURE_2D]=Se(r.TEXTURE_2D,r.TEXTURE_2D,1),me[r.TEXTURE_CUBE_MAP]=Se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(me[r.TEXTURE_2D_ARRAY]=Se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),me[r.TEXTURE_3D]=Se(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),pe(r.DEPTH_TEST),c.setFunc(fr),De(!1),Fe(ho),pe(r.CULL_FACE),Ce(Ki);function pe(F){u[F]!==!0&&(r.enable(F),u[F]=!0)}function Le(F){u[F]!==!1&&(r.disable(F),u[F]=!1)}function Te(F,_e){return f[F]!==_e?(r.bindFramebuffer(F,_e),f[F]=_e,i&&(F===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=_e),F===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=_e)),!0):!1}function B(F,_e){let Y=_,he=!1;if(F){Y=g.get(_e),Y===void 0&&(Y=[],g.set(_e,Y));const ve=F.textures;if(Y.length!==ve.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let Ze=0,st=ve.length;Ze<st;Ze++)Y[Ze]=r.COLOR_ATTACHMENT0+Ze;Y.length=ve.length,he=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,he=!0);if(he)if(t.isWebGL2)r.drawBuffers(Y);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Y);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function pt(F){return p!==F?(r.useProgram(F),p=F,!0):!1}const ye={[gn]:r.FUNC_ADD,[Ah]:r.FUNC_SUBTRACT,[Ch]:r.FUNC_REVERSE_SUBTRACT};if(i)ye[po]=r.MIN,ye[mo]=r.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(ye[po]=F.MIN_EXT,ye[mo]=F.MAX_EXT)}const Ue={[Rh]:r.ZERO,[lr]:r.ONE,[Lh]:r.SRC_COLOR,[La]:r.SRC_ALPHA,[Uh]:r.SRC_ALPHA_SATURATE,[ec]:r.DST_COLOR,[Ph]:r.DST_ALPHA,[Ra]:r.ONE_MINUS_SRC_COLOR,[bs]:r.ONE_MINUS_SRC_ALPHA,[Dh]:r.ONE_MINUS_DST_COLOR,[Ih]:r.ONE_MINUS_DST_ALPHA,[Nh]:r.CONSTANT_COLOR,[Fh]:r.ONE_MINUS_CONSTANT_COLOR,[Oh]:r.CONSTANT_ALPHA,[kh]:r.ONE_MINUS_CONSTANT_ALPHA};function Ce(F,_e,Y,he,ve,Ze,st,Tt,qt,rt){if(F===Ki){m===!0&&(Le(r.BLEND),m=!1);return}if(m===!1&&(pe(r.BLEND),m=!0),F!==Ca){if(F!==w||rt!==T){if((x!==gn||S!==gn)&&(r.blendEquation(r.FUNC_ADD),x=gn,S=gn),rt)switch(F){case Pi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Aa:r.blendFunc(r.ONE,r.ONE);break;case uo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case fo:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Pi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Aa:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case uo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case fo:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}M=null,b=null,E=null,R=null,I.set(0,0,0),y=0,w=F,T=rt}return}ve=ve||_e,Ze=Ze||Y,st=st||he,(_e!==x||ve!==S)&&(r.blendEquationSeparate(ye[_e],ye[ve]),x=_e,S=ve),(Y!==M||he!==b||Ze!==E||st!==R)&&(r.blendFuncSeparate(Ue[Y],Ue[he],Ue[Ze],Ue[st]),M=Y,b=he,E=Ze,R=st),(Tt.equals(I)===!1||qt!==y)&&(r.blendColor(Tt.r,Tt.g,Tt.b,qt),I.copy(Tt),y=qt),w=F,T=!1}function Ye(F,_e){F.side===gi?Le(r.CULL_FACE):pe(r.CULL_FACE);let Y=F.side===zt;_e&&(Y=!Y),De(Y),F.blending===Pi&&F.transparent===!1?Ce(Ki):Ce(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),c.setFunc(F.depthFunc),c.setTest(F.depthTest),c.setMask(F.depthWrite),a.setMask(F.colorWrite);const he=F.stencilWrite;l.setTest(he),he&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),P(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?pe(r.SAMPLE_ALPHA_TO_COVERAGE):Le(r.SAMPLE_ALPHA_TO_COVERAGE)}function De(F){V!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),V=F)}function Fe(F){F!==Eh?(pe(r.CULL_FACE),F!==k&&(F===ho?r.cullFace(r.BACK):F===bh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Le(r.CULL_FACE),k=F}function lt(F){F!==C&&(H&&r.lineWidth(F),C=F)}function P(F,_e,Y){F?(pe(r.POLYGON_OFFSET_FILL),(D!==_e||U!==Y)&&(r.polygonOffset(_e,Y),D=_e,U=Y)):Le(r.POLYGON_OFFSET_FILL)}function A(F){F?pe(r.SCISSOR_TEST):Le(r.SCISSOR_TEST)}function K(F){F===void 0&&(F=r.TEXTURE0+G-1),te!==F&&(r.activeTexture(F),te=F)}function Q(F,_e,Y){Y===void 0&&(te===null?Y=r.TEXTURE0+G-1:Y=te);let he=re[Y];he===void 0&&(he={type:void 0,texture:void 0},re[Y]=he),(he.type!==F||he.texture!==_e)&&(te!==Y&&(r.activeTexture(Y),te=Y),r.bindTexture(F,_e||me[F]),he.type=F,he.texture=_e)}function ae(){const F=re[te];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ne(){try{r.compressedTexImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{r.compressedTexImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{r.texSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{r.texSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ge(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{r.texStorage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function mt(){try{r.texStorage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function qe(){try{r.texImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{r.texImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(F){j.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),j.copy(F))}function Ee(F){fe.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),fe.copy(F))}function Ke(F,_e){let Y=d.get(_e);Y===void 0&&(Y=new WeakMap,d.set(_e,Y));let he=Y.get(F);he===void 0&&(he=r.getUniformBlockIndex(_e,F.name),Y.set(F,he))}function Oe(F,_e){const he=d.get(_e).get(F);h.get(_e)!==he&&(r.uniformBlockBinding(_e,he,F.__bindingPointIndex),h.set(_e,he))}function ct(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),i===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},te=null,re={},f={},g=new WeakMap,_=[],p=null,m=!1,w=null,x=null,M=null,b=null,S=null,E=null,R=null,I=new nt(0,0,0),y=0,T=!1,V=null,k=null,C=null,D=null,U=null,j.set(0,0,r.canvas.width,r.canvas.height),fe.set(0,0,r.canvas.width,r.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:pe,disable:Le,bindFramebuffer:Te,drawBuffers:B,useProgram:pt,setBlending:Ce,setMaterial:Ye,setFlipSided:De,setCullFace:Fe,setLineWidth:lt,setPolygonOffset:P,setScissorTest:A,activeTexture:K,bindTexture:Q,unbindTexture:ae,compressedTexImage2D:ne,compressedTexImage3D:ze,texImage2D:qe,texImage3D:Ae,updateUBOMapping:Ke,uniformBlockBinding:Oe,texStorage2D:le,texStorage3D:mt,texSubImage2D:Pe,texSubImage3D:ue,compressedTexSubImage2D:xe,compressedTexSubImage3D:Ge,scissor:we,viewport:Ee,reset:ct}}function Cg(r,e,t,i,n,s,o){const a=n.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new et,d=new WeakMap;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,A){return g?new OffscreenCanvas(P,A):Mr("canvas")}function p(P,A,K,Q){let ae=1;const ne=lt(P);if((ne.width>Q||ne.height>Q)&&(ae=Q/Math.max(ne.width,ne.height)),ae<1||A===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ze=A?Fa:Math.floor,Pe=ze(ae*ne.width),ue=ze(ae*ne.height);u===void 0&&(u=_(Pe,ue));const xe=K?_(Pe,ue):u;return xe.width=Pe,xe.height=ue,xe.getContext("2d").drawImage(P,0,0,Pe,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+Pe+"x"+ue+")."),xe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),P;return P}function m(P){const A=lt(P);return Wo(A.width)&&Wo(A.height)}function w(P){return a?!1:P.wrapS!==ii||P.wrapT!==ii||P.minFilter!==xt&&P.minFilter!==bt}function x(P,A){return P.generateMipmaps&&A&&P.minFilter!==xt&&P.minFilter!==bt}function M(P){r.generateMipmap(P)}function b(P,A,K,Q,ae=!1){if(a===!1)return A;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ne=A;if(A===r.RED&&(K===r.FLOAT&&(ne=r.R32F),K===r.HALF_FLOAT&&(ne=r.R16F),K===r.UNSIGNED_BYTE&&(ne=r.R8)),A===r.RED_INTEGER&&(K===r.UNSIGNED_BYTE&&(ne=r.R8UI),K===r.UNSIGNED_SHORT&&(ne=r.R16UI),K===r.UNSIGNED_INT&&(ne=r.R32UI),K===r.BYTE&&(ne=r.R8I),K===r.SHORT&&(ne=r.R16I),K===r.INT&&(ne=r.R32I)),A===r.RG&&(K===r.FLOAT&&(ne=r.RG32F),K===r.HALF_FLOAT&&(ne=r.RG16F),K===r.UNSIGNED_BYTE&&(ne=r.RG8)),A===r.RG_INTEGER&&(K===r.UNSIGNED_BYTE&&(ne=r.RG8UI),K===r.UNSIGNED_SHORT&&(ne=r.RG16UI),K===r.UNSIGNED_INT&&(ne=r.RG32UI),K===r.BYTE&&(ne=r.RG8I),K===r.SHORT&&(ne=r.RG16I),K===r.INT&&(ne=r.RG32I)),A===r.RGBA){const ze=ae?gr:it.getTransfer(Q);K===r.FLOAT&&(ne=r.RGBA32F),K===r.HALF_FLOAT&&(ne=r.RGBA16F),K===r.UNSIGNED_BYTE&&(ne=ze===at?r.SRGB8_ALPHA8:r.RGBA8),K===r.UNSIGNED_SHORT_4_4_4_4&&(ne=r.RGBA4),K===r.UNSIGNED_SHORT_5_5_5_1&&(ne=r.RGB5_A1)}return(ne===r.R16F||ne===r.R32F||ne===r.RG16F||ne===r.RG32F||ne===r.RGBA16F||ne===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function S(P,A,K){return x(P,K)===!0||P.isFramebufferTexture&&P.minFilter!==xt&&P.minFilter!==bt?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function E(P){return P===xt||P===go||P===ms?r.NEAREST:r.LINEAR}function R(P){const A=P.target;A.removeEventListener("dispose",R),y(A),A.isVideoTexture&&d.delete(A)}function I(P){const A=P.target;A.removeEventListener("dispose",I),V(A)}function y(P){const A=i.get(P);if(A.__webglInit===void 0)return;const K=P.source,Q=f.get(K);if(Q){const ae=Q[A.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&T(P),Object.keys(Q).length===0&&f.delete(K)}i.remove(P)}function T(P){const A=i.get(P);r.deleteTexture(A.__webglTexture);const K=P.source,Q=f.get(K);delete Q[A.__cacheKey],o.memory.textures--}function V(P){const A=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(A.__webglFramebuffer[Q]))for(let ae=0;ae<A.__webglFramebuffer[Q].length;ae++)r.deleteFramebuffer(A.__webglFramebuffer[Q][ae]);else r.deleteFramebuffer(A.__webglFramebuffer[Q]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[Q])}else{if(Array.isArray(A.__webglFramebuffer))for(let Q=0;Q<A.__webglFramebuffer.length;Q++)r.deleteFramebuffer(A.__webglFramebuffer[Q]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let Q=0;Q<A.__webglColorRenderbuffer.length;Q++)A.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[Q]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const K=P.textures;for(let Q=0,ae=K.length;Q<ae;Q++){const ne=i.get(K[Q]);ne.__webglTexture&&(r.deleteTexture(ne.__webglTexture),o.memory.textures--),i.remove(K[Q])}i.remove(P)}let k=0;function C(){k=0}function D(){const P=k;return P>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+n.maxTextures),k+=1,P}function U(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function G(P,A){const K=i.get(P);if(P.isVideoTexture&&De(P),P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){const Q=P.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(K,P,A);return}}t.bindTexture(r.TEXTURE_2D,K.__webglTexture,r.TEXTURE0+A)}function H(P,A){const K=i.get(P);if(P.version>0&&K.__version!==P.version){fe(K,P,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,K.__webglTexture,r.TEXTURE0+A)}function W(P,A){const K=i.get(P);if(P.version>0&&K.__version!==P.version){fe(K,P,A);return}t.bindTexture(r.TEXTURE_3D,K.__webglTexture,r.TEXTURE0+A)}function J(P,A){const K=i.get(P);if(P.version>0&&K.__version!==P.version){Se(K,P,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture,r.TEXTURE0+A)}const te={[pr]:r.REPEAT,[ii]:r.CLAMP_TO_EDGE,[mr]:r.MIRRORED_REPEAT},re={[xt]:r.NEAREST,[go]:r.NEAREST_MIPMAP_NEAREST,[ms]:r.NEAREST_MIPMAP_LINEAR,[bt]:r.LINEAR,[Gr]:r.LINEAR_MIPMAP_NEAREST,[Sn]:r.LINEAR_MIPMAP_LINEAR},ie={[_d]:r.NEVER,[yd]:r.ALWAYS,[xd]:r.LESS,[hc]:r.LEQUAL,[vd]:r.EQUAL,[wd]:r.GEQUAL,[Md]:r.GREATER,[Sd]:r.NOTEQUAL};function O(P,A,K){if(A.type===Ci&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===bt||A.magFilter===Gr||A.magFilter===ms||A.magFilter===Sn||A.minFilter===bt||A.minFilter===Gr||A.minFilter===ms||A.minFilter===Sn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),K?(r.texParameteri(P,r.TEXTURE_WRAP_S,te[A.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,te[A.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,te[A.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,re[A.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,re[A.minFilter])):(r.texParameteri(P,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(P,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(A.wrapS!==ii||A.wrapT!==ii)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,r.TEXTURE_MAG_FILTER,E(A.magFilter)),r.texParameteri(P,r.TEXTURE_MIN_FILTER,E(A.minFilter)),A.minFilter!==xt&&A.minFilter!==bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,ie[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===xt||A.minFilter!==ms&&A.minFilter!==Sn||A.type===Ci&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Ts&&e.has("OES_texture_half_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,n.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function j(P,A){let K=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",R));const Q=A.source;let ae=f.get(Q);ae===void 0&&(ae={},f.set(Q,ae));const ne=U(A);if(ne!==P.__cacheKey){ae[ne]===void 0&&(ae[ne]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,K=!0),ae[ne].usedTimes++;const ze=ae[P.__cacheKey];ze!==void 0&&(ae[P.__cacheKey].usedTimes--,ze.usedTimes===0&&T(A)),P.__cacheKey=ne,P.__webglTexture=ae[ne].texture}return K}function fe(P,A,K){let Q=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(Q=r.TEXTURE_3D);const ae=j(P,A),ne=A.source;t.bindTexture(Q,P.__webglTexture,r.TEXTURE0+K);const ze=i.get(ne);if(ne.version!==ze.__version||ae===!0){t.activeTexture(r.TEXTURE0+K);const Pe=it.getPrimaries(it.workingColorSpace),ue=A.colorSpace===Xi?null:it.getPrimaries(A.colorSpace),xe=A.colorSpace===Xi||Pe===ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ge=w(A)&&m(A.image)===!1;let le=p(A.image,Ge,!1,n.maxTextureSize);le=Fe(A,le);const mt=m(le)||a,qe=s.convert(A.format,A.colorSpace);let Ae=s.convert(A.type),we=b(A.internalFormat,qe,Ae,A.colorSpace,A.isVideoTexture);O(Q,A,mt);let Ee;const Ke=A.mipmaps,Oe=a&&A.isVideoTexture!==!0&&we!==cc,ct=ze.__version===void 0||ae===!0,F=ne.dataReady,_e=S(A,le,mt);if(A.isDepthTexture)we=r.DEPTH_COMPONENT,a?A.type===Ci?we=r.DEPTH_COMPONENT32F:A.type===$i?we=r.DEPTH_COMPONENT24:A.type===yn?we=r.DEPTH24_STENCIL8:we=r.DEPTH_COMPONENT16:A.type===Ci&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===En&&we===r.DEPTH_COMPONENT&&A.type!==ja&&A.type!==$i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=$i,Ae=s.convert(A.type)),A.format===cs&&we===r.DEPTH_COMPONENT&&(we=r.DEPTH_STENCIL,A.type!==yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=yn,Ae=s.convert(A.type))),ct&&(Oe?t.texStorage2D(r.TEXTURE_2D,1,we,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,we,le.width,le.height,0,qe,Ae,null));else if(A.isDataTexture)if(Ke.length>0&&mt){Oe&&ct&&t.texStorage2D(r.TEXTURE_2D,_e,we,Ke[0].width,Ke[0].height);for(let Y=0,he=Ke.length;Y<he;Y++)Ee=Ke[Y],Oe?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Ee.width,Ee.height,qe,Ae,Ee.data):t.texImage2D(r.TEXTURE_2D,Y,we,Ee.width,Ee.height,0,qe,Ae,Ee.data);A.generateMipmaps=!1}else Oe?(ct&&t.texStorage2D(r.TEXTURE_2D,_e,we,le.width,le.height),F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le.width,le.height,qe,Ae,le.data)):t.texImage2D(r.TEXTURE_2D,0,we,le.width,le.height,0,qe,Ae,le.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Oe&&ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,we,Ke[0].width,Ke[0].height,le.depth);for(let Y=0,he=Ke.length;Y<he;Y++)Ee=Ke[Y],A.format!==ci?qe!==null?Oe?F&&t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,Ee.width,Ee.height,le.depth,qe,Ee.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,we,Ee.width,Ee.height,le.depth,0,Ee.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,Ee.width,Ee.height,le.depth,qe,Ae,Ee.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Y,we,Ee.width,Ee.height,le.depth,0,qe,Ae,Ee.data)}else{Oe&&ct&&t.texStorage2D(r.TEXTURE_2D,_e,we,Ke[0].width,Ke[0].height);for(let Y=0,he=Ke.length;Y<he;Y++)Ee=Ke[Y],A.format!==ci?qe!==null?Oe?F&&t.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,Ee.width,Ee.height,qe,Ee.data):t.compressedTexImage2D(r.TEXTURE_2D,Y,we,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Ee.width,Ee.height,qe,Ae,Ee.data):t.texImage2D(r.TEXTURE_2D,Y,we,Ee.width,Ee.height,0,qe,Ae,Ee.data)}else if(A.isDataArrayTexture)Oe?(ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,we,le.width,le.height,le.depth),F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,qe,Ae,le.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,we,le.width,le.height,le.depth,0,qe,Ae,le.data);else if(A.isData3DTexture)Oe?(ct&&t.texStorage3D(r.TEXTURE_3D,_e,we,le.width,le.height,le.depth),F&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,qe,Ae,le.data)):t.texImage3D(r.TEXTURE_3D,0,we,le.width,le.height,le.depth,0,qe,Ae,le.data);else if(A.isFramebufferTexture){if(ct)if(Oe)t.texStorage2D(r.TEXTURE_2D,_e,we,le.width,le.height);else{let Y=le.width,he=le.height;for(let ve=0;ve<_e;ve++)t.texImage2D(r.TEXTURE_2D,ve,we,Y,he,0,qe,Ae,null),Y>>=1,he>>=1}}else if(Ke.length>0&&mt){if(Oe&&ct){const Y=lt(Ke[0]);t.texStorage2D(r.TEXTURE_2D,_e,we,Y.width,Y.height)}for(let Y=0,he=Ke.length;Y<he;Y++)Ee=Ke[Y],Oe?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,qe,Ae,Ee):t.texImage2D(r.TEXTURE_2D,Y,we,qe,Ae,Ee);A.generateMipmaps=!1}else if(Oe){if(ct){const Y=lt(le);t.texStorage2D(r.TEXTURE_2D,_e,we,Y.width,Y.height)}F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,qe,Ae,le)}else t.texImage2D(r.TEXTURE_2D,0,we,qe,Ae,le);x(A,mt)&&M(Q),ze.__version=ne.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function Se(P,A,K){if(A.image.length!==6)return;const Q=j(P,A),ae=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+K);const ne=i.get(ae);if(ae.version!==ne.__version||Q===!0){t.activeTexture(r.TEXTURE0+K);const ze=it.getPrimaries(it.workingColorSpace),Pe=A.colorSpace===Xi?null:it.getPrimaries(A.colorSpace),ue=A.colorSpace===Xi||ze===Pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const xe=A.isCompressedTexture||A.image[0].isCompressedTexture,Ge=A.image[0]&&A.image[0].isDataTexture,le=[];for(let Y=0;Y<6;Y++)!xe&&!Ge?le[Y]=p(A.image[Y],!1,!0,n.maxCubemapSize):le[Y]=Ge?A.image[Y].image:A.image[Y],le[Y]=Fe(A,le[Y]);const mt=le[0],qe=m(mt)||a,Ae=s.convert(A.format,A.colorSpace),we=s.convert(A.type),Ee=b(A.internalFormat,Ae,we,A.colorSpace),Ke=a&&A.isVideoTexture!==!0,Oe=ne.__version===void 0||Q===!0,ct=ae.dataReady;let F=S(A,mt,qe);O(r.TEXTURE_CUBE_MAP,A,qe);let _e;if(xe){Ke&&Oe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,F,Ee,mt.width,mt.height);for(let Y=0;Y<6;Y++){_e=le[Y].mipmaps;for(let he=0;he<_e.length;he++){const ve=_e[he];A.format!==ci?Ae!==null?Ke?ct&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,ve.width,ve.height,Ae,ve.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,Ee,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?ct&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,0,0,ve.width,ve.height,Ae,we,ve.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he,Ee,ve.width,ve.height,0,Ae,we,ve.data)}}}else{if(_e=A.mipmaps,Ke&&Oe){_e.length>0&&F++;const Y=lt(le[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,F,Ee,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Ge){Ke?ct&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,le[Y].width,le[Y].height,Ae,we,le[Y].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ee,le[Y].width,le[Y].height,0,Ae,we,le[Y].data);for(let he=0;he<_e.length;he++){const Ze=_e[he].image[Y].image;Ke?ct&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Ze.width,Ze.height,Ae,we,Ze.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,Ee,Ze.width,Ze.height,0,Ae,we,Ze.data)}}else{Ke?ct&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ae,we,le[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ee,Ae,we,le[Y]);for(let he=0;he<_e.length;he++){const ve=_e[he];Ke?ct&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,0,0,Ae,we,ve.image[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,he+1,Ee,Ae,we,ve.image[Y])}}}x(A,qe)&&M(r.TEXTURE_CUBE_MAP),ne.__version=ae.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function me(P,A,K,Q,ae,ne){const ze=s.convert(K.format,K.colorSpace),Pe=s.convert(K.type),ue=b(K.internalFormat,ze,Pe,K.colorSpace);if(!i.get(A).__hasExternalTextures){const Ge=Math.max(1,A.width>>ne),le=Math.max(1,A.height>>ne);ae===r.TEXTURE_3D||ae===r.TEXTURE_2D_ARRAY?t.texImage3D(ae,ne,ue,Ge,le,A.depth,0,ze,Pe,null):t.texImage2D(ae,ne,ue,Ge,le,0,ze,Pe,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),Ye(A)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,ae,i.get(K).__webglTexture,0,Ce(A)):(ae===r.TEXTURE_2D||ae>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,ae,i.get(K).__webglTexture,ne),t.bindFramebuffer(r.FRAMEBUFFER,null)}function pe(P,A,K){if(r.bindRenderbuffer(r.RENDERBUFFER,P),A.depthBuffer&&!A.stencilBuffer){let Q=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(K||Ye(A)){const ae=A.depthTexture;ae&&ae.isDepthTexture&&(ae.type===Ci?Q=r.DEPTH_COMPONENT32F:ae.type===$i&&(Q=r.DEPTH_COMPONENT24));const ne=Ce(A);Ye(A)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,Q,A.width,A.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,Q,A.width,A.height)}else r.renderbufferStorage(r.RENDERBUFFER,Q,A.width,A.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,P)}else if(A.depthBuffer&&A.stencilBuffer){const Q=Ce(A);K&&Ye(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,A.width,A.height):Ye(A)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,P)}else{const Q=A.textures;for(let ae=0;ae<Q.length;ae++){const ne=Q[ae],ze=s.convert(ne.format,ne.colorSpace),Pe=s.convert(ne.type),ue=b(ne.internalFormat,ze,Pe,ne.colorSpace),xe=Ce(A);K&&Ye(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,ue,A.width,A.height):Ye(A)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,ue,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ue,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Le(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),G(A.depthTexture,0);const Q=i.get(A.depthTexture).__webglTexture,ae=Ce(A);if(A.depthTexture.format===En)Ye(A)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,ae):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(A.depthTexture.format===cs)Ye(A)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,ae):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Te(P){const A=i.get(P),K=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Le(A.__webglFramebuffer,P)}else if(K){A.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[Q]),A.__webglDepthbuffer[Q]=r.createRenderbuffer(),pe(A.__webglDepthbuffer[Q],P,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),pe(A.__webglDepthbuffer,P,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function B(P,A,K){const Q=i.get(P);A!==void 0&&me(Q.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),K!==void 0&&Te(P)}function pt(P){const A=P.texture,K=i.get(P),Q=i.get(A);P.addEventListener("dispose",I);const ae=P.textures,ne=P.isWebGLCubeRenderTarget===!0,ze=ae.length>1,Pe=m(P)||a;if(ze||(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=A.version,o.memory.textures++),ne){K.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(a&&A.mipmaps&&A.mipmaps.length>0){K.__webglFramebuffer[ue]=[];for(let xe=0;xe<A.mipmaps.length;xe++)K.__webglFramebuffer[ue][xe]=r.createFramebuffer()}else K.__webglFramebuffer[ue]=r.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){K.__webglFramebuffer=[];for(let ue=0;ue<A.mipmaps.length;ue++)K.__webglFramebuffer[ue]=r.createFramebuffer()}else K.__webglFramebuffer=r.createFramebuffer();if(ze)if(n.drawBuffers)for(let ue=0,xe=ae.length;ue<xe;ue++){const Ge=i.get(ae[ue]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=r.createTexture(),o.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&Ye(P)===!1){K.__webglMultisampledFramebuffer=r.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let ue=0;ue<ae.length;ue++){const xe=ae[ue];K.__webglColorRenderbuffer[ue]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,K.__webglColorRenderbuffer[ue]);const Ge=s.convert(xe.format,xe.colorSpace),le=s.convert(xe.type),mt=b(xe.internalFormat,Ge,le,xe.colorSpace,P.isXRRenderTarget===!0),qe=Ce(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,qe,mt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ue,r.RENDERBUFFER,K.__webglColorRenderbuffer[ue])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(K.__webglDepthRenderbuffer=r.createRenderbuffer(),pe(K.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ne){t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),O(r.TEXTURE_CUBE_MAP,A,Pe);for(let ue=0;ue<6;ue++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let xe=0;xe<A.mipmaps.length;xe++)me(K.__webglFramebuffer[ue][xe],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,xe);else me(K.__webglFramebuffer[ue],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);x(A,Pe)&&M(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ze){for(let ue=0,xe=ae.length;ue<xe;ue++){const Ge=ae[ue],le=i.get(Ge);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),O(r.TEXTURE_2D,Ge,Pe),me(K.__webglFramebuffer,P,Ge,r.COLOR_ATTACHMENT0+ue,r.TEXTURE_2D,0),x(Ge,Pe)&&M(r.TEXTURE_2D)}t.unbindTexture()}else{let ue=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?ue=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,Q.__webglTexture),O(ue,A,Pe),a&&A.mipmaps&&A.mipmaps.length>0)for(let xe=0;xe<A.mipmaps.length;xe++)me(K.__webglFramebuffer[xe],P,A,r.COLOR_ATTACHMENT0,ue,xe);else me(K.__webglFramebuffer,P,A,r.COLOR_ATTACHMENT0,ue,0);x(A,Pe)&&M(ue),t.unbindTexture()}P.depthBuffer&&Te(P)}function ye(P){const A=m(P)||a,K=P.textures;for(let Q=0,ae=K.length;Q<ae;Q++){const ne=K[Q];if(x(ne,A)){const ze=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Pe=i.get(ne).__webglTexture;t.bindTexture(ze,Pe),M(ze),t.unbindTexture()}}}function Ue(P){if(a&&P.samples>0&&Ye(P)===!1){const A=P.textures,K=P.width,Q=P.height;let ae=r.COLOR_BUFFER_BIT;const ne=[],ze=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=i.get(P),ue=A.length>1;if(ue)for(let xe=0;xe<A.length;xe++)t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let xe=0;xe<A.length;xe++){ne.push(r.COLOR_ATTACHMENT0+xe),P.depthBuffer&&ne.push(ze);const Ge=Pe.__ignoreDepthValues!==void 0?Pe.__ignoreDepthValues:!1;if(Ge===!1&&(P.depthBuffer&&(ae|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&(ae|=r.STENCIL_BUFFER_BIT)),ue&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[xe]),Ge===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ze]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ze])),ue){const le=i.get(A[xe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,K,Q,0,0,K,Q,ae,r.NEAREST),l&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ue)for(let xe=0;xe<A.length;xe++){t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[xe]);const Ge=i.get(A[xe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,Ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}}function Ce(P){return Math.min(n.maxSamples,P.samples)}function Ye(P){const A=i.get(P);return a&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function De(P){const A=o.render.frame;d.get(P)!==A&&(d.set(P,A),P.update())}function Fe(P,A){const K=P.colorSpace,Q=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Ua||K!==sn&&K!==Xi&&(it.getTransfer(K)===at?a===!1?e.has("EXT_sRGB")===!0&&Q===ci?(P.format=Ua,P.minFilter=bt,P.generateMipmaps=!1):A=pc.sRGBToLinear(A):(Q!==ci||ae!==Qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),A}function lt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(h.width=P.naturalWidth||P.width,h.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(h.width=P.displayWidth,h.height=P.displayHeight):(h.width=P.width,h.height=P.height),h}this.allocateTextureUnit=D,this.resetTextureUnits=C,this.setTexture2D=G,this.setTexture2DArray=H,this.setTexture3D=W,this.setTextureCube=J,this.rebindTextures=B,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Ye}function Rg(r,e,t){const i=t.isWebGL2;function n(s,o=Xi){let a;const c=it.getTransfer(o);if(s===Qi)return r.UNSIGNED_BYTE;if(s===sc)return r.UNSIGNED_SHORT_4_4_4_4;if(s===rc)return r.UNSIGNED_SHORT_5_5_5_1;if(s===rd)return r.BYTE;if(s===ad)return r.SHORT;if(s===ja)return r.UNSIGNED_SHORT;if(s===nc)return r.INT;if(s===$i)return r.UNSIGNED_INT;if(s===Ci)return r.FLOAT;if(s===Ts)return i?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===od)return r.ALPHA;if(s===ci)return r.RGBA;if(s===ld)return r.LUMINANCE;if(s===cd)return r.LUMINANCE_ALPHA;if(s===En)return r.DEPTH_COMPONENT;if(s===cs)return r.DEPTH_STENCIL;if(s===Ua)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===hd)return r.RED;if(s===ac)return r.RED_INTEGER;if(s===dd)return r.RG;if(s===oc)return r.RG_INTEGER;if(s===lc)return r.RGBA_INTEGER;if(s===Hr||s===Vr||s===Wr||s===Xr)if(c===at)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Hr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Vr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Wr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Hr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Vr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Wr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Xr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===_o||s===xo||s===vo||s===Mo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===_o)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===xo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===vo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Mo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===cc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===So||s===wo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===So)return c===at?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===wo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===yo||s===Eo||s===bo||s===To||s===Ao||s===Co||s===Ro||s===Lo||s===Po||s===Io||s===Do||s===Uo||s===No||s===Fo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===yo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Eo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===bo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===To)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ao)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Co)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ro)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Lo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Po)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Io)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Do)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Uo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===No)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Fo)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Yr||s===Oo||s===ko)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Yr)return c===at?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Oo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ko)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ud||s===Bo||s===zo||s===Go)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Yr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Bo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===zo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Go)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===yn?i?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:n}}class Lg extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class rr extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pg={type:"move"};class va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Pg)))}return a!==null&&(a.visible=n!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new rr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Ig=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ug{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const n=new si,s=e.properties.get(n);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}render(e,t){if(this.texture!==null){if(this.mesh===null){const i=t.cameras[0].viewport,n=new Ui({extensions:{fragDepth:!0},vertexShader:Ig,fragmentShader:Dg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new vi(new Ir(20,20),n)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class Ng extends us{constructor(e,t){super();const i=this;let n=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const _=new Ug,p=t.getContextAttributes();let m=null,w=null;const x=[],M=[],b=new et;let S=null;const E=new ti;E.layers.enable(1),E.viewport=new Ct;const R=new ti;R.layers.enable(2),R.viewport=new Ct;const I=[E,R],y=new Lg;y.layers.enable(1),y.layers.enable(2);let T=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let j=x[O];return j===void 0&&(j=new va,x[O]=j),j.getTargetRaySpace()},this.getControllerGrip=function(O){let j=x[O];return j===void 0&&(j=new va,x[O]=j),j.getGripSpace()},this.getHand=function(O){let j=x[O];return j===void 0&&(j=new va,x[O]=j),j.getHandSpace()};function k(O){const j=M.indexOf(O.inputSource);if(j===-1)return;const fe=x[j];fe!==void 0&&(fe.update(O.inputSource,O.frame,l||o),fe.dispatchEvent({type:O.type,data:O.inputSource}))}function C(){n.removeEventListener("select",k),n.removeEventListener("selectstart",k),n.removeEventListener("selectend",k),n.removeEventListener("squeeze",k),n.removeEventListener("squeezestart",k),n.removeEventListener("squeezeend",k),n.removeEventListener("end",C),n.removeEventListener("inputsourceschange",D);for(let O=0;O<x.length;O++){const j=M[O];j!==null&&(M[O]=null,x[O].disconnect(j))}T=null,V=null,_.reset(),e.setRenderTarget(m),f=null,u=null,d=null,n=null,w=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(O){l=O},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(O){if(n=O,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",k),n.addEventListener("selectstart",k),n.addEventListener("selectend",k),n.addEventListener("squeeze",k),n.addEventListener("squeezestart",k),n.addEventListener("squeezeend",k),n.addEventListener("end",C),n.addEventListener("inputsourceschange",D),p.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(b),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:n.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,t,j),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new Cn(f.framebufferWidth,f.framebufferHeight,{format:ci,type:Qi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let j=null,fe=null,Se=null;p.depth&&(Se=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=p.stencil?cs:En,fe=p.stencil?yn:$i);const me={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};d=new XRWebGLBinding(n,t),u=d.createProjectionLayer(me),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),w=new Cn(u.textureWidth,u.textureHeight,{format:ci,type:Qi,depthTexture:new Tc(u.textureWidth,u.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const pe=e.properties.get(w);pe.__ignoreDepthValues=u.ignoreDepthValues}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await n.requestReferenceSpace(a),ie.setContext(n),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function D(O){for(let j=0;j<O.removed.length;j++){const fe=O.removed[j],Se=M.indexOf(fe);Se>=0&&(M[Se]=null,x[Se].disconnect(fe))}for(let j=0;j<O.added.length;j++){const fe=O.added[j];let Se=M.indexOf(fe);if(Se===-1){for(let pe=0;pe<x.length;pe++)if(pe>=M.length){M.push(fe),Se=pe;break}else if(M[pe]===null){M[pe]=fe,Se=pe;break}if(Se===-1)break}const me=x[Se];me&&me.connect(fe)}}const U=new Z,G=new Z;function H(O,j,fe){U.setFromMatrixPosition(j.matrixWorld),G.setFromMatrixPosition(fe.matrixWorld);const Se=U.distanceTo(G),me=j.projectionMatrix.elements,pe=fe.projectionMatrix.elements,Le=me[14]/(me[10]-1),Te=me[14]/(me[10]+1),B=(me[9]+1)/me[5],pt=(me[9]-1)/me[5],ye=(me[8]-1)/me[0],Ue=(pe[8]+1)/pe[0],Ce=Le*ye,Ye=Le*Ue,De=Se/(-ye+Ue),Fe=De*-ye;j.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Fe),O.translateZ(De),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert();const lt=Le+De,P=Te+De,A=Ce-Fe,K=Ye+(Se-Fe),Q=B*Te/P*lt,ae=pt*Te/P*lt;O.projectionMatrix.makePerspective(A,K,Q,ae,lt,P),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}function W(O,j){j===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(j.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(n===null)return;_.texture!==null&&(O.near=_.depthNear,O.far=_.depthFar),y.near=R.near=E.near=O.near,y.far=R.far=E.far=O.far,(T!==y.near||V!==y.far)&&(n.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,V=y.far,E.near=T,E.far=V,R.near=T,R.far=V,E.updateProjectionMatrix(),R.updateProjectionMatrix(),O.updateProjectionMatrix());const j=O.parent,fe=y.cameras;W(y,j);for(let Se=0;Se<fe.length;Se++)W(fe[Se],j);fe.length===2?H(y,E,R):y.projectionMatrix.copy(E.projectionMatrix),J(O,y,j)};function J(O,j,fe){fe===null?O.matrix.copy(j.matrixWorld):(O.matrix.copy(fe.matrixWorld),O.matrix.invert(),O.matrix.multiply(j.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(j.projectionMatrix),O.projectionMatrixInverse.copy(j.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Na*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(O){c=O,u!==null&&(u.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)},this.hasDepthSensing=function(){return _.texture!==null};let te=null;function re(O,j){if(h=j.getViewerPose(l||o),g=j,h!==null){const fe=h.views;f!==null&&(e.setRenderTargetFramebuffer(w,f.framebuffer),e.setRenderTarget(w));let Se=!1;fe.length!==y.cameras.length&&(y.cameras.length=0,Se=!0);for(let pe=0;pe<fe.length;pe++){const Le=fe[pe];let Te=null;if(f!==null)Te=f.getViewport(Le);else{const pt=d.getViewSubImage(u,Le);Te=pt.viewport,pe===0&&(e.setRenderTargetTextures(w,pt.colorTexture,u.ignoreDepthValues?void 0:pt.depthStencilTexture),e.setRenderTarget(w))}let B=I[pe];B===void 0&&(B=new ti,B.layers.enable(pe),B.viewport=new Ct,I[pe]=B),B.matrix.fromArray(Le.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(Le.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(Te.x,Te.y,Te.width,Te.height),pe===0&&(y.matrix.copy(B.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Se===!0&&y.cameras.push(B)}const me=n.enabledFeatures;if(me&&me.includes("depth-sensing")){const pe=d.getDepthInformation(fe[0]);pe&&pe.isValid&&pe.texture&&_.init(e,pe,n.renderState)}}for(let fe=0;fe<x.length;fe++){const Se=M[fe],me=x[fe];Se!==null&&me!==void 0&&me.update(Se,j,l||o)}_.render(e,y),te&&te(O,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),g=null}const ie=new bc;ie.setAnimationLoop(re),this.setAnimationLoop=function(O){te=O},this.dispose=function(){}}}const fn=new Di,Fg=new vt;function Og(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Sc(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function n(p,m,w,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,w,x):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===zt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===zt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const w=e.get(m),x=w.envMap,M=w.envMapRotation;if(x&&(p.envMap.value=x,fn.copy(M),fn.x*=-1,fn.y*=-1,fn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(fn.y*=-1,fn.z*=-1),p.envMapRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(fn)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const b=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*b,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,w,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*w,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,w){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===zt&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const w=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function kg(r,e,t,i){let n={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(w,x){const M=x.program;i.uniformBlockBinding(w,M)}function l(w,x){let M=n[w.id];M===void 0&&(g(w),M=h(w),n[w.id]=M,w.addEventListener("dispose",p));const b=x.program;i.updateUBOMapping(w,b);const S=e.render.frame;s[w.id]!==S&&(u(w),s[w.id]=S)}function h(w){const x=d();w.__bindingPointIndex=x;const M=r.createBuffer(),b=w.__size,S=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,b,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const x=n[w.id],M=w.uniforms,b=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let S=0,E=M.length;S<E;S++){const R=Array.isArray(M[S])?M[S]:[M[S]];for(let I=0,y=R.length;I<y;I++){const T=R[I];if(f(T,S,I,b)===!0){const V=T.__offset,k=Array.isArray(T.value)?T.value:[T.value];let C=0;for(let D=0;D<k.length;D++){const U=k[D],G=_(U);typeof U=="number"||typeof U=="boolean"?(T.__data[0]=U,r.bufferSubData(r.UNIFORM_BUFFER,V+C,T.__data)):U.isMatrix3?(T.__data[0]=U.elements[0],T.__data[1]=U.elements[1],T.__data[2]=U.elements[2],T.__data[3]=0,T.__data[4]=U.elements[3],T.__data[5]=U.elements[4],T.__data[6]=U.elements[5],T.__data[7]=0,T.__data[8]=U.elements[6],T.__data[9]=U.elements[7],T.__data[10]=U.elements[8],T.__data[11]=0):(U.toArray(T.__data,C),C+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,T.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(w,x,M,b){const S=w.value,E=x+"_"+M;if(b[E]===void 0)return typeof S=="number"||typeof S=="boolean"?b[E]=S:b[E]=S.clone(),!0;{const R=b[E];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return b[E]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function g(w){const x=w.uniforms;let M=0;const b=16;for(let E=0,R=x.length;E<R;E++){const I=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,T=I.length;y<T;y++){const V=I[y],k=Array.isArray(V.value)?V.value:[V.value];for(let C=0,D=k.length;C<D;C++){const U=k[C],G=_(U),H=M%b;H!==0&&b-H<G.boundary&&(M+=b-H),V.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=G.storage}}}const S=M%b;return S>0&&(M+=b-S),w.__size=M,w.__cache={},this}function _(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function p(w){const x=w.target;x.removeEventListener("dispose",p);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),r.deleteBuffer(n[x.id]),delete n[x.id],delete s[x.id]}function m(){for(const w in n)r.deleteBuffer(n[w]);o=[],n={},s={}}return{bind:c,update:l,dispose:m}}class Ic{constructor(e={}){const{canvas:t=bd(),context:i=null,depth:n=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fi,this._useLegacyLights=!1,this.toneMapping=Ji,this.toneMappingExposure=1;const x=this;let M=!1,b=0,S=0,E=null,R=-1,I=null;const y=new Ct,T=new Ct;let V=null;const k=new nt(0);let C=0,D=t.width,U=t.height,G=1,H=null,W=null;const J=new Ct(0,0,D,U),te=new Ct(0,0,D,U);let re=!1;const ie=new Ec;let O=!1,j=!1,fe=null;const Se=new vt,me=new et,pe=new Z,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Te(){return E===null?G:1}let B=i;function pt(L,z){for(let q=0;q<L.length;q++){const $=L[q],X=t.getContext($,z);if(X!==null)return X}return null}try{const L={alpha:!0,depth:n,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$a}`),t.addEventListener("webglcontextlost",ct,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",_e,!1),B===null){const z=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&z.shift(),B=pt(z,L),B===null)throw pt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let ye,Ue,Ce,Ye,De,Fe,lt,P,A,K,Q,ae,ne,ze,Pe,ue,xe,Ge,le,mt,qe,Ae,we,Ee;function Ke(){ye=new Wp(B),Ue=new Op(B,ye,e),ye.init(Ue),Ae=new Rg(B,ye,Ue),Ce=new Ag(B,ye,Ue),Ye=new qp(B),De=new fg,Fe=new Cg(B,ye,Ce,De,Ue,Ae,Ye),lt=new Bp(x),P=new Vp(x),A=new Kd(B,Ue),we=new Np(B,ye,A,Ue),K=new Xp(B,A,Ye,we),Q=new Kp(B,K,A,Ye),le=new jp(B,Ue,Fe),ue=new kp(De),ae=new ug(x,lt,P,ye,Ue,we,ue),ne=new Og(x,De),ze=new mg,Pe=new Sg(ye,Ue),Ge=new Up(x,lt,P,Ce,Q,u,c),xe=new Tg(x,Q,Ue),Ee=new kg(B,Ye,Ue,Ce),mt=new Fp(B,ye,Ye,Ue),qe=new Yp(B,ye,Ye,Ue),Ye.programs=ae.programs,x.capabilities=Ue,x.extensions=ye,x.properties=De,x.renderLists=ze,x.shadowMap=xe,x.state=Ce,x.info=Ye}Ke();const Oe=new Ng(x,B);this.xr=Oe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const L=ye.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=ye.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(L){L!==void 0&&(G=L,this.setSize(D,U,!1))},this.getSize=function(L){return L.set(D,U)},this.setSize=function(L,z,q=!0){if(Oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=L,U=z,t.width=Math.floor(L*G),t.height=Math.floor(z*G),q===!0&&(t.style.width=L+"px",t.style.height=z+"px"),this.setViewport(0,0,L,z)},this.getDrawingBufferSize=function(L){return L.set(D*G,U*G).floor()},this.setDrawingBufferSize=function(L,z,q){D=L,U=z,G=q,t.width=Math.floor(L*q),t.height=Math.floor(z*q),this.setViewport(0,0,L,z)},this.getCurrentViewport=function(L){return L.copy(y)},this.getViewport=function(L){return L.copy(J)},this.setViewport=function(L,z,q,$){L.isVector4?J.set(L.x,L.y,L.z,L.w):J.set(L,z,q,$),Ce.viewport(y.copy(J).multiplyScalar(G).round())},this.getScissor=function(L){return L.copy(te)},this.setScissor=function(L,z,q,$){L.isVector4?te.set(L.x,L.y,L.z,L.w):te.set(L,z,q,$),Ce.scissor(T.copy(te).multiplyScalar(G).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(L){Ce.setScissorTest(re=L)},this.setOpaqueSort=function(L){H=L},this.setTransparentSort=function(L){W=L},this.getClearColor=function(L){return L.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(L=!0,z=!0,q=!0){let $=0;if(L){let X=!1;if(E!==null){const Me=E.texture.format;X=Me===lc||Me===oc||Me===ac}if(X){const Me=E.texture.type,be=Me===Qi||Me===$i||Me===ja||Me===yn||Me===sc||Me===rc,Re=Ge.getClearColor(),Ie=Ge.getClearAlpha(),Xe=Re.r,Ne=Re.g,ke=Re.b;be?(f[0]=Xe,f[1]=Ne,f[2]=ke,f[3]=Ie,B.clearBufferuiv(B.COLOR,0,f)):(g[0]=Xe,g[1]=Ne,g[2]=ke,g[3]=Ie,B.clearBufferiv(B.COLOR,0,g))}else $|=B.COLOR_BUFFER_BIT}z&&($|=B.DEPTH_BUFFER_BIT),q&&($|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ct,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ze.dispose(),Pe.dispose(),De.dispose(),lt.dispose(),P.dispose(),Q.dispose(),we.dispose(),Ee.dispose(),ae.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",qt),Oe.removeEventListener("sessionend",rt),fe&&(fe.dispose(),fe=null),Dt.stop()};function ct(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const L=Ye.autoReset,z=xe.enabled,q=xe.autoUpdate,$=xe.needsUpdate,X=xe.type;Ke(),Ye.autoReset=L,xe.enabled=z,xe.autoUpdate=q,xe.needsUpdate=$,xe.type=X}function _e(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Y(L){const z=L.target;z.removeEventListener("dispose",Y),he(z)}function he(L){ve(L),De.remove(L)}function ve(L){const z=De.get(L).programs;z!==void 0&&(z.forEach(function(q){ae.releaseProgram(q)}),L.isShaderMaterial&&ae.releaseShaderCache(L))}this.renderBufferDirect=function(L,z,q,$,X,Me){z===null&&(z=Le);const be=X.isMesh&&X.matrixWorld.determinant()<0,Re=qc(L,z,q,$,X);Ce.setMaterial($,be);let Ie=q.index,Xe=1;if($.wireframe===!0){if(Ie=K.getWireframeAttribute(q),Ie===void 0)return;Xe=2}const Ne=q.drawRange,ke=q.attributes.position;let ft=Ne.start*Xe,Ht=(Ne.start+Ne.count)*Xe;Me!==null&&(ft=Math.max(ft,Me.start*Xe),Ht=Math.min(Ht,(Me.start+Me.count)*Xe)),Ie!==null?(ft=Math.max(ft,0),Ht=Math.min(Ht,Ie.count)):ke!=null&&(ft=Math.max(ft,0),Ht=Math.min(Ht,ke.count));const wt=Ht-ft;if(wt<0||wt===1/0)return;we.setup(X,$,Re,q,Ie);let Si,dt=mt;if(Ie!==null&&(Si=A.get(Ie),dt=qe,dt.setIndex(Si)),X.isMesh)$.wireframe===!0?(Ce.setLineWidth($.wireframeLinewidth*Te()),dt.setMode(B.LINES)):dt.setMode(B.TRIANGLES);else if(X.isLine){let He=$.linewidth;He===void 0&&(He=1),Ce.setLineWidth(He*Te()),X.isLineSegments?dt.setMode(B.LINES):X.isLineLoop?dt.setMode(B.LINE_LOOP):dt.setMode(B.LINE_STRIP)}else X.isPoints?dt.setMode(B.POINTS):X.isSprite&&dt.setMode(B.TRIANGLES);if(X.isBatchedMesh)dt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)dt.renderInstances(ft,wt,X.count);else if(q.isInstancedBufferGeometry){const He=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Nr=Math.min(q.instanceCount,He);dt.renderInstances(ft,wt,Nr)}else dt.render(ft,wt)};function Ze(L,z,q){L.transparent===!0&&L.side===gi&&L.forceSinglePass===!1?(L.side=zt,L.needsUpdate=!0,Us(L,z,q),L.side=nn,L.needsUpdate=!0,Us(L,z,q),L.side=gi):Us(L,z,q)}this.compile=function(L,z,q=null){q===null&&(q=L),p=Pe.get(q),p.init(),w.push(p),q.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),L!==q&&L.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights(x._useLegacyLights);const $=new Set;return L.traverse(function(X){const Me=X.material;if(Me)if(Array.isArray(Me))for(let be=0;be<Me.length;be++){const Re=Me[be];Ze(Re,q,X),$.add(Re)}else Ze(Me,q,X),$.add(Me)}),w.pop(),p=null,$},this.compileAsync=function(L,z,q=null){const $=this.compile(L,z,q);return new Promise(X=>{function Me(){if($.forEach(function(be){De.get(be).currentProgram.isReady()&&$.delete(be)}),$.size===0){X(L);return}setTimeout(Me,10)}ye.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let st=null;function Tt(L){st&&st(L)}function qt(){Dt.stop()}function rt(){Dt.start()}const Dt=new bc;Dt.setAnimationLoop(Tt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(L){st=L,Oe.setAnimationLoop(L),L===null?Dt.stop():Dt.start()},Oe.addEventListener("sessionstart",qt),Oe.addEventListener("sessionend",rt),this.render=function(L,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(z),z=Oe.getCamera()),L.isScene===!0&&L.onBeforeRender(x,L,z,E),p=Pe.get(L,w.length),p.init(),w.push(p),Se.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ie.setFromProjectionMatrix(Se),j=this.localClippingEnabled,O=ue.init(this.clippingPlanes,j),_=ze.get(L,m.length),_.init(),m.push(_),ui(L,z,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(H,W),this.info.render.frame++,O===!0&&ue.beginShadows();const q=p.state.shadowsArray;if(xe.render(q,L,z),O===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1)&&Ge.render(_,L),p.setupLights(x._useLegacyLights),z.isArrayCamera){const $=z.cameras;for(let X=0,Me=$.length;X<Me;X++){const be=$[X];no(_,L,be,be.viewport)}}else no(_,L,z);E!==null&&(Fe.updateMultisampleRenderTarget(E),Fe.updateRenderTargetMipmap(E)),L.isScene===!0&&L.onAfterRender(x,L,z),we.resetDefaultState(),R=-1,I=null,w.pop(),w.length>0?p=w[w.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function ui(L,z,q,$){if(L.visible===!1)return;if(L.layers.test(z.layers)){if(L.isGroup)q=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(z);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||ie.intersectsSprite(L)){$&&pe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Se);const be=Q.update(L),Re=L.material;Re.visible&&_.push(L,be,Re,q,pe.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||ie.intersectsObject(L))){const be=Q.update(L),Re=L.material;if($&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),pe.copy(L.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),pe.copy(be.boundingSphere.center)),pe.applyMatrix4(L.matrixWorld).applyMatrix4(Se)),Array.isArray(Re)){const Ie=be.groups;for(let Xe=0,Ne=Ie.length;Xe<Ne;Xe++){const ke=Ie[Xe],ft=Re[ke.materialIndex];ft&&ft.visible&&_.push(L,be,ft,q,pe.z,ke)}}else Re.visible&&_.push(L,be,Re,q,pe.z,null)}}const Me=L.children;for(let be=0,Re=Me.length;be<Re;be++)ui(Me[be],z,q,$)}function no(L,z,q,$){const X=L.opaque,Me=L.transmissive,be=L.transparent;p.setupLightsView(q),O===!0&&ue.setGlobalState(x.clippingPlanes,q),Me.length>0&&Yc(X,Me,z,q),$&&Ce.viewport(y.copy($)),X.length>0&&Ds(X,z,q),Me.length>0&&Ds(Me,z,q),be.length>0&&Ds(be,z,q),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function Yc(L,z,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const Me=Ue.isWebGL2;fe===null&&(fe=new Cn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?Ts:Qi,minFilter:Sn,samples:Me?4:0})),x.getDrawingBufferSize(me),Me?fe.setSize(me.x,me.y):fe.setSize(Fa(me.x),Fa(me.y));const be=x.getRenderTarget();x.setRenderTarget(fe),x.getClearColor(k),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Re=x.toneMapping;x.toneMapping=Ji,Ds(L,q,$),Fe.updateMultisampleRenderTarget(fe),Fe.updateRenderTargetMipmap(fe);let Ie=!1;for(let Xe=0,Ne=z.length;Xe<Ne;Xe++){const ke=z[Xe],ft=ke.object,Ht=ke.geometry,wt=ke.material,Si=ke.group;if(wt.side===gi&&ft.layers.test($.layers)){const dt=wt.side;wt.side=zt,wt.needsUpdate=!0,so(ft,q,$,Ht,wt,Si),wt.side=dt,wt.needsUpdate=!0,Ie=!0}}Ie===!0&&(Fe.updateMultisampleRenderTarget(fe),Fe.updateRenderTargetMipmap(fe)),x.setRenderTarget(be),x.setClearColor(k,C),x.toneMapping=Re}function Ds(L,z,q){const $=z.isScene===!0?z.overrideMaterial:null;for(let X=0,Me=L.length;X<Me;X++){const be=L[X],Re=be.object,Ie=be.geometry,Xe=$===null?be.material:$,Ne=be.group;Re.layers.test(q.layers)&&so(Re,z,q,Ie,Xe,Ne)}}function so(L,z,q,$,X,Me){L.onBeforeRender(x,z,q,$,X,Me),L.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),X.onBeforeRender(x,z,q,$,L,Me),X.transparent===!0&&X.side===gi&&X.forceSinglePass===!1?(X.side=zt,X.needsUpdate=!0,x.renderBufferDirect(q,z,$,X,L,Me),X.side=nn,X.needsUpdate=!0,x.renderBufferDirect(q,z,$,X,L,Me),X.side=gi):x.renderBufferDirect(q,z,$,X,L,Me),L.onAfterRender(x,z,q,$,X,Me)}function Us(L,z,q){z.isScene!==!0&&(z=Le);const $=De.get(L),X=p.state.lights,Me=p.state.shadowsArray,be=X.state.version,Re=ae.getParameters(L,X.state,Me,z,q),Ie=ae.getProgramCacheKey(Re);let Xe=$.programs;$.environment=L.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(L.isMeshStandardMaterial?P:lt).get(L.envMap||$.environment),$.envMapRotation=$.environment!==null&&L.envMap===null?z.environmentRotation:L.envMapRotation,Xe===void 0&&(L.addEventListener("dispose",Y),Xe=new Map,$.programs=Xe);let Ne=Xe.get(Ie);if(Ne!==void 0){if($.currentProgram===Ne&&$.lightsStateVersion===be)return ao(L,Re),Ne}else Re.uniforms=ae.getUniforms(L),L.onBuild(q,Re,x),L.onBeforeCompile(Re,x),Ne=ae.acquireProgram(Re,Ie),Xe.set(Ie,Ne),$.uniforms=Re.uniforms;const ke=$.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(ke.clippingPlanes=ue.uniform),ao(L,Re),$.needsLights=$c(L),$.lightsStateVersion=be,$.needsLights&&(ke.ambientLightColor.value=X.state.ambient,ke.lightProbe.value=X.state.probe,ke.directionalLights.value=X.state.directional,ke.directionalLightShadows.value=X.state.directionalShadow,ke.spotLights.value=X.state.spot,ke.spotLightShadows.value=X.state.spotShadow,ke.rectAreaLights.value=X.state.rectArea,ke.ltc_1.value=X.state.rectAreaLTC1,ke.ltc_2.value=X.state.rectAreaLTC2,ke.pointLights.value=X.state.point,ke.pointLightShadows.value=X.state.pointShadow,ke.hemisphereLights.value=X.state.hemi,ke.directionalShadowMap.value=X.state.directionalShadowMap,ke.directionalShadowMatrix.value=X.state.directionalShadowMatrix,ke.spotShadowMap.value=X.state.spotShadowMap,ke.spotLightMatrix.value=X.state.spotLightMatrix,ke.spotLightMap.value=X.state.spotLightMap,ke.pointShadowMap.value=X.state.pointShadowMap,ke.pointShadowMatrix.value=X.state.pointShadowMatrix),$.currentProgram=Ne,$.uniformsList=null,Ne}function ro(L){if(L.uniformsList===null){const z=L.currentProgram.getUniforms();L.uniformsList=hr.seqWithValue(z.seq,L.uniforms)}return L.uniformsList}function ao(L,z){const q=De.get(L);q.outputColorSpace=z.outputColorSpace,q.batching=z.batching,q.instancing=z.instancing,q.instancingColor=z.instancingColor,q.instancingMorph=z.instancingMorph,q.skinning=z.skinning,q.morphTargets=z.morphTargets,q.morphNormals=z.morphNormals,q.morphColors=z.morphColors,q.morphTargetsCount=z.morphTargetsCount,q.numClippingPlanes=z.numClippingPlanes,q.numIntersection=z.numClipIntersection,q.vertexAlphas=z.vertexAlphas,q.vertexTangents=z.vertexTangents,q.toneMapping=z.toneMapping}function qc(L,z,q,$,X){z.isScene!==!0&&(z=Le),Fe.resetTextureUnits();const Me=z.fog,be=$.isMeshStandardMaterial?z.environment:null,Re=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:sn,Ie=($.isMeshStandardMaterial?P:lt).get($.envMap||be),Xe=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ne=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),ke=!!q.morphAttributes.position,ft=!!q.morphAttributes.normal,Ht=!!q.morphAttributes.color;let wt=Ji;$.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(wt=x.toneMapping);const Si=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,dt=Si!==void 0?Si.length:0,He=De.get($),Nr=p.state.lights;if(O===!0&&(j===!0||L!==I)){const Zt=L===I&&$.id===R;ue.setState($,L,Zt)}let ht=!1;$.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Nr.state.version||He.outputColorSpace!==Re||X.isBatchedMesh&&He.batching===!1||!X.isBatchedMesh&&He.batching===!0||X.isInstancedMesh&&He.instancing===!1||!X.isInstancedMesh&&He.instancing===!0||X.isSkinnedMesh&&He.skinning===!1||!X.isSkinnedMesh&&He.skinning===!0||X.isInstancedMesh&&He.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&He.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&He.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&He.instancingMorph===!1&&X.morphTexture!==null||He.envMap!==Ie||$.fog===!0&&He.fog!==Me||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ue.numPlanes||He.numIntersection!==ue.numIntersection)||He.vertexAlphas!==Xe||He.vertexTangents!==Ne||He.morphTargets!==ke||He.morphNormals!==ft||He.morphColors!==Ht||He.toneMapping!==wt||Ue.isWebGL2===!0&&He.morphTargetsCount!==dt)&&(ht=!0):(ht=!0,He.__version=$.version);let an=He.currentProgram;ht===!0&&(an=Us($,z,X));let oo=!1,ps=!1,Fr=!1;const Rt=an.getUniforms(),on=He.uniforms;if(Ce.useProgram(an.program)&&(oo=!0,ps=!0,Fr=!0),$.id!==R&&(R=$.id,ps=!0),oo||I!==L){Rt.setValue(B,"projectionMatrix",L.projectionMatrix),Rt.setValue(B,"viewMatrix",L.matrixWorldInverse);const Zt=Rt.map.cameraPosition;Zt!==void 0&&Zt.setValue(B,pe.setFromMatrixPosition(L.matrixWorld)),Ue.logarithmicDepthBuffer&&Rt.setValue(B,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Rt.setValue(B,"isOrthographic",L.isOrthographicCamera===!0),I!==L&&(I=L,ps=!0,Fr=!0)}if(X.isSkinnedMesh){Rt.setOptional(B,X,"bindMatrix"),Rt.setOptional(B,X,"bindMatrixInverse");const Zt=X.skeleton;Zt&&(Ue.floatVertexTextures?(Zt.boneTexture===null&&Zt.computeBoneTexture(),Rt.setValue(B,"boneTexture",Zt.boneTexture,Fe)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}X.isBatchedMesh&&(Rt.setOptional(B,X,"batchingTexture"),Rt.setValue(B,"batchingTexture",X._matricesTexture,Fe));const Or=q.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0&&Ue.isWebGL2===!0)&&le.update(X,q,an),(ps||He.receiveShadow!==X.receiveShadow)&&(He.receiveShadow=X.receiveShadow,Rt.setValue(B,"receiveShadow",X.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(on.envMap.value=Ie,on.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),ps&&(Rt.setValue(B,"toneMappingExposure",x.toneMappingExposure),He.needsLights&&Zc(on,Fr),Me&&$.fog===!0&&ne.refreshFogUniforms(on,Me),ne.refreshMaterialUniforms(on,$,G,U,fe),hr.upload(B,ro(He),on,Fe)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(hr.upload(B,ro(He),on,Fe),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Rt.setValue(B,"center",X.center),Rt.setValue(B,"modelViewMatrix",X.modelViewMatrix),Rt.setValue(B,"normalMatrix",X.normalMatrix),Rt.setValue(B,"modelMatrix",X.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Zt=$.uniformsGroups;for(let kr=0,jc=Zt.length;kr<jc;kr++)if(Ue.isWebGL2){const lo=Zt[kr];Ee.update(lo,an),Ee.bind(lo,an)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return an}function Zc(L,z){L.ambientLightColor.needsUpdate=z,L.lightProbe.needsUpdate=z,L.directionalLights.needsUpdate=z,L.directionalLightShadows.needsUpdate=z,L.pointLights.needsUpdate=z,L.pointLightShadows.needsUpdate=z,L.spotLights.needsUpdate=z,L.spotLightShadows.needsUpdate=z,L.rectAreaLights.needsUpdate=z,L.hemisphereLights.needsUpdate=z}function $c(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(L,z,q){De.get(L.texture).__webglTexture=z,De.get(L.depthTexture).__webglTexture=q;const $=De.get(L);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=q===void 0,$.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,z){const q=De.get(L);q.__webglFramebuffer=z,q.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(L,z=0,q=0){E=L,b=z,S=q;let $=!0,X=null,Me=!1,be=!1;if(L){const Ie=De.get(L);Ie.__useDefaultFramebuffer!==void 0?(Ce.bindFramebuffer(B.FRAMEBUFFER,null),$=!1):Ie.__webglFramebuffer===void 0?Fe.setupRenderTarget(L):Ie.__hasExternalTextures&&Fe.rebindTextures(L,De.get(L.texture).__webglTexture,De.get(L.depthTexture).__webglTexture);const Xe=L.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(be=!0);const Ne=De.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ne[z])?X=Ne[z][q]:X=Ne[z],Me=!0):Ue.isWebGL2&&L.samples>0&&Fe.useMultisampledRTT(L)===!1?X=De.get(L).__webglMultisampledFramebuffer:Array.isArray(Ne)?X=Ne[q]:X=Ne,y.copy(L.viewport),T.copy(L.scissor),V=L.scissorTest}else y.copy(J).multiplyScalar(G).floor(),T.copy(te).multiplyScalar(G).floor(),V=re;if(Ce.bindFramebuffer(B.FRAMEBUFFER,X)&&Ue.drawBuffers&&$&&Ce.drawBuffers(L,X),Ce.viewport(y),Ce.scissor(T),Ce.setScissorTest(V),Me){const Ie=De.get(L.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ie.__webglTexture,q)}else if(be){const Ie=De.get(L.texture),Xe=z||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ie.__webglTexture,q||0,Xe)}R=-1},this.readRenderTargetPixels=function(L,z,q,$,X,Me,be){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=De.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&be!==void 0&&(Re=Re[be]),Re){Ce.bindFramebuffer(B.FRAMEBUFFER,Re);try{const Ie=L.texture,Xe=Ie.format,Ne=Ie.type;if(Xe!==ci&&Ae.convert(Xe)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ke=Ne===Ts&&(ye.has("EXT_color_buffer_half_float")||Ue.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Ne!==Qi&&Ae.convert(Ne)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===Ci&&(Ue.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=L.width-$&&q>=0&&q<=L.height-X&&B.readPixels(z,q,$,X,Ae.convert(Xe),Ae.convert(Ne),Me)}finally{const Ie=E!==null?De.get(E).__webglFramebuffer:null;Ce.bindFramebuffer(B.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(L,z,q=0){const $=Math.pow(2,-q),X=Math.floor(z.image.width*$),Me=Math.floor(z.image.height*$);Fe.setTexture2D(z,0),B.copyTexSubImage2D(B.TEXTURE_2D,q,0,0,L.x,L.y,X,Me),Ce.unbindTexture()},this.copyTextureToTexture=function(L,z,q,$=0){const X=z.image.width,Me=z.image.height,be=Ae.convert(q.format),Re=Ae.convert(q.type);Fe.setTexture2D(q,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,q.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,q.unpackAlignment),z.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,$,L.x,L.y,X,Me,be,Re,z.image.data):z.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,$,L.x,L.y,z.mipmaps[0].width,z.mipmaps[0].height,be,z.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,$,L.x,L.y,be,Re,z.image),$===0&&q.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),Ce.unbindTexture()},this.copyTextureToTexture3D=function(L,z,q,$,X=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=Math.round(L.max.x-L.min.x),be=Math.round(L.max.y-L.min.y),Re=L.max.z-L.min.z+1,Ie=Ae.convert($.format),Xe=Ae.convert($.type);let Ne;if($.isData3DTexture)Fe.setTexture3D($,0),Ne=B.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)Fe.setTexture2DArray($,0),Ne=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,$.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,$.unpackAlignment);const ke=B.getParameter(B.UNPACK_ROW_LENGTH),ft=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ht=B.getParameter(B.UNPACK_SKIP_PIXELS),wt=B.getParameter(B.UNPACK_SKIP_ROWS),Si=B.getParameter(B.UNPACK_SKIP_IMAGES),dt=q.isCompressedTexture?q.mipmaps[X]:q.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,dt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,dt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,L.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,L.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,L.min.z),q.isDataTexture||q.isData3DTexture?B.texSubImage3D(Ne,X,z.x,z.y,z.z,Me,be,Re,Ie,Xe,dt.data):$.isCompressedArrayTexture?B.compressedTexSubImage3D(Ne,X,z.x,z.y,z.z,Me,be,Re,Ie,dt.data):B.texSubImage3D(Ne,X,z.x,z.y,z.z,Me,be,Re,Ie,Xe,dt),B.pixelStorei(B.UNPACK_ROW_LENGTH,ke),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ft),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ht),B.pixelStorei(B.UNPACK_SKIP_ROWS,wt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Si),X===0&&$.generateMipmaps&&B.generateMipmap(Ne),Ce.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?Fe.setTextureCube(L,0):L.isData3DTexture?Fe.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?Fe.setTexture2DArray(L,0):Fe.setTexture2D(L,0),Ce.unbindTexture()},this.resetState=function(){b=0,S=0,E=null,Ce.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ka?"display-p3":"srgb",t.unpackColorSpace=it.workingColorSpace===Pr?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Bg extends Ic{}Bg.prototype.isWebGL1Renderer=!0;class zg extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Da,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return fc("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,s=this.stride;n<s;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new Z;class jn{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=_i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=_i(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=_i(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=_i(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=_i(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),n=tt(n,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return new ni(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new jn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Hg extends si{constructor(e,t,i,n,s,o,a,c,l){super(e,t,i,n,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$a}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$a);if(typeof window<"u"&&window.THREE){let r=window.require;window.require=e=>{if(r)return r(e);if(e==="three")return window.THREE}}class Dc{constructor(){v(this,"entries",{});v(this,"size",0)}add(e){let t=this.entries[e];return this.entries[e]=!0,t?!1:(this.size++,!0)}addAll(e){let t=this.size;for(var i=0,n=e.length;i<n;i++)this.add(e[i]);return t!=this.size}contains(e){return this.entries[e]}clear(){this.entries={},this.size=0}}const Xt=class Xt{constructor(e=0,t=0,i=0,n=0){v(this,"r");v(this,"g");v(this,"b");v(this,"a");this.r=e,this.g=t,this.b=i,this.a=n}set(e,t,i,n){return this.r=e,this.g=t,this.b=i,this.a=n,this.clamp()}setFromColor(e){return this.r=e.r,this.g=e.g,this.b=e.b,this.a=e.a,this}setFromString(e){return e=e.charAt(0)=="#"?e.substr(1):e,this.r=parseInt(e.substr(0,2),16)/255,this.g=parseInt(e.substr(2,2),16)/255,this.b=parseInt(e.substr(4,2),16)/255,this.a=e.length!=8?1:parseInt(e.substr(6,2),16)/255,this}add(e,t,i,n){return this.r+=e,this.g+=t,this.b+=i,this.a+=n,this.clamp()}clamp(){return this.r<0?this.r=0:this.r>1&&(this.r=1),this.g<0?this.g=0:this.g>1&&(this.g=1),this.b<0?this.b=0:this.b>1&&(this.b=1),this.a<0?this.a=0:this.a>1&&(this.a=1),this}static rgba8888ToColor(e,t){e.r=((t&4278190080)>>>24)/255,e.g=((t&16711680)>>>16)/255,e.b=((t&65280)>>>8)/255,e.a=(t&255)/255}static rgb888ToColor(e,t){e.r=((t&16711680)>>>16)/255,e.g=((t&65280)>>>8)/255,e.b=(t&255)/255}toRgb888(){const e=t=>("0"+(t*255).toString(16)).slice(-2);return+("0x"+e(this.r)+e(this.g)+e(this.b))}static fromString(e){return new Xt().setFromString(e)}};v(Xt,"WHITE",new Xt(1,1,1,1)),v(Xt,"RED",new Xt(1,0,0,1)),v(Xt,"GREEN",new Xt(0,1,0,1)),v(Xt,"BLUE",new Xt(0,0,1,1)),v(Xt,"MAGENTA",new Xt(1,0,1,1));let Je=Xt;const _t=class _t{static clamp(e,t,i){return e<t?t:e>i?i:e}static cosDeg(e){return Math.cos(e*_t.degRad)}static sinDeg(e){return Math.sin(e*_t.degRad)}static atan2Deg(e,t){return Math.atan2(e,t)*_t.degRad}static signum(e){return e>0?1:e<0?-1:0}static toInt(e){return e>0?Math.floor(e):Math.ceil(e)}static cbrt(e){let t=Math.pow(Math.abs(e),.3333333333333333);return e<0?-t:t}static randomTriangular(e,t){return _t.randomTriangularWith(e,t,(e+t)*.5)}static randomTriangularWith(e,t,i){let n=Math.random(),s=t-e;return n<=(i-e)/s?e+Math.sqrt(n*s*(i-e)):t-Math.sqrt((1-n)*s*(t-i))}static isPowerOfTwo(e){return e&&(e&e-1)===0}};v(_t,"PI",3.1415927),v(_t,"PI2",_t.PI*2),v(_t,"invPI2",1/_t.PI2),v(_t,"radiansToDegrees",180/_t.PI),v(_t,"radDeg",_t.radiansToDegrees),v(_t,"degreesToRadians",_t.PI/180),v(_t,"degRad",_t.degreesToRadians);let ce=_t;const Vi=class Vi{static arrayCopy(e,t,i,n,s){for(let o=t,a=n;o<t+s;o++,a++)i[a]=e[o]}static arrayFill(e,t,i,n){for(let s=t;s<i;s++)e[s]=n}static setArraySize(e,t,i=0){let n=e.length;if(n==t)return e;if(e.length=t,n<t)for(let s=n;s<t;s++)e[s]=i;return e}static ensureArrayCapacity(e,t,i=0){return e.length>=t?e:Vi.setArraySize(e,t,i)}static newArray(e,t){let i=new Array(e);for(let n=0;n<e;n++)i[n]=t;return i}static newFloatArray(e){if(Vi.SUPPORTS_TYPED_ARRAYS)return new Float32Array(e);{let t=new Array(e);for(let i=0;i<t.length;i++)t[i]=0;return t}}static newShortArray(e){if(Vi.SUPPORTS_TYPED_ARRAYS)return new Int16Array(e);{let t=new Array(e);for(let i=0;i<t.length;i++)t[i]=0;return t}}static toFloatArray(e){return Vi.SUPPORTS_TYPED_ARRAYS?new Float32Array(e):e}static toSinglePrecision(e){return Vi.SUPPORTS_TYPED_ARRAYS?Math.fround(e):e}static webkit602BugfixHelper(e,t){}static contains(e,t,i=!0){for(var n=0;n<e.length;n++)if(e[n]==t)return!0;return!1}static enumValue(e,t){return e[t[0].toUpperCase()+t.slice(1)]}};v(Vi,"SUPPORTS_TYPED_ARRAYS",typeof Float32Array<"u");let ge=Vi;class ka{constructor(e){v(this,"items",new Array);v(this,"instantiator");this.instantiator=e}obtain(){return this.items.length>0?this.items.pop():this.instantiator()}free(e){e.reset&&e.reset(),this.items.push(e)}freeAll(e){for(let t=0;t<e.length;t++)this.free(e[t])}clear(){this.items.length=0}}class As{constructor(e=0,t=0){v(this,"x");v(this,"y");this.x=e,this.y=t}set(e,t){return this.x=e,this.y=t,this}length(){let e=this.x,t=this.y;return Math.sqrt(e*e+t*t)}normalize(){let e=this.length();return e!=0&&(this.x/=e,this.y/=e),this}}class Uc{constructor(e){v(this,"name");if(!e)throw new Error("name cannot be null.");this.name=e}}const br=class br extends Uc{constructor(t){super(t);v(this,"id",br.nextID++);v(this,"bones",null);v(this,"vertices",[]);v(this,"worldVerticesLength",0);v(this,"timelineAttachment",this)}computeWorldVertices(t,i,n,s,o,a){n=o+(n>>1)*a;let c=t.bone.skeleton,l=t.deform,h=this.vertices,d=this.bones;if(!d){l.length>0&&(h=l);let _=t.bone,p=_.worldX,m=_.worldY,w=_.a,x=_.b,M=_.c,b=_.d;for(let S=i,E=o;E<n;S+=2,E+=a){let R=h[S],I=h[S+1];s[E]=R*w+I*x+p,s[E+1]=R*M+I*b+m}return}let u=0,f=0;for(let _=0;_<i;_+=2){let p=d[u];u+=p+1,f+=p}let g=c.bones;if(l.length==0)for(let _=o,p=f*3;_<n;_+=a){let m=0,w=0,x=d[u++];for(x+=u;u<x;u++,p+=3){let M=g[d[u]],b=h[p],S=h[p+1],E=h[p+2];m+=(b*M.a+S*M.b+M.worldX)*E,w+=(b*M.c+S*M.d+M.worldY)*E}s[_]=m,s[_+1]=w}else{let _=l;for(let p=o,m=f*3,w=f<<1;p<n;p+=a){let x=0,M=0,b=d[u++];for(b+=u;u<b;u++,m+=3,w+=2){let S=g[d[u]],E=h[m]+_[w],R=h[m+1]+_[w+1],I=h[m+2];x+=(E*S.a+R*S.b+S.worldX)*I,M+=(E*S.c+R*S.d+S.worldY)*I}s[p]=x,s[p+1]=M}}}copyTo(t){this.bones?(t.bones=new Array(this.bones.length),ge.arrayCopy(this.bones,0,t.bones,0,this.bones.length)):t.bones=null,this.vertices&&(t.vertices=ge.newFloatArray(this.vertices.length),ge.arrayCopy(this.vertices,0,t.vertices,0,this.vertices.length)),t.worldVerticesLength=this.worldVerticesLength,t.timelineAttachment=this.timelineAttachment}};v(br,"nextID",0);let hi=br;const Jn=class Jn{constructor(e){v(this,"id",Jn.nextID());v(this,"regions");v(this,"start",0);v(this,"digits",0);v(this,"setupIndex",0);this.regions=new Array(e)}copy(){let e=new Jn(this.regions.length);return ge.arrayCopy(this.regions,0,e.regions,0,this.regions.length),e.start=this.start,e.digits=this.digits,e.setupIndex=this.setupIndex,e}apply(e,t){let i=e.sequenceIndex;i==-1&&(i=this.setupIndex),i>=this.regions.length&&(i=this.regions.length-1);let n=this.regions[i];t.region!=n&&(t.region=n,t.updateRegion())}getPath(e,t){let i=e,n=(this.start+t).toString();for(let s=this.digits-n.length;s>0;s--)i+="0";return i+=n,i}static nextID(){return Jn._nextID++}};v(Jn,"_nextID",0);let Ba=Jn;var At;(function(r){r[r.hold=0]="hold",r[r.once=1]="once",r[r.loop=2]="loop",r[r.pingpong=3]="pingpong",r[r.onceReverse=4]="onceReverse",r[r.loopReverse=5]="loopReverse",r[r.pingpongReverse=6]="pingpongReverse"})(At||(At={}));const Vg=[At.hold,At.once,At.loop,At.pingpong,At.onceReverse,At.loopReverse,At.pingpongReverse];class Nc{constructor(e,t,i){v(this,"name");v(this,"timelines",[]);v(this,"timelineIds",new Dc);v(this,"duration");if(!e)throw new Error("name cannot be null.");this.name=e,this.setTimelines(t),this.duration=i}setTimelines(e){if(!e)throw new Error("timelines cannot be null.");this.timelines=e,this.timelineIds.clear();for(var t=0;t<e.length;t++)this.timelineIds.addAll(e[t].getPropertyIds())}hasTimeline(e){for(let t=0;t<e.length;t++)if(this.timelineIds.contains(e[t]))return!0;return!1}apply(e,t,i,n,s,o,a,c){if(!e)throw new Error("skeleton cannot be null.");n&&this.duration!=0&&(i%=this.duration,t>0&&(t%=this.duration));let l=this.timelines;for(let h=0,d=l.length;h<d;h++)l[h].apply(e,t,i,s,o,a,c)}}var ee;(function(r){r[r.setup=0]="setup",r[r.first=1]="first",r[r.replace=2]="replace",r[r.add=3]="add"})(ee||(ee={}));var It;(function(r){r[r.mixIn=0]="mixIn",r[r.mixOut=1]="mixOut"})(It||(It={}));const Be={rotate:0,x:1,y:2,scaleX:3,scaleY:4,shearX:5,shearY:6,inherit:7,rgb:8,alpha:9,rgb2:10,attachment:11,deform:12,event:13,drawOrder:14,ikConstraint:15,transformConstraint:16,pathConstraintPosition:17,pathConstraintSpacing:18,pathConstraintMix:19,physicsConstraintInertia:20,physicsConstraintStrength:21,physicsConstraintDamping:22,physicsConstraintMass:23,physicsConstraintWind:24,physicsConstraintGravity:25,physicsConstraintMix:26,physicsConstraintReset:27,sequence:28};class ot{constructor(e,t){v(this,"propertyIds");v(this,"frames");this.propertyIds=t,this.frames=ge.newFloatArray(e*this.getFrameEntries())}getPropertyIds(){return this.propertyIds}getFrameEntries(){return 1}getFrameCount(){return this.frames.length/this.getFrameEntries()}getDuration(){return this.frames[this.frames.length-this.getFrameEntries()]}static search1(e,t){let i=e.length;for(let n=1;n<i;n++)if(e[n]>t)return n-1;return i-1}static search(e,t,i){let n=e.length;for(let s=i;s<n;s+=i)if(e[s]>t)return s-i;return n-i}}class Mi extends ot{constructor(t,i,n){super(t,n);v(this,"curves");this.curves=ge.newFloatArray(t+i*18),this.curves[t-1]=1}setLinear(t){this.curves[t]=0}setStepped(t){this.curves[t]=1}shrink(t){let i=this.getFrameCount()+t*18;if(this.curves.length>i){let n=ge.newFloatArray(i);ge.arrayCopy(this.curves,0,n,0,i),this.curves=n}}setBezier(t,i,n,s,o,a,c,l,h,d,u){let f=this.curves,g=this.getFrameCount()+t*18;n==0&&(f[i]=2+g);let _=(s-a*2+l)*.03,p=(o-c*2+h)*.03,m=((a-l)*3-s+d)*.006,w=((c-h)*3-o+u)*.006,x=_*2+m,M=p*2+w,b=(a-s)*.3+_+m*.16666667,S=(c-o)*.3+p+w*.16666667,E=s+b,R=o+S;for(let I=g+18;g<I;g+=2)f[g]=E,f[g+1]=R,b+=x,S+=M,x+=m,M+=w,E+=b,R+=S}getBezierValue(t,i,n,s){let o=this.curves;if(o[s]>t){let h=this.frames[i],d=this.frames[i+n];return d+(t-h)/(o[s]-h)*(o[s+1]-d)}let a=s+18;for(s+=2;s<a;s+=2)if(o[s]>=t){let h=o[s-2],d=o[s-1];return d+(t-h)/(o[s]-h)*(o[s+1]-d)}i+=this.getFrameEntries();let c=o[a-2],l=o[a-1];return l+(t-c)/(this.frames[i]-c)*(this.frames[i+n]-l)}}class di extends Mi{constructor(e,t,i){super(e,t,[i])}getFrameEntries(){return 2}setFrame(e,t,i){e<<=1,this.frames[e]=t,this.frames[e+1]=i}getCurveValue(e){let t=this.frames,i=t.length-2;for(let s=2;s<=i;s+=2)if(t[s]>e){i=s-2;break}let n=this.curves[i>>1];switch(n){case 0:let s=t[i],o=t[i+1];return o+(e-s)/(t[i+2]-s)*(t[i+2+1]-o);case 1:return t[i+1]}return this.getBezierValue(e,i,1,n-2)}getRelativeValue(e,t,i,n,s){if(e<this.frames[0]){switch(i){case ee.setup:return s;case ee.first:return n+(s-n)*t}return n}let o=this.getCurveValue(e);switch(i){case ee.setup:return s+o*t;case ee.first:case ee.replace:o+=s-n}return n+o*t}getAbsoluteValue(e,t,i,n,s){if(e<this.frames[0]){switch(i){case ee.setup:return s;case ee.first:return n+(s-n)*t}return n}let o=this.getCurveValue(e);return i==ee.setup?s+(o-s)*t:n+(o-n)*t}getAbsoluteValue2(e,t,i,n,s,o){if(e<this.frames[0]){switch(i){case ee.setup:return s;case ee.first:return n+(s-n)*t}return n}return i==ee.setup?s+(o-s)*t:n+(o-n)*t}getScaleValue(e,t,i,n,s,o){const a=this.frames;if(e<a[0]){switch(i){case ee.setup:return o;case ee.first:return s+(o-s)*t}return s}let c=this.getCurveValue(e)*o;if(t==1)return i==ee.add?s+c-o:c;if(n==It.mixOut)switch(i){case ee.setup:return o+(Math.abs(c)*ce.signum(o)-o)*t;case ee.first:case ee.replace:return s+(Math.abs(c)*ce.signum(s)-s)*t}else{let l=0;switch(i){case ee.setup:return l=Math.abs(o)*ce.signum(c),l+(c-l)*t;case ee.first:case ee.replace:return l=Math.abs(s)*ce.signum(c),l+(c-l)*t}}return s+(c-o)*t}}class eo extends Mi{constructor(e,t,i,n){super(e,t,[i,n])}getFrameEntries(){return 3}setFrame(e,t,i,n){e*=3,this.frames[e]=t,this.frames[e+1]=i,this.frames[e+2]=n}}class za extends di{constructor(t,i,n){super(t,i,Be.rotate+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.rotation=this.getRelativeValue(n,o,a,l.rotation,l.data.rotation))}}class Wg extends eo{constructor(t,i,n){super(t,i,Be.x+"|"+n,Be.y+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];if(!l.active)return;let h=this.frames;if(n<h[0]){switch(a){case ee.setup:l.x=l.data.x,l.y=l.data.y;return;case ee.first:l.x+=(l.data.x-l.x)*o,l.y+=(l.data.y-l.y)*o}return}let d=0,u=0,f=ot.search(h,n,3),g=this.curves[f/3];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(n-_)/(h[f+3]-_);d+=(h[f+3+1]-d)*p,u+=(h[f+3+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(n,f,1,g-2),u=this.getBezierValue(n,f,2,g+18-2)}switch(a){case ee.setup:l.x=l.data.x+d*o,l.y=l.data.y+u*o;break;case ee.first:case ee.replace:l.x+=(l.data.x+d-l.x)*o,l.y+=(l.data.y+u-l.y)*o;break;case ee.add:l.x+=d*o,l.y+=u*o}}}class Xg extends di{constructor(t,i,n){super(t,i,Be.x+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.x=this.getRelativeValue(n,o,a,l.x,l.data.x))}}class Yg extends di{constructor(t,i,n){super(t,i,Be.y+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.y=this.getRelativeValue(n,o,a,l.y,l.data.y))}}class qg extends eo{constructor(t,i,n){super(t,i,Be.scaleX+"|"+n,Be.scaleY+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];if(!l.active)return;let h=this.frames;if(n<h[0]){switch(a){case ee.setup:l.scaleX=l.data.scaleX,l.scaleY=l.data.scaleY;return;case ee.first:l.scaleX+=(l.data.scaleX-l.scaleX)*o,l.scaleY+=(l.data.scaleY-l.scaleY)*o}return}let d,u,f=ot.search(h,n,3),g=this.curves[f/3];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(n-_)/(h[f+3]-_);d+=(h[f+3+1]-d)*p,u+=(h[f+3+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(n,f,1,g-2),u=this.getBezierValue(n,f,2,g+18-2)}if(d*=l.data.scaleX,u*=l.data.scaleY,o==1)a==ee.add?(l.scaleX+=d-l.data.scaleX,l.scaleY+=u-l.data.scaleY):(l.scaleX=d,l.scaleY=u);else{let _=0,p=0;if(c==It.mixOut)switch(a){case ee.setup:_=l.data.scaleX,p=l.data.scaleY,l.scaleX=_+(Math.abs(d)*ce.signum(_)-_)*o,l.scaleY=p+(Math.abs(u)*ce.signum(p)-p)*o;break;case ee.first:case ee.replace:_=l.scaleX,p=l.scaleY,l.scaleX=_+(Math.abs(d)*ce.signum(_)-_)*o,l.scaleY=p+(Math.abs(u)*ce.signum(p)-p)*o;break;case ee.add:l.scaleX+=(d-l.data.scaleX)*o,l.scaleY+=(u-l.data.scaleY)*o}else switch(a){case ee.setup:_=Math.abs(l.data.scaleX)*ce.signum(d),p=Math.abs(l.data.scaleY)*ce.signum(u),l.scaleX=_+(d-_)*o,l.scaleY=p+(u-p)*o;break;case ee.first:case ee.replace:_=Math.abs(l.scaleX)*ce.signum(d),p=Math.abs(l.scaleY)*ce.signum(u),l.scaleX=_+(d-_)*o,l.scaleY=p+(u-p)*o;break;case ee.add:l.scaleX+=(d-l.data.scaleX)*o,l.scaleY+=(u-l.data.scaleY)*o}}}}class Zg extends di{constructor(t,i,n){super(t,i,Be.scaleX+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.scaleX=this.getScaleValue(n,o,a,c,l.scaleX,l.data.scaleX))}}class $g extends di{constructor(t,i,n){super(t,i,Be.scaleY+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.scaleY=this.getScaleValue(n,o,a,c,l.scaleY,l.data.scaleY))}}class jg extends eo{constructor(t,i,n){super(t,i,Be.shearX+"|"+n,Be.shearY+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];if(!l.active)return;let h=this.frames;if(n<h[0]){switch(a){case ee.setup:l.shearX=l.data.shearX,l.shearY=l.data.shearY;return;case ee.first:l.shearX+=(l.data.shearX-l.shearX)*o,l.shearY+=(l.data.shearY-l.shearY)*o}return}let d=0,u=0,f=ot.search(h,n,3),g=this.curves[f/3];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(n-_)/(h[f+3]-_);d+=(h[f+3+1]-d)*p,u+=(h[f+3+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(n,f,1,g-2),u=this.getBezierValue(n,f,2,g+18-2)}switch(a){case ee.setup:l.shearX=l.data.shearX+d*o,l.shearY=l.data.shearY+u*o;break;case ee.first:case ee.replace:l.shearX+=(l.data.shearX+d-l.shearX)*o,l.shearY+=(l.data.shearY+u-l.shearY)*o;break;case ee.add:l.shearX+=d*o,l.shearY+=u*o}}}class Kg extends di{constructor(t,i,n){super(t,i,Be.shearX+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.shearX=this.getRelativeValue(n,o,a,l.shearX,l.data.shearX))}}class Jg extends di{constructor(t,i,n){super(t,i,Be.shearY+"|"+n);v(this,"boneIndex",0);this.boneIndex=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];l.active&&(l.shearY=this.getRelativeValue(n,o,a,l.shearY,l.data.shearY))}}class Qg extends ot{constructor(t,i){super(t,[Be.inherit+"|"+i]);v(this,"boneIndex",0);this.boneIndex=i}getFrameEntries(){return 2}setFrame(t,i,n){t*=2,this.frames[t]=i,this.frames[t+1]=n}apply(t,i,n,s,o,a,c){let l=t.bones[this.boneIndex];if(!l.active)return;if(c==It.mixOut){a==ee.setup&&(l.inherit=l.data.inherit);return}let h=this.frames;if(n<h[0]){(a==ee.setup||a==ee.first)&&(l.inherit=l.data.inherit);return}l.inherit=this.frames[ot.search(h,n,2)+1]}}class e0 extends Mi{constructor(t,i,n){super(t,i,[Be.rgb+"|"+n,Be.alpha+"|"+n]);v(this,"slotIndex",0);this.slotIndex=n}getFrameEntries(){return 5}setFrame(t,i,n,s,o,a){t*=5,this.frames[t]=i,this.frames[t+1]=n,this.frames[t+2]=s,this.frames[t+3]=o,this.frames[t+4]=a}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=this.frames,d=l.color;if(n<h[0]){let w=l.data.color;switch(a){case ee.setup:d.setFromColor(w);return;case ee.first:d.add((w.r-d.r)*o,(w.g-d.g)*o,(w.b-d.b)*o,(w.a-d.a)*o)}return}let u=0,f=0,g=0,_=0,p=ot.search(h,n,5),m=this.curves[p/5];switch(m){case 0:let w=h[p];u=h[p+1],f=h[p+2],g=h[p+3],_=h[p+4];let x=(n-w)/(h[p+5]-w);u+=(h[p+5+1]-u)*x,f+=(h[p+5+2]-f)*x,g+=(h[p+5+3]-g)*x,_+=(h[p+5+4]-_)*x;break;case 1:u=h[p+1],f=h[p+2],g=h[p+3],_=h[p+4];break;default:u=this.getBezierValue(n,p,1,m-2),f=this.getBezierValue(n,p,2,m+18-2),g=this.getBezierValue(n,p,3,m+18*2-2),_=this.getBezierValue(n,p,4,m+18*3-2)}o==1?d.set(u,f,g,_):(a==ee.setup&&d.setFromColor(l.data.color),d.add((u-d.r)*o,(f-d.g)*o,(g-d.b)*o,(_-d.a)*o))}}class t0 extends Mi{constructor(t,i,n){super(t,i,[Be.rgb+"|"+n]);v(this,"slotIndex",0);this.slotIndex=n}getFrameEntries(){return 4}setFrame(t,i,n,s,o){t<<=2,this.frames[t]=i,this.frames[t+1]=n,this.frames[t+2]=s,this.frames[t+3]=o}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=this.frames,d=l.color;if(n<h[0]){let m=l.data.color;switch(a){case ee.setup:d.r=m.r,d.g=m.g,d.b=m.b;return;case ee.first:d.r+=(m.r-d.r)*o,d.g+=(m.g-d.g)*o,d.b+=(m.b-d.b)*o}return}let u=0,f=0,g=0,_=ot.search(h,n,4),p=this.curves[_>>2];switch(p){case 0:let m=h[_];u=h[_+1],f=h[_+2],g=h[_+3];let w=(n-m)/(h[_+4]-m);u+=(h[_+4+1]-u)*w,f+=(h[_+4+2]-f)*w,g+=(h[_+4+3]-g)*w;break;case 1:u=h[_+1],f=h[_+2],g=h[_+3];break;default:u=this.getBezierValue(n,_,1,p-2),f=this.getBezierValue(n,_,2,p+18-2),g=this.getBezierValue(n,_,3,p+18*2-2)}if(o==1)d.r=u,d.g=f,d.b=g;else{if(a==ee.setup){let m=l.data.color;d.r=m.r,d.g=m.g,d.b=m.b}d.r+=(u-d.r)*o,d.g+=(f-d.g)*o,d.b+=(g-d.b)*o}}}class i0 extends di{constructor(t,i,n){super(t,i,Be.alpha+"|"+n);v(this,"slotIndex",0);this.slotIndex=n}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=l.color;if(n<this.frames[0]){let u=l.data.color;switch(a){case ee.setup:h.a=u.a;return;case ee.first:h.a+=(u.a-h.a)*o}return}let d=this.getCurveValue(n);o==1?h.a=d:(a==ee.setup&&(h.a=l.data.color.a),h.a+=(d-h.a)*o)}}class n0 extends Mi{constructor(t,i,n){super(t,i,[Be.rgb+"|"+n,Be.alpha+"|"+n,Be.rgb2+"|"+n]);v(this,"slotIndex",0);this.slotIndex=n}getFrameEntries(){return 8}setFrame(t,i,n,s,o,a,c,l,h){t<<=3,this.frames[t]=i,this.frames[t+1]=n,this.frames[t+2]=s,this.frames[t+3]=o,this.frames[t+4]=a,this.frames[t+5]=c,this.frames[t+6]=l,this.frames[t+7]=h}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=this.frames,d=l.color,u=l.darkColor;if(n<h[0]){let S=l.data.color,E=l.data.darkColor;switch(a){case ee.setup:d.setFromColor(S),u.r=E.r,u.g=E.g,u.b=E.b;return;case ee.first:d.add((S.r-d.r)*o,(S.g-d.g)*o,(S.b-d.b)*o,(S.a-d.a)*o),u.r+=(E.r-u.r)*o,u.g+=(E.g-u.g)*o,u.b+=(E.b-u.b)*o}return}let f=0,g=0,_=0,p=0,m=0,w=0,x=0,M=ot.search(h,n,8),b=this.curves[M>>3];switch(b){case 0:let S=h[M];f=h[M+1],g=h[M+2],_=h[M+3],p=h[M+4],m=h[M+5],w=h[M+6],x=h[M+7];let E=(n-S)/(h[M+8]-S);f+=(h[M+8+1]-f)*E,g+=(h[M+8+2]-g)*E,_+=(h[M+8+3]-_)*E,p+=(h[M+8+4]-p)*E,m+=(h[M+8+5]-m)*E,w+=(h[M+8+6]-w)*E,x+=(h[M+8+7]-x)*E;break;case 1:f=h[M+1],g=h[M+2],_=h[M+3],p=h[M+4],m=h[M+5],w=h[M+6],x=h[M+7];break;default:f=this.getBezierValue(n,M,1,b-2),g=this.getBezierValue(n,M,2,b+18-2),_=this.getBezierValue(n,M,3,b+18*2-2),p=this.getBezierValue(n,M,4,b+18*3-2),m=this.getBezierValue(n,M,5,b+18*4-2),w=this.getBezierValue(n,M,6,b+18*5-2),x=this.getBezierValue(n,M,7,b+18*6-2)}if(o==1)d.set(f,g,_,p),u.r=m,u.g=w,u.b=x;else{if(a==ee.setup){d.setFromColor(l.data.color);let S=l.data.darkColor;u.r=S.r,u.g=S.g,u.b=S.b}d.add((f-d.r)*o,(g-d.g)*o,(_-d.b)*o,(p-d.a)*o),u.r+=(m-u.r)*o,u.g+=(w-u.g)*o,u.b+=(x-u.b)*o}}}class s0 extends Mi{constructor(t,i,n){super(t,i,[Be.rgb+"|"+n,Be.rgb2+"|"+n]);v(this,"slotIndex",0);this.slotIndex=n}getFrameEntries(){return 7}setFrame(t,i,n,s,o,a,c,l){t*=7,this.frames[t]=i,this.frames[t+1]=n,this.frames[t+2]=s,this.frames[t+3]=o,this.frames[t+4]=a,this.frames[t+5]=c,this.frames[t+6]=l}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=this.frames,d=l.color,u=l.darkColor;if(n<h[0]){let b=l.data.color,S=l.data.darkColor;switch(a){case ee.setup:d.r=b.r,d.g=b.g,d.b=b.b,u.r=S.r,u.g=S.g,u.b=S.b;return;case ee.first:d.r+=(b.r-d.r)*o,d.g+=(b.g-d.g)*o,d.b+=(b.b-d.b)*o,u.r+=(S.r-u.r)*o,u.g+=(S.g-u.g)*o,u.b+=(S.b-u.b)*o}return}let f=0,g=0,_=0,p=0,m=0,w=0,x=ot.search(h,n,7),M=this.curves[x/7];switch(M){case 0:let b=h[x];f=h[x+1],g=h[x+2],_=h[x+3],p=h[x+4],m=h[x+5],w=h[x+6];let S=(n-b)/(h[x+7]-b);f+=(h[x+7+1]-f)*S,g+=(h[x+7+2]-g)*S,_+=(h[x+7+3]-_)*S,p+=(h[x+7+4]-p)*S,m+=(h[x+7+5]-m)*S,w+=(h[x+7+6]-w)*S;break;case 1:f=h[x+1],g=h[x+2],_=h[x+3],p=h[x+4],m=h[x+5],w=h[x+6];break;default:f=this.getBezierValue(n,x,1,M-2),g=this.getBezierValue(n,x,2,M+18-2),_=this.getBezierValue(n,x,3,M+18*2-2),p=this.getBezierValue(n,x,4,M+18*3-2),m=this.getBezierValue(n,x,5,M+18*4-2),w=this.getBezierValue(n,x,6,M+18*5-2)}if(o==1)d.r=f,d.g=g,d.b=_,u.r=p,u.g=m,u.b=w;else{if(a==ee.setup){let b=l.data.color,S=l.data.darkColor;d.r=b.r,d.g=b.g,d.b=b.b,u.r=S.r,u.g=S.g,u.b=S.b}d.r+=(f-d.r)*o,d.g+=(g-d.g)*o,d.b+=(_-d.b)*o,u.r+=(p-u.r)*o,u.g+=(m-u.g)*o,u.b+=(w-u.b)*o}}}class ys extends ot{constructor(t,i){super(t,[Be.attachment+"|"+i]);v(this,"slotIndex",0);v(this,"attachmentNames");this.slotIndex=i,this.attachmentNames=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,i,n){this.frames[t]=i,this.attachmentNames[t]=n}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(l.bone.active){if(c==It.mixOut){a==ee.setup&&this.setAttachment(t,l,l.data.attachmentName);return}if(n<this.frames[0]){(a==ee.setup||a==ee.first)&&this.setAttachment(t,l,l.data.attachmentName);return}this.setAttachment(t,l,this.attachmentNames[ot.search1(this.frames,n)])}}setAttachment(t,i,n){i.setAttachment(n?t.getAttachment(this.slotIndex,n):null)}}class r0 extends Mi{constructor(t,i,n,s){super(t,i,[Be.deform+"|"+n+"|"+s.id]);v(this,"slotIndex",0);v(this,"attachment");v(this,"vertices");this.slotIndex=n,this.attachment=s,this.vertices=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,i,n){this.frames[t]=i,this.vertices[t]=n}setBezier(t,i,n,s,o,a,c,l,h,d,u){let f=this.curves,g=this.getFrameCount()+t*18;n==0&&(f[i]=2+g);let _=(s-a*2+l)*.03,p=h*.03-c*.06,m=((a-l)*3-s+d)*.006,w=(c-h+.33333333)*.018,x=_*2+m,M=p*2+w,b=(a-s)*.3+_+m*.16666667,S=c*.3+p+w*.16666667,E=s+b,R=S;for(let I=g+18;g<I;g+=2)f[g]=E,f[g+1]=R,b+=x,S+=M,x+=m,M+=w,E+=b,R+=S}getCurvePercent(t,i){let n=this.curves,s=n[i];switch(s){case 0:let l=this.frames[i];return(t-l)/(this.frames[i+this.getFrameEntries()]-l);case 1:return 0}if(s-=2,n[s]>t){let l=this.frames[i];return n[s+1]*(t-l)/(n[s]-l)}let o=s+18;for(s+=2;s<o;s+=2)if(n[s]>=t){let l=n[s-2],h=n[s-1];return h+(t-l)/(n[s]-l)*(n[s+1]-h)}let a=n[o-2],c=n[o-1];return c+(1-c)*(t-a)/(this.frames[i+this.getFrameEntries()]-a)}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=l.getAttachment();if(!h||!(h instanceof hi)||h.timelineAttachment!=this.attachment)return;let d=l.deform;d.length==0&&(a=ee.setup);let u=this.vertices,f=u[0].length,g=this.frames;if(n<g[0]){switch(a){case ee.setup:d.length=0;return;case ee.first:if(o==1){d.length=0;return}d.length=f;let M=h;if(M.bones){o=1-o;for(var _=0;_<f;_++)d[_]*=o}else{let b=M.vertices;for(var _=0;_<f;_++)d[_]+=(b[_]-d[_])*o}}return}if(d.length=f,n>=g[g.length-1]){let M=u[g.length-1];if(o==1)if(a==ee.add){let b=h;if(b.bones)for(let S=0;S<f;S++)d[S]+=M[S];else{let S=b.vertices;for(let E=0;E<f;E++)d[E]+=M[E]-S[E]}}else ge.arrayCopy(M,0,d,0,f);else switch(a){case ee.setup:{let S=h;if(S.bones)for(let E=0;E<f;E++)d[E]=M[E]*o;else{let E=S.vertices;for(let R=0;R<f;R++){let I=E[R];d[R]=I+(M[R]-I)*o}}break}case ee.first:case ee.replace:for(let S=0;S<f;S++)d[S]+=(M[S]-d[S])*o;break;case ee.add:let b=h;if(b.bones)for(let S=0;S<f;S++)d[S]+=M[S]*o;else{let S=b.vertices;for(let E=0;E<f;E++)d[E]+=(M[E]-S[E])*o}}return}let p=ot.search1(g,n),m=this.getCurvePercent(n,p),w=u[p],x=u[p+1];if(o==1)if(a==ee.add){let M=h;if(M.bones)for(let b=0;b<f;b++){let S=w[b];d[b]+=S+(x[b]-S)*m}else{let b=M.vertices;for(let S=0;S<f;S++){let E=w[S];d[S]+=E+(x[S]-E)*m-b[S]}}}else for(let M=0;M<f;M++){let b=w[M];d[M]=b+(x[M]-b)*m}else switch(a){case ee.setup:{let b=h;if(b.bones)for(let S=0;S<f;S++){let E=w[S];d[S]=(E+(x[S]-E)*m)*o}else{let S=b.vertices;for(let E=0;E<f;E++){let R=w[E],I=S[E];d[E]=I+(R+(x[E]-R)*m-I)*o}}break}case ee.first:case ee.replace:for(let b=0;b<f;b++){let S=w[b];d[b]+=(S+(x[b]-S)*m-d[b])*o}break;case ee.add:let M=h;if(M.bones)for(let b=0;b<f;b++){let S=w[b];d[b]+=(S+(x[b]-S)*m)*o}else{let b=M.vertices;for(let S=0;S<f;S++){let E=w[S];d[S]+=(E+(x[S]-E)*m-b[S])*o}}}}}const Tr=class Tr extends ot{constructor(t){super(t,Tr.propertyIds);v(this,"events");this.events=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,i){this.frames[t]=i.time,this.events[t]=i}apply(t,i,n,s,o,a,c){if(!s)return;let l=this.frames,h=this.frames.length;if(i>n)this.apply(t,i,Number.MAX_VALUE,s,o,a,c),i=-1;else if(i>=l[h-1])return;if(n<l[0])return;let d=0;if(i<l[0])d=0;else{d=ot.search1(l,i)+1;let u=l[d];for(;d>0&&l[d-1]==u;)d--}for(;d<h&&n>=l[d];d++)s.push(this.events[d])}};v(Tr,"propertyIds",[""+Be.event]);let wr=Tr;const Ar=class Ar extends ot{constructor(t){super(t,Ar.propertyIds);v(this,"drawOrders");this.drawOrders=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,i,n){this.frames[t]=i,this.drawOrders[t]=n}apply(t,i,n,s,o,a,c){if(c==It.mixOut){a==ee.setup&&ge.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);return}if(n<this.frames[0]){(a==ee.setup||a==ee.first)&&ge.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);return}let l=ot.search1(this.frames,n),h=this.drawOrders[l];if(!h)ge.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);else{let d=t.drawOrder,u=t.slots;for(let f=0,g=h.length;f<g;f++)d[f]=u[h[f]]}}};v(Ar,"propertyIds",[""+Be.drawOrder]);let is=Ar;class a0 extends Mi{constructor(t,i,n){super(t,i,[Be.ikConstraint+"|"+n]);v(this,"constraintIndex",0);this.constraintIndex=n}getFrameEntries(){return 6}setFrame(t,i,n,s,o,a,c){t*=6,this.frames[t]=i,this.frames[t+1]=n,this.frames[t+2]=s,this.frames[t+3]=o,this.frames[t+4]=a?1:0,this.frames[t+5]=c?1:0}apply(t,i,n,s,o,a,c){let l=t.ikConstraints[this.constraintIndex];if(!l.active)return;let h=this.frames;if(n<h[0]){switch(a){case ee.setup:l.mix=l.data.mix,l.softness=l.data.softness,l.bendDirection=l.data.bendDirection,l.compress=l.data.compress,l.stretch=l.data.stretch;return;case ee.first:l.mix+=(l.data.mix-l.mix)*o,l.softness+=(l.data.softness-l.softness)*o,l.bendDirection=l.data.bendDirection,l.compress=l.data.compress,l.stretch=l.data.stretch}return}let d=0,u=0,f=ot.search(h,n,6),g=this.curves[f/6];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(n-_)/(h[f+6]-_);d+=(h[f+6+1]-d)*p,u+=(h[f+6+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(n,f,1,g-2),u=this.getBezierValue(n,f,2,g+18-2)}a==ee.setup?(l.mix=l.data.mix+(d-l.data.mix)*o,l.softness=l.data.softness+(u-l.data.softness)*o,c==It.mixOut?(l.bendDirection=l.data.bendDirection,l.compress=l.data.compress,l.stretch=l.data.stretch):(l.bendDirection=h[f+3],l.compress=h[f+4]!=0,l.stretch=h[f+5]!=0)):(l.mix+=(d-l.mix)*o,l.softness+=(u-l.softness)*o,c==It.mixIn&&(l.bendDirection=h[f+3],l.compress=h[f+4]!=0,l.stretch=h[f+5]!=0))}}class o0 extends Mi{constructor(t,i,n){super(t,i,[Be.transformConstraint+"|"+n]);v(this,"constraintIndex",0);this.constraintIndex=n}getFrameEntries(){return 7}setFrame(t,i,n,s,o,a,c,l){let h=this.frames;t*=7,h[t]=i,h[t+1]=n,h[t+2]=s,h[t+3]=o,h[t+4]=a,h[t+5]=c,h[t+6]=l}apply(t,i,n,s,o,a,c){let l=t.transformConstraints[this.constraintIndex];if(!l.active)return;let h=this.frames;if(n<h[0]){let x=l.data;switch(a){case ee.setup:l.mixRotate=x.mixRotate,l.mixX=x.mixX,l.mixY=x.mixY,l.mixScaleX=x.mixScaleX,l.mixScaleY=x.mixScaleY,l.mixShearY=x.mixShearY;return;case ee.first:l.mixRotate+=(x.mixRotate-l.mixRotate)*o,l.mixX+=(x.mixX-l.mixX)*o,l.mixY+=(x.mixY-l.mixY)*o,l.mixScaleX+=(x.mixScaleX-l.mixScaleX)*o,l.mixScaleY+=(x.mixScaleY-l.mixScaleY)*o,l.mixShearY+=(x.mixShearY-l.mixShearY)*o}return}let d,u,f,g,_,p,m=ot.search(h,n,7),w=this.curves[m/7];switch(w){case 0:let x=h[m];d=h[m+1],u=h[m+2],f=h[m+3],g=h[m+4],_=h[m+5],p=h[m+6];let M=(n-x)/(h[m+7]-x);d+=(h[m+7+1]-d)*M,u+=(h[m+7+2]-u)*M,f+=(h[m+7+3]-f)*M,g+=(h[m+7+4]-g)*M,_+=(h[m+7+5]-_)*M,p+=(h[m+7+6]-p)*M;break;case 1:d=h[m+1],u=h[m+2],f=h[m+3],g=h[m+4],_=h[m+5],p=h[m+6];break;default:d=this.getBezierValue(n,m,1,w-2),u=this.getBezierValue(n,m,2,w+18-2),f=this.getBezierValue(n,m,3,w+18*2-2),g=this.getBezierValue(n,m,4,w+18*3-2),_=this.getBezierValue(n,m,5,w+18*4-2),p=this.getBezierValue(n,m,6,w+18*5-2)}if(a==ee.setup){let x=l.data;l.mixRotate=x.mixRotate+(d-x.mixRotate)*o,l.mixX=x.mixX+(u-x.mixX)*o,l.mixY=x.mixY+(f-x.mixY)*o,l.mixScaleX=x.mixScaleX+(g-x.mixScaleX)*o,l.mixScaleY=x.mixScaleY+(_-x.mixScaleY)*o,l.mixShearY=x.mixShearY+(p-x.mixShearY)*o}else l.mixRotate+=(d-l.mixRotate)*o,l.mixX+=(u-l.mixX)*o,l.mixY+=(f-l.mixY)*o,l.mixScaleX+=(g-l.mixScaleX)*o,l.mixScaleY+=(_-l.mixScaleY)*o,l.mixShearY+=(p-l.mixShearY)*o}}class l0 extends di{constructor(t,i,n){super(t,i,Be.pathConstraintPosition+"|"+n);v(this,"constraintIndex",0);this.constraintIndex=n}apply(t,i,n,s,o,a,c){let l=t.pathConstraints[this.constraintIndex];l.active&&(l.position=this.getAbsoluteValue(n,o,a,l.position,l.data.position))}}class c0 extends di{constructor(t,i,n){super(t,i,Be.pathConstraintSpacing+"|"+n);v(this,"constraintIndex",0);this.constraintIndex=n}apply(t,i,n,s,o,a,c){let l=t.pathConstraints[this.constraintIndex];l.active&&(l.spacing=this.getAbsoluteValue(n,o,a,l.spacing,l.data.spacing))}}class h0 extends Mi{constructor(t,i,n){super(t,i,[Be.pathConstraintMix+"|"+n]);v(this,"constraintIndex",0);this.constraintIndex=n}getFrameEntries(){return 4}setFrame(t,i,n,s,o){let a=this.frames;t<<=2,a[t]=i,a[t+1]=n,a[t+2]=s,a[t+3]=o}apply(t,i,n,s,o,a,c){let l=t.pathConstraints[this.constraintIndex];if(!l.active)return;let h=this.frames;if(n<h[0]){switch(a){case ee.setup:l.mixRotate=l.data.mixRotate,l.mixX=l.data.mixX,l.mixY=l.data.mixY;return;case ee.first:l.mixRotate+=(l.data.mixRotate-l.mixRotate)*o,l.mixX+=(l.data.mixX-l.mixX)*o,l.mixY+=(l.data.mixY-l.mixY)*o}return}let d,u,f,g=ot.search(h,n,4),_=this.curves[g>>2];switch(_){case 0:let p=h[g];d=h[g+1],u=h[g+2],f=h[g+3];let m=(n-p)/(h[g+4]-p);d+=(h[g+4+1]-d)*m,u+=(h[g+4+2]-u)*m,f+=(h[g+4+3]-f)*m;break;case 1:d=h[g+1],u=h[g+2],f=h[g+3];break;default:d=this.getBezierValue(n,g,1,_-2),u=this.getBezierValue(n,g,2,_+18-2),f=this.getBezierValue(n,g,3,_+18*2-2)}if(a==ee.setup){let p=l.data;l.mixRotate=p.mixRotate+(d-p.mixRotate)*o,l.mixX=p.mixX+(u-p.mixX)*o,l.mixY=p.mixY+(f-p.mixY)*o}else l.mixRotate+=(d-l.mixRotate)*o,l.mixX+=(u-l.mixX)*o,l.mixY+=(f-l.mixY)*o}}class Ln extends di{constructor(t,i,n,s){super(t,i,s+"|"+n);v(this,"constraintIndex",0);this.constraintIndex=n}apply(t,i,n,s,o,a,c){let l;if(this.constraintIndex==-1){const h=n>=this.frames[0]?this.getCurveValue(n):0;for(const d of t.physicsConstraints)d.active&&this.global(d.data)&&this.set(d,this.getAbsoluteValue2(n,o,a,this.get(d),this.setup(d),h))}else l=t.physicsConstraints[this.constraintIndex],l.active&&this.set(l,this.getAbsoluteValue(n,o,a,this.get(l),this.setup(l)))}}class d0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintInertia)}setup(e){return e.data.inertia}get(e){return e.inertia}set(e,t){e.inertia=t}global(e){return e.inertiaGlobal}}class u0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintStrength)}setup(e){return e.data.strength}get(e){return e.strength}set(e,t){e.strength=t}global(e){return e.strengthGlobal}}class f0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintDamping)}setup(e){return e.data.damping}get(e){return e.damping}set(e,t){e.damping=t}global(e){return e.dampingGlobal}}class p0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintMass)}setup(e){return 1/e.data.massInverse}get(e){return 1/e.massInverse}set(e,t){e.massInverse=1/t}global(e){return e.massGlobal}}class m0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintWind)}setup(e){return e.data.wind}get(e){return e.wind}set(e,t){e.wind=t}global(e){return e.windGlobal}}class g0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintGravity)}setup(e){return e.data.gravity}get(e){return e.gravity}set(e,t){e.gravity=t}global(e){return e.gravityGlobal}}class _0 extends Ln{constructor(e,t,i){super(e,t,i,Be.physicsConstraintMix)}setup(e){return e.data.mix}get(e){return e.mix}set(e,t){e.mix=t}global(e){return e.mixGlobal}}const Cr=class Cr extends ot{constructor(t,i){super(t,Cr.propertyIds);v(this,"constraintIndex");this.constraintIndex=i}getFrameCount(){return this.frames.length}setFrame(t,i){this.frames[t]=i}apply(t,i,n,s,o,a,c){let l;if(this.constraintIndex!=-1&&(l=t.physicsConstraints[this.constraintIndex],!l.active))return;const h=this.frames;if(i>n)this.apply(t,i,Number.MAX_VALUE,[],o,a,c),i=-1;else if(i>=h[h.length-1])return;if(!(n<h[0])&&(i<h[0]||n>=h[ot.search1(h,i)+1]))if(l!=null)l.reset();else for(const d of t.physicsConstraints)d.active&&d.reset()}};v(Cr,"propertyIds",[Be.physicsConstraintReset.toString()]);let Ga=Cr;const jt=class jt extends ot{constructor(t,i,n){super(t,[Be.sequence+"|"+i+"|"+n.sequence.id]);v(this,"slotIndex");v(this,"attachment");this.slotIndex=i,this.attachment=n}getFrameEntries(){return jt.ENTRIES}getSlotIndex(){return this.slotIndex}getAttachment(){return this.attachment}setFrame(t,i,n,s,o){let a=this.frames;t*=jt.ENTRIES,a[t]=i,a[t+jt.MODE]=n|s<<4,a[t+jt.DELAY]=o}apply(t,i,n,s,o,a,c){let l=t.slots[this.slotIndex];if(!l.bone.active)return;let h=l.attachment,d=this.attachment;if(h!=d&&(!(h instanceof hi)||h.timelineAttachment!=d))return;if(c==It.mixOut){a==ee.setup&&(l.sequenceIndex=-1);return}let u=this.frames;if(n<u[0]){(a==ee.setup||a==ee.first)&&(l.sequenceIndex=-1);return}let f=ot.search(u,n,jt.ENTRIES),g=u[f],_=u[f+jt.MODE],p=u[f+jt.DELAY];if(!this.attachment.sequence)return;let m=_>>4,w=this.attachment.sequence.regions.length,x=Vg[_&15];if(x!=At.hold)switch(m+=(n-g)/p+1e-5|0,x){case At.once:m=Math.min(w-1,m);break;case At.loop:m%=w;break;case At.pingpong:{let M=(w<<1)-2;m=M==0?0:m%M,m>=w&&(m=M-m);break}case At.onceReverse:m=Math.max(w-1-m,0);break;case At.loopReverse:m=w-1-m%w;break;case At.pingpongReverse:{let M=(w<<1)-2;m=M==0?0:(m+w-1)%M,m>=w&&(m=M-m)}}l.sequenceIndex=m}};v(jt,"ENTRIES",3),v(jt,"MODE",1),v(jt,"DELAY",2);let Ha=jt;const Qn=class Qn{constructor(e){v(this,"data");v(this,"tracks",new Array);v(this,"timeScale",1);v(this,"unkeyedState",0);v(this,"events",new Array);v(this,"listeners",new Array);v(this,"queue",new v0(this));v(this,"propertyIDs",new Dc);v(this,"animationsChanged",!1);v(this,"trackEntryPool",new ka(()=>new x0));this.data=e}static emptyAnimation(){return Qn._emptyAnimation}update(e){e*=this.timeScale;let t=this.tracks;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(!s)continue;s.animationLast=s.nextAnimationLast,s.trackLast=s.nextTrackLast;let o=e*s.timeScale;if(s.delay>0){if(s.delay-=o,s.delay>0)continue;o=-s.delay,s.delay=0}let a=s.next;if(a){let c=s.trackLast-a.delay;if(c>=0){for(a.delay=0,a.trackTime+=s.timeScale==0?0:(c/s.timeScale+e)*a.timeScale,s.trackTime+=o,this.setCurrent(i,a,!0);a.mixingFrom;)a.mixTime+=e,a=a.mixingFrom;continue}}else if(s.trackLast>=s.trackEnd&&!s.mixingFrom){t[i]=null,this.queue.end(s),this.clearNext(s);continue}if(s.mixingFrom&&this.updateMixingFrom(s,e)){let c=s.mixingFrom;for(s.mixingFrom=null,c&&(c.mixingTo=null);c;)this.queue.end(c),c=c.mixingFrom}s.trackTime+=o}this.queue.drain()}updateMixingFrom(e,t){let i=e.mixingFrom;if(!i)return!0;let n=this.updateMixingFrom(i,t);if(i.animationLast=i.nextAnimationLast,i.trackLast=i.nextTrackLast,e.nextTrackLast!=-1){const s=e.mixTime==0&&i.mixTime==0;if(e.mixTime>=e.mixDuration||s)return(i.totalAlpha==0||e.mixDuration==0||s)&&(e.mixingFrom=i.mixingFrom,i.mixingFrom!=null&&(i.mixingFrom.mixingTo=e),e.interruptAlpha=i.interruptAlpha,this.queue.end(i)),n}return i.trackTime+=t*i.timeScale,e.mixTime+=t,!1}apply(e){if(!e)throw new Error("skeleton cannot be null.");this.animationsChanged&&this._animationsChanged();let t=this.events,i=this.tracks,n=!1;for(let u=0,f=i.length;u<f;u++){let g=i[u];if(!g||g.delay>0)continue;n=!0;let _=u==0?ee.first:g.mixBlend,p=g.alpha;g.mixingFrom?p*=this.applyMixingFrom(g,e,_):g.trackTime>=g.trackEnd&&!g.next&&(p=0);let m=p>=g.alphaAttachmentThreshold,w=g.animationLast,x=g.getAnimationTime(),M=x,b=t;g.reverse&&(M=g.animation.duration-M,b=null);let S=g.animation.timelines,E=S.length;if(u==0&&p==1||_==ee.add){u==0&&(m=!0);for(let R=0;R<E;R++){var s=S[R];s instanceof ys?this.applyAttachmentTimeline(s,e,M,_,m):s.apply(e,w,M,b,p,_,It.mixIn)}}else{let R=g.timelineMode,I=g.shortestRotation,y=!I&&g.timelinesRotation.length!=E<<1;y&&(g.timelinesRotation.length=E<<1);for(let T=0;T<E;T++){let V=S[T],k=R[T]==Ma?_:ee.setup;!I&&V instanceof za?this.applyRotateTimeline(V,e,M,p,k,g.timelinesRotation,T<<1,y):V instanceof ys?this.applyAttachmentTimeline(V,e,M,_,m):V.apply(e,w,M,b,p,k,It.mixIn)}}this.queueEvents(g,x),t.length=0,g.nextAnimationLast=x,g.nextTrackLast=g.trackTime}for(var o=this.unkeyedState+Dl,a=e.slots,c=0,l=e.slots.length;c<l;c++){var h=a[c];if(h.attachmentState==o){var d=h.data.attachmentName;h.setAttachment(d?e.getAttachment(h.data.index,d):null)}}return this.unkeyedState+=2,this.queue.drain(),n}applyMixingFrom(e,t,i){let n=e.mixingFrom;n.mixingFrom&&this.applyMixingFrom(n,t,i);let s=0;e.mixDuration==0?(s=1,i==ee.first&&(i=ee.setup)):(s=e.mixTime/e.mixDuration,s>1&&(s=1),i!=ee.first&&(i=n.mixBlend));let o=s<n.mixAttachmentThreshold,a=s<n.mixDrawOrderThreshold,c=n.animation.timelines,l=c.length,h=n.alpha*e.interruptAlpha,d=h*(1-s),u=n.animationLast,f=n.getAnimationTime(),g=f,_=null;if(n.reverse?g=n.animation.duration-g:s<n.eventThreshold&&(_=this.events),i==ee.add)for(let p=0;p<l;p++)c[p].apply(t,u,g,_,d,i,It.mixOut);else{let p=n.timelineMode,m=n.timelineHoldMix,w=n.shortestRotation,x=!w&&n.timelinesRotation.length!=l<<1;x&&(n.timelinesRotation.length=l<<1),n.totalAlpha=0;for(let M=0;M<l;M++){let b=c[M],S=It.mixOut,E,R=0;switch(p[M]){case Ma:if(!a&&b instanceof is)continue;E=i,R=d;break;case Pl:E=ee.setup,R=d;break;case Il:E=i,R=h;break;case Sa:E=ee.setup,R=h;break;default:E=ee.setup;let I=m[M];R=h*Math.max(0,1-I.mixTime/I.mixDuration);break}n.totalAlpha+=R,!w&&b instanceof za?this.applyRotateTimeline(b,t,g,R,E,n.timelinesRotation,M<<1,x):b instanceof ys?this.applyAttachmentTimeline(b,t,g,E,o&&R>=n.alphaAttachmentThreshold):(a&&b instanceof is&&E==ee.setup&&(S=It.mixIn),b.apply(t,u,g,_,R,E,S))}}return e.mixDuration>0&&this.queueEvents(n,f),this.events.length=0,n.nextAnimationLast=f,n.nextTrackLast=n.trackTime,s}applyAttachmentTimeline(e,t,i,n,s){var o=t.slots[e.slotIndex];o.bone.active&&(i<e.frames[0]?(n==ee.setup||n==ee.first)&&this.setAttachment(t,o,o.data.attachmentName,s):this.setAttachment(t,o,e.attachmentNames[ot.search1(e.frames,i)],s),o.attachmentState<=this.unkeyedState&&(o.attachmentState=this.unkeyedState+Dl))}setAttachment(e,t,i,n){t.setAttachment(i?e.getAttachment(t.data.index,i):null),n&&(t.attachmentState=this.unkeyedState+S0)}applyRotateTimeline(e,t,i,n,s,o,a,c){if(c&&(o[a]=0),n==1){e.apply(t,0,i,null,1,s,It.mixIn);return}let l=t.bones[e.boneIndex];if(!l.active)return;let h=e.frames,d=0,u=0;if(i<h[0])switch(s){case ee.setup:l.rotation=l.data.rotation;default:return;case ee.first:d=l.rotation,u=l.data.rotation}else d=s==ee.setup?l.data.rotation:l.rotation,u=l.data.rotation+e.getCurveValue(i);let f=0,g=u-d;if(g-=Math.ceil(g/360-.5)*360,g==0)f=o[a];else{let _=0,p=0;c?(_=0,p=g):(_=o[a],p=o[a+1]);let m=_-_%360;f=g+m;let w=g>=0,x=_>=0;Math.abs(p)<=90&&ce.signum(p)!=ce.signum(g)&&(Math.abs(_-m)>180?(f+=360*ce.signum(_),x=w):m!=0?f-=360*ce.signum(_):x=w),x!=w&&(f+=360*ce.signum(_)),o[a]=f}o[a+1]=g,l.rotation=d+f*n}queueEvents(e,t){let i=e.animationStart,n=e.animationEnd,s=n-i,o=e.trackLast%s,a=this.events,c=0,l=a.length;for(;c<l;c++){let d=a[c];if(d.time<o)break;d.time>n||this.queue.event(e,d)}let h=!1;if(e.loop)if(s==0)h=!0;else{const d=Math.floor(e.trackTime/s);h=d>0&&d>Math.floor(e.trackLast/s)}else h=t>=n&&e.animationLast<n;for(h&&this.queue.complete(e);c<l;c++){let d=a[c];d.time<i||this.queue.event(e,d)}}clearTracks(){let e=this.queue.drainDisabled;this.queue.drainDisabled=!0;for(let t=0,i=this.tracks.length;t<i;t++)this.clearTrack(t);this.tracks.length=0,this.queue.drainDisabled=e,this.queue.drain()}clearTrack(e){if(e>=this.tracks.length)return;let t=this.tracks[e];if(!t)return;this.queue.end(t),this.clearNext(t);let i=t;for(;;){let n=i.mixingFrom;if(!n)break;this.queue.end(n),i.mixingFrom=null,i.mixingTo=null,i=n}this.tracks[t.trackIndex]=null,this.queue.drain()}setCurrent(e,t,i){let n=this.expandToIndex(e);this.tracks[e]=t,t.previous=null,n&&(i&&this.queue.interrupt(n),t.mixingFrom=n,n.mixingTo=t,t.mixTime=0,n.mixingFrom&&n.mixDuration>0&&(t.interruptAlpha*=Math.min(1,n.mixTime/n.mixDuration)),n.timelinesRotation.length=0),this.queue.start(t)}setAnimation(e,t,i=!1){let n=this.data.skeletonData.findAnimation(t);if(!n)throw new Error("Animation not found: "+t);return this.setAnimationWith(e,n,i)}setAnimationWith(e,t,i=!1){if(!t)throw new Error("animation cannot be null.");let n=!0,s=this.expandToIndex(e);s&&(s.nextTrackLast==-1?(this.tracks[e]=s.mixingFrom,this.queue.interrupt(s),this.queue.end(s),this.clearNext(s),s=s.mixingFrom,n=!1):this.clearNext(s));let o=this.trackEntry(e,t,i,s);return this.setCurrent(e,o,n),this.queue.drain(),o}addAnimation(e,t,i=!1,n=0){let s=this.data.skeletonData.findAnimation(t);if(!s)throw new Error("Animation not found: "+t);return this.addAnimationWith(e,s,i,n)}addAnimationWith(e,t,i=!1,n=0){if(!t)throw new Error("animation cannot be null.");let s=this.expandToIndex(e);if(s)for(;s.next;)s=s.next;let o=this.trackEntry(e,t,i,s);return s?(s.next=o,o.previous=s,n<=0&&(n+=s.getTrackComplete()-o.mixDuration)):(this.setCurrent(e,o,!0),this.queue.drain()),o.delay=n,o}setEmptyAnimation(e,t=0){let i=this.setAnimationWith(e,Qn.emptyAnimation(),!1);return i.mixDuration=t,i.trackEnd=t,i}addEmptyAnimation(e,t=0,i=0){let n=this.addAnimationWith(e,Qn.emptyAnimation(),!1,i);return i<=0&&(n.delay+=n.mixDuration-t),n.mixDuration=t,n.trackEnd=t,n}setEmptyAnimations(e=0){let t=this.queue.drainDisabled;this.queue.drainDisabled=!0;for(let i=0,n=this.tracks.length;i<n;i++){let s=this.tracks[i];s&&this.setEmptyAnimation(s.trackIndex,e)}this.queue.drainDisabled=t,this.queue.drain()}expandToIndex(e){return e<this.tracks.length?this.tracks[e]:(ge.ensureArrayCapacity(this.tracks,e+1,null),this.tracks.length=e+1,null)}trackEntry(e,t,i,n){let s=this.trackEntryPool.obtain();return s.reset(),s.trackIndex=e,s.animation=t,s.loop=i,s.holdPrevious=!1,s.reverse=!1,s.shortestRotation=!1,s.eventThreshold=0,s.alphaAttachmentThreshold=0,s.mixAttachmentThreshold=0,s.mixDrawOrderThreshold=0,s.animationStart=0,s.animationEnd=t.duration,s.animationLast=-1,s.nextAnimationLast=-1,s.delay=0,s.trackTime=0,s.trackLast=-1,s.nextTrackLast=-1,s.trackEnd=Number.MAX_VALUE,s.timeScale=1,s.alpha=1,s.mixTime=0,s.mixDuration=n?this.data.getMix(n.animation,t):0,s.interruptAlpha=1,s.totalAlpha=0,s.mixBlend=ee.replace,s}clearNext(e){let t=e.next;for(;t;)this.queue.dispose(t),t=t.next;e.next=null}_animationsChanged(){this.animationsChanged=!1,this.propertyIDs.clear();let e=this.tracks;for(let t=0,i=e.length;t<i;t++){let n=e[t];if(n){for(;n.mixingFrom;)n=n.mixingFrom;do(!n.mixingTo||n.mixBlend!=ee.add)&&this.computeHold(n),n=n.mixingTo;while(n)}}}computeHold(e){let t=e.mixingTo,i=e.animation.timelines,n=e.animation.timelines.length,s=e.timelineMode;s.length=n;let o=e.timelineHoldMix;o.length=0;let a=this.propertyIDs;if(t&&t.holdPrevious){for(let c=0;c<n;c++)s[c]=a.addAll(i[c].getPropertyIds())?Sa:Il;return}e:for(let c=0;c<n;c++){let l=i[c],h=l.getPropertyIds();if(!a.addAll(h))s[c]=Ma;else if(!t||l instanceof ys||l instanceof is||l instanceof wr||!t.animation.hasTimeline(h))s[c]=Pl;else{for(let d=t.mixingTo;d;d=d.mixingTo)if(!d.animation.hasTimeline(h)){if(e.mixDuration>0){s[c]=M0,o[c]=d;continue e}break}s[c]=Sa}}}getCurrent(e){return e>=this.tracks.length?null:this.tracks[e]}addListener(e){if(!e)throw new Error("listener cannot be null.");this.listeners.push(e)}removeListener(e){let t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}clearListeners(){this.listeners.length=0}clearListenerNotifications(){this.queue.clear()}};v(Qn,"_emptyAnimation",new Nc("<empty>",[],0));let Va=Qn;class x0{constructor(){v(this,"animation",null);v(this,"previous",null);v(this,"next",null);v(this,"mixingFrom",null);v(this,"mixingTo",null);v(this,"listener",null);v(this,"trackIndex",0);v(this,"loop",!1);v(this,"holdPrevious",!1);v(this,"reverse",!1);v(this,"shortestRotation",!1);v(this,"eventThreshold",0);v(this,"mixAttachmentThreshold",0);v(this,"alphaAttachmentThreshold",0);v(this,"mixDrawOrderThreshold",0);v(this,"animationStart",0);v(this,"animationEnd",0);v(this,"animationLast",0);v(this,"nextAnimationLast",0);v(this,"delay",0);v(this,"trackTime",0);v(this,"trackLast",0);v(this,"nextTrackLast",0);v(this,"trackEnd",0);v(this,"timeScale",0);v(this,"alpha",0);v(this,"mixTime",0);v(this,"_mixDuration",0);v(this,"interruptAlpha",0);v(this,"totalAlpha",0);v(this,"mixBlend",ee.replace);v(this,"timelineMode",new Array);v(this,"timelineHoldMix",new Array);v(this,"timelinesRotation",new Array)}get mixDuration(){return this._mixDuration}set mixDuration(e){this._mixDuration=e}setMixDurationWithDelay(e,t){this._mixDuration=e,this.previous!=null&&t<=0&&(t+=this.previous.getTrackComplete()-e),this.delay=t}reset(){this.next=null,this.previous=null,this.mixingFrom=null,this.mixingTo=null,this.animation=null,this.listener=null,this.timelineMode.length=0,this.timelineHoldMix.length=0,this.timelinesRotation.length=0}getAnimationTime(){if(this.loop){let e=this.animationEnd-this.animationStart;return e==0?this.animationStart:this.trackTime%e+this.animationStart}return Math.min(this.trackTime+this.animationStart,this.animationEnd)}setAnimationLast(e){this.animationLast=e,this.nextAnimationLast=e}isComplete(){return this.trackTime>=this.animationEnd-this.animationStart}resetRotationDirections(){this.timelinesRotation.length=0}getTrackComplete(){let e=this.animationEnd-this.animationStart;if(e!=0){if(this.loop)return e*(1+(this.trackTime/e|0));if(this.trackTime<e)return e}return this.trackTime}wasApplied(){return this.nextTrackLast!=-1}isNextReady(){return this.next!=null&&this.nextTrackLast-this.next.delay>=0}}class v0{constructor(e){v(this,"objects",[]);v(this,"drainDisabled",!1);v(this,"animState");this.animState=e}start(e){this.objects.push(Ot.start),this.objects.push(e),this.animState.animationsChanged=!0}interrupt(e){this.objects.push(Ot.interrupt),this.objects.push(e)}end(e){this.objects.push(Ot.end),this.objects.push(e),this.animState.animationsChanged=!0}dispose(e){this.objects.push(Ot.dispose),this.objects.push(e)}complete(e){this.objects.push(Ot.complete),this.objects.push(e)}event(e,t){this.objects.push(Ot.event),this.objects.push(e),this.objects.push(t)}drain(){if(this.drainDisabled)return;this.drainDisabled=!0;let e=this.objects,t=this.animState.listeners;for(let i=0;i<e.length;i+=2){let n=e[i],s=e[i+1];switch(n){case Ot.start:s.listener&&s.listener.start&&s.listener.start(s);for(let a=0;a<t.length;a++){let c=t[a];c.start&&c.start(s)}break;case Ot.interrupt:s.listener&&s.listener.interrupt&&s.listener.interrupt(s);for(let a=0;a<t.length;a++){let c=t[a];c.interrupt&&c.interrupt(s)}break;case Ot.end:s.listener&&s.listener.end&&s.listener.end(s);for(let a=0;a<t.length;a++){let c=t[a];c.end&&c.end(s)}case Ot.dispose:s.listener&&s.listener.dispose&&s.listener.dispose(s);for(let a=0;a<t.length;a++){let c=t[a];c.dispose&&c.dispose(s)}this.animState.trackEntryPool.free(s);break;case Ot.complete:s.listener&&s.listener.complete&&s.listener.complete(s);for(let a=0;a<t.length;a++){let c=t[a];c.complete&&c.complete(s)}break;case Ot.event:let o=e[i+++2];s.listener&&s.listener.event&&s.listener.event(s,o);for(let a=0;a<t.length;a++){let c=t[a];c.event&&c.event(s,o)}break}}this.clear(),this.drainDisabled=!1}clear(){this.objects.length=0}}var Ot;(function(r){r[r.start=0]="start",r[r.interrupt=1]="interrupt",r[r.end=2]="end",r[r.dispose=3]="dispose",r[r.complete=4]="complete",r[r.event=5]="event"})(Ot||(Ot={}));const Ma=0,Pl=1,Il=2,Sa=3,M0=4,Dl=1,S0=2;class w0{constructor(e){v(this,"skeletonData");v(this,"animationToMixTime",{});v(this,"defaultMix",0);if(!e)throw new Error("skeletonData cannot be null.");this.skeletonData=e}setMix(e,t,i){let n=this.skeletonData.findAnimation(e);if(!n)throw new Error("Animation not found: "+e);let s=this.skeletonData.findAnimation(t);if(!s)throw new Error("Animation not found: "+t);this.setMixWith(n,s,i)}setMixWith(e,t,i){if(!e)throw new Error("from cannot be null.");if(!t)throw new Error("to cannot be null.");let n=e.name+"."+t.name;this.animationToMixTime[n]=i}getMix(e,t){let i=e.name+"."+t.name,n=this.animationToMixTime[i];return n===void 0?this.defaultMix:n}}class to extends hi{constructor(t){super(t);v(this,"color",new Je(1,1,1,1))}copy(){let t=new to(this.name);return this.copyTo(t),t.color.setFromColor(this.color),t}}class Is extends hi{constructor(t){super(t);v(this,"endSlot",null);v(this,"color",new Je(.2275,.2275,.8078,1))}copy(){let t=new Is(this.name);return this.copyTo(t),t.endSlot=this.endSlot,t.color.setFromColor(this.color),t}}class y0{constructor(e){v(this,"_image");this._image=e}getImage(){return this._image}}var Et;(function(r){r[r.Nearest=9728]="Nearest",r[r.Linear=9729]="Linear",r[r.MipMap=9987]="MipMap",r[r.MipMapNearestNearest=9984]="MipMapNearestNearest",r[r.MipMapLinearNearest=9985]="MipMapLinearNearest",r[r.MipMapNearestLinear=9986]="MipMapNearestLinear",r[r.MipMapLinearLinear=9987]="MipMapLinearLinear"})(Et||(Et={}));var Ii;(function(r){r[r.MirroredRepeat=33648]="MirroredRepeat",r[r.ClampToEdge=33071]="ClampToEdge",r[r.Repeat=10497]="Repeat"})(Ii||(Ii={}));class E0{constructor(){v(this,"texture");v(this,"u",0);v(this,"v",0);v(this,"u2",0);v(this,"v2",0);v(this,"width",0);v(this,"height",0);v(this,"degrees",0);v(this,"offsetX",0);v(this,"offsetY",0);v(this,"originalWidth",0);v(this,"originalHeight",0)}}class b0{constructor(e){v(this,"pages",new Array);v(this,"regions",new Array);let t=new T0(e),i=new Array(4),n={};n.size=h=>{h.width=parseInt(i[1]),h.height=parseInt(i[2])},n.format=()=>{},n.filter=h=>{h.minFilter=ge.enumValue(Et,i[1]),h.magFilter=ge.enumValue(Et,i[2])},n.repeat=h=>{i[1].indexOf("x")!=-1&&(h.uWrap=Ii.Repeat),i[1].indexOf("y")!=-1&&(h.vWrap=Ii.Repeat)},n.pma=h=>{h.pma=i[1]=="true"};var s={};s.xy=h=>{h.x=parseInt(i[1]),h.y=parseInt(i[2])},s.size=h=>{h.width=parseInt(i[1]),h.height=parseInt(i[2])},s.bounds=h=>{h.x=parseInt(i[1]),h.y=parseInt(i[2]),h.width=parseInt(i[3]),h.height=parseInt(i[4])},s.offset=h=>{h.offsetX=parseInt(i[1]),h.offsetY=parseInt(i[2])},s.orig=h=>{h.originalWidth=parseInt(i[1]),h.originalHeight=parseInt(i[2])},s.offsets=h=>{h.offsetX=parseInt(i[1]),h.offsetY=parseInt(i[2]),h.originalWidth=parseInt(i[3]),h.originalHeight=parseInt(i[4])},s.rotate=h=>{let d=i[1];d=="true"?h.degrees=90:d!="false"&&(h.degrees=parseInt(d))},s.index=h=>{h.index=parseInt(i[1])};let o=t.readLine();for(;o&&o.trim().length==0;)o=t.readLine();for(;!(!o||o.trim().length==0||t.readEntry(i,o)==0);)o=t.readLine();let a=null,c=null,l=null;for(;o!==null;)if(o.trim().length==0)a=null,o=t.readLine();else if(a){let h=new Fc(a,o);for(;;){let d=t.readEntry(i,o=t.readLine());if(d==0)break;let u=s[i[0]];if(u)u(h);else{c||(c=[]),l||(l=[]),c.push(i[0]);let f=[];for(let g=0;g<d;g++)f.push(parseInt(i[g+1]));l.push(f)}}h.originalWidth==0&&h.originalHeight==0&&(h.originalWidth=h.width,h.originalHeight=h.height),c&&c.length>0&&l&&l.length>0&&(h.names=c,h.values=l,c=null,l=null),h.u=h.x/a.width,h.v=h.y/a.height,h.degrees==90?(h.u2=(h.x+h.height)/a.width,h.v2=(h.y+h.width)/a.height):(h.u2=(h.x+h.width)/a.width,h.v2=(h.y+h.height)/a.height),this.regions.push(h)}else{for(a=new A0(o.trim());t.readEntry(i,o=t.readLine())!=0;){let h=n[i[0]];h&&h(a)}this.pages.push(a)}}findRegion(e){for(let t=0;t<this.regions.length;t++)if(this.regions[t].name==e)return this.regions[t];return null}setTextures(e,t=""){for(let i of this.pages)i.setTexture(e.get(t+i.name))}dispose(){var e;for(let t=0;t<this.pages.length;t++)(e=this.pages[t].texture)==null||e.dispose()}}class T0{constructor(e){v(this,"lines");v(this,"index",0);this.lines=e.split(/\r\n|\r|\n/)}readLine(){return this.index>=this.lines.length?null:this.lines[this.index++]}readEntry(e,t){if(!t||(t=t.trim(),t.length==0))return 0;let i=t.indexOf(":");if(i==-1)return 0;e[0]=t.substr(0,i).trim();for(let n=1,s=i+1;;n++){let o=t.indexOf(",",s);if(o==-1)return e[n]=t.substr(s).trim(),n;if(e[n]=t.substr(s,o-s).trim(),s=o+1,n==4)return 4}}}class A0{constructor(e){v(this,"name");v(this,"minFilter",Et.Nearest);v(this,"magFilter",Et.Nearest);v(this,"uWrap",Ii.ClampToEdge);v(this,"vWrap",Ii.ClampToEdge);v(this,"texture",null);v(this,"width",0);v(this,"height",0);v(this,"pma",!1);v(this,"regions",new Array);this.name=e}setTexture(e){this.texture=e,e.setFilters(this.minFilter,this.magFilter),e.setWraps(this.uWrap,this.vWrap);for(let t of this.regions)t.texture=e}}class Fc extends E0{constructor(t,i){super();v(this,"page");v(this,"name");v(this,"x",0);v(this,"y",0);v(this,"offsetX",0);v(this,"offsetY",0);v(this,"originalWidth",0);v(this,"originalHeight",0);v(this,"index",0);v(this,"degrees",0);v(this,"names",null);v(this,"values",null);this.page=t,this.name=i,t.regions.push(this)}}class Rn extends hi{constructor(t,i){super(t);v(this,"region",null);v(this,"path");v(this,"regionUVs",[]);v(this,"uvs",[]);v(this,"triangles",[]);v(this,"color",new Je(1,1,1,1));v(this,"width",0);v(this,"height",0);v(this,"hullLength",0);v(this,"edges",[]);v(this,"parentMesh",null);v(this,"sequence",null);v(this,"tempColor",new Je(0,0,0,0));this.path=i}updateRegion(){if(!this.region)throw new Error("Region not set.");let t=this.regionUVs;(!this.uvs||this.uvs.length!=t.length)&&(this.uvs=ge.newFloatArray(t.length));let i=this.uvs,n=this.uvs.length,s=this.region.u,o=this.region.v,a=0,c=0;if(this.region instanceof Fc){let l=this.region,h=l.page,d=h.width,u=h.height;switch(l.degrees){case 90:s-=(l.originalHeight-l.offsetY-l.height)/d,o-=(l.originalWidth-l.offsetX-l.width)/u,a=l.originalHeight/d,c=l.originalWidth/u;for(let f=0;f<n;f+=2)i[f]=s+t[f+1]*a,i[f+1]=o+(1-t[f])*c;return;case 180:s-=(l.originalWidth-l.offsetX-l.width)/d,o-=l.offsetY/u,a=l.originalWidth/d,c=l.originalHeight/u;for(let f=0;f<n;f+=2)i[f]=s+(1-t[f])*a,i[f+1]=o+(1-t[f+1])*c;return;case 270:s-=l.offsetY/d,o-=l.offsetX/u,a=l.originalHeight/d,c=l.originalWidth/u;for(let f=0;f<n;f+=2)i[f]=s+(1-t[f+1])*a,i[f+1]=o+t[f]*c;return}s-=l.offsetX/d,o-=(l.originalHeight-l.offsetY-l.height)/u,a=l.originalWidth/d,c=l.originalHeight/u}else this.region?(a=this.region.u2-s,c=this.region.v2-o):(s=o=0,a=c=1);for(let l=0;l<n;l+=2)i[l]=s+t[l]*a,i[l+1]=o+t[l+1]*c}getParentMesh(){return this.parentMesh}setParentMesh(t){this.parentMesh=t,t&&(this.bones=t.bones,this.vertices=t.vertices,this.worldVerticesLength=t.worldVerticesLength,this.regionUVs=t.regionUVs,this.triangles=t.triangles,this.hullLength=t.hullLength,this.worldVerticesLength=t.worldVerticesLength)}copy(){if(this.parentMesh)return this.newLinkedMesh();let t=new Rn(this.name,this.path);return t.region=this.region,t.color.setFromColor(this.color),this.copyTo(t),t.regionUVs=new Array(this.regionUVs.length),ge.arrayCopy(this.regionUVs,0,t.regionUVs,0,this.regionUVs.length),t.uvs=new Array(this.uvs.length),ge.arrayCopy(this.uvs,0,t.uvs,0,this.uvs.length),t.triangles=new Array(this.triangles.length),ge.arrayCopy(this.triangles,0,t.triangles,0,this.triangles.length),t.hullLength=this.hullLength,t.sequence=this.sequence!=null?this.sequence.copy():null,this.edges&&(t.edges=new Array(this.edges.length),ge.arrayCopy(this.edges,0,t.edges,0,this.edges.length)),t.width=this.width,t.height=this.height,t}computeWorldVertices(t,i,n,s,o,a){this.sequence!=null&&this.sequence.apply(t,this),super.computeWorldVertices(t,i,n,s,o,a)}newLinkedMesh(){let t=new Rn(this.name,this.path);return t.region=this.region,t.color.setFromColor(this.color),t.timelineAttachment=this.timelineAttachment,t.setParentMesh(this.parentMesh?this.parentMesh:this),t.region!=null&&t.updateRegion(),t}}class ds extends hi{constructor(t){super(t);v(this,"lengths",[]);v(this,"closed",!1);v(this,"constantSpeed",!1);v(this,"color",new Je(1,1,1,1))}copy(){let t=new ds(this.name);return this.copyTo(t),t.lengths=new Array(this.lengths.length),ge.arrayCopy(this.lengths,0,t.lengths,0,this.lengths.length),t.closed=closed,t.constantSpeed=this.constantSpeed,t.color.setFromColor(this.color),t}}class io extends hi{constructor(t){super(t);v(this,"x",0);v(this,"y",0);v(this,"rotation",0);v(this,"color",new Je(.38,.94,0,1))}computeWorldPosition(t,i){return i.x=this.x*t.a+this.y*t.b+t.worldX,i.y=this.x*t.c+this.y*t.d+t.worldY,i}computeWorldRotation(t){const i=this.rotation*ce.degRad,n=Math.cos(i),s=Math.sin(i),o=n*t.a+s*t.b,a=n*t.c+s*t.d;return ce.atan2Deg(a,o)}copy(){let t=new io(this.name);return t.x=this.x,t.y=this.y,t.rotation=this.rotation,t.color.setFromColor(this.color),t}}const $e=class $e extends Uc{constructor(t,i){super(t);v(this,"x",0);v(this,"y",0);v(this,"scaleX",1);v(this,"scaleY",1);v(this,"rotation",0);v(this,"width",0);v(this,"height",0);v(this,"color",new Je(1,1,1,1));v(this,"path");v(this,"region",null);v(this,"sequence",null);v(this,"offset",ge.newFloatArray(8));v(this,"uvs",ge.newFloatArray(8));v(this,"tempColor",new Je(1,1,1,1));this.path=i}updateRegion(){if(!this.region)throw new Error("Region not set.");let t=this.region,i=this.uvs;if(t==null){i[0]=0,i[1]=0,i[2]=0,i[3]=1,i[4]=1,i[5]=1,i[6]=1,i[7]=0;return}let n=this.width/this.region.originalWidth*this.scaleX,s=this.height/this.region.originalHeight*this.scaleY,o=-this.width/2*this.scaleX+this.region.offsetX*n,a=-this.height/2*this.scaleY+this.region.offsetY*s,c=o+this.region.width*n,l=a+this.region.height*s,h=this.rotation*ce.degRad,d=Math.cos(h),u=Math.sin(h),f=this.x,g=this.y,_=o*d+f,p=o*u,m=a*d+g,w=a*u,x=c*d+f,M=c*u,b=l*d+g,S=l*u,E=this.offset;E[0]=_-w,E[1]=m+p,E[2]=_-S,E[3]=b+p,E[4]=x-S,E[5]=b+M,E[6]=x-w,E[7]=m+M,t.degrees==90?(i[0]=t.u2,i[1]=t.v2,i[2]=t.u,i[3]=t.v2,i[4]=t.u,i[5]=t.v,i[6]=t.u2,i[7]=t.v):(i[0]=t.u,i[1]=t.v2,i[2]=t.u,i[3]=t.v,i[4]=t.u2,i[5]=t.v,i[6]=t.u2,i[7]=t.v2)}computeWorldVertices(t,i,n,s){this.sequence!=null&&this.sequence.apply(t,this);let o=t.bone,a=this.offset,c=o.worldX,l=o.worldY,h=o.a,d=o.b,u=o.c,f=o.d,g=0,_=0;g=a[0],_=a[1],i[n]=g*h+_*d+c,i[n+1]=g*u+_*f+l,n+=s,g=a[2],_=a[3],i[n]=g*h+_*d+c,i[n+1]=g*u+_*f+l,n+=s,g=a[4],_=a[5],i[n]=g*h+_*d+c,i[n+1]=g*u+_*f+l,n+=s,g=a[6],_=a[7],i[n]=g*h+_*d+c,i[n+1]=g*u+_*f+l}copy(){let t=new $e(this.name,this.path);return t.region=this.region,t.x=this.x,t.y=this.y,t.scaleX=this.scaleX,t.scaleY=this.scaleY,t.rotation=this.rotation,t.width=this.width,t.height=this.height,ge.arrayCopy(this.uvs,0,t.uvs,0,8),ge.arrayCopy(this.offset,0,t.offset,0,8),t.color.setFromColor(this.color),t.sequence=this.sequence!=null?this.sequence.copy():null,t}};v($e,"X1",0),v($e,"Y1",1),v($e,"C1R",2),v($e,"C1G",3),v($e,"C1B",4),v($e,"C1A",5),v($e,"U1",6),v($e,"V1",7),v($e,"X2",8),v($e,"Y2",9),v($e,"C2R",10),v($e,"C2G",11),v($e,"C2B",12),v($e,"C2A",13),v($e,"U2",14),v($e,"V2",15),v($e,"X3",16),v($e,"Y3",17),v($e,"C3R",18),v($e,"C3G",19),v($e,"C3B",20),v($e,"C3A",21),v($e,"U3",22),v($e,"V3",23),v($e,"X4",24),v($e,"Y4",25),v($e,"C4R",26),v($e,"C4G",27),v($e,"C4B",28),v($e,"C4A",29),v($e,"U4",30),v($e,"V4",31);let Cs=$e;class Ms{constructor(e){v(this,"atlas");this.atlas=e}loadSequence(e,t,i){let n=i.regions;for(let s=0,o=n.length;s<o;s++){let a=i.getPath(t,s),c=this.atlas.findRegion(a);if(c==null)throw new Error("Region not found in atlas: "+a+" (sequence: "+e+")");n[s]=c}}newRegionAttachment(e,t,i,n){let s=new Cs(t,i);if(n!=null)this.loadSequence(t,i,n);else{let o=this.atlas.findRegion(i);if(!o)throw new Error("Region not found in atlas: "+i+" (region attachment: "+t+")");s.region=o}return s}newMeshAttachment(e,t,i,n){let s=new Rn(t,i);if(n!=null)this.loadSequence(t,i,n);else{let o=this.atlas.findRegion(i);if(!o)throw new Error("Region not found in atlas: "+i+" (mesh attachment: "+t+")");s.region=o}return s}newBoundingBoxAttachment(e,t){return new to(t)}newPathAttachment(e,t){return new ds(t)}newPointAttachment(e,t){return new io(t)}newClippingAttachment(e,t){return new Is(t)}}class C0{constructor(e,t,i){v(this,"index",0);v(this,"name");v(this,"parent",null);v(this,"length",0);v(this,"x",0);v(this,"y",0);v(this,"rotation",0);v(this,"scaleX",1);v(this,"scaleY",1);v(this,"shearX",0);v(this,"shearY",0);v(this,"inherit",ut.Normal);v(this,"skinRequired",!1);v(this,"color",new Je);v(this,"icon");v(this,"visible",!1);if(e<0)throw new Error("index must be >= 0.");if(!t)throw new Error("name cannot be null.");this.index=e,this.name=t,this.parent=i}}var ut;(function(r){r[r.Normal=0]="Normal",r[r.OnlyTranslation=1]="OnlyTranslation",r[r.NoRotationOrReflection=2]="NoRotationOrReflection",r[r.NoScale=3]="NoScale",r[r.NoScaleOrReflection=4]="NoScaleOrReflection"})(ut||(ut={}));class Ul{constructor(e,t,i){v(this,"data");v(this,"skeleton");v(this,"parent",null);v(this,"children",new Array);v(this,"x",0);v(this,"y",0);v(this,"rotation",0);v(this,"scaleX",0);v(this,"scaleY",0);v(this,"shearX",0);v(this,"shearY",0);v(this,"ax",0);v(this,"ay",0);v(this,"arotation",0);v(this,"ascaleX",0);v(this,"ascaleY",0);v(this,"ashearX",0);v(this,"ashearY",0);v(this,"a",0);v(this,"b",0);v(this,"c",0);v(this,"d",0);v(this,"worldY",0);v(this,"worldX",0);v(this,"inherit",ut.Normal);v(this,"sorted",!1);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.skeleton=t,this.parent=i,this.setToSetupPose()}isActive(){return this.active}update(e){this.updateWorldTransformWith(this.ax,this.ay,this.arotation,this.ascaleX,this.ascaleY,this.ashearX,this.ashearY)}updateWorldTransform(){this.updateWorldTransformWith(this.x,this.y,this.rotation,this.scaleX,this.scaleY,this.shearX,this.shearY)}updateWorldTransformWith(e,t,i,n,s,o,a){this.ax=e,this.ay=t,this.arotation=i,this.ascaleX=n,this.ascaleY=s,this.ashearX=o,this.ashearY=a;let c=this.parent;if(!c){let f=this.skeleton;const g=f.scaleX,_=f.scaleY,p=(i+o)*ce.degRad,m=(i+90+a)*ce.degRad;this.a=Math.cos(p)*n*g,this.b=Math.cos(m)*s*g,this.c=Math.sin(p)*n*_,this.d=Math.sin(m)*s*_,this.worldX=e*g+f.x,this.worldY=t*_+f.y;return}let l=c.a,h=c.b,d=c.c,u=c.d;switch(this.worldX=l*e+h*t+c.worldX,this.worldY=d*e+u*t+c.worldY,this.inherit){case ut.Normal:{const f=(i+o)*ce.degRad,g=(i+90+a)*ce.degRad,_=Math.cos(f)*n,p=Math.cos(g)*s,m=Math.sin(f)*n,w=Math.sin(g)*s;this.a=l*_+h*m,this.b=l*p+h*w,this.c=d*_+u*m,this.d=d*p+u*w;return}case ut.OnlyTranslation:{const f=(i+o)*ce.degRad,g=(i+90+a)*ce.degRad;this.a=Math.cos(f)*n,this.b=Math.cos(g)*s,this.c=Math.sin(f)*n,this.d=Math.sin(g)*s;break}case ut.NoRotationOrReflection:{let f=1/this.skeleton.scaleX,g=1/this.skeleton.scaleY;l*=f,d*=g;let _=l*l+d*d,p=0;_>1e-4?(_=Math.abs(l*u*g-h*f*d)/_,h=d*_,u=l*_,p=Math.atan2(d,l)*ce.radDeg):(l=0,d=0,p=90-Math.atan2(u,h)*ce.radDeg);const m=(i+o-p)*ce.degRad,w=(i+a-p+90)*ce.degRad,x=Math.cos(m)*n,M=Math.cos(w)*s,b=Math.sin(m)*n,S=Math.sin(w)*s;this.a=l*x-h*b,this.b=l*M-h*S,this.c=d*x+u*b,this.d=d*M+u*S;break}case ut.NoScale:case ut.NoScaleOrReflection:{i*=ce.degRad;const f=Math.cos(i),g=Math.sin(i);let _=(l*f+h*g)/this.skeleton.scaleX,p=(d*f+u*g)/this.skeleton.scaleY,m=Math.sqrt(_*_+p*p);m>1e-5&&(m=1/m),_*=m,p*=m,m=Math.sqrt(_*_+p*p),this.inherit==ut.NoScale&&l*u-h*d<0!=(this.skeleton.scaleX<0!=this.skeleton.scaleY<0)&&(m=-m),i=Math.PI/2+Math.atan2(p,_);const w=Math.cos(i)*m,x=Math.sin(i)*m;o*=ce.degRad,a=(90+a)*ce.degRad;const M=Math.cos(o)*n,b=Math.cos(a)*s,S=Math.sin(o)*n,E=Math.sin(a)*s;this.a=_*M+w*S,this.b=_*b+w*E,this.c=p*M+x*S,this.d=p*b+x*E;break}}this.a*=this.skeleton.scaleX,this.b*=this.skeleton.scaleX,this.c*=this.skeleton.scaleY,this.d*=this.skeleton.scaleY}setToSetupPose(){let e=this.data;this.x=e.x,this.y=e.y,this.rotation=e.rotation,this.scaleX=e.scaleX,this.scaleY=e.scaleY,this.shearX=e.shearX,this.shearY=e.shearY,this.inherit=e.inherit}updateAppliedTransform(){let e=this.parent;if(!e){this.ax=this.worldX-this.skeleton.x,this.ay=this.worldY-this.skeleton.y,this.arotation=Math.atan2(this.c,this.a)*ce.radDeg,this.ascaleX=Math.sqrt(this.a*this.a+this.c*this.c),this.ascaleY=Math.sqrt(this.b*this.b+this.d*this.d),this.ashearX=0,this.ashearY=Math.atan2(this.a*this.b+this.c*this.d,this.a*this.d-this.b*this.c)*ce.radDeg;return}let t=e.a,i=e.b,n=e.c,s=e.d,o=1/(t*s-i*n),a=s*o,c=i*o,l=n*o,h=t*o,d=this.worldX-e.worldX,u=this.worldY-e.worldY;this.ax=d*a-u*c,this.ay=u*h-d*l;let f,g,_,p;if(this.inherit==ut.OnlyTranslation)f=this.a,g=this.b,_=this.c,p=this.d;else{switch(this.inherit){case ut.NoRotationOrReflection:{let b=Math.abs(t*s-i*n)/(t*t+n*n);i=-n*this.skeleton.scaleX*b/this.skeleton.scaleY,s=t*this.skeleton.scaleY*b/this.skeleton.scaleX,o=1/(t*s-i*n),a=s*o,c=i*o;break}case ut.NoScale:case ut.NoScaleOrReflection:let m=ce.cosDeg(this.rotation),w=ce.sinDeg(this.rotation);t=(t*m+i*w)/this.skeleton.scaleX,n=(n*m+s*w)/this.skeleton.scaleY;let x=Math.sqrt(t*t+n*n);x>1e-5&&(x=1/x),t*=x,n*=x,x=Math.sqrt(t*t+n*n),this.inherit==ut.NoScale&&o<0!=(this.skeleton.scaleX<0!=this.skeleton.scaleY<0)&&(x=-x);let M=ce.PI/2+Math.atan2(n,t);i=Math.cos(M)*x,s=Math.sin(M)*x,o=1/(t*s-i*n),a=s*o,c=i*o,l=n*o,h=t*o}f=a*this.a-c*this.c,g=a*this.b-c*this.d,_=h*this.c-l*this.a,p=h*this.d-l*this.b}if(this.ashearX=0,this.ascaleX=Math.sqrt(f*f+_*_),this.ascaleX>1e-4){let m=f*p-g*_;this.ascaleY=m/this.ascaleX,this.ashearY=-Math.atan2(f*g+_*p,m)*ce.radDeg,this.arotation=Math.atan2(_,f)*ce.radDeg}else this.ascaleX=0,this.ascaleY=Math.sqrt(g*g+p*p),this.ashearY=0,this.arotation=90-Math.atan2(p,g)*ce.radDeg}getWorldRotationX(){return Math.atan2(this.c,this.a)*ce.radDeg}getWorldRotationY(){return Math.atan2(this.d,this.b)*ce.radDeg}getWorldScaleX(){return Math.sqrt(this.a*this.a+this.c*this.c)}getWorldScaleY(){return Math.sqrt(this.b*this.b+this.d*this.d)}worldToLocal(e){let t=1/(this.a*this.d-this.b*this.c),i=e.x-this.worldX,n=e.y-this.worldY;return e.x=i*this.d*t-n*this.b*t,e.y=n*this.a*t-i*this.c*t,e}localToWorld(e){let t=e.x,i=e.y;return e.x=t*this.a+i*this.b+this.worldX,e.y=t*this.c+i*this.d+this.worldY,e}worldToParent(e){if(e==null)throw new Error("world cannot be null.");return this.parent==null?e:this.parent.worldToLocal(e)}parentToWorld(e){if(e==null)throw new Error("world cannot be null.");return this.parent==null?e:this.parent.localToWorld(e)}worldToLocalRotation(e){let t=ce.sinDeg(e),i=ce.cosDeg(e);return Math.atan2(this.a*t-this.c*i,this.d*i-this.b*t)*ce.radDeg+this.rotation-this.shearX}localToWorldRotation(e){e-=this.rotation-this.shearX;let t=ce.sinDeg(e),i=ce.cosDeg(e);return Math.atan2(i*this.c+t*this.d,i*this.a+t*this.b)*ce.radDeg}rotateWorld(e){e*=ce.degRad;const t=Math.sin(e),i=Math.cos(e),n=this.a,s=this.b;this.a=i*n-t*this.c,this.b=i*s-t*this.d,this.c=t*n+i*this.c,this.d=t*s+i*this.d}}class Ur{constructor(e,t,i){v(this,"name");v(this,"order");v(this,"skinRequired");this.name=e,this.order=t,this.skinRequired=i}}class R0{constructor(e,t="",i=new Oc){v(this,"pathPrefix","");v(this,"textureLoader");v(this,"downloader");v(this,"assets",{});v(this,"errors",{});v(this,"toLoad",0);v(this,"loaded",0);this.textureLoader=e,this.pathPrefix=t,this.downloader=i}start(e){return this.toLoad++,this.pathPrefix+e}success(e,t,i){this.toLoad--,this.loaded++,this.assets[t]=i,e&&e(t,i)}error(e,t,i){this.toLoad--,this.loaded++,this.errors[t]=i,e&&e(t,i)}loadAll(){return new Promise((t,i)=>{let n=()=>{if(this.isLoadingComplete()){this.hasErrors()?i(this.errors):t(this);return}requestAnimationFrame(n)};requestAnimationFrame(n)})}setRawDataURI(e,t){this.downloader.rawDataUris[this.pathPrefix+e]=t}loadBinary(e,t=()=>{},i=()=>{}){e=this.start(e),this.downloader.downloadBinary(e,n=>{this.success(t,e,n)},(n,s)=>{this.error(i,e,`Couldn't load binary ${e}: status ${n}, ${s}`)})}loadText(e,t=()=>{},i=()=>{}){e=this.start(e),this.downloader.downloadText(e,n=>{this.success(t,e,n)},(n,s)=>{this.error(i,e,`Couldn't load text ${e}: status ${n}, ${s}`)})}loadJson(e,t=()=>{},i=()=>{}){e=this.start(e),this.downloader.downloadJson(e,n=>{this.success(t,e,n)},(n,s)=>{this.error(i,e,`Couldn't load JSON ${e}: status ${n}, ${s}`)})}loadTexture(e,t=()=>{},i=()=>{}){if(e=this.start(e),!!!(typeof window<"u"&&typeof navigator<"u"&&window.document))fetch(e,{mode:"cors"}).then(o=>o.ok?o.blob():(this.error(i,e,`Couldn't load image: ${e}`),null)).then(o=>o?createImageBitmap(o,{premultiplyAlpha:"none",colorSpaceConversion:"none"}):null).then(o=>{o&&this.success(t,e,this.textureLoader(o))});else{let o=new Image;o.crossOrigin="anonymous",o.onload=()=>{this.success(t,e,this.textureLoader(o))},o.onerror=()=>{this.error(i,e,`Couldn't load image: ${e}`)},this.downloader.rawDataUris[e]&&(e=this.downloader.rawDataUris[e]),o.src=e}}loadTextureAtlas(e,t=()=>{},i=()=>{},n){let s=e.lastIndexOf("/"),o=s>=0?e.substring(0,s+1):"";e=this.start(e),this.downloader.downloadText(e,a=>{try{let c=new b0(a),l=c.pages.length,h=!1;for(let d of c.pages)this.loadTexture(n?n[d.name]:o+d.name,(u,f)=>{h||(d.setTexture(f),--l==0&&this.success(t,e,c))},(u,f)=>{h||this.error(i,e,`Couldn't load texture atlas ${e} page image: ${u}`),h=!0})}catch(c){this.error(i,e,`Couldn't parse texture atlas ${e}: ${c.message}`)}},(a,c)=>{this.error(i,e,`Couldn't load texture atlas ${e}: status ${a}, ${c}`)})}get(e){return this.assets[this.pathPrefix+e]}require(e){e=this.pathPrefix+e;let t=this.assets[e];if(t)return t;let i=this.errors[e];throw Error("Asset not found: "+e+(i?`
`+i:""))}remove(e){e=this.pathPrefix+e;let t=this.assets[e];return t.dispose&&t.dispose(),delete this.assets[e],t}removeAll(){for(let e in this.assets){let t=this.assets[e];t.dispose&&t.dispose()}this.assets={}}isLoadingComplete(){return this.toLoad==0}getToLoad(){return this.toLoad}getLoaded(){return this.loaded}dispose(){this.removeAll()}hasErrors(){return Object.keys(this.errors).length>0}getErrors(){return this.errors}}class Oc{constructor(){v(this,"callbacks",{});v(this,"rawDataUris",{})}dataUriToString(e){if(!e.startsWith("data:"))throw new Error("Not a data URI.");let t=e.indexOf("base64,");return t!=-1?(t+=7,atob(e.substr(t))):e.substr(e.indexOf(",")+1)}base64ToUint8Array(e){for(var t=window.atob(e),i=t.length,n=new Uint8Array(i),s=0;s<i;s++)n[s]=t.charCodeAt(s);return n}dataUriToUint8Array(e){if(!e.startsWith("data:"))throw new Error("Not a data URI.");let t=e.indexOf("base64,");if(t==-1)throw new Error("Not a binary data URI.");return t+=7,this.base64ToUint8Array(e.substr(t))}downloadText(e,t,i){if(this.start(e,t,i))return;if(this.rawDataUris[e]){try{let o=this.rawDataUris[e];this.finish(e,200,this.dataUriToString(o))}catch(o){this.finish(e,400,JSON.stringify(o))}return}let n=new XMLHttpRequest;n.overrideMimeType("text/html"),n.open("GET",e,!0);let s=()=>{this.finish(e,n.status,n.responseText)};n.onload=s,n.onerror=s,n.send()}downloadJson(e,t,i){this.downloadText(e,n=>{t(JSON.parse(n))},i)}downloadBinary(e,t,i){if(this.start(e,t,i))return;if(this.rawDataUris[e]){try{let o=this.rawDataUris[e];this.finish(e,200,this.dataUriToUint8Array(o))}catch(o){this.finish(e,400,JSON.stringify(o))}return}let n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer";let s=()=>{this.finish(e,n.status,n.response)};n.onload=()=>{n.status==200||n.status==0?this.finish(e,200,new Uint8Array(n.response)):s()},n.onerror=s,n.send()}start(e,t,i){let n=this.callbacks[e];try{if(n)return!0;this.callbacks[e]=n=[]}finally{n.push(t,i)}}finish(e,t,i){let n=this.callbacks[e];delete this.callbacks[e];let s=t==200||t==0?[i]:[t,i];for(let o=s.length-1,a=n.length;o<a;o+=2)n[o].apply(null,s)}}class L0{constructor(e,t){v(this,"data");v(this,"intValue",0);v(this,"floatValue",0);v(this,"stringValue",null);v(this,"time",0);v(this,"volume",0);v(this,"balance",0);if(!t)throw new Error("data cannot be null.");this.time=e,this.data=t}}class P0{constructor(e){v(this,"name");v(this,"intValue",0);v(this,"floatValue",0);v(this,"stringValue",null);v(this,"audioPath",null);v(this,"volume",0);v(this,"balance",0);this.name=e}}class I0{constructor(e,t){v(this,"data");v(this,"bones");v(this,"target");v(this,"bendDirection",0);v(this,"compress",!1);v(this,"stretch",!1);v(this,"mix",1);v(this,"softness",0);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let n=0;n<e.bones.length;n++){let s=t.findBone(e.bones[n].name);if(!s)throw new Error(`Couldn't find bone ${e.bones[n].name}`);this.bones.push(s)}let i=t.findBone(e.target.name);if(!i)throw new Error(`Couldn't find bone ${e.target.name}`);this.target=i,this.mix=e.mix,this.softness=e.softness,this.bendDirection=e.bendDirection,this.compress=e.compress,this.stretch=e.stretch}isActive(){return this.active}setToSetupPose(){const e=this.data;this.mix=e.mix,this.softness=e.softness,this.bendDirection=e.bendDirection,this.compress=e.compress,this.stretch=e.stretch}update(e){if(this.mix==0)return;let t=this.target,i=this.bones;switch(i.length){case 1:this.apply1(i[0],t.worldX,t.worldY,this.compress,this.stretch,this.data.uniform,this.mix);break;case 2:this.apply2(i[0],i[1],t.worldX,t.worldY,this.bendDirection,this.stretch,this.data.uniform,this.softness,this.mix);break}}apply1(e,t,i,n,s,o,a){let c=e.parent;if(!c)throw new Error("IK bone must have parent.");let l=c.a,h=c.b,d=c.c,u=c.d,f=-e.ashearX-e.arotation,g=0,_=0;switch(e.inherit){case ut.OnlyTranslation:g=(t-e.worldX)*ce.signum(e.skeleton.scaleX),_=(i-e.worldY)*ce.signum(e.skeleton.scaleY);break;case ut.NoRotationOrReflection:let w=Math.abs(l*u-h*d)/Math.max(1e-4,l*l+d*d),x=l/e.skeleton.scaleX,M=d/e.skeleton.scaleY;h=-M*w*e.skeleton.scaleX,u=x*w*e.skeleton.scaleY,f+=Math.atan2(M,x)*ce.radDeg;default:let b=t-c.worldX,S=i-c.worldY,E=l*u-h*d;Math.abs(E)<=1e-4?(g=0,_=0):(g=(b*u-S*h)/E-e.ax,_=(S*l-b*d)/E-e.ay)}f+=Math.atan2(_,g)*ce.radDeg,e.ascaleX<0&&(f+=180),f>180?f-=360:f<-180&&(f+=360);let p=e.ascaleX,m=e.ascaleY;if(n||s){switch(e.inherit){case ut.NoScale:case ut.NoScaleOrReflection:g=t-e.worldX,_=i-e.worldY}const w=e.data.length*p;if(w>1e-4){const x=g*g+_*_;if(n&&x<w*w||s&&x>w*w){const M=(Math.sqrt(x)/w-1)*a+1;p*=M,o&&(m*=M)}}}e.updateWorldTransformWith(e.ax,e.ay,e.arotation+f*a,p,m,e.ashearX,e.ashearY)}apply2(e,t,i,n,s,o,a,c,l){if(e.inherit!=ut.Normal||t.inherit!=ut.Normal)return;let h=e.ax,d=e.ay,u=e.ascaleX,f=e.ascaleY,g=u,_=f,p=t.ascaleX,m=0,w=0,x=0;u<0?(u=-u,m=180,x=-1):(m=0,x=1),f<0&&(f=-f,x=-x),p<0?(p=-p,w=180):w=0;let M=t.ax,b=0,S=0,E=0,R=e.a,I=e.b,y=e.c,T=e.d,V=Math.abs(u-f)<=1e-4;!V||o?(b=0,S=R*M+e.worldX,E=y*M+e.worldY):(b=t.ay,S=R*M+I*b+e.worldX,E=y*M+T*b+e.worldY);let k=e.parent;if(!k)throw new Error("IK parent must itself have a parent.");R=k.a,I=k.b,y=k.c,T=k.d;let C=R*T-I*y,D=S-k.worldX,U=E-k.worldY;C=Math.abs(C)<=1e-4?0:1/C;let G=(D*T-U*I)*C-h,H=(U*R-D*y)*C-d,W=Math.sqrt(G*G+H*H),J=t.data.length*p,te,re;if(W<1e-4){this.apply1(e,i,n,!1,o,!1,l),t.updateWorldTransformWith(M,b,0,t.ascaleX,t.ascaleY,t.ashearX,t.ashearY);return}D=i-k.worldX,U=n-k.worldY;let ie=(D*T-U*I)*C-h,O=(U*R-D*y)*C-d,j=ie*ie+O*O;if(c!=0){c*=u*(p+1)*.5;let me=Math.sqrt(j),pe=me-W-J*u+c;if(pe>0){let Le=Math.min(1,pe/(c*2))-1;Le=(pe-c*(1-Le*Le))/me,ie-=Le*ie,O-=Le*O,j=ie*ie+O*O}}e:if(V){J*=u;let me=(j-W*W-J*J)/(2*W*J);me<-1?(me=-1,re=Math.PI*s):me>1?(me=1,re=0,o&&(R=(Math.sqrt(j)/(W+J)-1)*l+1,g*=R,a&&(_*=R))):re=Math.acos(me)*s,R=W+J*me,I=J*Math.sin(re),te=Math.atan2(O*R-ie*I,ie*R+O*I)}else{R=u*J,I=f*J;let me=R*R,pe=I*I,Le=Math.atan2(O,ie);y=pe*W*W+me*j-me*pe;let Te=-2*pe*W,B=pe-me;if(T=Te*Te-4*B*y,T>=0){let P=Math.sqrt(T);Te<0&&(P=-P),P=-(Te+P)*.5;let A=P/B,K=y/P,Q=Math.abs(A)<Math.abs(K)?A:K;if(A=j-Q*Q,A>=0){U=Math.sqrt(A)*s,te=Le-Math.atan2(U,Q),re=Math.atan2(U/f,(Q-W)/u);break e}}let pt=ce.PI,ye=W-R,Ue=ye*ye,Ce=0,Ye=0,De=W+R,Fe=De*De,lt=0;y=-R*W/(me-pe),y>=-1&&y<=1&&(y=Math.acos(y),D=R*Math.cos(y)+W,U=I*Math.sin(y),T=D*D+U*U,T<Ue&&(pt=y,Ue=T,ye=D,Ce=U),T>Fe&&(Ye=y,Fe=T,De=D,lt=U)),j<=(Ue+Fe)*.5?(te=Le-Math.atan2(Ce*s,ye),re=pt*s):(te=Le-Math.atan2(lt*s,De),re=Ye*s)}let fe=Math.atan2(b,M)*x,Se=e.arotation;te=(te-fe)*ce.radDeg+m-Se,te>180?te-=360:te<-180&&(te+=360),e.updateWorldTransformWith(h,d,Se+te*l,g,_,0,0),Se=t.arotation,re=((re+fe)*ce.radDeg-t.ashearX)*x+w-Se,re>180?re-=360:re<-180&&(re+=360),t.updateWorldTransformWith(M,b,Se+re*l,t.ascaleX,t.ascaleY,t.ashearX,t.ashearY)}}class D0 extends Ur{constructor(t){super(t,0,!1);v(this,"bones",new Array);v(this,"_target",null);v(this,"bendDirection",0);v(this,"compress",!1);v(this,"stretch",!1);v(this,"uniform",!1);v(this,"mix",0);v(this,"softness",0)}set target(t){this._target=t}get target(){if(this._target)return this._target;throw new Error("BoneData not set.")}}class U0 extends Ur{constructor(t){super(t,0,!1);v(this,"bones",new Array);v(this,"_target",null);v(this,"positionMode",tn.Fixed);v(this,"spacingMode",Ft.Fixed);v(this,"rotateMode",An.Chain);v(this,"offsetRotation",0);v(this,"position",0);v(this,"spacing",0);v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0)}set target(t){this._target=t}get target(){if(this._target)return this._target;throw new Error("SlotData not set.")}}var tn;(function(r){r[r.Fixed=0]="Fixed",r[r.Percent=1]="Percent"})(tn||(tn={}));var Ft;(function(r){r[r.Length=0]="Length",r[r.Fixed=1]="Fixed",r[r.Percent=2]="Percent",r[r.Proportional=3]="Proportional"})(Ft||(Ft={}));var An;(function(r){r[r.Tangent=0]="Tangent",r[r.Chain=1]="Chain",r[r.ChainScale=2]="ChainScale"})(An||(An={}));const Yt=class Yt{constructor(e,t){v(this,"data");v(this,"bones");v(this,"target");v(this,"position",0);v(this,"spacing",0);v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0);v(this,"spaces",new Array);v(this,"positions",new Array);v(this,"world",new Array);v(this,"curves",new Array);v(this,"lengths",new Array);v(this,"segments",new Array);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let n=0,s=e.bones.length;n<s;n++){let o=t.findBone(e.bones[n].name);if(!o)throw new Error(`Couldn't find bone ${e.bones[n].name}.`);this.bones.push(o)}let i=t.findSlot(e.target.name);if(!i)throw new Error(`Couldn't find target bone ${e.target.name}`);this.target=i,this.position=e.position,this.spacing=e.spacing,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY}isActive(){return this.active}setToSetupPose(){const e=this.data;this.position=e.position,this.spacing=e.spacing,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY}update(e){let t=this.target.getAttachment();if(!(t instanceof ds))return;let i=this.mixRotate,n=this.mixX,s=this.mixY;if(i==0&&n==0&&s==0)return;let o=this.data,a=o.rotateMode==An.Tangent,c=o.rotateMode==An.ChainScale,l=this.bones,h=l.length,d=a?h:h+1,u=ge.setArraySize(this.spaces,d),f=c?this.lengths=ge.setArraySize(this.lengths,h):[],g=this.spacing;switch(o.spacingMode){case Ft.Percent:if(c)for(let S=0,E=d-1;S<E;S++){let R=l[S],I=R.data.length,y=I*R.a,T=I*R.c;f[S]=Math.sqrt(y*y+T*T)}ge.arrayFill(u,1,d,g);break;case Ft.Proportional:let M=0;for(let S=0,E=d-1;S<E;){let R=l[S],I=R.data.length;if(I<Yt.epsilon)c&&(f[S]=0),u[++S]=g;else{let y=I*R.a,T=I*R.c,V=Math.sqrt(y*y+T*T);c&&(f[S]=V),u[++S]=V,M+=V}}if(M>0){M=d/M*g;for(let S=1;S<d;S++)u[S]*=M}break;default:let b=o.spacingMode==Ft.Length;for(let S=0,E=d-1;S<E;){let R=l[S],I=R.data.length;if(I<Yt.epsilon)c&&(f[S]=0),u[++S]=g;else{let y=I*R.a,T=I*R.c,V=Math.sqrt(y*y+T*T);c&&(f[S]=V),u[++S]=(b?I+g:g)*V/I}}}let _=this.computeWorldPositions(t,d,a),p=_[0],m=_[1],w=o.offsetRotation,x=!1;if(w==0)x=o.rotateMode==An.Chain;else{x=!1;let M=this.target.bone;w*=M.a*M.d-M.b*M.c>0?ce.degRad:-.01745329277777778}for(let M=0,b=3;M<h;M++,b+=3){let S=l[M];S.worldX+=(p-S.worldX)*n,S.worldY+=(m-S.worldY)*s;let E=_[b],R=_[b+1],I=E-p,y=R-m;if(c){let T=f[M];if(T!=0){let V=(Math.sqrt(I*I+y*y)/T-1)*i+1;S.a*=V,S.c*=V}}if(p=E,m=R,i>0){let T=S.a,V=S.b,k=S.c,C=S.d,D=0,U=0,G=0;if(a?D=_[b-1]:u[M+1]==0?D=_[b+2]:D=Math.atan2(y,I),D-=Math.atan2(k,T),x){U=Math.cos(D),G=Math.sin(D);let H=S.data.length;p+=(H*(U*T-G*k)-I)*i,m+=(H*(G*T+U*k)-y)*i}else D+=w;D>ce.PI?D-=ce.PI2:D<-3.1415927&&(D+=ce.PI2),D*=i,U=Math.cos(D),G=Math.sin(D),S.a=U*T-G*k,S.b=U*V-G*C,S.c=G*T+U*k,S.d=G*V+U*C}S.updateAppliedTransform()}}computeWorldPositions(e,t,i){let n=this.target,s=this.position,o=this.spaces,a=ge.setArraySize(this.positions,t*3+2),c=this.world,l=e.closed,h=e.worldVerticesLength,d=h/6,u=Yt.NONE;if(!e.constantSpeed){let H=e.lengths;d-=l?1:2;let W=H[d];this.data.positionMode==tn.Percent&&(s*=W);let J;switch(this.data.spacingMode){case Ft.Percent:J=W;break;case Ft.Proportional:J=W/t;break;default:J=1}c=ge.setArraySize(this.world,8);for(let te=0,re=0,ie=0;te<t;te++,re+=3){let O=o[te]*J;s+=O;let j=s;if(l)j%=W,j<0&&(j+=W),ie=0;else if(j<0){u!=Yt.BEFORE&&(u=Yt.BEFORE,e.computeWorldVertices(n,2,4,c,0,2)),this.addBeforePosition(j,c,0,a,re);continue}else if(j>W){u!=Yt.AFTER&&(u=Yt.AFTER,e.computeWorldVertices(n,h-6,4,c,0,2)),this.addAfterPosition(j-W,c,0,a,re);continue}for(;;ie++){let fe=H[ie];if(!(j>fe)){if(ie==0)j/=fe;else{let Se=H[ie-1];j=(j-Se)/(fe-Se)}break}}ie!=u&&(u=ie,l&&ie==d?(e.computeWorldVertices(n,h-4,4,c,0,2),e.computeWorldVertices(n,0,4,c,4,2)):e.computeWorldVertices(n,ie*6+2,8,c,0,2)),this.addCurvePosition(j,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],a,re,i||te>0&&O==0)}return a}l?(h+=2,c=ge.setArraySize(this.world,h),e.computeWorldVertices(n,2,h-4,c,0,2),e.computeWorldVertices(n,0,2,c,h-4,2),c[h-2]=c[0],c[h-1]=c[1]):(d--,h-=4,c=ge.setArraySize(this.world,h),e.computeWorldVertices(n,2,h,c,0,2));let f=ge.setArraySize(this.curves,d),g=0,_=c[0],p=c[1],m=0,w=0,x=0,M=0,b=0,S=0,E=0,R=0,I=0,y=0,T=0,V=0,k=0,C=0;for(let H=0,W=2;H<d;H++,W+=6)m=c[W],w=c[W+1],x=c[W+2],M=c[W+3],b=c[W+4],S=c[W+5],E=(_-m*2+x)*.1875,R=(p-w*2+M)*.1875,I=((m-x)*3-_+b)*.09375,y=((w-M)*3-p+S)*.09375,T=E*2+I,V=R*2+y,k=(m-_)*.75+E+I*.16666667,C=(w-p)*.75+R+y*.16666667,g+=Math.sqrt(k*k+C*C),k+=T,C+=V,T+=I,V+=y,g+=Math.sqrt(k*k+C*C),k+=T,C+=V,g+=Math.sqrt(k*k+C*C),k+=T+I,C+=V+y,g+=Math.sqrt(k*k+C*C),f[H]=g,_=b,p=S;this.data.positionMode==tn.Percent&&(s*=g);let D;switch(this.data.spacingMode){case Ft.Percent:D=g;break;case Ft.Proportional:D=g/t;break;default:D=1}let U=this.segments,G=0;for(let H=0,W=0,J=0,te=0;H<t;H++,W+=3){let re=o[H]*D;s+=re;let ie=s;if(l)ie%=g,ie<0&&(ie+=g),J=0;else if(ie<0){this.addBeforePosition(ie,c,0,a,W);continue}else if(ie>g){this.addAfterPosition(ie-g,c,h-4,a,W);continue}for(;;J++){let O=f[J];if(!(ie>O)){if(J==0)ie/=O;else{let j=f[J-1];ie=(ie-j)/(O-j)}break}}if(J!=u){u=J;let O=J*6;for(_=c[O],p=c[O+1],m=c[O+2],w=c[O+3],x=c[O+4],M=c[O+5],b=c[O+6],S=c[O+7],E=(_-m*2+x)*.03,R=(p-w*2+M)*.03,I=((m-x)*3-_+b)*.006,y=((w-M)*3-p+S)*.006,T=E*2+I,V=R*2+y,k=(m-_)*.3+E+I*.16666667,C=(w-p)*.3+R+y*.16666667,G=Math.sqrt(k*k+C*C),U[0]=G,O=1;O<8;O++)k+=T,C+=V,T+=I,V+=y,G+=Math.sqrt(k*k+C*C),U[O]=G;k+=T,C+=V,G+=Math.sqrt(k*k+C*C),U[8]=G,k+=T+I,C+=V+y,G+=Math.sqrt(k*k+C*C),U[9]=G,te=0}for(ie*=G;;te++){let O=U[te];if(!(ie>O)){if(te==0)ie/=O;else{let j=U[te-1];ie=te+(ie-j)/(O-j)}break}}this.addCurvePosition(ie*.1,_,p,m,w,x,M,b,S,a,W,i||H>0&&re==0)}return a}addBeforePosition(e,t,i,n,s){let o=t[i],a=t[i+1],c=t[i+2]-o,l=t[i+3]-a,h=Math.atan2(l,c);n[s]=o+e*Math.cos(h),n[s+1]=a+e*Math.sin(h),n[s+2]=h}addAfterPosition(e,t,i,n,s){let o=t[i+2],a=t[i+3],c=o-t[i],l=a-t[i+1],h=Math.atan2(l,c);n[s]=o+e*Math.cos(h),n[s+1]=a+e*Math.sin(h),n[s+2]=h}addCurvePosition(e,t,i,n,s,o,a,c,l,h,d,u){if(e==0||isNaN(e)){h[d]=t,h[d+1]=i,h[d+2]=Math.atan2(s-i,n-t);return}let f=e*e,g=f*e,_=1-e,p=_*_,m=p*_,w=_*e,x=w*3,M=_*x,b=x*e,S=t*m+n*M+o*b+c*g,E=i*m+s*M+a*b+l*g;h[d]=S,h[d+1]=E,u&&(e<.001?h[d+2]=Math.atan2(s-i,n-t):h[d+2]=Math.atan2(E-(i*p+s*w*2+a*f),S-(t*p+n*w*2+o*f)))}};v(Yt,"NONE",-1),v(Yt,"BEFORE",-2),v(Yt,"AFTER",-3),v(Yt,"epsilon",1e-5);let Wa=Yt;class N0{constructor(e,t){v(this,"data");v(this,"_bone",null);v(this,"inertia",0);v(this,"strength",0);v(this,"damping",0);v(this,"massInverse",0);v(this,"wind",0);v(this,"gravity",0);v(this,"mix",0);v(this,"_reset",!0);v(this,"ux",0);v(this,"uy",0);v(this,"cx",0);v(this,"cy",0);v(this,"tx",0);v(this,"ty",0);v(this,"xOffset",0);v(this,"xVelocity",0);v(this,"yOffset",0);v(this,"yVelocity",0);v(this,"rotateOffset",0);v(this,"rotateVelocity",0);v(this,"scaleOffset",0);v(this,"scaleVelocity",0);v(this,"active",!1);v(this,"skeleton");v(this,"remaining",0);v(this,"lastTime",0);this.data=e,this.skeleton=t,this.bone=t.bones[e.bone.index],this.inertia=e.inertia,this.strength=e.strength,this.damping=e.damping,this.massInverse=e.massInverse,this.wind=e.wind,this.gravity=e.gravity,this.mix=e.mix}set bone(e){this._bone=e}get bone(){if(this._bone)return this._bone;throw new Error("Bone not set.")}reset(){this.remaining=0,this.lastTime=this.skeleton.time,this._reset=!0,this.xOffset=0,this.xVelocity=0,this.yOffset=0,this.yVelocity=0,this.rotateOffset=0,this.rotateVelocity=0,this.scaleOffset=0,this.scaleVelocity=0}setToSetupPose(){const e=this.data;this.inertia=e.inertia,this.strength=e.strength,this.damping=e.damping,this.massInverse=e.massInverse,this.wind=e.wind,this.gravity=e.gravity,this.mix=e.mix}isActive(){return this.active}update(e){const t=this.mix;if(t==0)return;const i=this.data.x>0,n=this.data.y>0,s=this.data.rotate>0||this.data.shearX>0,o=this.data.scaleX>0,a=this.bone,c=a.data.length;switch(e){case Yi.none:return;case Yi.reset:this.reset();case Yi.update:const l=this.skeleton,h=Math.max(this.skeleton.time-this.lastTime,0);this.remaining+=h,this.lastTime=l.time;const d=a.worldX,u=a.worldY;if(this._reset)this._reset=!1,this.ux=d,this.uy=u;else{let f=this.remaining,g=this.inertia,_=this.data.step,p=this.skeleton.data.referenceScale,m=-1,w=this.data.limit*h,x=w*Math.abs(l.scaleY);if(w*=Math.abs(l.scaleX),i||n){if(i){const M=(this.ux-d)*g;this.xOffset+=M>w?w:M<-w?-w:M,this.ux=d}if(n){const M=(this.uy-u)*g;this.yOffset+=M>x?x:M<-x?-x:M,this.uy=u}if(f>=_){m=Math.pow(this.damping,60*_);const M=this.massInverse*_,b=this.strength,S=this.wind*p*l.scaleX,E=this.gravity*p*l.scaleY;do i&&(this.xVelocity+=(S-this.xOffset*b)*M,this.xOffset+=this.xVelocity*_,this.xVelocity*=m),n&&(this.yVelocity-=(E+this.yOffset*b)*M,this.yOffset+=this.yVelocity*_,this.yVelocity*=m),f-=_;while(f>=_)}i&&(a.worldX+=this.xOffset*t*this.data.x),n&&(a.worldY+=this.yOffset*t*this.data.y)}if(s||o){let M=Math.atan2(a.c,a.a),b=0,S=0,E=0,R=this.cx-a.worldX,I=this.cy-a.worldY;if(R>w?R=w:R<-w&&(R=-w),I>x?I=x:I<-x&&(I=-x),s){E=(this.data.rotate+this.data.shearX)*t;let y=Math.atan2(I+this.ty,R+this.tx)-M-this.rotateOffset*E;this.rotateOffset+=(y-Math.ceil(y*ce.invPI2-.5)*ce.PI2)*g,y=this.rotateOffset*E+M,b=Math.cos(y),S=Math.sin(y),o&&(y=c*a.getWorldScaleX(),y>0&&(this.scaleOffset+=(R*b+I*S)*g/y))}else{b=Math.cos(M),S=Math.sin(M);const y=c*a.getWorldScaleX();y>0&&(this.scaleOffset+=(R*b+I*S)*g/y)}if(f=this.remaining,f>=_){m==-1&&(m=Math.pow(this.damping,60*_));const y=this.massInverse*_,T=this.strength,V=this.wind,k=this.gravity,C=c/p;for(;;)if(f-=_,o&&(this.scaleVelocity+=(V*b-k*S-this.scaleOffset*T)*y,this.scaleOffset+=this.scaleVelocity*_,this.scaleVelocity*=m),s){if(this.rotateVelocity-=((V*S+k*b)*C+this.rotateOffset*T)*y,this.rotateOffset+=this.rotateVelocity*_,this.rotateVelocity*=m,f<_)break;const D=this.rotateOffset*E+M;b=Math.cos(D),S=Math.sin(D)}else if(f<_)break}}this.remaining=f}this.cx=a.worldX,this.cy=a.worldY;break;case Yi.pose:i&&(a.worldX+=this.xOffset*t*this.data.x),n&&(a.worldY+=this.yOffset*t*this.data.y)}if(s){let l=this.rotateOffset*t,h=0,d=0,u=0;if(this.data.shearX>0){let f=0;this.data.rotate>0&&(f=l*this.data.rotate,h=Math.sin(f),d=Math.cos(f),u=a.b,a.b=d*u-h*a.d,a.d=h*u+d*a.d),f+=l*this.data.shearX,h=Math.sin(f),d=Math.cos(f),u=a.a,a.a=d*u-h*a.c,a.c=h*u+d*a.c}else l*=this.data.rotate,h=Math.sin(l),d=Math.cos(l),u=a.a,a.a=d*u-h*a.c,a.c=h*u+d*a.c,u=a.b,a.b=d*u-h*a.d,a.d=h*u+d*a.d}if(o){const l=1+this.scaleOffset*t*this.data.scaleX;a.a*=l,a.c*=l}e!=Yi.pose&&(this.tx=c*a.a,this.ty=c*a.c),a.updateAppliedTransform()}translate(e,t){this.ux-=e,this.uy-=t,this.cx-=e,this.cy-=t}rotate(e,t,i){const n=i*ce.degRad,s=Math.cos(n),o=Math.sin(n),a=this.cx-e,c=this.cy-t;this.translate(a*s-c*o-a,a*o+c*s-c)}}class F0{constructor(e,t){v(this,"data");v(this,"bone");v(this,"color");v(this,"darkColor",null);v(this,"attachment",null);v(this,"attachmentState",0);v(this,"sequenceIndex",-1);v(this,"deform",new Array);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("bone cannot be null.");this.data=e,this.bone=t,this.color=new Je,this.darkColor=e.darkColor?new Je:null,this.setToSetupPose()}getSkeleton(){return this.bone.skeleton}getAttachment(){return this.attachment}setAttachment(e){this.attachment!=e&&((!(e instanceof hi)||!(this.attachment instanceof hi)||e.timelineAttachment!=this.attachment.timelineAttachment)&&(this.deform.length=0),this.attachment=e,this.sequenceIndex=-1)}setToSetupPose(){this.color.setFromColor(this.data.color),this.darkColor&&this.darkColor.setFromColor(this.data.darkColor),this.data.attachmentName?(this.attachment=null,this.setAttachment(this.bone.skeleton.getAttachment(this.data.index,this.data.attachmentName))):this.attachment=null}}class O0{constructor(e,t){v(this,"data");v(this,"bones");v(this,"target");v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0);v(this,"mixScaleX",0);v(this,"mixScaleY",0);v(this,"mixShearY",0);v(this,"temp",new As);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let n=0;n<e.bones.length;n++){let s=t.findBone(e.bones[n].name);if(!s)throw new Error(`Couldn't find bone ${e.bones[n].name}.`);this.bones.push(s)}let i=t.findBone(e.target.name);if(!i)throw new Error(`Couldn't find target bone ${e.target.name}.`);this.target=i,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY,this.mixScaleX=e.mixScaleX,this.mixScaleY=e.mixScaleY,this.mixShearY=e.mixShearY}isActive(){return this.active}setToSetupPose(){const e=this.data;this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY,this.mixScaleX=e.mixScaleX,this.mixScaleY=e.mixScaleY,this.mixShearY=e.mixShearY}update(e){this.mixRotate==0&&this.mixX==0&&this.mixY==0&&this.mixScaleX==0&&this.mixScaleY==0&&this.mixShearY==0||(this.data.local?this.data.relative?this.applyRelativeLocal():this.applyAbsoluteLocal():this.data.relative?this.applyRelativeWorld():this.applyAbsoluteWorld())}applyAbsoluteWorld(){let e=this.mixRotate,t=this.mixX,i=this.mixY,n=this.mixScaleX,s=this.mixScaleY,o=this.mixShearY,a=t!=0||i!=0,c=this.target,l=c.a,h=c.b,d=c.c,u=c.d,f=l*u-h*d>0?ce.degRad:-.01745329277777778,g=this.data.offsetRotation*f,_=this.data.offsetShearY*f,p=this.bones;for(let m=0,w=p.length;m<w;m++){let x=p[m];if(e!=0){let M=x.a,b=x.b,S=x.c,E=x.d,R=Math.atan2(d,l)-Math.atan2(S,M)+g;R>ce.PI?R-=ce.PI2:R<-3.1415927&&(R+=ce.PI2),R*=e;let I=Math.cos(R),y=Math.sin(R);x.a=I*M-y*S,x.b=I*b-y*E,x.c=y*M+I*S,x.d=y*b+I*E}if(a){let M=this.temp;c.localToWorld(M.set(this.data.offsetX,this.data.offsetY)),x.worldX+=(M.x-x.worldX)*t,x.worldY+=(M.y-x.worldY)*i}if(n!=0){let M=Math.sqrt(x.a*x.a+x.c*x.c);M!=0&&(M=(M+(Math.sqrt(l*l+d*d)-M+this.data.offsetScaleX)*n)/M),x.a*=M,x.c*=M}if(s!=0){let M=Math.sqrt(x.b*x.b+x.d*x.d);M!=0&&(M=(M+(Math.sqrt(h*h+u*u)-M+this.data.offsetScaleY)*s)/M),x.b*=M,x.d*=M}if(o>0){let M=x.b,b=x.d,S=Math.atan2(b,M),E=Math.atan2(u,h)-Math.atan2(d,l)-(S-Math.atan2(x.c,x.a));E>ce.PI?E-=ce.PI2:E<-3.1415927&&(E+=ce.PI2),E=S+(E+_)*o;let R=Math.sqrt(M*M+b*b);x.b=Math.cos(E)*R,x.d=Math.sin(E)*R}x.updateAppliedTransform()}}applyRelativeWorld(){let e=this.mixRotate,t=this.mixX,i=this.mixY,n=this.mixScaleX,s=this.mixScaleY,o=this.mixShearY,a=t!=0||i!=0,c=this.target,l=c.a,h=c.b,d=c.c,u=c.d,f=l*u-h*d>0?ce.degRad:-.01745329277777778,g=this.data.offsetRotation*f,_=this.data.offsetShearY*f,p=this.bones;for(let m=0,w=p.length;m<w;m++){let x=p[m];if(e!=0){let M=x.a,b=x.b,S=x.c,E=x.d,R=Math.atan2(d,l)+g;R>ce.PI?R-=ce.PI2:R<-3.1415927&&(R+=ce.PI2),R*=e;let I=Math.cos(R),y=Math.sin(R);x.a=I*M-y*S,x.b=I*b-y*E,x.c=y*M+I*S,x.d=y*b+I*E}if(a){let M=this.temp;c.localToWorld(M.set(this.data.offsetX,this.data.offsetY)),x.worldX+=M.x*t,x.worldY+=M.y*i}if(n!=0){let M=(Math.sqrt(l*l+d*d)-1+this.data.offsetScaleX)*n+1;x.a*=M,x.c*=M}if(s!=0){let M=(Math.sqrt(h*h+u*u)-1+this.data.offsetScaleY)*s+1;x.b*=M,x.d*=M}if(o>0){let M=Math.atan2(u,h)-Math.atan2(d,l);M>ce.PI?M-=ce.PI2:M<-3.1415927&&(M+=ce.PI2);let b=x.b,S=x.d;M=Math.atan2(S,b)+(M-ce.PI/2+_)*o;let E=Math.sqrt(b*b+S*S);x.b=Math.cos(M)*E,x.d=Math.sin(M)*E}x.updateAppliedTransform()}}applyAbsoluteLocal(){let e=this.mixRotate,t=this.mixX,i=this.mixY,n=this.mixScaleX,s=this.mixScaleY,o=this.mixShearY,a=this.target,c=this.bones;for(let l=0,h=c.length;l<h;l++){let d=c[l],u=d.arotation;e!=0&&(u+=(a.arotation-u+this.data.offsetRotation)*e);let f=d.ax,g=d.ay;f+=(a.ax-f+this.data.offsetX)*t,g+=(a.ay-g+this.data.offsetY)*i;let _=d.ascaleX,p=d.ascaleY;n!=0&&_!=0&&(_=(_+(a.ascaleX-_+this.data.offsetScaleX)*n)/_),s!=0&&p!=0&&(p=(p+(a.ascaleY-p+this.data.offsetScaleY)*s)/p);let m=d.ashearY;o!=0&&(m+=(a.ashearY-m+this.data.offsetShearY)*o),d.updateWorldTransformWith(f,g,u,_,p,d.ashearX,m)}}applyRelativeLocal(){let e=this.mixRotate,t=this.mixX,i=this.mixY,n=this.mixScaleX,s=this.mixScaleY,o=this.mixShearY,a=this.target,c=this.bones;for(let l=0,h=c.length;l<h;l++){let d=c[l],u=d.arotation+(a.arotation+this.data.offsetRotation)*e,f=d.ax+(a.ax+this.data.offsetX)*t,g=d.ay+(a.ay+this.data.offsetY)*i,_=d.ascaleX*((a.ascaleX-1+this.data.offsetScaleX)*n+1),p=d.ascaleY*((a.ascaleY-1+this.data.offsetScaleY)*s+1),m=d.ashearY+(a.ashearY+this.data.offsetShearY)*o;d.updateWorldTransformWith(f,g,u,_,p,d.ashearX,m)}}}const es=class es{constructor(e){v(this,"data");v(this,"bones");v(this,"slots");v(this,"drawOrder");v(this,"ikConstraints");v(this,"transformConstraints");v(this,"pathConstraints");v(this,"physicsConstraints");v(this,"_updateCache",new Array);v(this,"skin",null);v(this,"color");v(this,"scaleX",1);v(this,"_scaleY",1);v(this,"x",0);v(this,"y",0);v(this,"time",0);if(!e)throw new Error("data cannot be null.");this.data=e,this.bones=new Array;for(let t=0;t<e.bones.length;t++){let i=e.bones[t],n;if(!i.parent)n=new Ul(i,this,null);else{let s=this.bones[i.parent.index];n=new Ul(i,this,s),s.children.push(n)}this.bones.push(n)}this.slots=new Array,this.drawOrder=new Array;for(let t=0;t<e.slots.length;t++){let i=e.slots[t],n=this.bones[i.boneData.index],s=new F0(i,n);this.slots.push(s),this.drawOrder.push(s)}this.ikConstraints=new Array;for(let t=0;t<e.ikConstraints.length;t++){let i=e.ikConstraints[t];this.ikConstraints.push(new I0(i,this))}this.transformConstraints=new Array;for(let t=0;t<e.transformConstraints.length;t++){let i=e.transformConstraints[t];this.transformConstraints.push(new O0(i,this))}this.pathConstraints=new Array;for(let t=0;t<e.pathConstraints.length;t++){let i=e.pathConstraints[t];this.pathConstraints.push(new Wa(i,this))}this.physicsConstraints=new Array;for(let t=0;t<e.physicsConstraints.length;t++){let i=e.physicsConstraints[t];this.physicsConstraints.push(new N0(i,this))}this.color=new Je(1,1,1,1),this.updateCache()}get scaleY(){return es.yDown?-this._scaleY:this._scaleY}set scaleY(e){this._scaleY=e}updateCache(){let e=this._updateCache;e.length=0;let t=this.bones;for(let u=0,f=t.length;u<f;u++){let g=t[u];g.sorted=g.data.skinRequired,g.active=!g.sorted}if(this.skin){let u=this.skin.bones;for(let f=0,g=this.skin.bones.length;f<g;f++){let _=this.bones[u[f].index];do _.sorted=!1,_.active=!0,_=_.parent;while(_)}}let i=this.ikConstraints,n=this.transformConstraints,s=this.pathConstraints,o=this.physicsConstraints,a=i.length,c=n.length,l=s.length,h=this.physicsConstraints.length,d=a+c+l+h;e:for(let u=0;u<d;u++){for(let f=0;f<a;f++){let g=i[f];if(g.data.order==u){this.sortIkConstraint(g);continue e}}for(let f=0;f<c;f++){let g=n[f];if(g.data.order==u){this.sortTransformConstraint(g);continue e}}for(let f=0;f<l;f++){let g=s[f];if(g.data.order==u){this.sortPathConstraint(g);continue e}}for(let f=0;f<h;f++){const g=o[f];if(g.data.order==u){this.sortPhysicsConstraint(g);continue e}}}for(let u=0,f=t.length;u<f;u++)this.sortBone(t[u])}sortIkConstraint(e){if(e.active=e.target.isActive()&&(!e.data.skinRequired||this.skin&&ge.contains(this.skin.constraints,e.data,!0)),!e.active)return;let t=e.target;this.sortBone(t);let i=e.bones,n=i[0];if(this.sortBone(n),i.length==1)this._updateCache.push(e),this.sortReset(n.children);else{let s=i[i.length-1];this.sortBone(s),this._updateCache.push(e),this.sortReset(n.children),s.sorted=!0}}sortPathConstraint(e){if(e.active=e.target.bone.isActive()&&(!e.data.skinRequired||this.skin&&ge.contains(this.skin.constraints,e.data,!0)),!e.active)return;let t=e.target,i=t.data.index,n=t.bone;this.skin&&this.sortPathConstraintAttachment(this.skin,i,n),this.data.defaultSkin&&this.data.defaultSkin!=this.skin&&this.sortPathConstraintAttachment(this.data.defaultSkin,i,n);for(let c=0,l=this.data.skins.length;c<l;c++)this.sortPathConstraintAttachment(this.data.skins[c],i,n);let s=t.getAttachment();s instanceof ds&&this.sortPathConstraintAttachmentWith(s,n);let o=e.bones,a=o.length;for(let c=0;c<a;c++)this.sortBone(o[c]);this._updateCache.push(e);for(let c=0;c<a;c++)this.sortReset(o[c].children);for(let c=0;c<a;c++)o[c].sorted=!0}sortTransformConstraint(e){if(e.active=e.target.isActive()&&(!e.data.skinRequired||this.skin&&ge.contains(this.skin.constraints,e.data,!0)),!e.active)return;this.sortBone(e.target);let t=e.bones,i=t.length;if(e.data.local)for(let n=0;n<i;n++){let s=t[n];this.sortBone(s.parent),this.sortBone(s)}else for(let n=0;n<i;n++)this.sortBone(t[n]);this._updateCache.push(e);for(let n=0;n<i;n++)this.sortReset(t[n].children);for(let n=0;n<i;n++)t[n].sorted=!0}sortPathConstraintAttachment(e,t,i){let n=e.attachments[t];if(n)for(let s in n)this.sortPathConstraintAttachmentWith(n[s],i)}sortPathConstraintAttachmentWith(e,t){if(!(e instanceof ds))return;let i=e.bones;if(!i)this.sortBone(t);else{let n=this.bones;for(let s=0,o=i.length;s<o;){let a=i[s++];for(a+=s;s<a;)this.sortBone(n[i[s++]])}}}sortPhysicsConstraint(e){const t=e.bone;e.active=t.active&&(!e.data.skinRequired||this.skin!=null&&ge.contains(this.skin.constraints,e.data,!0)),e.active&&(this.sortBone(t),this._updateCache.push(e),this.sortReset(t.children),t.sorted=!0)}sortBone(e){if(!e||e.sorted)return;let t=e.parent;t&&this.sortBone(t),e.sorted=!0,this._updateCache.push(e)}sortReset(e){for(let t=0,i=e.length;t<i;t++){let n=e[t];n.active&&(n.sorted&&this.sortReset(n.children),n.sorted=!1)}}updateWorldTransform(e){if(e==null)throw new Error("physics is undefined");let t=this.bones;for(let n=0,s=t.length;n<s;n++){let o=t[n];o.ax=o.x,o.ay=o.y,o.arotation=o.rotation,o.ascaleX=o.scaleX,o.ascaleY=o.scaleY,o.ashearX=o.shearX,o.ashearY=o.shearY}let i=this._updateCache;for(let n=0,s=i.length;n<s;n++)i[n].update(e)}updateWorldTransformWith(e,t){if(!t)throw new Error("parent cannot be null.");let i=this.bones;for(let p=1,m=i.length;p<m;p++){let w=i[p];w.ax=w.x,w.ay=w.y,w.arotation=w.rotation,w.ascaleX=w.scaleX,w.ascaleY=w.scaleY,w.ashearX=w.shearX,w.ashearY=w.shearY}let n=this.getRootBone();if(!n)throw new Error("Root bone must not be null.");let s=t.a,o=t.b,a=t.c,c=t.d;n.worldX=s*this.x+o*this.y+t.worldX,n.worldY=a*this.x+c*this.y+t.worldY;const l=(n.rotation+n.shearX)*ce.degRad,h=(n.rotation+90+n.shearY)*ce.degRad,d=Math.cos(l)*n.scaleX,u=Math.cos(h)*n.scaleY,f=Math.sin(l)*n.scaleX,g=Math.sin(h)*n.scaleY;n.a=(s*d+o*f)*this.scaleX,n.b=(s*u+o*g)*this.scaleX,n.c=(a*d+c*f)*this.scaleY,n.d=(a*u+c*g)*this.scaleY;let _=this._updateCache;for(let p=0,m=_.length;p<m;p++){let w=_[p];w!=n&&w.update(e)}}setToSetupPose(){this.setBonesToSetupPose(),this.setSlotsToSetupPose()}setBonesToSetupPose(){for(const e of this.bones)e.setToSetupPose();for(const e of this.ikConstraints)e.setToSetupPose();for(const e of this.transformConstraints)e.setToSetupPose();for(const e of this.pathConstraints)e.setToSetupPose();for(const e of this.physicsConstraints)e.setToSetupPose()}setSlotsToSetupPose(){let e=this.slots;ge.arrayCopy(e,0,this.drawOrder,0,e.length);for(let t=0,i=e.length;t<i;t++)e[t].setToSetupPose()}getRootBone(){return this.bones.length==0?null:this.bones[0]}findBone(e){if(!e)throw new Error("boneName cannot be null.");let t=this.bones;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.data.name==e)return s}return null}findSlot(e){if(!e)throw new Error("slotName cannot be null.");let t=this.slots;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.data.name==e)return s}return null}setSkinByName(e){let t=this.data.findSkin(e);if(!t)throw new Error("Skin not found: "+e);this.setSkin(t)}setSkin(e){if(e!=this.skin){if(e)if(this.skin)e.attachAll(this,this.skin);else{let t=this.slots;for(let i=0,n=t.length;i<n;i++){let s=t[i],o=s.data.attachmentName;if(o){let a=e.getAttachment(i,o);a&&s.setAttachment(a)}}}this.skin=e,this.updateCache()}}getAttachmentByName(e,t){let i=this.data.findSlot(e);if(!i)throw new Error(`Can't find slot with name ${e}`);return this.getAttachment(i.index,t)}getAttachment(e,t){if(!t)throw new Error("attachmentName cannot be null.");if(this.skin){let i=this.skin.getAttachment(e,t);if(i)return i}return this.data.defaultSkin?this.data.defaultSkin.getAttachment(e,t):null}setAttachment(e,t){if(!e)throw new Error("slotName cannot be null.");let i=this.slots;for(let n=0,s=i.length;n<s;n++){let o=i[n];if(o.data.name==e){let a=null;if(t&&(a=this.getAttachment(n,t),!a))throw new Error("Attachment not found: "+t+", for slot: "+e);o.setAttachment(a);return}}throw new Error("Slot not found: "+e)}findIkConstraint(e){if(!e)throw new Error("constraintName cannot be null.");return this.ikConstraints.find(t=>t.data.name==e)??null}findTransformConstraint(e){if(!e)throw new Error("constraintName cannot be null.");return this.transformConstraints.find(t=>t.data.name==e)??null}findPathConstraint(e){if(!e)throw new Error("constraintName cannot be null.");return this.pathConstraints.find(t=>t.data.name==e)??null}findPhysicsConstraint(e){if(e==null)throw new Error("constraintName cannot be null.");return this.physicsConstraints.find(t=>t.data.name==e)??null}getBoundsRect(e){let t=new As,i=new As;return this.getBounds(t,i,void 0,e),{x:t.x,y:t.y,width:i.x,height:i.y}}getBounds(e,t,i=new Array(2),n=null){if(!e)throw new Error("offset cannot be null.");if(!t)throw new Error("size cannot be null.");let s=this.drawOrder,o=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,l=Number.NEGATIVE_INFINITY;for(let h=0,d=s.length;h<d;h++){let u=s[h];if(!u.bone.active)continue;let f=0,g=null,_=null,p=u.getAttachment();if(p instanceof Cs)f=8,g=ge.setArraySize(i,f,0),p.computeWorldVertices(u,g,0,2),_=es.quadTriangles;else if(p instanceof Rn){let m=p;f=m.worldVerticesLength,g=ge.setArraySize(i,f,0),m.computeWorldVertices(u,0,f,g,0,2),_=m.triangles}else if(p instanceof Is&&n!=null){n.clipStart(u,p);continue}if(g&&_){n!=null&&n.isClipping()&&(n.clipTriangles(g,_,_.length),g=n.clippedVertices,f=n.clippedVertices.length);for(let m=0,w=g.length;m<w;m+=2){let x=g[m],M=g[m+1];o=Math.min(o,x),a=Math.min(a,M),c=Math.max(c,x),l=Math.max(l,M)}}n!=null&&n.clipEndWithSlot(u)}n!=null&&n.clipEnd(),e.set(o,a),t.set(c-o,l-a)}update(e){this.time+=e}physicsTranslate(e,t){const i=this.physicsConstraints;for(let n=0,s=i.length;n<s;n++)i[n].translate(e,t)}physicsRotate(e,t,i){const n=this.physicsConstraints;for(let s=0,o=n.length;s<o;s++)n[s].rotate(e,t,i)}};v(es,"quadTriangles",[0,1,2,2,3,0]),v(es,"yDown",!1);let Xa=es;var Yi;(function(r){r[r.none=0]="none",r[r.reset=1]="reset",r[r.update=2]="update",r[r.pose=3]="pose"})(Yi||(Yi={}));class k0 extends Ur{constructor(t){super(t,0,!1);v(this,"_bone",null);v(this,"x",0);v(this,"y",0);v(this,"rotate",0);v(this,"scaleX",0);v(this,"shearX",0);v(this,"limit",0);v(this,"step",0);v(this,"inertia",0);v(this,"strength",0);v(this,"damping",0);v(this,"massInverse",0);v(this,"wind",0);v(this,"gravity",0);v(this,"mix",0);v(this,"inertiaGlobal",!1);v(this,"strengthGlobal",!1);v(this,"dampingGlobal",!1);v(this,"massGlobal",!1);v(this,"windGlobal",!1);v(this,"gravityGlobal",!1);v(this,"mixGlobal",!1)}set bone(t){this._bone=t}get bone(){if(this._bone)return this._bone;throw new Error("BoneData not set.")}}class B0{constructor(){v(this,"name",null);v(this,"bones",new Array);v(this,"slots",new Array);v(this,"skins",new Array);v(this,"defaultSkin",null);v(this,"events",new Array);v(this,"animations",new Array);v(this,"ikConstraints",new Array);v(this,"transformConstraints",new Array);v(this,"pathConstraints",new Array);v(this,"physicsConstraints",new Array);v(this,"x",0);v(this,"y",0);v(this,"width",0);v(this,"height",0);v(this,"referenceScale",100);v(this,"version",null);v(this,"hash",null);v(this,"fps",0);v(this,"imagesPath",null);v(this,"audioPath",null)}findBone(e){if(!e)throw new Error("boneName cannot be null.");let t=this.bones;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.name==e)return s}return null}findSlot(e){if(!e)throw new Error("slotName cannot be null.");let t=this.slots;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.name==e)return s}return null}findSkin(e){if(!e)throw new Error("skinName cannot be null.");let t=this.skins;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.name==e)return s}return null}findEvent(e){if(!e)throw new Error("eventDataName cannot be null.");let t=this.events;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.name==e)return s}return null}findAnimation(e){if(!e)throw new Error("animationName cannot be null.");let t=this.animations;for(let i=0,n=t.length;i<n;i++){let s=t[i];if(s.name==e)return s}return null}findIkConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.ikConstraints;for(let i=0,n=t.length;i<n;i++){const s=t[i];if(s.name==e)return s}return null}findTransformConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.transformConstraints;for(let i=0,n=t.length;i<n;i++){const s=t[i];if(s.name==e)return s}return null}findPathConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.pathConstraints;for(let i=0,n=t.length;i<n;i++){const s=t[i];if(s.name==e)return s}return null}findPhysicsConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.physicsConstraints;for(let i=0,n=t.length;i<n;i++){const s=t[i];if(s.name==e)return s}return null}}class Nl{constructor(e=0,t,i){v(this,"slotIndex");v(this,"name");v(this,"attachment");this.slotIndex=e,this.name=t,this.attachment=i}}class z0{constructor(e){v(this,"name");v(this,"attachments",new Array);v(this,"bones",Array());v(this,"constraints",new Array);v(this,"color",new Je(.99607843,.61960787,.30980393,1));if(!e)throw new Error("name cannot be null.");this.name=e}setAttachment(e,t,i){if(!i)throw new Error("attachment cannot be null.");let n=this.attachments;e>=n.length&&(n.length=e+1),n[e]||(n[e]={}),n[e][t]=i}addSkin(e){for(let n=0;n<e.bones.length;n++){let s=e.bones[n],o=!1;for(let a=0;a<this.bones.length;a++)if(this.bones[a]==s){o=!0;break}o||this.bones.push(s)}for(let n=0;n<e.constraints.length;n++){let s=e.constraints[n],o=!1;for(let a=0;a<this.constraints.length;a++)if(this.constraints[a]==s){o=!0;break}o||this.constraints.push(s)}let t=e.getAttachments();for(let n=0;n<t.length;n++){var i=t[n];this.setAttachment(i.slotIndex,i.name,i.attachment)}}copySkin(e){for(let n=0;n<e.bones.length;n++){let s=e.bones[n],o=!1;for(let a=0;a<this.bones.length;a++)if(this.bones[a]==s){o=!0;break}o||this.bones.push(s)}for(let n=0;n<e.constraints.length;n++){let s=e.constraints[n],o=!1;for(let a=0;a<this.constraints.length;a++)if(this.constraints[a]==s){o=!0;break}o||this.constraints.push(s)}let t=e.getAttachments();for(let n=0;n<t.length;n++){var i=t[n];i.attachment&&(i.attachment instanceof Rn?(i.attachment=i.attachment.newLinkedMesh(),this.setAttachment(i.slotIndex,i.name,i.attachment)):(i.attachment=i.attachment.copy(),this.setAttachment(i.slotIndex,i.name,i.attachment)))}}getAttachment(e,t){let i=this.attachments[e];return i?i[t]:null}removeAttachment(e,t){let i=this.attachments[e];i&&delete i[t]}getAttachments(){let e=new Array;for(var t=0;t<this.attachments.length;t++){let i=this.attachments[t];if(i)for(let n in i){let s=i[n];s&&e.push(new Nl(t,n,s))}}return e}getAttachmentsForSlot(e,t){let i=this.attachments[e];if(i)for(let n in i){let s=i[n];s&&t.push(new Nl(e,n,s))}}clear(){this.attachments.length=0,this.bones.length=0,this.constraints.length=0}attachAll(e,t){let i=0;for(let n=0;n<e.slots.length;n++){let s=e.slots[n],o=s.getAttachment();if(o&&i<t.attachments.length){let a=t.attachments[i];for(let c in a){let l=a[c];if(o==l){let h=this.getAttachment(i,c);h&&s.setAttachment(h);break}}}i++}}}class G0{constructor(e,t,i){v(this,"index",0);v(this,"name");v(this,"boneData");v(this,"color",new Je(1,1,1,1));v(this,"darkColor",null);v(this,"attachmentName",null);v(this,"blendMode",ji.Normal);v(this,"visible",!0);if(e<0)throw new Error("index must be >= 0.");if(!t)throw new Error("name cannot be null.");if(!i)throw new Error("boneData cannot be null.");this.index=e,this.name=t,this.boneData=i}}var ji;(function(r){r[r.Normal=0]="Normal",r[r.Additive=1]="Additive",r[r.Multiply=2]="Multiply",r[r.Screen=3]="Screen"})(ji||(ji={}));class H0 extends Ur{constructor(t){super(t,0,!1);v(this,"bones",new Array);v(this,"_target",null);v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0);v(this,"mixScaleX",0);v(this,"mixScaleY",0);v(this,"mixShearY",0);v(this,"offsetRotation",0);v(this,"offsetX",0);v(this,"offsetY",0);v(this,"offsetScaleX",0);v(this,"offsetScaleY",0);v(this,"offsetShearY",0);v(this,"relative",!1);v(this,"local",!1)}set target(t){this._target=t}get target(){if(this._target)return this._target;throw new Error("BoneData not set.")}}var Fl;(function(r){r[r.Region=0]="Region",r[r.BoundingBox=1]="BoundingBox",r[r.Mesh=2]="Mesh",r[r.LinkedMesh=3]="LinkedMesh",r[r.Path=4]="Path",r[r.Point=5]="Point",r[r.Clipping=6]="Clipping"})(Fl||(Fl={}));class kt{constructor(){v(this,"convexPolygons",new Array);v(this,"convexPolygonsIndices",new Array);v(this,"indicesArray",new Array);v(this,"isConcaveArray",new Array);v(this,"triangles",new Array);v(this,"polygonPool",new ka(()=>new Array));v(this,"polygonIndicesPool",new ka(()=>new Array))}triangulate(e){let t=e,i=e.length>>1,n=this.indicesArray;n.length=0;for(let a=0;a<i;a++)n[a]=a;let s=this.isConcaveArray;s.length=0;for(let a=0,c=i;a<c;++a)s[a]=kt.isConcave(a,i,t,n);let o=this.triangles;for(o.length=0;i>3;){let a=i-1,c=0,l=1;for(;;){e:if(!s[c]){let u=n[a]<<1,f=n[c]<<1,g=n[l]<<1,_=t[u],p=t[u+1],m=t[f],w=t[f+1],x=t[g],M=t[g+1];for(let b=(l+1)%i;b!=a;b=(b+1)%i){if(!s[b])continue;let S=n[b]<<1,E=t[S],R=t[S+1];if(kt.positiveArea(x,M,_,p,E,R)&&kt.positiveArea(_,p,m,w,E,R)&&kt.positiveArea(m,w,x,M,E,R))break e}break}if(l==0){do{if(!s[c])break;c--}while(c>0);break}a=c,c=l,l=(l+1)%i}o.push(n[(i+c-1)%i]),o.push(n[c]),o.push(n[(c+1)%i]),n.splice(c,1),s.splice(c,1),i--;let h=(i+c-1)%i,d=c==i?0:c;s[h]=kt.isConcave(h,i,t,n),s[d]=kt.isConcave(d,i,t,n)}return i==3&&(o.push(n[2]),o.push(n[0]),o.push(n[1])),o}decompose(e,t){let i=e,n=this.convexPolygons;this.polygonPool.freeAll(n),n.length=0;let s=this.convexPolygonsIndices;this.polygonIndicesPool.freeAll(s),s.length=0;let o=this.polygonIndicesPool.obtain();o.length=0;let a=this.polygonPool.obtain();a.length=0;let c=-1,l=0;for(let h=0,d=t.length;h<d;h+=3){let u=t[h]<<1,f=t[h+1]<<1,g=t[h+2]<<1,_=i[u],p=i[u+1],m=i[f],w=i[f+1],x=i[g],M=i[g+1],b=!1;if(c==u){let S=a.length-4,E=kt.winding(a[S],a[S+1],a[S+2],a[S+3],x,M),R=kt.winding(x,M,a[0],a[1],a[2],a[3]);E==l&&R==l&&(a.push(x),a.push(M),o.push(g),b=!0)}b||(a.length>0?(n.push(a),s.push(o)):(this.polygonPool.free(a),this.polygonIndicesPool.free(o)),a=this.polygonPool.obtain(),a.length=0,a.push(_),a.push(p),a.push(m),a.push(w),a.push(x),a.push(M),o=this.polygonIndicesPool.obtain(),o.length=0,o.push(u),o.push(f),o.push(g),l=kt.winding(_,p,m,w,x,M),c=u)}a.length>0&&(n.push(a),s.push(o));for(let h=0,d=n.length;h<d;h++){if(o=s[h],o.length==0)continue;let u=o[0],f=o[o.length-1];a=n[h];let g=a.length-4,_=a[g],p=a[g+1],m=a[g+2],w=a[g+3],x=a[0],M=a[1],b=a[2],S=a[3],E=kt.winding(_,p,m,w,x,M);for(let R=0;R<d;R++){if(R==h)continue;let I=s[R];if(I.length!=3)continue;let y=I[0],T=I[1],V=I[2],k=n[R],C=k[k.length-2],D=k[k.length-1];if(y!=u||T!=f)continue;let U=kt.winding(_,p,m,w,C,D),G=kt.winding(C,D,x,M,b,S);U==E&&G==E&&(k.length=0,I.length=0,a.push(C),a.push(D),o.push(V),_=m,p=w,m=C,w=D,R=0)}}for(let h=n.length-1;h>=0;h--)a=n[h],a.length==0&&(n.splice(h,1),this.polygonPool.free(a),o=s[h],s.splice(h,1),this.polygonIndicesPool.free(o));return n}static isConcave(e,t,i,n){let s=n[(t+e-1)%t]<<1,o=n[e]<<1,a=n[(e+1)%t]<<1;return!this.positiveArea(i[s],i[s+1],i[o],i[o+1],i[a],i[a+1])}static positiveArea(e,t,i,n,s,o){return e*(o-n)+i*(t-o)+s*(n-t)>=0}static winding(e,t,i,n,s,o){let a=i-e,c=n-t;return s*c-o*a+a*t-e*c>=0?1:-1}}class yr{constructor(){v(this,"triangulator",new kt);v(this,"clippingPolygon",new Array);v(this,"clipOutput",new Array);v(this,"clippedVertices",new Array);v(this,"clippedUVs",new Array);v(this,"clippedTriangles",new Array);v(this,"scratch",new Array);v(this,"clipAttachment",null);v(this,"clippingPolygons",null)}clipStart(e,t){if(this.clipAttachment)return 0;this.clipAttachment=t;let i=t.worldVerticesLength,n=ge.setArraySize(this.clippingPolygon,i);t.computeWorldVertices(e,0,i,n,0,2);let s=this.clippingPolygon;yr.makeClockwise(s);let o=this.clippingPolygons=this.triangulator.decompose(s,this.triangulator.triangulate(s));for(let a=0,c=o.length;a<c;a++){let l=o[a];yr.makeClockwise(l),l.push(l[0]),l.push(l[1])}return o.length}clipEndWithSlot(e){this.clipAttachment&&this.clipAttachment.endSlot==e.data&&this.clipEnd()}clipEnd(){this.clipAttachment&&(this.clipAttachment=null,this.clippingPolygons=null,this.clippedVertices.length=0,this.clippedTriangles.length=0,this.clippingPolygon.length=0)}isClipping(){return this.clipAttachment!=null}clipTriangles(e,t,i,n,s,o,a,c){let l,h,d,u,f,g;typeof t=="number"?(l=i,h=n,d=s,u=o,f=a,g=c):(l=t,h=i,d=n,u=s,f=o,g=a),d&&u&&f&&typeof g=="boolean"?this.clipTrianglesRender(e,l,h,d,u,f,g):this.clipTrianglesNoRender(e,l,h)}clipTrianglesNoRender(e,t,i){let n=this.clipOutput,s=this.clippedVertices,o=this.clippedTriangles,a=this.clippingPolygons,c=a.length,l=0;s.length=0,o.length=0;for(let h=0;h<i;h+=3){let d=t[h]<<1,u=e[d],f=e[d+1];d=t[h+1]<<1;let g=e[d],_=e[d+1];d=t[h+2]<<1;let p=e[d],m=e[d+1];for(let w=0;w<c;w++){let x=s.length;if(this.clip(u,f,g,_,p,m,a[w],n)){let M=n.length;if(M==0)continue;let b=M>>1,S=this.clipOutput,E=ge.setArraySize(s,x+b*2);for(let I=0;I<M;I+=2,x+=2){let y=S[I],T=S[I+1];E[x]=y,E[x+1]=T}x=o.length;let R=ge.setArraySize(o,x+3*(b-2));b--;for(let I=1;I<b;I++,x+=3)R[x]=l,R[x+1]=l+I,R[x+2]=l+I+1;l+=b+1}else{let M=ge.setArraySize(s,x+6);M[x]=u,M[x+1]=f,M[x+2]=g,M[x+3]=_,M[x+4]=p,M[x+5]=m,x=o.length;let b=ge.setArraySize(o,x+3);b[x]=l,b[x+1]=l+1,b[x+2]=l+2,l+=3;break}}}}clipTrianglesRender(e,t,i,n,s,o,a){let c=this.clipOutput,l=this.clippedVertices,h=this.clippedTriangles,d=this.clippingPolygons,u=d.length,f=a?12:8,g=0;l.length=0,h.length=0;for(let _=0;_<i;_+=3){let p=t[_]<<1,m=e[p],w=e[p+1],x=n[p],M=n[p+1];p=t[_+1]<<1;let b=e[p],S=e[p+1],E=n[p],R=n[p+1];p=t[_+2]<<1;let I=e[p],y=e[p+1],T=n[p],V=n[p+1];for(let k=0;k<u;k++){let C=l.length;if(this.clip(m,w,b,S,I,y,d[k],c)){let D=c.length;if(D==0)continue;let U=S-y,G=I-b,H=m-I,W=y-w,J=1/(U*H+G*(w-y)),te=D>>1,re=this.clipOutput,ie=ge.setArraySize(l,C+te*f);for(let j=0;j<D;j+=2,C+=f){let fe=re[j],Se=re[j+1];ie[C]=fe,ie[C+1]=Se,ie[C+2]=s.r,ie[C+3]=s.g,ie[C+4]=s.b,ie[C+5]=s.a;let me=fe-I,pe=Se-y,Le=(U*me+G*pe)*J,Te=(W*me+H*pe)*J,B=1-Le-Te;ie[C+6]=x*Le+E*Te+T*B,ie[C+7]=M*Le+R*Te+V*B,a&&(ie[C+8]=o.r,ie[C+9]=o.g,ie[C+10]=o.b,ie[C+11]=o.a)}C=h.length;let O=ge.setArraySize(h,C+3*(te-2));te--;for(let j=1;j<te;j++,C+=3)O[C]=g,O[C+1]=g+j,O[C+2]=g+j+1;g+=te+1}else{let D=ge.setArraySize(l,C+3*f);D[C]=m,D[C+1]=w,D[C+2]=s.r,D[C+3]=s.g,D[C+4]=s.b,D[C+5]=s.a,a?(D[C+6]=x,D[C+7]=M,D[C+8]=o.r,D[C+9]=o.g,D[C+10]=o.b,D[C+11]=o.a,D[C+12]=b,D[C+13]=S,D[C+14]=s.r,D[C+15]=s.g,D[C+16]=s.b,D[C+17]=s.a,D[C+18]=E,D[C+19]=R,D[C+20]=o.r,D[C+21]=o.g,D[C+22]=o.b,D[C+23]=o.a,D[C+24]=I,D[C+25]=y,D[C+26]=s.r,D[C+27]=s.g,D[C+28]=s.b,D[C+29]=s.a,D[C+30]=T,D[C+31]=V,D[C+32]=o.r,D[C+33]=o.g,D[C+34]=o.b,D[C+35]=o.a):(D[C+6]=x,D[C+7]=M,D[C+8]=b,D[C+9]=S,D[C+10]=s.r,D[C+11]=s.g,D[C+12]=s.b,D[C+13]=s.a,D[C+14]=E,D[C+15]=R,D[C+16]=I,D[C+17]=y,D[C+18]=s.r,D[C+19]=s.g,D[C+20]=s.b,D[C+21]=s.a,D[C+22]=T,D[C+23]=V),C=h.length;let U=ge.setArraySize(h,C+3);U[C]=g,U[C+1]=g+1,U[C+2]=g+2,g+=3;break}}}}clipTrianglesUnpacked(e,t,i,n){let s=this.clipOutput,o=this.clippedVertices,a=this.clippedUVs,c=this.clippedTriangles,l=this.clippingPolygons,h=l.length,d=0;o.length=0,a.length=0,c.length=0;for(let u=0;u<i;u+=3){let f=t[u]<<1,g=e[f],_=e[f+1],p=n[f],m=n[f+1];f=t[u+1]<<1;let w=e[f],x=e[f+1],M=n[f],b=n[f+1];f=t[u+2]<<1;let S=e[f],E=e[f+1],R=n[f],I=n[f+1];for(let y=0;y<h;y++){let T=o.length;if(this.clip(g,_,w,x,S,E,l[y],s)){let V=s.length;if(V==0)continue;let k=x-E,C=S-w,D=g-S,U=E-_,G=1/(k*D+C*(_-E)),H=V>>1,W=this.clipOutput,J=ge.setArraySize(o,T+H*2),te=ge.setArraySize(a,T+H*2);for(let ie=0;ie<V;ie+=2,T+=2){let O=W[ie],j=W[ie+1];J[T]=O,J[T+1]=j;let fe=O-S,Se=j-E,me=(k*fe+C*Se)*G,pe=(U*fe+D*Se)*G,Le=1-me-pe;te[T]=p*me+M*pe+R*Le,te[T+1]=m*me+b*pe+I*Le}T=c.length;let re=ge.setArraySize(c,T+3*(H-2));H--;for(let ie=1;ie<H;ie++,T+=3)re[T]=d,re[T+1]=d+ie,re[T+2]=d+ie+1;d+=H+1}else{let V=ge.setArraySize(o,T+6);V[T]=g,V[T+1]=_,V[T+2]=w,V[T+3]=x,V[T+4]=S,V[T+5]=E;let k=ge.setArraySize(a,T+3*2);k[T]=p,k[T+1]=m,k[T+2]=M,k[T+3]=b,k[T+4]=R,k[T+5]=I,T=c.length;let C=ge.setArraySize(c,T+3);C[T]=d,C[T+1]=d+1,C[T+2]=d+2,d+=3;break}}}}clip(e,t,i,n,s,o,a,c){let l=c,h=!1,d;a.length%4>=2?(d=c,c=this.scratch):d=this.scratch,d.length=0,d.push(e),d.push(t),d.push(i),d.push(n),d.push(s),d.push(o),d.push(e),d.push(t),c.length=0;let u=a.length-4,f=a;for(let g=0;;g+=2){let _=f[g],p=f[g+1],m=_-f[g+2],w=p-f[g+3],x=c.length,M=d;for(let S=0,E=d.length-2;S<E;){let R=M[S],I=M[S+1];S+=2;let y=M[S],T=M[S+1],V=w*(_-y)>m*(p-T),k=w*(_-R)-m*(p-I);if(k>0){if(V){c.push(y),c.push(T);continue}let C=y-R,D=T-I,U=k/(C*w-D*m);if(U>=0&&U<=1)c.push(R+C*U),c.push(I+D*U);else{c.push(y),c.push(T);continue}}else if(V){let C=y-R,D=T-I,U=k/(C*w-D*m);if(U>=0&&U<=1)c.push(R+C*U),c.push(I+D*U),c.push(y),c.push(T);else{c.push(y),c.push(T);continue}}h=!0}if(x==c.length)return l.length=0,!0;if(c.push(c[0]),c.push(c[1]),g==u)break;let b=c;c=d,c.length=0,d=b}if(l!=c){l.length=0;for(let g=0,_=c.length-2;g<_;g++)l[g]=c[g]}else l.length=l.length-2;return h}static makeClockwise(e){let t=e,i=e.length,n=t[i-2]*t[1]-t[0]*t[i-1],s=0,o=0,a=0,c=0;for(let l=0,h=i-3;l<h;l+=2)s=t[l],o=t[l+1],a=t[l+2],c=t[l+3],n+=s*c-a*o;if(!(n<0))for(let l=0,h=i-2,d=i>>1;l<d;l+=2){let u=t[l],f=t[l+1],g=h-l;t[l]=t[g],t[l+1]=t[g+1],t[g]=u,t[g+1]=f}}}class Ss{constructor(e){v(this,"attachmentLoader");v(this,"scale",1);v(this,"linkedMeshes",new Array);this.attachmentLoader=e}readSkeletonData(e){let t=this.scale,i=new B0,n=typeof e=="string"?JSON.parse(e):e,s=n.skeleton;if(s&&(i.hash=s.hash,i.version=s.spine,i.x=s.x,i.y=s.y,i.width=s.width,i.height=s.height,i.referenceScale=N(s,"referenceScale",100)*t,i.fps=s.fps,i.imagesPath=s.images??null,i.audioPath=s.audio??null),n.bones)for(let o=0;o<n.bones.length;o++){let a=n.bones[o],c=null,l=N(a,"parent",null);l&&(c=i.findBone(l));let h=new C0(i.bones.length,a.name,c);h.length=N(a,"length",0)*t,h.x=N(a,"x",0)*t,h.y=N(a,"y",0)*t,h.rotation=N(a,"rotation",0),h.scaleX=N(a,"scaleX",1),h.scaleY=N(a,"scaleY",1),h.shearX=N(a,"shearX",0),h.shearY=N(a,"shearY",0),h.inherit=ge.enumValue(ut,N(a,"inherit","Normal")),h.skinRequired=N(a,"skin",!1);let d=N(a,"color",null);d&&h.color.setFromString(d),i.bones.push(h)}if(n.slots)for(let o=0;o<n.slots.length;o++){let a=n.slots[o],c=a.name,l=i.findBone(a.bone);if(!l)throw new Error(`Couldn't find bone ${a.bone} for slot ${c}`);let h=new G0(i.slots.length,c,l),d=N(a,"color",null);d&&h.color.setFromString(d);let u=N(a,"dark",null);u&&(h.darkColor=Je.fromString(u)),h.attachmentName=N(a,"attachment",null),h.blendMode=ge.enumValue(ji,N(a,"blend","normal")),h.visible=N(a,"visible",!0),i.slots.push(h)}if(n.ik)for(let o=0;o<n.ik.length;o++){let a=n.ik[o],c=new D0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);for(let h=0;h<a.bones.length;h++){let d=i.findBone(a.bones[h]);if(!d)throw new Error(`Couldn't find bone ${a.bones[h]} for IK constraint ${a.name}.`);c.bones.push(d)}let l=i.findBone(a.target);if(!l)throw new Error(`Couldn't find target bone ${a.target} for IK constraint ${a.name}.`);c.target=l,c.mix=N(a,"mix",1),c.softness=N(a,"softness",0)*t,c.bendDirection=N(a,"bendPositive",!0)?1:-1,c.compress=N(a,"compress",!1),c.stretch=N(a,"stretch",!1),c.uniform=N(a,"uniform",!1),i.ikConstraints.push(c)}if(n.transform)for(let o=0;o<n.transform.length;o++){let a=n.transform[o],c=new H0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);for(let d=0;d<a.bones.length;d++){let u=a.bones[d],f=i.findBone(u);if(!f)throw new Error(`Couldn't find bone ${u} for transform constraint ${a.name}.`);c.bones.push(f)}let l=a.target,h=i.findBone(l);if(!h)throw new Error(`Couldn't find target bone ${l} for transform constraint ${a.name}.`);c.target=h,c.local=N(a,"local",!1),c.relative=N(a,"relative",!1),c.offsetRotation=N(a,"rotation",0),c.offsetX=N(a,"x",0)*t,c.offsetY=N(a,"y",0)*t,c.offsetScaleX=N(a,"scaleX",0),c.offsetScaleY=N(a,"scaleY",0),c.offsetShearY=N(a,"shearY",0),c.mixRotate=N(a,"mixRotate",1),c.mixX=N(a,"mixX",1),c.mixY=N(a,"mixY",c.mixX),c.mixScaleX=N(a,"mixScaleX",1),c.mixScaleY=N(a,"mixScaleY",c.mixScaleX),c.mixShearY=N(a,"mixShearY",1),i.transformConstraints.push(c)}if(n.path)for(let o=0;o<n.path.length;o++){let a=n.path[o],c=new U0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);for(let d=0;d<a.bones.length;d++){let u=a.bones[d],f=i.findBone(u);if(!f)throw new Error(`Couldn't find bone ${u} for path constraint ${a.name}.`);c.bones.push(f)}let l=a.target,h=i.findSlot(l);if(!h)throw new Error(`Couldn't find target slot ${l} for path constraint ${a.name}.`);c.target=h,c.positionMode=ge.enumValue(tn,N(a,"positionMode","Percent")),c.spacingMode=ge.enumValue(Ft,N(a,"spacingMode","Length")),c.rotateMode=ge.enumValue(An,N(a,"rotateMode","Tangent")),c.offsetRotation=N(a,"rotation",0),c.position=N(a,"position",0),c.positionMode==tn.Fixed&&(c.position*=t),c.spacing=N(a,"spacing",0),(c.spacingMode==Ft.Length||c.spacingMode==Ft.Fixed)&&(c.spacing*=t),c.mixRotate=N(a,"mixRotate",1),c.mixX=N(a,"mixX",1),c.mixY=N(a,"mixY",c.mixX),i.pathConstraints.push(c)}if(n.physics)for(let o=0;o<n.physics.length;o++){const a=n.physics[o],c=new k0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);const l=a.bone,h=i.findBone(l);if(h==null)throw new Error("Physics bone not found: "+l);c.bone=h,c.x=N(a,"x",0),c.y=N(a,"y",0),c.rotate=N(a,"rotate",0),c.scaleX=N(a,"scaleX",0),c.shearX=N(a,"shearX",0),c.limit=N(a,"limit",5e3)*t,c.step=1/N(a,"fps",60),c.inertia=N(a,"inertia",1),c.strength=N(a,"strength",100),c.damping=N(a,"damping",1),c.massInverse=1/N(a,"mass",1),c.wind=N(a,"wind",0),c.gravity=N(a,"gravity",0),c.mix=N(a,"mix",1),c.inertiaGlobal=N(a,"inertiaGlobal",!1),c.strengthGlobal=N(a,"strengthGlobal",!1),c.dampingGlobal=N(a,"dampingGlobal",!1),c.massGlobal=N(a,"massGlobal",!1),c.windGlobal=N(a,"windGlobal",!1),c.gravityGlobal=N(a,"gravityGlobal",!1),c.mixGlobal=N(a,"mixGlobal",!1),i.physicsConstraints.push(c)}if(n.skins)for(let o=0;o<n.skins.length;o++){let a=n.skins[o],c=new z0(a.name);if(a.bones)for(let l=0;l<a.bones.length;l++){let h=a.bones[l],d=i.findBone(h);if(!d)throw new Error(`Couldn't find bone ${h} for skin ${a.name}.`);c.bones.push(d)}if(a.ik)for(let l=0;l<a.ik.length;l++){let h=a.ik[l],d=i.findIkConstraint(h);if(!d)throw new Error(`Couldn't find IK constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}if(a.transform)for(let l=0;l<a.transform.length;l++){let h=a.transform[l],d=i.findTransformConstraint(h);if(!d)throw new Error(`Couldn't find transform constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}if(a.path)for(let l=0;l<a.path.length;l++){let h=a.path[l],d=i.findPathConstraint(h);if(!d)throw new Error(`Couldn't find path constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}if(a.physics)for(let l=0;l<a.physics.length;l++){let h=a.physics[l],d=i.findPhysicsConstraint(h);if(!d)throw new Error(`Couldn't find physics constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}for(let l in a.attachments){let h=i.findSlot(l);if(!h)throw new Error(`Couldn't find slot ${l} for skin ${a.name}.`);let d=a.attachments[l];for(let u in d){let f=this.readAttachment(d[u],c,h.index,u,i);f&&c.setAttachment(h.index,u,f)}}i.skins.push(c),c.name=="default"&&(i.defaultSkin=c)}for(let o=0,a=this.linkedMeshes.length;o<a;o++){let c=this.linkedMeshes[o],l=c.skin?i.findSkin(c.skin):i.defaultSkin;if(!l)throw new Error(`Skin not found: ${c.skin}`);let h=l.getAttachment(c.slotIndex,c.parent);if(!h)throw new Error(`Parent mesh not found: ${c.parent}`);c.mesh.timelineAttachment=c.inheritTimeline?h:c.mesh,c.mesh.setParentMesh(h),c.mesh.region!=null&&c.mesh.updateRegion()}if(this.linkedMeshes.length=0,n.events)for(let o in n.events){let a=n.events[o],c=new P0(o);c.intValue=N(a,"int",0),c.floatValue=N(a,"float",0),c.stringValue=N(a,"string",""),c.audioPath=N(a,"audio",null),c.audioPath&&(c.volume=N(a,"volume",1),c.balance=N(a,"balance",0)),i.events.push(c)}if(n.animations)for(let o in n.animations){let a=n.animations[o];this.readAnimation(a,o,i)}return i}readAttachment(e,t,i,n,s){let o=this.scale;switch(n=N(e,"name",n),N(e,"type","region")){case"region":{let a=N(e,"path",n),c=this.readSequence(N(e,"sequence",null)),l=this.attachmentLoader.newRegionAttachment(t,n,a,c);if(!l)return null;l.path=a,l.x=N(e,"x",0)*o,l.y=N(e,"y",0)*o,l.scaleX=N(e,"scaleX",1),l.scaleY=N(e,"scaleY",1),l.rotation=N(e,"rotation",0),l.width=e.width*o,l.height=e.height*o,l.sequence=c;let h=N(e,"color",null);return h&&l.color.setFromString(h),l.region!=null&&l.updateRegion(),l}case"boundingbox":{let a=this.attachmentLoader.newBoundingBoxAttachment(t,n);if(!a)return null;this.readVertices(e,a,e.vertexCount<<1);let c=N(e,"color",null);return c&&a.color.setFromString(c),a}case"mesh":case"linkedmesh":{let a=N(e,"path",n),c=this.readSequence(N(e,"sequence",null)),l=this.attachmentLoader.newMeshAttachment(t,n,a,c);if(!l)return null;l.path=a;let h=N(e,"color",null);h&&l.color.setFromString(h),l.width=N(e,"width",0)*o,l.height=N(e,"height",0)*o,l.sequence=c;let d=N(e,"parent",null);if(d)return this.linkedMeshes.push(new V0(l,N(e,"skin",null),i,d,N(e,"timelines",!0))),l;let u=e.uvs;return this.readVertices(e,l,u.length),l.triangles=e.triangles,l.regionUVs=u,l.region!=null&&l.updateRegion(),l.edges=N(e,"edges",null),l.hullLength=N(e,"hull",0)*2,l}case"path":{let a=this.attachmentLoader.newPathAttachment(t,n);if(!a)return null;a.closed=N(e,"closed",!1),a.constantSpeed=N(e,"constantSpeed",!0);let c=e.vertexCount;this.readVertices(e,a,c<<1);let l=ge.newArray(c/3,0);for(let d=0;d<e.lengths.length;d++)l[d]=e.lengths[d]*o;a.lengths=l;let h=N(e,"color",null);return h&&a.color.setFromString(h),a}case"point":{let a=this.attachmentLoader.newPointAttachment(t,n);if(!a)return null;a.x=N(e,"x",0)*o,a.y=N(e,"y",0)*o,a.rotation=N(e,"rotation",0);let c=N(e,"color",null);return c&&a.color.setFromString(c),a}case"clipping":{let a=this.attachmentLoader.newClippingAttachment(t,n);if(!a)return null;let c=N(e,"end",null);c&&(a.endSlot=s.findSlot(c));let l=e.vertexCount;this.readVertices(e,a,l<<1);let h=N(e,"color",null);return h&&a.color.setFromString(h),a}}return null}readSequence(e){if(e==null)return null;let t=new Ba(N(e,"count",0));return t.start=N(e,"start",1),t.digits=N(e,"digits",0),t.setupIndex=N(e,"setup",0),t}readVertices(e,t,i){let n=this.scale;t.worldVerticesLength=i;let s=e.vertices;if(i==s.length){let c=ge.toFloatArray(s);if(n!=1)for(let l=0,h=s.length;l<h;l++)c[l]*=n;t.vertices=c;return}let o=new Array,a=new Array;for(let c=0,l=s.length;c<l;){let h=s[c++];a.push(h);for(let d=c+h*4;c<d;c+=4)a.push(s[c]),o.push(s[c+1]*n),o.push(s[c+2]*n),o.push(s[c+3])}t.bones=a,t.vertices=ge.toFloatArray(o)}readAnimation(e,t,i){let n=this.scale,s=new Array;if(e.slots)for(let a in e.slots){let c=e.slots[a],l=i.findSlot(a);if(!l)throw new Error("Slot not found: "+a);let h=l.index;for(let d in c){let u=c[d];if(!u)continue;let f=u.length;if(d=="attachment"){let g=new ys(f,h);for(let _=0;_<f;_++){let p=u[_];g.setFrame(_,N(p,"time",0),N(p,"name",null))}s.push(g)}else if(d=="rgba"){let g=new e0(f,f<<2,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.color);for(let w=0,x=0;;w++){g.setFrame(w,p,m.r,m.g,m.b,m.a);let M=u[w+1];if(!M){g.shrink(x);break}let b=N(M,"time",0),S=Je.fromString(M.color),E=_.curve;E&&(x=je(E,g,x,w,0,p,b,m.r,S.r,1),x=je(E,g,x,w,1,p,b,m.g,S.g,1),x=je(E,g,x,w,2,p,b,m.b,S.b,1),x=je(E,g,x,w,3,p,b,m.a,S.a,1)),p=b,m=S,_=M}s.push(g)}else if(d=="rgb"){let g=new t0(f,f*3,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.color);for(let w=0,x=0;;w++){g.setFrame(w,p,m.r,m.g,m.b);let M=u[w+1];if(!M){g.shrink(x);break}let b=N(M,"time",0),S=Je.fromString(M.color),E=_.curve;E&&(x=je(E,g,x,w,0,p,b,m.r,S.r,1),x=je(E,g,x,w,1,p,b,m.g,S.g,1),x=je(E,g,x,w,2,p,b,m.b,S.b,1)),p=b,m=S,_=M}s.push(g)}else if(d=="alpha")s.push(li(u,new i0(f,f,h),0,1));else if(d=="rgba2"){let g=new n0(f,f*7,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.light),w=Je.fromString(_.dark);for(let x=0,M=0;;x++){g.setFrame(x,p,m.r,m.g,m.b,m.a,w.r,w.g,w.b);let b=u[x+1];if(!b){g.shrink(M);break}let S=N(b,"time",0),E=Je.fromString(b.light),R=Je.fromString(b.dark),I=_.curve;I&&(M=je(I,g,M,x,0,p,S,m.r,E.r,1),M=je(I,g,M,x,1,p,S,m.g,E.g,1),M=je(I,g,M,x,2,p,S,m.b,E.b,1),M=je(I,g,M,x,3,p,S,m.a,E.a,1),M=je(I,g,M,x,4,p,S,w.r,R.r,1),M=je(I,g,M,x,5,p,S,w.g,R.g,1),M=je(I,g,M,x,6,p,S,w.b,R.b,1)),p=S,m=E,w=R,_=b}s.push(g)}else if(d=="rgb2"){let g=new s0(f,f*6,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.light),w=Je.fromString(_.dark);for(let x=0,M=0;;x++){g.setFrame(x,p,m.r,m.g,m.b,w.r,w.g,w.b);let b=u[x+1];if(!b){g.shrink(M);break}let S=N(b,"time",0),E=Je.fromString(b.light),R=Je.fromString(b.dark),I=_.curve;I&&(M=je(I,g,M,x,0,p,S,m.r,E.r,1),M=je(I,g,M,x,1,p,S,m.g,E.g,1),M=je(I,g,M,x,2,p,S,m.b,E.b,1),M=je(I,g,M,x,3,p,S,w.r,R.r,1),M=je(I,g,M,x,4,p,S,w.g,R.g,1),M=je(I,g,M,x,5,p,S,w.b,R.b,1)),p=S,m=E,w=R,_=b}s.push(g)}}}if(e.bones)for(let a in e.bones){let c=e.bones[a],l=i.findBone(a);if(!l)throw new Error("Bone not found: "+a);let h=l.index;for(let d in c){let u=c[d],f=u.length;if(f!=0){if(d==="rotate")s.push(li(u,new za(f,f,h),0,1));else if(d==="translate"){let g=new Wg(f,f<<1,h);s.push(wa(u,g,"x","y",0,n))}else if(d==="translatex"){let g=new Xg(f,f,h);s.push(li(u,g,0,n))}else if(d==="translatey"){let g=new Yg(f,f,h);s.push(li(u,g,0,n))}else if(d==="scale"){let g=new qg(f,f<<1,h);s.push(wa(u,g,"x","y",1,1))}else if(d==="scalex"){let g=new Zg(f,f,h);s.push(li(u,g,1,1))}else if(d==="scaley"){let g=new $g(f,f,h);s.push(li(u,g,1,1))}else if(d==="shear"){let g=new jg(f,f<<1,h);s.push(wa(u,g,"x","y",0,1))}else if(d==="shearx"){let g=new Kg(f,f,h);s.push(li(u,g,0,1))}else if(d==="sheary"){let g=new Jg(f,f,h);s.push(li(u,g,0,1))}else if(d==="inherit"){let g=new Qg(f,l.index);for(let _=0;_<u.length;_++){let p=u[_];g.setFrame(_,N(p,"time",0),ge.enumValue(ut,N(p,"inherit","Normal")))}s.push(g)}}}}if(e.ik)for(let a in e.ik){let c=e.ik[a],l=c[0];if(!l)continue;let h=i.findIkConstraint(a);if(!h)throw new Error("IK Constraint not found: "+a);let d=i.ikConstraints.indexOf(h),u=new a0(c.length,c.length<<1,d),f=N(l,"time",0),g=N(l,"mix",1),_=N(l,"softness",0)*n;for(let p=0,m=0;;p++){u.setFrame(p,f,g,_,N(l,"bendPositive",!0)?1:-1,N(l,"compress",!1),N(l,"stretch",!1));let w=c[p+1];if(!w){u.shrink(m);break}let x=N(w,"time",0),M=N(w,"mix",1),b=N(w,"softness",0)*n,S=l.curve;S&&(m=je(S,u,m,p,0,f,x,g,M,1),m=je(S,u,m,p,1,f,x,_,b,n)),f=x,g=M,_=b,l=w}s.push(u)}if(e.transform)for(let a in e.transform){let c=e.transform[a],l=c[0];if(!l)continue;let h=i.findTransformConstraint(a);if(!h)throw new Error("Transform constraint not found: "+a);let d=i.transformConstraints.indexOf(h),u=new o0(c.length,c.length*6,d),f=N(l,"time",0),g=N(l,"mixRotate",1),_=N(l,"mixX",1),p=N(l,"mixY",_),m=N(l,"mixScaleX",1),w=N(l,"mixScaleY",m),x=N(l,"mixShearY",1);for(let M=0,b=0;;M++){u.setFrame(M,f,g,_,p,m,w,x);let S=c[M+1];if(!S){u.shrink(b);break}let E=N(S,"time",0),R=N(S,"mixRotate",1),I=N(S,"mixX",1),y=N(S,"mixY",I),T=N(S,"mixScaleX",1),V=N(S,"mixScaleY",T),k=N(S,"mixShearY",1),C=l.curve;C&&(b=je(C,u,b,M,0,f,E,g,R,1),b=je(C,u,b,M,1,f,E,_,I,1),b=je(C,u,b,M,2,f,E,p,y,1),b=je(C,u,b,M,3,f,E,m,T,1),b=je(C,u,b,M,4,f,E,w,V,1),b=je(C,u,b,M,5,f,E,x,k,1)),f=E,g=R,_=I,p=y,m=T,w=V,m=T,l=S}s.push(u)}if(e.path)for(let a in e.path){let c=e.path[a],l=i.findPathConstraint(a);if(!l)throw new Error("Path constraint not found: "+a);let h=i.pathConstraints.indexOf(l);for(let d in c){let u=c[d],f=u[0];if(!f)continue;let g=u.length;if(d==="position"){let _=new l0(g,g,h);s.push(li(u,_,0,l.positionMode==tn.Fixed?n:1))}else if(d==="spacing"){let _=new c0(g,g,h);s.push(li(u,_,0,l.spacingMode==Ft.Length||l.spacingMode==Ft.Fixed?n:1))}else if(d==="mix"){let _=new h0(g,g*3,h),p=N(f,"time",0),m=N(f,"mixRotate",1),w=N(f,"mixX",1),x=N(f,"mixY",w);for(let M=0,b=0;;M++){_.setFrame(M,p,m,w,x);let S=u[M+1];if(!S){_.shrink(b);break}let E=N(S,"time",0),R=N(S,"mixRotate",1),I=N(S,"mixX",1),y=N(S,"mixY",I),T=f.curve;T&&(b=je(T,_,b,M,0,p,E,m,R,1),b=je(T,_,b,M,1,p,E,w,I,1),b=je(T,_,b,M,2,p,E,x,y,1)),p=E,m=R,w=I,x=y,f=S}s.push(_)}}}if(e.physics)for(let a in e.physics){let c=e.physics[a],l=-1;if(a.length>0){let h=i.findPhysicsConstraint(a);if(!h)throw new Error("Physics constraint not found: "+a);l=i.physicsConstraints.indexOf(h)}for(let h in c){let d=c[h],u=d[0];if(!u)continue;let f=d.length;if(h=="reset"){const _=new Ga(f,l);for(let p=0;u!=null;u=d[p+1],p++)_.setFrame(p,N(u,"time",0));s.push(_);continue}let g;if(h=="inertia")g=new d0(f,f,l);else if(h=="strength")g=new u0(f,f,l);else if(h=="damping")g=new f0(f,f,l);else if(h=="mass")g=new p0(f,f,l);else if(h=="wind")g=new m0(f,f,l);else if(h=="gravity")g=new g0(f,f,l);else if(h=="mix")g=new _0(f,f,l);else continue;s.push(li(d,g,0,1))}}if(e.attachments)for(let a in e.attachments){let c=e.attachments[a],l=i.findSkin(a);if(!l)throw new Error("Skin not found: "+a);for(let h in c){let d=c[h],u=i.findSlot(h);if(!u)throw new Error("Slot not found: "+h);let f=u.index;for(let g in d){let _=d[g],p=l.getAttachment(f,g);for(let m in _){let w=_[m],x=w[0];if(x){if(m=="deform"){let M=p.bones,b=p.vertices,S=M?b.length/3*2:b.length,E=new r0(w.length,w.length,f,p),R=N(x,"time",0);for(let I=0,y=0;;I++){let T,V=N(x,"vertices",null);if(!V)T=M?ge.newFloatArray(S):b;else{T=ge.newFloatArray(S);let U=N(x,"offset",0);if(ge.arrayCopy(V,0,T,U,V.length),n!=1)for(let G=U,H=G+V.length;G<H;G++)T[G]*=n;if(!M)for(let G=0;G<S;G++)T[G]+=b[G]}E.setFrame(I,R,T);let k=w[I+1];if(!k){E.shrink(y);break}let C=N(k,"time",0),D=x.curve;D&&(y=je(D,E,y,I,0,R,C,0,1,1)),R=C,x=k}s.push(E)}else if(m=="sequence"){let M=new Ha(w.length,f,p),b=0;for(let S=0;S<w.length;S++){let E=N(x,"delay",b),R=N(x,"time",0),I=At[N(x,"mode","hold")],y=N(x,"index",0);M.setFrame(S,R,I,y,E),b=E,x=w[S+1]}s.push(M)}}}}}}if(e.drawOrder){let a=new is(e.drawOrder.length),c=i.slots.length,l=0;for(let h=0;h<e.drawOrder.length;h++,l++){let d=e.drawOrder[h],u=null,f=N(d,"offsets",null);if(f){u=ge.newArray(c,-1);let g=ge.newArray(c-f.length,0),_=0,p=0;for(let m=0;m<f.length;m++){let w=f[m],x=i.findSlot(w.slot);if(!x)throw new Error("Slot not found: "+x);let M=x.index;for(;_!=M;)g[p++]=_++;u[_+w.offset]=_++}for(;_<c;)g[p++]=_++;for(let m=c-1;m>=0;m--)u[m]==-1&&(u[m]=g[--p])}a.setFrame(l,N(d,"time",0),u)}s.push(a)}if(e.events){let a=new wr(e.events.length),c=0;for(let l=0;l<e.events.length;l++,c++){let h=e.events[l],d=i.findEvent(h.name);if(!d)throw new Error("Event not found: "+h.name);let u=new L0(ge.toSinglePrecision(N(h,"time",0)),d);u.intValue=N(h,"int",d.intValue),u.floatValue=N(h,"float",d.floatValue),u.stringValue=N(h,"string",d.stringValue),u.data.audioPath&&(u.volume=N(h,"volume",1),u.balance=N(h,"balance",0)),a.setFrame(c,u)}s.push(a)}let o=0;for(let a=0,c=s.length;a<c;a++)o=Math.max(o,s[a].getDuration());i.animations.push(new Nc(t,s,o))}}class V0{constructor(e,t,i,n,s){v(this,"parent");v(this,"skin");v(this,"slotIndex");v(this,"mesh");v(this,"inheritTimeline");this.mesh=e,this.skin=t,this.slotIndex=i,this.parent=n,this.inheritTimeline=s}}function li(r,e,t,i){let n=r[0],s=N(n,"time",0),o=N(n,"value",t)*i,a=0;for(let c=0;;c++){e.setFrame(c,s,o);let l=r[c+1];if(!l)return e.shrink(a),e;let h=N(l,"time",0),d=N(l,"value",t)*i;n.curve&&(a=je(n.curve,e,a,c,0,s,h,o,d,i)),s=h,o=d,n=l}}function wa(r,e,t,i,n,s){let o=r[0],a=N(o,"time",0),c=N(o,t,n)*s,l=N(o,i,n)*s,h=0;for(let d=0;;d++){e.setFrame(d,a,c,l);let u=r[d+1];if(!u)return e.shrink(h),e;let f=N(u,"time",0),g=N(u,t,n)*s,_=N(u,i,n)*s,p=o.curve;p&&(h=je(p,e,h,d,0,a,f,c,g,s),h=je(p,e,h,d,1,a,f,l,_,s)),a=f,c=g,l=_,o=u}}function je(r,e,t,i,n,s,o,a,c,l){if(r=="stepped")return e.setStepped(i),t;let h=n<<2,d=r[h],u=r[h+1]*l,f=r[h+2],g=r[h+3]*l;return e.setBezier(t,i,n,s,a,d,u,f,g,o,c),t+1}function N(r,e,t){return r[e]!==void 0?r[e]:t}typeof Math.fround>"u"&&(Math.fround=function(r){return function(e){return r[0]=e,r[0]}}(new Float32Array(1)));const Mn=class Mn extends y0{constructor(t,i=!1){super(t);v(this,"texture");t instanceof ImageBitmap?this.texture=new Hg(t):this.texture=new si(t),this.texture.premultiplyAlpha=!i,this.texture.flipY=!1,this.texture.needsUpdate=!0}setFilters(t,i){this.texture.minFilter=Mn.toThreeJsMinificationTextureFilter(t),this.texture.magFilter=Mn.toThreeJsMagnificationTextureFilter(i)}setWraps(t,i){this.texture.wrapS=Mn.toThreeJsTextureWrap(t),this.texture.wrapT=Mn.toThreeJsTextureWrap(i)}dispose(){this.texture.dispose()}static toThreeJsMinificationTextureFilter(t){if(t===Et.Linear)return bt;if(t===Et.MipMap)return sd;if(t===Et.MipMapLinearNearest)return nd;if(t===Et.MipMapNearestLinear)return id;if(t===Et.MipMapNearestNearest)return td;if(t===Et.Nearest)return xt;throw new Error("Unknown texture filter: "+t)}static toThreeJsMagnificationTextureFilter(t){if(t===Et.Linear)return bt;if(t===Et.MipMap)return bt;if(t===Et.MipMapLinearNearest)return xt;if(t===Et.MipMapNearestLinear)return bt;if(t===Et.MipMapNearestNearest)return xt;if(t===Et.Nearest)return xt;throw new Error("Unknown texture filter: "+t)}static toThreeJsTextureWrap(t){if(t===Ii.ClampToEdge)return ii;if(t===Ii.MirroredRepeat)return mr;if(t===Ii.Repeat)return pr;throw new Error("Unknown texture wrap: "+t)}static toThreeJsBlending(t){if(t===ji.Normal)return{blending:Pi};if(t===ji.Additive)return{blending:Aa};if(t===ji.Multiply)return{blending:Ca,blendSrc:ec,blendDst:bs,blendSrcAlpha:lr,blendDstAlpha:bs};if(t===ji.Screen)return{blending:Ca,blendSrc:lr,blendDst:Ra,blendSrcAlpha:lr,blendDstAlpha:Ra};throw new Error("Unknown blendMode: "+t)}};v(Mn,"fist",!0);let Er=Mn;class ar extends R0{constructor(e="",t=new Oc,i=!1){super(n=>new Er(n,i),e,t)}}const Wi=class Wi extends Gt{constructor(t,i=()=>{}){super();v(this,"tempPos",new As);v(this,"tempUv",new As);v(this,"tempLight",new Je);v(this,"tempDark",new Je);v(this,"skeleton");v(this,"state");v(this,"zOffset",.1);v(this,"batches",new Array);v(this,"materialFactory");v(this,"nextBatchIndex",0);v(this,"clipper",new yr);v(this,"vertexSize",8);v(this,"twoColorTint");v(this,"vertices",ge.newFloatArray(1024));v(this,"tempColor",new Je);v(this,"tempDarkColor",new Je);v(this,"_castShadow",!1);v(this,"_receiveShadow",!1);"skeletonData"in t||(t={skeletonData:t,materialFactory:()=>{const o={...Wi.DEFAULT_MATERIAL_PARAMETERS};return i(o),new Sr(o)}}),this.twoColorTint=t.twoColorTint??!0,this.twoColorTint&&(this.vertexSize+=4),this.materialFactory=t.materialFactory??(()=>new Sr(Wi.DEFAULT_MATERIAL_PARAMETERS)),this.skeleton=new Xa(t.skeletonData);let n=new w0(t.skeletonData);this.state=new Va(n),Object.defineProperty(this,"castShadow",{get:()=>this._castShadow,set:s=>{this._castShadow=s,this.traverse(o=>{o instanceof Kn&&(o.castShadow=s)})}}),Object.defineProperty(this,"receiveShadow",{get:()=>this._receiveShadow,set:s=>{this._receiveShadow=s,this.traverse(o=>{o instanceof Kn&&(o.receiveShadow=s)})}})}update(t){let i=this.state,n=this.skeleton;i.update(t),i.apply(n),n.update(t),n.updateWorldTransform(Yi.update),this.updateGeometry()}dispose(){for(var t=0;t<this.batches.length;t++)this.batches[t].dispose()}clearBatches(){for(var t=0;t<this.batches.length;t++)this.batches[t].clear(),this.batches[t].visible=!1;this.nextBatchIndex=0}nextBatch(){if(this.batches.length==this.nextBatchIndex){let i=new Kn(Kn.MAX_VERTICES,this.materialFactory,this.twoColorTint);i.castShadow=this._castShadow,i.receiveShadow=this._receiveShadow,this.add(i),this.batches.push(i)}let t=this.batches[this.nextBatchIndex++];return t.visible=!0,t}updateGeometry(){this.clearBatches();let t=this.tempLight;this.tempDark;let i=this.clipper,n=this.vertices,s=null,o=null,a=this.skeleton.drawOrder,c=this.nextBatch();c.begin();let l=0,h=this.zOffset;for(let d=0,u=a.length;d<u;d++){let f=i.isClipping()?2:this.vertexSize,g=a[d];if(!g.bone.active){i.clipEndWithSlot(g);continue}let _=g.getAttachment(),p,m,w=0;if(_ instanceof Cs){let x=_;p=x.color,n=this.vertices,w=f*4,x.computeWorldVertices(g,n,0,f),s=Wi.QUAD_TRIANGLES,o=x.uvs,m=x.region.texture}else if(_ instanceof Rn){let x=_;p=x.color,n=this.vertices,w=(x.worldVerticesLength>>1)*f,w>n.length&&(n=this.vertices=ge.newFloatArray(w)),x.computeWorldVertices(g,0,x.worldVerticesLength,n,0,f),s=x.triangles,o=x.uvs,m=x.region.texture}else if(_ instanceof Is){let x=_;i.clipStart(g,x);continue}else{i.clipEndWithSlot(g);continue}if(m!=null){let M=g.bone.skeleton.color,b=g.color,S=M.a*b.a*p.a,E=this.tempColor;E.set(M.r*b.r*p.r*S,M.g*b.g*p.g*S,M.b*b.b*p.b*S,S);let R=this.tempDarkColor;g.darkColor?(R.r=g.darkColor.r*S,R.g=g.darkColor.g*S,R.b=g.darkColor.b*S,R.a=1):R.set(1,1,1,0);let I,y,T,V;if(i.isClipping()){i.clipTriangles(n,s,s.length,o,E,t,this.twoColorTint);let U=i.clippedVertices,G=i.clippedTriangles;I=U,y=U.length,T=G,V=G.length}else{let U=n;if(this.twoColorTint)for(let G=2,H=0,W=w;G<W;G+=f,H+=2)U[G]=E.r,U[G+1]=E.g,U[G+2]=E.b,U[G+3]=E.a,U[G+4]=o[H],U[G+5]=o[H+1],U[G+6]=R.r,U[G+7]=R.g,U[G+8]=R.b,U[G+9]=R.a;else for(let G=2,H=0,W=w;G<W;G+=f,H+=2)U[G]=E.r,U[G+1]=E.g,U[G+2]=E.b,U[G+3]=E.a,U[G+4]=o[H],U[G+5]=o[H+1];I=n,y=w,T=s,V=s.length}if(y==0||V==0){i.clipEndWithSlot(g);continue}c.canBatch(y/this.vertexSize,V)||(c.end(),c=this.nextBatch(),c.begin());const k=g.data.blendMode,C=m.texture,D=c.findMaterialGroup(C,k);c.addMaterialGroup(V,D),c.batch(I,y,T,V,l),l+=h}i.clipEndWithSlot(g)}i.clipEnd(),c.end()}};v(Wi,"DEFAULT_MATERIAL_PARAMETERS",{side:gi,depthWrite:!0,depthTest:!0,transparent:!0,alphaTest:.001,vertexColors:!0,premultipliedAlpha:!0}),v(Wi,"QUAD_TRIANGLES",[0,1,2,2,3,0]),v(Wi,"VERTEX_SIZE",8);let qi=Wi;const Es=class Es extends vi{constructor(t=Es.MAX_VERTICES,i,n=!0){super();v(this,"materialFactory");v(this,"twoColorTint");v(this,"vertexSize",9);v(this,"vertexBuffer");v(this,"vertices");v(this,"verticesLength",0);v(this,"indices");v(this,"indicesLength",0);v(this,"materialGroups",[]);if(this.materialFactory=i,this.twoColorTint=n,t>Es.MAX_VERTICES)throw new Error("Can't have more than 10920 triangles per batch: "+t);n&&(this.vertexSize+=3);let s=this.vertices=new Float32Array(t*this.vertexSize),o=this.indices=new Uint16Array(t*3),a=new rn,c=this.vertexBuffer=new Gg(s,this.vertexSize);c.usage=WebGLRenderingContext.DYNAMIC_DRAW,a.setAttribute("position",new jn(c,3,0,!1)),a.setAttribute("color",new jn(c,4,3,!1)),a.setAttribute("uv",new jn(c,2,7,!1)),n&&a.setAttribute("darkcolor",new jn(c,3,9,!1)),a.setIndex(new ni(o,1)),a.getIndex().usage=WebGLRenderingContext.DYNAMIC_DRAW,a.drawRange.start=0,a.drawRange.count=0,this.geometry=a,this.material=[]}dispose(){if(this.geometry.dispose(),this.material instanceof bn)this.material.dispose();else if(this.material)for(let t=0;t<this.material.length;t++){let i=this.material[t];i instanceof bn&&i.dispose()}}clear(){let t=this.geometry;if(t.drawRange.start=0,t.drawRange.count=0,t.clearGroups(),this.materialGroups=[],this.material instanceof bn){const i=this.material;i.map=null,i.blending=Pi}else if(Array.isArray(this.material))for(let i=0;i<this.material.length;i++){const n=this.material[i];n.map=null,n.blending=Pi}return this}begin(){this.verticesLength=0,this.indicesLength=0}canBatch(t,i){return!(this.indicesLength+i>=this.indices.byteLength/2||this.verticesLength/this.vertexSize+t>=this.vertices.byteLength/4/this.vertexSize)}batch(t,i,n,s,o=0){let a=this.verticesLength/this.vertexSize,c=this.vertices,l=this.verticesLength,h=0;if(this.twoColorTint)for(;h<i;)c[l++]=t[h++],c[l++]=t[h++],c[l++]=o,c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],h++;else for(;h<i;)c[l++]=t[h++],c[l++]=t[h++],c[l++]=o,c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++],c[l++]=t[h++];this.verticesLength=l;let d=this.indices;for(l=this.indicesLength,h=0;h<s;l++,h++)d[l]=n[h]+a;this.indicesLength+=s}end(){this.vertexBuffer.needsUpdate=this.verticesLength>0,this.vertexBuffer.addUpdateRange(0,this.verticesLength);let t=this.geometry;this.closeMaterialGroups();let i=t.getIndex();if(!i)throw new Error("BufferAttribute must not be null.");i.needsUpdate=this.indicesLength>0,i.addUpdateRange(0,this.indicesLength),t.drawRange.start=0,t.drawRange.count=this.indicesLength,t.computeVertexNormals()}addMaterialGroup(t,i){const n=this.materialGroups[this.materialGroups.length-1];n===void 0||n[2]!==i?this.materialGroups.push([this.indicesLength,t,i]):n[1]+=t}closeMaterialGroups(){const t=this.geometry;for(let i=0;i<this.materialGroups.length;i++){const[n,s,o]=this.materialGroups[i];t.addGroup(n,s,o)}}findMaterialGroup(t,i){const n=Er.toThreeJsBlending(i);let s=-1;if(Array.isArray(this.material)){for(let a=0;a<this.material.length;a++){const c=this.material[a];if(!c.map)return Ol(c,t,n),a;if(c.map===t&&n.blending===c.blending&&(n.blendSrc===void 0||n.blendSrc===c.blendSrc)&&(n.blendDst===void 0||n.blendDst===c.blendDst)&&(n.blendSrcAlpha===void 0||n.blendSrcAlpha===c.blendSrcAlpha)&&(n.blendDstAlpha===void 0||n.blendDstAlpha===c.blendDstAlpha))return a}const o=this.newMaterial();Ol(o,t,n),this.material.push(o),s=this.material.length-1}else throw new Error("MeshBatcher.material needs to be an array for geometry groups to work");return s}newMaterial(){const t=this.materialFactory(qi.DEFAULT_MATERIAL_PARAMETERS);if(!("map"in t))throw new Error("The material factory must return a material having the map property for the texture.");return t instanceof X0||(this.twoColorTint&&(t.defines={...t.defines,USE_SPINE_DARK_TINT:1}),t.onBeforeCompile=W0),t}};v(Es,"MAX_VERTICES",10920);let Kn=Es;const W0=r=>{let e;r.vertexShader=`
		#if defined( USE_SPINE_DARK_TINT )
			attribute vec3 darkcolor;
		#endif
	`+r.vertexShader,e=`
		#if defined( USE_SPINE_DARK_TINT )
			varying vec3 v_dark;
		#endif
	`,r.vertexShader=ya(r.vertexShader,"#include <color_pars_vertex>",e),e=`
		#if defined( USE_SPINE_DARK_TINT )
			v_dark = vec3( 1.0 );
			v_dark *= darkcolor;
		#endif
	`,r.vertexShader=ya(r.vertexShader,"#include <color_vertex>",e),e=`
		#ifdef USE_SPINE_DARK_TINT
			varying vec3 v_dark;
		#endif
	`,r.fragmentShader=ya(r.fragmentShader,"#include <color_pars_fragment>",e),r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`
			#ifdef USE_SPINE_DARK_TINT
				#ifdef USE_COLOR_ALPHA
						diffuseColor.a *= vColor.a;
						diffuseColor.rgb *= (1.0 - diffuseColor.rgb) * v_dark.rgb + diffuseColor.rgb * vColor.rgb;
				#endif
			#else
				#ifdef USE_COLOR_ALPHA
						diffuseColor *= vColor;
				#endif
			#endif
		`),r.fragmentShader=r.fragmentShader.replace("#include <premultiplied_alpha_fragment>",""),r.fragmentShader=r.fragmentShader.replace("#include <colorspace_fragment>","")};function ya(r,e,t){const i=r.indexOf(e),n=r.slice(0,i+e.length),s=r.slice(i+e.length);return n+t+s}function Ol(r,e,t){r.map=e,Object.assign(r,t),r.needsUpdate=!0}class X0 extends Ui{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(e){let t=`
			varying vec2 vUv;
			varying vec4 vColor;
			void main() {
				vUv = uv;
				vColor = color;
				gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
			}
		`,i=`
			uniform sampler2D map;
			#ifdef USE_SPINE_ALPHATEST
			uniform float alphaTest;
			#endif
			varying vec2 vUv;
			varying vec4 vColor;
			void main(void) {
				gl_FragColor = texture2D(map, vUv)*vColor;
				#ifdef USE_SPINE_ALPHATEST
					if (gl_FragColor.a < alphaTest) discard;
				#endif
			}
		`,n={map:{value:null}};e.uniforms&&(n={...e.uniforms,...n}),e.alphaTest&&e.alphaTest>0&&(e.defines={USE_SPINE_ALPHATEST:1}),super({vertexShader:t,fragmentShader:i,...e,uniforms:n})}}let xn,ns,vn,Ri,kl=Date.now()/1e3,or="/2025-group-3/game/asset/spine/",Bl,ss,zl,Kt,kc="capoo_basic_002.json",Bc="capoo_basic_002.atlas",Y0="run",q0=["basic","blankly","blissful","chew","confidence","delighted","eager","emoji","happy","kawaii","like","pleased","poo","serious","shy","sleep"],Gl,rs,Hl,Jt,zc="capoo_basic_face_001.json",Gc="capoo_basic_face_001.atlas",Z0="basic",Vl,as,Wl,Qt,Hc="capoo_hat_102.json",Vc="capoo_hat_102.atlas",$0="animation",Xl,Zi,Yl,pi,Ya="capoo_back_102.json",qa="capoo_back_102.atlas",ql="animation",Zl,$l,wn,ws=.2;function j0(){let r=window.innerWidth,e=window.innerHeight;ns=new ti(75,r/e,1,3e3),ns.position.y=0,ns.position.z=400,xn=new zg,vn=new Ic({antialias:!0,alpha:!0}),vn.setSize(r,e),vn.setClearColor(0,0),document.body.appendChild(vn.domElement),Ri=vn.domElement,Ri.style.position="absolute",Ri.style.top="0",Ri.style.left="0",Ri.style.pointerEvents="none",ss=new ar(or),ss.loadText(kc),ss.loadTextureAtlas(Bc),rs=new ar(or),rs.loadText(zc),rs.loadTextureAtlas(Gc),as=new ar(or),as.loadText(Hc),as.loadTextureAtlas(Vc),Zi=new ar(or),Zi.loadText(Ya),Zi.loadTextureAtlas(qa),requestAnimationFrame(Wc)}function Wc(r,e){if(console.log("SpineLayer loading"),ss.isLoadingComplete()&&rs.isLoadingComplete()&&as.isLoadingComplete()&&Zi.isLoadingComplete()){Bl=ss.require(Bc),zl=new Ms(Bl);let t=new Ss(zl);t.scale=ws;let i=t.readSkeletonData(ss.require(kc));Kt=new qi({skeletonData:i}),Kt.state.setAnimation(0,Y0,!0),xn.add(Kt),Gl=rs.require(Gc),Hl=new Ms(Gl);let n=new Ss(Hl);n.scale=ws;let s=n.readSkeletonData(rs.require(zc));Jt=new qi({skeletonData:s}),Jt.state.setAnimation(0,Z0,!0),xn.add(Jt),Vl=as.require(Vc),Wl=new Ms(Vl);let o=new Ss(Wl);o.scale=ws;let a=o.readSkeletonData(as.require(Hc));Qt=new qi({skeletonData:a}),Qt.state.setAnimation(0,$0,!0),xn.add(Qt),Xl=Zi.require(qa),Yl=new Ms(Xl);let c=new Ss(Yl);c.scale=ws;let l=c.readSkeletonData(Zi.require(Ya));pi=new qi({skeletonData:l}),pi.state.setAnimation(0,ql,!0),xn.add(pi),Zl=Zi.require(qa),$l=new Ms(Zl);let h=new Ss($l);h.scale=ws;let d=h.readSkeletonData(Zi.require(Ya));wn=new qi({skeletonData:d}),wn.state.setAnimation(0,ql,!0),xn.add(wn),requestAnimationFrame(Xc)}else requestAnimationFrame(Wc)}function Xc(){let r=Date.now()/1e3,e=r-kl;kl=r,K0(),Kt.update(e),Jt.update(e),Qt.update(e),pi.update(e),wn.update(e);let t=Kt.skeleton.findBone("root");t&&(t.rotation=-1),Jt&&Jt.state.setAnimation(0,q0[window.currentFaceIndex],!0);let i=Kt.skeleton.findBone("body_face_root"),n=Jt.skeleton.findBone("root"),s=Kt.skeleton.findBone("hat"),o=Qt.skeleton.findBone("root"),a=Kt.skeleton.findBone("back"),c=pi.skeleton.findBone("root");wn.position.set(Ea,ba,-1),Kt.visible=Br,Jt.visible=Br,Qt.visible=Br,pi.visible=Kl,wn.visible=jl,typeof dr<"u"&&(dr?(Jt.position.set(-(i.worldX-n.worldX),i.worldY-n.worldY,8),Qt.position.set(-(s.worldX-o.worldX),s.worldY-o.worldY,4),pi.position.set(-(a.worldX-c.worldX),a.worldY-c.worldY,-1),wn.position.set(Ea,ba,-1),Kt.scale.x=-1,Jt.scale.x=-1,Qt.scale.x=-1,Qt.scale.y=1,pi.scale.x=-1):(Kt.scale.x=1,Jt.scale.x=1,Qt.scale.x=1,Qt.scale.y=1,pi.scale.x=1,Jt.position.set(i.worldX-n.worldX,i.worldY-n.worldY,8),Qt.position.set(s.worldX-o.worldX,s.worldY-o.worldY,4),pi.position.set(a.worldX-c.worldX,a.worldY-c.worldY,-1))),Kt.rotation.y=0,vn.render(xn,ns),requestAnimationFrame(Xc)}function K0(){let r=window.innerWidth,e=window.innerHeight;(Ri.width!=r||Ri.height!=e)&&(Ri.width=r,Ri.height=e),ns.aspect=r/e,ns.updateProjectionMatrix(),vn.setSize(r,e)}j0();
