const startButton = document.querySelector('.startButton');
const guante = document.querySelector('.guante');
  
startButton.addEventListener('animationend', () => {
  // Agrega una clase para guardar los cambios de posición y visibilidad
  startButton.classList.add('visible');
  startButton.addEventListener('click', () => {
    startGame();
  });
});
guante.addEventListener('animationend', () => {
  guante.classList.add('guanteAnimado');
});

let isJumping = false;
let score = 0;
let gameOver = false;
const warioRueda = document.querySelector('.warioRueda');
const ruedaJuego = document.querySelector('.ruedaJuego');
const cocheWario = document.querySelector('.cocheWario');
const logoJuego =  document.querySelector('.logo');
const startFlex =  document.querySelector('.startFlex');
const nintendo =  document.querySelector('.nintendo');
const polvoJuego = document.querySelector('.polvoJuego');

const gameContainer = document.querySelector('.gridContaier');

function jump() {
  if (isJumping) return;
  isJumping = true;

  let jumpHeight = 0;
  let velocity = 20; // Velocidad inicial de salto
  const gravity = -0.8; // Aceleración constante hacia abajo

  const jumpInterval = setInterval(() => {
    // Aplicar movimiento
    jumpHeight += velocity;
    if (jumpHeight<150 && velocity>0){
      ruedaJuego.classList.add('ruedaInflada');
    } else{
      ruedaJuego.classList.remove('ruedaInflada');
    }
    velocity += gravity; // Reducir velocidad al subir, incrementarla al bajar

    // Actualizar la posición
    warioRueda.style.bottom = `${jumpHeight + 90}px`;

    // Comprobar si hemos llegado al suelo
    if (jumpHeight <= 0) {
      jumpHeight = 0; // Asegurar que esté exactamente en el suelo
      clearInterval(jumpInterval);
      isJumping = false;
      polvoJuego.style.visibility = 'visible';
    } else {
      polvoJuego.style.visibility = 'hidden';
    }
  }, 10);
}
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  gameContainer.appendChild(obstacle);
  let obstaclePosition = -30;

  const obstacleInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(obstacleInterval);
      obstacle.remove();
      return;
    }

    if (obstaclePosition>window.innerWidth-warioRueda.right){
      console.log('GAME OVER');
      gameOver = true;
    } else if (obstaclePosition >  window.innerWidth-380 && obstaclePosition >  window.innerWidth-260) { // 380: right de wario
      console.log('GAME OVER');
      clearInterval(obstacleInterval);
      obstacle.remove();
      score++;
      //scoreElement.textContent = `Score: ${score}`;
    } else {
      obstaclePosition += 4.015033623;
      obstacle.style.left = `${obstaclePosition}px`;
    }
  }, 5);
}
function startGame() {
  cocheWario.style.display = 'none';
  logoJuego.style.display = 'none';
  startFlex.style.display = 'none';
  nintendo.style.display = 'none';
  warioRueda.style.visibility = 'visible';
  polvoJuego.style.visibility = 'visible';
  setInterval(() => {
    if (!gameOver) {
      createObstacle();
    }
  }, 2000);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      jump();
    }
  });
}