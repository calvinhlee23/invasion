import GameParts from './game_parts';
import ImageConstants from './image_constants';

const TARGET_FIELD = {
  MAX_HEIGHT: 450,
  STARTING_HEIGHT: 350,
  STARTING_WIDTH: 220,
  MAX_WIDTH: 800
};

class Target extends GameParts {
  constructor(args) {
    super(args);
    this.pos = [this.getRange(TARGET_FIELD.STARTING_WIDTH,
                              TARGET_FIELD.MAX_WIDTH),
                this.getRange(TARGET_FIELD.STARTING_HEIGHT,
                              TARGET_FIELD.MAX_HEIGHT)];
    this.type = "TARGET";
  }

  getRange(min, max) {
   let pos = Math.floor((Math.random() * (max-min) + min), -2);
   return pos;
  }
}

export default Target;
