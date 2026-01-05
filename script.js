// Bloqueamos scroll al inicio
document.body.style.overflow = 'hidden';

const pantalla = document.getElementById('pantalla');

pantalla.addEventListener('click', () => {
  if (document.body.classList.contains('abierto')) return;

  document.body.classList.add('abierto');

  // Habilitamos scroll
  document.body.style.overflow = 'auto';
});
