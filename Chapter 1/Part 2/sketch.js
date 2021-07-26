var block1, block2, block3, block4, block5;
var Pblock, PblockI;
var Invisiblock1, Invisiblock2, Invisiblock3, Invisiblock4;
var border1, border2, border3, border4;
var trophy, trophyI;
var speed = 10;
var timer = 0;
var Message = "";
//Game State Values
var START = 0;
var FOOL = 1;
var REALIZE = 2;
var MOVE = 3;
var WIN = 4;
var gameState = START;
//Trophy State Values
var DEFAULT = 0;
var HELD = 1;
var trophyState = DEFAULT;
var Background;
//Speech State
var speechState = 11;
//Speech Count
var speechCount = 0;
//Delay Count
var delayCount = 0;

function preload() {
  trophyI = loadImage("Assets/trophy.png");
  Background = loadImage("Assets/Back.jfif");
  PblockI = loadImage("Assets/Runner.png");
}

function setup() {
  createCanvas(700, 700);
  //Maze Blocks
  block1 = createSprite(240, 200, 300, 30);
  block1.shapeColor = "#7d5d20";
  block2 = createSprite(460, 358, 30, 350);
  block2.shapeColor = "#7d5d20";
  block3 = createSprite(80, 335, 30, 300);
  block3.shapeColor = "#7d5d20";
  block4 = createSprite(215, 480, 300, 30);
  block4.shapeColor = "#7d5d20";
  block5 = createSprite(320, 335, 250, 30);
  block5.shapeColor = "#7d5d20";
  //Player Block
  Pblock = createSprite(417.5, 200, 35, 35);
  Pblock.shapeColor = "red";
  //Invisiblock
  Invisiblock1 = createSprite(350, 400, 30, 150);
  Invisiblock1.visible = false;
  Invisiblock1.shapeColor = "#7d5d20";
  Invisiblock2 = createSprite(400, 170, 150, 30);
  Invisiblock2.visible = false;
  Invisiblock3 = createSprite(630, 370, 340, 30);
  Invisiblock3.visible = false;
  Invisiblock4 = createSprite(30, 370, 70, 30);
  Invisiblock4.visible = false;
  //Trophy
  trophy = createSprite(405, 500, 30, 30)
  trophy.addImage(trophyI);
  trophy.scale = 0.5;
  //Borders
  border1 = createSprite(width / 2, height, width, 20);
  border2 = createSprite(width / 2, 0, width, 20);
  border3 = createSprite(0, height / 2, 20, height);
  border4 = createSprite(width, height / 2, 20, height);
  //Border Visibility
  border1.visible = false;
  border2.visible = false;
  border3.visible = false;
  border4.visible = false;
}

function draw() {
  background(Background);
  fill('white');
  stroke('black');
  rect(-10, -5, width + 20, 50);
  //Pblock
  Pblock.scale = 0.5;
  Pblock.addImage(PblockI);
  //Collisions
  Pblock.collide(border1);
  Pblock.collide(border2);
  Pblock.collide(border3);
  Pblock.collide(border4);
  Pblock.collide(block1);
  Pblock.collide(block2);
  Pblock.collide(block3);
  Pblock.collide(block4);
  Pblock.collide(block5);
  Pblock.collide(Invisiblock1);
  trophy.collide(block1);
  trophy.collide(block2);
  trophy.collide(block3);
  trophy.collide(block4);
  trophy.collide(block5);
  trophy.collide(Invisiblock1);
  //Movement
  if (gameState != WIN) {
    if (keyDown("Up")) {
      Pblock.velocityY = -speed;
    } else if (keyDown("Down")) {
      Pblock.velocityY = speed;
    } else {
      Pblock.velocityY = 0;
    }
    if (keyDown("Right")) {
      Pblock.velocityX = speed
    } else if (keyDown("Left")) {
      Pblock.velocityX = -speed
    } else {
      Pblock.velocityX = 0;
    }
  }
  //Speech
  textSize(50);
  textAlign(CENTER);
  text(Message, 350, 100);
  //Game States
  if (gameState == START) {
    Pblock.collide(Invisiblock2);
    speech(11, "If You Solve This, You Win The Game", 80, 0);
    //Invisiblock1 Activation
    if (intersect(Pblock, Invisiblock1)) {
      gameState = FOOL
      speechState = 12;
    }
  } else if (gameState == FOOL) {
    speech(12, "Ha! I Have Rigged The Maze", 80, 0);
    Invisiblock1.visible = true;
    if (intersect(Pblock, Invisiblock2)) {
      gameState = REALIZE
      speechState = 13;
    }

  } else if (gameState == REALIZE) {
    speech(13, "Oh.. I Forgot To Set The Boundaries", 85, 0);
    if (intersect(Pblock, Invisiblock3) || intersect(Pblock, Invisiblock4)) {
      gameState = MOVE
      speechState = 14;
    }
  } else if (gameState == MOVE) {
    speech(14, "Ok, I Have No Choice", 85, 0);
    //Trophy State
    if (mousePressedOver(trophy)) {
      trophyState = HELD;
      speechState = 15;
    } else {
      trophyState = DEFAULT;
    }
    //Proximity
    if (proximity(Pblock, trophy, 50) && trophyState == DEFAULT) {
      trophy.x = Math.round(random(100, 600))
      trophy.y = Math.round(random(100, 600))
    }
    //Holding The Trophy
    if (trophyState == HELD) {
      trophy.x = mouseX;
      trophy.y = mouseY;
      gameState = "HELD"
    }
  } else if (gameState == "HELD") {
    speech(15, "How Did You Do That!", 85, 0);
    //Trophy State
    if (mousePressedOver(trophy)) {
      trophyState = HELD;
      speechState = 15;
    } else {
      trophyState = DEFAULT;
    }
    //Holding The Trophy
    if (trophyState == HELD) {
      trophy.x = mouseX;
      trophy.y = mouseY;
      gameState = "HELD"
    }
    //Winning
    if ((proximity(Pblock, trophy, -35) && trophyState == HELD)) {
      gameState = WIN;
      speechState = 16;
    }
  } else if (gameState = WIN) {
    Message = "You Win";
    speech(16,"That's Not Fair", 75, 0);
    speech(17,"(End Of Part 2)", Infinity, 0);
  }
  drawSprites();
}


//Speech Function
function speech(state, message, timer, delay) {
  if (speechState === state) {
    speechCount++;
    delayCount++;
    if (speechCount < timer + 1 && delayCount > delay) {
      textAlign(CENTER);
      textSize(20);
      fill('black');
      text(message, width / 2, 30);
    }
    if (speechCount === timer) {
      speechState = (state + 1);
      speechCount = 0;
      delayCount = 0;
    }
  }
}