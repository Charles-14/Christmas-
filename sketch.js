const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg,snow=[];
var maxSnow=100;
var santaClaus,ground,giftBox,giftBoxImg;
var backgroundMusic;
var snowMan,snowManImg;
var christmasTree,christmasTreeImg;
var star,starImg,ground,groundImg;
var boy,boyImg,boyImg2;
var boy2,boy2Img,boy2Img2;
var dog,dogImg,dogImg2;

function preload(){
  bg = loadImage("snow2.jpg"); 
  santaClausImg = loadAnimation("images/santa1.png","images/santa2.png","images/santa3.png","images/santa4.png","images/santa5.png","images/santa6.png");
  snowManImg = loadImage("SnowMan.png");
  christmasTreeImg = loadImage("ChristmasTree.png");
  starImg = loadAnimation("images/star1.png","images/star2.png","images/star3.png","images/star4.png","images/star5.png","images/star6.png","images/star7.png","images/star8.png","images/star9.png","images/star11.png","images/star12.png","images/star14.png");
  groundImg = loadImage("ground1.png");
  boyImg = loadImage("boy1.png");
  boyImg2 = loadImage("boy2.png");
  boy2Img = loadImage("boy11.png");
  boy2Img2 = loadImage("boy22.png");
  dogImg = loadImage("dog1.png");
  dogImg2 = loadImage("dog2.png");
  backgroundMusic = loadSound("christmasMusic.mp3");
}

function setup() {
  createCanvas(1400,700);
  engine = Engine.create();
  world = engine.world;

  backgroundMusic.loop();

  santaClaus = createSprite(-300,150);
  santaClaus.addAnimation("flying",santaClausImg);
  santaClaus.scale= 1.2;
  santaClaus.velocityX = 4;

  star = createSprite(300,50);
  star.addAnimation("still",starImg);
  star.scale= 1.8;

  ground = createSprite(700,730,1400,20);
  ground.addAnimation("bottom",groundImg);
  ground.scale= 3;
  ground.setCollider("rectangle",15, 60,700,180) 

  snowMan = createSprite(500,620);
  snowMan.addAnimation("standing",snowManImg);
  snowMan.scale= 0.25;

  christmasTree = createSprite(870,555);
  christmasTree.addAnimation("planted",christmasTreeImg);
  christmasTree.scale= 0.50;

  boy = createSprite(200,500);
  boy.addAnimation("standing",boyImg);
  boy.addAnimation("jumping",boyImg2);
  boy.scale = 0.7;
  boy.setCollider("rectangle",15, -20,100,180);
  
  boy2 = createSprite(1200,500);
  boy2.addAnimation("boy",boy2Img);
  boy2.addAnimation("boyJumping",boy2Img2);
  boy2.scale = 0.7;
  boy2.setCollider("rectangle",15, -20,100,180);

  dog = createSprite(320,615);
  dog.addAnimation("dog",dogImg);
  dog.addAnimation("dogjumping",dogImg2);
  dog.scale = 0.48;
  dog.setCollider("rectangle",15, -20,100,180);

  if(frameCount % 275 === 0){
    for(var i=0; i<maxSnow; i++){
    snow.push(new Snowfall(random(0,1350),random(0,50)));
    }
  }
}

function draw() {
  background(bg);
  Engine.update(engine);
  boy.collide(ground);
  boy2.collide(ground);
  dog.collide(ground);
   
  
  if(santaClaus.x > 1650){
    santaClaus.x= -300;
  }

  if(keyWentDown("space") && boy.y >=100 && boy2.y >=100 && dog.y >=100) {
    boy.velocityY = -20;
    boy2.velocityY = -20;
    dog.velocityY = -18;
    boy.changeAnimation("jumping",boyImg2);
    boy2.changeAnimation("boyJumping",boy2Img2);
    dog.changeAnimation("dogjumping",dogImg2)

}
   if(keyWentUp("space")){
    boy.changeAnimation("standing",boyImg);
    boy2.changeAnimation("boy",boy2Img);
    dog.changeAnimation("dog",dogImg);
   }

  boy2.velocityY = boy2.velocityY + 0.8
  boy.velocityY = boy.velocityY + 0.9
  dog.velocityY = dog.velocityY + 0.9

  for(var i = 0;i < maxSnow; i++){
    snow[i].display();
    snow[i].changePosition();
    } 

  ground.display();
    
  drawSprites();
}