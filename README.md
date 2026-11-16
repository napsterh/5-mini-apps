# Mini App · 5 mini proyectos de JavaScript

Una sola aplicación con 5 proyectos pequeños hechos con HTML, CSS y JavaScript puro. No usa frameworks ni hay que instalar nada para verla. Cada proyecto es una pestaña.

| # | Proyecto | Qué aprendes |
|---|---|---|
| 1 | Clima de tu ciudad | `fetch`, APIs, geolocalización, `localStorage` |
| 2 | Tablero de tareas | Eventos, arrastrar y soltar, guardar datos |
| 3 | Chat con IA | `async/await`, por qué la clave va en un servidor |
| 4 | Snake | Bucle de juego, `canvas`, teclado y táctil |
| 5 | Modo lectura | Clases CSS y cómo funciona una extensión |

---

## Cómo instalar y usar la app

### Paso 1 · Descarga el proyecto
- **Con Git:** abre una terminal y ejecuta `git clone https://github.com/napsterh/5-mini-apps.git`.
- **Sin Git:** en GitHub pulsa el botón verde **Code → Download ZIP**, descomprime el archivo y abre la carpeta.

### Paso 2 · Ábrela
Tienes dos formas:

**A) La más fácil:** haz doble clic en `index.html`. Se abre en tu navegador con las 5 pestañas.

**B) Recomendada (con servidor local):** sirve la carpeta como si fuera una web. Así el clima puede pedir tu ubicación. Dentro de la carpeta, ejecuta:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000` en el navegador. Para pararlo, pulsa `Ctrl + C` en la terminal.

Si prefieres usar Visual Studio Code, instala la extensión *Live Server* y pulsa «Go Live».

### Paso 3 · Pruébala
1. **Clima:** carga solo. Si no das permiso de ubicación, muestra Lima.
2. **Tareas:** escribe una tarea, pulsa «Añadir» y arrástrala entre columnas.
3. **Chat IA:** escribe un mensaje. Por defecto responde en modo demo.
4. **Snake:** pulsa «Jugar / reiniciar» y usa las flechas o WASD.
5. **Lectura:** pulsa «Activar modo lectura».

---

## Cómo instalar la extensión de Chrome (proyecto 5)

La pestaña «Lectura» es una demostración dentro de la página. La extensión real está en la carpeta `extension-modo-lectura/`.

1. Abre Chrome y entra en `chrome://extensions`.
2. Activa el **Modo de desarrollador** (arriba a la derecha).
3. Pulsa **Cargar descomprimida**.
4. Elige la carpeta `extension-modo-lectura`.
5. Abre cualquier artículo y pulsa el icono de la extensión: oculta menús y anuncios. Púlsalo otra vez para volver a la página normal.

---

## Cómo conectar el chat con una IA real (proyecto 3, opcional)

El chat funciona en **modo demo** (respuestas simuladas) y no necesita nada más. Para usar una IA real:

1. Consigue una clave de API de tu proveedor de IA. Su uso puede tener coste.
2. Nunca pongas la clave en `js/chat.js` ni en ningún archivo que subas a GitHub.
3. Abre una terminal en la carpeta `chat-servidor/` y ejecuta el servidor con tu clave en una variable de entorno. Los comandos están al principio del archivo `server.js`.
4. En `js/chat.js` cambia `URL_SERVIDOR` por `http://localhost:3000/chat`.

El servidor es un ejemplo de aprendizaje y no está probado con una clave real. Revisa la documentación de tu proveedor, porque la URL, las cabeceras y el nombre del modelo pueden cambiar.

El chat con IA real solo funciona en tu ordenador. En GitHub Pages se verá el modo demo, porque Pages no ejecuta servidores.

---

## Cómo publicarla en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub y sube todo el contenido de esta carpeta.
2. Entra en **Settings → Pages**.
3. En «Branch» elige `main` y la carpeta `/ (root)`, y guarda.
4. En un minuto tendrás tu app en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`. Usa HTTPS, así que el clima podrá pedir tu ubicación.

---

## Notas
- **Clima:** usa [Open-Meteo →](https://open-meteo.com), gratuita y sin clave para uso no comercial.
- **Tareas y récord de Snake:** se guardan en tu navegador (`localStorage`); solo los ves tú y en ese navegador.

## Retos extra
- Clima: buscador de ciudades.
- Tareas: etiquetas de color y un buscador.
- Chat: botón «copiar respuesta».
- Snake: niveles de velocidad.
- Extensión: una ventana emergente para cambiar el tamaño de letra.

@napster.dev
