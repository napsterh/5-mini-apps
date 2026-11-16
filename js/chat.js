// ===== 3. TU PROPIO CHAT CON IA =====
// IMPORTANTE: una clave de API NUNCA se pone en el navegador (cualquiera podría verla).
// Por eso este chat habla con un pequeño servidor tuyo (carpeta chat-servidor).
// Si dejas URL_SERVIDOR vacía, funciona en MODO DEMO con respuestas simuladas.

const URL_SERVIDOR = '';   // Ejemplo cuando tengas tu servidor: 'http://localhost:3000/chat'

const cajaMensajes = document.getElementById('chat-mensajes');
const formChat = document.getElementById('chat-form');
const textoChat = document.getElementById('chat-texto');
document.getElementById('chat-modo').textContent = URL_SERVIDOR
  ? 'Conectado a tu servidor: ' + URL_SERVIDOR
  : 'Modo demo: respuestas simuladas. Conecta tu servidor en js/chat.js para usar una IA real.';

// Historial de la conversación (lo que se enviaría a la IA)
const historial = [];

function agregar(texto, quien) {
  const div = document.createElement('div');
  div.className = 'msg ' + quien;
  div.textContent = texto;
  cajaMensajes.appendChild(div);
  cajaMensajes.scrollTop = cajaMensajes.scrollHeight;   // baja hasta el último mensaje
  return div;
}

// Respuestas de mentira para el modo demo
function respuestaDemo(texto) {
  const t = texto.toLowerCase();
  if (t.includes('hola')) return '¡Hola! Soy un chat en modo demo. ¿Qué quieres aprender hoy?';
  if (t.includes('javascript')) return 'JavaScript es el lenguaje que da vida a las webs: botones, menús, juegos y más.';
  if (t.includes('gracias')) return '¡De nada! Sigue practicando con proyectos pequeños.';
  return 'Estoy en modo demo, así que solo respondo cosas simples. Conéctame a un servidor para tener una IA real.';
}

async function responder(texto) {
  if (!URL_SERVIDOR) {
    await new Promise(ok => setTimeout(ok, 600));   // pequeña pausa para que parezca que "piensa"
    return respuestaDemo(texto);
  }
  const r = await fetch(URL_SERVIDOR, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensajes: historial })
  });
  if (!r.ok) throw new Error('El servidor respondió ' + r.status);
  const datos = await r.json();
  return datos.respuesta;
}

formChat.addEventListener('submit', async e => {
  e.preventDefault();
  const texto = textoChat.value.trim();
  if (!texto) return;
  textoChat.value = '';
  agregar(texto, 'yo');
  historial.push({ role: 'user', content: texto });

  const pensando = agregar('…', 'ia');
  try {
    const respuesta = await responder(texto);
    pensando.textContent = respuesta;
    historial.push({ role: 'assistant', content: respuesta });
  } catch (error) {
    pensando.textContent = 'Error: no pude contactar con la IA.';
    console.error(error);
  }
});

agregar('¡Hola! Escríbeme algo.', 'ia');
