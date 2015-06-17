Area.prototype.draw = function() {
  game.graphics.beginFill(this.color, 0.4);
  game.graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
  game.graphics.endFill();
}