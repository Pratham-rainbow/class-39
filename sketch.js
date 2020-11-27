var canvas, backgroundImg, playerCount, database;
var gameState = 0;
var form, player, game;
var allplayers;
var car1, car2, car3, car4, cars;
var car1Img, car2Img, car3Img, car4Img, groundImg;
var trackImg;
var startImg;

function preload(){
  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");

  groundImg = loadImage("images/ground.png");
  backgroundImg = loadImage("images/background.jpg");
  startImg = loadImage("images/startbg.png");

  trackImg = loadImage("images/track.jpg");

}
function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-30);

  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount===4){
    game.update(1);
  }
  if(gameState===0){
    background(startImg);
  }
  if(gameState===1){
    clear();
    car1.visible = true;
    car2.visible = true;
    car3.visible = true;
    car4.visible = true;
    game.play();
  }
  if(gameState===2){
    game.end();
  }

  drawSprites();
}