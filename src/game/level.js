var Level = function() {
  this.setUpAreas();
  this.guards = LEVEL_TEMPLATE[0][1];
  this.player = LEVEL_TEMPLATE[0][3];
  this.assignEvents();
  this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
  this.grids = [];
  this.setUpGrids();
}

Level.prototype.setUpAreas = function() {
  this.areas = [];
  for(var i = 0; i < LEVEL_TEMPLATE[0][0].length; i++) {
    var tempObj = LEVEL_TEMPLATE[0][0][i];
    var area = new Area(tempObj.x * CELL_SIZE, tempObj.y * CELL_SIZE, tempObj.width * CELL_SIZE, tempObj.height * CELL_SIZE, tempObj.elevation)
    this.areas.push(area);
  }
}

Level.prototype.setUpGrids = function() {
  for(var i = 0; i < 4; i++) {
    this.grids[i] = this.setUpGrid(i);
  }
}

Level.prototype.setUpGrid = function(elevation) {
  var grid = GRID.clone2dArray();
  console.log(grid + " " + elevation);
  for(var ai = 0; ai < this.areas.length; ai++) {
    if(this.areas[ai].elevation != elevation) {
      newGrid = grid.clone2dArray();
      grid = this.areas[ai].setUpGrid(newGrid);
    }
  }
  return grid;
}

Level.prototype.startLevel = function() {
  for(var i = 0; i < this.guards.length; i++) {
    this.guards[i].startPatrolTween();
  }
  this.player.startPlayer();
  this.player.resetPowerText();
}

Level.prototype.resetLevel = function() {
  for (var i = 0; i < this.guards.length; i++) {
    this.guards[i].resetGuard();
  }
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
    this.player.clickEvent();
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