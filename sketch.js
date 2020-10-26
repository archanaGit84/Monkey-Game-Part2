var bkground,bkgroundImage;
var monkey, monkeyImage, monkeyImage2;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var ground, groundImage;
var gameState = "play";
var score = 0;
var monkeyScale = 0.1;
var edges;



function preload(){
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bkgroundImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  monkeyImage2 = loadAnimation("Monkey_08.png");
  
  
}

function setup() {
  createCanvas(600, 400);
  //background(180);
  bkground = createSprite(300,200,600,400);
  bkground.addImage(bkgroundImage);
  bkground.x = width/2;
   // bkground.scale = 1.9;
   bkground.velocityX = -3;
  
  ground = createSprite(300, 390, 600, 10);
    
    ground.visible = false;
  
  monkey = createSprite(100, 380, 20, 50);
    monkey.addAnimation("monkey", monkeyImage);
    monkey.addAnimation("fall",monkeyImage2);
    monkey.scale = 0.1;
    
    // edges = createEdgeSprites();
    bananaGroup = new Group();
    obstacleGroup = new Group();
  edges = createEdgeSprites();
  //monkey.debug = true;
  //obstacle.debug = true;
  
}

function draw() {
  if(gameState === "play"){
    //score = score + Math.round(frameRate()/ 60);

    if (bkground.x < 0) {
      bkground.x = width/2;
      bkground.scale = 1.3;
 
    }
     
    monkey.collide(ground);
  
    if(keyDown("space") && monkey.y > 250){
      monkey.velocityY = -12;
    }
  
    monkey.velocityY += 0.4;
    
    if(frameCount%60 === 0){
      spawnBanana();
      
    }
  
    if(frameCount%100 === 0){
      spawnObstacles();
    }
     
     if(monkey.isTouching(bananaGroup)){
       score = score +2;
       if(score>0 && score%10 === 0){
         monkey.scale+= 0.05;
       }
       bananaGroup.destroyEach();
     }
     
     
  
    if(monkey.isTouching(obstacleGroup)){
      gameState = "end"
    }
   }
  
   else if(gameState === "end"){
      bkground.velocityX = 0;
      monkey.rotation = 250;
      monkey.scale = monkeyScale;
     monkey.collide(edges[3]);
     monkey.changeAnimation("fall",monkeyImage2);
      monkey.velocityY = 10;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      //obstacleGroup.destroyEach();
      //bananaGroup.destroyEach();
     //monkey.destroy();
     //gameState = "play";
     /*if(monkey.y > height){
       monkey.destroy();
     }*/
    }
    
    drawSprites();
   fill("red");
  textSize(20);
  text("Score: " + score, 450,40);
  if(gameState === "end"){
   
    stroke(50);
    textSize(40);
    text("You Lose",200,200);
    
  }

}

function spawnBanana(){
  
  var randomHeight = Math.round(random(100,250));
  banana = createSprite(500,randomHeight,20,20);
  banana.addImage(bananaImage);
  banana.velocityX = -7;
  banana.scale = 0.08;
  banana.lifetime = 100;
  bananaGroup.add(banana);
}


function spawnObstacles(){
  //var randomHeight = Math.round(random(120,200));
  var obstacle = createSprite(500,350,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.setCollider("circle", 0, 0, 200);
  //obstacle.debug = true;
  obstacle.velocityX = -5;
  obstacle.scale = 0.3;
  obstacle.lifetime = 100;
  obstacleGroup.add(obstacle);
}
