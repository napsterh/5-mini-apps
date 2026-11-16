// Servidor MÍNIMO de ejemplo para el chat con IA (Node.js 18 o superior, sin instalar nada).
// Hace de intermediario: el navegador le habla a este servidor y el servidor habla con la IA
// usando TU clave, que se guarda en una variable de entorno y nunca llega al navegador.
//
// NOTA: es un ejemplo de aprendizaje. Revisa la documentación de tu proveedor de IA
// (URL, cabeceras y nombre del modelo pueden cambiar) y no subas tu clave a GitHub.
//
// Cómo usarlo (en la carpeta chat-servidor):
//   macOS/Linux:  export ANTHROPIC_API_KEY="tu_clave" && node server.js
//   Windows:      set ANTHROPIC_API_KEY=tu_clave && node server.js
// Luego pon  const URL_SERVIDOR = 'http://localhost:3000/chat'  en js/chat.js

const http = require('http');

const CLAVE = process.env.ANTHROPIC_API_KEY;
const MODELO = process.env.MODELO || 'claude-sonnet-5-5';   // cámbialo por el modelo que uses

if (!CLAVE) {
  console.error('Falta la variable de entorno ANTHROPIC_API_KEY');
  process.exit(1);
}

const servidor = http.createServer(async (req, res) => {
  // Permite que tu página (otro origen) hable con este servidor
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  if (req.method === 'POST' && req.url === '/chat') {
    let cuerpo = '';
    req.on('data', trozo => cuerpo += trozo);
    req.on('end', async () => {
      try {
        const { mensajes } = JSON.parse(cuerpo);
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAVE,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({ model: MODELO, max_tokens: 500, messages: mensajes })
        });
        const datos = await r.json();
        const respuesta = datos.content?.[0]?.text || 'No hubo respuesta.';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ respuesta }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ respuesta: 'Error en el servidor.' }));
      }
    });
    return;
  }

  res.writeHead(404); res.end();
});

servidor.listen(3000, () => console.log('Servidor listo en http://localhost:3000/chat'));
