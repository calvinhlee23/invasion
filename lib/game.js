import ImageConstants from './image_constants';
import Drone from './drone';
import CannonBall from './cannon_ball';
import Target from './target';

class Game {
  constructor (args) {
    this.ctx = args.ctx;
    this.level = args.level;
    this.drone = new Drone({ctx: this.ctx, pos: [0, 250]});
    this.executing = false;
    this.status = "NOT_STARTED";
    this.allGameParts = [];
    this.cannonBalls = [];
    this.targets = [];
    this.loadedImages = [];
    this.okToClear = false;
    this.stage = document.getElementById("battle-ground");
    this.fireAni = [];
    this.lvlInd = document.getElementById("level");
    this.bullInd = document.getElementById("numCannonBallsLeft");
    this.tarInd = document.getElementById("remainingTargets");
    this.bulSpd = document.getElementById("speed");
  }

  setUp () {
    this.lvlInd.textContent = this.level;
    this.bullInd.textContent = this.level*2 + 2;
    this.tarInd.textContent = this.level*2;
    this.cannonBallSpeed = (Math.random() * 25);
    if (this.cannonBallSpeed <= 10) {
      this.cannonBallSpeed += 10;
    }
    this.cannonBallSpeed = Math.floor(this.cannonBallSpeed);
    this.bulSpd.textContent = `${this.cannonBallSpeed *10}m/s`;

    this.targets = [];
    this.numTargets = this.level*2;
    this.numCannonBallsLeft = this.level*2 + 2;
    for (var j = 0; j < this.numTargets; j++) {
      var target = new Target({ctx: this.ctx, pos: []});
      this.targets.push(target);
    }
  }

  // introduces a new cannonball to the field
  fire () {
    if (this.numCannonBallsLeft > 0) {
      this.numCannonBallsLeft -= 1;
      var cannonBall = new CannonBall({ctx: this.ctx, current_height: this.drone.pos[1],
                                       speed: this.cannonBallSpeed});
      this.cannonBalls.push(cannonBall);
    }
  }

  drawIfFullyLoaded() {
    if (this.loadedImages.length === this.allGameParts.length) {
      this.ctx.clearRect(0,0, this.stage.clientWidth, this.stage.clientHeight);
      this.loadedImages.forEach ((imgObj) => {
        this.ctx.drawImage(imgObj.image, imgObj.pos[0], imgObj.pos[1]);
      });
      this.fireAni.forEach((fireObj) => {
        this.ctx.drawImage(fireObj.image, fireObj.pos[0]+10, fireObj.pos[1]-10);
      });
      this.loadedImages = [];
    }
  }

  drawAllGameParts() {
    this.allGameParts = [].concat([this.drone], this.targets, this.cannonBalls);
    this.allGameParts.forEach((gp) => {
      if (gp.type.split("/").length === 1) {
        gp.type += "/1";
      } else {
        gp.type = gp.type.split("/")[0];
      }
      var image = new Image();
      image.src = ImageConstants[gp.type];
      image.addEventListener("load",  () => {
        var imgObj = {image: image, pos: gp.pos};
        this.loadedImages.push(imgObj);
        this.drawIfFullyLoaded();
      });
    });
  }

  removeOutOfBoundsCannonBalls () {
    for (var i = 0; i < this.cannonBalls.length; i++) {
      var pos = this.cannonBalls[i].pos;
      if (pos[0] > this.stage.clientWidth || pos[1] > this.stage.clientHeight) {
        this.bullInd.textContent = parseInt(this.bullInd.textContent) -1;
        this.cannonBalls.splice(i, 1);

        return;
      }
    }
  }

  checkIfBulletOnTarget() {
    for (var i = 0; i < this.cannonBalls.length; i++) {
      var cannonBall = this.cannonBalls[i];
      for (var j = 0; j < this.targets.length; j++) {
        var target = this.targets[j];
        if (cannonBall.onTarget(target)) {
          var image  = new Image();
          image.src = ImageConstants["fire"];
          image.addEventListener("load", () => {
            this.fireAni.push({image: image, pos: target.pos});
            window.setTimeout(() => {this.fireAni.splice(0,1);}, 400);
          });

          this.cannonBalls.splice(i, 1);
          this.targets.splice(j, 1);
          this.bullInd.textContent = parseInt(this.bullInd.textContent) -1;
          this.tarInd.textContent = parseInt(this.tarInd.textContent) -1;
          return;
        }
      }
    }
  }

  step () {
    this.removeOutOfBoundsCannonBalls();
    this.checkIfBulletOnTarget();
    this.drawAllGameParts();
    this.updateStatus();
  }

  levelUp () {
    this.level += 1;
    this.targets = [];
    this.executing = false;
  }

  updateStatus() {
    if (this.executing) {
      if (this.targets.length === 0) {
        this.status = "WON";
        this.levelUp();
        this.executing = false;
      } else if (this.numCannonBallsLeft === 0 && this.targets.length !== 0) {
        if (this.cannonBalls.length === 0 ) {
          this.status = "LOST";
          this.executing = false;
        }
      }
    } else {
      this.status = "NOT_STARTED";
    }
  }

}

export default Game;
