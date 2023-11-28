const container = document.getElementById('stars');

const randint = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
}

const rand = (min, max) => {
  return min + Math.random() * (max - min);
}

const createStar = () => {
  const x = randint(50, window.innerWidth - 50);
  const y = randint(0, Math.floor(window.innerHeight / 2));
  const duration = rand(8, 20);

  const star = document.createElement('div');
  star.innerText = '*';
  star.className = 'star';
  star.style = `
    position: absolute;
    user-select: none;
    left: ${x}px;
    top: -${y}px;
    animation: falling-star ${duration}s forwards;
    transform: scale(${randint(1, 5)}) rotateZ(${randint(0, 360)}deg);
  `;
  container.appendChild(star);

  setTimeout(() => {
    container.removeChild(star);
    createStar();
  }, duration * 1000);
}

for (let i = 0; i < 500; ++i) {
  const duration = rand(0, 12);

  setTimeout(() => {
    createStar();
  }, duration * 1000);
}
