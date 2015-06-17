var Power = function(player,name,action,clickState) {
  this.name = name;
  this.action = action;
  this.player = player;
  this.clickState = clickState;
}

Power.prototype.clicked = function() {
  game.curPower = this;
  game.curWaypoint.action = this.action;
  game.curWaypoint.listener = game.curWaypoint;
  this.player.state = this.clickState;
}

Power.prototype.jump = function() {
  // this.player.position.x = this.params.x;
  // this.player.position.y = this.params.y;
  // this.player.elevation = this.params.elevation;
  // this.player.waypointIndex += 1;
  // this.player.startPlayer();
  var waypoint = this.player.waypoints[this.player.waypointIndex];
  if(waypoint) {
    this.player.waypointIndex += 1;
    this.player.tween=game.add.tween(this.player.position);
    var distance = this.player.position.distance(waypoint.position)

    this.player.tween.to({x: waypoint.position.x, y: waypoint.position.y}, (distance/this.player.speed) * 120, Phaser.Easing.Linear.None, true);
    this.player.tween.onComplete.add(waypoint.action, waypoint.listener);
  }
}

Power.prototype.jumpClickEvent = function() {
  var mPos = game.input.activePointer.position;
  if(mPos.distance(game.curWaypoint.position) < 40) {
    game.curPlayer.waypoints.push( new Waypoint(mPos.x,mPos.y,game.curPlayer,Player.prototype.startPlayer,0,this.player.findElevation(mPos) ))
    game.curWaypoint.params.x = mPos.x;
    game.curWaypoint.params.y = mPos.y;
    game.curWaypoint.params.elevation = game.curPlayer.findElevation(mPos);
    this.player.state = "default";
  }
}

Power.prototype.fly = function() {
  var waypoint = this.player.waypoints[this.player.waypointIndex];
  if(waypoint) {
    this.player.waypointIndex += 1;
    this.player.tween=game.add.tween(this.player.position);
    var distance = this.player.position.distance(waypoint.position)

    this.player.tween.to({x: waypoint.position.x, y: waypoint.position.y}, (distance/this.player.speed) * 30, Phaser.Easing.Linear.None, true);
    this.player.tween.onComplete.add(waypoint.action, waypoint.listener);
  }
}

Power.prototype.flyClickEvent = function() {
  var mPos = game.input.activePointer.position;
  var curEl = game.curPlayer.findElevation(game.curPlayer.waypoints.last().position)
  if(curEl >= game.curPlayer.findElevation(mPos)) {
    game.curPlayer.waypoints.push( new Waypoint(mPos.x,mPos.y,game.curPlayer,Player.prototype.startPlayer,0,this.player.findElevation(mPos) ))
    game.curWaypoint.params.x = mPos.x;
    game.curWaypoint.params.y = mPos.y;
    game.curWaypoint.params.elevation = game.curPlayer.findElevation(mPos);
    this.player.state = "default";
  }
}

Power.prototype.clickEvent = function() {
  if(this.player.state == "jump"){
    this.jumpClickEvent();
  } else if(this.player.state == "fly"){
    this.flyClickEvent();
  }
}


