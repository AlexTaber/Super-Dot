var Timeline = function(guard) {
  this.guard = guard
  this.events = [];
  this.eventsIndex = 0;
}

Timeline.prototype.checkForEvent = function() {
  if(this.eventsIndex < this.events.length) {
    if(this.events[this.eventsIndex].timelineIndex == this.guard.timelineIndex) {
      var myEvent = this.events[this.eventsIndex].action.bind(this.guard);
      myEvent(this.events[this.eventsIndex].duration);
      this.eventsIndex += 1;
    }
  }
}

Timeline.prototype.resetTimeline = function() {
  this.eventsIndex = 0;
}