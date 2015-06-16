Player.prototype.draw = function() {
  //waypoints
  if(game.timelineRunning === false){
    for(var i = 0; i < this.waypoints.length; i++) {
      this.waypoints[i].draw(this.waypoints[i-1]);
    }
  }

  game.graphics.beginFill(this.color);
  game.graphics.drawCircle(this.position.x,this.position.y,5);
  game.graphics.endFill();
}