import ImageConstants from './image_constants';
import GameParts from './game_parts';

class CannonBall extends GameParts {
  constructor(args) {
    super(args);
    // this adjusts as i choose the image of the drone;
    this.ctx = args.ctx;
    this.type = "CANNON_BALL";
    this.pos = [35, args.current_height + 30];
    this.horizontal_vel = args.speed;
    // 60 frames per sec, change in velocity reaches 9.81 after a sec.
    this.vertical_vel = 0;
    setInterval(()=> {this.vertical_vel += (9.81/60);}, (1000/60));
    setInterval(()=> {this.move();}, (1000/60));
  }

  move() {
    this.pos[0] += this.horizontal_vel;
    this.pos[1] += this.vertical_vel;
  }

  onTarget(target) {
  // below positions are center of the target and the cannonball
   var pos1 = [this.pos[0] + 5, this.pos[1] + 5 ];
   var pos2 = [target.pos[0] + 10, target.pos[1] + 10];
   let xSqr = Math.pow((pos1[0] - pos2[0]), 2);
   let ySqr = Math.pow((pos1[1] - pos2[1]), 2);
   let distance = Math.sqrt((xSqr + ySqr));

   // target = 20x20, cannon = 10x10
   var sumRadius = 30;
   if (distance < sumRadius) {
     return true;
   } else {
     return false;
   }
  }

}

export default CannonBall;
