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
//Button
var YesBtn;
var NoBtn;
var Btn1;
//The Ground
var ground;
//Mute Icon
var mute, muteI, unmuteI;
//Thud
var Thud;

function preload() {
  //Images
  backgroundImage = loadImage("Assets/background.png");
  muteI = loadImage("Assets/mute.png");
  unmuteI = loadImage("Assets/unmute.png");
  //Sound
  Thud = loadSound("Assets/Thud.wav");
}

function setup() {
  createCanvas(1200, 700);
  //The Ground
  ground = createSprite(width / 2, height, width, 50);
  ground.shapeColor = 'black';
  //Mute Icon
  mute = createSprite(600, -50);
  mute.addImage('unmute', unmuteI);
  mute.addImage('mute', muteI);
  mute.scale = 0.2;
  //Buttons
  //Yes Button
  YesBtn = createSprite(400, height / 2, 200, 100);
  YesBtn.shapeColor = '#00FF00';
  YesBtn.visible = false;
  //No Button
  NoBtn = createSprite(width - 400, height / 2, 200, 100);
  NoBtn.shapeColor = '#FF0000';
  NoBtn.visible = false;
  //Button 1
  Btn1 = createSprite(width / 2, height / 2, 200, 100);
  Btn1.shapeColor = 'brown';
  Btn1.visible = false;
}

function draw() {
  background(backgroundImage);
  drawSprites();

  //Collisions
  mute.collide(ground);

  if (gameState === 0) {
    //Speech
    speech(0, 1, "Wait.. Why Have You Come Back?", 100, 10);
    speech(1, 2, "Ok I Give Up, I Am Leaving... Forever!", 80, 10);
    speech(2, 3, "Farewell..", 80, 50);
    speech(3, 4, "(Game Left The Non-Game)", 100, 20);
    speech(4, 5, "Ok, I See That Trick Never Works", 75, 200);
    speech(5, 6, "What Are You Going To Do Here Anyways?", 75, 20);
    speech(6, 6, "Wait.. You Just Want To Annoy Me Right?", 100, 0);
    speech(7, 7, "Oh Really? What Could Be The Reason Then?", 100, 0);
    speech(8, 9, "Ha! I Knew It", 80, 20);
    speech(9, 10, "Well.. There Is Nothing Here For You To Annoy Me With", 150, 30);
    speech(10, 11, "(☉_☉)....Don't Touch That. It's Just A Button That Does Nothing", 155, 80);
    speech(12, 13, "(Struggling) mmm..mmm...mmm", 80, 0);
    speech(13, 14, "I.. Couldn't.. Breath", 50, 20);
    speech(14, 15, "Don't Do That Again!", 50, 20);
    speech(16, 17, "(Struggling) mmmmm....mmm...mmmm", 90, 0);
    speech(17, 18, "STOP!!!!", 60, 10);
    speech(18, 19, "I've Had Enough Of This", 60, 20);
    speech(20, 21, "Good Riddance!", 60, 80);
    speech(21, 21, "(End Of Part 1)", Infinity, 20);
    //Mute Icon Falling
    if (speechState == 10) {
      mute.velocityY = 10;
    }
    //Muting & Unmuting
    //Mute 1
    if (mousePressedOver(mute) && speechState === 11) {
      mute.changeImage('mute');
      speechState = 12;
    }
    //Unmute 1
    if (speechState === 13) {
      mute.changeImage('unmute');
    }
    //Mute 2
    if (mousePressedOver(mute) && speechState === 15) {
      mute.changeImage('mute');
      speechState = 16;
    }
    //Unmute 2
    if (speechState === 17) {
      mute.changeImage('unmute');
    }
    //Mic Throw
    if (speechState === 19) {
      mute.velocityY = -10;
      mute.velocityX = 10;
      Thud.play();
      speechState = 20;
    }
    //Choice 1
    if (speechState === 6) {
      YesBtn.visible = true;
      NoBtn.visible = true;
      textAlign(CENTER);
      textSize(30);
      fill('black');
      stroke('black');
      text("Yes", YesBtn.x, height / 2);
      text("No", NoBtn.x, height / 2);
      if (mousePressedOver(YesBtn)) {
        speechState = 8;
        YesBtn.visible = false;
        NoBtn.visible = false;
        speechCount = 0;
      } else if (mousePressedOver(NoBtn)) {
        speechState = 7;
        YesBtn.visible = false;
        NoBtn.visible = false;
        speechCount = 0;
      }
    }
    //Choice 2
    if (speechState === 7) {
      Btn1.visible = true;
      textAlign(CENTER);
      textSize(18);
      fill('black');
      stroke('black');
      text("I Wanted To Annoy You", Btn1.x, height / 2);
      if (mousePressedOver(Btn1)) {
        speechState = 8;
        Btn1.visible = false;
        speechCount = 0;
      }
    }
    console.log(speechCount);
  }
}

//Speech Function
function speech(state, newState, message, timer, delay) {
  if (speechState === state) {
    delayCount++;
    if (speechCount < timer + 1 && delayCount > delay) {
      textAlign(CENTER);
      textSize(40);
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