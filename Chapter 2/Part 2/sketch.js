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
//Rock Paper Scissors Game
//Items
var playerRock, rockImg;
var playerPaper, paperImg;
var playerScissor, scissorImg;
var gameChoice;
var playerChoice;
var scissorState;
//Cards
var rockCard, paperCard, scissorCard;
var gameCard;
var cardImg;
var shreddedCardImg;

function preload() {
  //Images
  //Background
  backgroundImage = loadImage("Assets/background.png");
  //Rock Paper Scissors
  //Rock
  rockImg = loadImage("Assets/rock.png");
  //Paper
  paperImg = loadImage("Assets/paper.png");
  //Scissor
  scissorImg = loadImage("Assets/scissor.png");
  //Card
  cardImg = loadImage("Assets/card.png");
  //Shredded Card
  shreddedCardImg = loadImage("Assets/shred.png");
}

function setup() {
  createCanvas(1200, 700);
  //The Ground
  ground = createSprite(width / 2, height, width, 50);
  ground.shapeColor = 'black';


  //Rock Paper Scissors Game

  //Cards
  //Rock Card
  rockCard = createSprite(100, 550);
  rockCard.addImage(cardImg);
  rockCard.visible = false;
  //Paper Card
  paperCard = createSprite(250, 550);
  paperCard.addImage(cardImg);
  paperCard.visible = false;
  //Scissor Card
  scissorCard = createSprite(400, 550);
  scissorCard.addImage(cardImg);
  scissorCard.visible = false;
  //Game Card
  gameCard = createSprite(1100, 550);
  gameCard.addImage(cardImg);
  gameCard.addImage('shredded', shreddedCardImg);
  gameCard.visible = false;

  //Items
  //Rock
  playerRock = createSprite(rockCard.x, rockCard.y);
  playerRock.addImage(rockImg);
  playerRock.visible = false;
  //Paper
  playerPaper = createSprite(paperCard.x, paperCard.y);
  playerPaper.addImage(paperImg);
  playerPaper.visible = false;
  //Scissor
  playerScissor = createSprite(scissorCard.x, scissorCard.y);
  playerScissor.addImage(scissorImg);
  playerScissor.visible = false;
  //Game Choice
  gameChoice = createSprite(gameCard.x, gameCard.y);
  gameChoice.addImage('rock', rockImg);
  gameChoice.addImage('paper', paperImg);
  gameChoice.addImage('scissor', scissorImg);
  gameChoice.visible = false;
}

function draw() {
  background(backgroundImage);
  drawSprites();

  if (gameState === 0) {
    //Speech
    speech(0, 1, "If You Want To Play A Game, Let's Play Rock Paper Scissors", 100, 10);
    speech(1, 2, "If You Win Once, I Will Give You A Prize", 100, 10);
    speech(2, 3, "Choose A Card", 60, 10);
    speech(4, 5, "What Are You Doing!", 60, 0);
    //Rock Paper Scissors
    if (speechState >= 2) {
      //Text
      textAlign(CENTER);
      textSize(25);
      fill('white');
      text("Player Choice", 250, 400);
      text("Game's Choice", gameCard.x, 400);
      if (playerChoice != undefined) {
        textAlign(CENTER);
        textSize(60);
        fill('white');
        text("Game Wins", width / 2, 250);
        gameChoice.visible = true;
      }
      //Visibility
      rockCard.visible = true;
      paperCard.visible = true;
      scissorCard.visible = true;
      gameCard.visible = true;
      playerRock.visible = true;
      playerPaper.visible = true;
      playerScissor.visible = true;
      //Game Choice
      if (playerChoice == "rock") {
        gameChoice.visible = true;
        gameChoice.changeImage('paper');
      } else if (playerChoice == "paper") {
        gameChoice.visible = true;
        gameChoice.changeImage('scissor');
      } else if (playerChoice == "scissor") {
        gameChoice.visible = true;
        gameChoice.changeImage('rock');
      }
      //Player Choice
      if (mousePressedOver(rockCard)) {
        rockCard.y = 530;
        playerRock.y = 530;
        playerChoice = "rock";
        paperCard.y = 550;
        playerPaper.y = 550;
        if (scissorState == "DEFAULT") {
        playerScissor.y = 550;  
        }        
        scissorCard.y = 550;
      } else if (mousePressedOver(paperCard)) {
        paperCard.y = 530;
        playerPaper.y = 530;
        playerChoice = "paper";
        rockCard.y = 550;
        playerRock.y = 550;
        if (scissorState == "DEFAULT") {
        playerScissor.y = 550;  
        }        
        scissorCard.y = 550;
      } else if (mousePressedOver(scissorCard)) {
        scissorCard.y = 530;
        if (scissorState == "DEFAULT") {
          playerScissor.y = 530;  
          }   
        playerChoice = "scissor";
        rockCard.y = 550;
        playerRock.y = 550;
        playerPaper.y = 550;
        paperCard.y = 550;
      }
    }
    if (mousePressedOver(playerScissor)) {
      scissorState = "HELD";
      speechCount = 0;
    } else {
      scissorState = "DEFAULT";
    }
    if (scissorState == "HELD" ) {
      playerScissor.x = mouseX;
      playerScissor.y = mouseY;
      speechState = 4;
    }
    if(playerScissor.isTouching(gameCard)){
      gameCard.changeImage('shredded');
      gameChoice.destroy();
      gameCard.scale = 0.5;
      gameCard.x = 1050;
      gameCard.y = 600;
      gameState = 1;
      speechState = 6;
    }
  }else if(gameState === 1){
    if(speechState < 6){
      speechState = 6;
    }
    textAlign(CENTER);
    textSize(60);
    fill('white');
    text("Player Wins", width / 2, 250);

    speech(6, 7, "What!", 50, 20);
    speech(7, 8, "Ugh.. I Guess I Need To Get You A Prize Now", 100, 30);
    speech(8, 9, "(End Of Part 2)", Infinity, 20);
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