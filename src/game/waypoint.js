var Waypoint = function(x, y, player,action,duration,elevation) {
  this.position = new Phaser.Point(x,y);
  this.player = player;
  this.color = 0x66A3FF;
  this.action = action;
  this.duration = duration;
  this.params = {}
  this.listener = player;
  this.elevation = elevation
}

Waypoint.prototype.menuClicked = function() {
  var pos = game.input.activePointer.position;
  var menuX = this.position.x + MENU_X
  var menuY = this.position.y + MENU_Y
  if(pointInBox(pos.x,pos.y,menuX,menuY,menuX + MENU_WIDTH, menuY + MENU_HEIGHT)){
    return true;
  }
  return false;
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
