// ===== 1. CLIMA =====
// Idea: pedimos tu ubicación al navegador y le preguntamos el clima a Open-Meteo (gratis, sin clave).

const climaCaja = document.getElementById('clima-resultado');
const botonUnidad = document.getElementById('clima-unidad');

// Ciudad por defecto si el usuario no da permiso de ubicación (Lima)
const POR_DEFECTO = { lat: -12.05, lon: -77.04, lugar: 'Lima (ubicación por defecto)' };

// Unidad guardada en el navegador: 'celsius' o 'fahrenheit'
let unidad = localStorage.getItem('unidad') || 'celsius';
let ultimaPosicion = null;

// Open-Meteo devuelve un número para el tipo de clima; aquí lo traducimos a texto
function descripcion(codigo) {
  if (codigo === 0) return 'Despejado';
  if (codigo <= 3) return 'Parcialmente nublado';
  if (codigo === 45 || codigo === 48) return 'Niebla';
  if (codigo >= 51 && codigo <= 57) return 'Llovizna';
  if (codigo >= 61 && codigo <= 67) return 'Lluvia';
  if (codigo >= 71 && codigo <= 77) return 'Nieve';
  if (codigo >= 80 && codigo <= 82) return 'Chubascos';
  if (codigo >= 95) return 'Tormenta';
  return 'Variable';
}

async function cargarClima(pos) {
  ultimaPosicion = pos;
  const simbolo = unidad === 'celsius' ? '°C' : '°F';
  const url = 'https://api.open-meteo.com/v1/forecast'
    + `?latitude=${pos.lat}&longitude=${pos.lon}`
    + '&current=temperature_2m,weather_code,wind_speed_10m'
    + '&daily=weather_code,temperature_2m_max,temperature_2m_min'
    + `&timezone=auto&forecast_days=4&temperature_unit=${unidad}`;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error('Error ' + respuesta.status);
    const datos = await respuesta.json();

    let dias = '';
    for (let i = 1; i < datos.daily.time.length; i++) {
      const fecha = new Date(datos.daily.time[i] + 'T12:00:00');
      const nombre = fecha.toLocaleDateString('es', { weekday: 'short' });
      dias += `<div class="dia"><strong>${nombre}</strong><br>${descripcion(datos.daily.weather_code[i])}<br>`
        + `${Math.round(datos.daily.temperature_2m_max[i])}${simbolo} / ${Math.round(datos.daily.temperature_2m_min[i])}${simbolo}</div>`;
    }

    climaCaja.innerHTML = `
      <div>${pos.lugar}</div>
      <div class="clima-grande">${Math.round(datos.current.temperature_2m)}${simbolo}</div>
      <div>${descripcion(datos.current.weather_code)} · viento ${datos.current.wind_speed_10m} km/h</div>
      <div class="dias">${dias}</div>`;
  } catch (error) {
    climaCaja.textContent = 'No se pudo cargar el clima. Revisa tu conexión e inténtalo de nuevo.';
    console.error(error);
  }
}

// Pedimos la ubicación. Si la niegan o falla, usamos la ciudad por defecto.
function iniciar() {
  if (!navigator.geolocation) { cargarClima(POR_DEFECTO); return; }
  navigator.geolocation.getCurrentPosition(
    (p) => cargarClima({ lat: p.coords.latitude, lon: p.coords.longitude, lugar: 'Tu ubicación' }),
    () => cargarClima(POR_DEFECTO)
  );
}

// Botón para cambiar entre °C y °F (y guardarlo)
botonUnidad.addEventListener('click', () => {
  unidad = unidad === 'celsius' ? 'fahrenheit' : 'celsius';
  localStorage.setItem('unidad', unidad);
  if (ultimaPosicion) cargarClima(ultimaPosicion);
});

iniciar();
