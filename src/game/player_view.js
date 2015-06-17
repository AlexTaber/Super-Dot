Player.prototype.draw = function() {
  //powers
  if(this.state != "default") {
    if(this.state = "jump") {
      game.graphics.beginFill(0xCCEBFF, 0.5);
      game.graphics.drawCircle(game.curWaypoint.position.x,game.curWaypoint.position.y,40);
      game.graphics.endFill();
    }
  }

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