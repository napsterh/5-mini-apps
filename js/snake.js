// ===== 4. SNAKE =====
// Idea: un bucle que cada 120 ms mueve la serpiente, la dibuja y comprueba choques.

const lienzo = document.getElementById('snake-canvas');
const ctx = lienzo.getContext('2d');
const TAM = 20;                       // tamaño de cada casilla
const CASILLAS = lienzo.width / TAM;  // 15 x 15

const puntosEl = document.getElementById('snake-puntos');
const recordEl = document.getElementById('snake-record');

let serpiente, direccion, siguiente, comida, puntos, temporizador;
let record = Number(localStorage.getItem('record')) || 0;
recordEl.textContent = record;

function nuevaComida() {
  // Elegimos una casilla al azar que no esté ocupada por la serpiente
  do {
    comida = { x: Math.floor(Math.random() * CASILLAS), y: Math.floor(Math.random() * CASILLAS) };
  } while (serpiente.some(p => p.x === comida.x && p.y === comida.y));
}

function empezar() {
  clearInterval(temporizador);
  serpiente = [{ x: 7, y: 7 }];
  direccion = { x: 1, y: 0 };
  siguiente = direccion;
  puntos = 0;
  puntosEl.textContent = 0;
  nuevaComida();
  temporizador = setInterval(paso, 120);
}

function paso() {
  direccion = siguiente;
  const cabeza = { x: serpiente[0].x + direccion.x, y: serpiente[0].y + direccion.y };

  // Choque con la pared o con ella misma = fin
  const choca = cabeza.x < 0 || cabeza.y < 0 || cabeza.x >= CASILLAS || cabeza.y >= CASILLAS
    || serpiente.some(p => p.x === cabeza.x && p.y === cabeza.y);
  if (choca) return terminar();

  serpiente.unshift(cabeza);                       // añadimos la nueva cabeza
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    puntos++;                                      // comió: crece y suma
    puntosEl.textContent = puntos;
    nuevaComida();
  } else {
    serpiente.pop();                               // no comió: quitamos la cola
  }
  dibujarSnake();
}

function terminar() {
  clearInterval(temporizador);
  if (puntos > record) {
    record = puntos;
    localStorage.setItem('record', record);
    recordEl.textContent = record;
  }
  ctx.fillStyle = 'rgba(0,0,0,.6)';
  ctx.fillRect(0, 0, lienzo.width, lienzo.height);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Fin del juego', lienzo.width / 2, lienzo.height / 2);
}

function dibujarSnake() {
  ctx.fillStyle = '#06080f';
  ctx.fillRect(0, 0, lienzo.width, lienzo.height);
  ctx.fillStyle = '#ff3b5c';
  ctx.fillRect(comida.x * TAM, comida.y * TAM, TAM - 2, TAM - 2);
  serpiente.forEach((p, i) => {
    ctx.fillStyle = i === 0 ? '#A3FF12' : '#00E676';
    ctx.fillRect(p.x * TAM, p.y * TAM, TAM - 2, TAM - 2);
  });
}

// Cambia la dirección, sin permitir dar la vuelta en U
function girar(x, y) {
  if (direccion.x === -x && direccion.y === -y) return;
  siguiente = { x, y };
}

// Teclado: flechas y WASD
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (['arrowup', 'w'].includes(k)) girar(0, -1);
  if (['arrowdown', 's'].includes(k)) girar(0, 1);
  if (['arrowleft', 'a'].includes(k)) girar(-1, 0);
  if (['arrowright', 'd'].includes(k)) girar(1, 0);
  if (k.startsWith('arrow') && document.getElementById('snake').classList.contains('activa')) e.preventDefault();
});

// Móvil: deslizar el dedo
let inicio = null;
lienzo.addEventListener('touchstart', e => { inicio = e.touches[0]; });
lienzo.addEventListener('touchend', e => {
  if (!inicio) return;
  const dx = e.changedTouches[0].clientX - inicio.clientX;
  const dy = e.changedTouches[0].clientY - inicio.clientY;
  if (Math.abs(dx) > Math.abs(dy)) girar(dx > 0 ? 1 : -1, 0);
  else girar(0, dy > 0 ? 1 : -1);
  inicio = null;
});

document.getElementById('snake-reiniciar').addEventListener('click', empezar);

// Primera pantalla (sin empezar todavía)
serpiente = [{ x: 7, y: 7 }];
direccion = siguiente = { x: 1, y: 0 };
comida = { x: 11, y: 7 };
dibujarSnake();
