WIDTH = 320;
HEIGHT = 480;

AREA_COLORS = [
  0xe5e5e5,
  0x999999,
  0x4c4c4c,
  0x000000
]

LEVEL_TEMPLATE = [
  [new Area(0,0,WIDTH,100,2),
  new Area(0,100,WIDTH * 0.4,50,1),
  new Area(WIDTH * 0.6,100,WIDTH * 0.4,50,1),
  new Area(WIDTH * 0.4,100,WIDTH * 0.2,50,3)
  ]
]


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