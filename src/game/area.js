var Area = function(x,y,width, height, elevation) {
  this.elevation = elevation;
  this.position = new Phaser.Point(x,y);
  this.width = width;
  this.height = height;
  this.color = AREA_COLORS[elevation];
  this.lines = this.setUpLines();
  this.collisionLine = new Phaser.Line();
}

Area.prototype.setUpLines = function() {
  var line1 = new Phaser.Line(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);
  var line2 = new Phaser.Line(this.position.x + this.width, this.position.y, this.position.x,this.position.y + this.height);
  return [line1, line2]
}

Area.prototype.clicked = function() {
  var pos = game.input.activePointer.position;
  if(pointInBox(pos.x,pos.y,this.position.x,this.position.y,this.position.x + this.width, this.position.y + this.height)){
    return true;
  }
  return false;
}

Area.prototype.checkCollision = function(point1, point2, elevation) {
  this.collisionLine.start = point1;
  this.collisionLine.end = point2;
  for(var i = 0; i < this.lines.length; i++) {
    if(this.lines[i].intersects(this.collisionLine) && elevation != this.elevation) {
      return true;
    }
  }
  return false;
}