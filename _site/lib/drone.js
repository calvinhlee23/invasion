import GameParts from './game_parts';

import ImageConstants from './image_constants';

class Drone extends GameParts {
  constructor(args) {
    super(args);
    this.type = "DRONE";
  }

  move(vel) {
    var x = this.pos[0] + vel[0];
    var y = this.pos[1] + vel[1];
    if (x > 0 && x < 800) this.pos[0] = x;
    if (y > 0 && y < 430) this.pos[1] = y;
  }
}

export default Drone;
