const canvas = document.getElementById("my_canvas");
// Made a variable and connected it to the id,my_canvas//
const ctx = canvas.getContext("2d");
// Used the function(.getContext) that has built in 2d drawing
//methods and we can call all the methods using the context variable//
canvas.width = window.innerWidth;
//Set the canvas width to be equal to the width of the screen//
canvas.height = window.innerHeight;
//Set the canvas height to be equal to the height of the screen//
let canvasParticles = [];
// creating an array for all the particle objects that contains
//information about the size,height,cordination and colour of the pixels

//Optimising mouse interactions//

const my_mouse = {
  x: null, // x will be the current postion of the mouse on the horizontal axis//
  y: null, // y will be the current position of the mouse on the veritcal axis//
  radius: 80, // Size of a circle area around the mouse in which the particles will interact with//
};


window.addEventListener("mouse_move", function (event) {
  my_mouse.x = event.x;
  my_mouse.y = event.y;
  console.log(mouse.x, mouse.y);
});

// Drawing text on canvas//
ctx.fillStyle = "white"; // Changes the colour of the text
ctx.font = "100px Segoe UI light"; // Sets the font,fontsize and width of the font
ctx.fillText("Hello", 450, 270); // Creates the text and the positions we want them to be at.The first 0 controls where it goes left and the last 0 controls whether it goes up or down
ctx.strokeStyle = "white light"; // Sets the outline of the text to a certain colour
//The get imageData method takes in 4 co-ordinates for a rectangular area somehwere on the canvas
//This area is then scanned pixel by pixel and information about the area
//such as colours schemes are saved inside a data array
const data = ctx.getImageData(0, 0, 100, 100);

//creating the particles using javascript classes

class my_particles {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 1.3;
    this.moveX = Math.random() * 2.5 - 1;
    this.moveY = Math.random() * 2.5 - 1;
    this.particle_density = Math.random() * 20;
  }
  draw(){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 30, Math.PI * 2.2);
    ctx.closePath();
    ctx.fill();
  }
}

function recalling() {
    canvasParticles = [];
    for (let i = 0; i < 20000; i++) {
        canvasParticles.push(new my_particles());
    }
}

recalling();

window.addEventListener("mousemove", function (event) {
  my_mouse.x = event.x;
  my_mouse.y = event.y;
});

function animate_it(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    for (let i = 0; i < canvasParticles.length; i++){
      let particle = canvasParticles[i];
      let dx = my_mouse.x - particle.x;
      let dy = my_mouse.y - particle.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < my_mouse.radius) {
          particle.x += dx *= 0.08;
          particle.y += dy *= 0.08;
      } else {
          particle.x -= particle.moveX ** particle.particle_density;
          particle.y -= particle.moveY ** particle.particle_density;
      }
      particle.draw();
  }
  requestAnimationFrame(animate_it);
    }