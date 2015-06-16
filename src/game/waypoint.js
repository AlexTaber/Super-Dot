var Waypoint = function(x, y, player) {
  this.position = new Phaser.Point(x,y);
  this.player = player;
  this.color = 0x66A3FF;
}