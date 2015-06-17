var Player = function(x,y,actionPoints,elevation,speed) {
  this.startX = x;
  this.startY = y;
  this.position = new Phaser.Point(x,y);
  this.actionPoints = actionPoints;
  this.color = 0x0066FF;
  this.waypoints = [ new Waypoint(x,y) ];
  this.elevation = elevation;
  this.waypointIndex = 1;
  this.speed = speed;
  this.state = "default";
  this.powers = [ new Power(this, "Jump", Power.prototype.jump, "jump") ];
}

Player.prototype.clickEvent = function() {
  //player clicked
  if(this.clicked()) {
    this.setAsCurPlayer();
  } //waypoint clicked
  else if(this.waypointClicked()) {

  } // waypoint menu clicked
  else if(this.waypointMenuClicked()){

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
    this.tween.onComplete.add(waypoint.action, this);
  }
}

Player.prototype.resetPlayer = function() {
  console.log("APPLES")
  this.position.x = this.startX;
  this.position.y = this.startY;
  this.waypointIndex = 1;
  this.tween.stop();
}

Player.prototype.removeWaypoint = function() {
  if(game.timelineRunning === false && this.waypoints.length > 1) {
    this.waypoints.pop();
  }
}

Player.prototype.resetCurWaypoint = function() {
  game.curWaypoint = null;
}

Player.prototype.setWaypoint = function() {
  var areaElevation = 0
  for(var i = 0; i < level.areas.length; i++) {
    if(level.areas[i].clicked()) {
      areaElevation = level.areas[i].elevation;
    }
  }
  //check elevation
  if(areaElevation == this.elevation) {
    //check for area in between
    if(level.checkAreaCollision(this.waypoints.last().position, game.input.activePointer.position, this.elevation) === false){
      var pos = game.input.activePointer.position
      game.curPlayer.waypoints.push(new Waypoint(pos.x, pos.y, this, Player.prototype.startPlayer));
    }
  }
}