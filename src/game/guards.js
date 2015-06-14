var Guard = function(x,y,elevation,title,action,points) {
  this.position = new Phaser.Point(x,y);
  this.elevation = elevation;
  this.title = title;
  this.setAttributesByTitle(title);
  this.action = action;
  this.speed = 2;
  this.patrolIndex = 0;
  this.points = [];
  this.setUpPatrol(points);
  this.startPatrolTween();
}

Guard.prototype.setAttributesByTitle = function(title) {
  if(title == "basic") {
    this.canSeeUp = false;
    this.color = 0xFF0000;
  }
}

Guard.prototype.patrol = function(points) {
  // if(this.tween.isRunning == false) {
  //   this.patrolIndex = (this.patrolIndex + 1) % this.points.length;
  //   console.log(this.patrolIndex)
  //   this.tween.to({x: this.points[this.patrolIndex].x, y: this.points[this.patrolIndex].y}, 2000, Phaser.Easing.Linear.None, true);
  // }
}

Guard.prototype.startPatrolTween = function() {

  var p=game.add.tween(this.position);
  this.patrolIndex = (this.patrolIndex + 1) % this.points.length;
  var distance = this.position.distance(this.points[this.patrolIndex])

  p.to({x: this.points[this.patrolIndex].x, y: this.points[this.patrolIndex].y}, (distance/this.speed) * 60, Phaser.Easing.Linear.None, true);
  p.onComplete.add(this.startPatrolTween, this);
  //p.start();

}

Guard.prototype.setUpPatrol = function(points) {
  for(var i = 0; i < points.length; i++) {
    var newPoint = new Phaser.Point(points[i][0], points[i][1]);
    this.points.push(newPoint);
  }
}
