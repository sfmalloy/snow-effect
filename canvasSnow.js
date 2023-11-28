const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');
const body = document.getElementsByTagName('body').item(0);

canvas.width = 2*window.innerWidth;
canvas.height = 2*window.innerHeight;
window.onresize = () => {
  canvas.width = 2*window.innerWidth;
  canvas.height = 2*window.innerHeight;
}

const randint = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
}

const radians = (degrees) => {
  return degrees * Math.PI / 180;
}

class Snowflake {
  constructor(velX, velY) {
    this.x = randint(0, canvas.width);
    this.y = -randint(0, canvas.height);
    this.size = randint(24, 128);
    this.velX = velX;
    this.velY = velY;
    this.velAngle = radians(2 * Math.random());
    this.opacity = 1;
    this.angle = 0;
  }

  step() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.y > canvas.height + this.size) {
      this.y = -this.size;
    }

    this.opacity = (canvas.height - this.y) / canvas.height;
    this.angle += this.velAngle;
  }
}

let snow = [];
for (let i = 0; i < 500; ++i) {
  snow.push(new Snowflake(
    0,
    randint(1, 8)
  ));
}

const drawCallback = () => {
  draw();
  window.requestAnimationFrame(drawCallback);
}
window.requestAnimationFrame(drawCallback);

const draw = () => {
  context.fillStyle = body.style.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  snow.forEach(snowflake => {
    context.save();
    context.translate(snowflake.x, snowflake.y);
    context.rotate(snowflake.angle);

    context.font = `${snowflake.size}px Fira Code`;
    context.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('*', 0, 8);

    context.restore();

    snowflake.step();
  });
}
