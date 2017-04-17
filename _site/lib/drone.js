import GameParts from './game_parts';

import ImageConstants from './image_constants';

class Drone extends GameParts {
  constructor(args) {
    super(args);
    this.type = "DRONE";
  }

  move(vel) {
    // the cannon will only move in vertical direction
    this.pos[1] += vel[1];
  }
}

export default Drone;
