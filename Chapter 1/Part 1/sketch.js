
//Button
var Button, ButtonI;
//Edges
var edges;
//Count
var count = 10;
//Text State
var textState = 0;
//Game State
var gameState = 0;
//Background
var Background;
//Speech State
var speechState = 0;
//Speech Count
var speechCount = 0;
//Delay Count
var delayCount = 0;

function preload() {
  Background = loadImage("Assets/Background.jfif");
  ButtonI = loadImage("Assets/Board.png");
}

function setup() {
  createCanvas(700, 700);
  edges = createEdgeSprites();
  Button = createSprite(350, 350, 200, 50);
}

function draw() {
  background(Background);
  fill('white');
  stroke('black');
  rect(-10, -5, width+20, 50);
  Button.collide(edges);
  Button.addImage(ButtonI);
  ButtonI.resize(210,100);
  //Game State 0
  if (gameState === 0) {
    Button.shapeColor = "white";
    if (textState === 1) {
      let a = 0;
      a += 2 ;
      if(frameCount % count === 0){
        count = Math.round(random(20,30));
        var buttonPosX = Math.round(random(0,700));
        var buttonPosY = Math.round(random(0,700));
        Button.x = buttonPosX;
        Button.y = buttonPosY;
      }
      if (mousePressedOver(Button) && a !== 0) {
        gameState = 1;
        Button.destroy();
      }
    }
    if (mousePressedOver(Button)) {
      textState = 1
       Button.x = Math.round(random(0,700));
       Button.y = Math.round(random(0,700));
    }
  }else if //Game State 1
  (gameState === 1) {
    //Speech
    speech(0,"Hello There", 40,10);
    speech(1,"This Is The Game Speaking", 80,10);
    speech(2,"Well, There Is Some Bad News", 80,10);
    speech(3,"There Is Actually No Game Here", 85,10);
    speech(4,"Don't Feel Sad, You Can Always Play Other Games", 105,10);
    speech(5,"Now You Can Leave", 65,10);
    speech(6,"Why Have You Not Left Yet?", 95,55);
    speech(7,"(Whispering) Your Conscience Wants You To Leave Immediately", 135,65);
    speech(8,"Ok, I See That You Don't Want To Leave This Game.. I Mean Non Game", 165,65);
    speech(9,"Ok Then If You Want To Play A Game", 165,20);
    speech(10,"Here It Is", 165,30);
    speech(11,"(End Of Part 1)", Infinity,30);
  }

 // console.log(gameState)
  drawSprites();
  if (gameState === 0) {
    textAlign(CENTER);
    textSize(20);
    fill("Black");
    text("Do Not Press To Start", Button.x,Button.y + 8);
  }
}

//Speech Function
function speech(state,message,timer, delay) { 
  if (speechState === state) {
    speechCount++;
    delayCount++;
    if (speechCount < timer + 1 && delayCount > delay) {
      textAlign(CENTER);
      textSize(20);
      fill('black');
      text(message, width/2, 30);
    }
    if (speechCount === timer) {
      speechState = (state + 1) ;
      speechCount = 0;
      delayCount = 0;
    }
    console.log(delayCount);
  }
}