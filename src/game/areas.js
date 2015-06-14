var Area = function(x,y,width, height, elevation) {
  this.position = new Phaser.Point(x,y);
  this.width = width;
  this.height = height;
  this.color = AREA_COLORS[elevation];
}

