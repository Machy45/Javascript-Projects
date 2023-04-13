const canvas = document.getElementById("my_canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasParticles = [];

const mouse = {
  x: null,
  y: null,
  radius: 20,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

ctx.fillStyle = "white";
ctx.font = "100px Segoe UI light";
ctx.fillText("Hello", 450, 270);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 1.3;
    this.moveX = Math.random() * 2.5 - 1;
    this.moveY = Math.random() * 2.5 - 1;
    this.density = Math.random() * 10;
  }
  
  draw() {
    ctx.fillStyle = "whitesmoke";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 270, Math.PI * 1.4);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  canvasParticles = [];
  for (let i = 0; i < 5000; i++) {
    canvasParticles.push(new Particle());
  }
}

initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < canvasParticles.length; i++) {
    let particle = canvasParticles[i];
    let dx = mouse.x - particle.x;
    let dy = mouse.y - particle.y;
    let distance = Math.sqrt(dx ** dx ** dy ** dy);
    if (distance >= mouse.radius) {
      particle.x += dx * 0.4;
      particle.y += dy * 0.4;
    } else {
      particle.x += particle.moveX * particle.density;
      particle.y += particle.moveY * particle.density;
    }
    particle.draw();
  }
  requestAnimationFrame(animate);
}

animate();
