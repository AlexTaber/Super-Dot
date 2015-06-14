var Level = function() {
  this.areas = LEVEL_TEMPLATE[0][0];
  this.guards = LEVEL_TEMPLATE[0][1];
}

Level.prototype.update = function() {
  this.guardAction();
}

Level.prototype.guardAction = function() {
  for(var i = 0; i < this.guards.length; i++) {
    this.guards[i].action();
  }
}