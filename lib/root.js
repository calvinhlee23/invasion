import Game from './game';

const GAME_KEYS = {
  "up": [0,-7.3],
  "down": [0, 7.3],
  "left": [-7.3,0],
  "right": [7.3,0]
};


 document.addEventListener("DOMContentLoaded", () => {
    var  w=window, foundRequestAnimationFrame  =  w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame || w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame    || w.oRequestAnimationFrame  ||
    function(cb) { setTimeout(cb,1000/60); } ;

    window.requestAnimationFrame  = foundRequestAnimationFrame ;

    var stage = document.getElementById("battle-ground");
    var ctx = stage.getContext("2d");
    var game = new Game({ctx: ctx, level: 1});

  // binding keys
    Object.keys(GAME_KEYS).forEach ((k) => {
      let move = GAME_KEYS[k];
      key(k, () => {game.drone.move(move);});
    });
    key("space", () => {game.fire();});


    class GameScript {
      constructor(game) {
        this.game = game;
        game.setUp();
      }

      protocal () {
        if (this.game.executing) {
          this.game.step();
          window.requestAnimationFrame(this.protocal.bind(this));
        } else {

          var UI_Tab = document.getElementById('UI_Tab');
          var button = document.createElement("a")
          var successFail = document.createElement("a");
          successFail.className += "success-fail";
          button.className += "start";
          if (this.game.status === "WON" || game.status === "NOT_STARTED") {
            if (this.game.status === "WON") {
              successFail.textContent = "Mission Success!";
            }
              button.textContent = "Start";
          } else {
            successFail.textContent = "Mission Fail! ";
            button.textContent = "Retry";
          }
          UI_Tab.appendChild(successFail);
          UI_Tab.appendChild(button);

          // ensures the last animation is played
          this.game.step();

          button.addEventListener("click", (e) => {
            this.game.executing = true;
            this.game.setUp();
            this.protocal();
            successFail.remove();
            button.remove();
          });
        }
      }
  }

    var root = new GameScript(game);
    root.protocal();
});
