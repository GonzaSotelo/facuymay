/*********************************
 * BLOQUEO INICIAL
 *********************************/
document.body.style.overflow = "hidden";

/*********************************
 * APERTURA DEL SOBRE
 *********************************/
const pantalla = document.getElementById("pantalla");

pantalla.addEventListener("click", () => {
  if (document.body.classList.contains("abierto")) return;

  document.body.classList.add("abierto");
  document.body.style.overflow = "auto";

  // SIEMPRE MOSTRAR ARRIBA
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });
});

/*********************************
 * CONTADOR
 *********************************/
const fechaEvento = new Date(2026, 3, 8, 12, 15).getTime();

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

function actualizarContador() {
  const ahora = Date.now();
  const diferencia = fechaEvento - ahora;
  if (diferencia <= 0) return;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  diasEl.textContent = String(dias).padStart(2, "0");
  horasEl.textContent = String(horas).padStart(2, "0");
  minutosEl.textContent = String(minutos).padStart(2, "0");
  segundosEl.textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

/*********************************
 * CARRUSEL
 *********************************/
const carrusel = document.getElementById("carrusel");
const slides = document.querySelectorAll(".slide");
const paginacion = document.getElementById("paginacion");

let index = 0;
const total = slides.length;

// PAGINACIÓN
slides.forEach((_, i) => {
  const punto = document.createElement("div");
  punto.className = "punto" + (i === 0 ? " activo" : "");

  punto.addEventListener("click", () => {
    irASlide(i);
    reiniciarAuto();
  });

  paginacion.appendChild(punto);
});

const puntos = document.querySelectorAll(".punto");

function irASlide(i) {
  index = i;
  carrusel.style.transform = `translateX(-${index * 100}%)`;
  actualizarPaginacion();
}

function actualizarPaginacion() {
  puntos.forEach(p => p.classList.remove("activo"));
  puntos[index].classList.add("activo");
}

function siguienteSlide() {
  index = (index + 1) % total;
  irASlide(index);
}

let intervalo = setInterval(siguienteSlide, 4000);

function reiniciarAuto() {
  clearInterval(intervalo);
  intervalo = setInterval(siguienteSlide, 4000);
}

/*********************************
 * MODAL RSVP
 *********************************/
const modal = document.getElementById("modalRSVP");
const abrir = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrarModal");

let scrollActual = 0;

abrir.addEventListener("click", () => {
  scrollActual = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollActual}px`;
  document.body.style.width = "100%";

  modal.classList.add("activo");
});

cerrar.addEventListener("click", () => {
  modal.classList.remove("activo");

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  window.scrollTo(0, scrollActual);
});

/*********************************
 * FORMULARIO RSVP
 *********************************/
const formulario = document.getElementById("formulario");

document.querySelectorAll("input[name='asiste']").forEach(radio => {
  radio.addEventListener("change", () => {
    formulario.classList.toggle("oculto", radio.value === "No");
  });
});

// ADULTOS
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

// NIÑOS
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

// ENVIAR WHATSAPP
document.getElementById("enviar").addEventListener("click", () => {
  const adultos = document.getElementById("adultos").value;
  const ninos = document.getElementById("ninos").value;
  const cancion = document.getElementById("cancion").value;

  const mensaje = `
Confirmación de asistencia:
Adultos: ${adultos}
Niños: ${ninos}
Canción: ${cancion}
  `;

  const telefono = "5491124081298";
  window.open(
    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
});
