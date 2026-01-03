// VIDEO INTRO
const video = document.getElementById("introVideo");
video.onended = () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("contenido").classList.remove("hidden");
};

const musica = document.getElementById("musica");
const musicBtn = document.getElementById("musicBtn");

let musicaIniciada = false;

// Inicia música en la primera interacción
function iniciarMusica() {
  if (!musicaIniciada) {
    musica.play().then(() => {
      musicaIniciada = true;
      musicBtn.textContent = "🔊";
    });
  }
}

// Detecta cualquier interacción inicial
document.addEventListener("click", iniciarMusica, { once: true });
document.addEventListener("touchstart", iniciarMusica, { once: true });

// Botón play / pause
function toggleMusic() {
  if (musica.paused) {
    musica.play();
    musicBtn.textContent = "🔊";
  } else {
    musica.pause();
    musicBtn.textContent = "🔇";
  }
}


// CUENTA REGRESIVA
const evento = new Date("2026-03-08T12:15:00").getTime();

setInterval(() => {
  const ahora = new Date().getTime();
  const diff = evento - ahora;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const min = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("countdown").innerHTML =
    `${dias} días ${horas} hs ${min} min`;
}, 1000);

// MODAL
function abrirModal() {
  document.getElementById("modal").classList.add("show");
}

function cerrarModal() {
  document.getElementById("modal").classList.remove("show");
}

function generarPersonas() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const contenedor = document.getElementById("personas");

  contenedor.innerHTML = "";

  if (!cantidad || cantidad < 1) return;

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

  personas.forEach((persona, index) => {
    const nombre = persona.querySelector("input").value;
    const menu = persona.querySelector("select").value;

    if (!nombre) {
      alert("Por favor completá todos los nombres");
      throw new Error();
    }

    mensaje += `Persona ${index + 1}:\n`;
    mensaje += `👤 Nombre: ${nombre}\n`;
    mensaje += `🍽 Menú: ${menu}\n\n`;
  });

  const telefono = "5491168916883"; // 👈 TU NÚMERO
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}
