Waypoint.prototype.draw = function(prevWaypoint) {
  game.graphics.beginFill(this.color);
  game.graphics.drawCircle(this.position.x,this.position.y,5);
  game.graphics.endFill();

  if(prevWaypoint) {
    game.graphics.lineStyle(2,this.color);
    game.graphics.moveTo(this.position.x, this.position.y);
    game.graphics.lineTo(prevWaypoint.position.x, prevWaypoint.position.y);
    game.graphics.lineStyle();
  }

  //menu
  if(game.curWaypoint == this){
    this.drawMenu();
  }
}

Waypoint.prototype.drawMenu = function() {
  var startPoint = this.findMenuStartPosition();
  game.graphics.beginFill(0xD6EBFF, 0.7)
  game.graphics.drawRect(startPoint.x, startPoint.y, MENU_WIDTH, MENU_HEIGHT);
  game.graphics.endFill();
}

Waypoint.prototype.findMenuStartPosition = function() {
  var point = new Phaser.Point();
  point.x = Math.min(this.position.x + MENU_X, WIDTH - MENU_WIDTH);
  point.y = Math.min(this.position.y + MENU_Y, HEIGHT - MENU_HEIGHT);
  return point;
}