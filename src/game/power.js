var Power = function(player,name,action,clickState) {
  this.name = name;
  this.action = action;
  this.player = player;
  this.clickState = clickState
}

Power.prototype.clicked = function() {
  this.player.state = this.clickState;
}

Power.prototype.jump = function(params) {
  this.player.position.x = params.x;
  this.player.position.y = params.y;
  this.player.elevation = params.elevation;
}

Power.prototype.clickEvent = function() {
  if(this.player.state == "jump"){
    mPos = game.input.activePointer.position;
    if(mPos.distance(this.position) < 40) {
      this.player.state = "default";
    }
  }
}


