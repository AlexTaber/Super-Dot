var Area = function(x,y,width, height, elevation) {
  this.elevation = elevation;
  this.position = new Phaser.Point(x,y);
  this.width = width;
  this.height = height;
  this.color = AREA_COLORS[elevation];
}

Area.prototype.clicked = function() {
  var pos = game.input.activePointer.position;
  if(pos.x > this.position.x && pos.x < this.position.x + this.width){
    if(pos.y > this.position.y && pos.y < this.position.y + this.height){
      return true;
    }
  }
  return false;
}
