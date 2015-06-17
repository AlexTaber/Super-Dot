WIDTH = 320;
HEIGHT = 480;

MENU_WIDTH = 64;
MENU_HEIGHT = 128;
MENU_X = 32;
MENU_Y = -32

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
        new Area(0,150,WIDTH,150,0),
        new Area(WIDTH * 0.2,300,WIDTH*0.2,120,0),
        new Area(WIDTH * 0.8,300,WIDTH*0.2,120,0),
        new Area(0,420,WIDTH,480,0),
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
      //guards(x,y,elevation,title,patrolPoints,direction)
      [
        new Guard(100,265,0,"basic",[[100,265],[280,265],[280,440],[100,440]],0),
        new Guard(WIDTH * 0.3,125,1,"basic",[[WIDTH * 0.3,125]],-90),
        new Guard(WIDTH * 0.7,125,1,"basic",[[WIDTH * 0.7,125]],-90)
      ],
      //events
      [
        { guardIndex: 0, action: Guard.prototype.pause, timelineIndex: 1, duration: 2 }
      ],
      //player(x,y,actionPoints, elevation,speed)
      new Player(160,440,10,0,3)
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
  angle = 180 - angle;
  new_x = startingPoint.x + Math.cos(Phaser.Math.degToRad(angle)) * distance;
  new_y = startingPoint.y - Math.sin(Phaser.Math.degToRad(angle)) * distance;
  return { x: new_x, y: new_y };
}

Array.prototype.last = function() {
  return this[this.length - 1]
}

function pointInBox(x,y,x1,y1,x2,y2) {
  if(x > x1 && x < x2) {
    if(y > y1 && y < y2) {
      return true;
    }
  }
  return false;
}