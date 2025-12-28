const startBtn = document.getElementById("startBtn");
const cover = document.getElementById("cover");
const main = document.getElementById("main");
const music = document.getElementById("bg-music");

startBtn.addEventListener("click", () => {
  music.play();
  cover.style.display = "none";
  main.classList.remove("hidden");
});
