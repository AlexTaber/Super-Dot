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
}