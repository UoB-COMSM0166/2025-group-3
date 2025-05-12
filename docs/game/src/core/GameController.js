import MapLoader from "./MapLoader";
import { CONSTANT, Message } from "./Utils";
import Potion from "../entities/characters/Potion";
import { setShowBack, setShowPotion, PotionX, PotionY, setFacingLeft, setFacingRight } from "../core/Utils";
//import { currentFaceIndex } from "../graphics/SpineLayer";
//import { assets } from "../main";


// For controlling and interacting with all levels

/*  
    Fixed the bug of misjudgment during collision
    Added a new ground layer to the map, which is not displayed in the game and is only used to detect real top and bottom collisions
*/

export default class GameController {
    // properties
    gameModel;
    

    constructor(gameModel) { 
        this.gameModel = gameModel;
        this.gameModel.selectedLevel = 0;
    }

    // Load the map file into gameModel
    newGame() {
        this.gameModel.assets.startscreenbg = loadImage("/asset/startscreenbg.png")
        let mapLoader = new MapLoader(this.gameModel, this.gameModel.selectedLevel); 
        mapLoader.loadGame();
        
        //console.log("GameController.newGame done");// Test
        //console.log(this.gameModel);// Test
    }
    
    // Control the cat's coordinate movement and traverse all interactions, equivalent to the update in the original class
    moveCapoo() {
        let selectedLevel = this.gameModel.selectedLevel;
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;
        let newX = this.gameModel.cat[selectedLevel].x;
        let newY = this.gameModel.cat[selectedLevel].y;
        let catW = CONSTANT.CAT_WIDTH;
        let catH = CONSTANT.CAT_HEIGHT;
        let offSetHalf = -catW / 2; /* The cat's actual coordinate is right under its image,
                                       but the display coordinate is half a body-width to the left.
                                       Therefore all calculations shift left by half a body-width (-catW/2). */
        let offSetFeet = catH / 10;  /* Vertical offset for the distance from the cat's feet */

        /* ------------------Interaction with all object layers----------------- */

        // Check if the R key is pressed to reset the position
        if (this.gameModel.keys['r'] || this.gameModel.keys['R']) {
            window.assets.death.play();
            let message1 = "Restarting level...";
            this.gameModel.messages.push(new Message(message1, width / 2, 4 * height / 5, 2000, 30, {}, "restart"));
            this.reLife();
            return;
        }

        // Check if the key is picked up
        this.getkey(this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y, selectedLevel); 

        // When all keys are collected, set the flag to visible
        if (this.gameModel.cat[selectedLevel].keyNum == this.gameModel.keysItem[selectedLevel].length) {
            //console.log("Flag becomes visible");
            this.gameModel.flag[selectedLevel].visible = true;
        }

        /* ------------------Interaction with all collision layers----------------- */

        // Control the separation of the butter (to be completed)
        // Press X to separate
        


        // if(this.gameModel.keys['h']||this.gameModel.keys['H']){
        //     this.gameModel.potion.setPotionPosition(100,100);       
        //  }



        // Determine if the cat falls into water (calculated by the bottom center point), reset to the spawn point
        if (this.inWater(this.gameModel.cat[selectedLevel].x - catW / 2, this.gameModel.cat[selectedLevel].y, 
            selectedLevel, tileSize, levelWidth)) {

            window.assets.death.play();

            let message1 = "Cats dissolve easily in water!"
            this.gameModel.messages.push(new Message(message1, width / 2, 4 * height / 5, 2000, 30, {}, "death"));

            this.reLife();
            return;
        }

        
        // Determine if the cat hits a trap (check two points at the top and bottom), reset to the spawn point
        let offSetTrapped = catW / 4;
        let beTrapedUp = this.beTraped(this.gameModel.cat[selectedLevel].x - offSetTrapped, this.gameModel.cat[selectedLevel].y - catH, 
            selectedLevel, tileSize, levelWidth)
            || this.beTraped(this.gameModel.cat[selectedLevel].x + offSetTrapped, this.gameModel.cat[selectedLevel].y - catH, 
                selectedLevel, tileSize, levelWidth);
        let beTrapedBottom = this.beTraped(this.gameModel.cat[selectedLevel].x - offSetTrapped, this.gameModel.cat[selectedLevel].y - offSetFeet * 2, 
            selectedLevel, tileSize, levelWidth) 
            || this.beTraped(this.gameModel.cat[selectedLevel].x + offSetTrapped, this.gameModel.cat[selectedLevel].y - offSetFeet * 2, 
                selectedLevel, tileSize, levelWidth);
        if (beTrapedUp || beTrapedBottom) {
            
            window.assets.death.play();

            let message1 = "You are trapped!"
            this.gameModel.messages.push(new Message(message1, width / 2, 4 * height / 5, 2000, 30, {}, "death"));

            this.reLife();
            return;
        }


        // Calculate whether the cat is in a climbable wall position (give an offSetClimb offset to ensure it can't climb just by touching the edge of the ladder)
        let offSetClimb = catW / 4;  // Horizontal offset used for climbing walls
        
        let catCanClimb = this.canClimb(this.gameModel.cat[selectedLevel].x + offSetHalf + offSetClimb, this.gameModel.cat[selectedLevel].y - offSetFeet, 
            selectedLevel, tileSize, levelWidth) // Bottom-left corner, shifted up by one foot offset
        || this.canClimb(this.gameModel.cat[selectedLevel].x + catW + offSetHalf - offSetClimb, this.gameModel.cat[selectedLevel].y - offSetFeet,
            selectedLevel, tileSize, levelWidth); // Bottom-right corner, shifted up by one foot offset


        // Calculate if on a spring bed (take the bottom center and left/right 1/5 points)
        let offSetSpring = catW / 5;
        let catUseSpring = this.canUseSpring(this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y - offSetFeet,
            selectedLevel, tileSize, levelWidth)
            || this.canUseSpring(this.gameModel.cat[selectedLevel].x + offSetSpring, this.gameModel.cat[selectedLevel].y - offSetFeet,
                selectedLevel, tileSize, levelWidth)
            || this.canUseSpring(this.gameModel.cat[selectedLevel].x - offSetSpring, this.gameModel.cat[selectedLevel].y - offSetFeet,
                selectedLevel, tileSize, levelWidth);
        if (catUseSpring) { // Give an upward acceleration
            //console.log("Spring bed");
            window.assets.spring.play();
            //this.gameModel.cat[selectedLevel].velocityY = Math.abs(this.gameModel.cat[selectedLevel].velocityY) * 0.2;
            this.gameModel.cat[selectedLevel].velocityY = this.gameModel.cat[selectedLevel].jumpStrength * 2; // Assign upward initial speed
            this.gameModel.cat[selectedLevel].onGround = false; // Enter air
        }

        // Horizontal movement key control
        if (this.gameModel.keys['ArrowLeft']) {
            newX -= this.gameModel.cat[selectedLevel].speed; 
            setFacingLeft();
        }
        if (this.gameModel.keys['ArrowRight']) {
            newX += this.gameModel.cat[selectedLevel].speed;
            setFacingRight();
        }
            
        // Vertical movement key control when climbing walls
        if (catCanClimb) {
            if (this.gameModel.keys['ArrowUp']) {
                newY -= this.gameModel.cat[selectedLevel].speed;
            }
            if (this.gameModel.keys['ArrowDown']) {
                newY += this.gameModel.cat[selectedLevel].speed;
            }
        }

        // When merged, pressing space can keep flying upwards
        if (this.gameModel.keys[" "] && this.gameModel.cat[selectedLevel].isMerged) {
            this.gameModel.cat[selectedLevel].velocityY = this.gameModel.cat[selectedLevel].jumpStrength; // Assign upward initial speed
            this.gameModel.cat[selectedLevel].onGround = false; // Enter air
        }

        

        // Apply gravity when not on a climbable wall to ensure falling down
        if (!catCanClimb) {
            this.gameModel.cat[selectedLevel].velocityY += this.gameModel.cat[selectedLevel].gravity; // Apply downward gravitational acceleration
            newY += this.gameModel.cat[selectedLevel].velocityY;
        }

        // Check if the four boundaries of the cat collide: take at least three points on each side
        /* Horizontal offset half a body width (-catW/2), and vertical offset one foot distance (offSetFeet = -catH/10).
           Note: collision detection cannot be trimmed, because the cat's size >> tile size; reducing detection points will cause the cat to get stuck in walls. */

        let left   = this.isColliding(newX + offSetHalf, newY - catH / 3 - offSetFeet, selectedLevel, tileSize, levelWidth) // Two middle points on the left
            || this.isColliding(newX + offSetHalf, newY - catH * 2 / 3 - offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX + offSetHalf, newY - catH - offSetFeet, selectedLevel, tileSize, levelWidth) // Upper-left corner
            || this.isColliding(newX + offSetHalf, newY - offSetFeet * 3 / 2, selectedLevel, tileSize, levelWidth);  // Lower-left corner, slightly up

        let right  = this.isColliding(newX + catW + offSetHalf, newY - catH / 3 - offSetFeet, selectedLevel, tileSize, levelWidth)  // Two middle points on the right
            || this.isColliding(newX + catW + offSetHalf, newY - catH * 2 / 3 - offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX + catW + offSetHalf, newY - catH - offSetFeet, selectedLevel, tileSize, levelWidth) // Upper-right
            || this.isColliding(newX + catW + offSetHalf, newY - offSetFeet * 3 / 2, selectedLevel, tileSize, levelWidth);  // Lower-right corner, slightly up

        let topOffset = catH / 5; // Offset used only for the top, roughly equal to adding jar height, because a jar is always on the body when hitting the ceiling
        let top    = this.isCollidingWithGround(newX + catW / 3 + offSetHalf, newY - catH - offSetFeet - topOffset, selectedLevel, tileSize, levelWidth) // Two middle points above
            || this.isCollidingWithGround(newX + 2 * catW / 3 + offSetHalf, newY - catH - offSetFeet - topOffset, selectedLevel, tileSize, levelWidth) 
            || this.isCollidingWithGround(newX + offSetHalf, newY - catH - offSetFeet - topOffset, selectedLevel, tileSize, levelWidth)     // Upper-left corner
            || this.isCollidingWithGround(newX + catW + offSetHalf, newY - catH - offSetFeet - topOffset, selectedLevel, tileSize, levelWidth); // Upper-right corner

        let bottom = this.isCollidingWithGround(newX + catW / 3 + offSetHalf, newY - offSetFeet, selectedLevel, tileSize, levelWidth) // Two middle points below
            || this.isCollidingWithGround(newX + 2 * catW / 3 + offSetHalf, newY - offSetFeet, selectedLevel, tileSize, levelWidth)
            || this.isCollidingWithGround(newX + offSetHalf, newY - offSetFeet, selectedLevel, tileSize, levelWidth) // Lower-left corner
            || this.isCollidingWithGround(newX + catW + offSetHalf, newY - offSetFeet, selectedLevel, tileSize, levelWidth);  // Lower-right corner
        
        // Actual top collision: new position collides at the top and the position above also collides at the top, and the character is not falling
        let topUp = this.isColliding(newX + catW / 3 + offSetHalf, newY - catH - offSetFeet - 70 - topOffset, selectedLevel, tileSize, levelWidth) // Two middle points above
        || this.isColliding(newX + 2 * catW / 3 + offSetHalf, newY - catH - offSetFeet - 70 - topOffset, selectedLevel, tileSize, levelWidth) 
        || this.isColliding(newX + offSetHalf, newY - catH - offSetFeet - 70 - topOffset, selectedLevel, tileSize, levelWidth)     // Upper-left corner
        || this.isColliding(newX + catW + offSetHalf, newY - catH - offSetFeet - 70 - topOffset, selectedLevel, tileSize, levelWidth); // Upper-right corner

        let topReal = top && topUp && (this.gameModel.cat[selectedLevel].velocityY <= 0 || catCanClimb);

        // Actual bottom collision: new position collides at the bottom and the position below also collides at the bottom, and the character is not rising
        let bottomDown = this.isColliding(newX + catW / 3 + offSetHalf, newY - offSetFeet + 70, selectedLevel, tileSize, levelWidth) // Two middle points below
            || this.isColliding(newX + 2 * catW / 3 + offSetHalf, newY - offSetFeet + 70, selectedLevel, tileSize, levelWidth)
            || this.isColliding(newX + offSetHalf, newY - offSetFeet + 70, selectedLevel, tileSize, levelWidth) // Lower-left corner
            || this.isColliding(newX + catW + offSetHalf, newY - offSetFeet + 70, selectedLevel, tileSize, levelWidth);  // Lower-right corner

        let bottomReal = bottom && bottomDown && ( this.gameModel.cat[selectedLevel].velocityY >= 0 || catCanClimb);

        //console.log(top + "|"+ topUp + "|"+ topReal + "||" +bottom + "|"+ bottomDown + "|"+ bottomReal);

        //console.log(right + "|"+ left + "||" + topReal + "|"+ bottomReal);

        // Handle horizontal collision
        if (!left && !right) { 
            this.gameModel.cat[selectedLevel].x = newX; // Move if no collision
        } 

        // Handle vertical collision
        if (topReal) { // Give a slight rebound when hitting the ceiling to prevent the character from sticking
            this.gameModel.cat[selectedLevel].velocityY = Math.abs(this.gameModel.cat[selectedLevel].velocityY) * 0.2; 
        }        
        else if (!topReal && !bottomReal) { // Free fall when there is no collision above or below
            this.gameModel.cat[selectedLevel].y = newY;
            if (!catCanClimb) { // Gravity applies when not on a climbable wall
                this.gameModel.cat[selectedLevel].onGround = false; // In the air
            }
        } else if (bottomReal) { // Hit the ground
             if (this.gameModel.cat[selectedLevel].velocityY > 0) { // When falling and colliding with the ground, set state to on ground
                this.gameModel.cat[selectedLevel].onGround = true;
                //this.gameModel.cat[selectedLevel].velocityY = -this.gameModel.cat[selectedLevel].velocityY * 0.1; // Slight rebound instead of full stop
             }
             this.gameModel.cat[selectedLevel].velocityY = 0; // Stop downward speed upon ground contact
        }

        // Test
        //console.log("On ground: " + this.gameModel.cat[selectedLevel].onGround);
    }

    // Potion movement logic
    movePotion() {
        let selectedLevel = this.gameModel.selectedLevel;
        let tileSize = CONSTANT.TILE_SIZE;
        let levelWidth = this.gameModel.levelWidth;
        let newX = this.gameModel.potion.x;
        let newY = this.gameModel.potion.y;
        let potionW = CONSTANT.POTION_WIDTH;  // POTION_WIDTH needs to be defined
        let potionH = CONSTANT.POTION_HEIGHT; // POTION_HEIGHT needs to be defined
        let offSetHalf = -potionW / 2;
        let offSetFeet = potionH / 2; 
        let isOnIce = false;
    
        // Horizontal offset
        let offSetClimb = potionW / 4;
        this.gameModel.potion.updatePotion(this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y);
        
        // Determine if the potion touches water, if so, reset life
        if (!this.gameModel.cat[selectedLevel].isMerged && 
           this.inWater(this.gameModel.potion.x, this.gameModel.potion.y, selectedLevel, tileSize, levelWidth)) {
            window.assets.death.play();
            let message = "No water with my pot！";
            this.gameModel.messages.push(new Message(message, width / 2, 4 * height / 5, 2000, 30, {}, "death"));
            this.reLife();
            return;
        }

        // Determine if the cat is on ice
        if (this.beIced(this.gameModel.potion.x, this.gameModel.potion.y + offSetFeet, 
            selectedLevel, tileSize, levelWidth) && !this.gameModel.cat[selectedLevel].isMerged) {
            isOnIce = true;
        } else {
            isOnIce = false;
        }


        if ((this.gameModel.keys["a"] || this.gameModel.keys["d"]) && !this.gameModel.cat[selectedLevel].isMerged && isOnIce) {
            let message1 = "Ice! Pot can't jump!"
            this.gameModel.messages.push(new Message(message1, width / 2, 4 * height / 5, 2000, 30, {}, "No Jump"));
        }
        
        // Check if can merge
        if (Math.abs(newX - this.gameModel.cat[selectedLevel].x) < 100 && Math.abs(newY - this.gameModel.cat[selectedLevel].y) < 100 && this.gameModel.flagp > 50) {
            this.gameModel.cat[selectedLevel].isMerged = true;
            setShowBack(true);
            setShowPotion(false);
            this.gameModel.flagp = 0;
        }
        
        if (!this.gameModel.cat[selectedLevel].isMerged && this.gameModel.flagp < 60) {
            this.gameModel.flagp++;
        }    // Used to block the butter just after separation
     

        if (this.gameModel.cat[selectedLevel].isMerged 
            && (this.gameModel.keys['s'] || this.gameModel.keys['S']) && this.gameModel.flagp < 60) {
                this.gameModel.cat[selectedLevel].isMerged = false;

                // Modify SpineLayer, render cat and butter separately
                this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
                // Offset butter upward upon separation to avoid immediate collision detection
                this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y;
                // Give the butter an initial upward velocity
                this.gameModel.potion.velocityY = -10;
                this.gameModel.potion.speed = 0; // Reduce initial horizontal speed
                this.gameModel.potion.tanshe = false;
                setShowBack(false);
                setShowPotion(true); 
        }


        if ((this.gameModel.keys['A'] || this.gameModel.keys['a']) && this.gameModel.potion.tanshe && !isOnIce && !this.gameModel.cat[selectedLevel].isMerged) {     
            // If it can shoot left and the A key is pressed
            if (this.gameModel.potion.canShootLeft) {
                // Merged state: shoot from the cat's position
                if (this.gameModel.cat[selectedLevel].isMerged) {
                    // Merged state: shoot from the cat's position
                    this.gameModel.cat[selectedLevel].isMerged = false;
                    this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
                    this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y - 30;
                    setShowBack(false);
                    setShowPotion(true);
                } else {
                    // Separated state: shoot from the current potion position, keep position unchanged
                    // No need to modify potion position
                }
                
                // Set speed and state variables
                this.gameModel.potion.speed = -10; // Reduce initial horizontal speed
                this.gameModel.potion.velocityY = -15; // Reduce initial vertical speed
                this.gameModel.potion.gravityScale = 0.4; // Significantly lower gravity scale
                this.gameModel.potion.tanshe = false; // Disable projectile state until next collision
                this.gameModel.potion.onWall = false; // Reset wall state when shooting
                this.gameModel.potion.onGround = false; // Reset ground state when shooting
                this.gameModel.potion.wallFrameCount = 0; // Reset wall frame count
            }
        }

        if ((this.gameModel.keys['D'] || this.gameModel.keys['d']) && this.gameModel.potion.tanshe && !isOnIce && !this.gameModel.cat[selectedLevel].isMerged) {
            // If it can shoot right and the D key is pressed
            if (this.gameModel.potion.canShootRight) {
                // Merged state: shoot from the cat's position
                if (this.gameModel.cat[selectedLevel].isMerged) {
                    // Merged state: shoot from the cat's position
                    this.gameModel.cat[selectedLevel].isMerged = false;
                    this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
                    this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y - 30;
                    setShowBack(false);
                    setShowPotion(true);
                } else {
                    // Separated state: shoot from the current potion position, keep position unchanged
                    // No need to modify potion position
                }
                
                // Set speed and state variables
                this.gameModel.potion.speed = 10; // Reduce initial horizontal speed
                this.gameModel.potion.velocityY = -15; // Reduce initial vertical speed
                this.gameModel.potion.gravityScale = 0.4; // Significantly lower gravity scale
                this.gameModel.potion.tanshe = false; // Disable projectile state until next collision
                this.gameModel.potion.onWall = false; // Reset wall state when shooting
                this.gameModel.potion.onGround = false; // Reset ground state when shooting
                this.gameModel.potion.wallFrameCount = 0; // Reset wall frame count
            }
        }

        if (this.gameModel.cat[selectedLevel].isMerged) {
            // If merged, the bread follows the cat's position
            this.gameModel.potion.x = this.gameModel.cat[selectedLevel].x;
            this.gameModel.potion.y = this.gameModel.cat[selectedLevel].y - 30;
            this.gameModel.potion.tanshe = true; // Can shoot while on the cat
            
            // In merged state, can shoot in both directions
            this.gameModel.potion.canShootLeft = true;
            this.gameModel.potion.canShootRight = true;
        } 
        else {
            // Simplified collision detection function
            let checkCollision = (x, y) => {
                return this.isColliding(x, y, selectedLevel, tileSize, levelWidth);
            };
            
            // Check collision at four key points
            // Adjust the left collision detection point, offset a bit to the right
            let leftCollision = checkCollision(newX + offSetHalf, newY - potionH / 2);
            // Adjust the right collision detection point, offset a bit to the left
            let rightCollision = checkCollision(newX + potionW + offSetHalf, newY - potionH / 2);
            
            // Check three points at the bottom, offset a bit upwards to improve bottom collision accuracy
            // Reduce use of the lower-right detection point to avoid misjudgment with the right wall
            let bottomLeftCollision = checkCollision(newX + offSetHalf , newY );
            let bottomMiddleCollision = checkCollision(newX + potionW / 2 + offSetHalf, newY);
            // If detecting right wall collision, then don't check the bottom-right corner
            let bottomRightCollision = rightCollision ? false : checkCollision(newX + potionW + offSetHalf, newY );
            let bottomCollision = bottomLeftCollision || bottomMiddleCollision || bottomRightCollision;
            
            // Set the shooting direction according to the collision situation
            if (leftCollision || rightCollision) {
                // Mark as on the wall
                this.gameModel.potion.onWall = true;
                this.gameModel.potion.speed = 0; // Set speed to zero when hitting the wall
                
                // If just started touching the wall, initialize the wall frame count and initial speed
                if (!this.gameModel.potion.wallFrameCount) {
                    this.gameModel.potion.wallFrameCount = 0;
                    this.gameModel.potion.velocityY = 0.5; // Set initial sliding speed to 0.5
                }
                
                // Set the shootable direction according to the collision position
                this.gameModel.potion.canShootLeft = !leftCollision;  // Can't shoot left on the left wall
                this.gameModel.potion.canShootRight = !rightCollision; // Can't shoot right on the right wall
                
                this.gameModel.potion.tanshe = true; // Can shoot while on the wall
            }
            
            // Check if on the ground
            if (bottomCollision) {
                this.gameModel.potion.onGround = true;
                this.gameModel.potion.speed *= 0.8; // Slow horizontal speed
                // When on the ground, if the speed is very small, set it to 0 to prevent continuous sliding
                if (Math.abs(this.gameModel.potion.speed) < 0.5) {
                    this.gameModel.potion.speed = 0;
                }
                this.gameModel.potion.velocityY = 0;
                
                // Only when not against the wall can the ground reset the shooting direction
                // Keep the priority of wall collision restriction
                if (!leftCollision) {
                    this.gameModel.potion.canShootLeft = true;
                }
                if (!rightCollision) {
                    this.gameModel.potion.canShootRight = true;
                }
                
                this.gameModel.potion.tanshe = true; // Can shoot
            } else {
                this.gameModel.potion.onGround = false;
            }
            
            // If not on the wall or on the ground, apply gravity
            if (!this.gameModel.potion.onWall && !this.gameModel.potion.onGround) {
                // Apply gravity, adjust gravity size according to gravityScale
                let gravityFactor = this.gameModel.potion.gravityScale || 1.0;
                if (this.gameModel.potion.velocityY < 20) { // Reduce the upper limit of maximum falling speed
                    this.gameModel.potion.velocityY += 2 * gravityFactor;
                }
                // Reset wall frame count
                this.gameModel.potion.wallFrameCount = 0;
            } else if (this.gameModel.potion.onWall) {
                // Sliding on the wall is not affected by gravityScale
                // Increase wall frame count
                this.gameModel.potion.wallFrameCount++;
                
                // Use smaller acceleration in the first 10 frames to ensure the speed does not exceed 2
                if (this.gameModel.potion.wallFrameCount < 10) {
                    // In the first 10 frames, make the speed increase smoothly to near 2, but not exceed 2
                    this.gameModel.potion.velocityY += 0.15;
                    if (this.gameModel.potion.velocityY > 2) {
                        this.gameModel.potion.velocityY = 2;
                    }
                } else {
                    // After 10 frames, use a curve formula to increase acceleration as the frame count increases
                    // Use the formula 0.05 + (frame count - 10)/300 to make the acceleration increase very slowly
                    let accelerationFactor = 0.05 + (this.gameModel.potion.wallFrameCount - 10) / 300;
                    this.gameModel.potion.velocityY += accelerationFactor;
                }
            }
            
            // Try to move to the new position
            let testX = newX + this.gameModel.potion.speed;
            let testY = newY + this.gameModel.potion.velocityY;
            
            // Check if the new position has a collision
            let wouldCollideLeftX = this.gameModel.potion.speed < 0 && 
                checkCollision(testX + offSetHalf, newY - potionH / 2);
            let wouldCollideRightX = this.gameModel.potion.speed > 0 && 
                checkCollision(testX + potionW + offSetHalf, newY - potionH / 2);
            let wouldCollideX = wouldCollideLeftX || wouldCollideRightX;
            
            // Vertical collision detection
            let wouldCollideBottomY = this.gameModel.potion.velocityY > 0 && (
                checkCollision(newX + offSetHalf, testY ) || 
                checkCollision(newX + potionW / 2 + offSetHalf, testY ) || 
                // If detecting right wall collision, then don't check bottom-right corner
                (wouldCollideRightX ? false : checkCollision(newX + potionW + offSetHalf, testY ))
            );
            let wouldCollideTopY = this.gameModel.potion.velocityY < 0 && (
                checkCollision(newX + offSetHalf , testY - potionH ) || 
                checkCollision(newX + potionW / 2 + offSetHalf, testY - potionH) || 
                checkCollision(newX + potionW + offSetHalf, testY - potionH )
            );
            let wouldCollideY = wouldCollideBottomY || wouldCollideTopY;
            
            // If there is a collision horizontally, stop horizontal movement and slide down slowly
            if (wouldCollideX) {
                this.gameModel.potion.speed = 0; // Stop horizontal movement
                this.gameModel.potion.onWall = true; // Mark as on the wall
                
                // If just started touching the wall, initialize the wall frame count and initial speed
                if (!this.gameModel.potion.wallFrameCount) {
                    this.gameModel.potion.wallFrameCount = 0;
                    this.gameModel.potion.velocityY = 0.5; // Set initial sliding speed to 0.5
                }
                
                // Set the shootable direction according to the collision position
                this.gameModel.potion.canShootLeft = !wouldCollideLeftX;  // Can't shoot left on the left wall
                this.gameModel.potion.canShootRight = !wouldCollideRightX; // Can't shoot right on the right wall
                
                this.gameModel.potion.tanshe = true; // Can shoot while on the wall
            } else {
                // Otherwise, perform horizontal movement
                this.gameModel.potion.x = testX;
                // Don't reset onWall state here; only reset when shooting or touching the ground
            }
            
            // If there is a collision vertically, stop vertical movement
            if (wouldCollideY) {
                if (wouldCollideBottomY) {
                    // Bottom collision: set ground state
                    this.gameModel.potion.onGround = true;
                    //this.gameModel.potion.onWall = false; // Reset wall state when touching the ground
                    this.gameModel.potion.canShootLeft = true;
                    this.gameModel.potion.canShootRight = true;
                    this.gameModel.potion.tanshe = true;
                    this.gameModel.potion.velocityY = 0; // Set vertical speed to zero
                    this.gameModel.potion.speed = 0;     // Set horizontal speed to zero when landing
                    this.gameModel.potion.wallFrameCount = 0; // Reset wall frame count
                    
                } else if (wouldCollideTopY) {
                    // Set velocityY to 0 when a top collision occurs
                    this.gameModel.potion.velocityY = 0;
                }
            } else {
                // Otherwise, perform vertical movement
                this.gameModel.potion.y = testY;
            }
        }
    }
    


    // Check whether the given coordinate is in the collision layer
    isColliding(px, py, selectedLevel, tileSize, levelWidth) { 
        
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // Collision detection: if this tile is a collider (non-zero), return true
        let isColliding = this.gameModel.coll[selectedLevel].data[tileIndex] !== 0;
        
        // Merged wall detection
        let collWithMergedWall = false;
        let hasMergedWall = this.gameModel.merge[selectedLevel].data[tileIndex] !== 0;
        let mergeWallvisible = this.gameModel.merge[selectedLevel].visible;
        if (hasMergedWall && mergeWallvisible) {
            collWithMergedWall = true;
        }

        // Mechanism wall detection
        let collwithElevatingWall = false;
        for (let i = 0; i < this.gameModel.elevatingWalls[selectedLevel].length; i++) {
            if (this.gameModel.elevatingWalls[selectedLevel][i].isColling(px, py, tileSize, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)) {
                collwithElevatingWall = true;
            }
        }

        return isColliding || collWithMergedWall || collwithElevatingWall;
    }

    isCollidingWithGround(px, py, selectedLevel, tileSize, levelWidth) { 
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;
        // Collision detection with ground
        let isColliding = this.gameModel.ground[selectedLevel].data[tileIndex] !== 0;
        // Merged wall detection
        let collWithMergedWall = false;
        let hasMergedWall = this.gameModel.merge[selectedLevel].data[tileIndex] !== 0;
        let mergeWallvisible = this.gameModel.merge[selectedLevel].visible;
        if (hasMergedWall && mergeWallvisible) {
            collWithMergedWall = true;
        }
        // Mechanism wall detection
        let collwithElevatingWall = false;
        for (let i = 0; i < this.gameModel.elevatingWalls[selectedLevel].length; i++) {
            if (this.gameModel.elevatingWalls[selectedLevel][i].isColling(px, py, tileSize, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)) {
                collwithElevatingWall = true;
            }
        }
        return isColliding || collWithMergedWall || collwithElevatingWall;
    }


    // Check whether it touches water
    inWater(px, py, selectedLevel, tileSize, levelWidth) {

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // Detection: if this tile is water, return true
        return this.gameModel.water[selectedLevel].data[tileIndex] !== 0;
    }

    beIced(px, py, selectedLevel, tileSize, levelWidth) {

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // Detection: if this tile is ice, return true
        return this.gameModel.ice[selectedLevel].data[tileIndex] !== 0;
    }


    // Check whether it touches a trap
    beTraped(px, py, selectedLevel, tileSize, levelWidth) {

        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        // Detection: if this tile is a trap, return true
        return this.gameModel.trap[selectedLevel].data[tileIndex] !== 0;
    }


    // Check whether it is on a climbable wall
    canClimb(px, py, selectedLevel, tileSize, levelWidth) {

        // Row, column, and index of the tile containing the passed coordinates
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        return this.gameModel.climb[selectedLevel].data[tileIndex] !== 0;
    }

    // Check whether it is on a spring bed
    canUseSpring(px, py, selectedLevel, tileSize, levelWidth) {

        // Row, column, and index of the tile containing the passed coordinates
        let col = Math.floor(px / tileSize);
        let row = Math.floor(py / tileSize);
        let tileIndex = row * levelWidth[selectedLevel] + col;

        return this.gameModel.spring[selectedLevel].data[tileIndex] !== 0;
    }


    // Check whether the given coordinate touches a key
    getkey(px, py, selectedLevel) {
        for (let i = 0; i < this.gameModel.keysItem[selectedLevel].length; i++) {
            if (this.gameModel.keysItem[selectedLevel][i].visible 
                && this.gameModel.keysItem[selectedLevel][i].isNear(px, py, CONSTANT.TILE_SIZE, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)) {
                window.assets.getKey.play();
                this.gameModel.keysItem[selectedLevel][i].visible = false;
                this.gameModel.cat[selectedLevel].keyNum++;
                //console.log("Key count:", this.gameModel.cat[selectedLevel].keyNum);
            }
        }
    }


    // Control whether the merged wall is visible based on whether the cat and butter are separated
    controlMergedWall() {
        let selectedLevel = this.gameModel.selectedLevel;
        if (this.gameModel.cat[selectedLevel].isMerged) {
            this.gameModel.merge[selectedLevel].visible = true;
        }
        else {
            this.gameModel.merge[selectedLevel].visible = false;
        }
    }

    reLife() {
        let selectedLevel = this.gameModel.selectedLevel;
        this.gameModel.cat[selectedLevel].x = this.gameModel.cat[selectedLevel].iniX;
        this.gameModel.cat[selectedLevel].y = this.gameModel.cat[selectedLevel].iniY;
        this.gameModel.cat[selectedLevel].isMerged = true;
    }

    // When the cat touches the switch, the mechanism wall moves automatically
    controlElevatingWall() {
        let selectedLevel = this.gameModel.selectedLevel;
        // Update the mechanism
        for (let i = 0; i < this.gameModel.elevatingWalls[selectedLevel].length; i++) {
            this.gameModel.elevatingWalls[selectedLevel][i].update();
        }
       
        // Control the switch
        for (let i = 0; i < this.gameModel.switches[selectedLevel].length; i++) { // Traverse all switches
            // If the cat touches the switch (and it is not in an invalid state), reverse the switch state and toggle the switch icon
            // Set invalid state and start timing to prevent multiple triggers of the same switch in a short time
            if (this.gameModel.switches[selectedLevel][i].isNear(
                    this.gameModel.cat[selectedLevel].x, this.gameModel.cat[selectedLevel].y, 
                    CONSTANT.TILE_SIZE, CONSTANT.CAT_WIDTH, CONSTANT.CAT_HEIGHT)
                && !this.gameModel.switches[selectedLevel][i].invincible ) {
                window.assets.switch.play();
                this.gameModel.switches[selectedLevel][i].invincible = true; // Set invalid state
                this.gameModel.switches[selectedLevel][i].invincibleTimer = 0; // Reset timer
                let img = this.gameModel.switches[selectedLevel][i].iniImgIndex;
                if (this.gameModel.switches[selectedLevel][i].beActivated) { // Toggle switch texture
                    this.gameModel.switches[selectedLevel][i].imgIndex = img;
                } else {
                    this.gameModel.switches[selectedLevel][i].imgIndex = img + 1;
                }
                // Reverse the switch state
                this.gameModel.switches[selectedLevel][i].beActivated = !this.gameModel.switches[selectedLevel][i].beActivated;
            }
            // When the switch state changes, notify the mechanism wall block to move
            if (this.gameModel.switches[selectedLevel][i].prevState !== this.gameModel.switches[selectedLevel][i].beActivated) {
                for (let j = 0; j < this.gameModel.elevatingWalls[selectedLevel].length; j++) {
                    if (this.gameModel.elevatingWalls[selectedLevel][j].id === this.gameModel.switches[selectedLevel][i].id) {
                        this.gameModel.elevatingWalls[selectedLevel][j].move();
                    }
                }
            }
            // Update the switch state
            this.gameModel.switches[selectedLevel][i].prevState = this.gameModel.switches[selectedLevel][i].beActivated;
        
            // When the mechanism is in an invincible state: increase timer
            if (this.gameModel.switches[selectedLevel][i].invincible) {
                this.gameModel.switches[selectedLevel][i].invincibleTimer++;
            } 
            // If in invalid state and the timer reaches the max value, disable invincible state
            if (this.gameModel.switches[selectedLevel][i].invincible 
                && this.gameModel.switches[selectedLevel][i].invincibleTimer >= this.gameModel.switches[selectedLevel][i].invincibleDuration) {
                this.gameModel.switches[selectedLevel][i].invincible = false;
                this.gameModel.switches[selectedLevel][i].invincibleTimer = 0;
            }
        }
    }
}
