var Level = function() {
  this.areas = LEVEL_TEMPLATE[0][0];
  this.guards = LEVEL_TEMPLATE[0][1];
  this.player = LEVEL_TEMPLATE[0][3];
  this.assignEvents();
}

Level.prototype.startLevel = function() {
  for(var i = 0; i < this.guards.length; i++) {
    this.guards[i].startPatrolTween();
  }
  this.player.startPlayer();
}

Level.prototype.resetLevel = function() {
  for (var i = 0; i < this.guards.length; i++) {
    this.guards[i].resetGuard();
  }
  console.log("WHOA");
  this.player.resetPlayer();
}

Level.prototype.update = function() {
  if(game.timelineRunning) {
    for(var i = 0; i < this.guards.length; i++) {
      this.guards[i].timelineIndex += 1;
      this.guards[i].timeline.checkForEvent();
      this.guards[i].canSeePlayer();
    }
  }
}

Level.prototype.assignEvents = function() {
  eventArray = LEVEL_TEMPLATE[0][2];
  for(var i = 0; i < eventArray.length; i++) {
    this.guards[eventArray[i].guardIndex].timeline.events.push({ timelineIndex: eventArray[i].timelineIndex, action: eventArray[i].action, duration: eventArray[i].duration })
  }
}

Level.prototype.clicked = function() {
  if(game.timelineRunning === false){
    if(this.player.clicked()) {
      this.player.setAsCurPlayer();
    } else if(game.curPlayer) {
      //find elevation
      var areaElevation = 0
      for(var i = 0; i < this.areas.length; i++) {
        if(this.areas[i].clicked()) {
          areaElevation = this.areas[i].elevation;
        }
      }
      //check elevation
      if(areaElevation == this.player.elevation) {
        //check for area in between
        if(level.checkAreaCollision(level.player.waypoints.last().position, game.input.activePointer.position, this.player.elevation) === false){
          var pos = game.input.activePointer.position
          game.curPlayer.waypoints.push(new Waypoint(pos.x, pos.y));
        }
      }
    }
  }
}

Level.prototype.draw = function() {
  //levels
  for(var l = 0; l < 4; l++) {
    //areas
    for(var i = 0; i < level.areas.length; i++) {
      if(l == level.areas[i].elevation) level.areas[i].draw();
    }
    //guards LOS
    for(var i = 0; i < level.guards.length; i++) {
      if(l == level.guards[i].elevation) level.guards[i].drawLOS();
    }
    //guards
    for(var i = 0; i < level.guards.length; i++) {
      if(l == level.guards[i].elevation) level.guards[i].draw();
    }
    //player
    level.player.draw();
  }
}

Level.prototype.checkAreaCollision = function(point1, point2, elevation) {
  for(var i = 0; i < this.areas.length; i++) {
    if(this.areas[i].checkCollision(point1, point2, elevation)) {
      return true;
    }
  }
  return false;
}