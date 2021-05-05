//OBjetos
let user;
let blocks = new Array;
let ball;
//Variables
let xBrick = 0;
let yBrick = 30;
let lineas = 0;
let bg;
//Pruebas

//Clase Bloques
class blocksItems {
  constructor(xB, yB) {
    this.r = random(256);
    this.g = random(256);
    this.b = random(256);
    this.sizeX = 40;
    this.sizeY = 30;
    this.x = xB;
    this.y = yB;
  }

  display() {
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.sizeX, this.sizeY);
  }

}

//Clase usuarios
class rectUser {
  constructor() {
    this.r = random(256);
    this.g = random(256);
    this.b = random(256);
    this.sizeX = 60;
    this.sizeY = 30;
    //this.xSpeed = random(-5, 5);
   // this.ySpeed = random(-5, 5);
    
    this.x = windowWidth / 2;
    this.y = windowHeight - (this.sizeY*2);
  }

  display() {
    //alert(this.x + " " + windowHeight)
    //alert(this.y + " " + windowWidth);
    fill(this.r, this.b, this.g);
    rect(this.x, this.y, this.sizeX, this.sizeY);
  }

  move() {
    
    if (keyIsDown(65)) {
      if (this.x >= 0) this.x -= 6;
    }

    if (keyIsDown(68)) {
      if (this.x <= windowWidth - this.sizeX) this.x += 6;
    }
  }
}
class balls {
  constructor() {
    this.movement = false;
    this.count = 0;
    this.direction = [-7,7];
    this.x = random(windowWidth);
    this.y = windowHeight / 2;
    this.r = random(256);
    this.g = random(256);
    this.b = random(256);
    this.sizeX = 20;
    //this.sizeY = 20;
    //quitar la posibilidad de que te de 0
    this.xSpeed = random(-1,1)+this.direction[Math.round(random(0,1))];
    this.ySpeed = random(-1,1)+this.direction[Math.round(random(0,1))];
    //alert(this.ySpeed + " " + this.xSpeed);
  }

  display() {
    //alert(this.x + " " + windowHeight)
    //alert(this.y + " " + windowWidth);
    fill(this.r, this.b, this.g);
    ellipse(this.x, this.y, this.sizeX);
  }

  move() {
    if(this.count == 200) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }else{
     this.count++;
   }
}

  checkCollison(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    //console.log(this.y + " " + other.y);
    /*if (this.y == other.y) {
      alert('Pocholo');

      this.ySpeed * -1;
      
    } */
    let hit = collideRectCircle(other.x, other.y, other.sizeX, other.sizeY, this.x, this.y, this.sizeX);
    if (hit) this.ySpeed *= -1;
  }
}



function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  //User
  user = new rectUser();
  //Bloques
  /*for (let i = 0; i < 100; i++) {
    if ((xBrick+100) <= windowWidth){
      xBrick += 45;
    }else {
      xBrick = 45;
      yBrick += 35;
    }
    blocks.push(new blocksItems(xBrick,yBrick));
  }*/

  do {
    if ((xBrick+100) <= windowWidth){
      xBrick += 45;
    }else {
        xBrick = 45;
        yBrick += 35;
        lineas++;
    } 
   
    if (lineas !== 5) blocks.push(new blocksItems(xBrick,yBrick));
  } while (lineas  !== 5);
   
    
  //bg = loadImage('./img/fondo.jpg');

  //Bola
  ball = new balls();

}

function draw() {
  //user
  background(255,80);
  
  user.move();
  user.display();

  //Bloques
 
  for (let i = 0; i < blocks.length;i++){
    
    blocks[i].display();
  }
  ball.display();
  ball.move();
  ball.checkCollison(user);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}