var Level = function() {
  this.areas = LEVEL_TEMPLATE[0][0];
  this.guards = LEVEL_TEMPLATE[0][1];
  this.assignEvents();
}

Level.prototype.update = function() {
  for(var i = 0; i < this.guards.length; i++) {
    this.guards[i].timelineIndex += 1;
    this.guards[i].timeline.checkForEvent();
  }
}

Level.prototype.assignEvents = function() {
  eventArray = LEVEL_TEMPLATE[0][2];
  for(var i = 0; i < eventArray.length; i++) {
    this.guards[eventArray[i].guardIndex].timeline.events.push({ timelineIndex: eventArray[i].timelineIndex, action: eventArray[i].action, duration: eventArray[i].duration })
  }
}
