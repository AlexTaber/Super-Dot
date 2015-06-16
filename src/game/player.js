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
}

Player.prototype.clicked = function() {
  if(game.input.activePointer.position.distance(this.position) < 5) {
    return true;
  }
  return false;
}

Player.prototype.setAsCurPlayer = function() {
  game.curPlayer = this;
}

Player.prototype.startPlayer = function() {
  var waypoint = this.waypoints[this.waypointIndex];
  if(waypoint) {
    this.waypointIndex += 1;
    this.tween=game.add.tween(this.position);
    var distance = this.position.distance(waypoint.position)

    this.tween.to({x: waypoint.position.x, y: waypoint.position.y}, (distance/this.speed) * 60, Phaser.Easing.Linear.None, true);
    this.tween.onComplete.add(this.startPlayer, this);
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
  if(game.timelineRunning === false) {
    this.waypoints.pop();
  }
}