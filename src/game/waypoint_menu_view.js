WaypointMenu.prototype.draw = function() {
  if(game.curWaypoint && game.timelineRunning === false){
    this.alarmSprite.visible = true;
    var rectStart = (game.curWaypoint.position.x - 16) - 2;
    this.rect.setTo(rectStart,game.curWaypoint.position.y + 16,DRAG_WIDTH,13);
    if(this.alarmSprite.input.isDragged === false){
      this.alarmSprite.position.x = game.curWaypoint.position.x - 16 + (game.curWaypoint.duration / 50);
      this.alarmSprite.position.y = game.curWaypoint.position.y + 16;
    }
  } else {
    this.alarmSprite.visible = false;
  }
}