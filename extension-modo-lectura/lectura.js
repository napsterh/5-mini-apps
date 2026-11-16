// Activa o desactiva el modo lectura en la página actual.
// Cada vez que se ejecuta, mira si ya hay estilos puestos: si los hay, los quita (desactiva).

const ID = 'modo-lectura-basico';
const existente = document.getElementById(ID);

if (existente) {
  existente.remove();
} else {
  const estilo = document.createElement('style');
  estilo.id = ID;
  estilo.textContent = `
    /* Ocultamos lo que suele distraer */
    nav, aside, footer, header, iframe, [role="banner"], [role="complementary"],
    [class*="ad-"], [id*="ad-"], [class*="banner"], [class*="sidebar"], [class*="popup"] {
      display: none !important;
    }
    /* Texto cómodo de leer */
    body {
      max-width: 700px !important;
      margin: 0 auto !important;
      padding: 24px !important;
      font-size: 20px !important;
      line-height: 1.7 !important;
      background: #fff !important;
      color: #111 !important;
    }
  `;
  document.head.appendChild(estilo);
}
