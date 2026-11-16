// ===== 5. MODO LECTURA (demo dentro de la página) =====
// Idea: añadir o quitar una clase CSS. La clase "modo-lectura" oculta menús y anuncios
// y agranda el texto (mira style.css). La extensión de Chrome hace lo mismo en CUALQUIER web.

const demo = document.getElementById('lectura-demo');
const botonLectura = document.getElementById('lectura-boton');

botonLectura.addEventListener('click', () => {
  const activo = demo.classList.toggle('modo-lectura');   // toggle = poner si no está, quitar si está
  botonLectura.textContent = activo ? 'Desactivar modo lectura' : 'Activar modo lectura';
});
