// Bloqueamos scroll al inicio
document.body.style.overflow = 'hidden';

const pantalla = document.getElementById('pantalla');

pantalla.addEventListener('click', () => {
  if (document.body.classList.contains('abierto')) return;

  document.body.classList.add('abierto');

  // Habilitamos scroll
  document.body.style.overflow = 'auto';
});


// FECHA DEL CASAMIENTO (YYYY, MM -1, DD, HH, MM)
const fechaEvento = new Date(2026, 10, 15, 18, 0).getTime();

const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  if (diferencia < 0) return;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  diasEl.textContent = dias.toString().padStart(2, '0');
  horasEl.textContent = horas.toString().padStart(2, '0');
  minutosEl.textContent = minutos.toString().padStart(2, '0');
  segundosEl.textContent = segundos.toString().padStart(2, '0');
}

actualizarContador();
setInterval(actualizarContador, 1000);
