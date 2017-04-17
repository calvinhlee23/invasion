/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GAME_KEYS = {
	  "up": [0, -7.3],
	  "down": [0, 7.3],
	  "left": [-7.3, 0],
	  "right": [7.3, 0]
	};
	
	document.addEventListener("DOMContentLoaded", function () {
	  var w = window,
	      foundRequestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || function (cb) {
	    setTimeout(cb, 1000 / 60);
	  };
	
	  window.requestAnimationFrame = foundRequestAnimationFrame;
	
	  var stage = document.getElementById("battle-ground");
	  var ctx = stage.getContext("2d");
	  var game = new _game2.default({ ctx: ctx, level: 1 });
	
	  // binding keys
	  Object.keys(GAME_KEYS).forEach(function (k) {
	    var move = GAME_KEYS[k];
	    key(k, function () {
	      game.drone.move(move);
	    });
	  });
	  key("space", function () {
	    game.fire();
	  });
	
	  var GameScript = function () {
	    function GameScript(game) {
	      _classCallCheck(this, GameScript);
	
	      this.game = game;
	      game.setUp();
	    }
	
	    _createClass(GameScript, [{
	      key: "protocal",
	      value: function protocal() {
	        var _this = this;
	
	        if (this.game.executing) {
	          this.game.step();
	          window.requestAnimationFrame(this.protocal.bind(this));
	        } else {
	
	          var UI_Tab = document.getElementById('UI_Tab');
	          var button = document.createElement("a");
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
	
	          button.addEventListener("click", function (e) {
	            _this.game.executing = true;
	            _this.game.setUp();
	            _this.protocal();
	            successFail.remove();
	            button.remove();
	          });
	        }
	      }
	    }]);
	
	    return GameScript;
	  }();
	
	  var root = new GameScript(game);
	  root.protocal();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _image_constants = __webpack_require__(2);
	
	var _image_constants2 = _interopRequireDefault(_image_constants);
	
	var _drone = __webpack_require__(3);
	
	var _drone2 = _interopRequireDefault(_drone);
	
	var _cannon_ball = __webpack_require__(5);
	
	var _cannon_ball2 = _interopRequireDefault(_cannon_ball);
	
	var _target = __webpack_require__(6);
	
	var _target2 = _interopRequireDefault(_target);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(args) {
	    _classCallCheck(this, Game);
	
	    this.ctx = args.ctx;
	    this.level = args.level;
	    this.drone = new _drone2.default({ ctx: this.ctx, pos: [0, 250] });
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
	
	  _createClass(Game, [{
	    key: 'setUp',
	    value: function setUp() {
	      Object.keys(_image_constants2.default).forEach(function (name) {
	        var image = new Image();
	        image.src = _image_constants2.default[name];
	        image.addEventListener("load", function () {});
	      });
	      this.lvlInd.textContent = this.level;
	      this.bullInd.textContent = this.level * 2 + 2;
	      this.tarInd.textContent = this.level * 2;
	      this.cannonBallSpeed = Math.random() * 25;
	      if (this.cannonBallSpeed <= 10) {
	        this.cannonBallSpeed += 10;
	      }
	      this.cannonBallSpeed = Math.floor(this.cannonBallSpeed);
	      this.bulSpd.textContent = this.cannonBallSpeed * 10 + 'm/s';
	
	      this.targets = [];
	      this.numTargets = this.level * 2;
	      this.numCannonBallsLeft = this.level * 2 + 2;
	      for (var j = 0; j < this.numTargets; j++) {
	        var target = new _target2.default({ ctx: this.ctx, pos: [] });
	        this.targets.push(target);
	      }
	    }
	
	    // introduces a new cannonball to the field
	
	  }, {
	    key: 'fire',
	    value: function fire() {
	      if (this.numCannonBallsLeft > 0) {
	        this.numCannonBallsLeft -= 1;
	        var cannonBall = new _cannon_ball2.default({ ctx: this.ctx, drone_pos: this.drone.pos,
	          speed: this.cannonBallSpeed });
	        this.cannonBalls.push(cannonBall);
	      }
	    }
	  }, {
	    key: 'drawIfFullyLoaded',
	    value: function drawIfFullyLoaded() {
	      var _this = this;
	
	      if (this.loadedImages.length === this.allGameParts.length) {
	        this.ctx.clearRect(0, 0, this.stage.clientWidth, this.stage.clientHeight);
	        this.loadedImages.forEach(function (imgObj) {
	          _this.ctx.drawImage(imgObj.image, imgObj.pos[0], imgObj.pos[1]);
	        });
	        this.fireAni.forEach(function (fireObj) {
	          _this.ctx.drawImage(fireObj.image, fireObj.pos[0] + 10, fireObj.pos[1] - 10);
	        });
	        this.loadedImages = [];
	      }
	    }
	  }, {
	    key: 'drawAllGameParts',
	    value: function drawAllGameParts() {
	      var _this2 = this;
	
	      this.allGameParts = [].concat([this.drone], this.targets, this.cannonBalls);
	      this.allGameParts.forEach(function (gp) {
	        if (gp.type.split("/").length === 1) {
	          gp.type += "/1";
	        } else {
	          gp.type = gp.type.split("/")[0];
	        }
	        var image = new Image();
	        image.src = _image_constants2.default[gp.type];
	        image.addEventListener("load", function () {
	          var imgObj = { image: image, pos: gp.pos };
	          _this2.loadedImages.push(imgObj);
	          _this2.drawIfFullyLoaded();
	        });
	      });
	    }
	  }, {
	    key: 'removeOutOfBoundsCannonBalls',
	    value: function removeOutOfBoundsCannonBalls() {
	      for (var i = 0; i < this.cannonBalls.length; i++) {
	        var pos = this.cannonBalls[i].pos;
	        if (pos[0] > this.stage.clientWidth || pos[1] > this.stage.clientHeight) {
	          this.bullInd.textContent = parseInt(this.bullInd.textContent) - 1;
	          this.cannonBalls.splice(i, 1);
	
	          return;
	        }
	      }
	    }
	  }, {
	    key: 'checkIfBulletOnTarget',
	    value: function checkIfBulletOnTarget() {
	      var _this3 = this;
	
	      for (var i = 0; i < this.cannonBalls.length; i++) {
	        var cannonBall = this.cannonBalls[i];
	        for (var j = 0; j < this.targets.length; j++) {
	          var target = this.targets[j];
	          if (cannonBall.onTarget(target)) {
	            var image = new Image();
	            image.src = _image_constants2.default["fire"];
	            image.addEventListener("load", function () {
	              _this3.fireAni.push({ image: image, pos: target.pos });
	              window.setTimeout(function () {
	                _this3.fireAni.splice(0, 1);
	              }, 400);
	            });
	
	            this.cannonBalls.splice(i, 1);
	            this.targets.splice(j, 1);
	            this.bullInd.textContent = parseInt(this.bullInd.textContent) - 1;
	            this.tarInd.textContent = parseInt(this.tarInd.textContent) - 1;
	            return;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.removeOutOfBoundsCannonBalls();
	      this.checkIfBulletOnTarget();
	      this.drawAllGameParts();
	      this.updateStatus();
	    }
	  }, {
	    key: 'levelUp',
	    value: function levelUp() {
	      this.level += 1;
	      this.targets = [];
	      this.executing = false;
	    }
	  }, {
	    key: 'updateStatus',
	    value: function updateStatus() {
	      if (this.executing) {
	        if (this.targets.length === 0) {
	          this.status = "WON";
	          this.levelUp();
	          this.executing = false;
	        } else if (this.numCannonBallsLeft === 0 && this.targets.length !== 0) {
	          if (this.cannonBalls.length === 0) {
	            this.status = "LOST";
	            this.executing = false;
	          }
	        }
	      } else {
	        this.status = "NOT_STARTED";
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ImageConstants = {
	  "DRONE": "image/drone.png",
	  "DRONE/1": "image/drone1.png",
	  "CANNON_BALL": "image/bullet.png",
	  "CANNON_BALL/1": "image/bullet1.png",
	
	  "TARGET": "image/target1.png",
	  "TARGET/1": "image/target1.png",
	  "fire": "image/fire.png"
	};
	
	exports.default = ImageConstants;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game_parts = __webpack_require__(4);
	
	var _game_parts2 = _interopRequireDefault(_game_parts);
	
	var _image_constants = __webpack_require__(2);
	
	var _image_constants2 = _interopRequireDefault(_image_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Drone = function (_GameParts) {
	  _inherits(Drone, _GameParts);
	
	  function Drone(args) {
	    _classCallCheck(this, Drone);
	
	    var _this = _possibleConstructorReturn(this, (Drone.__proto__ || Object.getPrototypeOf(Drone)).call(this, args));
	
	    _this.type = "DRONE";
	    window.dronePos = _this.pos;
	    return _this;
	  }
	
	  _createClass(Drone, [{
	    key: 'move',
	    value: function move(vel) {
	      var x = this.pos[0] + vel[0];
	      var y = this.pos[1] + vel[1];
	      if (x > 0 && x < 800) this.pos[0] = x;
	      if (y > 0 && y < 430) this.pos[1] = y;
	    }
	  }]);
	
	  return Drone;
	}(_game_parts2.default);
	
	exports.default = Drone;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _image_constants = __webpack_require__(2);
	
	var _image_constants2 = _interopRequireDefault(_image_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameParts = function GameParts(args) {
	  _classCallCheck(this, GameParts);
	
	  this.ctx = args.ctx;
	  this.pos = args.pos;
	};
	
	exports.default = GameParts;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _image_constants = __webpack_require__(2);
	
	var _image_constants2 = _interopRequireDefault(_image_constants);
	
	var _game_parts = __webpack_require__(4);
	
	var _game_parts2 = _interopRequireDefault(_game_parts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CannonBall = function (_GameParts) {
	  _inherits(CannonBall, _GameParts);
	
	  function CannonBall(args) {
	    _classCallCheck(this, CannonBall);
	
	    // this adjusts as i choose the image of the drone;
	    var _this = _possibleConstructorReturn(this, (CannonBall.__proto__ || Object.getPrototypeOf(CannonBall)).call(this, args));
	
	    _this.ctx = args.ctx;
	    _this.type = "CANNON_BALL";
	    _this.pos = [args.drone_pos[0] + 35, args.drone_pos[1] + 30];
	    _this.horizontal_vel = args.speed;
	    // 60 frames per sec, change in velocity reaches 9.81 after a sec.
	    _this.vertical_vel = 0;
	    setInterval(function () {
	      _this.vertical_vel += 9.81 / 60;
	    }, 1000 / 60);
	    setInterval(function () {
	      _this.move();
	    }, 1000 / 60);
	    return _this;
	  }
	
	  _createClass(CannonBall, [{
	    key: 'move',
	    value: function move() {
	      this.pos[0] += this.horizontal_vel;
	      this.pos[1] += this.vertical_vel;
	    }
	  }, {
	    key: 'onTarget',
	    value: function onTarget(target) {
	      // below positions are center of the target and the cannonball
	      var pos1 = [this.pos[0] + 5, this.pos[1] + 5];
	      var pos2 = [target.pos[0] + 10, target.pos[1] + 10];
	      var xSqr = Math.pow(pos1[0] - pos2[0], 2);
	      var ySqr = Math.pow(pos1[1] - pos2[1], 2);
	      var distance = Math.sqrt(xSqr + ySqr);
	
	      // target = 20x20, cannon = 10x10
	      var sumRadius = 30;
	      if (distance < sumRadius) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return CannonBall;
	}(_game_parts2.default);
	
	exports.default = CannonBall;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game_parts = __webpack_require__(4);
	
	var _game_parts2 = _interopRequireDefault(_game_parts);
	
	var _image_constants = __webpack_require__(2);
	
	var _image_constants2 = _interopRequireDefault(_image_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TARGET_FIELD = {
	  MAX_HEIGHT: 450,
	  STARTING_HEIGHT: 350,
	  STARTING_WIDTH: 220,
	  MAX_WIDTH: 800
	};
	
	var Target = function (_GameParts) {
	  _inherits(Target, _GameParts);
	
	  function Target(args) {
	    _classCallCheck(this, Target);
	
	    var _this = _possibleConstructorReturn(this, (Target.__proto__ || Object.getPrototypeOf(Target)).call(this, args));
	
	    _this.pos = [_this.getRange(TARGET_FIELD.STARTING_WIDTH, TARGET_FIELD.MAX_WIDTH), _this.getRange(TARGET_FIELD.STARTING_HEIGHT, TARGET_FIELD.MAX_HEIGHT)];
	    _this.type = "TARGET";
	    return _this;
	  }
	
	  _createClass(Target, [{
	    key: 'getRange',
	    value: function getRange(min, max) {
	      var pos = Math.floor(Math.random() * (max - min) + min, -2);
	      return pos;
	    }
	  }]);
	
	  return Target;
	}(_game_parts2.default);
	
	exports.default = Target;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map