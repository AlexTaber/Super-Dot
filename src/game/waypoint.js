var Waypoint = function(x, y, player,action,duration,elevation) {
  this.position = new Phaser.Point(x,y);
  this.player = player;
  this.color = 0x0066FF;
  this.action = action;
  this.duration = duration;
  this.params = {}
  this.listener = player;
  this.elevation = elevation;
  this.paused = false;
}

Waypoint.prototype.menuClicked = function() {
  var pos = game.input.activePointer.position;
  var menuPos = this.findMenuStartPosition();
  if(pointInBox(pos.x,pos.y,menuPos.x,menuPos.y,menuPos.x + MENU_WIDTH, menuPos.y + MENU_HEIGHT)){
    this.menuClickEvent();
    return true;
  }
  return false;
}

Waypoint.prototype.menuClickEvent = function() {
  for(var i = 0; i < this.player.powers.length; i++) {
    var startPoint = this.findMenuStartPosition();
    var x1 = startPoint.x;
    var y1 = startPoint.y + ((MENU_HEIGHT/4) * i);
    var x2 = x1 + MENU_WIDTH;
    var y2 = y1 + (MENU_HEIGHT/4) - 1;
    var point = game.input.activePointer.position;
    if(pointInBox(point.x,point.y,x1,y1,x2,y2)) {
      this.player.powers[i].clicked();
    }
  }
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

Waypoint.prototype.pause = function() {
  game.time.events.add(this.duration, this.action, this.listener);
}

Waypoint.prototype.resetWaypoint = function() {
  this.paused = false;
}
