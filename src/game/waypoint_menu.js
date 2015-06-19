var WaypointMenu = function() {
  this.alarmSprite = game.add.sprite(0,0, 'alarm');
  this.alarmSprite.anchor.x = 0.5;
  this.alarmSprite.anchor.y = 0.5;
  this.alarmSprite.scale.set(0.4,0.4);
  this.alarmSprite.visible = false;
  this.alarmSprite.inputEnabled = true;
  this.alarmSprite.input.enableDrag();
  this.rect = new Phaser.Rectangle(0,0,DRAG_WIDTH,1);
  this.alarmSprite.input.boundsRect = this.rect;
  this.alarmSprite.events.onDragStop.add(this.dragStop, this);
}

WaypointMenu.prototype.dragStop = function() {
  var rootPosX = game.curWaypoint.position.x - 16;
  var sPosX = this.alarmSprite.position.x;
  //this.alarmSprite.position.x = Math.min(Math.max(mPos.x, rootPosX),rootPosX + 100);
  game.curWaypoint.duration = rootPosX + ((sPosX - rootPosX) * 50);
}