// ===== 2. TABLERO DE TAREAS (con arrastrar y soltar) =====
// Idea: guardamos las tareas en un objeto, las dibujamos y usamos el drag & drop de HTML5.

const formKanban = document.getElementById('kanban-form');
const textoKanban = document.getElementById('kanban-texto');
const columnas = document.querySelectorAll('.columna');

// Recuperamos lo guardado o empezamos vacío
let tareas = JSON.parse(localStorage.getItem('kanban')) || { porHacer: [], enCurso: [], hecho: [] };

function guardar() {
  localStorage.setItem('kanban', JSON.stringify(tareas));
}

// Dibuja todas las columnas desde cero
function dibujarTablero() {
  columnas.forEach(col => {
    const nombre = col.dataset.col;
    const lista = col.querySelector('.lista');
    lista.innerHTML = '';
    tareas[nombre].forEach(t => {
      const div = document.createElement('div');
      div.className = 'tarea';
      div.draggable = true;
      div.innerHTML = `<span></span><button title="Borrar">✕</button>`;
      div.querySelector('span').textContent = t.texto;   // textContent evita meter HTML raro

      // Al empezar a arrastrar, guardamos qué tarea es
      div.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', t.id);
      });
      // Botón de borrar
      div.querySelector('button').addEventListener('click', () => {
        tareas[nombre] = tareas[nombre].filter(x => x.id !== t.id);
        guardar(); dibujarTablero();
      });
      lista.appendChild(div);
    });
  });
}

// Añadir una tarea nueva a "Por hacer"
formKanban.addEventListener('submit', e => {
  e.preventDefault();
  tareas.porHacer.push({ id: Date.now().toString(), texto: textoKanban.value.trim() });
  textoKanban.value = '';
  guardar(); dibujarTablero();
});

// Cada columna acepta soltar tareas
columnas.forEach(col => {
  col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('sobre'); });
  col.addEventListener('dragleave', () => col.classList.remove('sobre'));
  col.addEventListener('drop', e => {
    e.preventDefault();
    col.classList.remove('sobre');
    const id = e.dataTransfer.getData('text/plain');
    let tarea = null;
    // La buscamos en todas las columnas y la sacamos de donde estaba
    for (const nombre in tareas) {
      const encontrada = tareas[nombre].find(x => x.id === id);
      if (encontrada) { tarea = encontrada; tareas[nombre] = tareas[nombre].filter(x => x.id !== id); }
    }
    if (tarea) tareas[col.dataset.col].push(tarea);
    guardar(); dibujarTablero();
  });
});

dibujarTablero();
