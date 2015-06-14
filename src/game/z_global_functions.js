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
      //areas
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
      //guards
      [
        new Guard(50,50,1,"basic", Guard.prototype.patrol,[[50,50],[300,50],[300,190]])
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