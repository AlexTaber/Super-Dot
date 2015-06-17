var Guard = function(x,y,elevation,title,points,direction) {
  this.startX = x;
  this.startY = y;
  this.position = new Phaser.Point(x,y);
  this.elevation = elevation;
  this.title = title;
  this.setAttributesByTitle(title);
  this.speed = 2;
  this.patrolIndex = 0;
  this.points = [];
  this.startDirection = direction;
  this.direction = direction;
  this.timeline = new Timeline(this);
  this.setUpPatrol(points);
  //this.startPatrolTween();
}

Guard.prototype.setAttributesByTitle = function(title) {
  if(title == "basic") {
    this.canSeeUp = false;
    this.color = 0xFF0000;
  }
}

Guard.prototype.canSeePlayer = function() {
  if(this.position.distance(level.player.position) < 300){
    var angle = Phaser.Math.radToDeg(level.player.position.angle(this.position));
    if(angle > this.direction - 30 && angle < this.direction + 30) {
      return true;
    }
  }
  return false;
}

Guard.prototype.pause = function(time) {
  this.tween.pause();
  this.direction = -90;
  game.time.events.add(Phaser.Timer.SECOND * time, this.unPause, this);
}

Guard.prototype.unPause = function() {
  this.tween.resume();
  this.direction = Phaser.Math.radToDeg(Phaser.Point.angle(this.position,this.points[this.patrolIndex]));
}

Guard.prototype.startPatrolTween = function() {
  if(this.patrolIndex == 0) {
    this.timelineIndex = 0;
    this.timeline.eventsIndex = 0;
  }
  if (this.points.length > 1) {
    this.tween=game.add.tween(this.position);
    this.patrolIndex = (this.patrolIndex + 1) % this.points.length;
    var distance = this.position.distance(this.points[this.patrolIndex])

    this.tween.to({x: this.points[this.patrolIndex].x, y: this.points[this.patrolIndex].y}, (distance/this.speed) * 60, Phaser.Easing.Linear.None, true);
    this.direction = Phaser.Math.radToDeg(Phaser.Point.angle(this.position,this.points[this.patrolIndex]));
    this.tween.onComplete.add(this.startPatrolTween, this);
  }
  //p.start();

}

Guard.prototype.setUpPatrol = function(points) {
  for(var i = 0; i < points.length; i++) {
    var newPoint = new Phaser.Point(points[i][0], points[i][1]);
    this.points.push(newPoint);
  }
}

Guard.prototype.resetGuard = function() {
  this.position.x = this.startX;
  this.position.y = this.startY;
  this.patrolIndex = 0;
  this.direction = this.startDirection;
  if(this.tween) this.tween.stop();
  this.timeline.resetTimeline();
}