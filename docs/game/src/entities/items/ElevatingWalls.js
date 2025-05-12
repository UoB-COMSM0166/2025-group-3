import AbstractItem from './AbstractItem.js';

export default class ElevatingWalls extends AbstractItem {
    // properties
    id;
    range;
    towards;

    constructor(x,y,imgIndex,levelIndex,id,range,towards) {
        super(x,y,imgIndex,levelIndex);
        this.id = id;
        this.range = range;// The distance that should move (number of tiles)
        this.towards = towards; // Read from the map, which direction it should move towards

        this.pixelRange = (range-1)*70; // The distance that should move (in pixels)

        this.iniX = x; // Initial coordinates, cannot be changed
        this.iniY = y;
        this.iniTargetX; // Initial target coordinates, cannot be changed
        this.iniTargetY;

        this.targetX = x;  // Target coordinates when moving, needs to switch between iniX or iniTargetX based on state
        this.targetY = y;

        this.beActivated = false; // Whether it is activated (notified by switch)
        this.speed = 20; 


        this.moving = false; // Whether it is in moving state
        this.movingTimer = 0; // Timer
        this.movingDuration = 100; // Duration of movement

        // Initialize target position
        switch (this.towards) {
            case "up": 
                this.iniTargetX = x;
                this.iniTargetY = y - this.pixelRange;
                break;
            case "down":
                this.iniTargetX = x;
                this.iniTargetY = y + this.pixelRange;
                break;
            case "left":
                this.iniTargetX = x - this.pixelRange;
                this.iniTargetY = y;
                break;
            case "right":
                this.iniTargetX = x + this.pixelRange;
                this.iniTargetY = y;
                break;
        }
    }

    // Determine if a point is within the range of the mechanism wall block
    isColling(px, py, tileSize, catW, catH) { 
        let d = 30; 

        let centX = this.x + tileSize/2;
        let centY = this.y + tileSize/2;

        if(centX >= px - catW/2 - d && centX <= px + catW/2 +d 
            && centY >= py - catH - d && centY <= py + d){
            return true;
        } else {
            return false;
        }
    }


    // Update coordinates for each frame (if in moving state)
    update() {
        if (!this.moving) return; // Not in moving state, return directly

        this.movingTimer++;
        let progress = this.movingTimer / this.movingDuration; // Calculate current movement progress (0~1)

        if (progress >= 1) { // Movement completed
            this.x = this.targetX;
            this.y = this.targetY;
            this.moving = false; // Stop moving
            this.movingTimer = 0; // Reset timer
        } else { // In the process of moving, calculate the current frame position by interpolation
            let startX = this.beActivated ? this.iniX : this.iniTargetX;
            let endX = this.beActivated ? this.iniTargetX : this.iniX;
            let startY = this.beActivated ? this.iniY : this.iniTargetY;
            let endY = this.beActivated ? this.iniTargetY : this.iniY;

            this.x = startX + (endX - startX) * progress;
            this.y = startY + (endY - startY) * progress;
        }
    }
    

    // This function is triggered by the switch class, used to set the target position for mechanism movement
    move() {
        this.beActivated = !this.beActivated; // Ensure that the movement direction of the mechanism wall alternates each time the move() method is called

        // When the mechanism wall is activated, set the target position
        if (this.beActivated) {
            this.targetX = this.iniTargetX;
            this.targetY = this.iniTargetY;
        } else {
            this.targetX = this.iniX;
            this.targetY = this.iniY;
        }

        // Start movement
        this.moving = true;
        this.movingTimer = 0; // Reset timer to zero
    }




}