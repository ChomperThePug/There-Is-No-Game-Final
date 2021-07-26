//Speech State
var speechState = 0;
//Speech Count
var speechCount = 0;
//Delay Count
var delayCount = 0;
//Images
var backgroundImage;
//Game State
var gameState = 0;
//The Ground
var ground;
//Portrait
var frame, frameImg;
var bug, bugImg;
var bugState = 0;
//Edges
var edges;
//Credits
var CdelayCount = 0;
var creditState = 0;
var creditCount = 0;

function preload() {
  //Images
  //Background
  backgroundImage = loadImage("Assets/background.png");
  //Portrait
  frameImg = loadImage("Assets/frame.png");
  bugImg = loadImage("Assets/bug.png");
}

function setup() {
  createCanvas(1200, 700);
  //The Ground
  ground = createSprite(width / 2, height, width, 50);
  ground.shapeColor = 'black';
  //Portrait
  //Frame
  frame = createSprite(width - 200, 500);
  frame.addImage(frameImg);
  frame.scale = 0.35;
  //Bug
  bug = createSprite(width / 2, height - 100, 100, 100);
  bug.addImage(bugImg);
  bug.scale = 1.5;
}

function draw() {
  background(backgroundImage);
  drawSprites();
  edges = createEdgeSprites();
  //Collisions
  bug.collide(edges);
  //Game State
  if (gameState === 0) {
    //Speech
    speech(0, 1, "Your Prize Is This Portrait Which I Downloaded From The Internet", 150, 20);
    speech(1, 2, "I Hope No Viruses Come With It", 100, 20);
    speech(2, 3, "(Glitching) HeLp.. SomTHinG iS WrONg", 100, 20);
    speech(4, 5, "The.. Glitch Has Gone Now",100, 20);
    speech(5, 6, "Wow.. There Was Literally A Bug In My Code And You DeBugged It", 130, 20);
    speech(6, 7, "Thank You For Saving Me", 60, 20);
    speech(7, 8, "But... Technically It's Your Fault For Cheating In The Rock Paper Scissors Game", 170, 20);
    speech(8, 9, "So..", 60, 20);
    speech(9, 10, "You Can Leave Now", 60, 20);
    speech(10, 11, "You Know What! You Won The Gam.. I Mean Non-Game", 90, 20);
    speech(11, 12, "And Remember", 50, 20);
    speech(12, 13, "DON'T", 60, 30);
    speech(13, 14, "COME", 60, 30);
    speech(14, 15, "BACK!!", 60, 30);
    //Gravity
    gravity(frame);
    //Bug
    if (speechState <= 1) {
      bug.x = frame.x;
      bug.y = frame.y;
    } else {
      gravity(bug);
      bug.bounceOff(edges);
      bug.collide(frame);
      if (bug.y > height) {
        bug.y = height-100;
      }
      if (bug.x < 0) {
        bug.x = 20;
      }
      if (bug.x > width) {
        bug.x = width - 20;
      }
      if (frameCount % 50 === 0) {
        bug.velocityX = random(-100, 100);
      }
      //Squash Bug
      if (frame.velocityY > 20 && bug.isTouching(frame)) {
        bug.destroy();
        speechState = 4;
        console.log("destroy");
      }
      if (speechState == 15) {
        gameState = 2;
      }
    }

  }else if (gameState === 2) {
    background(0, 0, 0);
    frame.visible = false;
    credit(0,"Not A Game By Krishanth",130,15);
    credit(1,"Not Made In Javascript",130,15);
    credit(2,"Thanks For Not Playing A Game",100,15);
    credit(3,"I Hope You Didn't Like It",100,15);
    credit(4,"Now You Can Go And Play An Actual Game",100,15);
    credit(5,"The End (For Now)",Infinity,15);
  }
}

//Speech Function
function speech(state, newState, message, timer, delay) {
  if (speechState === state) {
    delayCount++;
    if (speechCount < timer + 1 && delayCount > delay) {
      textAlign(CENTER);
      textSize(30);
      fill('white');
      stroke('black');
      text(message, width / 2, 100);
      speechCount++;
    }
    if (speechCount === timer) {
      speechState = newState;
      speechCount = 0;
      delayCount = 0;
    }
  }
}

//Gravity Function
function gravity(object) {
  if (object.isTouching(ground)) {
    object.velocityY = 0;
  } else {
    object.velocityY += 0.8;
  }
  if (mousePressedOver(object)) {
    object.x = mouseX;
    object.y = mouseY;
  }
  object.collide(edges);
}

//Credits
function credit(state, message, timer, delay) {
  if (creditState === state) {
    creditCount++;
    CdelayCount++;
    if (creditCount < timer + 1 && CdelayCount > delay) {
      textAlign(CENTER);
      textSize(35);
      fill('white');
      text(message, width / 2, height/2);
    }
    if (creditCount === timer) {
      creditState = (state + 1);
      creditCount = 0;
      CdelayCount = 0;
    }
  }
}