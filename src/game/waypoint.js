var Waypoint = function(x, y, player,action,duration) {
  this.position = new Phaser.Point(x,y);
  this.player = player;
  this.color = 0x66A3FF;
  this.action = action;
  this.duration = duration;
}

Waypoint.prototype.clicked = function() {
  if(game.input.activePointer.position.distance(this.position) < 5) {
    this.clickEvent();
    return true;
  }
  return false;
}

Waypoint.prototype.clickEvent = function() {
  if(level.curWaypoint == this){

  } else {
    level.curWaypoint = this;
  }
}