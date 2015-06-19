var WaypointMenu = function() {
  this.alarmSprite = game.add.sprite(0,0, 'alarm');
  this.alarmSprite.anchor.x = 0.5;
  this.alarmSprite.anchor.y = 0.5;
  this.alarmSprite.scale.set(0.4,0.4);
  this.alarmSprite.visible = false;
}