var Power = function(player,name,action,clickState) {
  this.name = name;
  this.action = action;
  this.player = player;
  this.clickState = clickState
}

Power.prototype.clicked = function() {
  game.curPower = this;
  game.curWaypoint.action = this.action;
  game.curWaypoint.listener = game.curWaypoint;
  this.player.state = this.clickState;
}

Power.prototype.jump = function() {
  console.log(this);
  this.player.position.x = this.params.x;
  this.player.position.y = this.params.y;
  this.player.elevation = this.params.elevation;
  this.player.waypointIndex += 1;
  this.player.startPlayer();
}

Power.prototype.clickEvent = function() {
  if(this.player.state == "jump"){
    var mPos = game.input.activePointer.position;
    if(mPos.distance(game.curWaypoint.position) < 40) {
      game.curPlayer.waypoints.push( new Waypoint(mPos.x,mPos.y,game.curPlayer,Player.prototype.startPlayer,0,this.player.findElevation() ))
      game.curWaypoint.params.x = mPos.x;
      game.curWaypoint.params.y = mPos.y;
      game.curWaypoint.params.elevation = game.curPlayer.findElevation();
      this.player.state = "default";
    }
  }
}


