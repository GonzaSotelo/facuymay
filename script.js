// Bloqueamos scroll al inicio
document.body.style.overflow = 'hidden';

const pantalla = document.getElementById('pantalla');
pantalla.addEventListener('click', () => {
  if (document.body.classList.contains('abierto')) return;
  document.body.classList.add('abierto');
  document.body.style.overflow = 'auto';
});

const inicio = document.getElementById('inicio');

pantalla.addEventListener('click', () => {
  if (document.body.classList.contains('abierto')) return;

  document.body.classList.add('abierto');

  // SCROLL AL PUNTO DE INICIO REAL
  requestAnimationFrame(() => {
    inicio.scrollIntoView({ behavior: 'instant' });
  });
});


// CONTADOR
const fechaEvento = new Date(2026, 3, 8, 12, 15).getTime();
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

  diasEl.textContent = String(dias).padStart(2,'0');
  horasEl.textContent = String(horas).padStart(2,'0');
  minutosEl.textContent = String(minutos).padStart(2,'0');
  segundosEl.textContent = String(segundos).padStart(2,'0');
}

actualizarContador();
setInterval(actualizarContador, 1000);


const carrusel = document.getElementById("carrusel");
const slides = document.querySelectorAll(".slide");
const paginacion = document.getElementById("paginacion");

let index = 0;
const total = slides.length;

/* CREAR PAGINACIÓN */
slides.forEach((_, i) => {
  const punto = document.createElement("div");
  punto.classList.add("punto");
  if (i === 0) punto.classList.add("activo");

  punto.addEventListener("click", () => {
    irASlide(i);
    reiniciarAuto();
  });

  paginacion.appendChild(punto);
});

const puntos = document.querySelectorAll(".punto");

/* IR A SLIDE */
function irASlide(i) {
  index = i;
  carrusel.style.transform = `translateX(-${index * 100}%)`;
  actualizarPaginacion();
}

/* ACTUALIZAR PUNTOS */
function actualizarPaginacion() {
  puntos.forEach(p => p.classList.remove("activo"));
  puntos[index].classList.add("activo");
}

/* AUTO SLIDE */
function siguienteSlide() {
  index = (index + 1) % total;
  irASlide(index);
}

let intervalo = setInterval(siguienteSlide, 4000);

/* REINICIAR AUTO */
function reiniciarAuto() {
  clearInterval(intervalo);
  intervalo = setInterval(siguienteSlide, 4000);
}

const modal = document.getElementById("modalRSVP");
const abrir = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrarModal");
const formulario = document.getElementById("formulario");

abrir.onclick = () => modal.classList.add("activo");
cerrar.onclick = () => modal.classList.remove("activo");

/* SI / NO */
document.querySelectorAll("input[name='asiste']").forEach(radio => {
  radio.addEventListener("change", () => {
    formulario.classList.toggle("oculto", radio.value === "No");
  });
});

/* ADULTOS */
document.getElementById("adultos").addEventListener("input", e => {
  const cont = document.getElementById("adultosDatos");
  cont.innerHTML = "";
  for (let i = 1; i <= e.target.value; i++) {
    cont.innerHTML += `
      <label>Adulto ${i}</label>
      <input placeholder="Nombre y apellido">
      <select>
        <option>Sin restricción</option>
        <option>Vegetariano</option>
        <option>Celíaco</option>
        <option>Vegano</option>
      </select>
    `;
  }
});

/* NIÑOS */
document.getElementById("ninos").addEventListener("input", e => {
  const cont = document.getElementById("ninosDatos");
  cont.innerHTML = "";
  for (let i = 1; i <= e.target.value; i++) {
    cont.innerHTML += `
      <label>Niño ${i}</label>
      <input placeholder="Nombre">
      <input type="number" placeholder="Edad">
      <select>
        <option>Sin restricción</option>
        <option>Celíaco</option>
      </select>
    `;
  }
});

/* ENVIAR WHATSAPP */
document.getElementById("enviar").onclick = () => {
  const mensaje = `
Confirmación de asistencia:
Adultos: ${adultos.value}
Niños: ${ninos.value}
Canción: ${cancion.value}
  `;

  const telefono = "5491124081298"; // TU NÚMERO
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
};
