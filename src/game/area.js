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

Area.prototype.setUpGrid = function(grid) {
  var myGrid = grid.clone2dArray();
  var startX = this.position.x / CELL_SIZE;
  var endX = (this.position.x + this.width) / CELL_SIZE
  var startY = this.position.y / CELL_SIZE;
  var endY = (this.position.y + this.height) / CELL_SIZE
  for(var h = startY; h < endY; h++) {
    for(var w = startX; w < endX; w++) {
      myGrid[h].splice(w, 1, 1);
    }
  }
  return myGrid;
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

Area.prototype.collisionPoint = function(point) {
  if(pointInBox(point.x,point.y,this.position.x,this.position.y,this.position.x + this.width, this.position.y + this.height)){
    return true;
  }
  return false;
}