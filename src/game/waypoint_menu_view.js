WaypointMenu.prototype.draw = function() {
  if(game.curWaypoint){
    this.alarmSprite.visible = true;
    this.alarmSprite.position.x = game.curWaypoint.position.x - 16 + (game.curWaypoint.duration / 50);
    this.alarmSprite.position.y = game.curWaypoint.position.y + 16;
    this.alarmSprite.inputEnabled = true;

    if(this.alarmSprite.input.checkPointerDown(game.input.activePointer, true)){
      var rootPosX = game.curWaypoint.position.x - 16;
      var oriPosX = this.alarmSprite.position.x;
      var mPos = game.input.activePointer.position;
      this.alarmSprite.position.x = Math.min(Math.max(mPos.x, rootPosX),rootPosX + 100);
      game.curWaypoint.duration += (this.alarmSprite.position.x - oriPosX) * 50;
    }
  } else {
    this.alarmSprite.visible = false;
  }
}