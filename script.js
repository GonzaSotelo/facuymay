/* =========================
   VIDEO INTRO
========================= */
const video = document.getElementById("introVideo");
const intro = document.getElementById("intro");
const contenido = document.getElementById("contenido");

video.onended = () => {
  intro.style.display = "none";
  contenido.classList.remove("hidden");
};

/* =========================
   MÚSICA DE FONDO
========================= */
const musica = document.getElementById("musica");
const musicBtn = document.getElementById("musicBtn");

let musicaIniciada = false;

function iniciarMusica() {
  if (musicaIniciada) return;

  musica.play().then(() => {
    musicaIniciada = true;
    musicBtn.textContent = "🔊";
    musicBtn.classList.add("playing");
  });
}

function toggleMusic() {
  if (musica.paused) {
    musica.play();
    musicBtn.textContent = "🔊";
    musicBtn.classList.add("playing");
  } else {
    musica.pause();
    musicBtn.textContent = "🔇";
    musicBtn.classList.remove("playing");
  }
}


/* =========================
   CUENTA REGRESIVA
========================= */
const evento = new Date("2026-03-08T12:15:00").getTime();

setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = evento - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

  document.getElementById("countdown").textContent =
    `${dias} días ${horas} hs ${minutos} min`;
}, 1000);

/* =========================
   MODAL REGALOS
========================= */
const modal = document.getElementById("modal");

function abrirModal() {
  modal.classList.add("show");
}

function cerrarModal() {
  modal.classList.remove("show");
}

/* =========================
   CONFIRMACIÓN ASISTENCIA
========================= */
function generarPersonas() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const contenedor = document.getElementById("personas");
  const btnConfirmar = document.getElementById("btnConfirmar");

  contenedor.innerHTML = "";
  btnConfirmar.style.display = "none"; // 🔒 se oculta siempre primero

  if (!cantidad || cantidad < 1) {
    alert("Ingresá una cantidad válida");
    return;
  }

  for (let i = 1; i <= cantidad; i++) {
    contenedor.innerHTML += `
      <div class="persona">
        <h3>Persona ${i}</h3>

        <label>Nombre y apellido</label>
        <input type="text" placeholder="Ej: Juan Pérez">

        <label>Menú</label>
        <select>
          <option value="Tradicional">Tradicional</option>
          <option value="Celíaco">Celíaco</option>
          <option value="Intolerante a la lactosa">Intolerante a la lactosa</option>
          <option value="Vegano">Vegano</option>
          <option value="Menú infantil">Menú infantil</option>
        </select>
      </div>
    `;
  }

  // ✅ si llegó hasta acá, mostramos el botón
  btnConfirmar.style.display = "block";
}


function enviarConfirmacion() {
  const cantidad = document.getElementById("cantidad").value;
  const personas = document.querySelectorAll(".persona");

  if (!cantidad) {
    alert("Por favor seleccioná la cantidad de personas");
    return;
  }

  let mensaje = `💍 Confirmación de asistencia 💍\n\n`;
  mensaje += `Cantidad de personas: ${cantidad}\n\n`;

  for (let i = 0; i < personas.length; i++) {
    const nombre = personas[i].querySelector("input").value;
    const menu = personas[i].querySelector("select").value;

    if (!nombre) {
      alert("Por favor completá todos los nombres");
      return;
    }

    mensaje += `Persona ${i + 1}:\n`;
    mensaje += `👤 Nombre: ${nombre}\n`;
    mensaje += `🍽 Menú: ${menu}\n\n`;
  }

  const telefono = "5491168916883"; // tu número
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}
