Guard.prototype.draw = function() {
  game.graphics.beginFill(this.color);
  game.graphics.drawCircle(this.position.x,this.position.y,5);
  game.graphics.endFill();
}

Guard.prototype.drawLOS = function() {
  var point1 = findPointFromAngle(this.position, 40, this.direction - 30);
  var point2 = findPointFromAngle(this.position, 40, this.direction + 30);
  game.graphics.lineStyle(1,0x99CCFF);
  game.graphics.moveTo(this.position.x, this.position.y);
  game.graphics.lineTo(point1.x, point1.y);
  game.graphics.moveTo(this.position.x, this.position.y);
  game.graphics.lineTo(point2.x, point2.y);
  game.graphics.lineStyle();
}