var Player = function(x,y,actionPoints,elevation,speed) {
  this.startX = x;
  this.startY = y;
  this.position = new Phaser.Point(x,y);
  this.actionPoints = actionPoints;
  this.color = 0x0066FF;
  this.waypoints = [ new Waypoint(x,y) ];
  this.waypoints.last().elevation = elevation;
  this.elevation = elevation;
  this.waypointIndex = 1;
  this.speed = speed;
  this.state = "default";
  this.powers = [];
  this.setUpPowers();
}

Player.prototype.clickEvent = function() {
  //player clicked
  if(this.clicked()) {
    this.setAsCurPlayer();
  } //waypoint menu clicked
  else if(this.waypointMenuClicked()){

  } // waypoint clicked
  else if(this.waypointClicked()) {

  } //powers
  else if(this.state != "default") {
    game.curPower.clickEvent();
  } // set waypoint
  else if(game.curPlayer == this) {
    this.setWaypoint();
  }
}

Player.prototype.clicked = function() {
  if(game.input.activePointer.position.distance(this.position) < 5) {
    return true;
  }
  return false;
}

Player.prototype.waypointClicked = function() {
  for(var i = 0; i < this.waypoints.length; i++) {
    if(this.waypoints[i].clicked()) {
      game.curWaypoint = this.waypoints[i];
      return true;
    }
  }
  return false;
}

Player.prototype.waypointMenuClicked = function() {
  if(game.curWaypoint) {
    if(game.curWaypoint.menuClicked()){
      return true;
    }
  }
  return false;
}

Player.prototype.setAsCurPlayer = function() {
  game.curPlayer = this;
}

Player.prototype.pause = function() {
  game.time.events.add(this.waypoints[this.waypointIndex - 1].duration, this.startPlayer, this);
}

Player.prototype.startPlayer = function() {
  var waypoint = this.waypoints[this.waypointIndex];
  if(waypoint) {
    this.waypointIndex += 1;
    this.tween=game.add.tween(this.position);
    var distance = this.position.distance(waypoint.position)

    this.tween.to({x: waypoint.position.x, y: waypoint.position.y}, (distance/this.speed) * 60, Phaser.Easing.Linear.None, true);
    this.tween.onComplete.add(waypoint.action, waypoint.listener);
  }
}

Player.prototype.resetPlayer = function() {
  this.position.x = this.startX;
  this.position.y = this.startY;
  this.waypointIndex = 1;
  this.tween.stop();
}

Player.prototype.removeWaypoint = function() {
  if(game.timelineRunning === false && this.waypoints.length > 1) {
    this.waypoints.pop();
    this.waypoints.last().action = this.startPlayer;
    this.waypoints.last().listener = this;
  }
}

Player.prototype.resetCurWaypoint = function() {
  game.curWaypoint = null;
  this.state = "default";
  this.resetPowerText();
}

Player.prototype.findElevation = function(point) {
  for(var i = 0; i < level.areas.length; i++) {
    if(level.areas[i].collisionPoint(point)) {
      return level.areas[i].elevation;
    }
  }
}

Player.prototype.setWaypoint = function() {
  var areaElevation = this.findElevation(game.input.activePointer.position);
  //check elevation
  if(areaElevation == this.waypoints.last().elevation) {
    //check for area in between
    if(level.checkAreaCollision(this.waypoints.last().position, game.input.activePointer.position, this.waypoints.last().elevation) === false){
      var pos = game.input.activePointer.position
      game.curPlayer.waypoints.push(new Waypoint(pos.x, pos.y, this, Player.prototype.startPlayer,0,areaElevation));
    }
  }
}

Player.prototype.setUpPowers = function() {
  for(var i = 0; i < PLAYER_DATA.powers.length; i++) {
    this.powers.push(new Power());
    var pow = this.powers.last();
    var newPow = PLAYER_DATA.powers[i]
    pow.name = newPow.name;
    pow.action = newPow.action;
    pow.player = this;
    pow.clickState = newPow.clickState;
    pow.text = game.add.text(game.world.centerX, game.world.centerY, newPow.name, { font: "16px Arial", fill: "#CCCCCC", align: "center" });
    console.log(pow.text);
    pow.text.visible = false;
  }
}

Player.prototype.resetPowerText = function() {
  for(var i = 0; i < this.powers.length; i++) {
    this.powers[i].text.visible = false;
  }
}