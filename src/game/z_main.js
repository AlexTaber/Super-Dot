/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var state = {
    init: function() {
        // Delete this init block or replace with your own logic.

        // Create simple text display for current Phaser version
        // var text = "Phaser Version "+Phaser.VERSION + " works!";
        // var style = { font: "24px Arial", fill: "#fff", align: "center" };
        // var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        // t.anchor.setTo(0.5, 0.5);
        game.stage.backgroundColor = '#fff';
        game.graphics = game.add.graphics(0,0);
        game.clicked = false;
        game.timelineIndex = 0;
        game.timelineRunning = true;

    },
    preload: function() {
        // STate preload logic goes here
        setUpLevels();
    },
    create: function(){
      // State create logic goes here
      game.areas = [];
      game.areas.push(new Area(50,100,AREA_COLORS[1]));

      level = new Level();
    },
    update: function() {
      //click event
      if (clickEvent()){
        click();
      }
      //update timeline
      if(game.timelineRunning) {
        game.timelineIndex += 1;
      }

      level.update();
    },

    render: function() {
      game.graphics.clear();
      //areas
      level.draw();
    }
};

var game = new Phaser.Game(
    320,
    480,
    Phaser.AUTO,
    'game',
    state
);

function click() {

}