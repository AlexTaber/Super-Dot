var Guard = function(x,y,elevation,title,points) {
  this.position = new Phaser.Point(x,y);
  this.elevation = elevation;
  this.title = title;
  this.setAttributesByTitle(title);
  this.speed = 2;
  this.patrolIndex = 0;
  this.points = [];
  this.setUpPatrol(points);
  this.startPatrolTween();
  this.timeline = new Timeline(this);
}

Guard.prototype.setAttributesByTitle = function(title) {
  if(title == "basic") {
    this.canSeeUp = false;
    this.color = 0xFF0000;
  }
}

Guard.prototype.pause = function() {
  console.log(this);
  this.tween.pause();
  game.time.events.add(Phaser.Timer.SECOND * 5, this.tween.resume, this.tween);
}

Guard.prototype.startPatrolTween = function() {

  this.tween=game.add.tween(this.position);
  this.patrolIndex = (this.patrolIndex + 1) % this.points.length;
  var distance = this.position.distance(this.points[this.patrolIndex])

  this.tween.to({x: this.points[this.patrolIndex].x, y: this.points[this.patrolIndex].y}, (distance/this.speed) * 60, Phaser.Easing.Linear.None, true);
  this.tween.onComplete.add(this.startPatrolTween, this);
  //p.start();

}

Guard.prototype.setUpPatrol = function(points) {
  for(var i = 0; i < points.length; i++) {
    var newPoint = new Phaser.Point(points[i][0], points[i][1]);
    this.points.push(newPoint);
  }
}
