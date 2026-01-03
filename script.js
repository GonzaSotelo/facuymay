// VIDEO INTRO
const video = document.getElementById("introVideo");
video.onended = () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("contenido").classList.remove("hidden");
};

// CUENTA REGRESIVA
const evento = new Date("2026-03-8T12:15:00").getTime();

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
