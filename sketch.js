var trex,trex_running,trex_collided;
var ground,ground_image,invisible_ground;
var cloud_image,cloud_group;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle_group;
var score = 0;
var gameState = 0;
var game_over,game_over_image,restart,restart_image;

function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  game_over_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}
function setup() {
  createCanvas(600,400);
  trex = createSprite(50,350,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;
  ground = createSprite(300,380,600,10);
  ground.addImage("ground",ground_image);
  invisible_ground = createSprite(300,385,600,10);
  invisible_ground.visible = false;
  cloud_group = new Group();
  obstacle_group = new Group();
  game_over = createSprite(280,200,20,20);
  game_over.addImage("gameOver",game_over_image);
  restart = createSprite(300,270,20,20);
  restart.addImage("restartImage",restart_image);
  
}

function draw() {
  background(180);
  drawSprites();
  if(gameState == 0){
  game_over.visible = false;
  restart.visible = false;  
  text("Score = " + score,300,20);
  score = score + Math.round(getFrameRate()/60);
  if(keyDown("space")&&trex.y >= 330){
    trex.velocityY = -10;
  }
  trex.velocityY=trex.velocityY+0.7;
  trex.collide(invisible_ground);
  ground.velocityX = -3;
  if(ground.x<20)
  {
   ground.x = 200;   
  }
  cloud();
  obstacle();
  if(obstacle_group.isTouching(trex)){
    gameState = 1;
  }
  }
  else if(gameState == 1){
    game_over.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
}

function cloud() {
  if(frameCount % 60 === 0){
    var cloud = createSprite(600,200,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage("cloud",cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 205;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud_group.add(cloud);
  }
}

function obstacle() {
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,365,40,10);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle_group.add(obstacle);
    var rand = Math.round(random(1,6));
    obstacle.scale = 0.7;
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
  }
}

function reset() {
  
  gameState = 0;
  game_over.visible = false;
  restart.visible = false;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  score = 0;
}