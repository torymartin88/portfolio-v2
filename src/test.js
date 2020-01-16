var Game = function() {
  var self = this;
  self.canvas = null;
  self.ctx = null;
  self.keyDown = "";
  self.updateTime = 0;
  self.baitCaught = 0;
  self.dead = false;
  self.deadCounter = 0;
  try {
    self.highScore = localStorage.getItem("fl_snake_highscore");
  } catch (e) {
    console.log("No high score yet.");
  }
  self.config = {};
  self.config.density = window.devicePixelRatio;
  self.config.cellSize = 10 * self.config.density;
  self.config.speedGain = 0.005;
  self.config.speedtest = self.config.speedGain;
  self.config.gameWidth =
    (window.innerWidth / self.config.cellSize) *
    self.config.cellSize *
    self.config.density;
  self.config.gameHeight =
    Math.floor(window.innerHeight / self.config.cellSize) *
      self.config.cellSize *
      self.config.density -
    100;
  (self.config.borderWidth = self.config.cellSize),
    (self.config.borderGrow = 0.01);
  self.config.numBait = 25;
  self.config.debug = false;
  if (self.config.debug)
    console.log(self.config.gameWidth, self.config.gameHeight);
  self.baitArray = [];
  self.particles = [];
  self.events = {};
  self.snake = new Snake(self);
  self.setupEvents();
  self.setupCanvas();
  self.resetGame();
  self.audio_bait_get = new Howl({});
};
Game.prototype.setupCanvas = function() {
  var self = this;
  self.canvas = document.createElement("canvas");
  self.canvas.setAttribute("id", "js--game");
  self.ctx = self.canvas.getContext("2d");
  self.canvas.width = self.config.gameWidth;
  self.canvas.height = self.config.gameHeight;
  self.canvas.style.width = self.config.gameWidth / self.config.density + "px";
  self.canvas.style.height =
    self.config.gameHeight / self.config.density + "px";
  document.body.appendChild(self.canvas);
};
Game.prototype.resetGame = function() {
  var self = this;
  self.dead = false;
  self.deadCounter = 0;
  self.keyDown = "";
  self.config.borderWidth = self.config.cellSize;
  self.config.borderGrow = 0.01;
  delete self.snake;
  self.snake = new Snake(self);
  self.snake.y =
    Math.ceil(self.config.gameHeight / 2 / self.config.cellSize) *
    self.config.cellSize;
  self.snake.x = 160;
  self.baitArray = [];
  for (var i = 0; i < self.config.numBait; i++) {
    self.baitArray.push(new Bait(self));
  }
  self.baitCaught = 0;
};
Game.prototype.setupEvents = function() {
  var self = this;
  window.addEventListener(
    "keydown",
    function(e) {
      self.keyDown = e.keyCode;
    },
    false
  );
  // var hammertime = new Hammer(window);
  // hammertime.on("swipedown", function(ev) {
  //   self.keyDown = 40;
  // });
  // hammertime.on("swipeleft", function(ev) {
  //   self.keyDown = 37;
  // });
  // hammertime.on("swiperight", function(ev) {
  //   self.keyDown = 39;
  // });
  // hammertime.on("swipeup", function(ev) {
  //   self.keyDown = 38;
  // });
  // hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

  self.events = {
    evPointAdded: new Event("evPointAdded"),
    evResetGame: new Event("evResetGame"),
    evPlayerDied: new Event("evPlayerDied"),
    evHighScore: new Event("evHighScore"),
    evStartGame: new Event("evStartGame")
  };

  window.addEventListener("evPointAdded", function(e) {
    ++self.baitCaught;
    self.audio_bait_get.play();
  });

  window.addEventListener("evResetGame", function(e) {
    self.resetGame();
  });

  window.addEventListener("evStartGame", function(e) {
    startGame();
  });

  window.addEventListener("evPlayerDied", function(e) {
    if (self.baitCaught > self.highScore) {
      localStorage.setItem("fl_snake_highscore", self.baitCaught);
      window.dispatchEvent(self.events.evHighScore);
    }
    stopGame();
  });

  window.addEventListener("evHighScore", function(e) {
    console.log("high score");
  });

  document.getElementById("reset").addEventListener(
    "click",
    function(e) {
      window.dispatchEvent(self.events.evResetGame);
    },
    false
  );
};

Game.prototype.handleInput = function() {
  var self = this;
  var keyDown = self.keyDown;
  var snake = self.snake;
  if (keyDown == 38) {
    snake.direction == "up"
      ? (snake.direction = "up")
      : (snake.direction = "down");
  } else if (keyDown == 40) {
    snake.direction == "down"
      ? (snake.direction = "down")
      : (snake.direction = "up");
  } else if (keyDown == 37) {
    snake.direction == "right"
      ? (snake.direction = "right")
      : (snake.direction = "left");
  } else if (keyDown == 39) {
    snake.direction == "left"
      ? (snake.direction = "left")
      : (snake.direction = "right");
  } else if (keyDown == 27) {
  } else if (keyDown == 32) {
  }
  self.keyDown = "";
};

Game.prototype.drawGrid = function() {
  totalW = this.config.gameWidth;
  totalH = this.config.gameHeight;
  this.ctx.strokeStyle = "#BDBDBD";
  this.ctx.lineWidth = 1;
  this.ctx.beginPath();
  var x = 0;
  var y = 0;
  for (var i = 0; i < Math.round(totalW / this.config.cellSize); i++) {
    x = i * this.config.cellSize;
    y = 0;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + totalH);
  }
  for (var j = 0; j < Math.round(totalH / this.config.cellSize); j++) {
    x = 0;
    y = j * this.config.cellSize;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + totalW, y);
  }
  this.ctx.stroke();
};

Game.prototype.update = function(delta) {
  var self = this;
  if (self.deadCounter < 75) {
    self.updateTime += delta;
    self.config.borderWidth += self.config.borderGrow;
    self.snake.update(self, delta);
    for (var i = 0; i < self.baitArray.length; i++) {
      if (self.baitArray[i].scale != 1) self.baitArray[i].update(delta);
    }
    var i = self.particles.length;
    while (i--) {
      var particle = self.particles[i];
      particle.update(delta);
      if (particle.scale == 0) self.particles.splice(i, 1);
    }
    if (self.dead) self.deadCounter++;
    return false;
  } else if (self.dead) {
    window.dispatchEvent(self.events.evPlayerDied);
    self.dead = false;
  }
};

Game.prototype.render = function(interp) {
  var self = this;
  self.ctx.clearRect(0, 0, self.config.gameWidth, self.config.gameHeight);
  if (self.config.debug) self.drawGrid();
  for (var i = 0; i < self.baitArray.length; i++) {
    self.baitArray[i].render(self.ctx, interp);
  }
  self.snake.render(self, interp);

  self.ctx.beginPath();
  self.ctx.rect(
    self.config.cellSize / 2,
    self.config.cellSize / 2,
    self.config.gameWidth - self.config.cellSize,
    self.config.gameHeight - self.config.cellSize
  );
  self.ctx.lineWidth = self.config.borderWidth;
  self.ctx.strokeStyle = "#152027";
  self.ctx.stroke();
  var i = self.particles.length;

  while (i--) {
    var particle = self.particles[i];
    particle.render(self.ctx, interp);
    if (particle.scale == 0) self.particles.splice(i, 1);
  }
  
  self.ctx.fillStyle = "rgb(255, 255, 255)";
  self.ctx.font = "18px OpenSans-Bold";
  self.ctx.textAlign = "left";
  self.ctx.textBaseline = "top";
  self.ctx.fillText("Points: " + self.baitCaught, 32, 32);
};

Game.prototype.getPoints = function() {
  return self.baitCaught;
};

var boxPos = 10,
  boxLastPos = 10,
  boxVelocity = 0.08,
  limit = 300,
  lastFrameTimeMs = 0,
  maxFPS = 60,
  delta = 0,
  timestep = 1000 / maxFPS,
  fps = maxFPS,
  framesThisSecond = 0,
  lastFpsUpdate = 0,
  running = false,
  started = false,
  frameID = 0;

var mainLoop = function(timestamp) {
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    frameID = requestAnimationFrame(mainLoop);
    return;
  }

  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  if (timestamp > lastFpsUpdate + 1000) {
    fps = 0.25 * framesThisSecond + 0.75 * fps;
    lastFpsUpdate = timestamp;
    framesThisSecond = 0;
  }

  framesThisSecond++;
  var numUpdateSteps = 0;

  while (delta >= timestep) {
    GameObj.update(timestep);
    delta -= timestep;
    if (++numUpdateSteps >= 240) {
      delta = 0;
      break;
    }
  }

  GameObj.render(delta / timestep);
  frameID = requestAnimationFrame(mainLoop);
};

var startGame = function() {
  if (!started) {
    started = true;
    frameID = requestAnimationFrame(function(timestamp) {
      GameObj.render(1);
      running = true;
      lastFrameTimeMs = timestamp;
      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
      frameID = requestAnimationFrame(mainLoop);
    });
  }
};

var stopGame = function() {
  running = false;
  started = false;
  cancelAnimationFrame(frameID);
};

var Snake = function(Game) {
  this.velocity = 0.01;
  this.length = 10;
  this.direction = "right";
  this.segments = [];
  this.grew = false;
  this.color = "#d1d3d3";
  this.smoothMvt = false;
  this.x = 0;
  this.y = 0;
  this.tickProgress = 0;
  for (var i = 0; i < this.length; i++) {
    this.segments.push({ diff_x: -Game.config.cellSize, diff_y: 0 });
  }
};

Snake.prototype.checkCollisions = function(Game) {
  var self = this;
  var prevX = self.x;
  var prevY = self.y;

  for (var i = 0; i < self.segments.length; i++) {
    var segmentX = prevX + self.segments[i].diff_x;
    var segmentY = prevY + self.segments[i].diff_y;

    if (segmentX == self.x && segmentY == self.y) {
      Game.dead = true;
      var x = self.x + Game.config.cellSize / 2;
      var y = self.y + Game.config.cellSize / 2;
      createExplosion(Game, x, y, "#4EC3E0");
      return true;
    }

    prevX = segmentX;
    prevY = segmentY;
  }

  if (
    self.x < Game.config.borderWidth / 2 ||
    self.x >= Game.config.gameWidth - Game.config.borderWidth / 2 ||
    self.y < Game.config.borderWidth / 2 ||
    self.y >= Game.config.gameHeight - Game.config.borderWidth / 2
  ) {
    var x = self.x + Game.config.cellSize / 2;
    var y = self.y + Game.config.cellSize / 2;
    createExplosion(Game, x, y, "#4EC3E0");
    Game.dead = true;
    return true;
  }

  for (var i = 0; i < Game.baitArray.length; i++) {
    if (self.x == Game.baitArray[i].x && self.y == Game.baitArray[i].y) {
      self.length++;
      self.velocity += Game.config.speedGain;
      Game.config.borderGrow += 0.03;
      var x = self.x + Game.config.cellSize / 2;
      var y = self.y + Game.config.cellSize / 2;
      createSimpleExplosion(Game, x, y, "#fff");
      self.grew = true;
      window.dispatchEvent(Game.events.evPointAdded);
      Game.baitArray.splice(i, 1);
      Game.baitArray.push(new Bait(Game));
    }
  }

  return false;
};

Snake.prototype.update = function(Game, delta) {
  if (this.tickProgress > 1 && !Game.dead) {
    if (Game.keyDown != "") {
      Game.handleInput();
    }

    if (this.checkCollisions(Game)) return true;

    var cellSize = Game.config.cellSize;
    switch (Game.snake.direction) {
      case "up":
        this.segments.unshift({ diff_x: 0, diff_y: -cellSize });
        this.y += cellSize;
        break;
      case "down":
        this.segments.unshift({ diff_x: 0, diff_y: cellSize });
        this.y -= cellSize;
        break;
      case "left":
        this.segments.unshift({ diff_x: cellSize, diff_y: 0 });
        this.x -= cellSize;
        break;
      case "right":
        this.segments.unshift({ diff_x: -cellSize, diff_y: 0 });
        this.x += cellSize;
        break;
    }
    if (this.grew == false) this.segments.pop();
    this.grew = false;
    Game.updateTime = 0;
    this.tickProgress = 0;
  }

  this.tickProgress += this.velocity * delta;
};

Snake.prototype.render = function(Game, interp) {
  var self = this;
  self.lastX = self.x;
  self.lastY = self.y;
  Game.ctx.save();
  Game.ctx.translate(self.x, self.y);
  Game.ctx.fillStyle = self.color;
  var cornerRadius = Game.config.cellSize / 2;
  var corners = { tl: 0, tr: 0, bl: 0, br: 0 };
  var firstX = 0,
    firstY = 0,
    firstWidth = Game.config.cellSize,
    firstHeight = Game.config.cellSize;

  switch (self.direction) {
    case "down":
      corners.tl = cornerRadius;
      corners.tr = cornerRadius;
      if (self.smoothMvt) {
        firstY =
          Game.config.cellSize - Game.config.cellSize * self.tickProgress;
        firstHeight = Game.config.cellSize * self.tickProgress;
      }
      break;
    case "up":
      corners.bl = cornerRadius;
      corners.br = cornerRadius;
      if (self.smoothMvt) {
        firstHeight = Game.config.cellSize * self.tickProgress;
      }
      break;
    case "left":
      corners.tl = cornerRadius;
      corners.bl = cornerRadius;
      if (self.smoothMvt) {
        firstX =
          Game.config.cellSize - Game.config.cellSize * self.tickProgress;
        firstWidth = Game.config.cellSize * self.tickProgress;
      }
      break;
    case "right":
      corners.br = cornerRadius;
      corners.tr = cornerRadius;
      if (self.smoothMvt) {
        firstWidth = Game.config.cellSize * self.tickProgress;
      }
      break;
  }

  utils.roundRect(Game.ctx, firstX, firstY, firstWidth, firstHeight, corners);
  corners = { tl: 0, tr: 0, bl: 0, br: 0 };
  var prevX = 0;
  var prevY = 0;

  for (var i = 0; i < this.segments.length; i++) {
    var segmentX = prevX + this.segments[i].diff_x;
    var segmentY = prevY + this.segments[i].diff_y;
    corners = { tl: 0, tr: 0, bl: 0, br: 0 };
    var next = i + 1;
    var nextDiffY, nextDiffY;
    if (next >= this.segments.length) {
      next = 0;
    } else {
      nextDiffX = this.segments[next].diff_x;
      nextDiffY = this.segments[next].diff_y;
    }
    if (next != 0) {
      if (this.segments[i].diff_y < 0) {
        if (nextDiffX < 0) corners.tr = cornerRadius;
        if (nextDiffX > 0) corners.tl = cornerRadius;
      }
      if (this.segments[i].diff_y > 0) {
        if (nextDiffX < 0) corners.br = cornerRadius;
        if (nextDiffX > 0) corners.bl = cornerRadius;
      }
      if (nextDiffY < 0) {
        if (this.segments[i].diff_x < 0) corners.bl = cornerRadius;
        if (this.segments[i].diff_x > 0) corners.br = cornerRadius;
      }
      if (nextDiffY > 0) {
        if (this.segments[i].diff_x < 0) corners.tl = cornerRadius;
        if (this.segments[i].diff_x > 0) corners.tr = cornerRadius;
      }
    } else {
      if (this.segments[i].diff_y > 0) {
        corners.bl = cornerRadius;
        corners.br = cornerRadius;
      }
      if (this.segments[i].diff_y < 0) {
        corners.tl = cornerRadius;
        corners.tr = cornerRadius;
      }
      if (this.segments[i].diff_x > 0) {
        corners.br = cornerRadius;
        corners.tr = cornerRadius;
      }
      if (this.segments[i].diff_x < 0) {
        corners.bl = cornerRadius;
        corners.tl = cornerRadius;
      }
    }

    utils.roundRect(
      Game.ctx,
      segmentX,
      segmentY,
      Game.config.cellSize,
      Game.config.cellSize,
      corners
    );
    prevX = segmentX;
    prevY = segmentY;
  }
  Game.ctx.restore();
};

var Bait = function(Game) {
  this.bait_colors = ["#7e4082", "#f6dc6b", "#E56A54", "#6bccb3"];
  this.x = 0;
  this.y = 0;
  this.color = "";
  this.growing = true;
  this.radius = Game.config.cellSize / 2;
  this.scale = 0.1;
  this.lastScale = this.scale;
  this.scaleSpeed = 0.008;
  this.maxScale = 1.5;
  this.place(Game);
};

Bait.prototype.place = function(Game) {
  var cellSize = Game.config.cellSize;
  var width = Game.config.gameWidth - (Game.config.borderWidth + cellSize);
  var height = Game.config.gameHeight - (Game.config.borderWidth + cellSize);
  this.x =
    Math.ceil(
      utils.getRandomInt(Game.config.borderWidth + cellSize, width) / cellSize
    ) * cellSize;
  this.y =
    Math.ceil(
      utils.getRandomInt(Game.config.borderWidth + cellSize, height) / cellSize
    ) * cellSize;
  if (Game.config.debug)
    console.log(
      this.x,
      this.y,
      width,
      height,
      Game.config.borderWidth,
      Game.config.cellSize
    );
  this.color = this.bait_colors[utils.getRandomInt(0, 4)];
};

Bait.prototype.update = function(delta) {
  this.lastScale = this.scale;
  if (this.scale < this.maxScale && this.growing)
    this.scale += this.scaleSpeed * delta;
  if (this.scale >= this.maxScale && this.growing) {
    this.growing = false;
    this.scale = this.maxScale;
  }
  if (this.scale > 1 && !this.growing) {
    this.scale -= (this.scaleSpeed / 2) * delta;
  }
  if (this.scale <= 1 && !this.growing) {
    this.scale = 1;
  }
};

Bait.prototype.render = function(ctx, interp) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.translate(this.radius, this.radius);
  ctx.scale(
    this.lastScale + (this.scale - this.lastScale),
    this.lastScale + (this.scale - this.lastScale)
  );
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
};

var createExplosion = function(Game, x, y, color, minSize, maxSize, count) {
  var minSize = (minSize || 10) * Game.config.density;
  var maxSize = (maxSize || 15) * Game.config.density;
  var count = count || 10;
  var minSpeed = 0.06;
  var maxSpeed = 0.2;
  var minScaleSpeed = 0.001;
  var maxScaleSpeed = 0.003;

  for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
    var radius = utils.getRandomFloat(minSize, maxSize);
    var color = color;
    var scaleSpeed = utils.getRandomFloat(minScaleSpeed, maxScaleSpeed);
    var speed = utils.getRandomFloat(minSpeed, maxSpeed);
    var velocityX = speed * Math.cos((angle * Math.PI) / 180.0);
    var velocityY = speed * Math.sin((angle * Math.PI) / 180.0);
    dimensions = { radius: radius };
    var particle = new Particle(
      x,
      y,
      color,
      dimensions,
      scaleSpeed,
      velocityX,
      velocityY
    );
    Game.particles.push(particle);
  }
};

var createSimpleExplosion = function(Game, x, y, color, radius, scaleSpeed) {
  var radius = (radius || 20) * Game.config.density;
  var color = color || "#fff";
  var scaleSpeed = scaleSpeed || 0.004;
  var velocity = 0.05;
  Game.particles.push(
    new Particle(
      x,
      y,
      color,
      { width: radius, height: radius / 2 },
      scaleSpeed,
      velocity,
      0
    )
  );
  Game.particles.push(
    new Particle(
      x,
      y,
      radius,
      { width: radius / 2, height: radius },
      scaleSpeed,
      0,
      velocity
    )
  );
  Game.particles.push(
    new Particle(
      x,
      y,
      radius,
      { width: radius, height: radius / 2 },
      scaleSpeed,
      -velocity,
      0
    )
  );
  Game.particles.push(
    new Particle(
      x,
      y,
      radius,
      { width: radius / 2, height: radius },
      scaleSpeed,
      0,
      -velocity
    )
  );
};

var Particle = function(
  x,
  y,
  color,
  dimensions,
  scaleSpeed,
  velocityX,
  velocityY
) {
  this.scale = 1.0;
  this.lastScale = this.scale;
  this.initialScale = 1;
  this.x = x;
  this.y = y;
  this.lastX = this.x;
  this.lastY = this.y;
  this.radius = dimensions.radius || "10";
  this.width = dimensions.width || this.radius;
  this.height = dimensions.height || this.radius;
  this.color = color;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.duration = 100;
  this.elapsedTime = 0;
  this.scaleSpeed = scaleSpeed;
};

Particle.prototype.update = function(delta) {
  this.lastX = this.x;
  this.lastY = this.y;
  this.lastScale = this.scale;
  this.scale -= this.scaleSpeed * delta;
  if (this.scale <= 0.01) {
    this.scale = 0;
  }
  this.x += this.velocityX * delta;
  this.y += this.velocityY * delta;
};

Particle.prototype.render = function(ctx, interp) {
  ctx.save();
  ctx.translate(
    this.lastX + (this.x - this.lastX) * interp,
    this.lastY + (this.y - this.lastY) * interp
  );
  ctx.scale(
    this.lastScale + (this.scale - this.lastScale),
    this.lastScale + (this.scale - this.lastScale)
  );
  if (this.width != this.height) {
    utils.bezierCurve(ctx, 0, 0, this.width, this.height);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  ctx.restore();
};

var utils = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRandomFloat: function(min, max) {
    return min + Math.random() * (max - min);
  },
  bezierCurve: function(ctx, centerX, centerY, width, height) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - height / 2);
    ctx.bezierCurveTo(
      centerX + width / 2,
      centerY - height / 2,
      centerX + width / 2,
      centerY + height / 2,
      centerX,
      centerY + height / 2
    );
    ctx.bezierCurveTo(
      centerX - width / 2,
      centerY + height / 2,
      centerX - width / 2,
      centerY - height / 2,
      centerX,
      centerY - height / 2
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  },
  roundRect: function(ctx, x, y, width, height, radius) {
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
  }
};

var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

var then = Date.now();
var GameObj = new Game();
GameObj.update(100);
GameObj.render(1);
