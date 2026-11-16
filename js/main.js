// Cambiar de pestaña: muestra el panel del botón que pulsas y oculta los demás
const botones = document.querySelectorAll('#tabs button');
const paneles = document.querySelectorAll('.panel');

function mostrar(nombre) {
  botones.forEach(b => b.classList.toggle('activa', b.dataset.tab === nombre));
  paneles.forEach(p => p.classList.toggle('activa', p.id === nombre));
}

botones.forEach(b => b.addEventListener('click', () => mostrar(b.dataset.tab)));
