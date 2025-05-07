var $c=Object.defineProperty;var jc=(r,e,t)=>e in r?$c(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var v=(r,e,t)=>jc(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();let Zl=!1,$l=!0,Ar=0,Cr=0;const se=Object.freeze({GAME_WIDTH:6400,GAME_HEIGHT:3200,TILE_SIZE:70,TILE_MARGIN:0,LEVEL_LIST:[1,2],FRAME_INTERVAL:18,CAT_WIDTH:160,CAT_HEIGHT:112,POTION_WIDTH:20,POTION_HEIGHT:20});function Us(r){Zl=r}function Ns(r){$l=r}function Kc(r){Ar=r}function Jc(r){Cr=r}const gt=Object.freeze({START:"start",LEVEL_SELECT:"levelSelect",PLAYING:"playing",LEVEL_COMPLETE:"levelComplete",GAME_OVER:"game_over"});class Xi{constructor(e,t,n,i,s,l={},a="default"){this.text=e,this.x=t,this.y=n,this.duration=i,this.size=s,this.alpha=220,this.options=Object.assign({maxbgAlpha:200,maxtextAlpha:220,textAlign:CENTER,textColor:color(255,255,255),backgroundColor:color(0,0,0),borderColor:color(255,255,255),borderWidth:2,font:"Arial",scaling:!1,changeAlpha:!1,textPos:"center"},l),this.messageType=a,this.startTime=millis()}show(){let e=millis()-this.startTime,t=this.alpha;this.options.changeAlpha&&(e<=this.duration?(t=map(e,0,this.duration,0,this.options.maxtextAlpha),t=constrain(t,0,this.options.maxtextAlpha)):this.alpha=this.options.maxtextAlpha);let n=this.size;this.options.scaling&&(n=this.size+Math.sin(e/450)*4),this.applyMessageTypeAdjustments(),this.drawMessageText(n,t)}applyMessageTypeAdjustments(){switch(this.messageType){case"Title":this.options.textAlign=CENTER,this.options.textColor=color(108,140,240),this.options.backgroundColor=color(0,0,0,150),this.options.borderColor=color(255,255,143),this.options.borderWidth=10;break;case"startScreen":this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.backgroundColor=color(0,0,139),this.options.borderColor=color(173,216,140),this.options.borderWidth=10;break;case"levelSelectScreen":this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.borderColor=color(255,150,180),this.options.borderWidth=10;break;case"Tip":this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.borderColor=color(255,150,180),this.options.borderWidth=6;break;case"death":this.options.textAlign=CENTER,this.options.textColor=color(255,100,100),this.options.borderColor=color(255,255,255),this.options.borderWidth=4,this.size=30;break;case"gameOver":this.options.textAlign=CENTER,this.options.textColor=color(255,0,0),this.options.backgroundColor=color(0,0,0,180),this.size=40;break;default:this.options.textAlign=CENTER,this.options.textColor=color(255,255,255),this.options.backgroundColor=color(0,0,0,200);break}}drawMessageBackground(e,t){textAlign(this.options.textAlign,CENTER),rectMode(CENTER),fill(this.options.backgroundColor.levels[0],this.options.backgroundColor.levels[1],this.options.backgroundColor.levels[2],t);let n=this.countLines(this.text),i=Math.max(200,textWidth(this.text)+e),s=e*n*1.5;rect(this.x,this.y-e*.1,i,s,e/2)}drawMessageText(e,t){fill(this.options.textColor.levels[0],this.options.textColor.levels[1],this.options.textColor.levels[2],t),strokeWeight(this.options.borderWidth),stroke(this.options.borderColor.levels[0],this.options.borderColor.levels[1],this.options.borderColor.levels[2],t),textSize(e),textAlign(CENTER,CENTER),text(this.text,this.x,this.y)}isExpired(){return millis()-this.startTime>this.duration}countLines(e){return e.split(`
`).length}}class Qc{constructor(){v(this,"gameState");v(this,"selectedLevel");v(this,"firstGameStarted");v(this,"assets");v(this,"levelHeight");v(this,"levelWidth");v(this,"decorate");v(this,"trap");v(this,"coll");v(this,"merge");v(this,"ice");v(this,"spring");v(this,"switches");v(this,"keysItem");v(this,"flag");v(this,"elevatingWalls");v(this,"offsetX");v(this,"offsetY");v(this,"keys");v(this,"messages");v(this,"cat");v(this,"potion");v(this,"flagp");this.gameState=gt.START,this.selectedLevel=0,this.firstGameStarted=!0,this.assets={},this.levelHeight=[],this.levelWidth=[],this.decorate=[],this.trap=[],this.water=[],this.coll=[],this.ground=[],this.merge=[],this.ice=[],this.spring=[],this.switches=[],this.keysItem=[],this.elevatingWalls=[],this.flag=[],this.flagp=0,this.climb=[],this.cat=[],this.offsetX=0,this.offsetY=0,this.keys={},this.keysESC=!1,this.showHelp=!1,this.messages=[],this.potion}}class Ya{constructor(){}}class jl extends Ya{constructor(t,n){super();v(this,"x");v(this,"y");v(this,"iniX");v(this,"iniY");v(this,"speed");v(this,"maxhp");v(this,"hp");this.x=t,this.y=n,this.iniX=t,this.iniY=n,this.speed=10,this.maxhp=5,this.hp=5}}class eh extends jl{constructor(e,t){super(e,t),this.speed=10,this.iniX=e,this.iniY=t,this.velocityY=0,this.gravity=.4,this.jumpStrength=-12,this.onGround=!1,this.facingRight=!0,this.isMerged=!0,this.keyNum=0}}class th extends jl{constructor(e=0,t=0){super(e,t),this.facingRight=!1,this.facingLeft=!1,this.velocityY=0,this.gravity=.4,this.jumpStrength=-12,this.onGround=!1,this.tanshe=!0,this.onWall=!1}setPotionPosition(e,t){this.x=e,this.y=t}updatePotion(e,t){Kc((this.x-e)/2.5),Jc((t-this.y)/2.6)}getx(){return Ar}gety(){return Cr}}class Rr extends Ya{constructor(t,n,i,s){super();v(this,"x");v(this,"y");v(this,"imgIndex");v(this,"levelIndex");this.x=t,this.y=n,this.imgIndex=i,this.levelIndex=s}}class nh extends Rr{constructor(t,n,i,s,l,a,c){super(t,n,i,s);v(this,"id");v(this,"range");v(this,"towards");switch(this.id=l,this.range=a,this.towards=c,this.pixelRange=(a-1)*70,this.iniX=t,this.iniY=n,this.iniTargetX,this.iniTargetY,this.targetX=t,this.targetY=n,this.beActivated=!1,this.speed=20,this.moving=!1,this.movingTimer=0,this.movingDuration=100,this.towards){case"up":this.iniTargetX=t,this.iniTargetY=n-this.pixelRange;break;case"down":this.iniTargetX=t,this.iniTargetY=n+this.pixelRange;break;case"left":this.iniTargetX=t-this.pixelRange,this.iniTargetY=n;break;case"right":this.iniTargetX=t+this.pixelRange,this.iniTargetY=n;break}}isColling(t,n,i,s,l){let a=30,c=this.x+i/2,o=this.y+i/2;return c>=t-s/2-a&&c<=t+s/2+a&&o>=n-l-a&&o<=n+a}update(){if(!this.moving)return;this.movingTimer++;let t=this.movingTimer/this.movingDuration;if(t>=1)this.x=this.targetX,this.y=this.targetY,this.moving=!1,this.movingTimer=0;else{let n=this.beActivated?this.iniX:this.iniTargetX,i=this.beActivated?this.iniTargetX:this.iniX,s=this.beActivated?this.iniY:this.iniTargetY,l=this.beActivated?this.iniTargetY:this.iniY;this.x=n+(i-n)*t,this.y=s+(l-s)*t}}move(){this.beActivated=!this.beActivated,this.beActivated?(this.targetX=this.iniTargetX,this.targetY=this.iniTargetY):(this.targetX=this.iniX,this.targetY=this.iniY),this.moving=!0,this.movingTimer=0}}class ih extends Rr{constructor(t,n,i,s){super(t,n,i,s);v(this,"frameCounter");v(this,"frameIndex");v(this,"animationFrames");this.frameCounter=0,this.frameIndex=0,this.animationFrames=[i,i+1],this.visible=!1}isNear(t,n,i,s,l){let a=20,c=this.x+i/2,o=this.y+i/2;return c>=t-s/2-a&&c<=t+s/2+a&&o>=n-l-a&&o<=n+a}}class sh extends Rr{constructor(t,n,i,s){super(t,n,i,s);v(this,"frameCounter");v(this,"frameIndex");v(this,"animationFrames");v(this,"visible");this.frameCounter=0,this.frameIndex=0,this.animationFrames=[i,i+1],this.visible=!0}isNear(t,n,i,s,l){let a=20,c=this.x+i/2,o=this.y+i/2;return c>=t-s/2-a&&c<=t+s/2+a&&o>=n-l-a&&o<=n+a}}class rh extends Rr{constructor(t,n,i,s,l){super(t,n,i,s);v(this,"id");this.id=l,this.iniImgIndex=i,this.beActivated=!1,this.prevState=!1,this.invincible=!1,this.invincibleTimer=0,this.invincibleDuration=100}isNear(t,n,i,s,l){let a=20,c=this.x+i/2,o=this.y+i/2;return c>=t-s/2-a&&c<=t+s/2+a&&o>=n-l-a&&o<=n+a}}class Pn extends Ya{constructor(e,t){super(),this.data=e,this.levelIndex=t}}class ah extends Pn{constructor(e,t){super(e,t)}}class oh extends Pn{constructor(e,t){super(e,t)}}class lh extends Pn{constructor(e,t){super(e,t)}}class ch extends Pn{constructor(e,t){super(e,t)}}class hh extends Pn{constructor(e,t){super(e,t)}}class dh extends Pn{constructor(e,t){super(e,t),this.visible=!0}}class uh extends Pn{constructor(e,t){super(e,t)}}class fh extends Pn{constructor(e,t){super(e,t)}}class ph extends Pn{constructor(e,t){super(e,t)}}class mh{constructor(e,t){v(this,"gameModel");v(this,"levelIndex");v(this,"levelData");this.gameModel=e,this.levelData=[]}loadGame(){["/2025-group-3/game/asset/level1.json","/2025-group-3/game/asset/level2.json"].forEach((t,n)=>{loadJSON(t,i=>this.parseJSON(i,n))}),this.gameModel.assets.icon=loadImage("/2025-group-3/game/asset/spritesheet.png"),this.gameModel.assets.testcat=loadImage("/2025-group-3/game/asset/testcat.png"),this.gameModel.assets.bg=loadImage("/2025-group-3/game/asset/backgrounds.png"),this.gameModel.assets.teachCommand=loadImage("/2025-group-3/game/asset/teachCommand.png")}parseJSON(e,t){this.levelData[t]=e,console.log(`Loaded level ${t}:`,this.levelData[t]),this.gameModel.levelHeight[t]=0,this.gameModel.levelWidth[t]=0,this.gameModel.decorate[t]=[],this.gameModel.trap[t]=[],this.gameModel.water[t]=[],this.gameModel.coll[t]=[],this.gameModel.merge[t]=[],this.gameModel.ice[t]=[],this.gameModel.spring[t]=[],this.gameModel.switches[t]=[],this.gameModel.keysItem[t]=[],this.gameModel.elevatingWalls[t]=[],this.gameModel.flag[t]=null,this.gameModel.levelHeight[t]=this.levelData[t].height,this.gameModel.levelWidth[t]=this.levelData[t].width,this.getColl(t),this.getGround(t),this.getDecorate(t),this.getTrap(t),this.getWater(t),this.getMerge(t),this.getIce(t),this.getSpring(t),this.getInteract(t),this.getClimb(t),this.getCatPosition(t),console.log("ParseJSON done"),console.log("this.levelIndex",t)}getCatPosition(e){let t=this.levelData[e].layers.find(s=>s.name==="cat"),n=t.objects[0].x+se.CAT_WIDTH/2,i=t.objects[0].y;this.gameModel.cat[e]=new eh(n,i,e),this.gameModel.potion=new th(0,0)}getColl(e){let t=this.levelData[e].layers.find(n=>n.name==="coll");this.gameModel.coll[e]=new oh(t.data,e)}getGround(e){let t=this.levelData[e].layers.find(n=>n.name==="ground");this.gameModel.ground[e]=new lh(t.data,e)}getClimb(e){let t=this.levelData[e].layers.find(n=>n.name==="climb");this.gameModel.climb[e]=new ah(t.data,e)}getDecorate(e){let t=this.levelData[e].layers.find(n=>n.name==="decorate");this.gameModel.decorate[e]=new ch(t.data,e)}getTrap(e){let t=this.levelData[e].layers.find(n=>n.name==="trap");this.gameModel.trap[e]=new fh(t.data,e)}getWater(e){let t=this.levelData[e].layers.find(n=>n.name==="water");this.gameModel.water[e]=new ph(t.data,e)}getMerge(e){let t=this.levelData[e].layers.find(n=>n.name==="merge");this.gameModel.merge[e]=new dh(t.data,e)}getIce(e){let t=this.levelData[e].layers.find(n=>n.name==="ice");this.gameModel.ice[e]=new hh(t.data,e)}getSpring(e){let t=this.levelData[e].layers.find(n=>n.name==="spring");this.gameModel.spring[e]=new uh(t.data,e)}getInteract(e){let t=this.levelData[e].layers.find(l=>l.name==="interact"),n=0,i=0,s=0;for(let l=0;l<t.objects.length;l++){let a=t.objects[l].type;if(a==="key"){let c=t.objects[l].x,o=t.objects[l].y-se.TILE_SIZE,h=t.objects[l].gid;this.gameModel.keysItem[e][n++]=new sh(c,o,h,e)}else if(a==="switch"){let c=t.objects[l].x,o=t.objects[l].y-se.TILE_SIZE,h=t.objects[l].gid,d=t.objects[l].properties.find(u=>u.name==="id").value;this.gameModel.switches[e][i++]=new rh(c,o,h,e,d)}else if(a==="elevator"){let c=t.objects[l].x,o=t.objects[l].y-se.TILE_SIZE,h=t.objects[l].gid,d=t.objects[l].properties.find(g=>g.name==="id").value,u=t.objects[l].properties.find(g=>g.name==="range").value,f=t.objects[l].properties.find(g=>g.name==="towards").value;this.gameModel.elevatingWalls[e][s++]=new nh(c,o,h,e,d,u,f)}else if(a==="flag"){let c=t.objects[l].x,o=t.objects[l].y-se.TILE_SIZE,h=t.objects[l].gid;this.gameModel.flag[e]=new ih(c,o,h,e)}}}}class gh{constructor(e){v(this,"gameModel");this.gameModel=e,this.gameModel.selectedLevel=0}newGame(){this.gameModel.assets.startscreenbg=loadImage("/2025-group-3/game/asset/startscreenbg.png"),new mh(this.gameModel,this.gameModel.selectedLevel).loadGame()}moveCapoo(){let e=this.gameModel.selectedLevel,t=se.TILE_SIZE,n=this.gameModel.levelWidth,i=this.gameModel.cat[e].x,s=this.gameModel.cat[e].y,l=se.CAT_WIDTH,a=se.CAT_HEIGHT,c=-l/2,o=a/10;if(this.getkey(this.gameModel.cat[e].x,this.gameModel.cat[e].y,e),this.gameModel.cat[e].keyNum==this.gameModel.keysItem[e].length&&(this.gameModel.flag[e].visible=!0),this.inWater(this.gameModel.cat[e].x-l/2,this.gameModel.cat[e].y,e,t,n)){window.assets.death.play();let E="Cats dissolve easily in water!";this.gameModel.messages.push(new Xi(E,width/2,4*height/5,2e3,30,{},"death")),this.gameModel.cat[e].x=this.gameModel.cat[e].iniX,this.gameModel.cat[e].y=this.gameModel.cat[e].iniY;return}let h=l/4,d=this.beTraped(this.gameModel.cat[e].x-h,this.gameModel.cat[e].y-a,e,t,n)||this.beTraped(this.gameModel.cat[e].x+h,this.gameModel.cat[e].y-a,e,t,n),u=this.beTraped(this.gameModel.cat[e].x-h,this.gameModel.cat[e].y-o*2,e,t,n)||this.beTraped(this.gameModel.cat[e].x+h,this.gameModel.cat[e].y-o*2,e,t,n);if(d||u){window.assets.death.play();let E="You are trapped!";this.gameModel.messages.push(new Xi(E,width/2,4*height/5,2e3,30,{},"death")),this.gameModel.cat[e].x=this.gameModel.cat[e].iniX,this.gameModel.cat[e].y=this.gameModel.cat[e].iniY;return}let f=l/4,g=this.canClimb(this.gameModel.cat[e].x+c+f,this.gameModel.cat[e].y-o,e,t,n)||this.canClimb(this.gameModel.cat[e].x+l+c-f,this.gameModel.cat[e].y-o,e,t,n),_=l/5;(this.canUseSpring(this.gameModel.cat[e].x,this.gameModel.cat[e].y-o,e,t,n)||this.canUseSpring(this.gameModel.cat[e].x+_,this.gameModel.cat[e].y-o,e,t,n)||this.canUseSpring(this.gameModel.cat[e].x-_,this.gameModel.cat[e].y-o,e,t,n))&&(window.assets.spring.play(),this.gameModel.cat[e].velocityY=this.gameModel.cat[e].jumpStrength*2,this.gameModel.cat[e].onGround=!1),this.gameModel.keys.ArrowLeft&&(i-=this.gameModel.cat[e].speed),this.gameModel.keys.ArrowRight&&(i+=this.gameModel.cat[e].speed),g&&(console.log("可以攀爬"),this.gameModel.keys.ArrowUp&&(s-=this.gameModel.cat[e].speed),this.gameModel.keys.ArrowDown&&(s+=this.gameModel.cat[e].speed)),this.gameModel.keys[" "]&&this.gameModel.cat[e].isMerged&&(this.gameModel.cat[e].velocityY=this.gameModel.cat[e].jumpStrength,this.gameModel.cat[e].onGround=!1),g||(this.gameModel.cat[e].velocityY+=this.gameModel.cat[e].gravity,s+=this.gameModel.cat[e].velocityY);let m=this.isColliding(i+c,s-a/3-o,e,t,n)||this.isColliding(i+c,s-a*2/3-o,e,t,n)||this.isColliding(i+c,s-a-o,e,t,n)||this.isColliding(i+c,s-o*3/2,e,t,n),y=this.isColliding(i+l+c,s-a/3-o,e,t,n)||this.isColliding(i+l+c,s-a*2/3-o,e,t,n)||this.isColliding(i+l+c,s-a-o,e,t,n)||this.isColliding(i+l+c,s-o*3/2,e,t,n),x=a/5,M=this.isCollidingWithGround(i+l/3+c,s-a-o-x,e,t,n)||this.isCollidingWithGround(i+2*l/3+c,s-a-o-x,e,t,n)||this.isCollidingWithGround(i+c,s-a-o-x,e,t,n)||this.isCollidingWithGround(i+l+c,s-a-o-x,e,t,n),b=this.isCollidingWithGround(i+l/3+c,s-o,e,t,n)||this.isCollidingWithGround(i+2*l/3+c,s-o,e,t,n)||this.isCollidingWithGround(i+c,s-o,e,t,n)||this.isCollidingWithGround(i+l+c,s-o,e,t,n),S=this.isColliding(i+l/3+c,s-a-o-70-x,e,t,n)||this.isColliding(i+2*l/3+c,s-a-o-70-x,e,t,n)||this.isColliding(i+c,s-a-o-70-x,e,t,n)||this.isColliding(i+l+c,s-a-o-70-x,e,t,n),w=M&&S&&(this.gameModel.cat[e].velocityY<=0||g),R=this.isColliding(i+l/3+c,s-o+70,e,t,n)||this.isColliding(i+2*l/3+c,s-o+70,e,t,n)||this.isColliding(i+c,s-o+70,e,t,n)||this.isColliding(i+l+c,s-o+70,e,t,n),I=b&&R&&(this.gameModel.cat[e].velocityY>=0||g);!m&&!y&&(this.gameModel.cat[e].x=i),w?this.gameModel.cat[e].velocityY=Math.abs(this.gameModel.cat[e].velocityY)*.2:!w&&!I?(this.gameModel.cat[e].y=s,g||(this.gameModel.cat[e].onGround=!1)):I&&(this.gameModel.cat[e].velocityY>0&&(this.gameModel.cat[e].onGround=!0),this.gameModel.cat[e].velocityY=0)}movePotion(){let e=this.gameModel.selectedLevel,t=se.TILE_SIZE,n=this.gameModel.levelWidth,i=this.gameModel.potion.x,s=this.gameModel.potion.y,l=se.POTION_WIDTH,a=se.POTION_HEIGHT,c=-l/2,o=a/10;this.gameModel.potion.updatePotion(this.gameModel.cat[e].x,this.gameModel.cat[e].y),console.log("showshow",this.gameModel.cat[e].x,this.gameModel.cat[e].y),Math.abs(i-this.gameModel.cat[e].x)<100&&Math.abs(s-this.gameModel.cat[e].y)<100&&this.gameModel.flagp>50&&(this.gameModel.cat[e].isMerged=!0,Ns(!0),Us(!1),console.log("showshow",this.gameModel.cat[e].isMerged,Ar,Cr),this.gameModel.flagp=0),!this.gameModel.cat[e].isMerged&&this.gameModel.flagp<60&&this.gameModel.flagp++,this.gameModel.cat[e].isMerged&&(this.gameModel.keys.X||this.gameModel.keys.x)&&(console.log("分离"),this.gameModel.cat[e].isMerged=!1,this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y,Ns(!1),Us(!0)),this.gameModel.keys.q&&this.gameModel.potion.tanshe&&(this.gameModel.potion.facingLeft=!0,this.gameModel.cat[e].isMerged=!1,this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y,Ns(!1),Us(!0)),this.gameModel.keys.w&&this.gameModel.potion.tanshe&&(this.gameModel.cat[e].isMerged=!1,this.gameModel.potion.facingRight=!0,this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y,Ns(!1),Us(!0)),console.log("mykey",this.gameModel.keys),this.gameModel.cat[e].isMerged?(this.gameModel.potion.x=this.gameModel.cat[e].x,this.gameModel.potion.y=this.gameModel.cat[e].y,this.gameModel.potion.tanshe=!0):this.gameModel.potion.tanshe&&(this.gameModel.potion.onWall||this.gameModel.potion.onGround)&&(this.gameModel.potion.facingLeft&&(this.gameModel.potion.speed=-15,this.gameModel.potion.facingLeft=!1,this.gameModel.potion.velocityY=-35,this.gameModel.potion.tanshe=!1),this.gameModel.potion.facingRight&&(this.gameModel.potion.speed=15,this.gameModel.potion.facingRight=!1,this.gameModel.potion.velocityY=-35,this.gameModel.potion.tanshe=!1));let h=this.isColliding(i+c,s-a/3-o,this.gameModel.selectedLevel,t,n)||this.isColliding(i+c,s-a*2/3-o,this.gameModel.selectedLevel,t,n)||this.isColliding(i+c,s-a-o,this.gameModel.selectedLevel,t,n),d=this.isColliding(i+l+c,s-a/3-o,this.gameModel.selectedLevel,t,n)||this.isColliding(i+l+c,s-a*2/3-o,this.gameModel.selectedLevel,t,n)||this.isColliding(i+l+c,s-a-o,this.gameModel.selectedLevel,t,n),u=this.isCollidingWithGround(i+l/3+c,s-o,this.gameModel.selectedLevel,t,n)||this.isCollidingWithGround(i+2*l/3+c,s-o,this.gameModel.selectedLevel,t,n)||this.isCollidingWithGround(i+c,s-o,this.gameModel.selectedLevel,t,n)||this.isCollidingWithGround(i+l+c,s-o,this.gameModel.selectedLevel,t,n),f=this.isColliding(i+l/3+c,s-o+70,e,t,n)||this.isColliding(i+2*l/3+c,s-o+70,e,t,n)||this.isColliding(i+c,s-o+70,e,t,n)||this.isColliding(i+l+c,s-o+70,e,t,n),g=u&&f&&this.gameModel.potion.velocityY>=0;(h||d)&&(this.gameModel.potion.onWall=!0),h&&this.gameModel.potion.speed<0&&(this.gameModel.potion.speed=0,this.gameModel.potion.tanshe=!0,this.gameModel.potion.facingLeft=!1),d&&this.gameModel.potion.speed>0&&(this.gameModel.potion.speed=0,this.gameModel.potion.tanshe=!0,this.gameModel.potion.facingRight=!1),console.log("speedd",this.gameModel.potion.velocityY,this.gameModel.potion.onWall),!g&&!this.gameModel.cat[e].isMerged?(this.gameModel.potion.onWall?this.gameModel.potion.velocityY<15&&(this.gameModel.potion.velocityY=this.gameModel.potion.velocityY+1.5):this.gameModel.potion.velocityY<15&&(this.gameModel.potion.velocityY=this.gameModel.potion.velocityY+1.5),this.gameModel.potion.y=s+this.gameModel.potion.velocityY,this.gameModel.potion.x=i+this.gameModel.potion.speed,this.gameModel.potion.onGround=!1):g&&(this.gameModel.potion.velocityY>0&&(this.gameModel.potion.onGround=!0,this.gameModel.potion.velocityY=-this.gameModel.potion.velocityY*.1),this.gameModel.potion.velocityY=0,this.gameModel.potion.speed=0,this.gameModel.potion.tanshe=!0)}isColliding(e,t,n,i,s){let l=Math.floor(e/i),c=Math.floor(t/i)*s[n]+l,o=this.gameModel.coll[n].data[c]!==0,h=!1,d=this.gameModel.merge[n].data[c]!==0,u=this.gameModel.merge[n].visible;d&&u&&(console.log("碰到合体墙"),h=!0);let f=!1;for(let g=0;g<this.gameModel.elevatingWalls[n].length;g++)this.gameModel.elevatingWalls[n][g].isColling(e,t,i,se.CAT_WIDTH,se.CAT_HEIGHT)&&(f=!0);return o||h||f}isCollidingWithGround(e,t,n,i,s){let l=Math.floor(e/i),c=Math.floor(t/i)*s[n]+l,o=this.gameModel.ground[n].data[c]!==0,h=!1,d=this.gameModel.merge[n].data[c]!==0,u=this.gameModel.merge[n].visible;d&&u&&(console.log("碰到合体墙"),h=!0);let f=!1;for(let g=0;g<this.gameModel.elevatingWalls[n].length;g++)this.gameModel.elevatingWalls[n][g].isColling(e,t,i,se.CAT_WIDTH,se.CAT_HEIGHT)&&(f=!0);return o||h||f}inWater(e,t,n,i,s){let l=Math.floor(e/i),c=Math.floor(t/i)*s[n]+l;return this.gameModel.water[n].data[c]!==0}beTraped(e,t,n,i,s){let l=Math.floor(e/i),c=Math.floor(t/i)*s[n]+l;return this.gameModel.trap[n].data[c]!==0}canClimb(e,t,n,i,s){let l=Math.floor(e/i),c=Math.floor(t/i)*s[n]+l;return this.gameModel.climb[n].data[c]!==0}canUseSpring(e,t,n,i,s){let l=Math.floor(e/i),c=Math.floor(t/i)*s[n]+l;return this.gameModel.spring[n].data[c]!==0}getkey(e,t,n){for(let i=0;i<this.gameModel.keysItem[n].length;i++)this.gameModel.keysItem[n][i].visible&&this.gameModel.keysItem[n][i].isNear(e,t,se.TILE_SIZE,se.CAT_WIDTH,se.CAT_HEIGHT)&&(window.assets.getKey.play(),this.gameModel.keysItem[n][i].visible=!1,this.gameModel.cat[n].keyNum++)}controlMergedWall(){let e=this.gameModel.selectedLevel;this.gameModel.cat[e].isMerged?this.gameModel.merge[e].visible=!0:this.gameModel.merge[e].visible=!1}controlElevatingWall(){let e=this.gameModel.selectedLevel;for(let t=0;t<this.gameModel.elevatingWalls[e].length;t++)this.gameModel.elevatingWalls[e][t].update();for(let t=0;t<this.gameModel.switches[e].length;t++){if(this.gameModel.switches[e][t].isNear(this.gameModel.cat[e].x,this.gameModel.cat[e].y,se.TILE_SIZE,se.CAT_WIDTH,se.CAT_HEIGHT)&&!this.gameModel.switches[e][t].invincible){window.assets.switch.play(),this.gameModel.switches[e][t].invincible=!0,this.gameModel.switches[e][t].invincibleTimer=0;let n=this.gameModel.switches[e][t].iniImgIndex;this.gameModel.switches[e][t].beActivated?this.gameModel.switches[e][t].imgIndex=n:this.gameModel.switches[e][t].imgIndex=n+1,this.gameModel.switches[e][t].beActivated=!this.gameModel.switches[e][t].beActivated}if(this.gameModel.switches[e][t].prevState!==this.gameModel.switches[e][t].beActivated)for(let n=0;n<this.gameModel.elevatingWalls[e].length;n++)this.gameModel.elevatingWalls[e][n].id===this.gameModel.switches[e][t].id&&(this.gameModel.elevatingWalls[e][n].move(),console.log(this.gameModel.elevatingWalls[e][n].range),console.log(this.gameModel.elevatingWalls[e][n].pixelRange));this.gameModel.switches[e][t].prevState=this.gameModel.switches[e][t].beActivated,this.gameModel.switches[e][t].invincible&&this.gameModel.switches[e][t].invincibleTimer++,this.gameModel.switches[e][t].invincible&&this.gameModel.switches[e][t].invincibleTimer>=this.gameModel.switches[e][t].invincibleDuration&&(this.gameModel.switches[e][t].invincible=!1,this.gameModel.switches[e][t].invincibleTimer=0)}}}function hr(r){r--;let e=Math.floor((r-1)/30),n=(r-1)%30*(se.TILE_SIZE+se.TILE_MARGIN),i=e*(se.TILE_SIZE+se.TILE_MARGIN);return{x:n,y:i}}function _h(r,e){let t=Math.floor(r/e),i=r%e*se.TILE_SIZE,s=t*se.TILE_SIZE;return{x:i,y:s}}function In(r,e,t,n,i){if(!r){console.log("!!!!!noentitey!!!!!");return}for(let s=0;s<r.data.length;s++){let l=r.data[s];if(l===0)continue;let a=hr(l),c=_h(s,i);image(n.icon,c.x-e,c.y-t,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE)}}function Fs(r,e,t,n,i){i&&(r.frameCounter++,r.frameCounter%se.FRAME_INTERVAL===0&&(r.frameIndex=(r.frameIndex+1)%r.animationFrames.length,r.imgIndex=r.animationFrames[r.frameIndex]));let s=hr(r.imgIndex);image(n.icon,r.x-e,r.y-t,se.TILE_SIZE,se.TILE_SIZE,s.x,s.y,se.TILE_SIZE,se.TILE_SIZE)}class xh{constructor(e){this.gameModel=e,this.assets=this.gameModel.assets,this.img=this.gameModel.assets.rightArrow,this.titleMessage=new Xi("Capoo",window.innerWidth/2,window.innerHeight/5-50,1e4,200,{},"Title"),this.enterMessage=new Xi("Press ENTER To Start",window.innerWidth/2,window.innerHeight/1.5,1e4,50,{scaling:!0},"startScreen"),this.selectMessage=new Xi(`Use LEFT/RIGHT To Choose
Press SPACE To Start`,window.innerWidth/2,window.innerHeight/5-10,1e4,50,{},"levelSelectScreen"),this.tipMessage=new Xi(`Tip：Do you konw:
A cat always lands with its feet down
Bread always lands on the creamed side`,window.innerWidth/2,window.innerHeight/1.2,3e3,30,{changeAlpha:!0},"Tip"),this.startScreenClouds=[{img:window.assets.startscreenbg_cloud1,x:0,y:560,speed:1.4,scale:2},{img:window.assets.startscreenbg_cloud2,x:1e3,y:600,speed:1,scale:2},{img:window.assets.startscreenbg_cloud3,x:900,y:300,speed:2.4,scale:1.7},{img:window.assets.startscreenbg_cloud2,x:150,y:570,speed:1.3,scale:2},{img:window.assets.startscreenbg_cloud1,x:860,y:400,speed:1.7,scale:2.1},{img:window.assets.startscreenbg_cloud2,x:2e3,y:630,speed:2,scale:2},{img:window.assets.startscreenbg_cloud1,x:1200,y:210,speed:2.3,scale:2.2},{img:window.assets.startscreenbg_cloud3,x:700,y:400,speed:2.4,scale:1.8},{img:window.assets.startscreenbg_cloud4,x:10,y:40,speed:2,scale:1.2},{img:window.assets.startscreenbg_cloud4,x:60,y:320,speed:1.6,scale:1.5}],this.selectScreenClouds=[{img:window.assets.selectscreenbg_cloud4,x:0,y:560,speed:1.4,scale:1.2},{img:window.assets.selectscreenbg_cloud4,x:300,y:390,speed:1,scale:1.1},{img:window.assets.selectscreenbg_cloud2,x:20,y:240,speed:2,scale:1.3},{img:window.assets.selectscreenbg_cloud4,x:860,y:500,speed:1.7,scale:1},{img:window.assets.selectscreenbg_cloud2,x:1e3,y:390,speed:2.3,scale:1},{img:window.assets.selectscreenbg_cloud2,x:1900,y:340,speed:2.1,scale:1.7},{img:window.assets.selectscreenbg_cloud4,x:1400,y:560,speed:1.8,scale:1.6},{img:window.assets.selectscreenbg_cloud2,x:700,y:720,speed:1.5,scale:1.3}]}render(){const e={[gt.START]:this.drawStartScreen.bind(this),[gt.LEVEL_SELECT]:this.drawLevelSelectScreen.bind(this),[gt.PLAYING]:this.drawGameScreen.bind(this),[gt.LEVEL_COMPLETE]:this.drawLevelCompleteScreen.bind(this),[gt.GAME_OVER]:this.drawGameOverScreen.bind(this)};e[this.gameModel.gameState]?e[this.gameModel.gameState]():console.log("Unknown State")}drawLoadingScreen(){background(255);let e=40;stripeOffset+=1,stripeOffset>=e*colors.length&&(stripeOffset=0);for(let t=-stripeOffset;t<height;t+=e){let n=int((t+stripeOffset)/e)%colors.length;fill(colors[n]),noStroke(),rect(0,t,width,e)}fill(0);for(let t=0;t<loadingText.length;t++){let n=width/2-(loadingText.length/2-t)*18,i=sin(frameCount*.15+letterJump[t])*10;text(loadingText[t],n,height/2+i)}}drawStartScreen(){image(window.assets.startscreenbg,0,0,window.innerWidth,window.innerHeight);for(let e of this.startScreenClouds)if(e.img){let t=e.img.width*e.scale,n=e.img.height*e.scale;image(e.img,e.x,e.y,t,n),e.x-=e.speed,e.x+t<0&&(e.x=window.innerWidth)}this.enterMessage.show(),this.titleMessage.show()}drawLevelSelectScreen(){background(255,182,193),image(window.assets.selectscreenbg,0,0,windowWidth,windowHeight);for(let e of this.selectScreenClouds)if(e.img){let t=e.img.width*e.scale,n=e.img.height*e.scale;image(e.img,e.x,e.y,t,n),e.x-=e.speed,e.x+t<0&&(e.x=window.innerWidth)}this.selectMessage.show(),this.tipMessage.show();for(let e=0;e<se.LEVEL_LIST.length;e++){let t=60,n=width/2-se.LEVEL_LIST.length*t/2+e*t,i=height/2;e===this.gameModel.selectedLevel?(fill(152,255,152),strokeWeight(3),stroke(255,255,255)):(fill(200,200,200),strokeWeight(3),stroke(255,255,255)),rect(n,i,t,t,10),fill(0,0,0),textSize(26),text(se.LEVEL_LIST[e],n+t/2,i+t/2)}}drawGameScreen(){let e=this.gameModel,t=this.assets,n=e.selectedLevel,i=e.levelWidth[e.selectedLevel],s=e.cat[n].x-window.innerWidth/2,l=e.cat[n].y-window.innerHeight/2;imageMode(CENTER),n==0?image(window.assets.level1bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight):n==1&&image(window.assets.level2bg,window.innerWidth/2,window.innerHeight/2,window.innerWidth,window.innerHeight),imageMode(CORNER);for(let o=0;o<e.elevatingWalls[n].length;o++)Fs(e.elevatingWalls[n][o],s,l,t,!1);In(e.coll[n],s,l,t,i),In(e.decorate[n],s,l,t,i),In(e.trap[n],s,l,t,i),In(e.water[n],s,l,t,i),In(e.ice[n],s,l,t,i),In(e.climb[n],s,l,t,i),In(e.spring[n],s,l,t,i),e.merge[n].visible&&In(e.merge[n],s,l,t,i);for(let o=0;o<e.keysItem[n].length;o++)e.keysItem[n][o].visible&&Fs(e.keysItem[n][o],s,l,t,!0);for(let o=0;o<e.switches[n].length;o++)Fs(e.switches[n][o],s,l,t,!1);e.flag[n].visible&&Fs(e.flag[n],s,l,t,!0);let a=hr(429),c=hr(430);this.gameModel.cat[n].keyNum==0&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE)),this.gameModel.cat[n].keyNum==1&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE)),this.gameModel.cat[n].keyNum==2&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,c.x,c.y,se.TILE_SIZE,se.TILE_SIZE)),this.gameModel.cat[n].keyNum==3&&(image(t.icon,window.innerHeight/10-50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE),image(t.icon,window.innerHeight/10+50,window.innerWidth/16,se.TILE_SIZE,se.TILE_SIZE,a.x,a.y,se.TILE_SIZE,se.TILE_SIZE)),fill(255),stroke(50,110,185),strokeWeight(5),textSize(window.innerWidth/38),textAlign(CORNER),text("ESC - show help",window.innerHeight/20,window.innerWidth/25);for(let o=0;o<this.gameModel.messages.length;o++)this.gameModel.messages[o].show();for(let o=this.gameModel.messages.length-1;o>=0;o--)this.gameModel.messages[o].isExpired()&&setTimeout(()=>{this.gameModel.messages.splice(o,1)},10);this.gameModel.showHelp&&this.showhelpscreen()}showhelpscreen(){fill(255,255,255,170),stroke(255),strokeWeight(5);let e=50;rect(e,e,window.innerWidth-2*e,window.innerHeight-2*e,25),textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),textSize(window.innerWidth/38),text("Press                 to return to the game.",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1),fill(61,170,110),stroke(255),text("any key                              ",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1),fill(255),stroke(50,110,185),text("Press          to Exit.",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1+window.innerWidth/24),fill(169,59,70),stroke(255),text("ESC  ",window.innerWidth/2,window.innerHeight/2-window.innerHeight/3.1+window.innerWidth/24),fill(255),stroke(50,110,185),textSize(window.innerWidth/50);let n=window.innerHeight/19,i=window.innerWidth/2,s=window.innerHeight/2+window.innerHeight/13;textAlign(CENTER,CENTER),fill(255),stroke(50,110,185),strokeWeight(5),text("You're a wizard cat.",i,s),s+=n,text("You can move by pressing        and        .",i,s),textFont("sans-serif"),text("                                            ⬅️         ➡️",i,s+window.innerHeight/100),textFont(window.assets.textFont1),s+=n,text("You can fly upwards infinitely by pressing               when you have the potion on your back.",i,s),fill(43,177,235),stroke(255),text("    SPACE",i,s),fill(255),stroke(50,110,185),s+=n,text("You can drop the potion by pressing     .",i,s),fill(43,177,235),stroke(255),text("                                                                X",i,s),fill(255),stroke(50,110,185),s+=n,text("You will automatically pick up the potion when you're close to it.",i,s),s+=n,text("You can climb ladders        by pressing        and        .",i,s),textFont("sans-serif"),text("                                   🪜                        ⬆️         ⬇️",i,s+window.innerHeight/100),textFont(window.assets.textFont1)}drawGameOverScreen(){}drawLevelCompleteScreen(){let e=window.innerWidth,t=window.innerHeight;image(window.assets.levelCompletebg,0,0,e,t),textAlign(CENTER,CENTER),textSize(window.innerWidth/25),fill(0,0,0),strokeWeight(5),stroke(255,255,255),text("Level Complete!",e/2,t/2+80),textSize(window.innerWidth/160),strokeWeight(5),text("Press ANY KEY for next level",e/2,t/2+200),text("Press ESC to return to level select",e/2,t/2+250)}}let pe,Yi,wa,kr=!0;window.assets={};let zr=0;const oo=10;window.preload=function(){pe=new Qc,Yi=new gh(pe),wa=new xh(pe)};window.setup=function(){createCanvas(window.innerWidth,window.innerHeight);function r(){zr++,console.log(`Sound loaded: ${zr}/${oo}`),zr===oo&&(console.log("All sounds loaded! Ready to start the game."),window.allSoundsLoaded=!0)}window.assets.bgm=loadSound("/2025-group-3/game/asset/sounds/background_music.wav",r),window.assets.splitPotion=loadSound("/2025-group-3/game/asset/sounds/effect_e010_splitPotion.wav",r),window.assets.getPotion=loadSound("/2025-group-3/game/asset/sounds/effect_e012_getPotion.wav",r),window.assets.getKey=loadSound("/2025-group-3/game/asset/sounds/effect_e002_getkey.wav",r),window.assets.death=loadSound("/2025-group-3/game/asset/sounds/effect_e014_death.wav",r),window.assets.spring=loadSound("/2025-group-3/game/asset/sounds/effect_e016_spring.wav",r),window.assets.switch=loadSound("/2025-group-3/game/asset/sounds/effect_e021_switch.wav",r),window.assets.levelComplete=loadSound("/2025-group-3/game/asset/sounds/effect_e026_levelComplete.mp3",r),window.assets.userStartGame=loadSound("/2025-group-3/game/asset/sounds/effect_e017_miaomiaomiao.wav",r),window.assets.userSelectLevel=loadSound("/2025-group-3/game/asset/sounds/effect_e020_miao.wav",r),window.assets.textFont1=loadFont("/2025-group-3/game/asset/fonts/MengNaFan.otf"),window.assets.startscreenbg=loadImage("/2025-group-3/game/asset/startscreenbg.png"),window.assets.selectscreenbg=loadImage("/2025-group-3/game/asset/selectscreenbg.png"),window.assets.levelCompletebg=loadImage("/2025-group-3/game/asset/bg/Summer6-new.png"),window.assets.level1bg=loadImage("/2025-group-3/game/asset/bg/Summer8-new.png"),window.assets.level2bg=loadImage("/2025-group-3/game/asset/bg/Summer5-new.png"),window.assets.startscreenbg_cloud1=loadImage("/2025-group-3/game/asset/bg/clouds/ocean-3-3-1.png"),window.assets.startscreenbg_cloud2=loadImage("/2025-group-3/game/asset/bg/clouds/ocean-3-3-2.png"),window.assets.startscreenbg_cloud3=loadImage("/2025-group-3/game/asset/bg/clouds/ocean-3-4.png"),window.assets.startscreenbg_cloud4=loadImage("/2025-group-3/game/asset/bg/clouds/clouds-5-3.png"),window.assets.selectscreenbg_cloud2=loadImage("/2025-group-3/game/asset/bg/clouds/cloud-2-3.png"),window.assets.selectscreenbg_cloud4=loadImage("/2025-group-3/game/asset/bg/clouds/cloud-7-4-1.png");let e=setInterval(()=>{window.allSoundsLoaded&&(clearInterval(e),console.log("All sounds are loaded! Starting game..."),window.assets.bgm.setVolume(1),window.assets.userSelectLevel.setVolume(.4),window.assets.death.setVolume(.4),window.assets.bgm.loop(),textFont(window.assets.textFont1),console.log("Main setup done"),Yi.newGame(),loop())},1);noLoop()};window.draw=function(){if(!window.allSoundsLoaded||!wa){let e=color("#d0f0ff");background(e),background("#a7ddf5"),noStroke(),fill(255);let t=60,n=20;for(let i=0;i<height+t;i+=t)for(let s=0;s<width+t;s+=t){let l=i/t%2===0?0:t/2;ellipse(s+l,i,n)}fill("#444"),noStroke(),textAlign(CENTER,CENTER),textFont("Comic Sans MS"),textSize(32),text("Loading...",width/2,height/2+60);return}wa.render(),window.addEventListener("keydown",function(e){["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)&&e.preventDefault(),e.ctrlKey&&(e.key==="-"||e.key==="+")&&e.preventDefault()});let r=pe.selectedLevel;pe.gameState===gt.PLAYING&&(Yi.moveCapoo(),Yi.movePotion(),Yi.controlMergedWall(),Yi.controlElevatingWall(),pe.flag[r].visible&&pe.flag[r].isNear(pe.cat[r].x,pe.cat[r].y,se.TILE_SIZE,se.CAT_WIDTH,se.CAT_HEIGHT)&&(window.assets.levelComplete.play(),console.log("关卡完成"),pe.gameState=gt.LEVEL_COMPLETE))};window.keyPressed=function(){if(pe.gameState===gt.START&&keyCode===ENTER)window.assets.userStartGame.play(),pe.gameState=gt.LEVEL_SELECT;else if(pe.gameState===gt.LEVEL_SELECT){if(keyCode===LEFT_ARROW)pe.selectedLevel=Math.max(0,pe.selectedLevel-1),console.log("selectedLevel: "+pe.selectedLevel);else if(keyCode===RIGHT_ARROW)pe.selectedLevel=Math.min(se.LEVEL_LIST.length-1,pe.selectedLevel+1),console.log("selectedLevel: "+pe.selectedLevel);else if(keyCode===32){pe.gameState=gt.PLAYING,window.assets.userSelectLevel.play(),pe.cat[pe.selectedLevel].x=pe.cat[pe.selectedLevel].iniX,pe.cat[pe.selectedLevel].y=pe.cat[pe.selectedLevel].iniY,pe.cat[pe.selectedLevel].keyNum=0;for(let r=0;r<pe.keysItem[pe.selectedLevel].length;r++)pe.keysItem[pe.selectedLevel][r].visible=!0;for(let r=0;r<pe.elevatingWalls[pe.selectedLevel].length;r++)pe.elevatingWalls[pe.selectedLevel][r].x=pe.elevatingWalls[pe.selectedLevel][r].iniX,pe.elevatingWalls[pe.selectedLevel][r].y=pe.elevatingWalls[pe.selectedLevel][r].iniY,pe.elevatingWalls[pe.selectedLevel][r].moving=!1,pe.elevatingWalls[pe.selectedLevel][r].beActivated=!1;for(let r=0;r<pe.switches[pe.selectedLevel].length;r++)pe.switches[pe.selectedLevel][r].invincible=!1,pe.switches[pe.selectedLevel][r].beActivated=!1,pe.switches[pe.selectedLevel][r].prevState=!1}}else pe.gameState===gt.PLAYING?(pe.keys[key]=!0,keyCode===ESCAPE&&(pe.showHelp?(pe.showHelp=!1,pe.keysESC=!1,pe.gameState=gt.LEVEL_SELECT):(pe.showHelp=!0,pe.keysESC=!0)),pe.showHelp&&keyCode!==ESCAPE&&(pe.showHelp=!1,pe.keysESC=!1)):pe.gameState===gt.GAME_OVER&&key==="r"?pe.gameState=gt.START:pe.gameState===gt.LEVEL_COMPLETE&&(keyCode===ESCAPE?pe.gameState=gt.LEVEL_SELECT:pe.selectedLevel<se.LEVEL_LIST.length-1?(pe.selectedLevel++,pe.gameState=gt.PLAYING):pe.gameState=gt.LEVEL_SELECT)};window.keyReleased=function(){pe.keys[key]!==void 0&&(pe.keys[key]=!1)};window.windowResized=function(){resizeCanvas(window.innerWidth,window.innerHeight)};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="162",vh=0,lo=1,Mh=2,Kl=1,Sh=2,En=3,Qn=0,zt=1,un=2,Zn=0,An=1,ba=2,co=3,ho=4,Ta=5,ui=100,yh=101,Eh=102,uo=103,fo=104,wh=200,or=201,bh=202,Aa=203,Ca=204,ws=205,Th=206,Ah=207,Jl=208,Ch=209,Rh=210,Lh=211,Ph=212,Ih=213,Dh=214,Uh=0,Nh=1,Fh=2,dr=3,Oh=4,Bh=5,kh=6,zh=7,Ql=0,Gh=1,Vh=2,$n=0,Hh=1,Wh=2,Xh=3,Yh=4,qh=5,Zh=6,$h=7,ec=300,os=301,ls=302,Ra=303,La=304,Lr=306,ur=1e3,Jt=1001,fr=1002,xt=1003,po=1004,jh=1004,ms=1005,Kh=1005,bt=1006,Gr=1007,Jh=1007,_i=1008,Qh=1008,jn=1009,ed=1010,td=1011,Za=1012,tc=1013,Yn=1014,wn=1015,bs=1016,nc=1017,ic=1018,Si=1020,nd=1021,an=1023,id=1024,sd=1025,yi=1026,cs=1027,rd=1028,sc=1029,ad=1030,rc=1031,ac=1033,Vr=33776,Hr=33777,Wr=33778,Xr=33779,mo=35840,go=35841,_o=35842,xo=35843,oc=36196,vo=37492,Mo=37496,So=37808,yo=37809,Eo=37810,wo=37811,bo=37812,To=37813,Ao=37814,Co=37815,Ro=37816,Lo=37817,Po=37818,Io=37819,Do=37820,Uo=37821,Yr=36492,No=36494,Fo=36495,od=36283,Oo=36284,Bo=36285,ko=36286,ld=3200,cd=3201,hd=0,dd=1,Gn="",hn="srgb",ei="srgb-linear",$a="display-p3",Pr="display-p3-linear",pr="linear",rt="srgb",mr="rec709",gr="p3",Ri=7680,zo=519,ud=512,fd=513,pd=514,lc=515,md=516,gd=517,_d=518,xd=519,Pa=35044,Go="300 es",Ia=1035,Tn=2e3,_r=2001;class us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,l=i.length;s<l;s++)i[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qr=Math.PI/180,Da=180/Math.PI;function Kn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function kt(r,e,t){return Math.max(e,Math.min(t,r))}function vd(r,e){return(r%e+e)%e}function Zr(r,e,t){return(1-t)*r+t*e}function Vo(r){return(r&r-1)===0&&r!==0}function Ua(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function fn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function et(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}let Qe=class cc{constructor(e=0,t=0){cc.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,l=this.y-e.y;return this.x=s*n-l*i+e.x,this.y=s*i+l*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};class We{constructor(e,t,n,i,s,l,a,c,o){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,l,a,c,o)}set(e,t,n,i,s,l,a,c,o){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=l,h[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,l=n[0],a=n[3],c=n[6],o=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],y=i[1],x=i[4],M=i[7],b=i[2],S=i[5],w=i[8];return s[0]=l*_+a*y+c*b,s[3]=l*p+a*x+c*S,s[6]=l*m+a*M+c*w,s[1]=o*_+h*y+d*b,s[4]=o*p+h*x+d*S,s[7]=o*m+h*M+d*w,s[2]=u*_+f*y+g*b,s[5]=u*p+f*x+g*S,s[8]=u*m+f*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],l=e[4],a=e[5],c=e[6],o=e[7],h=e[8];return t*l*h-t*a*o-n*s*h+n*a*c+i*s*o-i*l*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],l=e[4],a=e[5],c=e[6],o=e[7],h=e[8],d=h*l-a*o,u=a*c-h*s,f=o*s-l*c,g=t*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*o-h*n)*_,e[2]=(a*n-i*l)*_,e[3]=u*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=f*_,e[7]=(n*c-o*t)*_,e[8]=(l*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,l,a){const c=Math.cos(s),o=Math.sin(s);return this.set(n*c,n*o,-n*(c*l+o*a)+l+e,-i*o,i*c,-i*(-o*l+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($r.makeScale(e,t)),this}rotate(e){return this.premultiply($r.makeRotation(-e)),this}translate(e,t){return this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new We;function hc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function xr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Md(){const r=xr("canvas");return r.style.display="block",r}const Ho={};function dc(r){r in Ho||(Ho[r]=!0,console.warn(r))}const Wo=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xo=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Os={[ei]:{transfer:pr,primaries:mr,toReference:r=>r,fromReference:r=>r},[hn]:{transfer:rt,primaries:mr,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Pr]:{transfer:pr,primaries:gr,toReference:r=>r.applyMatrix3(Xo),fromReference:r=>r.applyMatrix3(Wo)},[$a]:{transfer:rt,primaries:gr,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Xo),fromReference:r=>r.applyMatrix3(Wo).convertLinearToSRGB()}},Sd=new Set([ei,Pr]),tt={enabled:!0,_workingColorSpace:ei,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Sd.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Os[e].toReference,i=Os[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Os[r].primaries},getTransfer:function(r){return r===Gn?pr:Os[r].transfer}};function es(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function jr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Li;class uc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=xr("canvas")),Li.width=e.width,Li.height=e.height;const n=Li.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let l=0;l<s.length;l++)s[l]=es(s[l]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(es(t[n]/255)*255):t[n]=es(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yd=0;class fc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Kn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let l=0,a=i.length;l<a;l++)i[l].isDataTexture?s.push(Kr(i[l].image)):s.push(Kr(i[l]))}else s=Kr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Kr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?uc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ed=0,en=class lr extends us{constructor(e=lr.DEFAULT_IMAGE,t=lr.DEFAULT_MAPPING,n=Jt,i=Jt,s=bt,l=_i,a=an,c=jn,o=lr.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Kn(),this.name="",this.source=new fc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=l,this.anisotropy=o,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ec)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ur:e.x=e.x-Math.floor(e.x);break;case Jt:e.x=e.x<0?0:1;break;case fr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ur:e.y=e.y-Math.floor(e.y);break;case Jt:e.y=e.y<0?0:1;break;case fr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=ec;en.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,i=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,l=e.elements;return this.x=l[0]*t+l[4]*n+l[8]*i+l[12]*s,this.y=l[1]*t+l[5]*n+l[9]*i+l[13]*s,this.z=l[2]*t+l[6]*n+l[10]*i+l[14]*s,this.w=l[3]*t+l[7]*n+l[11]*i+l[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,o=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(o+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(o+1)/2,M=(f+1)/2,b=(m+1)/2,S=(h+u)/4,w=(d+_)/4,R=(g+p)/4;return x>M&&x>b?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=S/n,s=w/n):M>b?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=S/i,s=R/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=w/s,i=R/s),this.set(n,i,s,t),this}let y=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((o+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wd extends us{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const s=new en(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let a=0;a<l;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new fc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends wd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pc extends en{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=xt,this.minFilter=xt,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bd extends en{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=xt,this.minFilter=xt,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cs{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,l,a){let c=n[i+0],o=n[i+1],h=n[i+2],d=n[i+3];const u=s[l+0],f=s[l+1],g=s[l+2],_=s[l+3];if(a===0){e[t+0]=c,e[t+1]=o,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==u||o!==f||h!==g){let p=1-a;const m=c*u+o*f+h*g+d*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const b=Math.sqrt(x),S=Math.atan2(b,m*y);p=Math.sin(p*S)/b,a=Math.sin(a*S)/b}const M=a*y;if(c=c*p+u*M,o=o*p+f*M,h=h*p+g*M,d=d*p+_*M,p===1-a){const b=1/Math.sqrt(c*c+o*o+h*h+d*d);c*=b,o*=b,h*=b,d*=b}}e[t]=c,e[t+1]=o,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,l){const a=n[i],c=n[i+1],o=n[i+2],h=n[i+3],d=s[l],u=s[l+1],f=s[l+2],g=s[l+3];return e[t]=a*g+h*d+c*f-o*u,e[t+1]=c*g+h*u+o*d-a*f,e[t+2]=o*g+h*f+a*u-c*d,e[t+3]=h*g-a*d-c*u-o*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,l=e._order,a=Math.cos,c=Math.sin,o=a(n/2),h=a(i/2),d=a(s/2),u=c(n/2),f=c(i/2),g=c(s/2);switch(l){case"XYZ":this._x=u*h*d+o*f*g,this._y=o*f*d-u*h*g,this._z=o*h*g+u*f*d,this._w=o*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+o*f*g,this._y=o*f*d-u*h*g,this._z=o*h*g-u*f*d,this._w=o*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-o*f*g,this._y=o*f*d+u*h*g,this._z=o*h*g+u*f*d,this._w=o*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-o*f*g,this._y=o*f*d+u*h*g,this._z=o*h*g-u*f*d,this._w=o*h*d+u*f*g;break;case"YZX":this._x=u*h*d+o*f*g,this._y=o*f*d+u*h*g,this._z=o*h*g-u*f*d,this._w=o*h*d-u*f*g;break;case"XZY":this._x=u*h*d-o*f*g,this._y=o*f*d-u*h*g,this._z=o*h*g+u*f*d,this._w=o*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],l=t[1],a=t[5],c=t[9],o=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-o)*f,this._z=(l-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+l)/f,this._z=(s+o)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-o)/f,this._x=(i+l)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(l-i)/f,this._x=(s+o)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,l=e._w,a=t._x,c=t._y,o=t._z,h=t._w;return this._x=n*h+l*a+i*o-s*c,this._y=i*h+l*c+s*a-n*o,this._z=s*h+l*o+n*c-i*a,this._w=l*h-n*a-i*c-s*o,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,l=this._w;let a=l*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=l,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*l+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const o=Math.sqrt(c),h=Math.atan2(o,a),d=Math.sin((1-t)*h)/o,u=Math.sin(t*h)/o;return this._w=l*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,n=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,l=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*l,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*l,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*l,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,l=e.y,a=e.z,c=e.w,o=2*(l*i-a*n),h=2*(a*t-s*i),d=2*(s*n-l*t);return this.x=t+c*o+l*d-a*h,this.y=n+c*h+a*o-s*d,this.z=i+c*d+s*h-l*o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,l=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*l-n*c,this.z=n*a-i*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jr.copy(this).projectOnVector(e),this.sub(Jr)}reflect(e){return this.sub(Jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new Z,Yo=new Cs;class Rs{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let l=0,a=s.count;l<a;l++)e.isMesh===!0?e.getVertexPosition(l,tn):tn.fromBufferAttribute(s,l),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(e.matrixWorld),this.union(Bs)}const i=e.children;for(let s=0,l=i.length;s<l;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gs),ks.subVectors(this.max,gs),Pi.subVectors(e.a,gs),Ii.subVectors(e.b,gs),Di.subVectors(e.c,gs),Dn.subVectors(Ii,Pi),Un.subVectors(Di,Ii),si.subVectors(Pi,Di);let t=[0,-Dn.z,Dn.y,0,-Un.z,Un.y,0,-si.z,si.y,Dn.z,0,-Dn.x,Un.z,0,-Un.x,si.z,0,-si.x,-Dn.y,Dn.x,0,-Un.y,Un.x,0,-si.y,si.x,0];return!Qr(t,Pi,Ii,Di,ks)||(t=[1,0,0,0,1,0,0,0,1],!Qr(t,Pi,Ii,Di,ks))?!1:(zs.crossVectors(Dn,Un),t=[zs.x,zs.y,zs.z],Qr(t,Pi,Ii,Di,ks))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xn=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],tn=new Z,Bs=new Rs,Pi=new Z,Ii=new Z,Di=new Z,Dn=new Z,Un=new Z,si=new Z,gs=new Z,ks=new Z,zs=new Z,ri=new Z;function Qr(r,e,t,n,i){for(let s=0,l=r.length-3;s<=l;s+=3){ri.fromArray(r,s);const a=i.x*Math.abs(ri.x)+i.y*Math.abs(ri.y)+i.z*Math.abs(ri.z),c=e.dot(ri),o=t.dot(ri),h=n.dot(ri);if(Math.max(-Math.max(c,o,h),Math.min(c,o,h))>a)return!1}return!0}const Td=new Rs,_s=new Z,ea=new Z;class ja{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Td.setFromPoints(e).getCenter(n);let i=0;for(let s=0,l=e.length;s<l;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_s,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ea.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(ea)),this.expandByPoint(_s.copy(e.center).sub(ea))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new Z,ta=new Z,Gs=new Z,Nn=new Z,na=new Z,Vs=new Z,ia=new Z;class Ad{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ta.copy(e).add(t).multiplyScalar(.5),Gs.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(ta);const s=e.distanceTo(t)*.5,l=-this.direction.dot(Gs),a=Nn.dot(this.direction),c=-Nn.dot(Gs),o=Nn.lengthSq(),h=Math.abs(1-l*l);let d,u,f,g;if(h>0)if(d=l*c-a,u=l*a-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+l*u+2*a)+u*(l*d+u+2*c)+o}else u=s,d=Math.max(0,-(l*u+a)),f=-d*d+u*(u+2*c)+o;else u=-s,d=Math.max(0,-(l*u+a)),f=-d*d+u*(u+2*c)+o;else u<=-g?(d=Math.max(0,-(-l*s+a)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+o):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+o):(d=Math.max(0,-(l*s+a)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+o);else u=l>0?-s:s,d=Math.max(0,-(l*u+a)),f=-d*d+u*(u+2*c)+o;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(ta).addScaledVector(Gs,u),f}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),i=vn.dot(vn)-n*n,s=e.radius*e.radius;if(i>s)return null;const l=Math.sqrt(s-i),a=n-l,c=n+l;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,l,a,c;const o=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return o>=0?(n=(e.min.x-u.x)*o,i=(e.max.x-u.x)*o):(n=(e.max.x-u.x)*o,i=(e.min.x-u.x)*o),h>=0?(s=(e.min.y-u.y)*h,l=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,l=(e.min.y-u.y)*h),n>l||s>i||((s>n||isNaN(n))&&(n=s),(l<i||isNaN(i))&&(i=l),d>=0?(a=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,i,s){na.subVectors(t,e),Vs.subVectors(n,e),ia.crossVectors(na,Vs);let l=this.direction.dot(ia),a;if(l>0){if(i)return null;a=1}else if(l<0)a=-1,l=-l;else return null;Nn.subVectors(this.origin,e);const c=a*this.direction.dot(Vs.crossVectors(Nn,Vs));if(c<0)return null;const o=a*this.direction.dot(na.cross(Nn));if(o<0||c+o>l)return null;const h=-a*Nn.dot(ia);return h<0?null:this.at(h/l,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,n,i,s,l,a,c,o,h,d,u,f,g,_,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,l,a,c,o,h,d,u,f,g,_,p)}set(e,t,n,i,s,l,a,c,o,h,d,u,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=l,m[9]=a,m[13]=c,m[2]=o,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ui.setFromMatrixColumn(e,0).length(),s=1/Ui.setFromMatrixColumn(e,1).length(),l=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*l,t[9]=n[9]*l,t[10]=n[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,l=Math.cos(n),a=Math.sin(n),c=Math.cos(i),o=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=l*h,f=l*d,g=a*h,_=a*d;t[0]=c*h,t[4]=-c*d,t[8]=o,t[1]=f+g*o,t[5]=u-_*o,t[9]=-a*c,t[2]=_-u*o,t[6]=g+f*o,t[10]=l*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=o*h,_=o*d;t[0]=u+_*a,t[4]=g*a-f,t[8]=l*o,t[1]=l*d,t[5]=l*h,t[9]=-a,t[2]=f*a-g,t[6]=_+u*a,t[10]=l*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=o*h,_=o*d;t[0]=u-_*a,t[4]=-l*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=l*h,t[9]=_-u*a,t[2]=-l*o,t[6]=a,t[10]=l*c}else if(e.order==="ZYX"){const u=l*h,f=l*d,g=a*h,_=a*d;t[0]=c*h,t[4]=g*o-f,t[8]=u*o+_,t[1]=c*d,t[5]=_*o+u,t[9]=f*o-g,t[2]=-o,t[6]=a*c,t[10]=l*c}else if(e.order==="YZX"){const u=l*c,f=l*o,g=a*c,_=a*o;t[0]=c*h,t[4]=_-u*d,t[8]=g*d+f,t[1]=d,t[5]=l*h,t[9]=-a*h,t[2]=-o*h,t[6]=f*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=l*c,f=l*o,g=a*c,_=a*o;t[0]=c*h,t[4]=-d,t[8]=o*h,t[1]=u*d+_,t[5]=l*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cd,e,Rd)}lookAt(e,t,n){const i=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Fn.crossVectors(n,Ht),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Fn.crossVectors(n,Ht)),Fn.normalize(),Hs.crossVectors(Ht,Fn),i[0]=Fn.x,i[4]=Hs.x,i[8]=Ht.x,i[1]=Fn.y,i[5]=Hs.y,i[9]=Ht.y,i[2]=Fn.z,i[6]=Hs.z,i[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,l=n[0],a=n[4],c=n[8],o=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],x=n[7],M=n[11],b=n[15],S=i[0],w=i[4],R=i[8],I=i[12],E=i[1],A=i[5],H=i[9],B=i[13],C=i[2],D=i[6],U=i[10],G=i[14],V=i[3],W=i[7],J=i[11],te=i[15];return s[0]=l*S+a*E+c*C+o*V,s[4]=l*w+a*A+c*D+o*W,s[8]=l*R+a*H+c*U+o*J,s[12]=l*I+a*B+c*G+o*te,s[1]=h*S+d*E+u*C+f*V,s[5]=h*w+d*A+u*D+f*W,s[9]=h*R+d*H+u*U+f*J,s[13]=h*I+d*B+u*G+f*te,s[2]=g*S+_*E+p*C+m*V,s[6]=g*w+_*A+p*D+m*W,s[10]=g*R+_*H+p*U+m*J,s[14]=g*I+_*B+p*G+m*te,s[3]=y*S+x*E+M*C+b*V,s[7]=y*w+x*A+M*D+b*W,s[11]=y*R+x*H+M*U+b*J,s[15]=y*I+x*B+M*G+b*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],l=e[1],a=e[5],c=e[9],o=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*c*d-i*o*d-s*a*u+n*o*u+i*a*f-n*c*f)+_*(+t*c*f-t*o*u+s*l*u-i*l*f+i*o*h-s*c*h)+p*(+t*o*d-t*a*f-s*l*d+n*l*f+s*a*h-n*o*h)+m*(-i*a*h-t*c*d+t*a*u+i*l*d-n*l*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],l=e[4],a=e[5],c=e[6],o=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],y=d*p*o-_*u*o+_*c*f-a*p*f-d*c*m+a*u*m,x=g*u*o-h*p*o-g*c*f+l*p*f+h*c*m-l*u*m,M=h*_*o-g*d*o+g*a*f-l*_*f-h*a*m+l*d*m,b=g*d*c-h*_*c-g*a*u+l*_*u+h*a*p-l*d*p,S=t*y+n*x+i*M+s*b;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return e[0]=y*w,e[1]=(_*u*s-d*p*s-_*i*f+n*p*f+d*i*m-n*u*m)*w,e[2]=(a*p*s-_*c*s+_*i*o-n*p*o-a*i*m+n*c*m)*w,e[3]=(d*c*s-a*u*s-d*i*o+n*u*o+a*i*f-n*c*f)*w,e[4]=x*w,e[5]=(h*p*s-g*u*s+g*i*f-t*p*f-h*i*m+t*u*m)*w,e[6]=(g*c*s-l*p*s-g*i*o+t*p*o+l*i*m-t*c*m)*w,e[7]=(l*u*s-h*c*s+h*i*o-t*u*o-l*i*f+t*c*f)*w,e[8]=M*w,e[9]=(g*d*s-h*_*s-g*n*f+t*_*f+h*n*m-t*d*m)*w,e[10]=(l*_*s-g*a*s+g*n*o-t*_*o-l*n*m+t*a*m)*w,e[11]=(h*a*s-l*d*s-h*n*o+t*d*o+l*n*f-t*a*f)*w,e[12]=b*w,e[13]=(h*_*i-g*d*i+g*n*u-t*_*u-h*n*p+t*d*p)*w,e[14]=(g*a*i-l*_*i-g*n*c+t*_*c+l*n*p-t*a*p)*w,e[15]=(l*d*i-h*a*i+h*n*c-t*d*c-l*n*u+t*a*u)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,l=e.x,a=e.y,c=e.z,o=s*l,h=s*a;return this.set(o*l+n,o*a-i*c,o*c+i*a,0,o*a+i*c,h*a+n,h*c-i*l,0,o*c-i*a,h*c+i*l,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,l){return this.set(1,n,s,0,e,1,l,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,l=t._y,a=t._z,c=t._w,o=s+s,h=l+l,d=a+a,u=s*o,f=s*h,g=s*d,_=l*h,p=l*d,m=a*d,y=c*o,x=c*h,M=c*d,b=n.x,S=n.y,w=n.z;return i[0]=(1-(_+m))*b,i[1]=(f+M)*b,i[2]=(g-x)*b,i[3]=0,i[4]=(f-M)*S,i[5]=(1-(u+m))*S,i[6]=(p+y)*S,i[7]=0,i[8]=(g+x)*w,i[9]=(p-y)*w,i[10]=(1-(u+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ui.set(i[0],i[1],i[2]).length();const l=Ui.set(i[4],i[5],i[6]).length(),a=Ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],nn.copy(this);const o=1/s,h=1/l,d=1/a;return nn.elements[0]*=o,nn.elements[1]*=o,nn.elements[2]*=o,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=d,nn.elements[9]*=d,nn.elements[10]*=d,t.setFromRotationMatrix(nn),n.x=s,n.y=l,n.z=a,this}makePerspective(e,t,n,i,s,l,a=Tn){const c=this.elements,o=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let f,g;if(a===Tn)f=-(l+s)/(l-s),g=-2*l*s/(l-s);else if(a===_r)f=-l/(l-s),g=-l*s/(l-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=o,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,l,a=Tn){const c=this.elements,o=1/(t-e),h=1/(n-i),d=1/(l-s),u=(t+e)*o,f=(n+i)*h;let g,_;if(a===Tn)g=(l+s)*d,_=-2*d;else if(a===_r)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*o,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ui=new Z,nn=new vt,Cd=new Z(0,0,0),Rd=new Z(1,1,1),Fn=new Z,Hs=new Z,Ht=new Z,qo=new vt,Zo=new Cs;class Rn{constructor(e=0,t=0,n=0,i=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],l=i[4],a=i[8],c=i[1],o=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-l,s)):(this._x=Math.atan2(u,o),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,o)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-l,o)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-kt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-l,o));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,o),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,o),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zo.setFromEuler(this),this.setFromQuaternion(Zo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class mc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ld=0;const $o=new Z,Ni=new Cs,Mn=new vt,Ws=new Z,xs=new Z,Pd=new Z,Id=new Cs,jo=new Z(1,0,0),Ko=new Z(0,1,0),Jo=new Z(0,0,1),Dd={type:"added"},Ud={type:"removed"},sa={type:"childadded",child:null},ra={type:"childremoved",child:null};class Gt extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new Z,t=new Rn,n=new Cs,i=new Z(1,1,1);function s(){n.setFromEuler(t,!1)}function l(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vt},normalMatrix:{value:new We}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.premultiply(Ni),this}rotateX(e){return this.rotateOnAxis(jo,e)}rotateY(e){return this.rotateOnAxis(Ko,e)}rotateZ(e){return this.rotateOnAxis(Jo,e)}translateOnAxis(e,t){return $o.copy(e).applyQuaternion(this.quaternion),this.position.add($o.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jo,e)}translateY(e){return this.translateOnAxis(Ko,e)}translateZ(e){return this.translateOnAxis(Jo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ws.copy(e):Ws.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(xs,Ws,this.up):Mn.lookAt(Ws,xs,this.up),this.quaternion.setFromRotationMatrix(Mn),i&&(Mn.extractRotation(i.matrixWorld),Ni.setFromRotationMatrix(Mn),this.quaternion.premultiply(Ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Dd),sa.child=e,this.dispatchEvent(sa),sa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ud),ra.child=e,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const l=this.children[n].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,e,Pd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Id,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,l=i.length;s<l;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let o=0,h=c.length;o<h;o++){const d=c[o];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,o=this.material.length;c<o;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=l(e.geometries),c=l(e.materials),o=l(e.textures),h=l(e.images),d=l(e.shapes),u=l(e.skeletons),f=l(e.animations),g=l(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),o.length>0&&(n.textures=o),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function l(a){const c=[];for(const o in a){const h=a[o];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Gt.DEFAULT_UP=new Z(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new Z,Sn=new Z,aa=new Z,yn=new Z,Fi=new Z,Oi=new Z,Qo=new Z,oa=new Z,la=new Z,ca=new Z;class pn{constructor(e=new Z,t=new Z,n=new Z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),sn.subVectors(e,t),i.cross(sn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){sn.subVectors(i,t),Sn.subVectors(n,t),aa.subVectors(e,t);const l=sn.dot(sn),a=sn.dot(Sn),c=sn.dot(aa),o=Sn.dot(Sn),h=Sn.dot(aa),d=l*o-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(o*c-a*h)*u,g=(l*h-a*c)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,n,i,s,l,a,c){return this.getBarycoord(e,t,n,i,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,yn.x),c.addScaledVector(l,yn.y),c.addScaledVector(a,yn.z),c)}static isFrontFacing(e,t,n,i){return sn.subVectors(n,t),Sn.subVectors(e,t),sn.cross(Sn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),sn.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let l,a;Fi.subVectors(i,n),Oi.subVectors(s,n),oa.subVectors(e,n);const c=Fi.dot(oa),o=Oi.dot(oa);if(c<=0&&o<=0)return t.copy(n);la.subVectors(e,i);const h=Fi.dot(la),d=Oi.dot(la);if(h>=0&&d<=h)return t.copy(i);const u=c*d-h*o;if(u<=0&&c>=0&&h<=0)return l=c/(c-h),t.copy(n).addScaledVector(Fi,l);ca.subVectors(e,s);const f=Fi.dot(ca),g=Oi.dot(ca);if(g>=0&&f<=g)return t.copy(s);const _=f*o-c*g;if(_<=0&&o>=0&&g<=0)return a=o/(o-g),t.copy(n).addScaledVector(Oi,a);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Qo.subVectors(s,i),a=(d-h)/(d-h+(f-g)),t.copy(i).addScaledVector(Qo,a);const m=1/(p+_+u);return l=_*m,a=u*m,t.copy(n).addScaledVector(Fi,l).addScaledVector(Oi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function ha(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let nt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=tt.workingColorSpace){if(e=vd(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,l=2*n-s;this.r=ha(l,s,e+1/3),this.g=ha(l,s,e),this.b=ha(l,s,e-1/3)}return tt.toWorkingColorSpace(this,i),this}setStyle(e,t=hn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const l=i[1],a=i[2];switch(l){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],l=s.length;if(l===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=gc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=es(e.r),this.g=es(e.g),this.b=es(e.b),this}copyLinearToSRGB(e){return this.r=jr(e.r),this.g=jr(e.g),this.b=jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return tt.fromWorkingColorSpace(Pt.copy(this),e),Math.round(kt(Pt.r*255,0,255))*65536+Math.round(kt(Pt.g*255,0,255))*256+Math.round(kt(Pt.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(Pt.copy(this),t);const n=Pt.r,i=Pt.g,s=Pt.b,l=Math.max(n,i,s),a=Math.min(n,i,s);let c,o;const h=(a+l)/2;if(a===l)c=0,o=0;else{const d=l-a;switch(o=h<=.5?d/(l+a):d/(2-l-a),l){case n:c=(i-s)/d+(i<s?6:0);break;case i:c=(s-n)/d+2;break;case s:c=(n-i)/d+4;break}c/=6}return e.h=c,e.s=o,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=hn){tt.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,i=Pt.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(Xs);const n=Zr(On.h,Xs.h,t),i=Zr(On.s,Xs.s,t),s=Zr(On.l,Xs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Pt=new nt;nt.NAMES=gc;let Nd=0;class Ei extends us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=An,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ca,this.blendDst=ws,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==An&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ca&&(n.blendSrc=this.blendSrc),this.blendDst!==ws&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const l=[];for(const a in s){const c=s[a];delete c.metadata,l.push(c)}return l}if(t){const s=i(e.textures),l=i(e.images);s.length>0&&(n.textures=s),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class vr extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new Z,Ys=new Qe;class Qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return dc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ys.fromBufferAttribute(this,t),Ys.applyMatrix3(e),this.setXY(t,Ys.x,Ys.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pa&&(e.usage=this.usage),e}}class _c extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class xc extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wi extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Fd=0;const $t=new vt,da=new Gt,Bi=new Z,Wt=new Rs,vs=new Rs,Et=new Z;class ti extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hc(e)?xc:_c)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new wi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ja);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,l=t.length;s<l;s++){const a=t[s];vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Wt.min,vs.min),Wt.expandByPoint(Et),Et.addVectors(Wt.max,vs.max),Wt.expandByPoint(Et)):(Wt.expandByPoint(vs.min),Wt.expandByPoint(vs.max))}Wt.getCenter(n);let i=0;for(let s=0,l=e.count;s<l;s++)Et.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Et));if(t)for(let s=0,l=t.length;s<l;s++){const a=t[s],c=this.morphTargetsRelative;for(let o=0,h=a.count;o<h;o++)Et.fromBufferAttribute(a,o),c&&(Bi.fromBufferAttribute(e,o),Et.add(Bi)),i=Math.max(i,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new Z,c[R]=new Z;const o=new Z,h=new Z,d=new Z,u=new Qe,f=new Qe,g=new Qe,_=new Z,p=new Z;function m(R,I,E){o.fromBufferAttribute(n,R),h.fromBufferAttribute(n,I),d.fromBufferAttribute(n,E),u.fromBufferAttribute(s,R),f.fromBufferAttribute(s,I),g.fromBufferAttribute(s,E),h.sub(o),d.sub(o),f.sub(u),g.sub(u);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(A),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),a[R].add(_),a[I].add(_),a[E].add(_),c[R].add(p),c[I].add(p),c[E].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let R=0,I=y.length;R<I;++R){const E=y[R],A=E.start,H=E.count;for(let B=A,C=A+H;B<C;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const x=new Z,M=new Z,b=new Z,S=new Z;function w(R){b.fromBufferAttribute(i,R),S.copy(b);const I=a[R];x.copy(I),x.sub(b.multiplyScalar(b.dot(I))).normalize(),M.crossVectors(S,I);const A=M.dot(c[R])<0?-1:1;l.setXYZW(R,x.x,x.y,x.z,A)}for(let R=0,I=y.length;R<I;++R){const E=y[R],A=E.start,H=E.count;for(let B=A,C=A+H;B<C;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new Z,s=new Z,l=new Z,a=new Z,c=new Z,o=new Z,h=new Z,d=new Z;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),_=e.getX(u+1),p=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),l.fromBufferAttribute(t,p),h.subVectors(l,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),o.fromBufferAttribute(n,p),a.add(h),c.add(h),o.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,o.x,o.y,o.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),l.fromBufferAttribute(t,u+2),h.subVectors(l,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,c){const o=a.array,h=a.itemSize,d=a.normalized,u=new o.constructor(c.length*h);let f=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let m=0;m<h;m++)u[g++]=o[f++]}return new Qt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ti,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],o=e(c,n);t.setAttribute(a,o)}const s=this.morphAttributes;for(const a in s){const c=[],o=s[a];for(let h=0,d=o.length;h<d;h++){const u=o[h],f=e(u,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let a=0,c=l.length;a<c;a++){const o=l[a];t.addGroup(o.start,o.count,o.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const o in c)c[o]!==void 0&&(e[o]=c[o]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const o=n[c];e.data.attributes[c]=o.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const o=this.morphAttributes[c],h=[];for(let d=0,u=o.length;d<u;d++){const f=o[d];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const o in i){const h=i[o];this.setAttribute(o,h.clone(t))}const s=e.morphAttributes;for(const o in s){const h=[],d=s[o];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[o]=h}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let o=0,h=l.length;o<h;o++){const d=l[o];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new vt,ai=new Ad,qs=new ja,tl=new Z,ki=new Z,zi=new Z,Gi=new Z,ua=new Z,Zs=new Z,$s=new Qe,js=new Qe,Ks=new Qe,nl=new Z,il=new Z,sl=new Z,Js=new Z,Qs=new Z;class mn extends Gt{constructor(e=new ti,t=new vr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,l=i.length;s<l;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,l=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Zs.set(0,0,0);for(let c=0,o=s.length;c<o;c++){const h=a[c],d=s[c];h!==0&&(ua.fromBufferAttribute(d,e),l?Zs.addScaledVector(ua,h):Zs.addScaledVector(ua.sub(t),h))}t.add(Zs)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(s),ai.copy(e.ray).recast(e.near),!(qs.containsPoint(ai.origin)===!1&&(ai.intersectSphere(qs,tl)===null||ai.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(s).invert(),ai.copy(e.ray).applyMatrix4(el),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ai)))}_computeIntersections(e,t,n){let i;const s=this.geometry,l=this.material,a=s.index,c=s.attributes.position,o=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(l))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=l[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,b=x;M<b;M+=3){const S=a.getX(M),w=a.getX(M+1),R=a.getX(M+2);i=er(this,m,e,n,o,h,d,S,w,R),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=a.getX(p),x=a.getX(p+1),M=a.getX(p+2);i=er(this,l,e,n,o,h,d,y,x,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(l))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=l[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let M=y,b=x;M<b;M+=3){const S=M,w=M+1,R=M+2;i=er(this,m,e,n,o,h,d,S,w,R),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=p,x=p+1,M=p+2;i=er(this,l,e,n,o,h,d,y,x,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Od(r,e,t,n,i,s,l,a){let c;if(e.side===zt?c=n.intersectTriangle(l,s,i,!0,a):c=n.intersectTriangle(i,s,l,e.side===Qn,a),c===null)return null;Qs.copy(a),Qs.applyMatrix4(r.matrixWorld);const o=t.ray.origin.distanceTo(Qs);return o<t.near||o>t.far?null:{distance:o,point:Qs.clone(),object:r}}function er(r,e,t,n,i,s,l,a,c,o){r.getVertexPosition(a,ki),r.getVertexPosition(c,zi),r.getVertexPosition(o,Gi);const h=Od(r,e,t,n,ki,zi,Gi,Js);if(h){i&&($s.fromBufferAttribute(i,a),js.fromBufferAttribute(i,c),Ks.fromBufferAttribute(i,o),h.uv=pn.getInterpolation(Js,ki,zi,Gi,$s,js,Ks,new Qe)),s&&($s.fromBufferAttribute(s,a),js.fromBufferAttribute(s,c),Ks.fromBufferAttribute(s,o),h.uv1=pn.getInterpolation(Js,ki,zi,Gi,$s,js,Ks,new Qe)),l&&(nl.fromBufferAttribute(l,a),il.fromBufferAttribute(l,c),sl.fromBufferAttribute(l,o),h.normal=pn.getInterpolation(Js,ki,zi,Gi,nl,il,sl,new Z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:o,normal:new Z,materialIndex:0};pn.getNormal(ki,zi,Gi,d.normal),h.face=d}return h}class Ls extends ti{constructor(e=1,t=1,n=1,i=1,s=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:l};const a=this;i=Math.floor(i),s=Math.floor(s),l=Math.floor(l);const c=[],o=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,l,s,0),g("z","y","x",1,-1,n,t,-e,l,s,1),g("x","z","y",1,1,e,n,t,i,l,2),g("x","z","y",1,-1,e,n,-t,i,l,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new wi(o,3)),this.setAttribute("normal",new wi(h,3)),this.setAttribute("uv",new wi(d,2));function g(_,p,m,y,x,M,b,S,w,R,I){const E=M/w,A=b/R,H=M/2,B=b/2,C=S/2,D=w+1,U=R+1;let G=0,V=0;const W=new Z;for(let J=0;J<U;J++){const te=J*A-B;for(let re=0;re<D;re++){const ne=re*E-H;W[_]=ne*y,W[p]=te*x,W[m]=C,o.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[m]=S>0?1:-1,h.push(W.x,W.y,W.z),d.push(re/w),d.push(1-J/R),G+=1}}for(let J=0;J<R;J++)for(let te=0;te<w;te++){const re=u+te+D*J,ne=u+te+D*(J+1),O=u+(te+1)+D*(J+1),j=u+(te+1)+D*J;c.push(re,ne,j),c.push(ne,O,j),V+=6}a.addGroup(f,V,I),f+=V,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function hs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Nt(r){const e={};for(let t=0;t<r.length;t++){const n=hs(r[t]);for(const i in n)e[i]=n[i]}return e}function Bd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function vc(r){return r.getRenderTarget()===null?r.outputColorSpace:tt.workingColorSpace}const kd={clone:hs,merge:Nt};var zd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ln extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zd,this.fragmentShader=Gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Bd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const l=this.uniforms[i].value;l&&l.isTexture?t.uniforms[i]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[i]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[i]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[i]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[i]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[i]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[i]={type:"m4",value:l.toArray()}:t.uniforms[i]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Mc extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Tn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new Z,rl=new Qe,al=new Qe;class Kt extends Mc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Da*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,rl,al),t.subVectors(al,rl)}setViewOffset(e,t,n,i,s,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const l=this.view;if(this.view!==null&&this.view.enabled){const c=l.fullWidth,o=l.fullHeight;s+=l.offsetX*i/c,t-=l.offsetY*n/o,i*=l.width/c,n*=l.height/o}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Vi=-90,Hi=1;class Vd extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kt(Vi,Hi,e,t);i.layers=this.layers,this.add(i);const s=new Kt(Vi,Hi,e,t);s.layers=this.layers,this.add(s);const l=new Kt(Vi,Hi,e,t);l.layers=this.layers,this.add(l);const a=new Kt(Vi,Hi,e,t);a.layers=this.layers,this.add(a);const c=new Kt(Vi,Hi,e,t);c.layers=this.layers,this.add(c);const o=new Kt(Vi,Hi,e,t);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,l,a,c]=t;for(const o of t)this.remove(o);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const o of t)this.add(o),o.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,l,a,c,o,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,l),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,o),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sc extends en{constructor(e,t,n,i,s,l,a,c,o,h){e=e!==void 0?e:[],t=t!==void 0?t:os,super(e,t,n,i,s,l,a,c,o,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hd extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Sc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ls(5,5,5),s=new Ln({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:Zn});s.uniforms.tEquirect.value=t;const l=new mn(i,s),a=t.minFilter;return t.minFilter===_i&&(t.minFilter=bt),new Vd(1,10,this).update(e,l),t.minFilter=a,l.geometry.dispose(),l.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,n,i);e.setRenderTarget(s)}}const fa=new Z,Wd=new Z,Xd=new We;class hi{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=fa.subVectors(n,t).cross(Wd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xd.getNormalMatrix(e),i=this.coplanarPoint(fa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new ja,tr=new Z;class yc{constructor(e=new hi,t=new hi,n=new hi,i=new hi,s=new hi,l=new hi){this.planes=[e,t,n,i,s,l]}set(e,t,n,i,s,l){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(l),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn){const n=this.planes,i=e.elements,s=i[0],l=i[1],a=i[2],c=i[3],o=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],x=i[14],M=i[15];if(n[0].setComponents(c-s,u-o,p-f,M-m).normalize(),n[1].setComponents(c+s,u+o,p+f,M+m).normalize(),n[2].setComponents(c+l,u+h,p+g,M+y).normalize(),n[3].setComponents(c-l,u-h,p-g,M-y).normalize(),n[4].setComponents(c-a,u-d,p-_,M-x).normalize(),t===Tn)n[5].setComponents(c+a,u+d,p+_,M+x).normalize();else if(t===_r)n[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(e){return oi.center.set(0,0,0),oi.radius=.7071067811865476,oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(tr.x=i.normal.x>0?e.max.x:e.min.x,tr.y=i.normal.y>0?e.max.y:e.min.y,tr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(tr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ec(){let r=null,e=!1,t=null,n=null;function i(s,l){t(s,l),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Yd(r,e){const t=e.isWebGL2,n=new WeakMap;function i(o,h){const d=o.array,u=o.usage,f=d.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,d,u),o.onUploadCallback();let _;if(d instanceof Float32Array)_=r.FLOAT;else if(d instanceof Uint16Array)if(o.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=r.SHORT;else if(d instanceof Uint32Array)_=r.UNSIGNED_INT;else if(d instanceof Int32Array)_=r.INT;else if(d instanceof Int8Array)_=r.BYTE;else if(d instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:o.version,size:f}}function s(o,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(r.bindBuffer(d,o),f.count===-1&&g.length===0&&r.bufferSubData(d,0,u),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];t?r.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):r.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):r.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function l(o){return o.isInterleavedBufferAttribute&&(o=o.data),n.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=n.get(o);h&&(r.deleteBuffer(h.buffer),n.delete(o))}function c(o,h){if(o.isGLBufferAttribute){const u=n.get(o);(!u||u.version<o.version)&&n.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const d=n.get(o);if(d===void 0)n.set(o,i(o,h));else if(d.version<o.version){if(d.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,o,h),d.version=o.version}}return{get:l,remove:a,update:c}}class Ir extends ti{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,l=t/2,a=Math.floor(n),c=Math.floor(i),o=a+1,h=c+1,d=e/a,u=t/c,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const y=m*u-l;for(let x=0;x<o;x++){const M=x*d-s;g.push(M,-y,0),_.push(0,0,1),p.push(x/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const x=y+o*m,M=y+o*(m+1),b=y+1+o*(m+1),S=y+1+o*m;f.push(x,M,S),f.push(M,b,S)}this.setIndex(f),this.setAttribute("position",new wi(g,3)),this.setAttribute("normal",new wi(_,3)),this.setAttribute("uv",new wi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.width,e.height,e.widthSegments,e.heightSegments)}}var qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zd=`#ifdef USE_ALPHAHASH
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
#endif`,$d=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qd=`#ifdef USE_AOMAP
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
#endif`,eu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tu=`#ifdef USE_BATCHING
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
#endif`,nu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,iu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,su=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ru=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,au=`#ifdef USE_IRIDESCENCE
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
#endif`,ou=`#ifdef USE_BUMPMAP
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
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,mu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,gu=`#define PI 3.141592653589793
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
} // validated`,_u=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xu=`vec3 transformedNormal = objectNormal;
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
#endif`,vu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Su=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Eu="gl_FragColor = linearToOutputTexel( gl_FragColor );",wu=`
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
}`,bu=`#ifdef USE_ENVMAP
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
#endif`,Tu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Au=`#ifdef USE_ENVMAP
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
#endif`,Cu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ru=`#ifdef USE_ENVMAP
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
#endif`,Lu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Iu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Du=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uu=`#ifdef USE_GRADIENTMAP
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
}`,Nu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ou=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ku=`uniform bool receiveShadow;
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
#endif`,zu=`#ifdef USE_ENVMAP
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
#endif`,Gu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xu=`PhysicalMaterial material;
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
#endif`,Yu=`struct PhysicalMaterial {
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
}`,qu=`
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
#endif`,Zu=`#if defined( RE_IndirectDiffuse )
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
#endif`,$u=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ju=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ku=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ju=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Qu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sf=`#if defined( USE_POINTS_UV )
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
#endif`,rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,of=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cf=`#ifdef USE_MORPHNORMALS
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
#endif`,hf=`#ifdef USE_MORPHTARGETS
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
#endif`,df=`#ifdef USE_MORPHTARGETS
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
#endif`,uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ff=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_f=`#ifdef USE_NORMALMAP
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
#endif`,xf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ef=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Af=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,If=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Df=`float getShadowMask() {
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
}`,Uf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nf=`#ifdef USE_SKINNING
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
#endif`,Ff=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Of=`#ifdef USE_SKINNING
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
#endif`,Bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vf=`#ifdef USE_TRANSMISSION
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
#endif`,Hf=`#ifdef USE_TRANSMISSION
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$f=`uniform sampler2D t2D;
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
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ep=`#include <common>
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
}`,tp=`#if DEPTH_PACKING == 3200
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
}`,np=`#define DISTANCE
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
}`,ip=`#define DISTANCE
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
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`uniform float scale;
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
}`,op=`uniform vec3 diffuse;
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
}`,lp=`#include <common>
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
}`,cp=`uniform vec3 diffuse;
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
}`,hp=`#define LAMBERT
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
}`,dp=`#define LAMBERT
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
}`,up=`#define MATCAP
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
}`,fp=`#define MATCAP
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
}`,pp=`#define NORMAL
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
}`,mp=`#define NORMAL
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
}`,gp=`#define PHONG
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
}`,_p=`#define PHONG
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
}`,xp=`#define STANDARD
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
}`,vp=`#define STANDARD
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
}`,Mp=`#define TOON
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
}`,Sp=`#define TOON
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
}`,yp=`uniform float size;
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
}`,Ep=`uniform vec3 diffuse;
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
}`,wp=`#include <common>
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
}`,bp=`uniform vec3 color;
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
}`,Tp=`uniform float rotation;
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
}`,Ap=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:qd,alphahash_pars_fragment:Zd,alphamap_fragment:$d,alphamap_pars_fragment:jd,alphatest_fragment:Kd,alphatest_pars_fragment:Jd,aomap_fragment:Qd,aomap_pars_fragment:eu,batching_pars_vertex:tu,batching_vertex:nu,begin_vertex:iu,beginnormal_vertex:su,bsdfs:ru,iridescence_fragment:au,bumpmap_pars_fragment:ou,clipping_planes_fragment:lu,clipping_planes_pars_fragment:cu,clipping_planes_pars_vertex:hu,clipping_planes_vertex:du,color_fragment:uu,color_pars_fragment:fu,color_pars_vertex:pu,color_vertex:mu,common:gu,cube_uv_reflection_fragment:_u,defaultnormal_vertex:xu,displacementmap_pars_vertex:vu,displacementmap_vertex:Mu,emissivemap_fragment:Su,emissivemap_pars_fragment:yu,colorspace_fragment:Eu,colorspace_pars_fragment:wu,envmap_fragment:bu,envmap_common_pars_fragment:Tu,envmap_pars_fragment:Au,envmap_pars_vertex:Cu,envmap_physical_pars_fragment:zu,envmap_vertex:Ru,fog_vertex:Lu,fog_pars_vertex:Pu,fog_fragment:Iu,fog_pars_fragment:Du,gradientmap_pars_fragment:Uu,lightmap_fragment:Nu,lightmap_pars_fragment:Fu,lights_lambert_fragment:Ou,lights_lambert_pars_fragment:Bu,lights_pars_begin:ku,lights_toon_fragment:Gu,lights_toon_pars_fragment:Vu,lights_phong_fragment:Hu,lights_phong_pars_fragment:Wu,lights_physical_fragment:Xu,lights_physical_pars_fragment:Yu,lights_fragment_begin:qu,lights_fragment_maps:Zu,lights_fragment_end:$u,logdepthbuf_fragment:ju,logdepthbuf_pars_fragment:Ku,logdepthbuf_pars_vertex:Ju,logdepthbuf_vertex:Qu,map_fragment:ef,map_pars_fragment:tf,map_particle_fragment:nf,map_particle_pars_fragment:sf,metalnessmap_fragment:rf,metalnessmap_pars_fragment:af,morphinstance_vertex:of,morphcolor_vertex:lf,morphnormal_vertex:cf,morphtarget_pars_vertex:hf,morphtarget_vertex:df,normal_fragment_begin:uf,normal_fragment_maps:ff,normal_pars_fragment:pf,normal_pars_vertex:mf,normal_vertex:gf,normalmap_pars_fragment:_f,clearcoat_normal_fragment_begin:xf,clearcoat_normal_fragment_maps:vf,clearcoat_pars_fragment:Mf,iridescence_pars_fragment:Sf,opaque_fragment:yf,packing:Ef,premultiplied_alpha_fragment:wf,project_vertex:bf,dithering_fragment:Tf,dithering_pars_fragment:Af,roughnessmap_fragment:Cf,roughnessmap_pars_fragment:Rf,shadowmap_pars_fragment:Lf,shadowmap_pars_vertex:Pf,shadowmap_vertex:If,shadowmask_pars_fragment:Df,skinbase_vertex:Uf,skinning_pars_vertex:Nf,skinning_vertex:Ff,skinnormal_vertex:Of,specularmap_fragment:Bf,specularmap_pars_fragment:kf,tonemapping_fragment:zf,tonemapping_pars_fragment:Gf,transmission_fragment:Vf,transmission_pars_fragment:Hf,uv_pars_fragment:Wf,uv_pars_vertex:Xf,uv_vertex:Yf,worldpos_vertex:qf,background_vert:Zf,background_frag:$f,backgroundCube_vert:jf,backgroundCube_frag:Kf,cube_vert:Jf,cube_frag:Qf,depth_vert:ep,depth_frag:tp,distanceRGBA_vert:np,distanceRGBA_frag:ip,equirect_vert:sp,equirect_frag:rp,linedashed_vert:ap,linedashed_frag:op,meshbasic_vert:lp,meshbasic_frag:cp,meshlambert_vert:hp,meshlambert_frag:dp,meshmatcap_vert:up,meshmatcap_frag:fp,meshnormal_vert:pp,meshnormal_frag:mp,meshphong_vert:gp,meshphong_frag:_p,meshphysical_vert:xp,meshphysical_frag:vp,meshtoon_vert:Mp,meshtoon_frag:Sp,points_vert:yp,points_frag:Ep,shadow_vert:wp,shadow_frag:bp,sprite_vert:Tp,sprite_frag:Ap},he={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},dn={basic:{uniforms:Nt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Nt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new nt(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Nt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Nt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Nt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new nt(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Nt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Nt([he.points,he.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Nt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Nt([he.common,he.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Nt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Nt([he.sprite,he.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Nt([he.common,he.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Nt([he.lights,he.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};dn.physical={uniforms:Nt([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const nr={r:0,b:0,g:0},li=new Rn,Cp=new vt;function Rp(r,e,t,n,i,s,l){const a=new nt(0);let c=s===!0?0:1,o,h,d=null,u=0,f=null;function g(p,m){let y=!1,x=m.isScene===!0?m.background:null;x&&x.isTexture&&(x=(m.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,c):x&&x.isColor&&(_(x,1),y=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,l):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(r.autoClear||y)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Lr)?(h===void 0&&(h=new mn(new Ls(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:hs(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),li.copy(m.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Cp.makeRotationFromEuler(li)),h.material.toneMapped=tt.getTransfer(x.colorSpace)!==rt,(d!==x||u!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=r.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(o===void 0&&(o=new mn(new Ir(2,2),new Ln({name:"BackgroundMaterial",uniforms:hs(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(o)),o.material.uniforms.t2D.value=x,o.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,o.material.toneMapped=tt.getTransfer(x.colorSpace)!==rt,x.matrixAutoUpdate===!0&&x.updateMatrix(),o.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==r.toneMapping)&&(o.material.needsUpdate=!0,d=x,u=x.version,f=r.toneMapping),o.layers.enableAll(),p.unshift(o,o.geometry,o.material,0,0,null))}function _(p,m){p.getRGB(nr,vc(r)),n.buffers.color.setClear(nr.r,nr.g,nr.b,m,l)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),c=m,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(a,c)},render:g}}function Lp(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),l=n.isWebGL2||s!==null,a={},c=p(null);let o=c,h=!1;function d(C,D,U,G,V){let W=!1;if(l){const J=_(G,U,D);o!==J&&(o=J,f(o.object)),W=m(C,G,U,V),W&&y(C,G,U,V)}else{const J=D.wireframe===!0;(o.geometry!==G.id||o.program!==U.id||o.wireframe!==J)&&(o.geometry=G.id,o.program=U.id,o.wireframe=J,W=!0)}V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,R(C,D,U,G),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function u(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(C){return n.isWebGL2?r.bindVertexArray(C):s.bindVertexArrayOES(C)}function g(C){return n.isWebGL2?r.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function _(C,D,U){const G=U.wireframe===!0;let V=a[C.id];V===void 0&&(V={},a[C.id]=V);let W=V[D.id];W===void 0&&(W={},V[D.id]=W);let J=W[G];return J===void 0&&(J=p(u()),W[G]=J),J}function p(C){const D=[],U=[],G=[];for(let V=0;V<i;V++)D[V]=0,U[V]=0,G[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:G,object:C,attributes:{},index:null}}function m(C,D,U,G){const V=o.attributes,W=D.attributes;let J=0;const te=U.getAttributes();for(const re in te)if(te[re].location>=0){const O=V[re];let j=W[re];if(j===void 0&&(re==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),re==="instanceColor"&&C.instanceColor&&(j=C.instanceColor)),O===void 0||O.attribute!==j||j&&O.data!==j.data)return!0;J++}return o.attributesNum!==J||o.index!==G}function y(C,D,U,G){const V={},W=D.attributes;let J=0;const te=U.getAttributes();for(const re in te)if(te[re].location>=0){let O=W[re];O===void 0&&(re==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),re==="instanceColor"&&C.instanceColor&&(O=C.instanceColor));const j={};j.attribute=O,O&&O.data&&(j.data=O.data),V[re]=j,J++}o.attributes=V,o.attributesNum=J,o.index=G}function x(){const C=o.newAttributes;for(let D=0,U=C.length;D<U;D++)C[D]=0}function M(C){b(C,0)}function b(C,D){const U=o.newAttributes,G=o.enabledAttributes,V=o.attributeDivisors;U[C]=1,G[C]===0&&(r.enableVertexAttribArray(C),G[C]=1),V[C]!==D&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,D),V[C]=D)}function S(){const C=o.newAttributes,D=o.enabledAttributes;for(let U=0,G=D.length;U<G;U++)D[U]!==C[U]&&(r.disableVertexAttribArray(U),D[U]=0)}function w(C,D,U,G,V,W,J){J===!0?r.vertexAttribIPointer(C,D,U,V,W):r.vertexAttribPointer(C,D,U,G,V,W)}function R(C,D,U,G){if(n.isWebGL2===!1&&(C.isInstancedMesh||G.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const V=G.attributes,W=U.getAttributes(),J=D.defaultAttributeValues;for(const te in W){const re=W[te];if(re.location>=0){let ne=V[te];if(ne===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(ne=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(ne=C.instanceColor)),ne!==void 0){const O=ne.normalized,j=ne.itemSize,ue=t.get(ne);if(ue===void 0)continue;const Se=ue.buffer,me=ue.type,fe=ue.bytesPerElement,Le=n.isWebGL2===!0&&(me===r.INT||me===r.UNSIGNED_INT||ne.gpuType===tc);if(ne.isInterleavedBufferAttribute){const Te=ne.data,k=Te.stride,ft=ne.offset;if(Te.isInstancedInterleavedBuffer){for(let Ee=0;Ee<re.locationSize;Ee++)b(re.location+Ee,Te.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Te.meshPerAttribute*Te.count)}else for(let Ee=0;Ee<re.locationSize;Ee++)M(re.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let Ee=0;Ee<re.locationSize;Ee++)w(re.location+Ee,j/re.locationSize,me,O,k*fe,(ft+j/re.locationSize*Ee)*fe,Le)}else{if(ne.isInstancedBufferAttribute){for(let Te=0;Te<re.locationSize;Te++)b(re.location+Te,ne.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Te=0;Te<re.locationSize;Te++)M(re.location+Te);r.bindBuffer(r.ARRAY_BUFFER,Se);for(let Te=0;Te<re.locationSize;Te++)w(re.location+Te,j/re.locationSize,me,O,j*fe,j/re.locationSize*Te*fe,Le)}}else if(J!==void 0){const O=J[te];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(re.location,O);break;case 3:r.vertexAttrib3fv(re.location,O);break;case 4:r.vertexAttrib4fv(re.location,O);break;default:r.vertexAttrib1fv(re.location,O)}}}}S()}function I(){H();for(const C in a){const D=a[C];for(const U in D){const G=D[U];for(const V in G)g(G[V].object),delete G[V];delete D[U]}delete a[C]}}function E(C){if(a[C.id]===void 0)return;const D=a[C.id];for(const U in D){const G=D[U];for(const V in G)g(G[V].object),delete G[V];delete D[U]}delete a[C.id]}function A(C){for(const D in a){const U=a[D];if(U[C.id]===void 0)continue;const G=U[C.id];for(const V in G)g(G[V].object),delete G[V];delete U[C.id]}}function H(){B(),h=!0,o!==c&&(o=c,f(o.object))}function B(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:H,resetDefaultState:B,dispose:I,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:M,disableUnusedAttributes:S}}function Pp(r,e,t,n){const i=n.isWebGL2;let s;function l(h){s=h}function a(h,d){r.drawArrays(s,h,d),t.update(d,s,1)}function c(h,d,u){if(u===0)return;let f,g;if(i)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,d,u),t.update(d,s,u)}function o(h,d,u){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(s,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];t.update(g,s,1)}}this.setMode=l,this.render=a,this.renderInstances=c,this.renderMultiDraw=o}function Ip(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const l=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const o=l||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,M=l||e.has("OES_texture_float"),b=x&&M,S=l?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:l,drawBuffers:o,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:b,maxSamples:S}}function Dp(r){const e=this;let t=null,n=0,i=!1,s=!1;const l=new hi,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,m=r.get(d);if(!i||g===null||g.length===0||s&&!p)s?h(null):o();else{const y=s?0:n,x=y*4;let M=m.clippingState||null;c.value=M,M=h(g,u,x,f);for(let b=0;b!==x;++b)M[b]=t[b];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function o(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=f+_*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,M=f;x!==_;++x,M+=4)l.copy(d[x]).applyMatrix4(y,a),l.normal.toArray(p,M),p[M+3]=l.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Up(r){let e=new WeakMap;function t(l,a){return a===Ra?l.mapping=os:a===La&&(l.mapping=ls),l}function n(l){if(l&&l.isTexture){const a=l.mapping;if(a===Ra||a===La)if(e.has(l)){const c=e.get(l).texture;return t(c,l.mapping)}else{const c=l.image;if(c&&c.height>0){const o=new Hd(c.height);return o.fromEquirectangularTexture(r,l),e.set(l,o),l.addEventListener("dispose",i),t(o.texture,l.mapping)}else return null}}return l}function i(l){const a=l.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Np extends Mc{constructor(e=-1,t=1,n=1,i=-1,s=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,l=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const o=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=o*this.view.offsetX,l=s+o*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,l,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const qi=4,ol=[.125,.215,.35,.446,.526,.582],fi=20,pa=new Np,ll=new nt;let ma=null,ga=0,_a=0;const di=(1+Math.sqrt(5))/2,Wi=1/di,cl=[new Z(1,1,1),new Z(-1,1,1),new Z(1,1,-1),new Z(-1,1,-1),new Z(0,di,Wi),new Z(0,di,-Wi),new Z(Wi,0,di),new Z(-Wi,0,di),new Z(di,Wi,0),new Z(-di,Wi,0)];class hl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ma,ga,_a),e.scissorTest=!1,ir(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===os||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:bs,format:an,colorSpace:ei,depthBuffer:!1},i=dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fp(s)),this._blurMaterial=Op(s,e,t)}return i}_compileMaterial(e){const t=new mn(this._lodPlanes[0],e);this._renderer.compile(t,pa)}_sceneToCubeUV(e,t,n,i){const a=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(ll),h.toneMapping=$n,h.autoClear=!1;const f=new vr({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new mn(new Ls,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(ll),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,c[m],0),a.lookAt(o[m],0,0)):y===1?(a.up.set(0,0,c[m]),a.lookAt(0,o[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,o[m]));const x=this._cubeSize;ir(i,y*x,m>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===os||e.mapping===ls;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ul());const s=i?this._cubemapMaterial:this._equirectMaterial,l=new mn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;ir(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(l,pa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),l=cl[(i-1)%cl.length];this._blur(e,i-1,i,s,l)}t.autoClear=n}_blur(e,t,n,i,s){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,n,i,"latitudinal",s),this._halfBlur(l,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,l,a){const c=this._renderer,o=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new mn(this._lodPlanes[i],o),u=o.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*fi-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):fi;p>fi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${fi}`);const m=[];let y=0;for(let w=0;w<fi;++w){const R=w/_,I=Math.exp(-R*R/2);m.push(I),w===0?y+=I:w<p&&(y+=2*I)}for(let w=0;w<m.length;w++)m[w]=m[w]/y;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=l==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const M=this._sizeLods[i],b=3*M*(i>x-qi?i-x+qi:0),S=4*(this._cubeSize-M);ir(t,b,S,3*M,2*M),c.setRenderTarget(t),c.render(d,pa)}}function Fp(r){const e=[],t=[],n=[];let i=r;const s=r-qi+1+ol.length;for(let l=0;l<s;l++){const a=Math.pow(2,i);t.push(a);let c=1/a;l>r-qi?c=ol[l-r+qi-1]:l===0&&(c=0),n.push(c);const o=1/(a-2),h=-o,d=1+o,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*f),x=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let S=0;S<f;S++){const w=S%3*2/3-1,R=S>2?0:-1,I=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];y.set(I,_*g*S),x.set(u,p*g*S);const E=[S,S,S,S,S,S];M.set(E,m*g*S)}const b=new ti;b.setAttribute("position",new Qt(y,_)),b.setAttribute("uv",new Qt(x,p)),b.setAttribute("faceIndex",new Qt(M,m)),e.push(b),i>qi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function dl(r,e,t){const n=new Ti(r,e,t);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ir(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Op(r,e,t){const n=new Float32Array(fi),i=new Z(0,1,0);return new Ln({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function ul(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function fl(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ka(){return`

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
	`}function Bp(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,o=c===Ra||c===La,h=c===os||c===ls;if(o||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new hl(r)),d=o?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(o&&d&&d.height>0||h&&d&&i(d)){t===null&&(t=new hl(r));const u=o?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function i(a){let c=0;const o=6;for(let h=0;h<o;h++)a[h]!==void 0&&c++;return c===o}function s(a){const c=a.target;c.removeEventListener("dispose",s);const o=e.get(c);o!==void 0&&(e.delete(c),o.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:l}}function kp(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function zp(r,e,t,n){const i={},s=new WeakMap;function l(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}u.removeEventListener("dispose",l),delete i[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",l),i[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)e.update(u[g],r.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],r.ARRAY_BUFFER)}}function o(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,M=y.length;x<M;x+=3){const b=y[x+0],S=y[x+1],w=y[x+2];u.push(b,S,S,w,w,b)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,M=y.length/3-1;x<M;x+=3){const b=x+0,S=x+1,w=x+2;u.push(b,S,S,w,w,b)}}else return;const p=new(hc(u)?xc:_c)(u,1);p.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&o(d)}else o(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Gp(r,e,t,n){const i=n.isWebGL2;let s;function l(f){s=f}let a,c;function o(f){a=f.type,c=f.bytesPerElement}function h(f,g){r.drawElements(s,g,a,f*c),t.update(g,s,1)}function d(f,g,_){if(_===0)return;let p,m;if(i)p=r,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,g,a,f*c,_),t.update(g,s,_)}function u(f,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/c,g[m]);else{p.multiDrawElementsWEBGL(s,g,0,a,f,0,_);let m=0;for(let y=0;y<_;y++)m+=g[y];t.update(m,s,1)}}this.setMode=l,this.setIndex=o,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Vp(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,l,a){switch(t.calls++,l){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Hp(r,e){return r[0]-e[0]}function Wp(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Xp(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,l=new Ct,a=[];for(let o=0;o<8;o++)a[o]=[o,0];function c(o,h,d){const u=o.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==_){let B=function(){A.dispose(),s.delete(h),h.removeEventListener("dispose",B)};var f=B;p!==void 0&&p.texture.dispose();const m=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,M=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],S=h.morphAttributes.color||[];let w=0;m===!0&&(w=1),y===!0&&(w=2),x===!0&&(w=3);let R=h.attributes.position.count*w,I=1;R>e.maxTextureSize&&(I=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const E=new Float32Array(R*I*4*_),A=new pc(E,R,I,_);A.type=wn,A.needsUpdate=!0;const H=w*4;for(let C=0;C<_;C++){const D=M[C],U=b[C],G=S[C],V=R*I*4*C;for(let W=0;W<D.count;W++){const J=W*H;m===!0&&(l.fromBufferAttribute(D,W),E[V+J+0]=l.x,E[V+J+1]=l.y,E[V+J+2]=l.z,E[V+J+3]=0),y===!0&&(l.fromBufferAttribute(U,W),E[V+J+4]=l.x,E[V+J+5]=l.y,E[V+J+6]=l.z,E[V+J+7]=0),x===!0&&(l.fromBufferAttribute(G,W),E[V+J+8]=l.x,E[V+J+9]=l.y,E[V+J+10]=l.z,E[V+J+11]=G.itemSize===4?l.w:1)}}p={count:_,texture:A,size:new Qe(R,I)},s.set(h,p),h.addEventListener("dispose",B)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)d.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let m=0;for(let x=0;x<u.length;x++)m+=u[x];const y=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(r,"morphTargetBaseInfluence",y),d.getUniforms().setValue(r,"morphTargetInfluences",u)}d.getUniforms().setValue(r,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const g=u===void 0?0:u.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[h.id]=_}for(let M=0;M<g;M++){const b=_[M];b[0]=M,b[1]=u[M]}_.sort(Wp);for(let M=0;M<8;M++)M<g&&_[M][1]?(a[M][0]=_[M][0],a[M][1]=_[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(Hp);const p=h.morphAttributes.position,m=h.morphAttributes.normal;let y=0;for(let M=0;M<8;M++){const b=a[M],S=b[0],w=b[1];S!==Number.MAX_SAFE_INTEGER&&w?(p&&h.getAttribute("morphTarget"+M)!==p[S]&&h.setAttribute("morphTarget"+M,p[S]),m&&h.getAttribute("morphNormal"+M)!==m[S]&&h.setAttribute("morphNormal"+M,m[S]),i[M]=w,y+=w):(p&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),m&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),i[M]=0)}const x=h.morphTargetsRelative?1:1-y;d.getUniforms().setValue(r,"morphTargetBaseInfluence",x),d.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:c}}function Yp(r,e,t,n){let i=new WeakMap;function s(c){const o=n.render.frame,h=c.geometry,d=e.get(c,h);if(i.get(d)!==o&&(e.update(d),i.set(d,o)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==o&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,o))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==o&&(u.update(),i.set(u,o))}return d}function l(){i=new WeakMap}function a(c){const o=c.target;o.removeEventListener("dispose",a),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:s,dispose:l}}class wc extends en{constructor(e,t,n,i,s,l,a,c,o,h){if(h=h!==void 0?h:yi,h!==yi&&h!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===yi&&(n=Yn),n===void 0&&h===cs&&(n=Si),super(null,i,s,l,a,c,h,n,o),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:xt,this.minFilter=c!==void 0?c:xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const bc=new en,Tc=new wc(1,1);Tc.compareFunction=lc;const Ac=new pc,Cc=new bd,Rc=new Sc,pl=[],ml=[],gl=new Float32Array(16),_l=new Float32Array(9),xl=new Float32Array(4);function fs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=pl[i];if(s===void 0&&(s=new Float32Array(i),pl[i]=s),e!==0){n.toArray(s,0);for(let l=1,a=0;l!==e;++l)a+=t,r[l].toArray(s,a)}return s}function Mt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function St(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Dr(r,e){let t=ml[e];t===void 0&&(t=new Int32Array(e),ml[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function qp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Zp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2fv(this.addr,e),St(t,e)}}function $p(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;r.uniform3fv(this.addr,e),St(t,e)}}function jp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4fv(this.addr,e),St(t,e)}}function Kp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;xl.set(n),r.uniformMatrix2fv(this.addr,!1,xl),St(t,n)}}function Jp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;_l.set(n),r.uniformMatrix3fv(this.addr,!1,_l),St(t,n)}}function Qp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;gl.set(n),r.uniformMatrix4fv(this.addr,!1,gl),St(t,n)}}function em(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function tm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2iv(this.addr,e),St(t,e)}}function nm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3iv(this.addr,e),St(t,e)}}function im(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4iv(this.addr,e),St(t,e)}}function sm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function rm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2uiv(this.addr,e),St(t,e)}}function am(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3uiv(this.addr,e),St(t,e)}}function om(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4uiv(this.addr,e),St(t,e)}}function lm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?Tc:bc;t.setTexture2D(e||s,i)}function cm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Cc,i)}function hm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Rc,i)}function dm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ac,i)}function um(r){switch(r){case 5126:return qp;case 35664:return Zp;case 35665:return $p;case 35666:return jp;case 35674:return Kp;case 35675:return Jp;case 35676:return Qp;case 5124:case 35670:return em;case 35667:case 35671:return tm;case 35668:case 35672:return nm;case 35669:case 35673:return im;case 5125:return sm;case 36294:return rm;case 36295:return am;case 36296:return om;case 35678:case 36198:case 36298:case 36306:case 35682:return lm;case 35679:case 36299:case 36307:return cm;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return dm}}function fm(r,e){r.uniform1fv(this.addr,e)}function pm(r,e){const t=fs(e,this.size,2);r.uniform2fv(this.addr,t)}function mm(r,e){const t=fs(e,this.size,3);r.uniform3fv(this.addr,t)}function gm(r,e){const t=fs(e,this.size,4);r.uniform4fv(this.addr,t)}function _m(r,e){const t=fs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function xm(r,e){const t=fs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function vm(r,e){const t=fs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Mm(r,e){r.uniform1iv(this.addr,e)}function Sm(r,e){r.uniform2iv(this.addr,e)}function ym(r,e){r.uniform3iv(this.addr,e)}function Em(r,e){r.uniform4iv(this.addr,e)}function wm(r,e){r.uniform1uiv(this.addr,e)}function bm(r,e){r.uniform2uiv(this.addr,e)}function Tm(r,e){r.uniform3uiv(this.addr,e)}function Am(r,e){r.uniform4uiv(this.addr,e)}function Cm(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let l=0;l!==i;++l)t.setTexture2D(e[l]||bc,s[l])}function Rm(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let l=0;l!==i;++l)t.setTexture3D(e[l]||Cc,s[l])}function Lm(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let l=0;l!==i;++l)t.setTextureCube(e[l]||Rc,s[l])}function Pm(r,e,t){const n=this.cache,i=e.length,s=Dr(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let l=0;l!==i;++l)t.setTexture2DArray(e[l]||Ac,s[l])}function Im(r){switch(r){case 5126:return fm;case 35664:return pm;case 35665:return mm;case 35666:return gm;case 35674:return _m;case 35675:return xm;case 35676:return vm;case 5124:case 35670:return Mm;case 35667:case 35671:return Sm;case 35668:case 35672:return ym;case 35669:case 35673:return Em;case 5125:return wm;case 36294:return bm;case 36295:return Tm;case 36296:return Am;case 35678:case 36198:case 36298:case 36306:case 35682:return Cm;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Lm;case 36289:case 36303:case 36311:case 36292:return Pm}}class Dm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=um(t.type)}}class Um{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Im(t.type)}}class Nm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,l=i.length;s!==l;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function vl(r,e){r.seq.push(e),r.map[e.id]=e}function Fm(r,e,t){const n=r.name,i=n.length;for(xa.lastIndex=0;;){const s=xa.exec(n),l=xa.lastIndex;let a=s[1];const c=s[2]==="]",o=s[3];if(c&&(a=a|0),o===void 0||o==="["&&l+2===i){vl(t,o===void 0?new Dm(a,r,e):new Um(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new Nm(a),vl(t,d)),t=d}}}class cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),l=e.getUniformLocation(t,s.name);Fm(s,l,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,l=t.length;s!==l;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const l=e[i];l.id in t&&n.push(l)}return n}}function Ml(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Om=37297;let Bm=0;function km(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let l=i;l<s;l++){const a=l+1;n.push(`${a===e?">":" "} ${a}: ${t[l]}`)}return n.join(`
`)}function zm(r){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(r);let n;switch(e===t?n="":e===gr&&t===mr?n="LinearDisplayP3ToLinearSRGB":e===mr&&t===gr&&(n="LinearSRGBToLinearDisplayP3"),r){case ei:case Pr:return[n,"LinearTransferOETF"];case hn:case $a:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Sl(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const l=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+km(r.getShaderSource(e),l)}else return i}function Gm(r,e){const t=zm(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Vm(r,e){let t;switch(e){case Hh:t="Linear";break;case Wh:t="Reinhard";break;case Xh:t="OptimizedCineon";break;case Yh:t="ACESFilmic";break;case Zh:t="AgX";break;case $h:t="Neutral";break;case qh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Hm(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.alphaToCoverage||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zi).join(`
`)}function Wm(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function Xm(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ym(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),l=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[l]={type:s.type,location:r.getAttribLocation(e,l),locationSize:a}}return t}function Zi(r){return r!==""}function yl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function El(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Na(r){return r.replace(qm,$m)}const Zm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function $m(r,e){let t=He[e];if(t===void 0){const n=Zm.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Na(t)}const jm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wl(r){return r.replace(jm,Km)}function Km(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function bl(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Jm(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Kl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Sh?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function Qm(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case os:case ls:e="ENVMAP_TYPE_CUBE";break;case Lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function eg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ls:e="ENVMAP_MODE_REFRACTION";break}return e}function tg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ql:e="ENVMAP_BLENDING_MULTIPLY";break;case Gh:e="ENVMAP_BLENDING_MIX";break;case Vh:e="ENVMAP_BLENDING_ADD";break}return e}function ng(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ig(r,e,t,n){const i=r.getContext(),s=t.defines;let l=t.vertexShader,a=t.fragmentShader;const c=Jm(t),o=Qm(t),h=eg(t),d=tg(t),u=ng(t),f=t.isWebGL2?"":Hm(t),g=Wm(t),_=Xm(s),p=i.createProgram();let m,y,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Zi).join(`
`),m.length>0&&(m+=`
`),y=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Zi).join(`
`),y.length>0&&(y+=`
`)):(m=[bl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),y=[f,bl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+o:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?He.tonemapping_pars_fragment:"",t.toneMapping!==$n?Vm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Gm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),l=Na(l),l=yl(l,t),l=El(l,t),a=Na(a),a=yl(a,t),a=El(a,t),l=wl(l),a=wl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const M=x+m+l,b=x+y+a,S=Ml(i,i.VERTEX_SHADER,M),w=Ml(i,i.FRAGMENT_SHADER,b);i.attachShader(p,S),i.attachShader(p,w),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function R(H){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(p).trim(),C=i.getShaderInfoLog(S).trim(),D=i.getShaderInfoLog(w).trim();let U=!0,G=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(U=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,p,S,w);else{const V=Sl(i,S,"vertex"),W=Sl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+B+`
`+V+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(C===""||D==="")&&(G=!1);G&&(H.diagnostics={runnable:U,programLog:B,vertexShader:{log:C,prefix:m},fragmentShader:{log:D,prefix:y}})}i.deleteShader(S),i.deleteShader(w),I=new cr(i,p),E=Ym(i,p)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(p,Om)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bm++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=w,this}let sg=0;class rg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ag(e),t.set(e,n)),n}}class ag{constructor(e){this.id=sg++,this.code=e,this.usedTimes=0}}function og(r,e,t,n,i,s,l){const a=new mc,c=new rg,o=new Set,h=[],d=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(E){return o.add(E),E===0?"uv":`uv${E}`}function m(E,A,H,B,C){const D=B.fog,U=C.geometry,G=E.isMeshStandardMaterial?B.environment:null,V=(E.isMeshStandardMaterial?t:e).get(E.envMap||G),W=V&&V.mapping===Lr?V.image.height:null,J=_[E.type];E.precision!==null&&(g=i.getMaxPrecision(E.precision),g!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",g,"instead."));const te=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,re=te!==void 0?te.length:0;let ne=0;U.morphAttributes.position!==void 0&&(ne=1),U.morphAttributes.normal!==void 0&&(ne=2),U.morphAttributes.color!==void 0&&(ne=3);let O,j,ue,Se;if(J){const it=dn[J];O=it.vertexShader,j=it.fragmentShader}else O=E.vertexShader,j=E.fragmentShader,c.update(E),ue=c.getVertexShaderID(E),Se=c.getFragmentShaderID(E);const me=r.getRenderTarget(),fe=C.isInstancedMesh===!0,Le=C.isBatchedMesh===!0,Te=!!E.map,k=!!E.matcap,ft=!!V,Ee=!!E.aoMap,Ue=!!E.lightMap,Ce=!!E.bumpMap,Ye=!!E.normalMap,De=!!E.displacementMap,Fe=!!E.emissiveMap,ot=!!E.metalnessMap,P=!!E.roughnessMap,T=E.anisotropy>0,K=E.clearcoat>0,Q=E.iridescence>0,ae=E.sheen>0,ie=E.transmission>0,ze=T&&!!E.anisotropyMap,Pe=K&&!!E.clearcoatMap,de=K&&!!E.clearcoatNormalMap,xe=K&&!!E.clearcoatRoughnessMap,Ge=Q&&!!E.iridescenceMap,oe=Q&&!!E.iridescenceThicknessMap,pt=ae&&!!E.sheenColorMap,qe=ae&&!!E.sheenRoughnessMap,Ae=!!E.specularMap,ye=!!E.specularColorMap,we=!!E.specularIntensityMap,Ke=ie&&!!E.transmissionMap,Oe=ie&&!!E.thicknessMap,lt=!!E.gradientMap,F=!!E.alphaMap,_e=E.alphaTest>0,Y=!!E.alphaHash,ce=!!E.extensions;let ve=$n;E.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(ve=r.toneMapping);const Ze={isWebGL2:d,shaderID:J,shaderType:E.type,shaderName:E.name,vertexShader:O,fragmentShader:j,defines:E.defines,customVertexShaderID:ue,customFragmentShaderID:Se,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:g,batching:Le,instancing:fe,instancingColor:fe&&C.instanceColor!==null,instancingMorph:fe&&C.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ei,alphaToCoverage:!!E.alphaToCoverage,map:Te,matcap:k,envMap:ft,envMapMode:ft&&V.mapping,envMapCubeUVHeight:W,aoMap:Ee,lightMap:Ue,bumpMap:Ce,normalMap:Ye,displacementMap:f&&De,emissiveMap:Fe,normalMapObjectSpace:Ye&&E.normalMapType===dd,normalMapTangentSpace:Ye&&E.normalMapType===hd,metalnessMap:ot,roughnessMap:P,anisotropy:T,anisotropyMap:ze,clearcoat:K,clearcoatMap:Pe,clearcoatNormalMap:de,clearcoatRoughnessMap:xe,iridescence:Q,iridescenceMap:Ge,iridescenceThicknessMap:oe,sheen:ae,sheenColorMap:pt,sheenRoughnessMap:qe,specularMap:Ae,specularColorMap:ye,specularIntensityMap:we,transmission:ie,transmissionMap:Ke,thicknessMap:Oe,gradientMap:lt,opaque:E.transparent===!1&&E.blending===An&&E.alphaToCoverage===!1,alphaMap:F,alphaTest:_e,alphaHash:Y,combine:E.combine,mapUv:Te&&p(E.map.channel),aoMapUv:Ee&&p(E.aoMap.channel),lightMapUv:Ue&&p(E.lightMap.channel),bumpMapUv:Ce&&p(E.bumpMap.channel),normalMapUv:Ye&&p(E.normalMap.channel),displacementMapUv:De&&p(E.displacementMap.channel),emissiveMapUv:Fe&&p(E.emissiveMap.channel),metalnessMapUv:ot&&p(E.metalnessMap.channel),roughnessMapUv:P&&p(E.roughnessMap.channel),anisotropyMapUv:ze&&p(E.anisotropyMap.channel),clearcoatMapUv:Pe&&p(E.clearcoatMap.channel),clearcoatNormalMapUv:de&&p(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&p(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&p(E.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&p(E.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&p(E.sheenColorMap.channel),sheenRoughnessMapUv:qe&&p(E.sheenRoughnessMap.channel),specularMapUv:Ae&&p(E.specularMap.channel),specularColorMapUv:ye&&p(E.specularColorMap.channel),specularIntensityMapUv:we&&p(E.specularIntensityMap.channel),transmissionMapUv:Ke&&p(E.transmissionMap.channel),thicknessMapUv:Oe&&p(E.thicknessMap.channel),alphaMapUv:F&&p(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ye||T),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!U.attributes.uv&&(Te||F),fog:!!D,useFog:E.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:C.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ne,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:ve,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Te&&E.map.isVideoTexture===!0&&tt.getTransfer(E.map.colorSpace)===rt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===un,flipSided:E.side===zt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ce&&E.extensions.derivatives===!0,extensionFragDepth:ce&&E.extensions.fragDepth===!0,extensionDrawBuffers:ce&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ce&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ze.vertexUv1s=o.has(1),Ze.vertexUv2s=o.has(2),Ze.vertexUv3s=o.has(3),o.clear(),Ze}function y(E){const A=[];if(E.shaderID?A.push(E.shaderID):(A.push(E.customVertexShaderID),A.push(E.customFragmentShaderID)),E.defines!==void 0)for(const H in E.defines)A.push(H),A.push(E.defines[H]);return E.isRawShaderMaterial===!1&&(x(A,E),M(A,E),A.push(r.outputColorSpace)),A.push(E.customProgramCacheKey),A.join()}function x(E,A){E.push(A.precision),E.push(A.outputColorSpace),E.push(A.envMapMode),E.push(A.envMapCubeUVHeight),E.push(A.mapUv),E.push(A.alphaMapUv),E.push(A.lightMapUv),E.push(A.aoMapUv),E.push(A.bumpMapUv),E.push(A.normalMapUv),E.push(A.displacementMapUv),E.push(A.emissiveMapUv),E.push(A.metalnessMapUv),E.push(A.roughnessMapUv),E.push(A.anisotropyMapUv),E.push(A.clearcoatMapUv),E.push(A.clearcoatNormalMapUv),E.push(A.clearcoatRoughnessMapUv),E.push(A.iridescenceMapUv),E.push(A.iridescenceThicknessMapUv),E.push(A.sheenColorMapUv),E.push(A.sheenRoughnessMapUv),E.push(A.specularMapUv),E.push(A.specularColorMapUv),E.push(A.specularIntensityMapUv),E.push(A.transmissionMapUv),E.push(A.thicknessMapUv),E.push(A.combine),E.push(A.fogExp2),E.push(A.sizeAttenuation),E.push(A.morphTargetsCount),E.push(A.morphAttributeCount),E.push(A.numDirLights),E.push(A.numPointLights),E.push(A.numSpotLights),E.push(A.numSpotLightMaps),E.push(A.numHemiLights),E.push(A.numRectAreaLights),E.push(A.numDirLightShadows),E.push(A.numPointLightShadows),E.push(A.numSpotLightShadows),E.push(A.numSpotLightShadowsWithMaps),E.push(A.numLightProbes),E.push(A.shadowMapType),E.push(A.toneMapping),E.push(A.numClippingPlanes),E.push(A.numClipIntersection),E.push(A.depthPacking)}function M(E,A){a.disableAll(),A.isWebGL2&&a.enable(0),A.supportsVertexTextures&&a.enable(1),A.instancing&&a.enable(2),A.instancingColor&&a.enable(3),A.instancingMorph&&a.enable(4),A.matcap&&a.enable(5),A.envMap&&a.enable(6),A.normalMapObjectSpace&&a.enable(7),A.normalMapTangentSpace&&a.enable(8),A.clearcoat&&a.enable(9),A.iridescence&&a.enable(10),A.alphaTest&&a.enable(11),A.vertexColors&&a.enable(12),A.vertexAlphas&&a.enable(13),A.vertexUv1s&&a.enable(14),A.vertexUv2s&&a.enable(15),A.vertexUv3s&&a.enable(16),A.vertexTangents&&a.enable(17),A.anisotropy&&a.enable(18),A.alphaHash&&a.enable(19),A.batching&&a.enable(20),E.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.skinning&&a.enable(4),A.morphTargets&&a.enable(5),A.morphNormals&&a.enable(6),A.morphColors&&a.enable(7),A.premultipliedAlpha&&a.enable(8),A.shadowMapEnabled&&a.enable(9),A.useLegacyLights&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.alphaToCoverage&&a.enable(20),E.push(a.mask)}function b(E){const A=_[E.type];let H;if(A){const B=dn[A];H=kd.clone(B.uniforms)}else H=E.uniforms;return H}function S(E,A){let H;for(let B=0,C=h.length;B<C;B++){const D=h[B];if(D.cacheKey===A){H=D,++H.usedTimes;break}}return H===void 0&&(H=new ig(r,A,E,s),h.push(H)),H}function w(E){if(--E.usedTimes===0){const A=h.indexOf(E);h[A]=h[h.length-1],h.pop(),E.destroy()}}function R(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:b,acquireProgram:S,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:I}}function lg(){let r=new WeakMap;function e(s){let l=r.get(s);return l===void 0&&(l={},r.set(s,l)),l}function t(s){r.delete(s)}function n(s,l,a){r.get(s)[l]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function cg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Tl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Al(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function l(d,u,f,g,_,p){let m=r[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},r[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=_,m.group=p),e++,m}function a(d,u,f,g,_,p){const m=l(d,u,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function c(d,u,f,g,_,p){const m=l(d,u,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function o(d,u){t.length>1&&t.sort(d||cg),n.length>1&&n.sort(u||Tl),i.length>1&&i.sort(u||Tl)}function h(){for(let d=e,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:o}}function hg(){let r=new WeakMap;function e(n,i){const s=r.get(n);let l;return s===void 0?(l=new Al,r.set(n,[l])):i>=s.length?(l=new Al,s.push(l)):l=s[i],l}function t(){r=new WeakMap}return{get:e,dispose:t}}function dg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new nt};break;case"SpotLight":t={position:new Z,direction:new Z,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return r[e.id]=t,t}}}function ug(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let fg=0;function pg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function mg(r,e){const t=new dg,n=ug(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new Z);const s=new Z,l=new vt,a=new vt;function c(h,d){let u=0,f=0,g=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let _=0,p=0,m=0,y=0,x=0,M=0,b=0,S=0,w=0,R=0,I=0;h.sort(pg);const E=d===!0?Math.PI:1;for(let H=0,B=h.length;H<B;H++){const C=h[H],D=C.color,U=C.intensity,G=C.distance,V=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=D.r*U*E,f+=D.g*U*E,g+=D.b*U*E;else if(C.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(C.sh.coefficients[W],U);I++}else if(C.isDirectionalLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity*E),C.castShadow){const J=C.shadow,te=n.get(C);te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,i.directionalShadow[_]=te,i.directionalShadowMap[_]=V,i.directionalShadowMatrix[_]=C.shadow.matrix,M++}i.directional[_]=W,_++}else if(C.isSpotLight){const W=t.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(D).multiplyScalar(U*E),W.distance=G,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,i.spot[m]=W;const J=C.shadow;if(C.map&&(i.spotLightMap[w]=C.map,w++,J.updateMatrices(C),C.castShadow&&R++),i.spotLightMatrix[m]=J.matrix,C.castShadow){const te=n.get(C);te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,i.spotShadow[m]=te,i.spotShadowMap[m]=V,S++}m++}else if(C.isRectAreaLight){const W=t.get(C);W.color.copy(D).multiplyScalar(U),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),i.rectArea[y]=W,y++}else if(C.isPointLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity*E),W.distance=C.distance,W.decay=C.decay,C.castShadow){const J=C.shadow,te=n.get(C);te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,te.shadowCameraNear=J.camera.near,te.shadowCameraFar=J.camera.far,i.pointShadow[p]=te,i.pointShadowMap[p]=V,i.pointShadowMatrix[p]=C.shadow.matrix,b++}i.point[p]=W,p++}else if(C.isHemisphereLight){const W=t.get(C);W.skyColor.copy(C.color).multiplyScalar(U*E),W.groundColor.copy(C.groundColor).multiplyScalar(U*E),i.hemi[x]=W,x++}}y>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=g;const A=i.hash;(A.directionalLength!==_||A.pointLength!==p||A.spotLength!==m||A.rectAreaLength!==y||A.hemiLength!==x||A.numDirectionalShadows!==M||A.numPointShadows!==b||A.numSpotShadows!==S||A.numSpotMaps!==w||A.numLightProbes!==I)&&(i.directional.length=_,i.spot.length=m,i.rectArea.length=y,i.point.length=p,i.hemi.length=x,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+w-R,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=I,A.directionalLength=_,A.pointLength=p,A.spotLength=m,A.rectAreaLength=y,A.hemiLength=x,A.numDirectionalShadows=M,A.numPointShadows=b,A.numSpotShadows=S,A.numSpotMaps=w,A.numLightProbes=I,i.version=fg++)}function o(h,d){let u=0,f=0,g=0,_=0,p=0;const m=d.matrixWorldInverse;for(let y=0,x=h.length;y<x;y++){const M=h[y];if(M.isDirectionalLight){const b=i.directional[u];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),u++}else if(M.isSpotLight){const b=i.spot[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const b=i.rectArea[_];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),a.identity(),l.copy(M.matrixWorld),l.premultiply(m),a.extractRotation(l),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const b=i.hemi[p];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),p++}}}return{setup:c,setupView:o,state:i}}function Cl(r,e){const t=new mg(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function l(d){n.push(d)}function a(d){i.push(d)}function c(d){t.setup(n,d)}function o(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:o,pushLight:l,pushShadow:a}}function gg(r,e){let t=new WeakMap;function n(s,l=0){const a=t.get(s);let c;return a===void 0?(c=new Cl(r,e),t.set(s,[c])):l>=a.length?(c=new Cl(r,e),a.push(c)):c=a[l],c}function i(){t=new WeakMap}return{get:n,dispose:i}}class _g extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class xg extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mg=`uniform sampler2D shadow_pass;
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
}`;function Sg(r,e,t){let n=new yc;const i=new Qe,s=new Qe,l=new Ct,a=new _g({depthPacking:cd}),c=new xg,o={},h=t.maxTextureSize,d={[Qn]:zt,[zt]:Qn,[un]:un},u=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:vg,fragmentShader:Mg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new ti;g.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new mn(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kl;let m=this.type;this.render=function(S,w,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;const I=r.getRenderTarget(),E=r.getActiveCubeFace(),A=r.getActiveMipmapLevel(),H=r.state;H.setBlending(Zn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const B=m!==En&&this.type===En,C=m===En&&this.type!==En;for(let D=0,U=S.length;D<U;D++){const G=S[D],V=G.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const W=V.getFrameExtents();if(i.multiply(W),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/W.x),i.x=s.x*W.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/W.y),i.y=s.y*W.y,V.mapSize.y=s.y)),V.map===null||B===!0||C===!0){const te=this.type!==En?{minFilter:xt,magFilter:xt}:{};V.map!==null&&V.map.dispose(),V.map=new Ti(i.x,i.y,te),V.map.texture.name=G.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const J=V.getViewportCount();for(let te=0;te<J;te++){const re=V.getViewport(te);l.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),H.viewport(l),V.updateMatrices(G,te),n=V.getFrustum(),M(w,R,V.camera,G,this.type)}V.isPointLightShadow!==!0&&this.type===En&&y(V,R),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(I,E,A)};function y(S,w){const R=e.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ti(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(w,null,R,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(w,null,R,f,_,null)}function x(S,w,R,I){let E=null;const A=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(A!==void 0)E=A;else if(E=R.isPointLight===!0?c:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=E.uuid,B=w.uuid;let C=o[H];C===void 0&&(C={},o[H]=C);let D=C[B];D===void 0&&(D=E.clone(),C[B]=D,w.addEventListener("dispose",b)),E=D}if(E.visible=w.visible,E.wireframe=w.wireframe,I===En?E.side=w.shadowSide!==null?w.shadowSide:w.side:E.side=w.shadowSide!==null?w.shadowSide:d[w.side],E.alphaMap=w.alphaMap,E.alphaTest=w.alphaTest,E.map=w.map,E.clipShadows=w.clipShadows,E.clippingPlanes=w.clippingPlanes,E.clipIntersection=w.clipIntersection,E.displacementMap=w.displacementMap,E.displacementScale=w.displacementScale,E.displacementBias=w.displacementBias,E.wireframeLinewidth=w.wireframeLinewidth,E.linewidth=w.linewidth,R.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const H=r.properties.get(E);H.light=R}return E}function M(S,w,R,I,E){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&E===En)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const B=e.update(S),C=S.material;if(Array.isArray(C)){const D=B.groups;for(let U=0,G=D.length;U<G;U++){const V=D[U],W=C[V.materialIndex];if(W&&W.visible){const J=x(S,W,I,E);S.onBeforeShadow(r,S,w,R,B,J,V),r.renderBufferDirect(R,null,B,J,S,V),S.onAfterShadow(r,S,w,R,B,J,V)}}}else if(C.visible){const D=x(S,C,I,E);S.onBeforeShadow(r,S,w,R,B,D,null),r.renderBufferDirect(R,null,B,D,S,null),S.onAfterShadow(r,S,w,R,B,D,null)}}const H=S.children;for(let B=0,C=H.length;B<C;B++)M(H[B],w,R,I,E)}function b(S){S.target.removeEventListener("dispose",b);for(const R in o){const I=o[R],E=S.target.uuid;E in I&&(I[E].dispose(),delete I[E])}}}function yg(r,e,t){const n=t.isWebGL2;function i(){let F=!1;const _e=new Ct;let Y=null;const ce=new Ct(0,0,0,0);return{setMask:function(ve){Y!==ve&&!F&&(r.colorMask(ve,ve,ve,ve),Y=ve)},setLocked:function(ve){F=ve},setClear:function(ve,Ze,it,Tt,qt){qt===!0&&(ve*=Tt,Ze*=Tt,it*=Tt),_e.set(ve,Ze,it,Tt),ce.equals(_e)===!1&&(r.clearColor(ve,Ze,it,Tt),ce.copy(_e))},reset:function(){F=!1,Y=null,ce.set(-1,0,0,0)}}}function s(){let F=!1,_e=null,Y=null,ce=null;return{setTest:function(ve){ve?fe(r.DEPTH_TEST):Le(r.DEPTH_TEST)},setMask:function(ve){_e!==ve&&!F&&(r.depthMask(ve),_e=ve)},setFunc:function(ve){if(Y!==ve){switch(ve){case Uh:r.depthFunc(r.NEVER);break;case Nh:r.depthFunc(r.ALWAYS);break;case Fh:r.depthFunc(r.LESS);break;case dr:r.depthFunc(r.LEQUAL);break;case Oh:r.depthFunc(r.EQUAL);break;case Bh:r.depthFunc(r.GEQUAL);break;case kh:r.depthFunc(r.GREATER);break;case zh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Y=ve}},setLocked:function(ve){F=ve},setClear:function(ve){ce!==ve&&(r.clearDepth(ve),ce=ve)},reset:function(){F=!1,_e=null,Y=null,ce=null}}}function l(){let F=!1,_e=null,Y=null,ce=null,ve=null,Ze=null,it=null,Tt=null,qt=null;return{setTest:function(st){F||(st?fe(r.STENCIL_TEST):Le(r.STENCIL_TEST))},setMask:function(st){_e!==st&&!F&&(r.stencilMask(st),_e=st)},setFunc:function(st,Dt,cn){(Y!==st||ce!==Dt||ve!==cn)&&(r.stencilFunc(st,Dt,cn),Y=st,ce=Dt,ve=cn)},setOp:function(st,Dt,cn){(Ze!==st||it!==Dt||Tt!==cn)&&(r.stencilOp(st,Dt,cn),Ze=st,it=Dt,Tt=cn)},setLocked:function(st){F=st},setClear:function(st){qt!==st&&(r.clearStencil(st),qt=st)},reset:function(){F=!1,_e=null,Y=null,ce=null,ve=null,Ze=null,it=null,Tt=null,qt=null}}}const a=new i,c=new s,o=new l,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,_=[],p=null,m=!1,y=null,x=null,M=null,b=null,S=null,w=null,R=null,I=new nt(0,0,0),E=0,A=!1,H=null,B=null,C=null,D=null,U=null;const G=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,W=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(J)[1]),V=W>=1):J.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),V=W>=2);let te=null,re={};const ne=r.getParameter(r.SCISSOR_BOX),O=r.getParameter(r.VIEWPORT),j=new Ct().fromArray(ne),ue=new Ct().fromArray(O);function Se(F,_e,Y,ce){const ve=new Uint8Array(4),Ze=r.createTexture();r.bindTexture(F,Ze),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let it=0;it<Y;it++)n&&(F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY)?r.texImage3D(_e,0,r.RGBA,1,1,ce,0,r.RGBA,r.UNSIGNED_BYTE,ve):r.texImage2D(_e+it,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ve);return Ze}const me={};me[r.TEXTURE_2D]=Se(r.TEXTURE_2D,r.TEXTURE_2D,1),me[r.TEXTURE_CUBE_MAP]=Se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(me[r.TEXTURE_2D_ARRAY]=Se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),me[r.TEXTURE_3D]=Se(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),o.setClear(0),fe(r.DEPTH_TEST),c.setFunc(dr),De(!1),Fe(lo),fe(r.CULL_FACE),Ce(Zn);function fe(F){u[F]!==!0&&(r.enable(F),u[F]=!0)}function Le(F){u[F]!==!1&&(r.disable(F),u[F]=!1)}function Te(F,_e){return f[F]!==_e?(r.bindFramebuffer(F,_e),f[F]=_e,n&&(F===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=_e),F===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=_e)),!0):!1}function k(F,_e){let Y=_,ce=!1;if(F){Y=g.get(_e),Y===void 0&&(Y=[],g.set(_e,Y));const ve=F.textures;if(Y.length!==ve.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let Ze=0,it=ve.length;Ze<it;Ze++)Y[Ze]=r.COLOR_ATTACHMENT0+Ze;Y.length=ve.length,ce=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,ce=!0);if(ce)if(t.isWebGL2)r.drawBuffers(Y);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Y);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function ft(F){return p!==F?(r.useProgram(F),p=F,!0):!1}const Ee={[ui]:r.FUNC_ADD,[yh]:r.FUNC_SUBTRACT,[Eh]:r.FUNC_REVERSE_SUBTRACT};if(n)Ee[uo]=r.MIN,Ee[fo]=r.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(Ee[uo]=F.MIN_EXT,Ee[fo]=F.MAX_EXT)}const Ue={[wh]:r.ZERO,[or]:r.ONE,[bh]:r.SRC_COLOR,[Ca]:r.SRC_ALPHA,[Rh]:r.SRC_ALPHA_SATURATE,[Jl]:r.DST_COLOR,[Th]:r.DST_ALPHA,[Aa]:r.ONE_MINUS_SRC_COLOR,[ws]:r.ONE_MINUS_SRC_ALPHA,[Ch]:r.ONE_MINUS_DST_COLOR,[Ah]:r.ONE_MINUS_DST_ALPHA,[Lh]:r.CONSTANT_COLOR,[Ph]:r.ONE_MINUS_CONSTANT_COLOR,[Ih]:r.CONSTANT_ALPHA,[Dh]:r.ONE_MINUS_CONSTANT_ALPHA};function Ce(F,_e,Y,ce,ve,Ze,it,Tt,qt,st){if(F===Zn){m===!0&&(Le(r.BLEND),m=!1);return}if(m===!1&&(fe(r.BLEND),m=!0),F!==Ta){if(F!==y||st!==A){if((x!==ui||S!==ui)&&(r.blendEquation(r.FUNC_ADD),x=ui,S=ui),st)switch(F){case An:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ba:r.blendFunc(r.ONE,r.ONE);break;case co:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ho:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case An:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ba:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case co:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ho:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}M=null,b=null,w=null,R=null,I.set(0,0,0),E=0,y=F,A=st}return}ve=ve||_e,Ze=Ze||Y,it=it||ce,(_e!==x||ve!==S)&&(r.blendEquationSeparate(Ee[_e],Ee[ve]),x=_e,S=ve),(Y!==M||ce!==b||Ze!==w||it!==R)&&(r.blendFuncSeparate(Ue[Y],Ue[ce],Ue[Ze],Ue[it]),M=Y,b=ce,w=Ze,R=it),(Tt.equals(I)===!1||qt!==E)&&(r.blendColor(Tt.r,Tt.g,Tt.b,qt),I.copy(Tt),E=qt),y=F,A=!1}function Ye(F,_e){F.side===un?Le(r.CULL_FACE):fe(r.CULL_FACE);let Y=F.side===zt;_e&&(Y=!Y),De(Y),F.blending===An&&F.transparent===!1?Ce(Zn):Ce(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),c.setFunc(F.depthFunc),c.setTest(F.depthTest),c.setMask(F.depthWrite),a.setMask(F.colorWrite);const ce=F.stencilWrite;o.setTest(ce),ce&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),P(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?fe(r.SAMPLE_ALPHA_TO_COVERAGE):Le(r.SAMPLE_ALPHA_TO_COVERAGE)}function De(F){H!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),H=F)}function Fe(F){F!==vh?(fe(r.CULL_FACE),F!==B&&(F===lo?r.cullFace(r.BACK):F===Mh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Le(r.CULL_FACE),B=F}function ot(F){F!==C&&(V&&r.lineWidth(F),C=F)}function P(F,_e,Y){F?(fe(r.POLYGON_OFFSET_FILL),(D!==_e||U!==Y)&&(r.polygonOffset(_e,Y),D=_e,U=Y)):Le(r.POLYGON_OFFSET_FILL)}function T(F){F?fe(r.SCISSOR_TEST):Le(r.SCISSOR_TEST)}function K(F){F===void 0&&(F=r.TEXTURE0+G-1),te!==F&&(r.activeTexture(F),te=F)}function Q(F,_e,Y){Y===void 0&&(te===null?Y=r.TEXTURE0+G-1:Y=te);let ce=re[Y];ce===void 0&&(ce={type:void 0,texture:void 0},re[Y]=ce),(ce.type!==F||ce.texture!==_e)&&(te!==Y&&(r.activeTexture(Y),te=Y),r.bindTexture(F,_e||me[F]),ce.type=F,ce.texture=_e)}function ae(){const F=re[te];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ie(){try{r.compressedTexImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{r.compressedTexImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{r.texSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{r.texSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ge(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{r.texStorage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{r.texStorage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function qe(){try{r.texImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{r.texImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(F){j.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),j.copy(F))}function we(F){ue.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),ue.copy(F))}function Ke(F,_e){let Y=d.get(_e);Y===void 0&&(Y=new WeakMap,d.set(_e,Y));let ce=Y.get(F);ce===void 0&&(ce=r.getUniformBlockIndex(_e,F.name),Y.set(F,ce))}function Oe(F,_e){const ce=d.get(_e).get(F);h.get(_e)!==ce&&(r.uniformBlockBinding(_e,ce,F.__bindingPointIndex),h.set(_e,ce))}function lt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},te=null,re={},f={},g=new WeakMap,_=[],p=null,m=!1,y=null,x=null,M=null,b=null,S=null,w=null,R=null,I=new nt(0,0,0),E=0,A=!1,H=null,B=null,C=null,D=null,U=null,j.set(0,0,r.canvas.width,r.canvas.height),ue.set(0,0,r.canvas.width,r.canvas.height),a.reset(),c.reset(),o.reset()}return{buffers:{color:a,depth:c,stencil:o},enable:fe,disable:Le,bindFramebuffer:Te,drawBuffers:k,useProgram:ft,setBlending:Ce,setMaterial:Ye,setFlipSided:De,setCullFace:Fe,setLineWidth:ot,setPolygonOffset:P,setScissorTest:T,activeTexture:K,bindTexture:Q,unbindTexture:ae,compressedTexImage2D:ie,compressedTexImage3D:ze,texImage2D:qe,texImage3D:Ae,updateUBOMapping:Ke,uniformBlockBinding:Oe,texStorage2D:oe,texStorage3D:pt,texSubImage2D:Pe,texSubImage3D:de,compressedTexSubImage2D:xe,compressedTexSubImage3D:Ge,scissor:ye,viewport:we,reset:lt}}function Eg(r,e,t,n,i,s,l){const a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Qe,d=new WeakMap;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,T){return g?new OffscreenCanvas(P,T):xr("canvas")}function p(P,T,K,Q){let ae=1;const ie=ot(P);if((ie.width>Q||ie.height>Q)&&(ae=Q/Math.max(ie.width,ie.height)),ae<1||T===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ze=T?Ua:Math.floor,Pe=ze(ae*ie.width),de=ze(ae*ie.height);u===void 0&&(u=_(Pe,de));const xe=K?_(Pe,de):u;return xe.width=Pe,xe.height=de,xe.getContext("2d").drawImage(P,0,0,Pe,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Pe+"x"+de+")."),xe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),P;return P}function m(P){const T=ot(P);return Vo(T.width)&&Vo(T.height)}function y(P){return a?!1:P.wrapS!==Jt||P.wrapT!==Jt||P.minFilter!==xt&&P.minFilter!==bt}function x(P,T){return P.generateMipmaps&&T&&P.minFilter!==xt&&P.minFilter!==bt}function M(P){r.generateMipmap(P)}function b(P,T,K,Q,ae=!1){if(a===!1)return T;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ie=T;if(T===r.RED&&(K===r.FLOAT&&(ie=r.R32F),K===r.HALF_FLOAT&&(ie=r.R16F),K===r.UNSIGNED_BYTE&&(ie=r.R8)),T===r.RED_INTEGER&&(K===r.UNSIGNED_BYTE&&(ie=r.R8UI),K===r.UNSIGNED_SHORT&&(ie=r.R16UI),K===r.UNSIGNED_INT&&(ie=r.R32UI),K===r.BYTE&&(ie=r.R8I),K===r.SHORT&&(ie=r.R16I),K===r.INT&&(ie=r.R32I)),T===r.RG&&(K===r.FLOAT&&(ie=r.RG32F),K===r.HALF_FLOAT&&(ie=r.RG16F),K===r.UNSIGNED_BYTE&&(ie=r.RG8)),T===r.RG_INTEGER&&(K===r.UNSIGNED_BYTE&&(ie=r.RG8UI),K===r.UNSIGNED_SHORT&&(ie=r.RG16UI),K===r.UNSIGNED_INT&&(ie=r.RG32UI),K===r.BYTE&&(ie=r.RG8I),K===r.SHORT&&(ie=r.RG16I),K===r.INT&&(ie=r.RG32I)),T===r.RGBA){const ze=ae?pr:tt.getTransfer(Q);K===r.FLOAT&&(ie=r.RGBA32F),K===r.HALF_FLOAT&&(ie=r.RGBA16F),K===r.UNSIGNED_BYTE&&(ie=ze===rt?r.SRGB8_ALPHA8:r.RGBA8),K===r.UNSIGNED_SHORT_4_4_4_4&&(ie=r.RGBA4),K===r.UNSIGNED_SHORT_5_5_5_1&&(ie=r.RGB5_A1)}return(ie===r.R16F||ie===r.R32F||ie===r.RG16F||ie===r.RG32F||ie===r.RGBA16F||ie===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function S(P,T,K){return x(P,K)===!0||P.isFramebufferTexture&&P.minFilter!==xt&&P.minFilter!==bt?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function w(P){return P===xt||P===po||P===ms?r.NEAREST:r.LINEAR}function R(P){const T=P.target;T.removeEventListener("dispose",R),E(T),T.isVideoTexture&&d.delete(T)}function I(P){const T=P.target;T.removeEventListener("dispose",I),H(T)}function E(P){const T=n.get(P);if(T.__webglInit===void 0)return;const K=P.source,Q=f.get(K);if(Q){const ae=Q[T.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&A(P),Object.keys(Q).length===0&&f.delete(K)}n.remove(P)}function A(P){const T=n.get(P);r.deleteTexture(T.__webglTexture);const K=P.source,Q=f.get(K);delete Q[T.__cacheKey],l.memory.textures--}function H(P){const T=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(T.__webglFramebuffer[Q]))for(let ae=0;ae<T.__webglFramebuffer[Q].length;ae++)r.deleteFramebuffer(T.__webglFramebuffer[Q][ae]);else r.deleteFramebuffer(T.__webglFramebuffer[Q]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[Q])}else{if(Array.isArray(T.__webglFramebuffer))for(let Q=0;Q<T.__webglFramebuffer.length;Q++)r.deleteFramebuffer(T.__webglFramebuffer[Q]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Q=0;Q<T.__webglColorRenderbuffer.length;Q++)T.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[Q]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const K=P.textures;for(let Q=0,ae=K.length;Q<ae;Q++){const ie=n.get(K[Q]);ie.__webglTexture&&(r.deleteTexture(ie.__webglTexture),l.memory.textures--),n.remove(K[Q])}n.remove(P)}let B=0;function C(){B=0}function D(){const P=B;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),B+=1,P}function U(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function G(P,T){const K=n.get(P);if(P.isVideoTexture&&De(P),P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){const Q=P.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ue(K,P,T);return}}t.bindTexture(r.TEXTURE_2D,K.__webglTexture,r.TEXTURE0+T)}function V(P,T){const K=n.get(P);if(P.version>0&&K.__version!==P.version){ue(K,P,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,K.__webglTexture,r.TEXTURE0+T)}function W(P,T){const K=n.get(P);if(P.version>0&&K.__version!==P.version){ue(K,P,T);return}t.bindTexture(r.TEXTURE_3D,K.__webglTexture,r.TEXTURE0+T)}function J(P,T){const K=n.get(P);if(P.version>0&&K.__version!==P.version){Se(K,P,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture,r.TEXTURE0+T)}const te={[ur]:r.REPEAT,[Jt]:r.CLAMP_TO_EDGE,[fr]:r.MIRRORED_REPEAT},re={[xt]:r.NEAREST,[po]:r.NEAREST_MIPMAP_NEAREST,[ms]:r.NEAREST_MIPMAP_LINEAR,[bt]:r.LINEAR,[Gr]:r.LINEAR_MIPMAP_NEAREST,[_i]:r.LINEAR_MIPMAP_LINEAR},ne={[ud]:r.NEVER,[xd]:r.ALWAYS,[fd]:r.LESS,[lc]:r.LEQUAL,[pd]:r.EQUAL,[_d]:r.GEQUAL,[md]:r.GREATER,[gd]:r.NOTEQUAL};function O(P,T,K){if(T.type===wn&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===bt||T.magFilter===Gr||T.magFilter===ms||T.magFilter===_i||T.minFilter===bt||T.minFilter===Gr||T.minFilter===ms||T.minFilter===_i)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),K?(r.texParameteri(P,r.TEXTURE_WRAP_S,te[T.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,te[T.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,te[T.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,re[T.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,re[T.minFilter])):(r.texParameteri(P,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(P,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(T.wrapS!==Jt||T.wrapT!==Jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,r.TEXTURE_MAG_FILTER,w(T.magFilter)),r.texParameteri(P,r.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==xt&&T.minFilter!==bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,ne[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===xt||T.minFilter!==ms&&T.minFilter!==_i||T.type===wn&&e.has("OES_texture_float_linear")===!1||a===!1&&T.type===bs&&e.has("OES_texture_half_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function j(P,T){let K=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",R));const Q=T.source;let ae=f.get(Q);ae===void 0&&(ae={},f.set(Q,ae));const ie=U(T);if(ie!==P.__cacheKey){ae[ie]===void 0&&(ae[ie]={texture:r.createTexture(),usedTimes:0},l.memory.textures++,K=!0),ae[ie].usedTimes++;const ze=ae[P.__cacheKey];ze!==void 0&&(ae[P.__cacheKey].usedTimes--,ze.usedTimes===0&&A(T)),P.__cacheKey=ie,P.__webglTexture=ae[ie].texture}return K}function ue(P,T,K){let Q=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Q=r.TEXTURE_3D);const ae=j(P,T),ie=T.source;t.bindTexture(Q,P.__webglTexture,r.TEXTURE0+K);const ze=n.get(ie);if(ie.version!==ze.__version||ae===!0){t.activeTexture(r.TEXTURE0+K);const Pe=tt.getPrimaries(tt.workingColorSpace),de=T.colorSpace===Gn?null:tt.getPrimaries(T.colorSpace),xe=T.colorSpace===Gn||Pe===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ge=y(T)&&m(T.image)===!1;let oe=p(T.image,Ge,!1,i.maxTextureSize);oe=Fe(T,oe);const pt=m(oe)||a,qe=s.convert(T.format,T.colorSpace);let Ae=s.convert(T.type),ye=b(T.internalFormat,qe,Ae,T.colorSpace,T.isVideoTexture);O(Q,T,pt);let we;const Ke=T.mipmaps,Oe=a&&T.isVideoTexture!==!0&&ye!==oc,lt=ze.__version===void 0||ae===!0,F=ie.dataReady,_e=S(T,oe,pt);if(T.isDepthTexture)ye=r.DEPTH_COMPONENT,a?T.type===wn?ye=r.DEPTH_COMPONENT32F:T.type===Yn?ye=r.DEPTH_COMPONENT24:T.type===Si?ye=r.DEPTH24_STENCIL8:ye=r.DEPTH_COMPONENT16:T.type===wn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===yi&&ye===r.DEPTH_COMPONENT&&T.type!==Za&&T.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=Yn,Ae=s.convert(T.type)),T.format===cs&&ye===r.DEPTH_COMPONENT&&(ye=r.DEPTH_STENCIL,T.type!==Si&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Si,Ae=s.convert(T.type))),lt&&(Oe?t.texStorage2D(r.TEXTURE_2D,1,ye,oe.width,oe.height):t.texImage2D(r.TEXTURE_2D,0,ye,oe.width,oe.height,0,qe,Ae,null));else if(T.isDataTexture)if(Ke.length>0&&pt){Oe&&lt&&t.texStorage2D(r.TEXTURE_2D,_e,ye,Ke[0].width,Ke[0].height);for(let Y=0,ce=Ke.length;Y<ce;Y++)we=Ke[Y],Oe?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,we.width,we.height,qe,Ae,we.data):t.texImage2D(r.TEXTURE_2D,Y,ye,we.width,we.height,0,qe,Ae,we.data);T.generateMipmaps=!1}else Oe?(lt&&t.texStorage2D(r.TEXTURE_2D,_e,ye,oe.width,oe.height),F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe.width,oe.height,qe,Ae,oe.data)):t.texImage2D(r.TEXTURE_2D,0,ye,oe.width,oe.height,0,qe,Ae,oe.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Oe&&lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,ye,Ke[0].width,Ke[0].height,oe.depth);for(let Y=0,ce=Ke.length;Y<ce;Y++)we=Ke[Y],T.format!==an?qe!==null?Oe?F&&t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,we.width,we.height,oe.depth,qe,we.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,ye,we.width,we.height,oe.depth,0,we.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,we.width,we.height,oe.depth,qe,Ae,we.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Y,ye,we.width,we.height,oe.depth,0,qe,Ae,we.data)}else{Oe&&lt&&t.texStorage2D(r.TEXTURE_2D,_e,ye,Ke[0].width,Ke[0].height);for(let Y=0,ce=Ke.length;Y<ce;Y++)we=Ke[Y],T.format!==an?qe!==null?Oe?F&&t.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,we.width,we.height,qe,we.data):t.compressedTexImage2D(r.TEXTURE_2D,Y,ye,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,we.width,we.height,qe,Ae,we.data):t.texImage2D(r.TEXTURE_2D,Y,ye,we.width,we.height,0,qe,Ae,we.data)}else if(T.isDataArrayTexture)Oe?(lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,ye,oe.width,oe.height,oe.depth),F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,qe,Ae,oe.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,ye,oe.width,oe.height,oe.depth,0,qe,Ae,oe.data);else if(T.isData3DTexture)Oe?(lt&&t.texStorage3D(r.TEXTURE_3D,_e,ye,oe.width,oe.height,oe.depth),F&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,qe,Ae,oe.data)):t.texImage3D(r.TEXTURE_3D,0,ye,oe.width,oe.height,oe.depth,0,qe,Ae,oe.data);else if(T.isFramebufferTexture){if(lt)if(Oe)t.texStorage2D(r.TEXTURE_2D,_e,ye,oe.width,oe.height);else{let Y=oe.width,ce=oe.height;for(let ve=0;ve<_e;ve++)t.texImage2D(r.TEXTURE_2D,ve,ye,Y,ce,0,qe,Ae,null),Y>>=1,ce>>=1}}else if(Ke.length>0&&pt){if(Oe&&lt){const Y=ot(Ke[0]);t.texStorage2D(r.TEXTURE_2D,_e,ye,Y.width,Y.height)}for(let Y=0,ce=Ke.length;Y<ce;Y++)we=Ke[Y],Oe?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,qe,Ae,we):t.texImage2D(r.TEXTURE_2D,Y,ye,qe,Ae,we);T.generateMipmaps=!1}else if(Oe){if(lt){const Y=ot(oe);t.texStorage2D(r.TEXTURE_2D,_e,ye,Y.width,Y.height)}F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,qe,Ae,oe)}else t.texImage2D(r.TEXTURE_2D,0,ye,qe,Ae,oe);x(T,pt)&&M(Q),ze.__version=ie.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function Se(P,T,K){if(T.image.length!==6)return;const Q=j(P,T),ae=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+K);const ie=n.get(ae);if(ae.version!==ie.__version||Q===!0){t.activeTexture(r.TEXTURE0+K);const ze=tt.getPrimaries(tt.workingColorSpace),Pe=T.colorSpace===Gn?null:tt.getPrimaries(T.colorSpace),de=T.colorSpace===Gn||ze===Pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const xe=T.isCompressedTexture||T.image[0].isCompressedTexture,Ge=T.image[0]&&T.image[0].isDataTexture,oe=[];for(let Y=0;Y<6;Y++)!xe&&!Ge?oe[Y]=p(T.image[Y],!1,!0,i.maxCubemapSize):oe[Y]=Ge?T.image[Y].image:T.image[Y],oe[Y]=Fe(T,oe[Y]);const pt=oe[0],qe=m(pt)||a,Ae=s.convert(T.format,T.colorSpace),ye=s.convert(T.type),we=b(T.internalFormat,Ae,ye,T.colorSpace),Ke=a&&T.isVideoTexture!==!0,Oe=ie.__version===void 0||Q===!0,lt=ae.dataReady;let F=S(T,pt,qe);O(r.TEXTURE_CUBE_MAP,T,qe);let _e;if(xe){Ke&&Oe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,F,we,pt.width,pt.height);for(let Y=0;Y<6;Y++){_e=oe[Y].mipmaps;for(let ce=0;ce<_e.length;ce++){const ve=_e[ce];T.format!==an?Ae!==null?Ke?lt&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,ve.width,ve.height,Ae,ve.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,we,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,0,0,ve.width,ve.height,Ae,ye,ve.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce,we,ve.width,ve.height,0,Ae,ye,ve.data)}}}else{if(_e=T.mipmaps,Ke&&Oe){_e.length>0&&F++;const Y=ot(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,F,we,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Ge){Ke?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,oe[Y].width,oe[Y].height,Ae,ye,oe[Y].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,we,oe[Y].width,oe[Y].height,0,Ae,ye,oe[Y].data);for(let ce=0;ce<_e.length;ce++){const Ze=_e[ce].image[Y].image;Ke?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,Ze.width,Ze.height,Ae,ye,Ze.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,we,Ze.width,Ze.height,0,Ae,ye,Ze.data)}}else{Ke?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ae,ye,oe[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,we,Ae,ye,oe[Y]);for(let ce=0;ce<_e.length;ce++){const ve=_e[ce];Ke?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,0,0,Ae,ye,ve.image[Y]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ce+1,we,Ae,ye,ve.image[Y])}}}x(T,qe)&&M(r.TEXTURE_CUBE_MAP),ie.__version=ae.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function me(P,T,K,Q,ae,ie){const ze=s.convert(K.format,K.colorSpace),Pe=s.convert(K.type),de=b(K.internalFormat,ze,Pe,K.colorSpace);if(!n.get(T).__hasExternalTextures){const Ge=Math.max(1,T.width>>ie),oe=Math.max(1,T.height>>ie);ae===r.TEXTURE_3D||ae===r.TEXTURE_2D_ARRAY?t.texImage3D(ae,ie,de,Ge,oe,T.depth,0,ze,Pe,null):t.texImage2D(ae,ie,de,Ge,oe,0,ze,Pe,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),Ye(T)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,ae,n.get(K).__webglTexture,0,Ce(T)):(ae===r.TEXTURE_2D||ae>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,ae,n.get(K).__webglTexture,ie),t.bindFramebuffer(r.FRAMEBUFFER,null)}function fe(P,T,K){if(r.bindRenderbuffer(r.RENDERBUFFER,P),T.depthBuffer&&!T.stencilBuffer){let Q=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(K||Ye(T)){const ae=T.depthTexture;ae&&ae.isDepthTexture&&(ae.type===wn?Q=r.DEPTH_COMPONENT32F:ae.type===Yn&&(Q=r.DEPTH_COMPONENT24));const ie=Ce(T);Ye(T)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,Q,T.width,T.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,Q,T.width,T.height)}else r.renderbufferStorage(r.RENDERBUFFER,Q,T.width,T.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,P)}else if(T.depthBuffer&&T.stencilBuffer){const Q=Ce(T);K&&Ye(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,T.width,T.height):Ye(T)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,P)}else{const Q=T.textures;for(let ae=0;ae<Q.length;ae++){const ie=Q[ae],ze=s.convert(ie.format,ie.colorSpace),Pe=s.convert(ie.type),de=b(ie.internalFormat,ze,Pe,ie.colorSpace),xe=Ce(T);K&&Ye(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,de,T.width,T.height):Ye(T)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,de,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,de,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Le(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),G(T.depthTexture,0);const Q=n.get(T.depthTexture).__webglTexture,ae=Ce(T);if(T.depthTexture.format===yi)Ye(T)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,ae):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(T.depthTexture.format===cs)Ye(T)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,ae):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Te(P){const T=n.get(P),K=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Le(T.__webglFramebuffer,P)}else if(K){T.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[Q]),T.__webglDepthbuffer[Q]=r.createRenderbuffer(),fe(T.__webglDepthbuffer[Q],P,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=r.createRenderbuffer(),fe(T.__webglDepthbuffer,P,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function k(P,T,K){const Q=n.get(P);T!==void 0&&me(Q.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),K!==void 0&&Te(P)}function ft(P){const T=P.texture,K=n.get(P),Q=n.get(T);P.addEventListener("dispose",I);const ae=P.textures,ie=P.isWebGLCubeRenderTarget===!0,ze=ae.length>1,Pe=m(P)||a;if(ze||(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=T.version,l.memory.textures++),ie){K.__webglFramebuffer=[];for(let de=0;de<6;de++)if(a&&T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer[de]=[];for(let xe=0;xe<T.mipmaps.length;xe++)K.__webglFramebuffer[de][xe]=r.createFramebuffer()}else K.__webglFramebuffer[de]=r.createFramebuffer()}else{if(a&&T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer=[];for(let de=0;de<T.mipmaps.length;de++)K.__webglFramebuffer[de]=r.createFramebuffer()}else K.__webglFramebuffer=r.createFramebuffer();if(ze)if(i.drawBuffers)for(let de=0,xe=ae.length;de<xe;de++){const Ge=n.get(ae[de]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=r.createTexture(),l.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&Ye(P)===!1){K.__webglMultisampledFramebuffer=r.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let de=0;de<ae.length;de++){const xe=ae[de];K.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,K.__webglColorRenderbuffer[de]);const Ge=s.convert(xe.format,xe.colorSpace),oe=s.convert(xe.type),pt=b(xe.internalFormat,Ge,oe,xe.colorSpace,P.isXRRenderTarget===!0),qe=Ce(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,qe,pt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,K.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(K.__webglDepthRenderbuffer=r.createRenderbuffer(),fe(K.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ie){t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),O(r.TEXTURE_CUBE_MAP,T,Pe);for(let de=0;de<6;de++)if(a&&T.mipmaps&&T.mipmaps.length>0)for(let xe=0;xe<T.mipmaps.length;xe++)me(K.__webglFramebuffer[de][xe],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,xe);else me(K.__webglFramebuffer[de],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);x(T,Pe)&&M(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ze){for(let de=0,xe=ae.length;de<xe;de++){const Ge=ae[de],oe=n.get(Ge);t.bindTexture(r.TEXTURE_2D,oe.__webglTexture),O(r.TEXTURE_2D,Ge,Pe),me(K.__webglFramebuffer,P,Ge,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,0),x(Ge,Pe)&&M(r.TEXTURE_2D)}t.unbindTexture()}else{let de=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?de=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,Q.__webglTexture),O(de,T,Pe),a&&T.mipmaps&&T.mipmaps.length>0)for(let xe=0;xe<T.mipmaps.length;xe++)me(K.__webglFramebuffer[xe],P,T,r.COLOR_ATTACHMENT0,de,xe);else me(K.__webglFramebuffer,P,T,r.COLOR_ATTACHMENT0,de,0);x(T,Pe)&&M(de),t.unbindTexture()}P.depthBuffer&&Te(P)}function Ee(P){const T=m(P)||a,K=P.textures;for(let Q=0,ae=K.length;Q<ae;Q++){const ie=K[Q];if(x(ie,T)){const ze=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Pe=n.get(ie).__webglTexture;t.bindTexture(ze,Pe),M(ze),t.unbindTexture()}}}function Ue(P){if(a&&P.samples>0&&Ye(P)===!1){const T=P.textures,K=P.width,Q=P.height;let ae=r.COLOR_BUFFER_BIT;const ie=[],ze=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=n.get(P),de=T.length>1;if(de)for(let xe=0;xe<T.length;xe++)t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let xe=0;xe<T.length;xe++){ie.push(r.COLOR_ATTACHMENT0+xe),P.depthBuffer&&ie.push(ze);const Ge=Pe.__ignoreDepthValues!==void 0?Pe.__ignoreDepthValues:!1;if(Ge===!1&&(P.depthBuffer&&(ae|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&(ae|=r.STENCIL_BUFFER_BIT)),de&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[xe]),Ge===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ze]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ze])),de){const oe=n.get(T[xe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,oe,0)}r.blitFramebuffer(0,0,K,Q,0,0,K,Q,ae,r.NEAREST),o&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let xe=0;xe<T.length;xe++){t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[xe]);const Ge=n.get(T[xe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,Ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}}function Ce(P){return Math.min(i.maxSamples,P.samples)}function Ye(P){const T=n.get(P);return a&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function De(P){const T=l.render.frame;d.get(P)!==T&&(d.set(P,T),P.update())}function Fe(P,T){const K=P.colorSpace,Q=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Ia||K!==ei&&K!==Gn&&(tt.getTransfer(K)===rt?a===!1?e.has("EXT_sRGB")===!0&&Q===an?(P.format=Ia,P.minFilter=bt,P.generateMipmaps=!1):T=uc.sRGBToLinear(T):(Q!==an||ae!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),T}function ot(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(h.width=P.naturalWidth||P.width,h.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(h.width=P.displayWidth,h.height=P.displayHeight):(h.width=P.width,h.height=P.height),h}this.allocateTextureUnit=D,this.resetTextureUnits=C,this.setTexture2D=G,this.setTexture2DArray=V,this.setTexture3D=W,this.setTextureCube=J,this.rebindTextures=k,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Ye}function wg(r,e,t){const n=t.isWebGL2;function i(s,l=Gn){let a;const c=tt.getTransfer(l);if(s===jn)return r.UNSIGNED_BYTE;if(s===nc)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ic)return r.UNSIGNED_SHORT_5_5_5_1;if(s===ed)return r.BYTE;if(s===td)return r.SHORT;if(s===Za)return r.UNSIGNED_SHORT;if(s===tc)return r.INT;if(s===Yn)return r.UNSIGNED_INT;if(s===wn)return r.FLOAT;if(s===bs)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===nd)return r.ALPHA;if(s===an)return r.RGBA;if(s===id)return r.LUMINANCE;if(s===sd)return r.LUMINANCE_ALPHA;if(s===yi)return r.DEPTH_COMPONENT;if(s===cs)return r.DEPTH_STENCIL;if(s===Ia)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===rd)return r.RED;if(s===sc)return r.RED_INTEGER;if(s===ad)return r.RG;if(s===rc)return r.RG_INTEGER;if(s===ac)return r.RGBA_INTEGER;if(s===Vr||s===Hr||s===Wr||s===Xr)if(c===rt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Vr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Wr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Vr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Hr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Wr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Xr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===mo||s===go||s===_o||s===xo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===mo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===go)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===_o)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===xo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===oc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===vo||s===Mo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===vo)return c===rt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Mo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===So||s===yo||s===Eo||s===wo||s===bo||s===To||s===Ao||s===Co||s===Ro||s===Lo||s===Po||s===Io||s===Do||s===Uo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===So)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===yo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Eo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===wo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===bo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===To)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ao)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Co)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ro)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Lo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Po)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Io)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Do)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Uo)return c===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Yr||s===No||s===Fo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Yr)return c===rt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===No)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Fo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===od||s===Oo||s===Bo||s===ko)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Yr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Oo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Bo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ko)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Si?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class bg extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class sr extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tg={type:"move"};class va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,l=null;const a=this._targetRay,c=this._grip,o=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(o&&e.hand){l=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(o,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=o.joints["index-finger-tip"],d=o.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;o.inputState.pinching&&u>f+g?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!o.inputState.pinching&&u<=f-g&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tg)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),o!==null&&(o.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new sr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ag=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cg=`
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

}`;class Rg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new en,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,i=new Ln({extensions:{fragDepth:!0},vertexShader:Ag,fragmentShader:Cg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new mn(new Ir(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class Lg extends us{constructor(e,t){super();const n=this;let i=null,s=1,l=null,a="local-floor",c=1,o=null,h=null,d=null,u=null,f=null,g=null;const _=new Rg,p=t.getContextAttributes();let m=null,y=null;const x=[],M=[],b=new Qe;let S=null;const w=new Kt;w.layers.enable(1),w.viewport=new Ct;const R=new Kt;R.layers.enable(2),R.viewport=new Ct;const I=[w,R],E=new bg;E.layers.enable(1),E.layers.enable(2);let A=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let j=x[O];return j===void 0&&(j=new va,x[O]=j),j.getTargetRaySpace()},this.getControllerGrip=function(O){let j=x[O];return j===void 0&&(j=new va,x[O]=j),j.getGripSpace()},this.getHand=function(O){let j=x[O];return j===void 0&&(j=new va,x[O]=j),j.getHandSpace()};function B(O){const j=M.indexOf(O.inputSource);if(j===-1)return;const ue=x[j];ue!==void 0&&(ue.update(O.inputSource,O.frame,o||l),ue.dispatchEvent({type:O.type,data:O.inputSource}))}function C(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",C),i.removeEventListener("inputsourceschange",D);for(let O=0;O<x.length;O++){const j=M[O];j!==null&&(M[O]=null,x[O].disconnect(j))}A=null,H=null,_.reset(),e.setRenderTarget(m),f=null,u=null,d=null,i=null,y=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||l},this.setReferenceSpace=function(O){o=O},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(O){if(i=O,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",C),i.addEventListener("inputsourceschange",D),p.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(b),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:i.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,j),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ti(f.framebufferWidth,f.framebufferHeight,{format:an,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let j=null,ue=null,Se=null;p.depth&&(Se=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=p.stencil?cs:yi,ue=p.stencil?Si:Yn);const me={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(me),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ti(u.textureWidth,u.textureHeight,{format:an,type:jn,depthTexture:new wc(u.textureWidth,u.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const fe=e.properties.get(y);fe.__ignoreDepthValues=u.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(c),o=null,l=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function D(O){for(let j=0;j<O.removed.length;j++){const ue=O.removed[j],Se=M.indexOf(ue);Se>=0&&(M[Se]=null,x[Se].disconnect(ue))}for(let j=0;j<O.added.length;j++){const ue=O.added[j];let Se=M.indexOf(ue);if(Se===-1){for(let fe=0;fe<x.length;fe++)if(fe>=M.length){M.push(ue),Se=fe;break}else if(M[fe]===null){M[fe]=ue,Se=fe;break}if(Se===-1)break}const me=x[Se];me&&me.connect(ue)}}const U=new Z,G=new Z;function V(O,j,ue){U.setFromMatrixPosition(j.matrixWorld),G.setFromMatrixPosition(ue.matrixWorld);const Se=U.distanceTo(G),me=j.projectionMatrix.elements,fe=ue.projectionMatrix.elements,Le=me[14]/(me[10]-1),Te=me[14]/(me[10]+1),k=(me[9]+1)/me[5],ft=(me[9]-1)/me[5],Ee=(me[8]-1)/me[0],Ue=(fe[8]+1)/fe[0],Ce=Le*Ee,Ye=Le*Ue,De=Se/(-Ee+Ue),Fe=De*-Ee;j.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Fe),O.translateZ(De),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert();const ot=Le+De,P=Te+De,T=Ce-Fe,K=Ye+(Se-Fe),Q=k*Te/P*ot,ae=ft*Te/P*ot;O.projectionMatrix.makePerspective(T,K,Q,ae,ot,P),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}function W(O,j){j===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(j.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(i===null)return;_.texture!==null&&(O.near=_.depthNear,O.far=_.depthFar),E.near=R.near=w.near=O.near,E.far=R.far=w.far=O.far,(A!==E.near||H!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),A=E.near,H=E.far,w.near=A,w.far=H,R.near=A,R.far=H,w.updateProjectionMatrix(),R.updateProjectionMatrix(),O.updateProjectionMatrix());const j=O.parent,ue=E.cameras;W(E,j);for(let Se=0;Se<ue.length;Se++)W(ue[Se],j);ue.length===2?V(E,w,R):E.projectionMatrix.copy(w.projectionMatrix),J(O,E,j)};function J(O,j,ue){ue===null?O.matrix.copy(j.matrixWorld):(O.matrix.copy(ue.matrixWorld),O.matrix.invert(),O.matrix.multiply(j.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(j.projectionMatrix),O.projectionMatrixInverse.copy(j.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Da*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(O){c=O,u!==null&&(u.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)},this.hasDepthSensing=function(){return _.texture!==null};let te=null;function re(O,j){if(h=j.getViewerPose(o||l),g=j,h!==null){const ue=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Se=!1;ue.length!==E.cameras.length&&(E.cameras.length=0,Se=!0);for(let fe=0;fe<ue.length;fe++){const Le=ue[fe];let Te=null;if(f!==null)Te=f.getViewport(Le);else{const ft=d.getViewSubImage(u,Le);Te=ft.viewport,fe===0&&(e.setRenderTargetTextures(y,ft.colorTexture,u.ignoreDepthValues?void 0:ft.depthStencilTexture),e.setRenderTarget(y))}let k=I[fe];k===void 0&&(k=new Kt,k.layers.enable(fe),k.viewport=new Ct,I[fe]=k),k.matrix.fromArray(Le.transform.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale),k.projectionMatrix.fromArray(Le.projectionMatrix),k.projectionMatrixInverse.copy(k.projectionMatrix).invert(),k.viewport.set(Te.x,Te.y,Te.width,Te.height),fe===0&&(E.matrix.copy(k.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Se===!0&&E.cameras.push(k)}const me=i.enabledFeatures;if(me&&me.includes("depth-sensing")){const fe=d.getDepthInformation(ue[0]);fe&&fe.isValid&&fe.texture&&_.init(e,fe,i.renderState)}}for(let ue=0;ue<x.length;ue++){const Se=M[ue],me=x[ue];Se!==null&&me!==void 0&&me.update(Se,j,o||l)}_.render(e,E),te&&te(O,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const ne=new Ec;ne.setAnimationLoop(re),this.setAnimationLoop=function(O){te=O},this.dispose=function(){}}}const ci=new Rn,Pg=new vt;function Ig(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,vc(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(l(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,y,x):m.isSpriteMaterial?o(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===zt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===zt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),x=y.envMap,M=y.envMapRotation;if(x&&(p.envMap.value=x,ci.copy(M),ci.x*=-1,ci.y*=-1,ci.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),p.envMapRotation.value.setFromMatrix4(Pg.makeRotationFromEuler(ci)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const b=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*b,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===zt&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Dg(r,e,t,n){let i={},s={},l=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,x){const M=x.program;n.uniformBlockBinding(y,M)}function o(y,x){let M=i[y.id];M===void 0&&(g(y),M=h(y),i[y.id]=M,y.addEventListener("dispose",p));const b=x.program;n.updateUBOMapping(y,b);const S=e.render.frame;s[y.id]!==S&&(u(y),s[y.id]=S)}function h(y){const x=d();y.__bindingPointIndex=x;const M=r.createBuffer(),b=y.__size,S=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,b,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function d(){for(let y=0;y<a;y++)if(l.indexOf(y)===-1)return l.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const x=i[y.id],M=y.uniforms,b=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let S=0,w=M.length;S<w;S++){const R=Array.isArray(M[S])?M[S]:[M[S]];for(let I=0,E=R.length;I<E;I++){const A=R[I];if(f(A,S,I,b)===!0){const H=A.__offset,B=Array.isArray(A.value)?A.value:[A.value];let C=0;for(let D=0;D<B.length;D++){const U=B[D],G=_(U);typeof U=="number"||typeof U=="boolean"?(A.__data[0]=U,r.bufferSubData(r.UNIFORM_BUFFER,H+C,A.__data)):U.isMatrix3?(A.__data[0]=U.elements[0],A.__data[1]=U.elements[1],A.__data[2]=U.elements[2],A.__data[3]=0,A.__data[4]=U.elements[3],A.__data[5]=U.elements[4],A.__data[6]=U.elements[5],A.__data[7]=0,A.__data[8]=U.elements[6],A.__data[9]=U.elements[7],A.__data[10]=U.elements[8],A.__data[11]=0):(U.toArray(A.__data,C),C+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,H,A.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(y,x,M,b){const S=y.value,w=x+"_"+M;if(b[w]===void 0)return typeof S=="number"||typeof S=="boolean"?b[w]=S:b[w]=S.clone(),!0;{const R=b[w];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return b[w]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function g(y){const x=y.uniforms;let M=0;const b=16;for(let w=0,R=x.length;w<R;w++){const I=Array.isArray(x[w])?x[w]:[x[w]];for(let E=0,A=I.length;E<A;E++){const H=I[E],B=Array.isArray(H.value)?H.value:[H.value];for(let C=0,D=B.length;C<D;C++){const U=B[C],G=_(U),V=M%b;V!==0&&b-V<G.boundary&&(M+=b-V),H.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=M,M+=G.storage}}}const S=M%b;return S>0&&(M+=b-S),y.__size=M,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){const x=y.target;x.removeEventListener("dispose",p);const M=l.indexOf(x.__bindingPointIndex);l.splice(M,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const y in i)r.deleteBuffer(i[y]);l=[],i={},s={}}return{bind:c,update:o,dispose:m}}class Lc{constructor(e={}){const{canvas:t=Md(),context:n=null,depth:i=!0,stencil:s=!0,alpha:l=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:o=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=l;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hn,this._useLegacyLights=!1,this.toneMapping=$n,this.toneMappingExposure=1;const x=this;let M=!1,b=0,S=0,w=null,R=-1,I=null;const E=new Ct,A=new Ct;let H=null;const B=new nt(0);let C=0,D=t.width,U=t.height,G=1,V=null,W=null;const J=new Ct(0,0,D,U),te=new Ct(0,0,D,U);let re=!1;const ne=new yc;let O=!1,j=!1,ue=null;const Se=new vt,me=new Qe,fe=new Z,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Te(){return w===null?G:1}let k=n;function ft(L,z){for(let q=0;q<L.length;q++){const $=L[q],X=t.getContext($,z);if(X!==null)return X}return null}try{const L={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:o,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qa}`),t.addEventListener("webglcontextlost",lt,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",_e,!1),k===null){const z=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&z.shift(),k=ft(z,L),k===null)throw ft(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Ee,Ue,Ce,Ye,De,Fe,ot,P,T,K,Q,ae,ie,ze,Pe,de,xe,Ge,oe,pt,qe,Ae,ye,we;function Ke(){Ee=new kp(k),Ue=new Ip(k,Ee,e),Ee.init(Ue),Ae=new wg(k,Ee,Ue),Ce=new yg(k,Ee,Ue),Ye=new Vp(k),De=new lg,Fe=new Eg(k,Ee,Ce,De,Ue,Ae,Ye),ot=new Up(x),P=new Bp(x),T=new Yd(k,Ue),ye=new Lp(k,Ee,T,Ue),K=new zp(k,T,Ye,ye),Q=new Yp(k,K,T,Ye),oe=new Xp(k,Ue,Fe),de=new Dp(De),ae=new og(x,ot,P,Ee,Ue,ye,de),ie=new Ig(x,De),ze=new hg,Pe=new gg(Ee,Ue),Ge=new Rp(x,ot,P,Ce,Q,u,c),xe=new Sg(x,Q,Ue),we=new Dg(k,Ye,Ue,Ce),pt=new Pp(k,Ee,Ye,Ue),qe=new Gp(k,Ee,Ye,Ue),Ye.programs=ae.programs,x.capabilities=Ue,x.extensions=Ee,x.properties=De,x.renderLists=ze,x.shadowMap=xe,x.state=Ce,x.info=Ye}Ke();const Oe=new Lg(x,k);this.xr=Oe,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const L=Ee.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Ee.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(L){L!==void 0&&(G=L,this.setSize(D,U,!1))},this.getSize=function(L){return L.set(D,U)},this.setSize=function(L,z,q=!0){if(Oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=L,U=z,t.width=Math.floor(L*G),t.height=Math.floor(z*G),q===!0&&(t.style.width=L+"px",t.style.height=z+"px"),this.setViewport(0,0,L,z)},this.getDrawingBufferSize=function(L){return L.set(D*G,U*G).floor()},this.setDrawingBufferSize=function(L,z,q){D=L,U=z,G=q,t.width=Math.floor(L*q),t.height=Math.floor(z*q),this.setViewport(0,0,L,z)},this.getCurrentViewport=function(L){return L.copy(E)},this.getViewport=function(L){return L.copy(J)},this.setViewport=function(L,z,q,$){L.isVector4?J.set(L.x,L.y,L.z,L.w):J.set(L,z,q,$),Ce.viewport(E.copy(J).multiplyScalar(G).round())},this.getScissor=function(L){return L.copy(te)},this.setScissor=function(L,z,q,$){L.isVector4?te.set(L.x,L.y,L.z,L.w):te.set(L,z,q,$),Ce.scissor(A.copy(te).multiplyScalar(G).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(L){Ce.setScissorTest(re=L)},this.setOpaqueSort=function(L){V=L},this.setTransparentSort=function(L){W=L},this.getClearColor=function(L){return L.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(L=!0,z=!0,q=!0){let $=0;if(L){let X=!1;if(w!==null){const Me=w.texture.format;X=Me===ac||Me===rc||Me===sc}if(X){const Me=w.texture.type,be=Me===jn||Me===Yn||Me===Za||Me===Si||Me===nc||Me===ic,Re=Ge.getClearColor(),Ie=Ge.getClearAlpha(),Xe=Re.r,Ne=Re.g,Be=Re.b;be?(f[0]=Xe,f[1]=Ne,f[2]=Be,f[3]=Ie,k.clearBufferuiv(k.COLOR,0,f)):(g[0]=Xe,g[1]=Ne,g[2]=Be,g[3]=Ie,k.clearBufferiv(k.COLOR,0,g))}else $|=k.COLOR_BUFFER_BIT}z&&($|=k.DEPTH_BUFFER_BIT),q&&($|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",lt,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ze.dispose(),Pe.dispose(),De.dispose(),ot.dispose(),P.dispose(),Q.dispose(),ye.dispose(),we.dispose(),ae.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",qt),Oe.removeEventListener("sessionend",st),ue&&(ue.dispose(),ue=null),Dt.stop()};function lt(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const L=Ye.autoReset,z=xe.enabled,q=xe.autoUpdate,$=xe.needsUpdate,X=xe.type;Ke(),Ye.autoReset=L,xe.enabled=z,xe.autoUpdate=q,xe.needsUpdate=$,xe.type=X}function _e(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Y(L){const z=L.target;z.removeEventListener("dispose",Y),ce(z)}function ce(L){ve(L),De.remove(L)}function ve(L){const z=De.get(L).programs;z!==void 0&&(z.forEach(function(q){ae.releaseProgram(q)}),L.isShaderMaterial&&ae.releaseShaderCache(L))}this.renderBufferDirect=function(L,z,q,$,X,Me){z===null&&(z=Le);const be=X.isMesh&&X.matrixWorld.determinant()<0,Re=Xc(L,z,q,$,X);Ce.setMaterial($,be);let Ie=q.index,Xe=1;if($.wireframe===!0){if(Ie=K.getWireframeAttribute(q),Ie===void 0)return;Xe=2}const Ne=q.drawRange,Be=q.attributes.position;let ut=Ne.start*Xe,Vt=(Ne.start+Ne.count)*Xe;Me!==null&&(ut=Math.max(ut,Me.start*Xe),Vt=Math.min(Vt,(Me.start+Me.count)*Xe)),Ie!==null?(ut=Math.max(ut,0),Vt=Math.min(Vt,Ie.count)):Be!=null&&(ut=Math.max(ut,0),Vt=Math.min(Vt,Be.count));const yt=Vt-ut;if(yt<0||yt===1/0)return;ye.setup(X,$,Re,q,Ie);let _n,ht=pt;if(Ie!==null&&(_n=T.get(Ie),ht=qe,ht.setIndex(_n)),X.isMesh)$.wireframe===!0?(Ce.setLineWidth($.wireframeLinewidth*Te()),ht.setMode(k.LINES)):ht.setMode(k.TRIANGLES);else if(X.isLine){let Ve=$.linewidth;Ve===void 0&&(Ve=1),Ce.setLineWidth(Ve*Te()),X.isLineSegments?ht.setMode(k.LINES):X.isLineLoop?ht.setMode(k.LINE_LOOP):ht.setMode(k.LINE_STRIP)}else X.isPoints?ht.setMode(k.POINTS):X.isSprite&&ht.setMode(k.TRIANGLES);if(X.isBatchedMesh)ht.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)ht.renderInstances(ut,yt,X.count);else if(q.isInstancedBufferGeometry){const Ve=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Nr=Math.min(q.instanceCount,Ve);ht.renderInstances(ut,yt,Nr)}else ht.render(ut,yt)};function Ze(L,z,q){L.transparent===!0&&L.side===un&&L.forceSinglePass===!1?(L.side=zt,L.needsUpdate=!0,Ds(L,z,q),L.side=Qn,L.needsUpdate=!0,Ds(L,z,q),L.side=un):Ds(L,z,q)}this.compile=function(L,z,q=null){q===null&&(q=L),p=Pe.get(q),p.init(),y.push(p),q.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),L!==q&&L.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights(x._useLegacyLights);const $=new Set;return L.traverse(function(X){const Me=X.material;if(Me)if(Array.isArray(Me))for(let be=0;be<Me.length;be++){const Re=Me[be];Ze(Re,q,X),$.add(Re)}else Ze(Me,q,X),$.add(Me)}),y.pop(),p=null,$},this.compileAsync=function(L,z,q=null){const $=this.compile(L,z,q);return new Promise(X=>{function Me(){if($.forEach(function(be){De.get(be).currentProgram.isReady()&&$.delete(be)}),$.size===0){X(L);return}setTimeout(Me,10)}Ee.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let it=null;function Tt(L){it&&it(L)}function qt(){Dt.stop()}function st(){Dt.start()}const Dt=new Ec;Dt.setAnimationLoop(Tt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(L){it=L,Oe.setAnimationLoop(L),L===null?Dt.stop():Dt.start()},Oe.addEventListener("sessionstart",qt),Oe.addEventListener("sessionend",st),this.render=function(L,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(z),z=Oe.getCamera()),L.isScene===!0&&L.onBeforeRender(x,L,z,w),p=Pe.get(L,y.length),p.init(),y.push(p),Se.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ne.setFromProjectionMatrix(Se),j=this.localClippingEnabled,O=de.init(this.clippingPlanes,j),_=ze.get(L,m.length),_.init(),m.push(_),cn(L,z,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(V,W),this.info.render.frame++,O===!0&&de.beginShadows();const q=p.state.shadowsArray;if(xe.render(q,L,z),O===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1)&&Ge.render(_,L),p.setupLights(x._useLegacyLights),z.isArrayCamera){const $=z.cameras;for(let X=0,Me=$.length;X<Me;X++){const be=$[X];to(_,L,be,be.viewport)}}else to(_,L,z);w!==null&&(Fe.updateMultisampleRenderTarget(w),Fe.updateRenderTargetMipmap(w)),L.isScene===!0&&L.onAfterRender(x,L,z),ye.resetDefaultState(),R=-1,I=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function cn(L,z,q,$){if(L.visible===!1)return;if(L.layers.test(z.layers)){if(L.isGroup)q=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(z);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||ne.intersectsSprite(L)){$&&fe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Se);const be=Q.update(L),Re=L.material;Re.visible&&_.push(L,be,Re,q,fe.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||ne.intersectsObject(L))){const be=Q.update(L),Re=L.material;if($&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),fe.copy(L.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),fe.copy(be.boundingSphere.center)),fe.applyMatrix4(L.matrixWorld).applyMatrix4(Se)),Array.isArray(Re)){const Ie=be.groups;for(let Xe=0,Ne=Ie.length;Xe<Ne;Xe++){const Be=Ie[Xe],ut=Re[Be.materialIndex];ut&&ut.visible&&_.push(L,be,ut,q,fe.z,Be)}}else Re.visible&&_.push(L,be,Re,q,fe.z,null)}}const Me=L.children;for(let be=0,Re=Me.length;be<Re;be++)cn(Me[be],z,q,$)}function to(L,z,q,$){const X=L.opaque,Me=L.transmissive,be=L.transparent;p.setupLightsView(q),O===!0&&de.setGlobalState(x.clippingPlanes,q),Me.length>0&&Wc(X,Me,z,q),$&&Ce.viewport(E.copy($)),X.length>0&&Is(X,z,q),Me.length>0&&Is(Me,z,q),be.length>0&&Is(be,z,q),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function Wc(L,z,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const Me=Ue.isWebGL2;ue===null&&(ue=new Ti(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?bs:jn,minFilter:_i,samples:Me?4:0})),x.getDrawingBufferSize(me),Me?ue.setSize(me.x,me.y):ue.setSize(Ua(me.x),Ua(me.y));const be=x.getRenderTarget();x.setRenderTarget(ue),x.getClearColor(B),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Re=x.toneMapping;x.toneMapping=$n,Is(L,q,$),Fe.updateMultisampleRenderTarget(ue),Fe.updateRenderTargetMipmap(ue);let Ie=!1;for(let Xe=0,Ne=z.length;Xe<Ne;Xe++){const Be=z[Xe],ut=Be.object,Vt=Be.geometry,yt=Be.material,_n=Be.group;if(yt.side===un&&ut.layers.test($.layers)){const ht=yt.side;yt.side=zt,yt.needsUpdate=!0,no(ut,q,$,Vt,yt,_n),yt.side=ht,yt.needsUpdate=!0,Ie=!0}}Ie===!0&&(Fe.updateMultisampleRenderTarget(ue),Fe.updateRenderTargetMipmap(ue)),x.setRenderTarget(be),x.setClearColor(B,C),x.toneMapping=Re}function Is(L,z,q){const $=z.isScene===!0?z.overrideMaterial:null;for(let X=0,Me=L.length;X<Me;X++){const be=L[X],Re=be.object,Ie=be.geometry,Xe=$===null?be.material:$,Ne=be.group;Re.layers.test(q.layers)&&no(Re,z,q,Ie,Xe,Ne)}}function no(L,z,q,$,X,Me){L.onBeforeRender(x,z,q,$,X,Me),L.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),X.onBeforeRender(x,z,q,$,L,Me),X.transparent===!0&&X.side===un&&X.forceSinglePass===!1?(X.side=zt,X.needsUpdate=!0,x.renderBufferDirect(q,z,$,X,L,Me),X.side=Qn,X.needsUpdate=!0,x.renderBufferDirect(q,z,$,X,L,Me),X.side=un):x.renderBufferDirect(q,z,$,X,L,Me),L.onAfterRender(x,z,q,$,X,Me)}function Ds(L,z,q){z.isScene!==!0&&(z=Le);const $=De.get(L),X=p.state.lights,Me=p.state.shadowsArray,be=X.state.version,Re=ae.getParameters(L,X.state,Me,z,q),Ie=ae.getProgramCacheKey(Re);let Xe=$.programs;$.environment=L.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(L.isMeshStandardMaterial?P:ot).get(L.envMap||$.environment),$.envMapRotation=$.environment!==null&&L.envMap===null?z.environmentRotation:L.envMapRotation,Xe===void 0&&(L.addEventListener("dispose",Y),Xe=new Map,$.programs=Xe);let Ne=Xe.get(Ie);if(Ne!==void 0){if($.currentProgram===Ne&&$.lightsStateVersion===be)return so(L,Re),Ne}else Re.uniforms=ae.getUniforms(L),L.onBuild(q,Re,x),L.onBeforeCompile(Re,x),Ne=ae.acquireProgram(Re,Ie),Xe.set(Ie,Ne),$.uniforms=Re.uniforms;const Be=$.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Be.clippingPlanes=de.uniform),so(L,Re),$.needsLights=qc(L),$.lightsStateVersion=be,$.needsLights&&(Be.ambientLightColor.value=X.state.ambient,Be.lightProbe.value=X.state.probe,Be.directionalLights.value=X.state.directional,Be.directionalLightShadows.value=X.state.directionalShadow,Be.spotLights.value=X.state.spot,Be.spotLightShadows.value=X.state.spotShadow,Be.rectAreaLights.value=X.state.rectArea,Be.ltc_1.value=X.state.rectAreaLTC1,Be.ltc_2.value=X.state.rectAreaLTC2,Be.pointLights.value=X.state.point,Be.pointLightShadows.value=X.state.pointShadow,Be.hemisphereLights.value=X.state.hemi,Be.directionalShadowMap.value=X.state.directionalShadowMap,Be.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Be.spotShadowMap.value=X.state.spotShadowMap,Be.spotLightMatrix.value=X.state.spotLightMatrix,Be.spotLightMap.value=X.state.spotLightMap,Be.pointShadowMap.value=X.state.pointShadowMap,Be.pointShadowMatrix.value=X.state.pointShadowMatrix),$.currentProgram=Ne,$.uniformsList=null,Ne}function io(L){if(L.uniformsList===null){const z=L.currentProgram.getUniforms();L.uniformsList=cr.seqWithValue(z.seq,L.uniforms)}return L.uniformsList}function so(L,z){const q=De.get(L);q.outputColorSpace=z.outputColorSpace,q.batching=z.batching,q.instancing=z.instancing,q.instancingColor=z.instancingColor,q.instancingMorph=z.instancingMorph,q.skinning=z.skinning,q.morphTargets=z.morphTargets,q.morphNormals=z.morphNormals,q.morphColors=z.morphColors,q.morphTargetsCount=z.morphTargetsCount,q.numClippingPlanes=z.numClippingPlanes,q.numIntersection=z.numClipIntersection,q.vertexAlphas=z.vertexAlphas,q.vertexTangents=z.vertexTangents,q.toneMapping=z.toneMapping}function Xc(L,z,q,$,X){z.isScene!==!0&&(z=Le),Fe.resetTextureUnits();const Me=z.fog,be=$.isMeshStandardMaterial?z.environment:null,Re=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ei,Ie=($.isMeshStandardMaterial?P:ot).get($.envMap||be),Xe=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ne=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Be=!!q.morphAttributes.position,ut=!!q.morphAttributes.normal,Vt=!!q.morphAttributes.color;let yt=$n;$.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(yt=x.toneMapping);const _n=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ht=_n!==void 0?_n.length:0,Ve=De.get($),Nr=p.state.lights;if(O===!0&&(j===!0||L!==I)){const Zt=L===I&&$.id===R;de.setState($,L,Zt)}let ct=!1;$.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Nr.state.version||Ve.outputColorSpace!==Re||X.isBatchedMesh&&Ve.batching===!1||!X.isBatchedMesh&&Ve.batching===!0||X.isInstancedMesh&&Ve.instancing===!1||!X.isInstancedMesh&&Ve.instancing===!0||X.isSkinnedMesh&&Ve.skinning===!1||!X.isSkinnedMesh&&Ve.skinning===!0||X.isInstancedMesh&&Ve.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ve.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ve.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ve.instancingMorph===!1&&X.morphTexture!==null||Ve.envMap!==Ie||$.fog===!0&&Ve.fog!==Me||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==de.numPlanes||Ve.numIntersection!==de.numIntersection)||Ve.vertexAlphas!==Xe||Ve.vertexTangents!==Ne||Ve.morphTargets!==Be||Ve.morphNormals!==ut||Ve.morphColors!==Vt||Ve.toneMapping!==yt||Ue.isWebGL2===!0&&Ve.morphTargetsCount!==ht)&&(ct=!0):(ct=!0,Ve.__version=$.version);let ni=Ve.currentProgram;ct===!0&&(ni=Ds($,z,X));let ro=!1,ps=!1,Fr=!1;const Rt=ni.getUniforms(),ii=Ve.uniforms;if(Ce.useProgram(ni.program)&&(ro=!0,ps=!0,Fr=!0),$.id!==R&&(R=$.id,ps=!0),ro||I!==L){Rt.setValue(k,"projectionMatrix",L.projectionMatrix),Rt.setValue(k,"viewMatrix",L.matrixWorldInverse);const Zt=Rt.map.cameraPosition;Zt!==void 0&&Zt.setValue(k,fe.setFromMatrixPosition(L.matrixWorld)),Ue.logarithmicDepthBuffer&&Rt.setValue(k,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Rt.setValue(k,"isOrthographic",L.isOrthographicCamera===!0),I!==L&&(I=L,ps=!0,Fr=!0)}if(X.isSkinnedMesh){Rt.setOptional(k,X,"bindMatrix"),Rt.setOptional(k,X,"bindMatrixInverse");const Zt=X.skeleton;Zt&&(Ue.floatVertexTextures?(Zt.boneTexture===null&&Zt.computeBoneTexture(),Rt.setValue(k,"boneTexture",Zt.boneTexture,Fe)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}X.isBatchedMesh&&(Rt.setOptional(k,X,"batchingTexture"),Rt.setValue(k,"batchingTexture",X._matricesTexture,Fe));const Or=q.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0&&Ue.isWebGL2===!0)&&oe.update(X,q,ni),(ps||Ve.receiveShadow!==X.receiveShadow)&&(Ve.receiveShadow=X.receiveShadow,Rt.setValue(k,"receiveShadow",X.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(ii.envMap.value=Ie,ii.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),ps&&(Rt.setValue(k,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&Yc(ii,Fr),Me&&$.fog===!0&&ie.refreshFogUniforms(ii,Me),ie.refreshMaterialUniforms(ii,$,G,U,ue),cr.upload(k,io(Ve),ii,Fe)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(cr.upload(k,io(Ve),ii,Fe),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Rt.setValue(k,"center",X.center),Rt.setValue(k,"modelViewMatrix",X.modelViewMatrix),Rt.setValue(k,"normalMatrix",X.normalMatrix),Rt.setValue(k,"modelMatrix",X.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Zt=$.uniformsGroups;for(let Br=0,Zc=Zt.length;Br<Zc;Br++)if(Ue.isWebGL2){const ao=Zt[Br];we.update(ao,ni),we.bind(ao,ni)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ni}function Yc(L,z){L.ambientLightColor.needsUpdate=z,L.lightProbe.needsUpdate=z,L.directionalLights.needsUpdate=z,L.directionalLightShadows.needsUpdate=z,L.pointLights.needsUpdate=z,L.pointLightShadows.needsUpdate=z,L.spotLights.needsUpdate=z,L.spotLightShadows.needsUpdate=z,L.rectAreaLights.needsUpdate=z,L.hemisphereLights.needsUpdate=z}function qc(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(L,z,q){De.get(L.texture).__webglTexture=z,De.get(L.depthTexture).__webglTexture=q;const $=De.get(L);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=q===void 0,$.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,z){const q=De.get(L);q.__webglFramebuffer=z,q.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(L,z=0,q=0){w=L,b=z,S=q;let $=!0,X=null,Me=!1,be=!1;if(L){const Ie=De.get(L);Ie.__useDefaultFramebuffer!==void 0?(Ce.bindFramebuffer(k.FRAMEBUFFER,null),$=!1):Ie.__webglFramebuffer===void 0?Fe.setupRenderTarget(L):Ie.__hasExternalTextures&&Fe.rebindTextures(L,De.get(L.texture).__webglTexture,De.get(L.depthTexture).__webglTexture);const Xe=L.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(be=!0);const Ne=De.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ne[z])?X=Ne[z][q]:X=Ne[z],Me=!0):Ue.isWebGL2&&L.samples>0&&Fe.useMultisampledRTT(L)===!1?X=De.get(L).__webglMultisampledFramebuffer:Array.isArray(Ne)?X=Ne[q]:X=Ne,E.copy(L.viewport),A.copy(L.scissor),H=L.scissorTest}else E.copy(J).multiplyScalar(G).floor(),A.copy(te).multiplyScalar(G).floor(),H=re;if(Ce.bindFramebuffer(k.FRAMEBUFFER,X)&&Ue.drawBuffers&&$&&Ce.drawBuffers(L,X),Ce.viewport(E),Ce.scissor(A),Ce.setScissorTest(H),Me){const Ie=De.get(L.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ie.__webglTexture,q)}else if(be){const Ie=De.get(L.texture),Xe=z||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ie.__webglTexture,q||0,Xe)}R=-1},this.readRenderTargetPixels=function(L,z,q,$,X,Me,be){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=De.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&be!==void 0&&(Re=Re[be]),Re){Ce.bindFramebuffer(k.FRAMEBUFFER,Re);try{const Ie=L.texture,Xe=Ie.format,Ne=Ie.type;if(Xe!==an&&Ae.convert(Xe)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=Ne===bs&&(Ee.has("EXT_color_buffer_half_float")||Ue.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==jn&&Ae.convert(Ne)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===wn&&(Ue.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=L.width-$&&q>=0&&q<=L.height-X&&k.readPixels(z,q,$,X,Ae.convert(Xe),Ae.convert(Ne),Me)}finally{const Ie=w!==null?De.get(w).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(L,z,q=0){const $=Math.pow(2,-q),X=Math.floor(z.image.width*$),Me=Math.floor(z.image.height*$);Fe.setTexture2D(z,0),k.copyTexSubImage2D(k.TEXTURE_2D,q,0,0,L.x,L.y,X,Me),Ce.unbindTexture()},this.copyTextureToTexture=function(L,z,q,$=0){const X=z.image.width,Me=z.image.height,be=Ae.convert(q.format),Re=Ae.convert(q.type);Fe.setTexture2D(q,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,q.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,q.unpackAlignment),z.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,$,L.x,L.y,X,Me,be,Re,z.image.data):z.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,$,L.x,L.y,z.mipmaps[0].width,z.mipmaps[0].height,be,z.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,$,L.x,L.y,be,Re,z.image),$===0&&q.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),Ce.unbindTexture()},this.copyTextureToTexture3D=function(L,z,q,$,X=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=Math.round(L.max.x-L.min.x),be=Math.round(L.max.y-L.min.y),Re=L.max.z-L.min.z+1,Ie=Ae.convert($.format),Xe=Ae.convert($.type);let Ne;if($.isData3DTexture)Fe.setTexture3D($,0),Ne=k.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)Fe.setTexture2DArray($,0),Ne=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,$.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,$.unpackAlignment);const Be=k.getParameter(k.UNPACK_ROW_LENGTH),ut=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Vt=k.getParameter(k.UNPACK_SKIP_PIXELS),yt=k.getParameter(k.UNPACK_SKIP_ROWS),_n=k.getParameter(k.UNPACK_SKIP_IMAGES),ht=q.isCompressedTexture?q.mipmaps[X]:q.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,ht.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ht.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,L.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,L.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,L.min.z),q.isDataTexture||q.isData3DTexture?k.texSubImage3D(Ne,X,z.x,z.y,z.z,Me,be,Re,Ie,Xe,ht.data):$.isCompressedArrayTexture?k.compressedTexSubImage3D(Ne,X,z.x,z.y,z.z,Me,be,Re,Ie,ht.data):k.texSubImage3D(Ne,X,z.x,z.y,z.z,Me,be,Re,Ie,Xe,ht),k.pixelStorei(k.UNPACK_ROW_LENGTH,Be),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ut),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Vt),k.pixelStorei(k.UNPACK_SKIP_ROWS,yt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,_n),X===0&&$.generateMipmaps&&k.generateMipmap(Ne),Ce.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?Fe.setTextureCube(L,0):L.isData3DTexture?Fe.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?Fe.setTexture2DArray(L,0):Fe.setTexture2D(L,0),Ce.unbindTexture()},this.resetState=function(){b=0,S=0,w=null,Ce.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===$a?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===Pr?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Ug extends Lc{}Ug.prototype.isWebGL1Renderer=!0;class Ng extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Fg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return dc("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new Z;class $i{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new $i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Og extends en{constructor(e,t,n,i,s,l,a,c,o){super(e,t,n,i,s,l,a,c,o),this.isCanvasTexture=!0,this.needsUpdate=!0}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);if(typeof window<"u"&&window.THREE){let r=window.require;window.require=e=>{if(r)return r(e);if(e==="three")return window.THREE}}class Pc{constructor(){v(this,"entries",{});v(this,"size",0)}add(e){let t=this.entries[e];return this.entries[e]=!0,t?!1:(this.size++,!0)}addAll(e){let t=this.size;for(var n=0,i=e.length;n<i;n++)this.add(e[n]);return t!=this.size}contains(e){return this.entries[e]}clear(){this.entries={},this.size=0}}const Xt=class Xt{constructor(e=0,t=0,n=0,i=0){v(this,"r");v(this,"g");v(this,"b");v(this,"a");this.r=e,this.g=t,this.b=n,this.a=i}set(e,t,n,i){return this.r=e,this.g=t,this.b=n,this.a=i,this.clamp()}setFromColor(e){return this.r=e.r,this.g=e.g,this.b=e.b,this.a=e.a,this}setFromString(e){return e=e.charAt(0)=="#"?e.substr(1):e,this.r=parseInt(e.substr(0,2),16)/255,this.g=parseInt(e.substr(2,2),16)/255,this.b=parseInt(e.substr(4,2),16)/255,this.a=e.length!=8?1:parseInt(e.substr(6,2),16)/255,this}add(e,t,n,i){return this.r+=e,this.g+=t,this.b+=n,this.a+=i,this.clamp()}clamp(){return this.r<0?this.r=0:this.r>1&&(this.r=1),this.g<0?this.g=0:this.g>1&&(this.g=1),this.b<0?this.b=0:this.b>1&&(this.b=1),this.a<0?this.a=0:this.a>1&&(this.a=1),this}static rgba8888ToColor(e,t){e.r=((t&4278190080)>>>24)/255,e.g=((t&16711680)>>>16)/255,e.b=((t&65280)>>>8)/255,e.a=(t&255)/255}static rgb888ToColor(e,t){e.r=((t&16711680)>>>16)/255,e.g=((t&65280)>>>8)/255,e.b=(t&255)/255}toRgb888(){const e=t=>("0"+(t*255).toString(16)).slice(-2);return+("0x"+e(this.r)+e(this.g)+e(this.b))}static fromString(e){return new Xt().setFromString(e)}};v(Xt,"WHITE",new Xt(1,1,1,1)),v(Xt,"RED",new Xt(1,0,0,1)),v(Xt,"GREEN",new Xt(0,1,0,1)),v(Xt,"BLUE",new Xt(0,0,1,1)),v(Xt,"MAGENTA",new Xt(1,0,1,1));let Je=Xt;const _t=class _t{static clamp(e,t,n){return e<t?t:e>n?n:e}static cosDeg(e){return Math.cos(e*_t.degRad)}static sinDeg(e){return Math.sin(e*_t.degRad)}static atan2Deg(e,t){return Math.atan2(e,t)*_t.degRad}static signum(e){return e>0?1:e<0?-1:0}static toInt(e){return e>0?Math.floor(e):Math.ceil(e)}static cbrt(e){let t=Math.pow(Math.abs(e),.3333333333333333);return e<0?-t:t}static randomTriangular(e,t){return _t.randomTriangularWith(e,t,(e+t)*.5)}static randomTriangularWith(e,t,n){let i=Math.random(),s=t-e;return i<=(n-e)/s?e+Math.sqrt(i*s*(n-e)):t-Math.sqrt((1-i)*s*(t-n))}static isPowerOfTwo(e){return e&&(e&e-1)===0}};v(_t,"PI",3.1415927),v(_t,"PI2",_t.PI*2),v(_t,"invPI2",1/_t.PI2),v(_t,"radiansToDegrees",180/_t.PI),v(_t,"radDeg",_t.radiansToDegrees),v(_t,"degreesToRadians",_t.PI/180),v(_t,"degRad",_t.degreesToRadians);let le=_t;const kn=class kn{static arrayCopy(e,t,n,i,s){for(let l=t,a=i;l<t+s;l++,a++)n[a]=e[l]}static arrayFill(e,t,n,i){for(let s=t;s<n;s++)e[s]=i}static setArraySize(e,t,n=0){let i=e.length;if(i==t)return e;if(e.length=t,i<t)for(let s=i;s<t;s++)e[s]=n;return e}static ensureArrayCapacity(e,t,n=0){return e.length>=t?e:kn.setArraySize(e,t,n)}static newArray(e,t){let n=new Array(e);for(let i=0;i<e;i++)n[i]=t;return n}static newFloatArray(e){if(kn.SUPPORTS_TYPED_ARRAYS)return new Float32Array(e);{let t=new Array(e);for(let n=0;n<t.length;n++)t[n]=0;return t}}static newShortArray(e){if(kn.SUPPORTS_TYPED_ARRAYS)return new Int16Array(e);{let t=new Array(e);for(let n=0;n<t.length;n++)t[n]=0;return t}}static toFloatArray(e){return kn.SUPPORTS_TYPED_ARRAYS?new Float32Array(e):e}static toSinglePrecision(e){return kn.SUPPORTS_TYPED_ARRAYS?Math.fround(e):e}static webkit602BugfixHelper(e,t){}static contains(e,t,n=!0){for(var i=0;i<e.length;i++)if(e[i]==t)return!0;return!1}static enumValue(e,t){return e[t[0].toUpperCase()+t.slice(1)]}};v(kn,"SUPPORTS_TYPED_ARRAYS",typeof Float32Array<"u");let ge=kn;class Fa{constructor(e){v(this,"items",new Array);v(this,"instantiator");this.instantiator=e}obtain(){return this.items.length>0?this.items.pop():this.instantiator()}free(e){e.reset&&e.reset(),this.items.push(e)}freeAll(e){for(let t=0;t<e.length;t++)this.free(e[t])}clear(){this.items.length=0}}class Ts{constructor(e=0,t=0){v(this,"x");v(this,"y");this.x=e,this.y=t}set(e,t){return this.x=e,this.y=t,this}length(){let e=this.x,t=this.y;return Math.sqrt(e*e+t*t)}normalize(){let e=this.length();return e!=0&&(this.x/=e,this.y/=e),this}}class Ic{constructor(e){v(this,"name");if(!e)throw new Error("name cannot be null.");this.name=e}}const Er=class Er extends Ic{constructor(t){super(t);v(this,"id",Er.nextID++);v(this,"bones",null);v(this,"vertices",[]);v(this,"worldVerticesLength",0);v(this,"timelineAttachment",this)}computeWorldVertices(t,n,i,s,l,a){i=l+(i>>1)*a;let c=t.bone.skeleton,o=t.deform,h=this.vertices,d=this.bones;if(!d){o.length>0&&(h=o);let _=t.bone,p=_.worldX,m=_.worldY,y=_.a,x=_.b,M=_.c,b=_.d;for(let S=n,w=l;w<i;S+=2,w+=a){let R=h[S],I=h[S+1];s[w]=R*y+I*x+p,s[w+1]=R*M+I*b+m}return}let u=0,f=0;for(let _=0;_<n;_+=2){let p=d[u];u+=p+1,f+=p}let g=c.bones;if(o.length==0)for(let _=l,p=f*3;_<i;_+=a){let m=0,y=0,x=d[u++];for(x+=u;u<x;u++,p+=3){let M=g[d[u]],b=h[p],S=h[p+1],w=h[p+2];m+=(b*M.a+S*M.b+M.worldX)*w,y+=(b*M.c+S*M.d+M.worldY)*w}s[_]=m,s[_+1]=y}else{let _=o;for(let p=l,m=f*3,y=f<<1;p<i;p+=a){let x=0,M=0,b=d[u++];for(b+=u;u<b;u++,m+=3,y+=2){let S=g[d[u]],w=h[m]+_[y],R=h[m+1]+_[y+1],I=h[m+2];x+=(w*S.a+R*S.b+S.worldX)*I,M+=(w*S.c+R*S.d+S.worldY)*I}s[p]=x,s[p+1]=M}}}copyTo(t){this.bones?(t.bones=new Array(this.bones.length),ge.arrayCopy(this.bones,0,t.bones,0,this.bones.length)):t.bones=null,this.vertices&&(t.vertices=ge.newFloatArray(this.vertices.length),ge.arrayCopy(this.vertices,0,t.vertices,0,this.vertices.length)),t.worldVerticesLength=this.worldVerticesLength,t.timelineAttachment=this.timelineAttachment}};v(Er,"nextID",0);let on=Er;const Ki=class Ki{constructor(e){v(this,"id",Ki.nextID());v(this,"regions");v(this,"start",0);v(this,"digits",0);v(this,"setupIndex",0);this.regions=new Array(e)}copy(){let e=new Ki(this.regions.length);return ge.arrayCopy(this.regions,0,e.regions,0,this.regions.length),e.start=this.start,e.digits=this.digits,e.setupIndex=this.setupIndex,e}apply(e,t){let n=e.sequenceIndex;n==-1&&(n=this.setupIndex),n>=this.regions.length&&(n=this.regions.length-1);let i=this.regions[n];t.region!=i&&(t.region=i,t.updateRegion())}getPath(e,t){let n=e,i=(this.start+t).toString();for(let s=this.digits-i.length;s>0;s--)n+="0";return n+=i,n}static nextID(){return Ki._nextID++}};v(Ki,"_nextID",0);let Oa=Ki;var At;(function(r){r[r.hold=0]="hold",r[r.once=1]="once",r[r.loop=2]="loop",r[r.pingpong=3]="pingpong",r[r.onceReverse=4]="onceReverse",r[r.loopReverse=5]="loopReverse",r[r.pingpongReverse=6]="pingpongReverse"})(At||(At={}));const Bg=[At.hold,At.once,At.loop,At.pingpong,At.onceReverse,At.loopReverse,At.pingpongReverse];class Dc{constructor(e,t,n){v(this,"name");v(this,"timelines",[]);v(this,"timelineIds",new Pc);v(this,"duration");if(!e)throw new Error("name cannot be null.");this.name=e,this.setTimelines(t),this.duration=n}setTimelines(e){if(!e)throw new Error("timelines cannot be null.");this.timelines=e,this.timelineIds.clear();for(var t=0;t<e.length;t++)this.timelineIds.addAll(e[t].getPropertyIds())}hasTimeline(e){for(let t=0;t<e.length;t++)if(this.timelineIds.contains(e[t]))return!0;return!1}apply(e,t,n,i,s,l,a,c){if(!e)throw new Error("skeleton cannot be null.");i&&this.duration!=0&&(n%=this.duration,t>0&&(t%=this.duration));let o=this.timelines;for(let h=0,d=o.length;h<d;h++)o[h].apply(e,t,n,s,l,a,c)}}var ee;(function(r){r[r.setup=0]="setup",r[r.first=1]="first",r[r.replace=2]="replace",r[r.add=3]="add"})(ee||(ee={}));var It;(function(r){r[r.mixIn=0]="mixIn",r[r.mixOut=1]="mixOut"})(It||(It={}));const ke={rotate:0,x:1,y:2,scaleX:3,scaleY:4,shearX:5,shearY:6,inherit:7,rgb:8,alpha:9,rgb2:10,attachment:11,deform:12,event:13,drawOrder:14,ikConstraint:15,transformConstraint:16,pathConstraintPosition:17,pathConstraintSpacing:18,pathConstraintMix:19,physicsConstraintInertia:20,physicsConstraintStrength:21,physicsConstraintDamping:22,physicsConstraintMass:23,physicsConstraintWind:24,physicsConstraintGravity:25,physicsConstraintMix:26,physicsConstraintReset:27,sequence:28};class at{constructor(e,t){v(this,"propertyIds");v(this,"frames");this.propertyIds=t,this.frames=ge.newFloatArray(e*this.getFrameEntries())}getPropertyIds(){return this.propertyIds}getFrameEntries(){return 1}getFrameCount(){return this.frames.length/this.getFrameEntries()}getDuration(){return this.frames[this.frames.length-this.getFrameEntries()]}static search1(e,t){let n=e.length;for(let i=1;i<n;i++)if(e[i]>t)return i-1;return n-1}static search(e,t,n){let i=e.length;for(let s=n;s<i;s+=n)if(e[s]>t)return s-n;return i-n}}class gn extends at{constructor(t,n,i){super(t,i);v(this,"curves");this.curves=ge.newFloatArray(t+n*18),this.curves[t-1]=1}setLinear(t){this.curves[t]=0}setStepped(t){this.curves[t]=1}shrink(t){let n=this.getFrameCount()+t*18;if(this.curves.length>n){let i=ge.newFloatArray(n);ge.arrayCopy(this.curves,0,i,0,n),this.curves=i}}setBezier(t,n,i,s,l,a,c,o,h,d,u){let f=this.curves,g=this.getFrameCount()+t*18;i==0&&(f[n]=2+g);let _=(s-a*2+o)*.03,p=(l-c*2+h)*.03,m=((a-o)*3-s+d)*.006,y=((c-h)*3-l+u)*.006,x=_*2+m,M=p*2+y,b=(a-s)*.3+_+m*.16666667,S=(c-l)*.3+p+y*.16666667,w=s+b,R=l+S;for(let I=g+18;g<I;g+=2)f[g]=w,f[g+1]=R,b+=x,S+=M,x+=m,M+=y,w+=b,R+=S}getBezierValue(t,n,i,s){let l=this.curves;if(l[s]>t){let h=this.frames[n],d=this.frames[n+i];return d+(t-h)/(l[s]-h)*(l[s+1]-d)}let a=s+18;for(s+=2;s<a;s+=2)if(l[s]>=t){let h=l[s-2],d=l[s-1];return d+(t-h)/(l[s]-h)*(l[s+1]-d)}n+=this.getFrameEntries();let c=l[a-2],o=l[a-1];return o+(t-c)/(this.frames[n]-c)*(this.frames[n+i]-o)}}class ln extends gn{constructor(e,t,n){super(e,t,[n])}getFrameEntries(){return 2}setFrame(e,t,n){e<<=1,this.frames[e]=t,this.frames[e+1]=n}getCurveValue(e){let t=this.frames,n=t.length-2;for(let s=2;s<=n;s+=2)if(t[s]>e){n=s-2;break}let i=this.curves[n>>1];switch(i){case 0:let s=t[n],l=t[n+1];return l+(e-s)/(t[n+2]-s)*(t[n+2+1]-l);case 1:return t[n+1]}return this.getBezierValue(e,n,1,i-2)}getRelativeValue(e,t,n,i,s){if(e<this.frames[0]){switch(n){case ee.setup:return s;case ee.first:return i+(s-i)*t}return i}let l=this.getCurveValue(e);switch(n){case ee.setup:return s+l*t;case ee.first:case ee.replace:l+=s-i}return i+l*t}getAbsoluteValue(e,t,n,i,s){if(e<this.frames[0]){switch(n){case ee.setup:return s;case ee.first:return i+(s-i)*t}return i}let l=this.getCurveValue(e);return n==ee.setup?s+(l-s)*t:i+(l-i)*t}getAbsoluteValue2(e,t,n,i,s,l){if(e<this.frames[0]){switch(n){case ee.setup:return s;case ee.first:return i+(s-i)*t}return i}return n==ee.setup?s+(l-s)*t:i+(l-i)*t}getScaleValue(e,t,n,i,s,l){const a=this.frames;if(e<a[0]){switch(n){case ee.setup:return l;case ee.first:return s+(l-s)*t}return s}let c=this.getCurveValue(e)*l;if(t==1)return n==ee.add?s+c-l:c;if(i==It.mixOut)switch(n){case ee.setup:return l+(Math.abs(c)*le.signum(l)-l)*t;case ee.first:case ee.replace:return s+(Math.abs(c)*le.signum(s)-s)*t}else{let o=0;switch(n){case ee.setup:return o=Math.abs(l)*le.signum(c),o+(c-o)*t;case ee.first:case ee.replace:return o=Math.abs(s)*le.signum(c),o+(c-o)*t}}return s+(c-l)*t}}class Ja extends gn{constructor(e,t,n,i){super(e,t,[n,i])}getFrameEntries(){return 3}setFrame(e,t,n,i){e*=3,this.frames[e]=t,this.frames[e+1]=n,this.frames[e+2]=i}}class Ba extends ln{constructor(t,n,i){super(t,n,ke.rotate+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.rotation=this.getRelativeValue(i,l,a,o.rotation,o.data.rotation))}}class kg extends Ja{constructor(t,n,i){super(t,n,ke.x+"|"+i,ke.y+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];if(!o.active)return;let h=this.frames;if(i<h[0]){switch(a){case ee.setup:o.x=o.data.x,o.y=o.data.y;return;case ee.first:o.x+=(o.data.x-o.x)*l,o.y+=(o.data.y-o.y)*l}return}let d=0,u=0,f=at.search(h,i,3),g=this.curves[f/3];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(i-_)/(h[f+3]-_);d+=(h[f+3+1]-d)*p,u+=(h[f+3+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(i,f,1,g-2),u=this.getBezierValue(i,f,2,g+18-2)}switch(a){case ee.setup:o.x=o.data.x+d*l,o.y=o.data.y+u*l;break;case ee.first:case ee.replace:o.x+=(o.data.x+d-o.x)*l,o.y+=(o.data.y+u-o.y)*l;break;case ee.add:o.x+=d*l,o.y+=u*l}}}class zg extends ln{constructor(t,n,i){super(t,n,ke.x+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.x=this.getRelativeValue(i,l,a,o.x,o.data.x))}}class Gg extends ln{constructor(t,n,i){super(t,n,ke.y+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.y=this.getRelativeValue(i,l,a,o.y,o.data.y))}}class Vg extends Ja{constructor(t,n,i){super(t,n,ke.scaleX+"|"+i,ke.scaleY+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];if(!o.active)return;let h=this.frames;if(i<h[0]){switch(a){case ee.setup:o.scaleX=o.data.scaleX,o.scaleY=o.data.scaleY;return;case ee.first:o.scaleX+=(o.data.scaleX-o.scaleX)*l,o.scaleY+=(o.data.scaleY-o.scaleY)*l}return}let d,u,f=at.search(h,i,3),g=this.curves[f/3];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(i-_)/(h[f+3]-_);d+=(h[f+3+1]-d)*p,u+=(h[f+3+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(i,f,1,g-2),u=this.getBezierValue(i,f,2,g+18-2)}if(d*=o.data.scaleX,u*=o.data.scaleY,l==1)a==ee.add?(o.scaleX+=d-o.data.scaleX,o.scaleY+=u-o.data.scaleY):(o.scaleX=d,o.scaleY=u);else{let _=0,p=0;if(c==It.mixOut)switch(a){case ee.setup:_=o.data.scaleX,p=o.data.scaleY,o.scaleX=_+(Math.abs(d)*le.signum(_)-_)*l,o.scaleY=p+(Math.abs(u)*le.signum(p)-p)*l;break;case ee.first:case ee.replace:_=o.scaleX,p=o.scaleY,o.scaleX=_+(Math.abs(d)*le.signum(_)-_)*l,o.scaleY=p+(Math.abs(u)*le.signum(p)-p)*l;break;case ee.add:o.scaleX+=(d-o.data.scaleX)*l,o.scaleY+=(u-o.data.scaleY)*l}else switch(a){case ee.setup:_=Math.abs(o.data.scaleX)*le.signum(d),p=Math.abs(o.data.scaleY)*le.signum(u),o.scaleX=_+(d-_)*l,o.scaleY=p+(u-p)*l;break;case ee.first:case ee.replace:_=Math.abs(o.scaleX)*le.signum(d),p=Math.abs(o.scaleY)*le.signum(u),o.scaleX=_+(d-_)*l,o.scaleY=p+(u-p)*l;break;case ee.add:o.scaleX+=(d-o.data.scaleX)*l,o.scaleY+=(u-o.data.scaleY)*l}}}}class Hg extends ln{constructor(t,n,i){super(t,n,ke.scaleX+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.scaleX=this.getScaleValue(i,l,a,c,o.scaleX,o.data.scaleX))}}class Wg extends ln{constructor(t,n,i){super(t,n,ke.scaleY+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.scaleY=this.getScaleValue(i,l,a,c,o.scaleY,o.data.scaleY))}}class Xg extends Ja{constructor(t,n,i){super(t,n,ke.shearX+"|"+i,ke.shearY+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];if(!o.active)return;let h=this.frames;if(i<h[0]){switch(a){case ee.setup:o.shearX=o.data.shearX,o.shearY=o.data.shearY;return;case ee.first:o.shearX+=(o.data.shearX-o.shearX)*l,o.shearY+=(o.data.shearY-o.shearY)*l}return}let d=0,u=0,f=at.search(h,i,3),g=this.curves[f/3];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(i-_)/(h[f+3]-_);d+=(h[f+3+1]-d)*p,u+=(h[f+3+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(i,f,1,g-2),u=this.getBezierValue(i,f,2,g+18-2)}switch(a){case ee.setup:o.shearX=o.data.shearX+d*l,o.shearY=o.data.shearY+u*l;break;case ee.first:case ee.replace:o.shearX+=(o.data.shearX+d-o.shearX)*l,o.shearY+=(o.data.shearY+u-o.shearY)*l;break;case ee.add:o.shearX+=d*l,o.shearY+=u*l}}}class Yg extends ln{constructor(t,n,i){super(t,n,ke.shearX+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.shearX=this.getRelativeValue(i,l,a,o.shearX,o.data.shearX))}}class qg extends ln{constructor(t,n,i){super(t,n,ke.shearY+"|"+i);v(this,"boneIndex",0);this.boneIndex=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];o.active&&(o.shearY=this.getRelativeValue(i,l,a,o.shearY,o.data.shearY))}}class Zg extends at{constructor(t,n){super(t,[ke.inherit+"|"+n]);v(this,"boneIndex",0);this.boneIndex=n}getFrameEntries(){return 2}setFrame(t,n,i){t*=2,this.frames[t]=n,this.frames[t+1]=i}apply(t,n,i,s,l,a,c){let o=t.bones[this.boneIndex];if(!o.active)return;if(c==It.mixOut){a==ee.setup&&(o.inherit=o.data.inherit);return}let h=this.frames;if(i<h[0]){(a==ee.setup||a==ee.first)&&(o.inherit=o.data.inherit);return}o.inherit=this.frames[at.search(h,i,2)+1]}}class $g extends gn{constructor(t,n,i){super(t,n,[ke.rgb+"|"+i,ke.alpha+"|"+i]);v(this,"slotIndex",0);this.slotIndex=i}getFrameEntries(){return 5}setFrame(t,n,i,s,l,a){t*=5,this.frames[t]=n,this.frames[t+1]=i,this.frames[t+2]=s,this.frames[t+3]=l,this.frames[t+4]=a}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=this.frames,d=o.color;if(i<h[0]){let y=o.data.color;switch(a){case ee.setup:d.setFromColor(y);return;case ee.first:d.add((y.r-d.r)*l,(y.g-d.g)*l,(y.b-d.b)*l,(y.a-d.a)*l)}return}let u=0,f=0,g=0,_=0,p=at.search(h,i,5),m=this.curves[p/5];switch(m){case 0:let y=h[p];u=h[p+1],f=h[p+2],g=h[p+3],_=h[p+4];let x=(i-y)/(h[p+5]-y);u+=(h[p+5+1]-u)*x,f+=(h[p+5+2]-f)*x,g+=(h[p+5+3]-g)*x,_+=(h[p+5+4]-_)*x;break;case 1:u=h[p+1],f=h[p+2],g=h[p+3],_=h[p+4];break;default:u=this.getBezierValue(i,p,1,m-2),f=this.getBezierValue(i,p,2,m+18-2),g=this.getBezierValue(i,p,3,m+18*2-2),_=this.getBezierValue(i,p,4,m+18*3-2)}l==1?d.set(u,f,g,_):(a==ee.setup&&d.setFromColor(o.data.color),d.add((u-d.r)*l,(f-d.g)*l,(g-d.b)*l,(_-d.a)*l))}}class jg extends gn{constructor(t,n,i){super(t,n,[ke.rgb+"|"+i]);v(this,"slotIndex",0);this.slotIndex=i}getFrameEntries(){return 4}setFrame(t,n,i,s,l){t<<=2,this.frames[t]=n,this.frames[t+1]=i,this.frames[t+2]=s,this.frames[t+3]=l}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=this.frames,d=o.color;if(i<h[0]){let m=o.data.color;switch(a){case ee.setup:d.r=m.r,d.g=m.g,d.b=m.b;return;case ee.first:d.r+=(m.r-d.r)*l,d.g+=(m.g-d.g)*l,d.b+=(m.b-d.b)*l}return}let u=0,f=0,g=0,_=at.search(h,i,4),p=this.curves[_>>2];switch(p){case 0:let m=h[_];u=h[_+1],f=h[_+2],g=h[_+3];let y=(i-m)/(h[_+4]-m);u+=(h[_+4+1]-u)*y,f+=(h[_+4+2]-f)*y,g+=(h[_+4+3]-g)*y;break;case 1:u=h[_+1],f=h[_+2],g=h[_+3];break;default:u=this.getBezierValue(i,_,1,p-2),f=this.getBezierValue(i,_,2,p+18-2),g=this.getBezierValue(i,_,3,p+18*2-2)}if(l==1)d.r=u,d.g=f,d.b=g;else{if(a==ee.setup){let m=o.data.color;d.r=m.r,d.g=m.g,d.b=m.b}d.r+=(u-d.r)*l,d.g+=(f-d.g)*l,d.b+=(g-d.b)*l}}}class Kg extends ln{constructor(t,n,i){super(t,n,ke.alpha+"|"+i);v(this,"slotIndex",0);this.slotIndex=i}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=o.color;if(i<this.frames[0]){let u=o.data.color;switch(a){case ee.setup:h.a=u.a;return;case ee.first:h.a+=(u.a-h.a)*l}return}let d=this.getCurveValue(i);l==1?h.a=d:(a==ee.setup&&(h.a=o.data.color.a),h.a+=(d-h.a)*l)}}class Jg extends gn{constructor(t,n,i){super(t,n,[ke.rgb+"|"+i,ke.alpha+"|"+i,ke.rgb2+"|"+i]);v(this,"slotIndex",0);this.slotIndex=i}getFrameEntries(){return 8}setFrame(t,n,i,s,l,a,c,o,h){t<<=3,this.frames[t]=n,this.frames[t+1]=i,this.frames[t+2]=s,this.frames[t+3]=l,this.frames[t+4]=a,this.frames[t+5]=c,this.frames[t+6]=o,this.frames[t+7]=h}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=this.frames,d=o.color,u=o.darkColor;if(i<h[0]){let S=o.data.color,w=o.data.darkColor;switch(a){case ee.setup:d.setFromColor(S),u.r=w.r,u.g=w.g,u.b=w.b;return;case ee.first:d.add((S.r-d.r)*l,(S.g-d.g)*l,(S.b-d.b)*l,(S.a-d.a)*l),u.r+=(w.r-u.r)*l,u.g+=(w.g-u.g)*l,u.b+=(w.b-u.b)*l}return}let f=0,g=0,_=0,p=0,m=0,y=0,x=0,M=at.search(h,i,8),b=this.curves[M>>3];switch(b){case 0:let S=h[M];f=h[M+1],g=h[M+2],_=h[M+3],p=h[M+4],m=h[M+5],y=h[M+6],x=h[M+7];let w=(i-S)/(h[M+8]-S);f+=(h[M+8+1]-f)*w,g+=(h[M+8+2]-g)*w,_+=(h[M+8+3]-_)*w,p+=(h[M+8+4]-p)*w,m+=(h[M+8+5]-m)*w,y+=(h[M+8+6]-y)*w,x+=(h[M+8+7]-x)*w;break;case 1:f=h[M+1],g=h[M+2],_=h[M+3],p=h[M+4],m=h[M+5],y=h[M+6],x=h[M+7];break;default:f=this.getBezierValue(i,M,1,b-2),g=this.getBezierValue(i,M,2,b+18-2),_=this.getBezierValue(i,M,3,b+18*2-2),p=this.getBezierValue(i,M,4,b+18*3-2),m=this.getBezierValue(i,M,5,b+18*4-2),y=this.getBezierValue(i,M,6,b+18*5-2),x=this.getBezierValue(i,M,7,b+18*6-2)}if(l==1)d.set(f,g,_,p),u.r=m,u.g=y,u.b=x;else{if(a==ee.setup){d.setFromColor(o.data.color);let S=o.data.darkColor;u.r=S.r,u.g=S.g,u.b=S.b}d.add((f-d.r)*l,(g-d.g)*l,(_-d.b)*l,(p-d.a)*l),u.r+=(m-u.r)*l,u.g+=(y-u.g)*l,u.b+=(x-u.b)*l}}}class Qg extends gn{constructor(t,n,i){super(t,n,[ke.rgb+"|"+i,ke.rgb2+"|"+i]);v(this,"slotIndex",0);this.slotIndex=i}getFrameEntries(){return 7}setFrame(t,n,i,s,l,a,c,o){t*=7,this.frames[t]=n,this.frames[t+1]=i,this.frames[t+2]=s,this.frames[t+3]=l,this.frames[t+4]=a,this.frames[t+5]=c,this.frames[t+6]=o}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=this.frames,d=o.color,u=o.darkColor;if(i<h[0]){let b=o.data.color,S=o.data.darkColor;switch(a){case ee.setup:d.r=b.r,d.g=b.g,d.b=b.b,u.r=S.r,u.g=S.g,u.b=S.b;return;case ee.first:d.r+=(b.r-d.r)*l,d.g+=(b.g-d.g)*l,d.b+=(b.b-d.b)*l,u.r+=(S.r-u.r)*l,u.g+=(S.g-u.g)*l,u.b+=(S.b-u.b)*l}return}let f=0,g=0,_=0,p=0,m=0,y=0,x=at.search(h,i,7),M=this.curves[x/7];switch(M){case 0:let b=h[x];f=h[x+1],g=h[x+2],_=h[x+3],p=h[x+4],m=h[x+5],y=h[x+6];let S=(i-b)/(h[x+7]-b);f+=(h[x+7+1]-f)*S,g+=(h[x+7+2]-g)*S,_+=(h[x+7+3]-_)*S,p+=(h[x+7+4]-p)*S,m+=(h[x+7+5]-m)*S,y+=(h[x+7+6]-y)*S;break;case 1:f=h[x+1],g=h[x+2],_=h[x+3],p=h[x+4],m=h[x+5],y=h[x+6];break;default:f=this.getBezierValue(i,x,1,M-2),g=this.getBezierValue(i,x,2,M+18-2),_=this.getBezierValue(i,x,3,M+18*2-2),p=this.getBezierValue(i,x,4,M+18*3-2),m=this.getBezierValue(i,x,5,M+18*4-2),y=this.getBezierValue(i,x,6,M+18*5-2)}if(l==1)d.r=f,d.g=g,d.b=_,u.r=p,u.g=m,u.b=y;else{if(a==ee.setup){let b=o.data.color,S=o.data.darkColor;d.r=b.r,d.g=b.g,d.b=b.b,u.r=S.r,u.g=S.g,u.b=S.b}d.r+=(f-d.r)*l,d.g+=(g-d.g)*l,d.b+=(_-d.b)*l,u.r+=(p-u.r)*l,u.g+=(m-u.g)*l,u.b+=(y-u.b)*l}}}class ys extends at{constructor(t,n){super(t,[ke.attachment+"|"+n]);v(this,"slotIndex",0);v(this,"attachmentNames");this.slotIndex=n,this.attachmentNames=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,n,i){this.frames[t]=n,this.attachmentNames[t]=i}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(o.bone.active){if(c==It.mixOut){a==ee.setup&&this.setAttachment(t,o,o.data.attachmentName);return}if(i<this.frames[0]){(a==ee.setup||a==ee.first)&&this.setAttachment(t,o,o.data.attachmentName);return}this.setAttachment(t,o,this.attachmentNames[at.search1(this.frames,i)])}}setAttachment(t,n,i){n.setAttachment(i?t.getAttachment(this.slotIndex,i):null)}}class e0 extends gn{constructor(t,n,i,s){super(t,n,[ke.deform+"|"+i+"|"+s.id]);v(this,"slotIndex",0);v(this,"attachment");v(this,"vertices");this.slotIndex=i,this.attachment=s,this.vertices=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,n,i){this.frames[t]=n,this.vertices[t]=i}setBezier(t,n,i,s,l,a,c,o,h,d,u){let f=this.curves,g=this.getFrameCount()+t*18;i==0&&(f[n]=2+g);let _=(s-a*2+o)*.03,p=h*.03-c*.06,m=((a-o)*3-s+d)*.006,y=(c-h+.33333333)*.018,x=_*2+m,M=p*2+y,b=(a-s)*.3+_+m*.16666667,S=c*.3+p+y*.16666667,w=s+b,R=S;for(let I=g+18;g<I;g+=2)f[g]=w,f[g+1]=R,b+=x,S+=M,x+=m,M+=y,w+=b,R+=S}getCurvePercent(t,n){let i=this.curves,s=i[n];switch(s){case 0:let o=this.frames[n];return(t-o)/(this.frames[n+this.getFrameEntries()]-o);case 1:return 0}if(s-=2,i[s]>t){let o=this.frames[n];return i[s+1]*(t-o)/(i[s]-o)}let l=s+18;for(s+=2;s<l;s+=2)if(i[s]>=t){let o=i[s-2],h=i[s-1];return h+(t-o)/(i[s]-o)*(i[s+1]-h)}let a=i[l-2],c=i[l-1];return c+(1-c)*(t-a)/(this.frames[n+this.getFrameEntries()]-a)}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=o.getAttachment();if(!h||!(h instanceof on)||h.timelineAttachment!=this.attachment)return;let d=o.deform;d.length==0&&(a=ee.setup);let u=this.vertices,f=u[0].length,g=this.frames;if(i<g[0]){switch(a){case ee.setup:d.length=0;return;case ee.first:if(l==1){d.length=0;return}d.length=f;let M=h;if(M.bones){l=1-l;for(var _=0;_<f;_++)d[_]*=l}else{let b=M.vertices;for(var _=0;_<f;_++)d[_]+=(b[_]-d[_])*l}}return}if(d.length=f,i>=g[g.length-1]){let M=u[g.length-1];if(l==1)if(a==ee.add){let b=h;if(b.bones)for(let S=0;S<f;S++)d[S]+=M[S];else{let S=b.vertices;for(let w=0;w<f;w++)d[w]+=M[w]-S[w]}}else ge.arrayCopy(M,0,d,0,f);else switch(a){case ee.setup:{let S=h;if(S.bones)for(let w=0;w<f;w++)d[w]=M[w]*l;else{let w=S.vertices;for(let R=0;R<f;R++){let I=w[R];d[R]=I+(M[R]-I)*l}}break}case ee.first:case ee.replace:for(let S=0;S<f;S++)d[S]+=(M[S]-d[S])*l;break;case ee.add:let b=h;if(b.bones)for(let S=0;S<f;S++)d[S]+=M[S]*l;else{let S=b.vertices;for(let w=0;w<f;w++)d[w]+=(M[w]-S[w])*l}}return}let p=at.search1(g,i),m=this.getCurvePercent(i,p),y=u[p],x=u[p+1];if(l==1)if(a==ee.add){let M=h;if(M.bones)for(let b=0;b<f;b++){let S=y[b];d[b]+=S+(x[b]-S)*m}else{let b=M.vertices;for(let S=0;S<f;S++){let w=y[S];d[S]+=w+(x[S]-w)*m-b[S]}}}else for(let M=0;M<f;M++){let b=y[M];d[M]=b+(x[M]-b)*m}else switch(a){case ee.setup:{let b=h;if(b.bones)for(let S=0;S<f;S++){let w=y[S];d[S]=(w+(x[S]-w)*m)*l}else{let S=b.vertices;for(let w=0;w<f;w++){let R=y[w],I=S[w];d[w]=I+(R+(x[w]-R)*m-I)*l}}break}case ee.first:case ee.replace:for(let b=0;b<f;b++){let S=y[b];d[b]+=(S+(x[b]-S)*m-d[b])*l}break;case ee.add:let M=h;if(M.bones)for(let b=0;b<f;b++){let S=y[b];d[b]+=(S+(x[b]-S)*m)*l}else{let b=M.vertices;for(let S=0;S<f;S++){let w=y[S];d[S]+=(w+(x[S]-w)*m-b[S])*l}}}}}const wr=class wr extends at{constructor(t){super(t,wr.propertyIds);v(this,"events");this.events=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,n){this.frames[t]=n.time,this.events[t]=n}apply(t,n,i,s,l,a,c){if(!s)return;let o=this.frames,h=this.frames.length;if(n>i)this.apply(t,n,Number.MAX_VALUE,s,l,a,c),n=-1;else if(n>=o[h-1])return;if(i<o[0])return;let d=0;if(n<o[0])d=0;else{d=at.search1(o,n)+1;let u=o[d];for(;d>0&&o[d-1]==u;)d--}for(;d<h&&i>=o[d];d++)s.push(this.events[d])}};v(wr,"propertyIds",[""+ke.event]);let Mr=wr;const br=class br extends at{constructor(t){super(t,br.propertyIds);v(this,"drawOrders");this.drawOrders=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,n,i){this.frames[t]=n,this.drawOrders[t]=i}apply(t,n,i,s,l,a,c){if(c==It.mixOut){a==ee.setup&&ge.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);return}if(i<this.frames[0]){(a==ee.setup||a==ee.first)&&ge.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);return}let o=at.search1(this.frames,i),h=this.drawOrders[o];if(!h)ge.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);else{let d=t.drawOrder,u=t.slots;for(let f=0,g=h.length;f<g;f++)d[f]=u[h[f]]}}};v(br,"propertyIds",[""+ke.drawOrder]);let ts=br;class t0 extends gn{constructor(t,n,i){super(t,n,[ke.ikConstraint+"|"+i]);v(this,"constraintIndex",0);this.constraintIndex=i}getFrameEntries(){return 6}setFrame(t,n,i,s,l,a,c){t*=6,this.frames[t]=n,this.frames[t+1]=i,this.frames[t+2]=s,this.frames[t+3]=l,this.frames[t+4]=a?1:0,this.frames[t+5]=c?1:0}apply(t,n,i,s,l,a,c){let o=t.ikConstraints[this.constraintIndex];if(!o.active)return;let h=this.frames;if(i<h[0]){switch(a){case ee.setup:o.mix=o.data.mix,o.softness=o.data.softness,o.bendDirection=o.data.bendDirection,o.compress=o.data.compress,o.stretch=o.data.stretch;return;case ee.first:o.mix+=(o.data.mix-o.mix)*l,o.softness+=(o.data.softness-o.softness)*l,o.bendDirection=o.data.bendDirection,o.compress=o.data.compress,o.stretch=o.data.stretch}return}let d=0,u=0,f=at.search(h,i,6),g=this.curves[f/6];switch(g){case 0:let _=h[f];d=h[f+1],u=h[f+2];let p=(i-_)/(h[f+6]-_);d+=(h[f+6+1]-d)*p,u+=(h[f+6+2]-u)*p;break;case 1:d=h[f+1],u=h[f+2];break;default:d=this.getBezierValue(i,f,1,g-2),u=this.getBezierValue(i,f,2,g+18-2)}a==ee.setup?(o.mix=o.data.mix+(d-o.data.mix)*l,o.softness=o.data.softness+(u-o.data.softness)*l,c==It.mixOut?(o.bendDirection=o.data.bendDirection,o.compress=o.data.compress,o.stretch=o.data.stretch):(o.bendDirection=h[f+3],o.compress=h[f+4]!=0,o.stretch=h[f+5]!=0)):(o.mix+=(d-o.mix)*l,o.softness+=(u-o.softness)*l,c==It.mixIn&&(o.bendDirection=h[f+3],o.compress=h[f+4]!=0,o.stretch=h[f+5]!=0))}}class n0 extends gn{constructor(t,n,i){super(t,n,[ke.transformConstraint+"|"+i]);v(this,"constraintIndex",0);this.constraintIndex=i}getFrameEntries(){return 7}setFrame(t,n,i,s,l,a,c,o){let h=this.frames;t*=7,h[t]=n,h[t+1]=i,h[t+2]=s,h[t+3]=l,h[t+4]=a,h[t+5]=c,h[t+6]=o}apply(t,n,i,s,l,a,c){let o=t.transformConstraints[this.constraintIndex];if(!o.active)return;let h=this.frames;if(i<h[0]){let x=o.data;switch(a){case ee.setup:o.mixRotate=x.mixRotate,o.mixX=x.mixX,o.mixY=x.mixY,o.mixScaleX=x.mixScaleX,o.mixScaleY=x.mixScaleY,o.mixShearY=x.mixShearY;return;case ee.first:o.mixRotate+=(x.mixRotate-o.mixRotate)*l,o.mixX+=(x.mixX-o.mixX)*l,o.mixY+=(x.mixY-o.mixY)*l,o.mixScaleX+=(x.mixScaleX-o.mixScaleX)*l,o.mixScaleY+=(x.mixScaleY-o.mixScaleY)*l,o.mixShearY+=(x.mixShearY-o.mixShearY)*l}return}let d,u,f,g,_,p,m=at.search(h,i,7),y=this.curves[m/7];switch(y){case 0:let x=h[m];d=h[m+1],u=h[m+2],f=h[m+3],g=h[m+4],_=h[m+5],p=h[m+6];let M=(i-x)/(h[m+7]-x);d+=(h[m+7+1]-d)*M,u+=(h[m+7+2]-u)*M,f+=(h[m+7+3]-f)*M,g+=(h[m+7+4]-g)*M,_+=(h[m+7+5]-_)*M,p+=(h[m+7+6]-p)*M;break;case 1:d=h[m+1],u=h[m+2],f=h[m+3],g=h[m+4],_=h[m+5],p=h[m+6];break;default:d=this.getBezierValue(i,m,1,y-2),u=this.getBezierValue(i,m,2,y+18-2),f=this.getBezierValue(i,m,3,y+18*2-2),g=this.getBezierValue(i,m,4,y+18*3-2),_=this.getBezierValue(i,m,5,y+18*4-2),p=this.getBezierValue(i,m,6,y+18*5-2)}if(a==ee.setup){let x=o.data;o.mixRotate=x.mixRotate+(d-x.mixRotate)*l,o.mixX=x.mixX+(u-x.mixX)*l,o.mixY=x.mixY+(f-x.mixY)*l,o.mixScaleX=x.mixScaleX+(g-x.mixScaleX)*l,o.mixScaleY=x.mixScaleY+(_-x.mixScaleY)*l,o.mixShearY=x.mixShearY+(p-x.mixShearY)*l}else o.mixRotate+=(d-o.mixRotate)*l,o.mixX+=(u-o.mixX)*l,o.mixY+=(f-o.mixY)*l,o.mixScaleX+=(g-o.mixScaleX)*l,o.mixScaleY+=(_-o.mixScaleY)*l,o.mixShearY+=(p-o.mixShearY)*l}}class i0 extends ln{constructor(t,n,i){super(t,n,ke.pathConstraintPosition+"|"+i);v(this,"constraintIndex",0);this.constraintIndex=i}apply(t,n,i,s,l,a,c){let o=t.pathConstraints[this.constraintIndex];o.active&&(o.position=this.getAbsoluteValue(i,l,a,o.position,o.data.position))}}class s0 extends ln{constructor(t,n,i){super(t,n,ke.pathConstraintSpacing+"|"+i);v(this,"constraintIndex",0);this.constraintIndex=i}apply(t,n,i,s,l,a,c){let o=t.pathConstraints[this.constraintIndex];o.active&&(o.spacing=this.getAbsoluteValue(i,l,a,o.spacing,o.data.spacing))}}class r0 extends gn{constructor(t,n,i){super(t,n,[ke.pathConstraintMix+"|"+i]);v(this,"constraintIndex",0);this.constraintIndex=i}getFrameEntries(){return 4}setFrame(t,n,i,s,l){let a=this.frames;t<<=2,a[t]=n,a[t+1]=i,a[t+2]=s,a[t+3]=l}apply(t,n,i,s,l,a,c){let o=t.pathConstraints[this.constraintIndex];if(!o.active)return;let h=this.frames;if(i<h[0]){switch(a){case ee.setup:o.mixRotate=o.data.mixRotate,o.mixX=o.data.mixX,o.mixY=o.data.mixY;return;case ee.first:o.mixRotate+=(o.data.mixRotate-o.mixRotate)*l,o.mixX+=(o.data.mixX-o.mixX)*l,o.mixY+=(o.data.mixY-o.mixY)*l}return}let d,u,f,g=at.search(h,i,4),_=this.curves[g>>2];switch(_){case 0:let p=h[g];d=h[g+1],u=h[g+2],f=h[g+3];let m=(i-p)/(h[g+4]-p);d+=(h[g+4+1]-d)*m,u+=(h[g+4+2]-u)*m,f+=(h[g+4+3]-f)*m;break;case 1:d=h[g+1],u=h[g+2],f=h[g+3];break;default:d=this.getBezierValue(i,g,1,_-2),u=this.getBezierValue(i,g,2,_+18-2),f=this.getBezierValue(i,g,3,_+18*2-2)}if(a==ee.setup){let p=o.data;o.mixRotate=p.mixRotate+(d-p.mixRotate)*l,o.mixX=p.mixX+(u-p.mixX)*l,o.mixY=p.mixY+(f-p.mixY)*l}else o.mixRotate+=(d-o.mixRotate)*l,o.mixX+=(u-o.mixX)*l,o.mixY+=(f-o.mixY)*l}}class Ci extends ln{constructor(t,n,i,s){super(t,n,s+"|"+i);v(this,"constraintIndex",0);this.constraintIndex=i}apply(t,n,i,s,l,a,c){let o;if(this.constraintIndex==-1){const h=i>=this.frames[0]?this.getCurveValue(i):0;for(const d of t.physicsConstraints)d.active&&this.global(d.data)&&this.set(d,this.getAbsoluteValue2(i,l,a,this.get(d),this.setup(d),h))}else o=t.physicsConstraints[this.constraintIndex],o.active&&this.set(o,this.getAbsoluteValue(i,l,a,this.get(o),this.setup(o)))}}class a0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintInertia)}setup(e){return e.data.inertia}get(e){return e.inertia}set(e,t){e.inertia=t}global(e){return e.inertiaGlobal}}class o0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintStrength)}setup(e){return e.data.strength}get(e){return e.strength}set(e,t){e.strength=t}global(e){return e.strengthGlobal}}class l0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintDamping)}setup(e){return e.data.damping}get(e){return e.damping}set(e,t){e.damping=t}global(e){return e.dampingGlobal}}class c0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintMass)}setup(e){return 1/e.data.massInverse}get(e){return 1/e.massInverse}set(e,t){e.massInverse=1/t}global(e){return e.massGlobal}}class h0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintWind)}setup(e){return e.data.wind}get(e){return e.wind}set(e,t){e.wind=t}global(e){return e.windGlobal}}class d0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintGravity)}setup(e){return e.data.gravity}get(e){return e.gravity}set(e,t){e.gravity=t}global(e){return e.gravityGlobal}}class u0 extends Ci{constructor(e,t,n){super(e,t,n,ke.physicsConstraintMix)}setup(e){return e.data.mix}get(e){return e.mix}set(e,t){e.mix=t}global(e){return e.mixGlobal}}const Tr=class Tr extends at{constructor(t,n){super(t,Tr.propertyIds);v(this,"constraintIndex");this.constraintIndex=n}getFrameCount(){return this.frames.length}setFrame(t,n){this.frames[t]=n}apply(t,n,i,s,l,a,c){let o;if(this.constraintIndex!=-1&&(o=t.physicsConstraints[this.constraintIndex],!o.active))return;const h=this.frames;if(n>i)this.apply(t,n,Number.MAX_VALUE,[],l,a,c),n=-1;else if(n>=h[h.length-1])return;if(!(i<h[0])&&(n<h[0]||i>=h[at.search1(h,n)+1]))if(o!=null)o.reset();else for(const d of t.physicsConstraints)d.active&&d.reset()}};v(Tr,"propertyIds",[ke.physicsConstraintReset.toString()]);let ka=Tr;const jt=class jt extends at{constructor(t,n,i){super(t,[ke.sequence+"|"+n+"|"+i.sequence.id]);v(this,"slotIndex");v(this,"attachment");this.slotIndex=n,this.attachment=i}getFrameEntries(){return jt.ENTRIES}getSlotIndex(){return this.slotIndex}getAttachment(){return this.attachment}setFrame(t,n,i,s,l){let a=this.frames;t*=jt.ENTRIES,a[t]=n,a[t+jt.MODE]=i|s<<4,a[t+jt.DELAY]=l}apply(t,n,i,s,l,a,c){let o=t.slots[this.slotIndex];if(!o.bone.active)return;let h=o.attachment,d=this.attachment;if(h!=d&&(!(h instanceof on)||h.timelineAttachment!=d))return;if(c==It.mixOut){a==ee.setup&&(o.sequenceIndex=-1);return}let u=this.frames;if(i<u[0]){(a==ee.setup||a==ee.first)&&(o.sequenceIndex=-1);return}let f=at.search(u,i,jt.ENTRIES),g=u[f],_=u[f+jt.MODE],p=u[f+jt.DELAY];if(!this.attachment.sequence)return;let m=_>>4,y=this.attachment.sequence.regions.length,x=Bg[_&15];if(x!=At.hold)switch(m+=(i-g)/p+1e-5|0,x){case At.once:m=Math.min(y-1,m);break;case At.loop:m%=y;break;case At.pingpong:{let M=(y<<1)-2;m=M==0?0:m%M,m>=y&&(m=M-m);break}case At.onceReverse:m=Math.max(y-1-m,0);break;case At.loopReverse:m=y-1-m%y;break;case At.pingpongReverse:{let M=(y<<1)-2;m=M==0?0:(m+y-1)%M,m>=y&&(m=M-m)}}o.sequenceIndex=m}};v(jt,"ENTRIES",3),v(jt,"MODE",1),v(jt,"DELAY",2);let za=jt;const Ji=class Ji{constructor(e){v(this,"data");v(this,"tracks",new Array);v(this,"timeScale",1);v(this,"unkeyedState",0);v(this,"events",new Array);v(this,"listeners",new Array);v(this,"queue",new p0(this));v(this,"propertyIDs",new Pc);v(this,"animationsChanged",!1);v(this,"trackEntryPool",new Fa(()=>new f0));this.data=e}static emptyAnimation(){return Ji._emptyAnimation}update(e){e*=this.timeScale;let t=this.tracks;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(!s)continue;s.animationLast=s.nextAnimationLast,s.trackLast=s.nextTrackLast;let l=e*s.timeScale;if(s.delay>0){if(s.delay-=l,s.delay>0)continue;l=-s.delay,s.delay=0}let a=s.next;if(a){let c=s.trackLast-a.delay;if(c>=0){for(a.delay=0,a.trackTime+=s.timeScale==0?0:(c/s.timeScale+e)*a.timeScale,s.trackTime+=l,this.setCurrent(n,a,!0);a.mixingFrom;)a.mixTime+=e,a=a.mixingFrom;continue}}else if(s.trackLast>=s.trackEnd&&!s.mixingFrom){t[n]=null,this.queue.end(s),this.clearNext(s);continue}if(s.mixingFrom&&this.updateMixingFrom(s,e)){let c=s.mixingFrom;for(s.mixingFrom=null,c&&(c.mixingTo=null);c;)this.queue.end(c),c=c.mixingFrom}s.trackTime+=l}this.queue.drain()}updateMixingFrom(e,t){let n=e.mixingFrom;if(!n)return!0;let i=this.updateMixingFrom(n,t);if(n.animationLast=n.nextAnimationLast,n.trackLast=n.nextTrackLast,e.nextTrackLast!=-1){const s=e.mixTime==0&&n.mixTime==0;if(e.mixTime>=e.mixDuration||s)return(n.totalAlpha==0||e.mixDuration==0||s)&&(e.mixingFrom=n.mixingFrom,n.mixingFrom!=null&&(n.mixingFrom.mixingTo=e),e.interruptAlpha=n.interruptAlpha,this.queue.end(n)),i}return n.trackTime+=t*n.timeScale,e.mixTime+=t,!1}apply(e){if(!e)throw new Error("skeleton cannot be null.");this.animationsChanged&&this._animationsChanged();let t=this.events,n=this.tracks,i=!1;for(let u=0,f=n.length;u<f;u++){let g=n[u];if(!g||g.delay>0)continue;i=!0;let _=u==0?ee.first:g.mixBlend,p=g.alpha;g.mixingFrom?p*=this.applyMixingFrom(g,e,_):g.trackTime>=g.trackEnd&&!g.next&&(p=0);let m=p>=g.alphaAttachmentThreshold,y=g.animationLast,x=g.getAnimationTime(),M=x,b=t;g.reverse&&(M=g.animation.duration-M,b=null);let S=g.animation.timelines,w=S.length;if(u==0&&p==1||_==ee.add){u==0&&(m=!0);for(let R=0;R<w;R++){var s=S[R];s instanceof ys?this.applyAttachmentTimeline(s,e,M,_,m):s.apply(e,y,M,b,p,_,It.mixIn)}}else{let R=g.timelineMode,I=g.shortestRotation,E=!I&&g.timelinesRotation.length!=w<<1;E&&(g.timelinesRotation.length=w<<1);for(let A=0;A<w;A++){let H=S[A],B=R[A]==Ma?_:ee.setup;!I&&H instanceof Ba?this.applyRotateTimeline(H,e,M,p,B,g.timelinesRotation,A<<1,E):H instanceof ys?this.applyAttachmentTimeline(H,e,M,_,m):H.apply(e,y,M,b,p,B,It.mixIn)}}this.queueEvents(g,x),t.length=0,g.nextAnimationLast=x,g.nextTrackLast=g.trackTime}for(var l=this.unkeyedState+Pl,a=e.slots,c=0,o=e.slots.length;c<o;c++){var h=a[c];if(h.attachmentState==l){var d=h.data.attachmentName;h.setAttachment(d?e.getAttachment(h.data.index,d):null)}}return this.unkeyedState+=2,this.queue.drain(),i}applyMixingFrom(e,t,n){let i=e.mixingFrom;i.mixingFrom&&this.applyMixingFrom(i,t,n);let s=0;e.mixDuration==0?(s=1,n==ee.first&&(n=ee.setup)):(s=e.mixTime/e.mixDuration,s>1&&(s=1),n!=ee.first&&(n=i.mixBlend));let l=s<i.mixAttachmentThreshold,a=s<i.mixDrawOrderThreshold,c=i.animation.timelines,o=c.length,h=i.alpha*e.interruptAlpha,d=h*(1-s),u=i.animationLast,f=i.getAnimationTime(),g=f,_=null;if(i.reverse?g=i.animation.duration-g:s<i.eventThreshold&&(_=this.events),n==ee.add)for(let p=0;p<o;p++)c[p].apply(t,u,g,_,d,n,It.mixOut);else{let p=i.timelineMode,m=i.timelineHoldMix,y=i.shortestRotation,x=!y&&i.timelinesRotation.length!=o<<1;x&&(i.timelinesRotation.length=o<<1),i.totalAlpha=0;for(let M=0;M<o;M++){let b=c[M],S=It.mixOut,w,R=0;switch(p[M]){case Ma:if(!a&&b instanceof ts)continue;w=n,R=d;break;case Rl:w=ee.setup,R=d;break;case Ll:w=n,R=h;break;case Sa:w=ee.setup,R=h;break;default:w=ee.setup;let I=m[M];R=h*Math.max(0,1-I.mixTime/I.mixDuration);break}i.totalAlpha+=R,!y&&b instanceof Ba?this.applyRotateTimeline(b,t,g,R,w,i.timelinesRotation,M<<1,x):b instanceof ys?this.applyAttachmentTimeline(b,t,g,w,l&&R>=i.alphaAttachmentThreshold):(a&&b instanceof ts&&w==ee.setup&&(S=It.mixIn),b.apply(t,u,g,_,R,w,S))}}return e.mixDuration>0&&this.queueEvents(i,f),this.events.length=0,i.nextAnimationLast=f,i.nextTrackLast=i.trackTime,s}applyAttachmentTimeline(e,t,n,i,s){var l=t.slots[e.slotIndex];l.bone.active&&(n<e.frames[0]?(i==ee.setup||i==ee.first)&&this.setAttachment(t,l,l.data.attachmentName,s):this.setAttachment(t,l,e.attachmentNames[at.search1(e.frames,n)],s),l.attachmentState<=this.unkeyedState&&(l.attachmentState=this.unkeyedState+Pl))}setAttachment(e,t,n,i){t.setAttachment(n?e.getAttachment(t.data.index,n):null),i&&(t.attachmentState=this.unkeyedState+g0)}applyRotateTimeline(e,t,n,i,s,l,a,c){if(c&&(l[a]=0),i==1){e.apply(t,0,n,null,1,s,It.mixIn);return}let o=t.bones[e.boneIndex];if(!o.active)return;let h=e.frames,d=0,u=0;if(n<h[0])switch(s){case ee.setup:o.rotation=o.data.rotation;default:return;case ee.first:d=o.rotation,u=o.data.rotation}else d=s==ee.setup?o.data.rotation:o.rotation,u=o.data.rotation+e.getCurveValue(n);let f=0,g=u-d;if(g-=Math.ceil(g/360-.5)*360,g==0)f=l[a];else{let _=0,p=0;c?(_=0,p=g):(_=l[a],p=l[a+1]);let m=_-_%360;f=g+m;let y=g>=0,x=_>=0;Math.abs(p)<=90&&le.signum(p)!=le.signum(g)&&(Math.abs(_-m)>180?(f+=360*le.signum(_),x=y):m!=0?f-=360*le.signum(_):x=y),x!=y&&(f+=360*le.signum(_)),l[a]=f}l[a+1]=g,o.rotation=d+f*i}queueEvents(e,t){let n=e.animationStart,i=e.animationEnd,s=i-n,l=e.trackLast%s,a=this.events,c=0,o=a.length;for(;c<o;c++){let d=a[c];if(d.time<l)break;d.time>i||this.queue.event(e,d)}let h=!1;if(e.loop)if(s==0)h=!0;else{const d=Math.floor(e.trackTime/s);h=d>0&&d>Math.floor(e.trackLast/s)}else h=t>=i&&e.animationLast<i;for(h&&this.queue.complete(e);c<o;c++){let d=a[c];d.time<n||this.queue.event(e,d)}}clearTracks(){let e=this.queue.drainDisabled;this.queue.drainDisabled=!0;for(let t=0,n=this.tracks.length;t<n;t++)this.clearTrack(t);this.tracks.length=0,this.queue.drainDisabled=e,this.queue.drain()}clearTrack(e){if(e>=this.tracks.length)return;let t=this.tracks[e];if(!t)return;this.queue.end(t),this.clearNext(t);let n=t;for(;;){let i=n.mixingFrom;if(!i)break;this.queue.end(i),n.mixingFrom=null,n.mixingTo=null,n=i}this.tracks[t.trackIndex]=null,this.queue.drain()}setCurrent(e,t,n){let i=this.expandToIndex(e);this.tracks[e]=t,t.previous=null,i&&(n&&this.queue.interrupt(i),t.mixingFrom=i,i.mixingTo=t,t.mixTime=0,i.mixingFrom&&i.mixDuration>0&&(t.interruptAlpha*=Math.min(1,i.mixTime/i.mixDuration)),i.timelinesRotation.length=0),this.queue.start(t)}setAnimation(e,t,n=!1){let i=this.data.skeletonData.findAnimation(t);if(!i)throw new Error("Animation not found: "+t);return this.setAnimationWith(e,i,n)}setAnimationWith(e,t,n=!1){if(!t)throw new Error("animation cannot be null.");let i=!0,s=this.expandToIndex(e);s&&(s.nextTrackLast==-1?(this.tracks[e]=s.mixingFrom,this.queue.interrupt(s),this.queue.end(s),this.clearNext(s),s=s.mixingFrom,i=!1):this.clearNext(s));let l=this.trackEntry(e,t,n,s);return this.setCurrent(e,l,i),this.queue.drain(),l}addAnimation(e,t,n=!1,i=0){let s=this.data.skeletonData.findAnimation(t);if(!s)throw new Error("Animation not found: "+t);return this.addAnimationWith(e,s,n,i)}addAnimationWith(e,t,n=!1,i=0){if(!t)throw new Error("animation cannot be null.");let s=this.expandToIndex(e);if(s)for(;s.next;)s=s.next;let l=this.trackEntry(e,t,n,s);return s?(s.next=l,l.previous=s,i<=0&&(i+=s.getTrackComplete()-l.mixDuration)):(this.setCurrent(e,l,!0),this.queue.drain()),l.delay=i,l}setEmptyAnimation(e,t=0){let n=this.setAnimationWith(e,Ji.emptyAnimation(),!1);return n.mixDuration=t,n.trackEnd=t,n}addEmptyAnimation(e,t=0,n=0){let i=this.addAnimationWith(e,Ji.emptyAnimation(),!1,n);return n<=0&&(i.delay+=i.mixDuration-t),i.mixDuration=t,i.trackEnd=t,i}setEmptyAnimations(e=0){let t=this.queue.drainDisabled;this.queue.drainDisabled=!0;for(let n=0,i=this.tracks.length;n<i;n++){let s=this.tracks[n];s&&this.setEmptyAnimation(s.trackIndex,e)}this.queue.drainDisabled=t,this.queue.drain()}expandToIndex(e){return e<this.tracks.length?this.tracks[e]:(ge.ensureArrayCapacity(this.tracks,e+1,null),this.tracks.length=e+1,null)}trackEntry(e,t,n,i){let s=this.trackEntryPool.obtain();return s.reset(),s.trackIndex=e,s.animation=t,s.loop=n,s.holdPrevious=!1,s.reverse=!1,s.shortestRotation=!1,s.eventThreshold=0,s.alphaAttachmentThreshold=0,s.mixAttachmentThreshold=0,s.mixDrawOrderThreshold=0,s.animationStart=0,s.animationEnd=t.duration,s.animationLast=-1,s.nextAnimationLast=-1,s.delay=0,s.trackTime=0,s.trackLast=-1,s.nextTrackLast=-1,s.trackEnd=Number.MAX_VALUE,s.timeScale=1,s.alpha=1,s.mixTime=0,s.mixDuration=i?this.data.getMix(i.animation,t):0,s.interruptAlpha=1,s.totalAlpha=0,s.mixBlend=ee.replace,s}clearNext(e){let t=e.next;for(;t;)this.queue.dispose(t),t=t.next;e.next=null}_animationsChanged(){this.animationsChanged=!1,this.propertyIDs.clear();let e=this.tracks;for(let t=0,n=e.length;t<n;t++){let i=e[t];if(i){for(;i.mixingFrom;)i=i.mixingFrom;do(!i.mixingTo||i.mixBlend!=ee.add)&&this.computeHold(i),i=i.mixingTo;while(i)}}}computeHold(e){let t=e.mixingTo,n=e.animation.timelines,i=e.animation.timelines.length,s=e.timelineMode;s.length=i;let l=e.timelineHoldMix;l.length=0;let a=this.propertyIDs;if(t&&t.holdPrevious){for(let c=0;c<i;c++)s[c]=a.addAll(n[c].getPropertyIds())?Sa:Ll;return}e:for(let c=0;c<i;c++){let o=n[c],h=o.getPropertyIds();if(!a.addAll(h))s[c]=Ma;else if(!t||o instanceof ys||o instanceof ts||o instanceof Mr||!t.animation.hasTimeline(h))s[c]=Rl;else{for(let d=t.mixingTo;d;d=d.mixingTo)if(!d.animation.hasTimeline(h)){if(e.mixDuration>0){s[c]=m0,l[c]=d;continue e}break}s[c]=Sa}}}getCurrent(e){return e>=this.tracks.length?null:this.tracks[e]}addListener(e){if(!e)throw new Error("listener cannot be null.");this.listeners.push(e)}removeListener(e){let t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}clearListeners(){this.listeners.length=0}clearListenerNotifications(){this.queue.clear()}};v(Ji,"_emptyAnimation",new Dc("<empty>",[],0));let Ga=Ji;class f0{constructor(){v(this,"animation",null);v(this,"previous",null);v(this,"next",null);v(this,"mixingFrom",null);v(this,"mixingTo",null);v(this,"listener",null);v(this,"trackIndex",0);v(this,"loop",!1);v(this,"holdPrevious",!1);v(this,"reverse",!1);v(this,"shortestRotation",!1);v(this,"eventThreshold",0);v(this,"mixAttachmentThreshold",0);v(this,"alphaAttachmentThreshold",0);v(this,"mixDrawOrderThreshold",0);v(this,"animationStart",0);v(this,"animationEnd",0);v(this,"animationLast",0);v(this,"nextAnimationLast",0);v(this,"delay",0);v(this,"trackTime",0);v(this,"trackLast",0);v(this,"nextTrackLast",0);v(this,"trackEnd",0);v(this,"timeScale",0);v(this,"alpha",0);v(this,"mixTime",0);v(this,"_mixDuration",0);v(this,"interruptAlpha",0);v(this,"totalAlpha",0);v(this,"mixBlend",ee.replace);v(this,"timelineMode",new Array);v(this,"timelineHoldMix",new Array);v(this,"timelinesRotation",new Array)}get mixDuration(){return this._mixDuration}set mixDuration(e){this._mixDuration=e}setMixDurationWithDelay(e,t){this._mixDuration=e,this.previous!=null&&t<=0&&(t+=this.previous.getTrackComplete()-e),this.delay=t}reset(){this.next=null,this.previous=null,this.mixingFrom=null,this.mixingTo=null,this.animation=null,this.listener=null,this.timelineMode.length=0,this.timelineHoldMix.length=0,this.timelinesRotation.length=0}getAnimationTime(){if(this.loop){let e=this.animationEnd-this.animationStart;return e==0?this.animationStart:this.trackTime%e+this.animationStart}return Math.min(this.trackTime+this.animationStart,this.animationEnd)}setAnimationLast(e){this.animationLast=e,this.nextAnimationLast=e}isComplete(){return this.trackTime>=this.animationEnd-this.animationStart}resetRotationDirections(){this.timelinesRotation.length=0}getTrackComplete(){let e=this.animationEnd-this.animationStart;if(e!=0){if(this.loop)return e*(1+(this.trackTime/e|0));if(this.trackTime<e)return e}return this.trackTime}wasApplied(){return this.nextTrackLast!=-1}isNextReady(){return this.next!=null&&this.nextTrackLast-this.next.delay>=0}}class p0{constructor(e){v(this,"objects",[]);v(this,"drainDisabled",!1);v(this,"animState");this.animState=e}start(e){this.objects.push(Ot.start),this.objects.push(e),this.animState.animationsChanged=!0}interrupt(e){this.objects.push(Ot.interrupt),this.objects.push(e)}end(e){this.objects.push(Ot.end),this.objects.push(e),this.animState.animationsChanged=!0}dispose(e){this.objects.push(Ot.dispose),this.objects.push(e)}complete(e){this.objects.push(Ot.complete),this.objects.push(e)}event(e,t){this.objects.push(Ot.event),this.objects.push(e),this.objects.push(t)}drain(){if(this.drainDisabled)return;this.drainDisabled=!0;let e=this.objects,t=this.animState.listeners;for(let n=0;n<e.length;n+=2){let i=e[n],s=e[n+1];switch(i){case Ot.start:s.listener&&s.listener.start&&s.listener.start(s);for(let a=0;a<t.length;a++){let c=t[a];c.start&&c.start(s)}break;case Ot.interrupt:s.listener&&s.listener.interrupt&&s.listener.interrupt(s);for(let a=0;a<t.length;a++){let c=t[a];c.interrupt&&c.interrupt(s)}break;case Ot.end:s.listener&&s.listener.end&&s.listener.end(s);for(let a=0;a<t.length;a++){let c=t[a];c.end&&c.end(s)}case Ot.dispose:s.listener&&s.listener.dispose&&s.listener.dispose(s);for(let a=0;a<t.length;a++){let c=t[a];c.dispose&&c.dispose(s)}this.animState.trackEntryPool.free(s);break;case Ot.complete:s.listener&&s.listener.complete&&s.listener.complete(s);for(let a=0;a<t.length;a++){let c=t[a];c.complete&&c.complete(s)}break;case Ot.event:let l=e[n+++2];s.listener&&s.listener.event&&s.listener.event(s,l);for(let a=0;a<t.length;a++){let c=t[a];c.event&&c.event(s,l)}break}}this.clear(),this.drainDisabled=!1}clear(){this.objects.length=0}}var Ot;(function(r){r[r.start=0]="start",r[r.interrupt=1]="interrupt",r[r.end=2]="end",r[r.dispose=3]="dispose",r[r.complete=4]="complete",r[r.event=5]="event"})(Ot||(Ot={}));const Ma=0,Rl=1,Ll=2,Sa=3,m0=4,Pl=1,g0=2;class _0{constructor(e){v(this,"skeletonData");v(this,"animationToMixTime",{});v(this,"defaultMix",0);if(!e)throw new Error("skeletonData cannot be null.");this.skeletonData=e}setMix(e,t,n){let i=this.skeletonData.findAnimation(e);if(!i)throw new Error("Animation not found: "+e);let s=this.skeletonData.findAnimation(t);if(!s)throw new Error("Animation not found: "+t);this.setMixWith(i,s,n)}setMixWith(e,t,n){if(!e)throw new Error("from cannot be null.");if(!t)throw new Error("to cannot be null.");let i=e.name+"."+t.name;this.animationToMixTime[i]=n}getMix(e,t){let n=e.name+"."+t.name,i=this.animationToMixTime[n];return i===void 0?this.defaultMix:i}}class Qa extends on{constructor(t){super(t);v(this,"color",new Je(1,1,1,1))}copy(){let t=new Qa(this.name);return this.copyTo(t),t.color.setFromColor(this.color),t}}class Ps extends on{constructor(t){super(t);v(this,"endSlot",null);v(this,"color",new Je(.2275,.2275,.8078,1))}copy(){let t=new Ps(this.name);return this.copyTo(t),t.endSlot=this.endSlot,t.color.setFromColor(this.color),t}}class x0{constructor(e){v(this,"_image");this._image=e}getImage(){return this._image}}var wt;(function(r){r[r.Nearest=9728]="Nearest",r[r.Linear=9729]="Linear",r[r.MipMap=9987]="MipMap",r[r.MipMapNearestNearest=9984]="MipMapNearestNearest",r[r.MipMapLinearNearest=9985]="MipMapLinearNearest",r[r.MipMapNearestLinear=9986]="MipMapNearestLinear",r[r.MipMapLinearLinear=9987]="MipMapLinearLinear"})(wt||(wt={}));var Cn;(function(r){r[r.MirroredRepeat=33648]="MirroredRepeat",r[r.ClampToEdge=33071]="ClampToEdge",r[r.Repeat=10497]="Repeat"})(Cn||(Cn={}));class v0{constructor(){v(this,"texture");v(this,"u",0);v(this,"v",0);v(this,"u2",0);v(this,"v2",0);v(this,"width",0);v(this,"height",0);v(this,"degrees",0);v(this,"offsetX",0);v(this,"offsetY",0);v(this,"originalWidth",0);v(this,"originalHeight",0)}}class M0{constructor(e){v(this,"pages",new Array);v(this,"regions",new Array);let t=new S0(e),n=new Array(4),i={};i.size=h=>{h.width=parseInt(n[1]),h.height=parseInt(n[2])},i.format=()=>{},i.filter=h=>{h.minFilter=ge.enumValue(wt,n[1]),h.magFilter=ge.enumValue(wt,n[2])},i.repeat=h=>{n[1].indexOf("x")!=-1&&(h.uWrap=Cn.Repeat),n[1].indexOf("y")!=-1&&(h.vWrap=Cn.Repeat)},i.pma=h=>{h.pma=n[1]=="true"};var s={};s.xy=h=>{h.x=parseInt(n[1]),h.y=parseInt(n[2])},s.size=h=>{h.width=parseInt(n[1]),h.height=parseInt(n[2])},s.bounds=h=>{h.x=parseInt(n[1]),h.y=parseInt(n[2]),h.width=parseInt(n[3]),h.height=parseInt(n[4])},s.offset=h=>{h.offsetX=parseInt(n[1]),h.offsetY=parseInt(n[2])},s.orig=h=>{h.originalWidth=parseInt(n[1]),h.originalHeight=parseInt(n[2])},s.offsets=h=>{h.offsetX=parseInt(n[1]),h.offsetY=parseInt(n[2]),h.originalWidth=parseInt(n[3]),h.originalHeight=parseInt(n[4])},s.rotate=h=>{let d=n[1];d=="true"?h.degrees=90:d!="false"&&(h.degrees=parseInt(d))},s.index=h=>{h.index=parseInt(n[1])};let l=t.readLine();for(;l&&l.trim().length==0;)l=t.readLine();for(;!(!l||l.trim().length==0||t.readEntry(n,l)==0);)l=t.readLine();let a=null,c=null,o=null;for(;l!==null;)if(l.trim().length==0)a=null,l=t.readLine();else if(a){let h=new Uc(a,l);for(;;){let d=t.readEntry(n,l=t.readLine());if(d==0)break;let u=s[n[0]];if(u)u(h);else{c||(c=[]),o||(o=[]),c.push(n[0]);let f=[];for(let g=0;g<d;g++)f.push(parseInt(n[g+1]));o.push(f)}}h.originalWidth==0&&h.originalHeight==0&&(h.originalWidth=h.width,h.originalHeight=h.height),c&&c.length>0&&o&&o.length>0&&(h.names=c,h.values=o,c=null,o=null),h.u=h.x/a.width,h.v=h.y/a.height,h.degrees==90?(h.u2=(h.x+h.height)/a.width,h.v2=(h.y+h.width)/a.height):(h.u2=(h.x+h.width)/a.width,h.v2=(h.y+h.height)/a.height),this.regions.push(h)}else{for(a=new y0(l.trim());t.readEntry(n,l=t.readLine())!=0;){let h=i[n[0]];h&&h(a)}this.pages.push(a)}}findRegion(e){for(let t=0;t<this.regions.length;t++)if(this.regions[t].name==e)return this.regions[t];return null}setTextures(e,t=""){for(let n of this.pages)n.setTexture(e.get(t+n.name))}dispose(){var e;for(let t=0;t<this.pages.length;t++)(e=this.pages[t].texture)==null||e.dispose()}}class S0{constructor(e){v(this,"lines");v(this,"index",0);this.lines=e.split(/\r\n|\r|\n/)}readLine(){return this.index>=this.lines.length?null:this.lines[this.index++]}readEntry(e,t){if(!t||(t=t.trim(),t.length==0))return 0;let n=t.indexOf(":");if(n==-1)return 0;e[0]=t.substr(0,n).trim();for(let i=1,s=n+1;;i++){let l=t.indexOf(",",s);if(l==-1)return e[i]=t.substr(s).trim(),i;if(e[i]=t.substr(s,l-s).trim(),s=l+1,i==4)return 4}}}class y0{constructor(e){v(this,"name");v(this,"minFilter",wt.Nearest);v(this,"magFilter",wt.Nearest);v(this,"uWrap",Cn.ClampToEdge);v(this,"vWrap",Cn.ClampToEdge);v(this,"texture",null);v(this,"width",0);v(this,"height",0);v(this,"pma",!1);v(this,"regions",new Array);this.name=e}setTexture(e){this.texture=e,e.setFilters(this.minFilter,this.magFilter),e.setWraps(this.uWrap,this.vWrap);for(let t of this.regions)t.texture=e}}class Uc extends v0{constructor(t,n){super();v(this,"page");v(this,"name");v(this,"x",0);v(this,"y",0);v(this,"offsetX",0);v(this,"offsetY",0);v(this,"originalWidth",0);v(this,"originalHeight",0);v(this,"index",0);v(this,"degrees",0);v(this,"names",null);v(this,"values",null);this.page=t,this.name=n,t.regions.push(this)}}class Ai extends on{constructor(t,n){super(t);v(this,"region",null);v(this,"path");v(this,"regionUVs",[]);v(this,"uvs",[]);v(this,"triangles",[]);v(this,"color",new Je(1,1,1,1));v(this,"width",0);v(this,"height",0);v(this,"hullLength",0);v(this,"edges",[]);v(this,"parentMesh",null);v(this,"sequence",null);v(this,"tempColor",new Je(0,0,0,0));this.path=n}updateRegion(){if(!this.region)throw new Error("Region not set.");let t=this.regionUVs;(!this.uvs||this.uvs.length!=t.length)&&(this.uvs=ge.newFloatArray(t.length));let n=this.uvs,i=this.uvs.length,s=this.region.u,l=this.region.v,a=0,c=0;if(this.region instanceof Uc){let o=this.region,h=o.page,d=h.width,u=h.height;switch(o.degrees){case 90:s-=(o.originalHeight-o.offsetY-o.height)/d,l-=(o.originalWidth-o.offsetX-o.width)/u,a=o.originalHeight/d,c=o.originalWidth/u;for(let f=0;f<i;f+=2)n[f]=s+t[f+1]*a,n[f+1]=l+(1-t[f])*c;return;case 180:s-=(o.originalWidth-o.offsetX-o.width)/d,l-=o.offsetY/u,a=o.originalWidth/d,c=o.originalHeight/u;for(let f=0;f<i;f+=2)n[f]=s+(1-t[f])*a,n[f+1]=l+(1-t[f+1])*c;return;case 270:s-=o.offsetY/d,l-=o.offsetX/u,a=o.originalHeight/d,c=o.originalWidth/u;for(let f=0;f<i;f+=2)n[f]=s+(1-t[f+1])*a,n[f+1]=l+t[f]*c;return}s-=o.offsetX/d,l-=(o.originalHeight-o.offsetY-o.height)/u,a=o.originalWidth/d,c=o.originalHeight/u}else this.region?(a=this.region.u2-s,c=this.region.v2-l):(s=l=0,a=c=1);for(let o=0;o<i;o+=2)n[o]=s+t[o]*a,n[o+1]=l+t[o+1]*c}getParentMesh(){return this.parentMesh}setParentMesh(t){this.parentMesh=t,t&&(this.bones=t.bones,this.vertices=t.vertices,this.worldVerticesLength=t.worldVerticesLength,this.regionUVs=t.regionUVs,this.triangles=t.triangles,this.hullLength=t.hullLength,this.worldVerticesLength=t.worldVerticesLength)}copy(){if(this.parentMesh)return this.newLinkedMesh();let t=new Ai(this.name,this.path);return t.region=this.region,t.color.setFromColor(this.color),this.copyTo(t),t.regionUVs=new Array(this.regionUVs.length),ge.arrayCopy(this.regionUVs,0,t.regionUVs,0,this.regionUVs.length),t.uvs=new Array(this.uvs.length),ge.arrayCopy(this.uvs,0,t.uvs,0,this.uvs.length),t.triangles=new Array(this.triangles.length),ge.arrayCopy(this.triangles,0,t.triangles,0,this.triangles.length),t.hullLength=this.hullLength,t.sequence=this.sequence!=null?this.sequence.copy():null,this.edges&&(t.edges=new Array(this.edges.length),ge.arrayCopy(this.edges,0,t.edges,0,this.edges.length)),t.width=this.width,t.height=this.height,t}computeWorldVertices(t,n,i,s,l,a){this.sequence!=null&&this.sequence.apply(t,this),super.computeWorldVertices(t,n,i,s,l,a)}newLinkedMesh(){let t=new Ai(this.name,this.path);return t.region=this.region,t.color.setFromColor(this.color),t.timelineAttachment=this.timelineAttachment,t.setParentMesh(this.parentMesh?this.parentMesh:this),t.region!=null&&t.updateRegion(),t}}class ds extends on{constructor(t){super(t);v(this,"lengths",[]);v(this,"closed",!1);v(this,"constantSpeed",!1);v(this,"color",new Je(1,1,1,1))}copy(){let t=new ds(this.name);return this.copyTo(t),t.lengths=new Array(this.lengths.length),ge.arrayCopy(this.lengths,0,t.lengths,0,this.lengths.length),t.closed=closed,t.constantSpeed=this.constantSpeed,t.color.setFromColor(this.color),t}}class eo extends on{constructor(t){super(t);v(this,"x",0);v(this,"y",0);v(this,"rotation",0);v(this,"color",new Je(.38,.94,0,1))}computeWorldPosition(t,n){return n.x=this.x*t.a+this.y*t.b+t.worldX,n.y=this.x*t.c+this.y*t.d+t.worldY,n}computeWorldRotation(t){const n=this.rotation*le.degRad,i=Math.cos(n),s=Math.sin(n),l=i*t.a+s*t.b,a=i*t.c+s*t.d;return le.atan2Deg(a,l)}copy(){let t=new eo(this.name);return t.x=this.x,t.y=this.y,t.rotation=this.rotation,t.color.setFromColor(this.color),t}}const $e=class $e extends Ic{constructor(t,n){super(t);v(this,"x",0);v(this,"y",0);v(this,"scaleX",1);v(this,"scaleY",1);v(this,"rotation",0);v(this,"width",0);v(this,"height",0);v(this,"color",new Je(1,1,1,1));v(this,"path");v(this,"region",null);v(this,"sequence",null);v(this,"offset",ge.newFloatArray(8));v(this,"uvs",ge.newFloatArray(8));v(this,"tempColor",new Je(1,1,1,1));this.path=n}updateRegion(){if(!this.region)throw new Error("Region not set.");let t=this.region,n=this.uvs;if(t==null){n[0]=0,n[1]=0,n[2]=0,n[3]=1,n[4]=1,n[5]=1,n[6]=1,n[7]=0;return}let i=this.width/this.region.originalWidth*this.scaleX,s=this.height/this.region.originalHeight*this.scaleY,l=-this.width/2*this.scaleX+this.region.offsetX*i,a=-this.height/2*this.scaleY+this.region.offsetY*s,c=l+this.region.width*i,o=a+this.region.height*s,h=this.rotation*le.degRad,d=Math.cos(h),u=Math.sin(h),f=this.x,g=this.y,_=l*d+f,p=l*u,m=a*d+g,y=a*u,x=c*d+f,M=c*u,b=o*d+g,S=o*u,w=this.offset;w[0]=_-y,w[1]=m+p,w[2]=_-S,w[3]=b+p,w[4]=x-S,w[5]=b+M,w[6]=x-y,w[7]=m+M,t.degrees==90?(n[0]=t.u2,n[1]=t.v2,n[2]=t.u,n[3]=t.v2,n[4]=t.u,n[5]=t.v,n[6]=t.u2,n[7]=t.v):(n[0]=t.u,n[1]=t.v2,n[2]=t.u,n[3]=t.v,n[4]=t.u2,n[5]=t.v,n[6]=t.u2,n[7]=t.v2)}computeWorldVertices(t,n,i,s){this.sequence!=null&&this.sequence.apply(t,this);let l=t.bone,a=this.offset,c=l.worldX,o=l.worldY,h=l.a,d=l.b,u=l.c,f=l.d,g=0,_=0;g=a[0],_=a[1],n[i]=g*h+_*d+c,n[i+1]=g*u+_*f+o,i+=s,g=a[2],_=a[3],n[i]=g*h+_*d+c,n[i+1]=g*u+_*f+o,i+=s,g=a[4],_=a[5],n[i]=g*h+_*d+c,n[i+1]=g*u+_*f+o,i+=s,g=a[6],_=a[7],n[i]=g*h+_*d+c,n[i+1]=g*u+_*f+o}copy(){let t=new $e(this.name,this.path);return t.region=this.region,t.x=this.x,t.y=this.y,t.scaleX=this.scaleX,t.scaleY=this.scaleY,t.rotation=this.rotation,t.width=this.width,t.height=this.height,ge.arrayCopy(this.uvs,0,t.uvs,0,8),ge.arrayCopy(this.offset,0,t.offset,0,8),t.color.setFromColor(this.color),t.sequence=this.sequence!=null?this.sequence.copy():null,t}};v($e,"X1",0),v($e,"Y1",1),v($e,"C1R",2),v($e,"C1G",3),v($e,"C1B",4),v($e,"C1A",5),v($e,"U1",6),v($e,"V1",7),v($e,"X2",8),v($e,"Y2",9),v($e,"C2R",10),v($e,"C2G",11),v($e,"C2B",12),v($e,"C2A",13),v($e,"U2",14),v($e,"V2",15),v($e,"X3",16),v($e,"Y3",17),v($e,"C3R",18),v($e,"C3G",19),v($e,"C3B",20),v($e,"C3A",21),v($e,"U3",22),v($e,"V3",23),v($e,"X4",24),v($e,"Y4",25),v($e,"C4R",26),v($e,"C4G",27),v($e,"C4B",28),v($e,"C4A",29),v($e,"U4",30),v($e,"V4",31);let As=$e;class Ms{constructor(e){v(this,"atlas");this.atlas=e}loadSequence(e,t,n){let i=n.regions;for(let s=0,l=i.length;s<l;s++){let a=n.getPath(t,s),c=this.atlas.findRegion(a);if(c==null)throw new Error("Region not found in atlas: "+a+" (sequence: "+e+")");i[s]=c}}newRegionAttachment(e,t,n,i){let s=new As(t,n);if(i!=null)this.loadSequence(t,n,i);else{let l=this.atlas.findRegion(n);if(!l)throw new Error("Region not found in atlas: "+n+" (region attachment: "+t+")");s.region=l}return s}newMeshAttachment(e,t,n,i){let s=new Ai(t,n);if(i!=null)this.loadSequence(t,n,i);else{let l=this.atlas.findRegion(n);if(!l)throw new Error("Region not found in atlas: "+n+" (mesh attachment: "+t+")");s.region=l}return s}newBoundingBoxAttachment(e,t){return new Qa(t)}newPathAttachment(e,t){return new ds(t)}newPointAttachment(e,t){return new eo(t)}newClippingAttachment(e,t){return new Ps(t)}}class E0{constructor(e,t,n){v(this,"index",0);v(this,"name");v(this,"parent",null);v(this,"length",0);v(this,"x",0);v(this,"y",0);v(this,"rotation",0);v(this,"scaleX",1);v(this,"scaleY",1);v(this,"shearX",0);v(this,"shearY",0);v(this,"inherit",dt.Normal);v(this,"skinRequired",!1);v(this,"color",new Je);v(this,"icon");v(this,"visible",!1);if(e<0)throw new Error("index must be >= 0.");if(!t)throw new Error("name cannot be null.");this.index=e,this.name=t,this.parent=n}}var dt;(function(r){r[r.Normal=0]="Normal",r[r.OnlyTranslation=1]="OnlyTranslation",r[r.NoRotationOrReflection=2]="NoRotationOrReflection",r[r.NoScale=3]="NoScale",r[r.NoScaleOrReflection=4]="NoScaleOrReflection"})(dt||(dt={}));class Il{constructor(e,t,n){v(this,"data");v(this,"skeleton");v(this,"parent",null);v(this,"children",new Array);v(this,"x",0);v(this,"y",0);v(this,"rotation",0);v(this,"scaleX",0);v(this,"scaleY",0);v(this,"shearX",0);v(this,"shearY",0);v(this,"ax",0);v(this,"ay",0);v(this,"arotation",0);v(this,"ascaleX",0);v(this,"ascaleY",0);v(this,"ashearX",0);v(this,"ashearY",0);v(this,"a",0);v(this,"b",0);v(this,"c",0);v(this,"d",0);v(this,"worldY",0);v(this,"worldX",0);v(this,"inherit",dt.Normal);v(this,"sorted",!1);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.skeleton=t,this.parent=n,this.setToSetupPose()}isActive(){return this.active}update(e){this.updateWorldTransformWith(this.ax,this.ay,this.arotation,this.ascaleX,this.ascaleY,this.ashearX,this.ashearY)}updateWorldTransform(){this.updateWorldTransformWith(this.x,this.y,this.rotation,this.scaleX,this.scaleY,this.shearX,this.shearY)}updateWorldTransformWith(e,t,n,i,s,l,a){this.ax=e,this.ay=t,this.arotation=n,this.ascaleX=i,this.ascaleY=s,this.ashearX=l,this.ashearY=a;let c=this.parent;if(!c){let f=this.skeleton;const g=f.scaleX,_=f.scaleY,p=(n+l)*le.degRad,m=(n+90+a)*le.degRad;this.a=Math.cos(p)*i*g,this.b=Math.cos(m)*s*g,this.c=Math.sin(p)*i*_,this.d=Math.sin(m)*s*_,this.worldX=e*g+f.x,this.worldY=t*_+f.y;return}let o=c.a,h=c.b,d=c.c,u=c.d;switch(this.worldX=o*e+h*t+c.worldX,this.worldY=d*e+u*t+c.worldY,this.inherit){case dt.Normal:{const f=(n+l)*le.degRad,g=(n+90+a)*le.degRad,_=Math.cos(f)*i,p=Math.cos(g)*s,m=Math.sin(f)*i,y=Math.sin(g)*s;this.a=o*_+h*m,this.b=o*p+h*y,this.c=d*_+u*m,this.d=d*p+u*y;return}case dt.OnlyTranslation:{const f=(n+l)*le.degRad,g=(n+90+a)*le.degRad;this.a=Math.cos(f)*i,this.b=Math.cos(g)*s,this.c=Math.sin(f)*i,this.d=Math.sin(g)*s;break}case dt.NoRotationOrReflection:{let f=1/this.skeleton.scaleX,g=1/this.skeleton.scaleY;o*=f,d*=g;let _=o*o+d*d,p=0;_>1e-4?(_=Math.abs(o*u*g-h*f*d)/_,h=d*_,u=o*_,p=Math.atan2(d,o)*le.radDeg):(o=0,d=0,p=90-Math.atan2(u,h)*le.radDeg);const m=(n+l-p)*le.degRad,y=(n+a-p+90)*le.degRad,x=Math.cos(m)*i,M=Math.cos(y)*s,b=Math.sin(m)*i,S=Math.sin(y)*s;this.a=o*x-h*b,this.b=o*M-h*S,this.c=d*x+u*b,this.d=d*M+u*S;break}case dt.NoScale:case dt.NoScaleOrReflection:{n*=le.degRad;const f=Math.cos(n),g=Math.sin(n);let _=(o*f+h*g)/this.skeleton.scaleX,p=(d*f+u*g)/this.skeleton.scaleY,m=Math.sqrt(_*_+p*p);m>1e-5&&(m=1/m),_*=m,p*=m,m=Math.sqrt(_*_+p*p),this.inherit==dt.NoScale&&o*u-h*d<0!=(this.skeleton.scaleX<0!=this.skeleton.scaleY<0)&&(m=-m),n=Math.PI/2+Math.atan2(p,_);const y=Math.cos(n)*m,x=Math.sin(n)*m;l*=le.degRad,a=(90+a)*le.degRad;const M=Math.cos(l)*i,b=Math.cos(a)*s,S=Math.sin(l)*i,w=Math.sin(a)*s;this.a=_*M+y*S,this.b=_*b+y*w,this.c=p*M+x*S,this.d=p*b+x*w;break}}this.a*=this.skeleton.scaleX,this.b*=this.skeleton.scaleX,this.c*=this.skeleton.scaleY,this.d*=this.skeleton.scaleY}setToSetupPose(){let e=this.data;this.x=e.x,this.y=e.y,this.rotation=e.rotation,this.scaleX=e.scaleX,this.scaleY=e.scaleY,this.shearX=e.shearX,this.shearY=e.shearY,this.inherit=e.inherit}updateAppliedTransform(){let e=this.parent;if(!e){this.ax=this.worldX-this.skeleton.x,this.ay=this.worldY-this.skeleton.y,this.arotation=Math.atan2(this.c,this.a)*le.radDeg,this.ascaleX=Math.sqrt(this.a*this.a+this.c*this.c),this.ascaleY=Math.sqrt(this.b*this.b+this.d*this.d),this.ashearX=0,this.ashearY=Math.atan2(this.a*this.b+this.c*this.d,this.a*this.d-this.b*this.c)*le.radDeg;return}let t=e.a,n=e.b,i=e.c,s=e.d,l=1/(t*s-n*i),a=s*l,c=n*l,o=i*l,h=t*l,d=this.worldX-e.worldX,u=this.worldY-e.worldY;this.ax=d*a-u*c,this.ay=u*h-d*o;let f,g,_,p;if(this.inherit==dt.OnlyTranslation)f=this.a,g=this.b,_=this.c,p=this.d;else{switch(this.inherit){case dt.NoRotationOrReflection:{let b=Math.abs(t*s-n*i)/(t*t+i*i);n=-i*this.skeleton.scaleX*b/this.skeleton.scaleY,s=t*this.skeleton.scaleY*b/this.skeleton.scaleX,l=1/(t*s-n*i),a=s*l,c=n*l;break}case dt.NoScale:case dt.NoScaleOrReflection:let m=le.cosDeg(this.rotation),y=le.sinDeg(this.rotation);t=(t*m+n*y)/this.skeleton.scaleX,i=(i*m+s*y)/this.skeleton.scaleY;let x=Math.sqrt(t*t+i*i);x>1e-5&&(x=1/x),t*=x,i*=x,x=Math.sqrt(t*t+i*i),this.inherit==dt.NoScale&&l<0!=(this.skeleton.scaleX<0!=this.skeleton.scaleY<0)&&(x=-x);let M=le.PI/2+Math.atan2(i,t);n=Math.cos(M)*x,s=Math.sin(M)*x,l=1/(t*s-n*i),a=s*l,c=n*l,o=i*l,h=t*l}f=a*this.a-c*this.c,g=a*this.b-c*this.d,_=h*this.c-o*this.a,p=h*this.d-o*this.b}if(this.ashearX=0,this.ascaleX=Math.sqrt(f*f+_*_),this.ascaleX>1e-4){let m=f*p-g*_;this.ascaleY=m/this.ascaleX,this.ashearY=-Math.atan2(f*g+_*p,m)*le.radDeg,this.arotation=Math.atan2(_,f)*le.radDeg}else this.ascaleX=0,this.ascaleY=Math.sqrt(g*g+p*p),this.ashearY=0,this.arotation=90-Math.atan2(p,g)*le.radDeg}getWorldRotationX(){return Math.atan2(this.c,this.a)*le.radDeg}getWorldRotationY(){return Math.atan2(this.d,this.b)*le.radDeg}getWorldScaleX(){return Math.sqrt(this.a*this.a+this.c*this.c)}getWorldScaleY(){return Math.sqrt(this.b*this.b+this.d*this.d)}worldToLocal(e){let t=1/(this.a*this.d-this.b*this.c),n=e.x-this.worldX,i=e.y-this.worldY;return e.x=n*this.d*t-i*this.b*t,e.y=i*this.a*t-n*this.c*t,e}localToWorld(e){let t=e.x,n=e.y;return e.x=t*this.a+n*this.b+this.worldX,e.y=t*this.c+n*this.d+this.worldY,e}worldToParent(e){if(e==null)throw new Error("world cannot be null.");return this.parent==null?e:this.parent.worldToLocal(e)}parentToWorld(e){if(e==null)throw new Error("world cannot be null.");return this.parent==null?e:this.parent.localToWorld(e)}worldToLocalRotation(e){let t=le.sinDeg(e),n=le.cosDeg(e);return Math.atan2(this.a*t-this.c*n,this.d*n-this.b*t)*le.radDeg+this.rotation-this.shearX}localToWorldRotation(e){e-=this.rotation-this.shearX;let t=le.sinDeg(e),n=le.cosDeg(e);return Math.atan2(n*this.c+t*this.d,n*this.a+t*this.b)*le.radDeg}rotateWorld(e){e*=le.degRad;const t=Math.sin(e),n=Math.cos(e),i=this.a,s=this.b;this.a=n*i-t*this.c,this.b=n*s-t*this.d,this.c=t*i+n*this.c,this.d=t*s+n*this.d}}class Ur{constructor(e,t,n){v(this,"name");v(this,"order");v(this,"skinRequired");this.name=e,this.order=t,this.skinRequired=n}}class w0{constructor(e,t="",n=new Nc){v(this,"pathPrefix","");v(this,"textureLoader");v(this,"downloader");v(this,"assets",{});v(this,"errors",{});v(this,"toLoad",0);v(this,"loaded",0);this.textureLoader=e,this.pathPrefix=t,this.downloader=n}start(e){return this.toLoad++,this.pathPrefix+e}success(e,t,n){this.toLoad--,this.loaded++,this.assets[t]=n,e&&e(t,n)}error(e,t,n){this.toLoad--,this.loaded++,this.errors[t]=n,e&&e(t,n)}loadAll(){return new Promise((t,n)=>{let i=()=>{if(this.isLoadingComplete()){this.hasErrors()?n(this.errors):t(this);return}requestAnimationFrame(i)};requestAnimationFrame(i)})}setRawDataURI(e,t){this.downloader.rawDataUris[this.pathPrefix+e]=t}loadBinary(e,t=()=>{},n=()=>{}){e=this.start(e),this.downloader.downloadBinary(e,i=>{this.success(t,e,i)},(i,s)=>{this.error(n,e,`Couldn't load binary ${e}: status ${i}, ${s}`)})}loadText(e,t=()=>{},n=()=>{}){e=this.start(e),this.downloader.downloadText(e,i=>{this.success(t,e,i)},(i,s)=>{this.error(n,e,`Couldn't load text ${e}: status ${i}, ${s}`)})}loadJson(e,t=()=>{},n=()=>{}){e=this.start(e),this.downloader.downloadJson(e,i=>{this.success(t,e,i)},(i,s)=>{this.error(n,e,`Couldn't load JSON ${e}: status ${i}, ${s}`)})}loadTexture(e,t=()=>{},n=()=>{}){if(e=this.start(e),!!!(typeof window<"u"&&typeof navigator<"u"&&window.document))fetch(e,{mode:"cors"}).then(l=>l.ok?l.blob():(this.error(n,e,`Couldn't load image: ${e}`),null)).then(l=>l?createImageBitmap(l,{premultiplyAlpha:"none",colorSpaceConversion:"none"}):null).then(l=>{l&&this.success(t,e,this.textureLoader(l))});else{let l=new Image;l.crossOrigin="anonymous",l.onload=()=>{this.success(t,e,this.textureLoader(l))},l.onerror=()=>{this.error(n,e,`Couldn't load image: ${e}`)},this.downloader.rawDataUris[e]&&(e=this.downloader.rawDataUris[e]),l.src=e}}loadTextureAtlas(e,t=()=>{},n=()=>{},i){let s=e.lastIndexOf("/"),l=s>=0?e.substring(0,s+1):"";e=this.start(e),this.downloader.downloadText(e,a=>{try{let c=new M0(a),o=c.pages.length,h=!1;for(let d of c.pages)this.loadTexture(i?i[d.name]:l+d.name,(u,f)=>{h||(d.setTexture(f),--o==0&&this.success(t,e,c))},(u,f)=>{h||this.error(n,e,`Couldn't load texture atlas ${e} page image: ${u}`),h=!0})}catch(c){this.error(n,e,`Couldn't parse texture atlas ${e}: ${c.message}`)}},(a,c)=>{this.error(n,e,`Couldn't load texture atlas ${e}: status ${a}, ${c}`)})}get(e){return this.assets[this.pathPrefix+e]}require(e){e=this.pathPrefix+e;let t=this.assets[e];if(t)return t;let n=this.errors[e];throw Error("Asset not found: "+e+(n?`
`+n:""))}remove(e){e=this.pathPrefix+e;let t=this.assets[e];return t.dispose&&t.dispose(),delete this.assets[e],t}removeAll(){for(let e in this.assets){let t=this.assets[e];t.dispose&&t.dispose()}this.assets={}}isLoadingComplete(){return this.toLoad==0}getToLoad(){return this.toLoad}getLoaded(){return this.loaded}dispose(){this.removeAll()}hasErrors(){return Object.keys(this.errors).length>0}getErrors(){return this.errors}}class Nc{constructor(){v(this,"callbacks",{});v(this,"rawDataUris",{})}dataUriToString(e){if(!e.startsWith("data:"))throw new Error("Not a data URI.");let t=e.indexOf("base64,");return t!=-1?(t+=7,atob(e.substr(t))):e.substr(e.indexOf(",")+1)}base64ToUint8Array(e){for(var t=window.atob(e),n=t.length,i=new Uint8Array(n),s=0;s<n;s++)i[s]=t.charCodeAt(s);return i}dataUriToUint8Array(e){if(!e.startsWith("data:"))throw new Error("Not a data URI.");let t=e.indexOf("base64,");if(t==-1)throw new Error("Not a binary data URI.");return t+=7,this.base64ToUint8Array(e.substr(t))}downloadText(e,t,n){if(this.start(e,t,n))return;if(this.rawDataUris[e]){try{let l=this.rawDataUris[e];this.finish(e,200,this.dataUriToString(l))}catch(l){this.finish(e,400,JSON.stringify(l))}return}let i=new XMLHttpRequest;i.overrideMimeType("text/html"),i.open("GET",e,!0);let s=()=>{this.finish(e,i.status,i.responseText)};i.onload=s,i.onerror=s,i.send()}downloadJson(e,t,n){this.downloadText(e,i=>{t(JSON.parse(i))},n)}downloadBinary(e,t,n){if(this.start(e,t,n))return;if(this.rawDataUris[e]){try{let l=this.rawDataUris[e];this.finish(e,200,this.dataUriToUint8Array(l))}catch(l){this.finish(e,400,JSON.stringify(l))}return}let i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="arraybuffer";let s=()=>{this.finish(e,i.status,i.response)};i.onload=()=>{i.status==200||i.status==0?this.finish(e,200,new Uint8Array(i.response)):s()},i.onerror=s,i.send()}start(e,t,n){let i=this.callbacks[e];try{if(i)return!0;this.callbacks[e]=i=[]}finally{i.push(t,n)}}finish(e,t,n){let i=this.callbacks[e];delete this.callbacks[e];let s=t==200||t==0?[n]:[t,n];for(let l=s.length-1,a=i.length;l<a;l+=2)i[l].apply(null,s)}}class b0{constructor(e,t){v(this,"data");v(this,"intValue",0);v(this,"floatValue",0);v(this,"stringValue",null);v(this,"time",0);v(this,"volume",0);v(this,"balance",0);if(!t)throw new Error("data cannot be null.");this.time=e,this.data=t}}class T0{constructor(e){v(this,"name");v(this,"intValue",0);v(this,"floatValue",0);v(this,"stringValue",null);v(this,"audioPath",null);v(this,"volume",0);v(this,"balance",0);this.name=e}}class A0{constructor(e,t){v(this,"data");v(this,"bones");v(this,"target");v(this,"bendDirection",0);v(this,"compress",!1);v(this,"stretch",!1);v(this,"mix",1);v(this,"softness",0);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let i=0;i<e.bones.length;i++){let s=t.findBone(e.bones[i].name);if(!s)throw new Error(`Couldn't find bone ${e.bones[i].name}`);this.bones.push(s)}let n=t.findBone(e.target.name);if(!n)throw new Error(`Couldn't find bone ${e.target.name}`);this.target=n,this.mix=e.mix,this.softness=e.softness,this.bendDirection=e.bendDirection,this.compress=e.compress,this.stretch=e.stretch}isActive(){return this.active}setToSetupPose(){const e=this.data;this.mix=e.mix,this.softness=e.softness,this.bendDirection=e.bendDirection,this.compress=e.compress,this.stretch=e.stretch}update(e){if(this.mix==0)return;let t=this.target,n=this.bones;switch(n.length){case 1:this.apply1(n[0],t.worldX,t.worldY,this.compress,this.stretch,this.data.uniform,this.mix);break;case 2:this.apply2(n[0],n[1],t.worldX,t.worldY,this.bendDirection,this.stretch,this.data.uniform,this.softness,this.mix);break}}apply1(e,t,n,i,s,l,a){let c=e.parent;if(!c)throw new Error("IK bone must have parent.");let o=c.a,h=c.b,d=c.c,u=c.d,f=-e.ashearX-e.arotation,g=0,_=0;switch(e.inherit){case dt.OnlyTranslation:g=(t-e.worldX)*le.signum(e.skeleton.scaleX),_=(n-e.worldY)*le.signum(e.skeleton.scaleY);break;case dt.NoRotationOrReflection:let y=Math.abs(o*u-h*d)/Math.max(1e-4,o*o+d*d),x=o/e.skeleton.scaleX,M=d/e.skeleton.scaleY;h=-M*y*e.skeleton.scaleX,u=x*y*e.skeleton.scaleY,f+=Math.atan2(M,x)*le.radDeg;default:let b=t-c.worldX,S=n-c.worldY,w=o*u-h*d;Math.abs(w)<=1e-4?(g=0,_=0):(g=(b*u-S*h)/w-e.ax,_=(S*o-b*d)/w-e.ay)}f+=Math.atan2(_,g)*le.radDeg,e.ascaleX<0&&(f+=180),f>180?f-=360:f<-180&&(f+=360);let p=e.ascaleX,m=e.ascaleY;if(i||s){switch(e.inherit){case dt.NoScale:case dt.NoScaleOrReflection:g=t-e.worldX,_=n-e.worldY}const y=e.data.length*p;if(y>1e-4){const x=g*g+_*_;if(i&&x<y*y||s&&x>y*y){const M=(Math.sqrt(x)/y-1)*a+1;p*=M,l&&(m*=M)}}}e.updateWorldTransformWith(e.ax,e.ay,e.arotation+f*a,p,m,e.ashearX,e.ashearY)}apply2(e,t,n,i,s,l,a,c,o){if(e.inherit!=dt.Normal||t.inherit!=dt.Normal)return;let h=e.ax,d=e.ay,u=e.ascaleX,f=e.ascaleY,g=u,_=f,p=t.ascaleX,m=0,y=0,x=0;u<0?(u=-u,m=180,x=-1):(m=0,x=1),f<0&&(f=-f,x=-x),p<0?(p=-p,y=180):y=0;let M=t.ax,b=0,S=0,w=0,R=e.a,I=e.b,E=e.c,A=e.d,H=Math.abs(u-f)<=1e-4;!H||l?(b=0,S=R*M+e.worldX,w=E*M+e.worldY):(b=t.ay,S=R*M+I*b+e.worldX,w=E*M+A*b+e.worldY);let B=e.parent;if(!B)throw new Error("IK parent must itself have a parent.");R=B.a,I=B.b,E=B.c,A=B.d;let C=R*A-I*E,D=S-B.worldX,U=w-B.worldY;C=Math.abs(C)<=1e-4?0:1/C;let G=(D*A-U*I)*C-h,V=(U*R-D*E)*C-d,W=Math.sqrt(G*G+V*V),J=t.data.length*p,te,re;if(W<1e-4){this.apply1(e,n,i,!1,l,!1,o),t.updateWorldTransformWith(M,b,0,t.ascaleX,t.ascaleY,t.ashearX,t.ashearY);return}D=n-B.worldX,U=i-B.worldY;let ne=(D*A-U*I)*C-h,O=(U*R-D*E)*C-d,j=ne*ne+O*O;if(c!=0){c*=u*(p+1)*.5;let me=Math.sqrt(j),fe=me-W-J*u+c;if(fe>0){let Le=Math.min(1,fe/(c*2))-1;Le=(fe-c*(1-Le*Le))/me,ne-=Le*ne,O-=Le*O,j=ne*ne+O*O}}e:if(H){J*=u;let me=(j-W*W-J*J)/(2*W*J);me<-1?(me=-1,re=Math.PI*s):me>1?(me=1,re=0,l&&(R=(Math.sqrt(j)/(W+J)-1)*o+1,g*=R,a&&(_*=R))):re=Math.acos(me)*s,R=W+J*me,I=J*Math.sin(re),te=Math.atan2(O*R-ne*I,ne*R+O*I)}else{R=u*J,I=f*J;let me=R*R,fe=I*I,Le=Math.atan2(O,ne);E=fe*W*W+me*j-me*fe;let Te=-2*fe*W,k=fe-me;if(A=Te*Te-4*k*E,A>=0){let P=Math.sqrt(A);Te<0&&(P=-P),P=-(Te+P)*.5;let T=P/k,K=E/P,Q=Math.abs(T)<Math.abs(K)?T:K;if(T=j-Q*Q,T>=0){U=Math.sqrt(T)*s,te=Le-Math.atan2(U,Q),re=Math.atan2(U/f,(Q-W)/u);break e}}let ft=le.PI,Ee=W-R,Ue=Ee*Ee,Ce=0,Ye=0,De=W+R,Fe=De*De,ot=0;E=-R*W/(me-fe),E>=-1&&E<=1&&(E=Math.acos(E),D=R*Math.cos(E)+W,U=I*Math.sin(E),A=D*D+U*U,A<Ue&&(ft=E,Ue=A,Ee=D,Ce=U),A>Fe&&(Ye=E,Fe=A,De=D,ot=U)),j<=(Ue+Fe)*.5?(te=Le-Math.atan2(Ce*s,Ee),re=ft*s):(te=Le-Math.atan2(ot*s,De),re=Ye*s)}let ue=Math.atan2(b,M)*x,Se=e.arotation;te=(te-ue)*le.radDeg+m-Se,te>180?te-=360:te<-180&&(te+=360),e.updateWorldTransformWith(h,d,Se+te*o,g,_,0,0),Se=t.arotation,re=((re+ue)*le.radDeg-t.ashearX)*x+y-Se,re>180?re-=360:re<-180&&(re+=360),t.updateWorldTransformWith(M,b,Se+re*o,t.ascaleX,t.ascaleY,t.ashearX,t.ashearY)}}class C0 extends Ur{constructor(t){super(t,0,!1);v(this,"bones",new Array);v(this,"_target",null);v(this,"bendDirection",0);v(this,"compress",!1);v(this,"stretch",!1);v(this,"uniform",!1);v(this,"mix",0);v(this,"softness",0)}set target(t){this._target=t}get target(){if(this._target)return this._target;throw new Error("BoneData not set.")}}class R0 extends Ur{constructor(t){super(t,0,!1);v(this,"bones",new Array);v(this,"_target",null);v(this,"positionMode",Jn.Fixed);v(this,"spacingMode",Ft.Fixed);v(this,"rotateMode",bi.Chain);v(this,"offsetRotation",0);v(this,"position",0);v(this,"spacing",0);v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0)}set target(t){this._target=t}get target(){if(this._target)return this._target;throw new Error("SlotData not set.")}}var Jn;(function(r){r[r.Fixed=0]="Fixed",r[r.Percent=1]="Percent"})(Jn||(Jn={}));var Ft;(function(r){r[r.Length=0]="Length",r[r.Fixed=1]="Fixed",r[r.Percent=2]="Percent",r[r.Proportional=3]="Proportional"})(Ft||(Ft={}));var bi;(function(r){r[r.Tangent=0]="Tangent",r[r.Chain=1]="Chain",r[r.ChainScale=2]="ChainScale"})(bi||(bi={}));const Yt=class Yt{constructor(e,t){v(this,"data");v(this,"bones");v(this,"target");v(this,"position",0);v(this,"spacing",0);v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0);v(this,"spaces",new Array);v(this,"positions",new Array);v(this,"world",new Array);v(this,"curves",new Array);v(this,"lengths",new Array);v(this,"segments",new Array);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let i=0,s=e.bones.length;i<s;i++){let l=t.findBone(e.bones[i].name);if(!l)throw new Error(`Couldn't find bone ${e.bones[i].name}.`);this.bones.push(l)}let n=t.findSlot(e.target.name);if(!n)throw new Error(`Couldn't find target bone ${e.target.name}`);this.target=n,this.position=e.position,this.spacing=e.spacing,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY}isActive(){return this.active}setToSetupPose(){const e=this.data;this.position=e.position,this.spacing=e.spacing,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY}update(e){let t=this.target.getAttachment();if(!(t instanceof ds))return;let n=this.mixRotate,i=this.mixX,s=this.mixY;if(n==0&&i==0&&s==0)return;let l=this.data,a=l.rotateMode==bi.Tangent,c=l.rotateMode==bi.ChainScale,o=this.bones,h=o.length,d=a?h:h+1,u=ge.setArraySize(this.spaces,d),f=c?this.lengths=ge.setArraySize(this.lengths,h):[],g=this.spacing;switch(l.spacingMode){case Ft.Percent:if(c)for(let S=0,w=d-1;S<w;S++){let R=o[S],I=R.data.length,E=I*R.a,A=I*R.c;f[S]=Math.sqrt(E*E+A*A)}ge.arrayFill(u,1,d,g);break;case Ft.Proportional:let M=0;for(let S=0,w=d-1;S<w;){let R=o[S],I=R.data.length;if(I<Yt.epsilon)c&&(f[S]=0),u[++S]=g;else{let E=I*R.a,A=I*R.c,H=Math.sqrt(E*E+A*A);c&&(f[S]=H),u[++S]=H,M+=H}}if(M>0){M=d/M*g;for(let S=1;S<d;S++)u[S]*=M}break;default:let b=l.spacingMode==Ft.Length;for(let S=0,w=d-1;S<w;){let R=o[S],I=R.data.length;if(I<Yt.epsilon)c&&(f[S]=0),u[++S]=g;else{let E=I*R.a,A=I*R.c,H=Math.sqrt(E*E+A*A);c&&(f[S]=H),u[++S]=(b?I+g:g)*H/I}}}let _=this.computeWorldPositions(t,d,a),p=_[0],m=_[1],y=l.offsetRotation,x=!1;if(y==0)x=l.rotateMode==bi.Chain;else{x=!1;let M=this.target.bone;y*=M.a*M.d-M.b*M.c>0?le.degRad:-.01745329277777778}for(let M=0,b=3;M<h;M++,b+=3){let S=o[M];S.worldX+=(p-S.worldX)*i,S.worldY+=(m-S.worldY)*s;let w=_[b],R=_[b+1],I=w-p,E=R-m;if(c){let A=f[M];if(A!=0){let H=(Math.sqrt(I*I+E*E)/A-1)*n+1;S.a*=H,S.c*=H}}if(p=w,m=R,n>0){let A=S.a,H=S.b,B=S.c,C=S.d,D=0,U=0,G=0;if(a?D=_[b-1]:u[M+1]==0?D=_[b+2]:D=Math.atan2(E,I),D-=Math.atan2(B,A),x){U=Math.cos(D),G=Math.sin(D);let V=S.data.length;p+=(V*(U*A-G*B)-I)*n,m+=(V*(G*A+U*B)-E)*n}else D+=y;D>le.PI?D-=le.PI2:D<-3.1415927&&(D+=le.PI2),D*=n,U=Math.cos(D),G=Math.sin(D),S.a=U*A-G*B,S.b=U*H-G*C,S.c=G*A+U*B,S.d=G*H+U*C}S.updateAppliedTransform()}}computeWorldPositions(e,t,n){let i=this.target,s=this.position,l=this.spaces,a=ge.setArraySize(this.positions,t*3+2),c=this.world,o=e.closed,h=e.worldVerticesLength,d=h/6,u=Yt.NONE;if(!e.constantSpeed){let V=e.lengths;d-=o?1:2;let W=V[d];this.data.positionMode==Jn.Percent&&(s*=W);let J;switch(this.data.spacingMode){case Ft.Percent:J=W;break;case Ft.Proportional:J=W/t;break;default:J=1}c=ge.setArraySize(this.world,8);for(let te=0,re=0,ne=0;te<t;te++,re+=3){let O=l[te]*J;s+=O;let j=s;if(o)j%=W,j<0&&(j+=W),ne=0;else if(j<0){u!=Yt.BEFORE&&(u=Yt.BEFORE,e.computeWorldVertices(i,2,4,c,0,2)),this.addBeforePosition(j,c,0,a,re);continue}else if(j>W){u!=Yt.AFTER&&(u=Yt.AFTER,e.computeWorldVertices(i,h-6,4,c,0,2)),this.addAfterPosition(j-W,c,0,a,re);continue}for(;;ne++){let ue=V[ne];if(!(j>ue)){if(ne==0)j/=ue;else{let Se=V[ne-1];j=(j-Se)/(ue-Se)}break}}ne!=u&&(u=ne,o&&ne==d?(e.computeWorldVertices(i,h-4,4,c,0,2),e.computeWorldVertices(i,0,4,c,4,2)):e.computeWorldVertices(i,ne*6+2,8,c,0,2)),this.addCurvePosition(j,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],a,re,n||te>0&&O==0)}return a}o?(h+=2,c=ge.setArraySize(this.world,h),e.computeWorldVertices(i,2,h-4,c,0,2),e.computeWorldVertices(i,0,2,c,h-4,2),c[h-2]=c[0],c[h-1]=c[1]):(d--,h-=4,c=ge.setArraySize(this.world,h),e.computeWorldVertices(i,2,h,c,0,2));let f=ge.setArraySize(this.curves,d),g=0,_=c[0],p=c[1],m=0,y=0,x=0,M=0,b=0,S=0,w=0,R=0,I=0,E=0,A=0,H=0,B=0,C=0;for(let V=0,W=2;V<d;V++,W+=6)m=c[W],y=c[W+1],x=c[W+2],M=c[W+3],b=c[W+4],S=c[W+5],w=(_-m*2+x)*.1875,R=(p-y*2+M)*.1875,I=((m-x)*3-_+b)*.09375,E=((y-M)*3-p+S)*.09375,A=w*2+I,H=R*2+E,B=(m-_)*.75+w+I*.16666667,C=(y-p)*.75+R+E*.16666667,g+=Math.sqrt(B*B+C*C),B+=A,C+=H,A+=I,H+=E,g+=Math.sqrt(B*B+C*C),B+=A,C+=H,g+=Math.sqrt(B*B+C*C),B+=A+I,C+=H+E,g+=Math.sqrt(B*B+C*C),f[V]=g,_=b,p=S;this.data.positionMode==Jn.Percent&&(s*=g);let D;switch(this.data.spacingMode){case Ft.Percent:D=g;break;case Ft.Proportional:D=g/t;break;default:D=1}let U=this.segments,G=0;for(let V=0,W=0,J=0,te=0;V<t;V++,W+=3){let re=l[V]*D;s+=re;let ne=s;if(o)ne%=g,ne<0&&(ne+=g),J=0;else if(ne<0){this.addBeforePosition(ne,c,0,a,W);continue}else if(ne>g){this.addAfterPosition(ne-g,c,h-4,a,W);continue}for(;;J++){let O=f[J];if(!(ne>O)){if(J==0)ne/=O;else{let j=f[J-1];ne=(ne-j)/(O-j)}break}}if(J!=u){u=J;let O=J*6;for(_=c[O],p=c[O+1],m=c[O+2],y=c[O+3],x=c[O+4],M=c[O+5],b=c[O+6],S=c[O+7],w=(_-m*2+x)*.03,R=(p-y*2+M)*.03,I=((m-x)*3-_+b)*.006,E=((y-M)*3-p+S)*.006,A=w*2+I,H=R*2+E,B=(m-_)*.3+w+I*.16666667,C=(y-p)*.3+R+E*.16666667,G=Math.sqrt(B*B+C*C),U[0]=G,O=1;O<8;O++)B+=A,C+=H,A+=I,H+=E,G+=Math.sqrt(B*B+C*C),U[O]=G;B+=A,C+=H,G+=Math.sqrt(B*B+C*C),U[8]=G,B+=A+I,C+=H+E,G+=Math.sqrt(B*B+C*C),U[9]=G,te=0}for(ne*=G;;te++){let O=U[te];if(!(ne>O)){if(te==0)ne/=O;else{let j=U[te-1];ne=te+(ne-j)/(O-j)}break}}this.addCurvePosition(ne*.1,_,p,m,y,x,M,b,S,a,W,n||V>0&&re==0)}return a}addBeforePosition(e,t,n,i,s){let l=t[n],a=t[n+1],c=t[n+2]-l,o=t[n+3]-a,h=Math.atan2(o,c);i[s]=l+e*Math.cos(h),i[s+1]=a+e*Math.sin(h),i[s+2]=h}addAfterPosition(e,t,n,i,s){let l=t[n+2],a=t[n+3],c=l-t[n],o=a-t[n+1],h=Math.atan2(o,c);i[s]=l+e*Math.cos(h),i[s+1]=a+e*Math.sin(h),i[s+2]=h}addCurvePosition(e,t,n,i,s,l,a,c,o,h,d,u){if(e==0||isNaN(e)){h[d]=t,h[d+1]=n,h[d+2]=Math.atan2(s-n,i-t);return}let f=e*e,g=f*e,_=1-e,p=_*_,m=p*_,y=_*e,x=y*3,M=_*x,b=x*e,S=t*m+i*M+l*b+c*g,w=n*m+s*M+a*b+o*g;h[d]=S,h[d+1]=w,u&&(e<.001?h[d+2]=Math.atan2(s-n,i-t):h[d+2]=Math.atan2(w-(n*p+s*y*2+a*f),S-(t*p+i*y*2+l*f)))}};v(Yt,"NONE",-1),v(Yt,"BEFORE",-2),v(Yt,"AFTER",-3),v(Yt,"epsilon",1e-5);let Va=Yt;class L0{constructor(e,t){v(this,"data");v(this,"_bone",null);v(this,"inertia",0);v(this,"strength",0);v(this,"damping",0);v(this,"massInverse",0);v(this,"wind",0);v(this,"gravity",0);v(this,"mix",0);v(this,"_reset",!0);v(this,"ux",0);v(this,"uy",0);v(this,"cx",0);v(this,"cy",0);v(this,"tx",0);v(this,"ty",0);v(this,"xOffset",0);v(this,"xVelocity",0);v(this,"yOffset",0);v(this,"yVelocity",0);v(this,"rotateOffset",0);v(this,"rotateVelocity",0);v(this,"scaleOffset",0);v(this,"scaleVelocity",0);v(this,"active",!1);v(this,"skeleton");v(this,"remaining",0);v(this,"lastTime",0);this.data=e,this.skeleton=t,this.bone=t.bones[e.bone.index],this.inertia=e.inertia,this.strength=e.strength,this.damping=e.damping,this.massInverse=e.massInverse,this.wind=e.wind,this.gravity=e.gravity,this.mix=e.mix}set bone(e){this._bone=e}get bone(){if(this._bone)return this._bone;throw new Error("Bone not set.")}reset(){this.remaining=0,this.lastTime=this.skeleton.time,this._reset=!0,this.xOffset=0,this.xVelocity=0,this.yOffset=0,this.yVelocity=0,this.rotateOffset=0,this.rotateVelocity=0,this.scaleOffset=0,this.scaleVelocity=0}setToSetupPose(){const e=this.data;this.inertia=e.inertia,this.strength=e.strength,this.damping=e.damping,this.massInverse=e.massInverse,this.wind=e.wind,this.gravity=e.gravity,this.mix=e.mix}isActive(){return this.active}update(e){const t=this.mix;if(t==0)return;const n=this.data.x>0,i=this.data.y>0,s=this.data.rotate>0||this.data.shearX>0,l=this.data.scaleX>0,a=this.bone,c=a.data.length;switch(e){case Vn.none:return;case Vn.reset:this.reset();case Vn.update:const o=this.skeleton,h=Math.max(this.skeleton.time-this.lastTime,0);this.remaining+=h,this.lastTime=o.time;const d=a.worldX,u=a.worldY;if(this._reset)this._reset=!1,this.ux=d,this.uy=u;else{let f=this.remaining,g=this.inertia,_=this.data.step,p=this.skeleton.data.referenceScale,m=-1,y=this.data.limit*h,x=y*Math.abs(o.scaleY);if(y*=Math.abs(o.scaleX),n||i){if(n){const M=(this.ux-d)*g;this.xOffset+=M>y?y:M<-y?-y:M,this.ux=d}if(i){const M=(this.uy-u)*g;this.yOffset+=M>x?x:M<-x?-x:M,this.uy=u}if(f>=_){m=Math.pow(this.damping,60*_);const M=this.massInverse*_,b=this.strength,S=this.wind*p*o.scaleX,w=this.gravity*p*o.scaleY;do n&&(this.xVelocity+=(S-this.xOffset*b)*M,this.xOffset+=this.xVelocity*_,this.xVelocity*=m),i&&(this.yVelocity-=(w+this.yOffset*b)*M,this.yOffset+=this.yVelocity*_,this.yVelocity*=m),f-=_;while(f>=_)}n&&(a.worldX+=this.xOffset*t*this.data.x),i&&(a.worldY+=this.yOffset*t*this.data.y)}if(s||l){let M=Math.atan2(a.c,a.a),b=0,S=0,w=0,R=this.cx-a.worldX,I=this.cy-a.worldY;if(R>y?R=y:R<-y&&(R=-y),I>x?I=x:I<-x&&(I=-x),s){w=(this.data.rotate+this.data.shearX)*t;let E=Math.atan2(I+this.ty,R+this.tx)-M-this.rotateOffset*w;this.rotateOffset+=(E-Math.ceil(E*le.invPI2-.5)*le.PI2)*g,E=this.rotateOffset*w+M,b=Math.cos(E),S=Math.sin(E),l&&(E=c*a.getWorldScaleX(),E>0&&(this.scaleOffset+=(R*b+I*S)*g/E))}else{b=Math.cos(M),S=Math.sin(M);const E=c*a.getWorldScaleX();E>0&&(this.scaleOffset+=(R*b+I*S)*g/E)}if(f=this.remaining,f>=_){m==-1&&(m=Math.pow(this.damping,60*_));const E=this.massInverse*_,A=this.strength,H=this.wind,B=this.gravity,C=c/p;for(;;)if(f-=_,l&&(this.scaleVelocity+=(H*b-B*S-this.scaleOffset*A)*E,this.scaleOffset+=this.scaleVelocity*_,this.scaleVelocity*=m),s){if(this.rotateVelocity-=((H*S+B*b)*C+this.rotateOffset*A)*E,this.rotateOffset+=this.rotateVelocity*_,this.rotateVelocity*=m,f<_)break;const D=this.rotateOffset*w+M;b=Math.cos(D),S=Math.sin(D)}else if(f<_)break}}this.remaining=f}this.cx=a.worldX,this.cy=a.worldY;break;case Vn.pose:n&&(a.worldX+=this.xOffset*t*this.data.x),i&&(a.worldY+=this.yOffset*t*this.data.y)}if(s){let o=this.rotateOffset*t,h=0,d=0,u=0;if(this.data.shearX>0){let f=0;this.data.rotate>0&&(f=o*this.data.rotate,h=Math.sin(f),d=Math.cos(f),u=a.b,a.b=d*u-h*a.d,a.d=h*u+d*a.d),f+=o*this.data.shearX,h=Math.sin(f),d=Math.cos(f),u=a.a,a.a=d*u-h*a.c,a.c=h*u+d*a.c}else o*=this.data.rotate,h=Math.sin(o),d=Math.cos(o),u=a.a,a.a=d*u-h*a.c,a.c=h*u+d*a.c,u=a.b,a.b=d*u-h*a.d,a.d=h*u+d*a.d}if(l){const o=1+this.scaleOffset*t*this.data.scaleX;a.a*=o,a.c*=o}e!=Vn.pose&&(this.tx=c*a.a,this.ty=c*a.c),a.updateAppliedTransform()}translate(e,t){this.ux-=e,this.uy-=t,this.cx-=e,this.cy-=t}rotate(e,t,n){const i=n*le.degRad,s=Math.cos(i),l=Math.sin(i),a=this.cx-e,c=this.cy-t;this.translate(a*s-c*l-a,a*l+c*s-c)}}class P0{constructor(e,t){v(this,"data");v(this,"bone");v(this,"color");v(this,"darkColor",null);v(this,"attachment",null);v(this,"attachmentState",0);v(this,"sequenceIndex",-1);v(this,"deform",new Array);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("bone cannot be null.");this.data=e,this.bone=t,this.color=new Je,this.darkColor=e.darkColor?new Je:null,this.setToSetupPose()}getSkeleton(){return this.bone.skeleton}getAttachment(){return this.attachment}setAttachment(e){this.attachment!=e&&((!(e instanceof on)||!(this.attachment instanceof on)||e.timelineAttachment!=this.attachment.timelineAttachment)&&(this.deform.length=0),this.attachment=e,this.sequenceIndex=-1)}setToSetupPose(){this.color.setFromColor(this.data.color),this.darkColor&&this.darkColor.setFromColor(this.data.darkColor),this.data.attachmentName?(this.attachment=null,this.setAttachment(this.bone.skeleton.getAttachment(this.data.index,this.data.attachmentName))):this.attachment=null}}class I0{constructor(e,t){v(this,"data");v(this,"bones");v(this,"target");v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0);v(this,"mixScaleX",0);v(this,"mixScaleY",0);v(this,"mixShearY",0);v(this,"temp",new Ts);v(this,"active",!1);if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let i=0;i<e.bones.length;i++){let s=t.findBone(e.bones[i].name);if(!s)throw new Error(`Couldn't find bone ${e.bones[i].name}.`);this.bones.push(s)}let n=t.findBone(e.target.name);if(!n)throw new Error(`Couldn't find target bone ${e.target.name}.`);this.target=n,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY,this.mixScaleX=e.mixScaleX,this.mixScaleY=e.mixScaleY,this.mixShearY=e.mixShearY}isActive(){return this.active}setToSetupPose(){const e=this.data;this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY,this.mixScaleX=e.mixScaleX,this.mixScaleY=e.mixScaleY,this.mixShearY=e.mixShearY}update(e){this.mixRotate==0&&this.mixX==0&&this.mixY==0&&this.mixScaleX==0&&this.mixScaleY==0&&this.mixShearY==0||(this.data.local?this.data.relative?this.applyRelativeLocal():this.applyAbsoluteLocal():this.data.relative?this.applyRelativeWorld():this.applyAbsoluteWorld())}applyAbsoluteWorld(){let e=this.mixRotate,t=this.mixX,n=this.mixY,i=this.mixScaleX,s=this.mixScaleY,l=this.mixShearY,a=t!=0||n!=0,c=this.target,o=c.a,h=c.b,d=c.c,u=c.d,f=o*u-h*d>0?le.degRad:-.01745329277777778,g=this.data.offsetRotation*f,_=this.data.offsetShearY*f,p=this.bones;for(let m=0,y=p.length;m<y;m++){let x=p[m];if(e!=0){let M=x.a,b=x.b,S=x.c,w=x.d,R=Math.atan2(d,o)-Math.atan2(S,M)+g;R>le.PI?R-=le.PI2:R<-3.1415927&&(R+=le.PI2),R*=e;let I=Math.cos(R),E=Math.sin(R);x.a=I*M-E*S,x.b=I*b-E*w,x.c=E*M+I*S,x.d=E*b+I*w}if(a){let M=this.temp;c.localToWorld(M.set(this.data.offsetX,this.data.offsetY)),x.worldX+=(M.x-x.worldX)*t,x.worldY+=(M.y-x.worldY)*n}if(i!=0){let M=Math.sqrt(x.a*x.a+x.c*x.c);M!=0&&(M=(M+(Math.sqrt(o*o+d*d)-M+this.data.offsetScaleX)*i)/M),x.a*=M,x.c*=M}if(s!=0){let M=Math.sqrt(x.b*x.b+x.d*x.d);M!=0&&(M=(M+(Math.sqrt(h*h+u*u)-M+this.data.offsetScaleY)*s)/M),x.b*=M,x.d*=M}if(l>0){let M=x.b,b=x.d,S=Math.atan2(b,M),w=Math.atan2(u,h)-Math.atan2(d,o)-(S-Math.atan2(x.c,x.a));w>le.PI?w-=le.PI2:w<-3.1415927&&(w+=le.PI2),w=S+(w+_)*l;let R=Math.sqrt(M*M+b*b);x.b=Math.cos(w)*R,x.d=Math.sin(w)*R}x.updateAppliedTransform()}}applyRelativeWorld(){let e=this.mixRotate,t=this.mixX,n=this.mixY,i=this.mixScaleX,s=this.mixScaleY,l=this.mixShearY,a=t!=0||n!=0,c=this.target,o=c.a,h=c.b,d=c.c,u=c.d,f=o*u-h*d>0?le.degRad:-.01745329277777778,g=this.data.offsetRotation*f,_=this.data.offsetShearY*f,p=this.bones;for(let m=0,y=p.length;m<y;m++){let x=p[m];if(e!=0){let M=x.a,b=x.b,S=x.c,w=x.d,R=Math.atan2(d,o)+g;R>le.PI?R-=le.PI2:R<-3.1415927&&(R+=le.PI2),R*=e;let I=Math.cos(R),E=Math.sin(R);x.a=I*M-E*S,x.b=I*b-E*w,x.c=E*M+I*S,x.d=E*b+I*w}if(a){let M=this.temp;c.localToWorld(M.set(this.data.offsetX,this.data.offsetY)),x.worldX+=M.x*t,x.worldY+=M.y*n}if(i!=0){let M=(Math.sqrt(o*o+d*d)-1+this.data.offsetScaleX)*i+1;x.a*=M,x.c*=M}if(s!=0){let M=(Math.sqrt(h*h+u*u)-1+this.data.offsetScaleY)*s+1;x.b*=M,x.d*=M}if(l>0){let M=Math.atan2(u,h)-Math.atan2(d,o);M>le.PI?M-=le.PI2:M<-3.1415927&&(M+=le.PI2);let b=x.b,S=x.d;M=Math.atan2(S,b)+(M-le.PI/2+_)*l;let w=Math.sqrt(b*b+S*S);x.b=Math.cos(M)*w,x.d=Math.sin(M)*w}x.updateAppliedTransform()}}applyAbsoluteLocal(){let e=this.mixRotate,t=this.mixX,n=this.mixY,i=this.mixScaleX,s=this.mixScaleY,l=this.mixShearY,a=this.target,c=this.bones;for(let o=0,h=c.length;o<h;o++){let d=c[o],u=d.arotation;e!=0&&(u+=(a.arotation-u+this.data.offsetRotation)*e);let f=d.ax,g=d.ay;f+=(a.ax-f+this.data.offsetX)*t,g+=(a.ay-g+this.data.offsetY)*n;let _=d.ascaleX,p=d.ascaleY;i!=0&&_!=0&&(_=(_+(a.ascaleX-_+this.data.offsetScaleX)*i)/_),s!=0&&p!=0&&(p=(p+(a.ascaleY-p+this.data.offsetScaleY)*s)/p);let m=d.ashearY;l!=0&&(m+=(a.ashearY-m+this.data.offsetShearY)*l),d.updateWorldTransformWith(f,g,u,_,p,d.ashearX,m)}}applyRelativeLocal(){let e=this.mixRotate,t=this.mixX,n=this.mixY,i=this.mixScaleX,s=this.mixScaleY,l=this.mixShearY,a=this.target,c=this.bones;for(let o=0,h=c.length;o<h;o++){let d=c[o],u=d.arotation+(a.arotation+this.data.offsetRotation)*e,f=d.ax+(a.ax+this.data.offsetX)*t,g=d.ay+(a.ay+this.data.offsetY)*n,_=d.ascaleX*((a.ascaleX-1+this.data.offsetScaleX)*i+1),p=d.ascaleY*((a.ascaleY-1+this.data.offsetScaleY)*s+1),m=d.ashearY+(a.ashearY+this.data.offsetShearY)*l;d.updateWorldTransformWith(f,g,u,_,p,d.ashearX,m)}}}const Qi=class Qi{constructor(e){v(this,"data");v(this,"bones");v(this,"slots");v(this,"drawOrder");v(this,"ikConstraints");v(this,"transformConstraints");v(this,"pathConstraints");v(this,"physicsConstraints");v(this,"_updateCache",new Array);v(this,"skin",null);v(this,"color");v(this,"scaleX",1);v(this,"_scaleY",1);v(this,"x",0);v(this,"y",0);v(this,"time",0);if(!e)throw new Error("data cannot be null.");this.data=e,this.bones=new Array;for(let t=0;t<e.bones.length;t++){let n=e.bones[t],i;if(!n.parent)i=new Il(n,this,null);else{let s=this.bones[n.parent.index];i=new Il(n,this,s),s.children.push(i)}this.bones.push(i)}this.slots=new Array,this.drawOrder=new Array;for(let t=0;t<e.slots.length;t++){let n=e.slots[t],i=this.bones[n.boneData.index],s=new P0(n,i);this.slots.push(s),this.drawOrder.push(s)}this.ikConstraints=new Array;for(let t=0;t<e.ikConstraints.length;t++){let n=e.ikConstraints[t];this.ikConstraints.push(new A0(n,this))}this.transformConstraints=new Array;for(let t=0;t<e.transformConstraints.length;t++){let n=e.transformConstraints[t];this.transformConstraints.push(new I0(n,this))}this.pathConstraints=new Array;for(let t=0;t<e.pathConstraints.length;t++){let n=e.pathConstraints[t];this.pathConstraints.push(new Va(n,this))}this.physicsConstraints=new Array;for(let t=0;t<e.physicsConstraints.length;t++){let n=e.physicsConstraints[t];this.physicsConstraints.push(new L0(n,this))}this.color=new Je(1,1,1,1),this.updateCache()}get scaleY(){return Qi.yDown?-this._scaleY:this._scaleY}set scaleY(e){this._scaleY=e}updateCache(){let e=this._updateCache;e.length=0;let t=this.bones;for(let u=0,f=t.length;u<f;u++){let g=t[u];g.sorted=g.data.skinRequired,g.active=!g.sorted}if(this.skin){let u=this.skin.bones;for(let f=0,g=this.skin.bones.length;f<g;f++){let _=this.bones[u[f].index];do _.sorted=!1,_.active=!0,_=_.parent;while(_)}}let n=this.ikConstraints,i=this.transformConstraints,s=this.pathConstraints,l=this.physicsConstraints,a=n.length,c=i.length,o=s.length,h=this.physicsConstraints.length,d=a+c+o+h;e:for(let u=0;u<d;u++){for(let f=0;f<a;f++){let g=n[f];if(g.data.order==u){this.sortIkConstraint(g);continue e}}for(let f=0;f<c;f++){let g=i[f];if(g.data.order==u){this.sortTransformConstraint(g);continue e}}for(let f=0;f<o;f++){let g=s[f];if(g.data.order==u){this.sortPathConstraint(g);continue e}}for(let f=0;f<h;f++){const g=l[f];if(g.data.order==u){this.sortPhysicsConstraint(g);continue e}}}for(let u=0,f=t.length;u<f;u++)this.sortBone(t[u])}sortIkConstraint(e){if(e.active=e.target.isActive()&&(!e.data.skinRequired||this.skin&&ge.contains(this.skin.constraints,e.data,!0)),!e.active)return;let t=e.target;this.sortBone(t);let n=e.bones,i=n[0];if(this.sortBone(i),n.length==1)this._updateCache.push(e),this.sortReset(i.children);else{let s=n[n.length-1];this.sortBone(s),this._updateCache.push(e),this.sortReset(i.children),s.sorted=!0}}sortPathConstraint(e){if(e.active=e.target.bone.isActive()&&(!e.data.skinRequired||this.skin&&ge.contains(this.skin.constraints,e.data,!0)),!e.active)return;let t=e.target,n=t.data.index,i=t.bone;this.skin&&this.sortPathConstraintAttachment(this.skin,n,i),this.data.defaultSkin&&this.data.defaultSkin!=this.skin&&this.sortPathConstraintAttachment(this.data.defaultSkin,n,i);for(let c=0,o=this.data.skins.length;c<o;c++)this.sortPathConstraintAttachment(this.data.skins[c],n,i);let s=t.getAttachment();s instanceof ds&&this.sortPathConstraintAttachmentWith(s,i);let l=e.bones,a=l.length;for(let c=0;c<a;c++)this.sortBone(l[c]);this._updateCache.push(e);for(let c=0;c<a;c++)this.sortReset(l[c].children);for(let c=0;c<a;c++)l[c].sorted=!0}sortTransformConstraint(e){if(e.active=e.target.isActive()&&(!e.data.skinRequired||this.skin&&ge.contains(this.skin.constraints,e.data,!0)),!e.active)return;this.sortBone(e.target);let t=e.bones,n=t.length;if(e.data.local)for(let i=0;i<n;i++){let s=t[i];this.sortBone(s.parent),this.sortBone(s)}else for(let i=0;i<n;i++)this.sortBone(t[i]);this._updateCache.push(e);for(let i=0;i<n;i++)this.sortReset(t[i].children);for(let i=0;i<n;i++)t[i].sorted=!0}sortPathConstraintAttachment(e,t,n){let i=e.attachments[t];if(i)for(let s in i)this.sortPathConstraintAttachmentWith(i[s],n)}sortPathConstraintAttachmentWith(e,t){if(!(e instanceof ds))return;let n=e.bones;if(!n)this.sortBone(t);else{let i=this.bones;for(let s=0,l=n.length;s<l;){let a=n[s++];for(a+=s;s<a;)this.sortBone(i[n[s++]])}}}sortPhysicsConstraint(e){const t=e.bone;e.active=t.active&&(!e.data.skinRequired||this.skin!=null&&ge.contains(this.skin.constraints,e.data,!0)),e.active&&(this.sortBone(t),this._updateCache.push(e),this.sortReset(t.children),t.sorted=!0)}sortBone(e){if(!e||e.sorted)return;let t=e.parent;t&&this.sortBone(t),e.sorted=!0,this._updateCache.push(e)}sortReset(e){for(let t=0,n=e.length;t<n;t++){let i=e[t];i.active&&(i.sorted&&this.sortReset(i.children),i.sorted=!1)}}updateWorldTransform(e){if(e==null)throw new Error("physics is undefined");let t=this.bones;for(let i=0,s=t.length;i<s;i++){let l=t[i];l.ax=l.x,l.ay=l.y,l.arotation=l.rotation,l.ascaleX=l.scaleX,l.ascaleY=l.scaleY,l.ashearX=l.shearX,l.ashearY=l.shearY}let n=this._updateCache;for(let i=0,s=n.length;i<s;i++)n[i].update(e)}updateWorldTransformWith(e,t){if(!t)throw new Error("parent cannot be null.");let n=this.bones;for(let p=1,m=n.length;p<m;p++){let y=n[p];y.ax=y.x,y.ay=y.y,y.arotation=y.rotation,y.ascaleX=y.scaleX,y.ascaleY=y.scaleY,y.ashearX=y.shearX,y.ashearY=y.shearY}let i=this.getRootBone();if(!i)throw new Error("Root bone must not be null.");let s=t.a,l=t.b,a=t.c,c=t.d;i.worldX=s*this.x+l*this.y+t.worldX,i.worldY=a*this.x+c*this.y+t.worldY;const o=(i.rotation+i.shearX)*le.degRad,h=(i.rotation+90+i.shearY)*le.degRad,d=Math.cos(o)*i.scaleX,u=Math.cos(h)*i.scaleY,f=Math.sin(o)*i.scaleX,g=Math.sin(h)*i.scaleY;i.a=(s*d+l*f)*this.scaleX,i.b=(s*u+l*g)*this.scaleX,i.c=(a*d+c*f)*this.scaleY,i.d=(a*u+c*g)*this.scaleY;let _=this._updateCache;for(let p=0,m=_.length;p<m;p++){let y=_[p];y!=i&&y.update(e)}}setToSetupPose(){this.setBonesToSetupPose(),this.setSlotsToSetupPose()}setBonesToSetupPose(){for(const e of this.bones)e.setToSetupPose();for(const e of this.ikConstraints)e.setToSetupPose();for(const e of this.transformConstraints)e.setToSetupPose();for(const e of this.pathConstraints)e.setToSetupPose();for(const e of this.physicsConstraints)e.setToSetupPose()}setSlotsToSetupPose(){let e=this.slots;ge.arrayCopy(e,0,this.drawOrder,0,e.length);for(let t=0,n=e.length;t<n;t++)e[t].setToSetupPose()}getRootBone(){return this.bones.length==0?null:this.bones[0]}findBone(e){if(!e)throw new Error("boneName cannot be null.");let t=this.bones;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.data.name==e)return s}return null}findSlot(e){if(!e)throw new Error("slotName cannot be null.");let t=this.slots;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.data.name==e)return s}return null}setSkinByName(e){let t=this.data.findSkin(e);if(!t)throw new Error("Skin not found: "+e);this.setSkin(t)}setSkin(e){if(e!=this.skin){if(e)if(this.skin)e.attachAll(this,this.skin);else{let t=this.slots;for(let n=0,i=t.length;n<i;n++){let s=t[n],l=s.data.attachmentName;if(l){let a=e.getAttachment(n,l);a&&s.setAttachment(a)}}}this.skin=e,this.updateCache()}}getAttachmentByName(e,t){let n=this.data.findSlot(e);if(!n)throw new Error(`Can't find slot with name ${e}`);return this.getAttachment(n.index,t)}getAttachment(e,t){if(!t)throw new Error("attachmentName cannot be null.");if(this.skin){let n=this.skin.getAttachment(e,t);if(n)return n}return this.data.defaultSkin?this.data.defaultSkin.getAttachment(e,t):null}setAttachment(e,t){if(!e)throw new Error("slotName cannot be null.");let n=this.slots;for(let i=0,s=n.length;i<s;i++){let l=n[i];if(l.data.name==e){let a=null;if(t&&(a=this.getAttachment(i,t),!a))throw new Error("Attachment not found: "+t+", for slot: "+e);l.setAttachment(a);return}}throw new Error("Slot not found: "+e)}findIkConstraint(e){if(!e)throw new Error("constraintName cannot be null.");return this.ikConstraints.find(t=>t.data.name==e)??null}findTransformConstraint(e){if(!e)throw new Error("constraintName cannot be null.");return this.transformConstraints.find(t=>t.data.name==e)??null}findPathConstraint(e){if(!e)throw new Error("constraintName cannot be null.");return this.pathConstraints.find(t=>t.data.name==e)??null}findPhysicsConstraint(e){if(e==null)throw new Error("constraintName cannot be null.");return this.physicsConstraints.find(t=>t.data.name==e)??null}getBoundsRect(e){let t=new Ts,n=new Ts;return this.getBounds(t,n,void 0,e),{x:t.x,y:t.y,width:n.x,height:n.y}}getBounds(e,t,n=new Array(2),i=null){if(!e)throw new Error("offset cannot be null.");if(!t)throw new Error("size cannot be null.");let s=this.drawOrder,l=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY;for(let h=0,d=s.length;h<d;h++){let u=s[h];if(!u.bone.active)continue;let f=0,g=null,_=null,p=u.getAttachment();if(p instanceof As)f=8,g=ge.setArraySize(n,f,0),p.computeWorldVertices(u,g,0,2),_=Qi.quadTriangles;else if(p instanceof Ai){let m=p;f=m.worldVerticesLength,g=ge.setArraySize(n,f,0),m.computeWorldVertices(u,0,f,g,0,2),_=m.triangles}else if(p instanceof Ps&&i!=null){i.clipStart(u,p);continue}if(g&&_){i!=null&&i.isClipping()&&(i.clipTriangles(g,_,_.length),g=i.clippedVertices,f=i.clippedVertices.length);for(let m=0,y=g.length;m<y;m+=2){let x=g[m],M=g[m+1];l=Math.min(l,x),a=Math.min(a,M),c=Math.max(c,x),o=Math.max(o,M)}}i!=null&&i.clipEndWithSlot(u)}i!=null&&i.clipEnd(),e.set(l,a),t.set(c-l,o-a)}update(e){this.time+=e}physicsTranslate(e,t){const n=this.physicsConstraints;for(let i=0,s=n.length;i<s;i++)n[i].translate(e,t)}physicsRotate(e,t,n){const i=this.physicsConstraints;for(let s=0,l=i.length;s<l;s++)i[s].rotate(e,t,n)}};v(Qi,"quadTriangles",[0,1,2,2,3,0]),v(Qi,"yDown",!1);let Ha=Qi;var Vn;(function(r){r[r.none=0]="none",r[r.reset=1]="reset",r[r.update=2]="update",r[r.pose=3]="pose"})(Vn||(Vn={}));class D0 extends Ur{constructor(t){super(t,0,!1);v(this,"_bone",null);v(this,"x",0);v(this,"y",0);v(this,"rotate",0);v(this,"scaleX",0);v(this,"shearX",0);v(this,"limit",0);v(this,"step",0);v(this,"inertia",0);v(this,"strength",0);v(this,"damping",0);v(this,"massInverse",0);v(this,"wind",0);v(this,"gravity",0);v(this,"mix",0);v(this,"inertiaGlobal",!1);v(this,"strengthGlobal",!1);v(this,"dampingGlobal",!1);v(this,"massGlobal",!1);v(this,"windGlobal",!1);v(this,"gravityGlobal",!1);v(this,"mixGlobal",!1)}set bone(t){this._bone=t}get bone(){if(this._bone)return this._bone;throw new Error("BoneData not set.")}}class U0{constructor(){v(this,"name",null);v(this,"bones",new Array);v(this,"slots",new Array);v(this,"skins",new Array);v(this,"defaultSkin",null);v(this,"events",new Array);v(this,"animations",new Array);v(this,"ikConstraints",new Array);v(this,"transformConstraints",new Array);v(this,"pathConstraints",new Array);v(this,"physicsConstraints",new Array);v(this,"x",0);v(this,"y",0);v(this,"width",0);v(this,"height",0);v(this,"referenceScale",100);v(this,"version",null);v(this,"hash",null);v(this,"fps",0);v(this,"imagesPath",null);v(this,"audioPath",null)}findBone(e){if(!e)throw new Error("boneName cannot be null.");let t=this.bones;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.name==e)return s}return null}findSlot(e){if(!e)throw new Error("slotName cannot be null.");let t=this.slots;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.name==e)return s}return null}findSkin(e){if(!e)throw new Error("skinName cannot be null.");let t=this.skins;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.name==e)return s}return null}findEvent(e){if(!e)throw new Error("eventDataName cannot be null.");let t=this.events;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.name==e)return s}return null}findAnimation(e){if(!e)throw new Error("animationName cannot be null.");let t=this.animations;for(let n=0,i=t.length;n<i;n++){let s=t[n];if(s.name==e)return s}return null}findIkConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.ikConstraints;for(let n=0,i=t.length;n<i;n++){const s=t[n];if(s.name==e)return s}return null}findTransformConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.transformConstraints;for(let n=0,i=t.length;n<i;n++){const s=t[n];if(s.name==e)return s}return null}findPathConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.pathConstraints;for(let n=0,i=t.length;n<i;n++){const s=t[n];if(s.name==e)return s}return null}findPhysicsConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.physicsConstraints;for(let n=0,i=t.length;n<i;n++){const s=t[n];if(s.name==e)return s}return null}}class Dl{constructor(e=0,t,n){v(this,"slotIndex");v(this,"name");v(this,"attachment");this.slotIndex=e,this.name=t,this.attachment=n}}class N0{constructor(e){v(this,"name");v(this,"attachments",new Array);v(this,"bones",Array());v(this,"constraints",new Array);v(this,"color",new Je(.99607843,.61960787,.30980393,1));if(!e)throw new Error("name cannot be null.");this.name=e}setAttachment(e,t,n){if(!n)throw new Error("attachment cannot be null.");let i=this.attachments;e>=i.length&&(i.length=e+1),i[e]||(i[e]={}),i[e][t]=n}addSkin(e){for(let i=0;i<e.bones.length;i++){let s=e.bones[i],l=!1;for(let a=0;a<this.bones.length;a++)if(this.bones[a]==s){l=!0;break}l||this.bones.push(s)}for(let i=0;i<e.constraints.length;i++){let s=e.constraints[i],l=!1;for(let a=0;a<this.constraints.length;a++)if(this.constraints[a]==s){l=!0;break}l||this.constraints.push(s)}let t=e.getAttachments();for(let i=0;i<t.length;i++){var n=t[i];this.setAttachment(n.slotIndex,n.name,n.attachment)}}copySkin(e){for(let i=0;i<e.bones.length;i++){let s=e.bones[i],l=!1;for(let a=0;a<this.bones.length;a++)if(this.bones[a]==s){l=!0;break}l||this.bones.push(s)}for(let i=0;i<e.constraints.length;i++){let s=e.constraints[i],l=!1;for(let a=0;a<this.constraints.length;a++)if(this.constraints[a]==s){l=!0;break}l||this.constraints.push(s)}let t=e.getAttachments();for(let i=0;i<t.length;i++){var n=t[i];n.attachment&&(n.attachment instanceof Ai?(n.attachment=n.attachment.newLinkedMesh(),this.setAttachment(n.slotIndex,n.name,n.attachment)):(n.attachment=n.attachment.copy(),this.setAttachment(n.slotIndex,n.name,n.attachment)))}}getAttachment(e,t){let n=this.attachments[e];return n?n[t]:null}removeAttachment(e,t){let n=this.attachments[e];n&&delete n[t]}getAttachments(){let e=new Array;for(var t=0;t<this.attachments.length;t++){let n=this.attachments[t];if(n)for(let i in n){let s=n[i];s&&e.push(new Dl(t,i,s))}}return e}getAttachmentsForSlot(e,t){let n=this.attachments[e];if(n)for(let i in n){let s=n[i];s&&t.push(new Dl(e,i,s))}}clear(){this.attachments.length=0,this.bones.length=0,this.constraints.length=0}attachAll(e,t){let n=0;for(let i=0;i<e.slots.length;i++){let s=e.slots[i],l=s.getAttachment();if(l&&n<t.attachments.length){let a=t.attachments[n];for(let c in a){let o=a[c];if(l==o){let h=this.getAttachment(n,c);h&&s.setAttachment(h);break}}}n++}}}class F0{constructor(e,t,n){v(this,"index",0);v(this,"name");v(this,"boneData");v(this,"color",new Je(1,1,1,1));v(this,"darkColor",null);v(this,"attachmentName",null);v(this,"blendMode",qn.Normal);v(this,"visible",!0);if(e<0)throw new Error("index must be >= 0.");if(!t)throw new Error("name cannot be null.");if(!n)throw new Error("boneData cannot be null.");this.index=e,this.name=t,this.boneData=n}}var qn;(function(r){r[r.Normal=0]="Normal",r[r.Additive=1]="Additive",r[r.Multiply=2]="Multiply",r[r.Screen=3]="Screen"})(qn||(qn={}));class O0 extends Ur{constructor(t){super(t,0,!1);v(this,"bones",new Array);v(this,"_target",null);v(this,"mixRotate",0);v(this,"mixX",0);v(this,"mixY",0);v(this,"mixScaleX",0);v(this,"mixScaleY",0);v(this,"mixShearY",0);v(this,"offsetRotation",0);v(this,"offsetX",0);v(this,"offsetY",0);v(this,"offsetScaleX",0);v(this,"offsetScaleY",0);v(this,"offsetShearY",0);v(this,"relative",!1);v(this,"local",!1)}set target(t){this._target=t}get target(){if(this._target)return this._target;throw new Error("BoneData not set.")}}var Ul;(function(r){r[r.Region=0]="Region",r[r.BoundingBox=1]="BoundingBox",r[r.Mesh=2]="Mesh",r[r.LinkedMesh=3]="LinkedMesh",r[r.Path=4]="Path",r[r.Point=5]="Point",r[r.Clipping=6]="Clipping"})(Ul||(Ul={}));class Bt{constructor(){v(this,"convexPolygons",new Array);v(this,"convexPolygonsIndices",new Array);v(this,"indicesArray",new Array);v(this,"isConcaveArray",new Array);v(this,"triangles",new Array);v(this,"polygonPool",new Fa(()=>new Array));v(this,"polygonIndicesPool",new Fa(()=>new Array))}triangulate(e){let t=e,n=e.length>>1,i=this.indicesArray;i.length=0;for(let a=0;a<n;a++)i[a]=a;let s=this.isConcaveArray;s.length=0;for(let a=0,c=n;a<c;++a)s[a]=Bt.isConcave(a,n,t,i);let l=this.triangles;for(l.length=0;n>3;){let a=n-1,c=0,o=1;for(;;){e:if(!s[c]){let u=i[a]<<1,f=i[c]<<1,g=i[o]<<1,_=t[u],p=t[u+1],m=t[f],y=t[f+1],x=t[g],M=t[g+1];for(let b=(o+1)%n;b!=a;b=(b+1)%n){if(!s[b])continue;let S=i[b]<<1,w=t[S],R=t[S+1];if(Bt.positiveArea(x,M,_,p,w,R)&&Bt.positiveArea(_,p,m,y,w,R)&&Bt.positiveArea(m,y,x,M,w,R))break e}break}if(o==0){do{if(!s[c])break;c--}while(c>0);break}a=c,c=o,o=(o+1)%n}l.push(i[(n+c-1)%n]),l.push(i[c]),l.push(i[(c+1)%n]),i.splice(c,1),s.splice(c,1),n--;let h=(n+c-1)%n,d=c==n?0:c;s[h]=Bt.isConcave(h,n,t,i),s[d]=Bt.isConcave(d,n,t,i)}return n==3&&(l.push(i[2]),l.push(i[0]),l.push(i[1])),l}decompose(e,t){let n=e,i=this.convexPolygons;this.polygonPool.freeAll(i),i.length=0;let s=this.convexPolygonsIndices;this.polygonIndicesPool.freeAll(s),s.length=0;let l=this.polygonIndicesPool.obtain();l.length=0;let a=this.polygonPool.obtain();a.length=0;let c=-1,o=0;for(let h=0,d=t.length;h<d;h+=3){let u=t[h]<<1,f=t[h+1]<<1,g=t[h+2]<<1,_=n[u],p=n[u+1],m=n[f],y=n[f+1],x=n[g],M=n[g+1],b=!1;if(c==u){let S=a.length-4,w=Bt.winding(a[S],a[S+1],a[S+2],a[S+3],x,M),R=Bt.winding(x,M,a[0],a[1],a[2],a[3]);w==o&&R==o&&(a.push(x),a.push(M),l.push(g),b=!0)}b||(a.length>0?(i.push(a),s.push(l)):(this.polygonPool.free(a),this.polygonIndicesPool.free(l)),a=this.polygonPool.obtain(),a.length=0,a.push(_),a.push(p),a.push(m),a.push(y),a.push(x),a.push(M),l=this.polygonIndicesPool.obtain(),l.length=0,l.push(u),l.push(f),l.push(g),o=Bt.winding(_,p,m,y,x,M),c=u)}a.length>0&&(i.push(a),s.push(l));for(let h=0,d=i.length;h<d;h++){if(l=s[h],l.length==0)continue;let u=l[0],f=l[l.length-1];a=i[h];let g=a.length-4,_=a[g],p=a[g+1],m=a[g+2],y=a[g+3],x=a[0],M=a[1],b=a[2],S=a[3],w=Bt.winding(_,p,m,y,x,M);for(let R=0;R<d;R++){if(R==h)continue;let I=s[R];if(I.length!=3)continue;let E=I[0],A=I[1],H=I[2],B=i[R],C=B[B.length-2],D=B[B.length-1];if(E!=u||A!=f)continue;let U=Bt.winding(_,p,m,y,C,D),G=Bt.winding(C,D,x,M,b,S);U==w&&G==w&&(B.length=0,I.length=0,a.push(C),a.push(D),l.push(H),_=m,p=y,m=C,y=D,R=0)}}for(let h=i.length-1;h>=0;h--)a=i[h],a.length==0&&(i.splice(h,1),this.polygonPool.free(a),l=s[h],s.splice(h,1),this.polygonIndicesPool.free(l));return i}static isConcave(e,t,n,i){let s=i[(t+e-1)%t]<<1,l=i[e]<<1,a=i[(e+1)%t]<<1;return!this.positiveArea(n[s],n[s+1],n[l],n[l+1],n[a],n[a+1])}static positiveArea(e,t,n,i,s,l){return e*(l-i)+n*(t-l)+s*(i-t)>=0}static winding(e,t,n,i,s,l){let a=n-e,c=i-t;return s*c-l*a+a*t-e*c>=0?1:-1}}class Sr{constructor(){v(this,"triangulator",new Bt);v(this,"clippingPolygon",new Array);v(this,"clipOutput",new Array);v(this,"clippedVertices",new Array);v(this,"clippedUVs",new Array);v(this,"clippedTriangles",new Array);v(this,"scratch",new Array);v(this,"clipAttachment",null);v(this,"clippingPolygons",null)}clipStart(e,t){if(this.clipAttachment)return 0;this.clipAttachment=t;let n=t.worldVerticesLength,i=ge.setArraySize(this.clippingPolygon,n);t.computeWorldVertices(e,0,n,i,0,2);let s=this.clippingPolygon;Sr.makeClockwise(s);let l=this.clippingPolygons=this.triangulator.decompose(s,this.triangulator.triangulate(s));for(let a=0,c=l.length;a<c;a++){let o=l[a];Sr.makeClockwise(o),o.push(o[0]),o.push(o[1])}return l.length}clipEndWithSlot(e){this.clipAttachment&&this.clipAttachment.endSlot==e.data&&this.clipEnd()}clipEnd(){this.clipAttachment&&(this.clipAttachment=null,this.clippingPolygons=null,this.clippedVertices.length=0,this.clippedTriangles.length=0,this.clippingPolygon.length=0)}isClipping(){return this.clipAttachment!=null}clipTriangles(e,t,n,i,s,l,a,c){let o,h,d,u,f,g;typeof t=="number"?(o=n,h=i,d=s,u=l,f=a,g=c):(o=t,h=n,d=i,u=s,f=l,g=a),d&&u&&f&&typeof g=="boolean"?this.clipTrianglesRender(e,o,h,d,u,f,g):this.clipTrianglesNoRender(e,o,h)}clipTrianglesNoRender(e,t,n){let i=this.clipOutput,s=this.clippedVertices,l=this.clippedTriangles,a=this.clippingPolygons,c=a.length,o=0;s.length=0,l.length=0;for(let h=0;h<n;h+=3){let d=t[h]<<1,u=e[d],f=e[d+1];d=t[h+1]<<1;let g=e[d],_=e[d+1];d=t[h+2]<<1;let p=e[d],m=e[d+1];for(let y=0;y<c;y++){let x=s.length;if(this.clip(u,f,g,_,p,m,a[y],i)){let M=i.length;if(M==0)continue;let b=M>>1,S=this.clipOutput,w=ge.setArraySize(s,x+b*2);for(let I=0;I<M;I+=2,x+=2){let E=S[I],A=S[I+1];w[x]=E,w[x+1]=A}x=l.length;let R=ge.setArraySize(l,x+3*(b-2));b--;for(let I=1;I<b;I++,x+=3)R[x]=o,R[x+1]=o+I,R[x+2]=o+I+1;o+=b+1}else{let M=ge.setArraySize(s,x+6);M[x]=u,M[x+1]=f,M[x+2]=g,M[x+3]=_,M[x+4]=p,M[x+5]=m,x=l.length;let b=ge.setArraySize(l,x+3);b[x]=o,b[x+1]=o+1,b[x+2]=o+2,o+=3;break}}}}clipTrianglesRender(e,t,n,i,s,l,a){let c=this.clipOutput,o=this.clippedVertices,h=this.clippedTriangles,d=this.clippingPolygons,u=d.length,f=a?12:8,g=0;o.length=0,h.length=0;for(let _=0;_<n;_+=3){let p=t[_]<<1,m=e[p],y=e[p+1],x=i[p],M=i[p+1];p=t[_+1]<<1;let b=e[p],S=e[p+1],w=i[p],R=i[p+1];p=t[_+2]<<1;let I=e[p],E=e[p+1],A=i[p],H=i[p+1];for(let B=0;B<u;B++){let C=o.length;if(this.clip(m,y,b,S,I,E,d[B],c)){let D=c.length;if(D==0)continue;let U=S-E,G=I-b,V=m-I,W=E-y,J=1/(U*V+G*(y-E)),te=D>>1,re=this.clipOutput,ne=ge.setArraySize(o,C+te*f);for(let j=0;j<D;j+=2,C+=f){let ue=re[j],Se=re[j+1];ne[C]=ue,ne[C+1]=Se,ne[C+2]=s.r,ne[C+3]=s.g,ne[C+4]=s.b,ne[C+5]=s.a;let me=ue-I,fe=Se-E,Le=(U*me+G*fe)*J,Te=(W*me+V*fe)*J,k=1-Le-Te;ne[C+6]=x*Le+w*Te+A*k,ne[C+7]=M*Le+R*Te+H*k,a&&(ne[C+8]=l.r,ne[C+9]=l.g,ne[C+10]=l.b,ne[C+11]=l.a)}C=h.length;let O=ge.setArraySize(h,C+3*(te-2));te--;for(let j=1;j<te;j++,C+=3)O[C]=g,O[C+1]=g+j,O[C+2]=g+j+1;g+=te+1}else{let D=ge.setArraySize(o,C+3*f);D[C]=m,D[C+1]=y,D[C+2]=s.r,D[C+3]=s.g,D[C+4]=s.b,D[C+5]=s.a,a?(D[C+6]=x,D[C+7]=M,D[C+8]=l.r,D[C+9]=l.g,D[C+10]=l.b,D[C+11]=l.a,D[C+12]=b,D[C+13]=S,D[C+14]=s.r,D[C+15]=s.g,D[C+16]=s.b,D[C+17]=s.a,D[C+18]=w,D[C+19]=R,D[C+20]=l.r,D[C+21]=l.g,D[C+22]=l.b,D[C+23]=l.a,D[C+24]=I,D[C+25]=E,D[C+26]=s.r,D[C+27]=s.g,D[C+28]=s.b,D[C+29]=s.a,D[C+30]=A,D[C+31]=H,D[C+32]=l.r,D[C+33]=l.g,D[C+34]=l.b,D[C+35]=l.a):(D[C+6]=x,D[C+7]=M,D[C+8]=b,D[C+9]=S,D[C+10]=s.r,D[C+11]=s.g,D[C+12]=s.b,D[C+13]=s.a,D[C+14]=w,D[C+15]=R,D[C+16]=I,D[C+17]=E,D[C+18]=s.r,D[C+19]=s.g,D[C+20]=s.b,D[C+21]=s.a,D[C+22]=A,D[C+23]=H),C=h.length;let U=ge.setArraySize(h,C+3);U[C]=g,U[C+1]=g+1,U[C+2]=g+2,g+=3;break}}}}clipTrianglesUnpacked(e,t,n,i){let s=this.clipOutput,l=this.clippedVertices,a=this.clippedUVs,c=this.clippedTriangles,o=this.clippingPolygons,h=o.length,d=0;l.length=0,a.length=0,c.length=0;for(let u=0;u<n;u+=3){let f=t[u]<<1,g=e[f],_=e[f+1],p=i[f],m=i[f+1];f=t[u+1]<<1;let y=e[f],x=e[f+1],M=i[f],b=i[f+1];f=t[u+2]<<1;let S=e[f],w=e[f+1],R=i[f],I=i[f+1];for(let E=0;E<h;E++){let A=l.length;if(this.clip(g,_,y,x,S,w,o[E],s)){let H=s.length;if(H==0)continue;let B=x-w,C=S-y,D=g-S,U=w-_,G=1/(B*D+C*(_-w)),V=H>>1,W=this.clipOutput,J=ge.setArraySize(l,A+V*2),te=ge.setArraySize(a,A+V*2);for(let ne=0;ne<H;ne+=2,A+=2){let O=W[ne],j=W[ne+1];J[A]=O,J[A+1]=j;let ue=O-S,Se=j-w,me=(B*ue+C*Se)*G,fe=(U*ue+D*Se)*G,Le=1-me-fe;te[A]=p*me+M*fe+R*Le,te[A+1]=m*me+b*fe+I*Le}A=c.length;let re=ge.setArraySize(c,A+3*(V-2));V--;for(let ne=1;ne<V;ne++,A+=3)re[A]=d,re[A+1]=d+ne,re[A+2]=d+ne+1;d+=V+1}else{let H=ge.setArraySize(l,A+6);H[A]=g,H[A+1]=_,H[A+2]=y,H[A+3]=x,H[A+4]=S,H[A+5]=w;let B=ge.setArraySize(a,A+3*2);B[A]=p,B[A+1]=m,B[A+2]=M,B[A+3]=b,B[A+4]=R,B[A+5]=I,A=c.length;let C=ge.setArraySize(c,A+3);C[A]=d,C[A+1]=d+1,C[A+2]=d+2,d+=3;break}}}}clip(e,t,n,i,s,l,a,c){let o=c,h=!1,d;a.length%4>=2?(d=c,c=this.scratch):d=this.scratch,d.length=0,d.push(e),d.push(t),d.push(n),d.push(i),d.push(s),d.push(l),d.push(e),d.push(t),c.length=0;let u=a.length-4,f=a;for(let g=0;;g+=2){let _=f[g],p=f[g+1],m=_-f[g+2],y=p-f[g+3],x=c.length,M=d;for(let S=0,w=d.length-2;S<w;){let R=M[S],I=M[S+1];S+=2;let E=M[S],A=M[S+1],H=y*(_-E)>m*(p-A),B=y*(_-R)-m*(p-I);if(B>0){if(H){c.push(E),c.push(A);continue}let C=E-R,D=A-I,U=B/(C*y-D*m);if(U>=0&&U<=1)c.push(R+C*U),c.push(I+D*U);else{c.push(E),c.push(A);continue}}else if(H){let C=E-R,D=A-I,U=B/(C*y-D*m);if(U>=0&&U<=1)c.push(R+C*U),c.push(I+D*U),c.push(E),c.push(A);else{c.push(E),c.push(A);continue}}h=!0}if(x==c.length)return o.length=0,!0;if(c.push(c[0]),c.push(c[1]),g==u)break;let b=c;c=d,c.length=0,d=b}if(o!=c){o.length=0;for(let g=0,_=c.length-2;g<_;g++)o[g]=c[g]}else o.length=o.length-2;return h}static makeClockwise(e){let t=e,n=e.length,i=t[n-2]*t[1]-t[0]*t[n-1],s=0,l=0,a=0,c=0;for(let o=0,h=n-3;o<h;o+=2)s=t[o],l=t[o+1],a=t[o+2],c=t[o+3],i+=s*c-a*l;if(!(i<0))for(let o=0,h=n-2,d=n>>1;o<d;o+=2){let u=t[o],f=t[o+1],g=h-o;t[o]=t[g],t[o+1]=t[g+1],t[g]=u,t[g+1]=f}}}class Ss{constructor(e){v(this,"attachmentLoader");v(this,"scale",1);v(this,"linkedMeshes",new Array);this.attachmentLoader=e}readSkeletonData(e){let t=this.scale,n=new U0,i=typeof e=="string"?JSON.parse(e):e,s=i.skeleton;if(s&&(n.hash=s.hash,n.version=s.spine,n.x=s.x,n.y=s.y,n.width=s.width,n.height=s.height,n.referenceScale=N(s,"referenceScale",100)*t,n.fps=s.fps,n.imagesPath=s.images??null,n.audioPath=s.audio??null),i.bones)for(let l=0;l<i.bones.length;l++){let a=i.bones[l],c=null,o=N(a,"parent",null);o&&(c=n.findBone(o));let h=new E0(n.bones.length,a.name,c);h.length=N(a,"length",0)*t,h.x=N(a,"x",0)*t,h.y=N(a,"y",0)*t,h.rotation=N(a,"rotation",0),h.scaleX=N(a,"scaleX",1),h.scaleY=N(a,"scaleY",1),h.shearX=N(a,"shearX",0),h.shearY=N(a,"shearY",0),h.inherit=ge.enumValue(dt,N(a,"inherit","Normal")),h.skinRequired=N(a,"skin",!1);let d=N(a,"color",null);d&&h.color.setFromString(d),n.bones.push(h)}if(i.slots)for(let l=0;l<i.slots.length;l++){let a=i.slots[l],c=a.name,o=n.findBone(a.bone);if(!o)throw new Error(`Couldn't find bone ${a.bone} for slot ${c}`);let h=new F0(n.slots.length,c,o),d=N(a,"color",null);d&&h.color.setFromString(d);let u=N(a,"dark",null);u&&(h.darkColor=Je.fromString(u)),h.attachmentName=N(a,"attachment",null),h.blendMode=ge.enumValue(qn,N(a,"blend","normal")),h.visible=N(a,"visible",!0),n.slots.push(h)}if(i.ik)for(let l=0;l<i.ik.length;l++){let a=i.ik[l],c=new C0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);for(let h=0;h<a.bones.length;h++){let d=n.findBone(a.bones[h]);if(!d)throw new Error(`Couldn't find bone ${a.bones[h]} for IK constraint ${a.name}.`);c.bones.push(d)}let o=n.findBone(a.target);if(!o)throw new Error(`Couldn't find target bone ${a.target} for IK constraint ${a.name}.`);c.target=o,c.mix=N(a,"mix",1),c.softness=N(a,"softness",0)*t,c.bendDirection=N(a,"bendPositive",!0)?1:-1,c.compress=N(a,"compress",!1),c.stretch=N(a,"stretch",!1),c.uniform=N(a,"uniform",!1),n.ikConstraints.push(c)}if(i.transform)for(let l=0;l<i.transform.length;l++){let a=i.transform[l],c=new O0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);for(let d=0;d<a.bones.length;d++){let u=a.bones[d],f=n.findBone(u);if(!f)throw new Error(`Couldn't find bone ${u} for transform constraint ${a.name}.`);c.bones.push(f)}let o=a.target,h=n.findBone(o);if(!h)throw new Error(`Couldn't find target bone ${o} for transform constraint ${a.name}.`);c.target=h,c.local=N(a,"local",!1),c.relative=N(a,"relative",!1),c.offsetRotation=N(a,"rotation",0),c.offsetX=N(a,"x",0)*t,c.offsetY=N(a,"y",0)*t,c.offsetScaleX=N(a,"scaleX",0),c.offsetScaleY=N(a,"scaleY",0),c.offsetShearY=N(a,"shearY",0),c.mixRotate=N(a,"mixRotate",1),c.mixX=N(a,"mixX",1),c.mixY=N(a,"mixY",c.mixX),c.mixScaleX=N(a,"mixScaleX",1),c.mixScaleY=N(a,"mixScaleY",c.mixScaleX),c.mixShearY=N(a,"mixShearY",1),n.transformConstraints.push(c)}if(i.path)for(let l=0;l<i.path.length;l++){let a=i.path[l],c=new R0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);for(let d=0;d<a.bones.length;d++){let u=a.bones[d],f=n.findBone(u);if(!f)throw new Error(`Couldn't find bone ${u} for path constraint ${a.name}.`);c.bones.push(f)}let o=a.target,h=n.findSlot(o);if(!h)throw new Error(`Couldn't find target slot ${o} for path constraint ${a.name}.`);c.target=h,c.positionMode=ge.enumValue(Jn,N(a,"positionMode","Percent")),c.spacingMode=ge.enumValue(Ft,N(a,"spacingMode","Length")),c.rotateMode=ge.enumValue(bi,N(a,"rotateMode","Tangent")),c.offsetRotation=N(a,"rotation",0),c.position=N(a,"position",0),c.positionMode==Jn.Fixed&&(c.position*=t),c.spacing=N(a,"spacing",0),(c.spacingMode==Ft.Length||c.spacingMode==Ft.Fixed)&&(c.spacing*=t),c.mixRotate=N(a,"mixRotate",1),c.mixX=N(a,"mixX",1),c.mixY=N(a,"mixY",c.mixX),n.pathConstraints.push(c)}if(i.physics)for(let l=0;l<i.physics.length;l++){const a=i.physics[l],c=new D0(a.name);c.order=N(a,"order",0),c.skinRequired=N(a,"skin",!1);const o=a.bone,h=n.findBone(o);if(h==null)throw new Error("Physics bone not found: "+o);c.bone=h,c.x=N(a,"x",0),c.y=N(a,"y",0),c.rotate=N(a,"rotate",0),c.scaleX=N(a,"scaleX",0),c.shearX=N(a,"shearX",0),c.limit=N(a,"limit",5e3)*t,c.step=1/N(a,"fps",60),c.inertia=N(a,"inertia",1),c.strength=N(a,"strength",100),c.damping=N(a,"damping",1),c.massInverse=1/N(a,"mass",1),c.wind=N(a,"wind",0),c.gravity=N(a,"gravity",0),c.mix=N(a,"mix",1),c.inertiaGlobal=N(a,"inertiaGlobal",!1),c.strengthGlobal=N(a,"strengthGlobal",!1),c.dampingGlobal=N(a,"dampingGlobal",!1),c.massGlobal=N(a,"massGlobal",!1),c.windGlobal=N(a,"windGlobal",!1),c.gravityGlobal=N(a,"gravityGlobal",!1),c.mixGlobal=N(a,"mixGlobal",!1),n.physicsConstraints.push(c)}if(i.skins)for(let l=0;l<i.skins.length;l++){let a=i.skins[l],c=new N0(a.name);if(a.bones)for(let o=0;o<a.bones.length;o++){let h=a.bones[o],d=n.findBone(h);if(!d)throw new Error(`Couldn't find bone ${h} for skin ${a.name}.`);c.bones.push(d)}if(a.ik)for(let o=0;o<a.ik.length;o++){let h=a.ik[o],d=n.findIkConstraint(h);if(!d)throw new Error(`Couldn't find IK constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}if(a.transform)for(let o=0;o<a.transform.length;o++){let h=a.transform[o],d=n.findTransformConstraint(h);if(!d)throw new Error(`Couldn't find transform constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}if(a.path)for(let o=0;o<a.path.length;o++){let h=a.path[o],d=n.findPathConstraint(h);if(!d)throw new Error(`Couldn't find path constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}if(a.physics)for(let o=0;o<a.physics.length;o++){let h=a.physics[o],d=n.findPhysicsConstraint(h);if(!d)throw new Error(`Couldn't find physics constraint ${h} for skin ${a.name}.`);c.constraints.push(d)}for(let o in a.attachments){let h=n.findSlot(o);if(!h)throw new Error(`Couldn't find slot ${o} for skin ${a.name}.`);let d=a.attachments[o];for(let u in d){let f=this.readAttachment(d[u],c,h.index,u,n);f&&c.setAttachment(h.index,u,f)}}n.skins.push(c),c.name=="default"&&(n.defaultSkin=c)}for(let l=0,a=this.linkedMeshes.length;l<a;l++){let c=this.linkedMeshes[l],o=c.skin?n.findSkin(c.skin):n.defaultSkin;if(!o)throw new Error(`Skin not found: ${c.skin}`);let h=o.getAttachment(c.slotIndex,c.parent);if(!h)throw new Error(`Parent mesh not found: ${c.parent}`);c.mesh.timelineAttachment=c.inheritTimeline?h:c.mesh,c.mesh.setParentMesh(h),c.mesh.region!=null&&c.mesh.updateRegion()}if(this.linkedMeshes.length=0,i.events)for(let l in i.events){let a=i.events[l],c=new T0(l);c.intValue=N(a,"int",0),c.floatValue=N(a,"float",0),c.stringValue=N(a,"string",""),c.audioPath=N(a,"audio",null),c.audioPath&&(c.volume=N(a,"volume",1),c.balance=N(a,"balance",0)),n.events.push(c)}if(i.animations)for(let l in i.animations){let a=i.animations[l];this.readAnimation(a,l,n)}return n}readAttachment(e,t,n,i,s){let l=this.scale;switch(i=N(e,"name",i),N(e,"type","region")){case"region":{let a=N(e,"path",i),c=this.readSequence(N(e,"sequence",null)),o=this.attachmentLoader.newRegionAttachment(t,i,a,c);if(!o)return null;o.path=a,o.x=N(e,"x",0)*l,o.y=N(e,"y",0)*l,o.scaleX=N(e,"scaleX",1),o.scaleY=N(e,"scaleY",1),o.rotation=N(e,"rotation",0),o.width=e.width*l,o.height=e.height*l,o.sequence=c;let h=N(e,"color",null);return h&&o.color.setFromString(h),o.region!=null&&o.updateRegion(),o}case"boundingbox":{let a=this.attachmentLoader.newBoundingBoxAttachment(t,i);if(!a)return null;this.readVertices(e,a,e.vertexCount<<1);let c=N(e,"color",null);return c&&a.color.setFromString(c),a}case"mesh":case"linkedmesh":{let a=N(e,"path",i),c=this.readSequence(N(e,"sequence",null)),o=this.attachmentLoader.newMeshAttachment(t,i,a,c);if(!o)return null;o.path=a;let h=N(e,"color",null);h&&o.color.setFromString(h),o.width=N(e,"width",0)*l,o.height=N(e,"height",0)*l,o.sequence=c;let d=N(e,"parent",null);if(d)return this.linkedMeshes.push(new B0(o,N(e,"skin",null),n,d,N(e,"timelines",!0))),o;let u=e.uvs;return this.readVertices(e,o,u.length),o.triangles=e.triangles,o.regionUVs=u,o.region!=null&&o.updateRegion(),o.edges=N(e,"edges",null),o.hullLength=N(e,"hull",0)*2,o}case"path":{let a=this.attachmentLoader.newPathAttachment(t,i);if(!a)return null;a.closed=N(e,"closed",!1),a.constantSpeed=N(e,"constantSpeed",!0);let c=e.vertexCount;this.readVertices(e,a,c<<1);let o=ge.newArray(c/3,0);for(let d=0;d<e.lengths.length;d++)o[d]=e.lengths[d]*l;a.lengths=o;let h=N(e,"color",null);return h&&a.color.setFromString(h),a}case"point":{let a=this.attachmentLoader.newPointAttachment(t,i);if(!a)return null;a.x=N(e,"x",0)*l,a.y=N(e,"y",0)*l,a.rotation=N(e,"rotation",0);let c=N(e,"color",null);return c&&a.color.setFromString(c),a}case"clipping":{let a=this.attachmentLoader.newClippingAttachment(t,i);if(!a)return null;let c=N(e,"end",null);c&&(a.endSlot=s.findSlot(c));let o=e.vertexCount;this.readVertices(e,a,o<<1);let h=N(e,"color",null);return h&&a.color.setFromString(h),a}}return null}readSequence(e){if(e==null)return null;let t=new Oa(N(e,"count",0));return t.start=N(e,"start",1),t.digits=N(e,"digits",0),t.setupIndex=N(e,"setup",0),t}readVertices(e,t,n){let i=this.scale;t.worldVerticesLength=n;let s=e.vertices;if(n==s.length){let c=ge.toFloatArray(s);if(i!=1)for(let o=0,h=s.length;o<h;o++)c[o]*=i;t.vertices=c;return}let l=new Array,a=new Array;for(let c=0,o=s.length;c<o;){let h=s[c++];a.push(h);for(let d=c+h*4;c<d;c+=4)a.push(s[c]),l.push(s[c+1]*i),l.push(s[c+2]*i),l.push(s[c+3])}t.bones=a,t.vertices=ge.toFloatArray(l)}readAnimation(e,t,n){let i=this.scale,s=new Array;if(e.slots)for(let a in e.slots){let c=e.slots[a],o=n.findSlot(a);if(!o)throw new Error("Slot not found: "+a);let h=o.index;for(let d in c){let u=c[d];if(!u)continue;let f=u.length;if(d=="attachment"){let g=new ys(f,h);for(let _=0;_<f;_++){let p=u[_];g.setFrame(_,N(p,"time",0),N(p,"name",null))}s.push(g)}else if(d=="rgba"){let g=new $g(f,f<<2,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.color);for(let y=0,x=0;;y++){g.setFrame(y,p,m.r,m.g,m.b,m.a);let M=u[y+1];if(!M){g.shrink(x);break}let b=N(M,"time",0),S=Je.fromString(M.color),w=_.curve;w&&(x=je(w,g,x,y,0,p,b,m.r,S.r,1),x=je(w,g,x,y,1,p,b,m.g,S.g,1),x=je(w,g,x,y,2,p,b,m.b,S.b,1),x=je(w,g,x,y,3,p,b,m.a,S.a,1)),p=b,m=S,_=M}s.push(g)}else if(d=="rgb"){let g=new jg(f,f*3,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.color);for(let y=0,x=0;;y++){g.setFrame(y,p,m.r,m.g,m.b);let M=u[y+1];if(!M){g.shrink(x);break}let b=N(M,"time",0),S=Je.fromString(M.color),w=_.curve;w&&(x=je(w,g,x,y,0,p,b,m.r,S.r,1),x=je(w,g,x,y,1,p,b,m.g,S.g,1),x=je(w,g,x,y,2,p,b,m.b,S.b,1)),p=b,m=S,_=M}s.push(g)}else if(d=="alpha")s.push(rn(u,new Kg(f,f,h),0,1));else if(d=="rgba2"){let g=new Jg(f,f*7,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.light),y=Je.fromString(_.dark);for(let x=0,M=0;;x++){g.setFrame(x,p,m.r,m.g,m.b,m.a,y.r,y.g,y.b);let b=u[x+1];if(!b){g.shrink(M);break}let S=N(b,"time",0),w=Je.fromString(b.light),R=Je.fromString(b.dark),I=_.curve;I&&(M=je(I,g,M,x,0,p,S,m.r,w.r,1),M=je(I,g,M,x,1,p,S,m.g,w.g,1),M=je(I,g,M,x,2,p,S,m.b,w.b,1),M=je(I,g,M,x,3,p,S,m.a,w.a,1),M=je(I,g,M,x,4,p,S,y.r,R.r,1),M=je(I,g,M,x,5,p,S,y.g,R.g,1),M=je(I,g,M,x,6,p,S,y.b,R.b,1)),p=S,m=w,y=R,_=b}s.push(g)}else if(d=="rgb2"){let g=new Qg(f,f*6,h),_=u[0],p=N(_,"time",0),m=Je.fromString(_.light),y=Je.fromString(_.dark);for(let x=0,M=0;;x++){g.setFrame(x,p,m.r,m.g,m.b,y.r,y.g,y.b);let b=u[x+1];if(!b){g.shrink(M);break}let S=N(b,"time",0),w=Je.fromString(b.light),R=Je.fromString(b.dark),I=_.curve;I&&(M=je(I,g,M,x,0,p,S,m.r,w.r,1),M=je(I,g,M,x,1,p,S,m.g,w.g,1),M=je(I,g,M,x,2,p,S,m.b,w.b,1),M=je(I,g,M,x,3,p,S,y.r,R.r,1),M=je(I,g,M,x,4,p,S,y.g,R.g,1),M=je(I,g,M,x,5,p,S,y.b,R.b,1)),p=S,m=w,y=R,_=b}s.push(g)}}}if(e.bones)for(let a in e.bones){let c=e.bones[a],o=n.findBone(a);if(!o)throw new Error("Bone not found: "+a);let h=o.index;for(let d in c){let u=c[d],f=u.length;if(f!=0){if(d==="rotate")s.push(rn(u,new Ba(f,f,h),0,1));else if(d==="translate"){let g=new kg(f,f<<1,h);s.push(ya(u,g,"x","y",0,i))}else if(d==="translatex"){let g=new zg(f,f,h);s.push(rn(u,g,0,i))}else if(d==="translatey"){let g=new Gg(f,f,h);s.push(rn(u,g,0,i))}else if(d==="scale"){let g=new Vg(f,f<<1,h);s.push(ya(u,g,"x","y",1,1))}else if(d==="scalex"){let g=new Hg(f,f,h);s.push(rn(u,g,1,1))}else if(d==="scaley"){let g=new Wg(f,f,h);s.push(rn(u,g,1,1))}else if(d==="shear"){let g=new Xg(f,f<<1,h);s.push(ya(u,g,"x","y",0,1))}else if(d==="shearx"){let g=new Yg(f,f,h);s.push(rn(u,g,0,1))}else if(d==="sheary"){let g=new qg(f,f,h);s.push(rn(u,g,0,1))}else if(d==="inherit"){let g=new Zg(f,o.index);for(let _=0;_<u.length;_++){let p=u[_];g.setFrame(_,N(p,"time",0),ge.enumValue(dt,N(p,"inherit","Normal")))}s.push(g)}}}}if(e.ik)for(let a in e.ik){let c=e.ik[a],o=c[0];if(!o)continue;let h=n.findIkConstraint(a);if(!h)throw new Error("IK Constraint not found: "+a);let d=n.ikConstraints.indexOf(h),u=new t0(c.length,c.length<<1,d),f=N(o,"time",0),g=N(o,"mix",1),_=N(o,"softness",0)*i;for(let p=0,m=0;;p++){u.setFrame(p,f,g,_,N(o,"bendPositive",!0)?1:-1,N(o,"compress",!1),N(o,"stretch",!1));let y=c[p+1];if(!y){u.shrink(m);break}let x=N(y,"time",0),M=N(y,"mix",1),b=N(y,"softness",0)*i,S=o.curve;S&&(m=je(S,u,m,p,0,f,x,g,M,1),m=je(S,u,m,p,1,f,x,_,b,i)),f=x,g=M,_=b,o=y}s.push(u)}if(e.transform)for(let a in e.transform){let c=e.transform[a],o=c[0];if(!o)continue;let h=n.findTransformConstraint(a);if(!h)throw new Error("Transform constraint not found: "+a);let d=n.transformConstraints.indexOf(h),u=new n0(c.length,c.length*6,d),f=N(o,"time",0),g=N(o,"mixRotate",1),_=N(o,"mixX",1),p=N(o,"mixY",_),m=N(o,"mixScaleX",1),y=N(o,"mixScaleY",m),x=N(o,"mixShearY",1);for(let M=0,b=0;;M++){u.setFrame(M,f,g,_,p,m,y,x);let S=c[M+1];if(!S){u.shrink(b);break}let w=N(S,"time",0),R=N(S,"mixRotate",1),I=N(S,"mixX",1),E=N(S,"mixY",I),A=N(S,"mixScaleX",1),H=N(S,"mixScaleY",A),B=N(S,"mixShearY",1),C=o.curve;C&&(b=je(C,u,b,M,0,f,w,g,R,1),b=je(C,u,b,M,1,f,w,_,I,1),b=je(C,u,b,M,2,f,w,p,E,1),b=je(C,u,b,M,3,f,w,m,A,1),b=je(C,u,b,M,4,f,w,y,H,1),b=je(C,u,b,M,5,f,w,x,B,1)),f=w,g=R,_=I,p=E,m=A,y=H,m=A,o=S}s.push(u)}if(e.path)for(let a in e.path){let c=e.path[a],o=n.findPathConstraint(a);if(!o)throw new Error("Path constraint not found: "+a);let h=n.pathConstraints.indexOf(o);for(let d in c){let u=c[d],f=u[0];if(!f)continue;let g=u.length;if(d==="position"){let _=new i0(g,g,h);s.push(rn(u,_,0,o.positionMode==Jn.Fixed?i:1))}else if(d==="spacing"){let _=new s0(g,g,h);s.push(rn(u,_,0,o.spacingMode==Ft.Length||o.spacingMode==Ft.Fixed?i:1))}else if(d==="mix"){let _=new r0(g,g*3,h),p=N(f,"time",0),m=N(f,"mixRotate",1),y=N(f,"mixX",1),x=N(f,"mixY",y);for(let M=0,b=0;;M++){_.setFrame(M,p,m,y,x);let S=u[M+1];if(!S){_.shrink(b);break}let w=N(S,"time",0),R=N(S,"mixRotate",1),I=N(S,"mixX",1),E=N(S,"mixY",I),A=f.curve;A&&(b=je(A,_,b,M,0,p,w,m,R,1),b=je(A,_,b,M,1,p,w,y,I,1),b=je(A,_,b,M,2,p,w,x,E,1)),p=w,m=R,y=I,x=E,f=S}s.push(_)}}}if(e.physics)for(let a in e.physics){let c=e.physics[a],o=-1;if(a.length>0){let h=n.findPhysicsConstraint(a);if(!h)throw new Error("Physics constraint not found: "+a);o=n.physicsConstraints.indexOf(h)}for(let h in c){let d=c[h],u=d[0];if(!u)continue;let f=d.length;if(h=="reset"){const _=new ka(f,o);for(let p=0;u!=null;u=d[p+1],p++)_.setFrame(p,N(u,"time",0));s.push(_);continue}let g;if(h=="inertia")g=new a0(f,f,o);else if(h=="strength")g=new o0(f,f,o);else if(h=="damping")g=new l0(f,f,o);else if(h=="mass")g=new c0(f,f,o);else if(h=="wind")g=new h0(f,f,o);else if(h=="gravity")g=new d0(f,f,o);else if(h=="mix")g=new u0(f,f,o);else continue;s.push(rn(d,g,0,1))}}if(e.attachments)for(let a in e.attachments){let c=e.attachments[a],o=n.findSkin(a);if(!o)throw new Error("Skin not found: "+a);for(let h in c){let d=c[h],u=n.findSlot(h);if(!u)throw new Error("Slot not found: "+h);let f=u.index;for(let g in d){let _=d[g],p=o.getAttachment(f,g);for(let m in _){let y=_[m],x=y[0];if(x){if(m=="deform"){let M=p.bones,b=p.vertices,S=M?b.length/3*2:b.length,w=new e0(y.length,y.length,f,p),R=N(x,"time",0);for(let I=0,E=0;;I++){let A,H=N(x,"vertices",null);if(!H)A=M?ge.newFloatArray(S):b;else{A=ge.newFloatArray(S);let U=N(x,"offset",0);if(ge.arrayCopy(H,0,A,U,H.length),i!=1)for(let G=U,V=G+H.length;G<V;G++)A[G]*=i;if(!M)for(let G=0;G<S;G++)A[G]+=b[G]}w.setFrame(I,R,A);let B=y[I+1];if(!B){w.shrink(E);break}let C=N(B,"time",0),D=x.curve;D&&(E=je(D,w,E,I,0,R,C,0,1,1)),R=C,x=B}s.push(w)}else if(m=="sequence"){let M=new za(y.length,f,p),b=0;for(let S=0;S<y.length;S++){let w=N(x,"delay",b),R=N(x,"time",0),I=At[N(x,"mode","hold")],E=N(x,"index",0);M.setFrame(S,R,I,E,w),b=w,x=y[S+1]}s.push(M)}}}}}}if(e.drawOrder){let a=new ts(e.drawOrder.length),c=n.slots.length,o=0;for(let h=0;h<e.drawOrder.length;h++,o++){let d=e.drawOrder[h],u=null,f=N(d,"offsets",null);if(f){u=ge.newArray(c,-1);let g=ge.newArray(c-f.length,0),_=0,p=0;for(let m=0;m<f.length;m++){let y=f[m],x=n.findSlot(y.slot);if(!x)throw new Error("Slot not found: "+x);let M=x.index;for(;_!=M;)g[p++]=_++;u[_+y.offset]=_++}for(;_<c;)g[p++]=_++;for(let m=c-1;m>=0;m--)u[m]==-1&&(u[m]=g[--p])}a.setFrame(o,N(d,"time",0),u)}s.push(a)}if(e.events){let a=new Mr(e.events.length),c=0;for(let o=0;o<e.events.length;o++,c++){let h=e.events[o],d=n.findEvent(h.name);if(!d)throw new Error("Event not found: "+h.name);let u=new b0(ge.toSinglePrecision(N(h,"time",0)),d);u.intValue=N(h,"int",d.intValue),u.floatValue=N(h,"float",d.floatValue),u.stringValue=N(h,"string",d.stringValue),u.data.audioPath&&(u.volume=N(h,"volume",1),u.balance=N(h,"balance",0)),a.setFrame(c,u)}s.push(a)}let l=0;for(let a=0,c=s.length;a<c;a++)l=Math.max(l,s[a].getDuration());n.animations.push(new Dc(t,s,l))}}class B0{constructor(e,t,n,i,s){v(this,"parent");v(this,"skin");v(this,"slotIndex");v(this,"mesh");v(this,"inheritTimeline");this.mesh=e,this.skin=t,this.slotIndex=n,this.parent=i,this.inheritTimeline=s}}function rn(r,e,t,n){let i=r[0],s=N(i,"time",0),l=N(i,"value",t)*n,a=0;for(let c=0;;c++){e.setFrame(c,s,l);let o=r[c+1];if(!o)return e.shrink(a),e;let h=N(o,"time",0),d=N(o,"value",t)*n;i.curve&&(a=je(i.curve,e,a,c,0,s,h,l,d,n)),s=h,l=d,i=o}}function ya(r,e,t,n,i,s){let l=r[0],a=N(l,"time",0),c=N(l,t,i)*s,o=N(l,n,i)*s,h=0;for(let d=0;;d++){e.setFrame(d,a,c,o);let u=r[d+1];if(!u)return e.shrink(h),e;let f=N(u,"time",0),g=N(u,t,i)*s,_=N(u,n,i)*s,p=l.curve;p&&(h=je(p,e,h,d,0,a,f,c,g,s),h=je(p,e,h,d,1,a,f,o,_,s)),a=f,c=g,o=_,l=u}}function je(r,e,t,n,i,s,l,a,c,o){if(r=="stepped")return e.setStepped(n),t;let h=i<<2,d=r[h],u=r[h+1]*o,f=r[h+2],g=r[h+3]*o;return e.setBezier(t,n,i,s,a,d,u,f,g,l,c),t+1}function N(r,e,t){return r[e]!==void 0?r[e]:t}typeof Math.fround>"u"&&(Math.fround=function(r){return function(e){return r[0]=e,r[0]}}(new Float32Array(1)));const gi=class gi extends x0{constructor(t,n=!1){super(t);v(this,"texture");t instanceof ImageBitmap?this.texture=new Og(t):this.texture=new en(t),this.texture.premultiplyAlpha=!n,this.texture.flipY=!1,this.texture.needsUpdate=!0}setFilters(t,n){this.texture.minFilter=gi.toThreeJsMinificationTextureFilter(t),this.texture.magFilter=gi.toThreeJsMagnificationTextureFilter(n)}setWraps(t,n){this.texture.wrapS=gi.toThreeJsTextureWrap(t),this.texture.wrapT=gi.toThreeJsTextureWrap(n)}dispose(){this.texture.dispose()}static toThreeJsMinificationTextureFilter(t){if(t===wt.Linear)return bt;if(t===wt.MipMap)return Qh;if(t===wt.MipMapLinearNearest)return Jh;if(t===wt.MipMapNearestLinear)return Kh;if(t===wt.MipMapNearestNearest)return jh;if(t===wt.Nearest)return xt;throw new Error("Unknown texture filter: "+t)}static toThreeJsMagnificationTextureFilter(t){if(t===wt.Linear)return bt;if(t===wt.MipMap)return bt;if(t===wt.MipMapLinearNearest)return xt;if(t===wt.MipMapNearestLinear)return bt;if(t===wt.MipMapNearestNearest)return xt;if(t===wt.Nearest)return xt;throw new Error("Unknown texture filter: "+t)}static toThreeJsTextureWrap(t){if(t===Cn.ClampToEdge)return Jt;if(t===Cn.MirroredRepeat)return fr;if(t===Cn.Repeat)return ur;throw new Error("Unknown texture wrap: "+t)}static toThreeJsBlending(t){if(t===qn.Normal)return{blending:An};if(t===qn.Additive)return{blending:ba};if(t===qn.Multiply)return{blending:Ta,blendSrc:Jl,blendDst:ws,blendSrcAlpha:or,blendDstAlpha:ws};if(t===qn.Screen)return{blending:Ta,blendSrc:or,blendDst:Aa,blendSrcAlpha:or,blendDstAlpha:Aa};throw new Error("Unknown blendMode: "+t)}};v(gi,"fist",!0);let yr=gi;class rr extends w0{constructor(e="",t=new Nc,n=!1){super(i=>new yr(i,n),e,t)}}const zn=class zn extends Gt{constructor(t,n=()=>{}){super();v(this,"tempPos",new Ts);v(this,"tempUv",new Ts);v(this,"tempLight",new Je);v(this,"tempDark",new Je);v(this,"skeleton");v(this,"state");v(this,"zOffset",.1);v(this,"batches",new Array);v(this,"materialFactory");v(this,"nextBatchIndex",0);v(this,"clipper",new Sr);v(this,"vertexSize",8);v(this,"twoColorTint");v(this,"vertices",ge.newFloatArray(1024));v(this,"tempColor",new Je);v(this,"tempDarkColor",new Je);v(this,"_castShadow",!1);v(this,"_receiveShadow",!1);"skeletonData"in t||(t={skeletonData:t,materialFactory:()=>{const l={...zn.DEFAULT_MATERIAL_PARAMETERS};return n(l),new vr(l)}}),this.twoColorTint=t.twoColorTint??!0,this.twoColorTint&&(this.vertexSize+=4),this.materialFactory=t.materialFactory??(()=>new vr(zn.DEFAULT_MATERIAL_PARAMETERS)),this.skeleton=new Ha(t.skeletonData);let i=new _0(t.skeletonData);this.state=new Ga(i),Object.defineProperty(this,"castShadow",{get:()=>this._castShadow,set:s=>{this._castShadow=s,this.traverse(l=>{l instanceof ji&&(l.castShadow=s)})}}),Object.defineProperty(this,"receiveShadow",{get:()=>this._receiveShadow,set:s=>{this._receiveShadow=s,this.traverse(l=>{l instanceof ji&&(l.receiveShadow=s)})}})}update(t){let n=this.state,i=this.skeleton;n.update(t),n.apply(i),i.update(t),i.updateWorldTransform(Vn.update),this.updateGeometry()}dispose(){for(var t=0;t<this.batches.length;t++)this.batches[t].dispose()}clearBatches(){for(var t=0;t<this.batches.length;t++)this.batches[t].clear(),this.batches[t].visible=!1;this.nextBatchIndex=0}nextBatch(){if(this.batches.length==this.nextBatchIndex){let n=new ji(ji.MAX_VERTICES,this.materialFactory,this.twoColorTint);n.castShadow=this._castShadow,n.receiveShadow=this._receiveShadow,this.add(n),this.batches.push(n)}let t=this.batches[this.nextBatchIndex++];return t.visible=!0,t}updateGeometry(){this.clearBatches();let t=this.tempLight;this.tempDark;let n=this.clipper,i=this.vertices,s=null,l=null,a=this.skeleton.drawOrder,c=this.nextBatch();c.begin();let o=0,h=this.zOffset;for(let d=0,u=a.length;d<u;d++){let f=n.isClipping()?2:this.vertexSize,g=a[d];if(!g.bone.active){n.clipEndWithSlot(g);continue}let _=g.getAttachment(),p,m,y=0;if(_ instanceof As){let x=_;p=x.color,i=this.vertices,y=f*4,x.computeWorldVertices(g,i,0,f),s=zn.QUAD_TRIANGLES,l=x.uvs,m=x.region.texture}else if(_ instanceof Ai){let x=_;p=x.color,i=this.vertices,y=(x.worldVerticesLength>>1)*f,y>i.length&&(i=this.vertices=ge.newFloatArray(y)),x.computeWorldVertices(g,0,x.worldVerticesLength,i,0,f),s=x.triangles,l=x.uvs,m=x.region.texture}else if(_ instanceof Ps){let x=_;n.clipStart(g,x);continue}else{n.clipEndWithSlot(g);continue}if(m!=null){let M=g.bone.skeleton.color,b=g.color,S=M.a*b.a*p.a,w=this.tempColor;w.set(M.r*b.r*p.r*S,M.g*b.g*p.g*S,M.b*b.b*p.b*S,S);let R=this.tempDarkColor;g.darkColor?(R.r=g.darkColor.r*S,R.g=g.darkColor.g*S,R.b=g.darkColor.b*S,R.a=1):R.set(1,1,1,0);let I,E,A,H;if(n.isClipping()){n.clipTriangles(i,s,s.length,l,w,t,this.twoColorTint);let U=n.clippedVertices,G=n.clippedTriangles;I=U,E=U.length,A=G,H=G.length}else{let U=i;if(this.twoColorTint)for(let G=2,V=0,W=y;G<W;G+=f,V+=2)U[G]=w.r,U[G+1]=w.g,U[G+2]=w.b,U[G+3]=w.a,U[G+4]=l[V],U[G+5]=l[V+1],U[G+6]=R.r,U[G+7]=R.g,U[G+8]=R.b,U[G+9]=R.a;else for(let G=2,V=0,W=y;G<W;G+=f,V+=2)U[G]=w.r,U[G+1]=w.g,U[G+2]=w.b,U[G+3]=w.a,U[G+4]=l[V],U[G+5]=l[V+1];I=i,E=y,A=s,H=s.length}if(E==0||H==0){n.clipEndWithSlot(g);continue}c.canBatch(E/this.vertexSize,H)||(c.end(),c=this.nextBatch(),c.begin());const B=g.data.blendMode,C=m.texture,D=c.findMaterialGroup(C,B);c.addMaterialGroup(H,D),c.batch(I,E,A,H,o),o+=h}n.clipEndWithSlot(g)}n.clipEnd(),c.end()}};v(zn,"DEFAULT_MATERIAL_PARAMETERS",{side:un,depthWrite:!0,depthTest:!0,transparent:!0,alphaTest:.001,vertexColors:!0,premultipliedAlpha:!0}),v(zn,"QUAD_TRIANGLES",[0,1,2,2,3,0]),v(zn,"VERTEX_SIZE",8);let Hn=zn;const Es=class Es extends mn{constructor(t=Es.MAX_VERTICES,n,i=!0){super();v(this,"materialFactory");v(this,"twoColorTint");v(this,"vertexSize",9);v(this,"vertexBuffer");v(this,"vertices");v(this,"verticesLength",0);v(this,"indices");v(this,"indicesLength",0);v(this,"materialGroups",[]);if(this.materialFactory=n,this.twoColorTint=i,t>Es.MAX_VERTICES)throw new Error("Can't have more than 10920 triangles per batch: "+t);i&&(this.vertexSize+=3);let s=this.vertices=new Float32Array(t*this.vertexSize),l=this.indices=new Uint16Array(t*3),a=new ti,c=this.vertexBuffer=new Fg(s,this.vertexSize);c.usage=WebGLRenderingContext.DYNAMIC_DRAW,a.setAttribute("position",new $i(c,3,0,!1)),a.setAttribute("color",new $i(c,4,3,!1)),a.setAttribute("uv",new $i(c,2,7,!1)),i&&a.setAttribute("darkcolor",new $i(c,3,9,!1)),a.setIndex(new Qt(l,1)),a.getIndex().usage=WebGLRenderingContext.DYNAMIC_DRAW,a.drawRange.start=0,a.drawRange.count=0,this.geometry=a,this.material=[]}dispose(){if(this.geometry.dispose(),this.material instanceof Ei)this.material.dispose();else if(this.material)for(let t=0;t<this.material.length;t++){let n=this.material[t];n instanceof Ei&&n.dispose()}}clear(){let t=this.geometry;if(t.drawRange.start=0,t.drawRange.count=0,t.clearGroups(),this.materialGroups=[],this.material instanceof Ei){const n=this.material;n.map=null,n.blending=An}else if(Array.isArray(this.material))for(let n=0;n<this.material.length;n++){const i=this.material[n];i.map=null,i.blending=An}return this}begin(){this.verticesLength=0,this.indicesLength=0}canBatch(t,n){return!(this.indicesLength+n>=this.indices.byteLength/2||this.verticesLength/this.vertexSize+t>=this.vertices.byteLength/4/this.vertexSize)}batch(t,n,i,s,l=0){let a=this.verticesLength/this.vertexSize,c=this.vertices,o=this.verticesLength,h=0;if(this.twoColorTint)for(;h<n;)c[o++]=t[h++],c[o++]=t[h++],c[o++]=l,c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],h++;else for(;h<n;)c[o++]=t[h++],c[o++]=t[h++],c[o++]=l,c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++],c[o++]=t[h++];this.verticesLength=o;let d=this.indices;for(o=this.indicesLength,h=0;h<s;o++,h++)d[o]=i[h]+a;this.indicesLength+=s}end(){this.vertexBuffer.needsUpdate=this.verticesLength>0,this.vertexBuffer.addUpdateRange(0,this.verticesLength);let t=this.geometry;this.closeMaterialGroups();let n=t.getIndex();if(!n)throw new Error("BufferAttribute must not be null.");n.needsUpdate=this.indicesLength>0,n.addUpdateRange(0,this.indicesLength),t.drawRange.start=0,t.drawRange.count=this.indicesLength,t.computeVertexNormals()}addMaterialGroup(t,n){const i=this.materialGroups[this.materialGroups.length-1];i===void 0||i[2]!==n?this.materialGroups.push([this.indicesLength,t,n]):i[1]+=t}closeMaterialGroups(){const t=this.geometry;for(let n=0;n<this.materialGroups.length;n++){const[i,s,l]=this.materialGroups[n];t.addGroup(i,s,l)}}findMaterialGroup(t,n){const i=yr.toThreeJsBlending(n);let s=-1;if(Array.isArray(this.material)){for(let a=0;a<this.material.length;a++){const c=this.material[a];if(!c.map)return Nl(c,t,i),a;if(c.map===t&&i.blending===c.blending&&(i.blendSrc===void 0||i.blendSrc===c.blendSrc)&&(i.blendDst===void 0||i.blendDst===c.blendDst)&&(i.blendSrcAlpha===void 0||i.blendSrcAlpha===c.blendSrcAlpha)&&(i.blendDstAlpha===void 0||i.blendDstAlpha===c.blendDstAlpha))return a}const l=this.newMaterial();Nl(l,t,i),this.material.push(l),s=this.material.length-1}else throw new Error("MeshBatcher.material needs to be an array for geometry groups to work");return s}newMaterial(){const t=this.materialFactory(Hn.DEFAULT_MATERIAL_PARAMETERS);if(!("map"in t))throw new Error("The material factory must return a material having the map property for the texture.");return t instanceof z0||(this.twoColorTint&&(t.defines={...t.defines,USE_SPINE_DARK_TINT:1}),t.onBeforeCompile=k0),t}};v(Es,"MAX_VERTICES",10920);let ji=Es;const k0=r=>{let e;r.vertexShader=`
		#if defined( USE_SPINE_DARK_TINT )
			attribute vec3 darkcolor;
		#endif
	`+r.vertexShader,e=`
		#if defined( USE_SPINE_DARK_TINT )
			varying vec3 v_dark;
		#endif
	`,r.vertexShader=Ea(r.vertexShader,"#include <color_pars_vertex>",e),e=`
		#if defined( USE_SPINE_DARK_TINT )
			v_dark = vec3( 1.0 );
			v_dark *= darkcolor;
		#endif
	`,r.vertexShader=Ea(r.vertexShader,"#include <color_vertex>",e),e=`
		#ifdef USE_SPINE_DARK_TINT
			varying vec3 v_dark;
		#endif
	`,r.fragmentShader=Ea(r.fragmentShader,"#include <color_pars_fragment>",e),r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`
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
		`),r.fragmentShader=r.fragmentShader.replace("#include <premultiplied_alpha_fragment>",""),r.fragmentShader=r.fragmentShader.replace("#include <colorspace_fragment>","")};function Ea(r,e,t){const n=r.indexOf(e),i=r.slice(0,n+e.length),s=r.slice(n+e.length);return i+t+s}function Nl(r,e,t){r.map=e,Object.assign(r,t),r.needsUpdate=!0}class z0 extends Ln{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(e){let t=`
			varying vec2 vUv;
			varying vec4 vColor;
			void main() {
				vUv = uv;
				vColor = color;
				gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
			}
		`,n=`
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
		`,i={map:{value:null}};e.uniforms&&(i={...e.uniforms,...i}),e.alphaTest&&e.alphaTest>0&&(e.defines={USE_SPINE_ALPHATEST:1}),super({vertexShader:t,fragmentShader:n,...e,uniforms:i})}}let pi,ns,mi,bn,Fl=Date.now()/1e3,ar="/2025-group-3/game/asset/spine/",Ol,is,Bl,Wn,Fc="capoo_basic_002.json",Oc="capoo_basic_002.atlas",G0="run",kl,ss,zl,xi,Bc="capoo_basic_face_001.json",kc="capoo_basic_face_001.atlas",V0="basic",Gl,rs,Vl,vi,zc="capoo_hat_102.json",Gc="capoo_hat_102.atlas",H0="animation",Hl,Xn,Wl,Mi,Wa="capoo_back_102.json",Xa="capoo_back_102.atlas",Xl="animation",Yl,ql,as;function W0(){let r=window.innerWidth,e=window.innerHeight;ns=new Kt(75,r/e,1,3e3),ns.position.y=0,ns.position.z=400,pi=new Ng,mi=new Lc({antialias:!0,alpha:!0}),mi.setSize(r,e),mi.setClearColor(0,0),document.body.appendChild(mi.domElement),bn=mi.domElement,bn.style.position="absolute",bn.style.top="0",bn.style.left="0",bn.style.pointerEvents="none",is=new rr(ar),is.loadText(Fc),is.loadTextureAtlas(Oc),ss=new rr(ar),ss.loadText(Bc),ss.loadTextureAtlas(kc),rs=new rr(ar),rs.loadText(zc),rs.loadTextureAtlas(Gc),Xn=new rr(ar),Xn.loadText(Wa),Xn.loadTextureAtlas(Xa),requestAnimationFrame(Vc)}function Vc(r,e){if(console.log("SpineLayer loading"),is.isLoadingComplete()&&ss.isLoadingComplete()&&rs.isLoadingComplete()&&Xn.isLoadingComplete()){Ol=is.require(Oc),Bl=new Ms(Ol);let t=new Ss(Bl);t.scale=.2;let n=t.readSkeletonData(is.require(Fc));Wn=new Hn({skeletonData:n}),Wn.state.setAnimation(0,G0,!0),pi.add(Wn),kl=ss.require(kc),zl=new Ms(kl);let i=new Ss(zl);i.scale=.2;let s=i.readSkeletonData(ss.require(Bc));xi=new Hn({skeletonData:s}),xi.state.setAnimation(0,V0,!0),pi.add(xi),Gl=rs.require(Gc),Vl=new Ms(Gl);let l=new Ss(Vl);l.scale=.2;let a=l.readSkeletonData(rs.require(zc));vi=new Hn({skeletonData:a}),vi.state.setAnimation(0,H0,!0),pi.add(vi),Hl=Xn.require(Xa),Wl=new Ms(Hl);let c=new Ss(Wl);c.scale=.2;let o=c.readSkeletonData(Xn.require(Wa));Mi=new Hn({skeletonData:o}),Mi.state.setAnimation(0,Xl,!0),pi.add(Mi),Yl=Xn.require(Xa),ql=new Ms(Yl);let h=new Ss(ql);h.scale=.2;let d=h.readSkeletonData(Xn.require(Wa));as=new Hn({skeletonData:d}),as.state.setAnimation(0,Xl,!0),pi.add(as),requestAnimationFrame(Hc)}else requestAnimationFrame(Vc)}function Hc(){let r=Date.now()/1e3,e=r-Fl;Fl=r,X0(),Wn.update(e),xi.update(e),vi.update(e),Mi.update(e),as.update(e);let t=Wn.skeleton.findBone("body_face_root"),n=xi.skeleton.findBone("root");xi.position.set(t.worldX-n.worldX,t.worldY-n.worldY,1);let i=Wn.skeleton.findBone("hat"),s=vi.skeleton.findBone("root");vi.position.set(i.worldX-s.worldX,i.worldY-s.worldY,1);let l=Wn.skeleton.findBone("back"),a=Mi.skeleton.findBone("root");Mi.position.set(l.worldX-a.worldX,l.worldY-a.worldY,-1),as.position.set(Ar,Cr,0),Wn.visible=kr,xi.visible=kr,vi.visible=kr,Mi.visible=$l,as.visible=Zl,mi.render(pi,ns),requestAnimationFrame(Hc)}function X0(){let r=window.innerWidth,e=window.innerHeight;(bn.width!=r||bn.height!=e)&&(bn.width=r,bn.height=e),ns.aspect=r/e,ns.updateProjectionMatrix(),mi.setSize(r,e)}W0();
