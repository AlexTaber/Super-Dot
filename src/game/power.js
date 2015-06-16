var Power = function(player,name,action) {
  this.name = name;
  this.action = action;
  this.player = player;
}

Power.prototype.jump = function(x,y,elevation) {
  this.player.position.x = x;
  this.player.position.y = y;
  this.player.elevation = elevation;
}