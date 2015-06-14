WIDTH = 320;
HEIGHT = 480;

AREA_COLORS = [
  0xe5e5e5,
  0x999999,
  0x4c4c4c,
  0x000000
]

function setUpLevels() {
  LEVEL_TEMPLATE = [
    //level 0
    [
      //area(x,y,width,height,elevation)
      [
        new Area(0,0,WIDTH,100,3),
        new Area(WIDTH * 0.2,100,WIDTH * 0.4,50,1),
        new Area(WIDTH * 0.6,100,WIDTH * 0.2,50,1),
        new Area(WIDTH * 0.4,100,WIDTH * 0.2,50,3),
        new Area(0,100, WIDTH * 0.2, 50, 2),
        new Area(WIDTH * 0.8,100, WIDTH * 0.2, 50, 2),
        new Area(0, 300, WIDTH * 0.2, 40, 3),
        new Area(0, 340, WIDTH * 0.2, 40, 2),
        new Area(0, 380, WIDTH * 0.2, 40, 1),
        new Area(WIDTH * 0.4, 300, WIDTH * 0.4, 120, 3)
      ],
      //guards(x,y,elevation,title,patrolPoints)
      [
        new Guard(100,265,0,"basic",[[100,265],[280,265],[280,440],[100,440]]),
        new Guard(WIDTH * 0.3,125,1,"basic",[[WIDTH * 0.3,125]]),
        new Guard(WIDTH * 0.7,125,1,"basic",[[WIDTH * 0.7,125]])
      ],
      //events
      [
        { guardIndex: 0, action: Guard.prototype.pause, timelineIndex: 1, duration: 2 }
      ]
    ]
  ]
}


function clickEvent() {
  if(game.input.activePointer.isDown) {
    if(game.clicked) {
      return false;
    } else {
      game.clicked = true;
      return true;
    }
  } else {
    if(game.clicked) {
      game.clicked = false;
    }
    return false;
  }
}

function findPointFromAngle(startingPoint, distance, angle) {
  if(angle == 180) angle = 0;
  else if(angle == 0) angle = 180;
  else if(angle == -90) angle = 270;
  console.log("angle = " + angle);
  new_x = startingPoint.x + Math.cos(Phaser.Math.degToRad(angle)) * distance;
  new_y = startingPoint.y - Math.sin(Phaser.Math.degToRad(angle)) * distance;
  return [new_x, new_y];
}