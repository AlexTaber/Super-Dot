var Guard = function(x,y,elevation,title,points) {
  this.position = new Phaser.Point(x,y);
  this.elevation = elevation;
  this.title = title;
  this.setAttributesByTitle(title);
  this.speed = 2;
  this.patrolIndex = 0;
  this.points = [];
  this.timeline = new Timeline(this);
  this.setUpPatrol(points);
  this.startPatrolTween();
  this.direction = 0;
}

Guard.prototype.setAttributesByTitle = function(title) {
  if(title == "basic") {
    this.canSeeUp = false;
    this.color = 0xFF0000;
  }
}

Guard.prototype.pause = function(time) {
  this.tween.pause();
  game.time.events.add(Phaser.Timer.SECOND * time, this.tween.resume, this.tween);
}

Guard.prototype.startPatrolTween = function() {
  if(this.patrolIndex == 0) {
    this.timelineIndex = 0;
    this.timeline.eventsIndex = 0;
  }
  this.tween=game.add.tween(this.position);
  this.patrolIndex = (this.patrolIndex + 1) % this.points.length;
  var distance = this.position.distance(this.points[this.patrolIndex])

  this.tween.to({x: this.points[this.patrolIndex].x, y: this.points[this.patrolIndex].y}, (distance/this.speed) * 60, Phaser.Easing.Linear.None, true);
  this.direction = Phaser.Math.radToDeg(Phaser.Point.angle(this.position,this.points[this.patrolIndex]));
  console.log(this.direction);
  this.tween.onComplete.add(this.startPatrolTween, this);
  //p.start();

}

Guard.prototype.setUpPatrol = function(points) {
  for(var i = 0; i < points.length; i++) {
    var newPoint = new Phaser.Point(points[i][0], points[i][1]);
    this.points.push(newPoint);
  }
}
