const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var bg;
var platform;
var chain;
var score = 0;


function preload() {
    bg = loadImage("sprites/bg.png");

    getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,height,1200,20)
    platform = new Ground(150,305,300,170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
   // log6 = new Log(230,180,80,PI/2);

    bird = new Bird(200,50);

    //chain = new Chain(bird.body,log6.body);

    slingshot = new SlingShot(bird.body,{x : 200, y : 50});
    
    

}

function draw(){
    background(bg);
    Engine.update(engine);
    textSize(35);
    fill("white");
    text("Score: " + score, width-300, 50);
    //console.log(box2.body.position.x);
    //console.log(box2.body.position.y);
    //console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();
    platform.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
   // log6.display();

    bird.display();

    //chain.display();

    slingshot.display();
}

function mouseDragged() {
    if(bird.body.position.x <= 220) {
        Matter.Body.setPosition(bird.body,{x : mouseX, y : mouseY});
    }
    

}

function mouseReleased() {
    slingshot.fly();
}

function keyPressed() {
    if (keyCode === 32) {
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        slingshot.attach(bird.body);
    }

}

async function getTime() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London");
    var responseJson = await response.json();

    console.log(responseJson);

    var dt = responseJson.datetime;
    console.log(dt);

    var hr = dt.slice(11,13);
    console.log(hr);

    if (hr >= 05 && hr <= 15) {
        bg1 = "sprites/bg1.png";

    

    } else {
        bg1 = "sprites/bg2.jpg";

    }

    bg = loadImage(bg1);

}