var Level = function() {
  this.setUpAreas();
  this.guards = LEVEL_TEMPLATE[0][1];
  this.player = LEVEL_TEMPLATE[0][3];
  this.assignEvents();
  this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
  this.grids = [];
  this.setUpGrids();
  this.waypointMenu = new WaypointMenu();
  this.pathPoint = new Phaser.Point();
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
    //menu
    level.waypointMenu.draw();
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

Level.prototype.pathTo = function(x,y,targetX, targetY) {
  var elevation = game.curPlayer.waypoints.last().elevation;
  var startX = Math.floor(x / CELL_SIZE);
  var startY = Math.floor(y / CELL_SIZE);
  var endX = Math.floor(targetX / CELL_SIZE);
  var endY = Math.floor(targetY / CELL_SIZE);
  this.pathfinder.setGrid(this.grids[elevation], 0);
  this.pathfinder.setCallbackFunction(function(path) {
    path = path || [];
    //do stuff
    for(var i = 1; i < path.length; i++) {
      var plaPos = game.curPlayer.waypoints.last().position
      var check = (i == path.length - 1);
      level.pathPoint.set((path[i].x * CELL_SIZE) + 16, (path[i].y * CELL_SIZE) + 16);
      console.log(plaPos);
      console.log(level.pathPoint);
      if(level.checkAreaCollision(plaPos, level.pathPoint, elevation)) {
        game.curPlayer.waypoints.push(new Waypoint(path[i-1].x * CELL_SIZE + 16, path[i-1].y * CELL_SIZE + 16, game.curPlayer, Player.prototype.startPlayer,0,elevation));
        // game.curPlayer.waypoints.push(new Waypoint(path[i].x * CELL_SIZE + 16, path[i].y * CELL_SIZE + 16, game.curPlayer, Player.prototype.startPlayer,0,elevation));
      }
      if(check) {
        game.curPlayer.waypoints.push(new Waypoint(path[i].x * CELL_SIZE + 16, path[i].y * CELL_SIZE + 16, game.curPlayer, Player.prototype.startPlayer,0,elevation));
      }
    }
  });

  this.pathfinder.preparePathCalculation([startX,startY], [endX,endY]);
  this.pathfinder.calculatePath();
}