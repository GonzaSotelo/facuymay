const startBtn=document.getElementById("startBtn");
const cover=document.getElementById("cover");
const main=document.getElementById("main");
const music=document.getElementById("bg-music");

startBtn.onclick=()=>{
  music.play();
  cover.style.display="none";
  main.classList.remove("hidden");
};

const attendance=document.getElementById("attendance");
const extra=document.getElementById("extraFields");

attendance.onchange=()=>{
  extra.style.display = attendance.value==="Sí" ? "block" : "none";
};

const form=document.getElementById("weddingForm");
const thanks=document.getElementById("thanks");

form.onsubmit=e=>{
  e.preventDefault();

  const name=document.getElementById("fullname").value;
  const att=attendance.value;
  const people=document.getElementById("people").value || "-";
  const song=document.getElementById("song").value || "-";

  const foods=[...document.querySelectorAll('.checkbox-group input:checked')]
    .map(i=>i.value).join(", ") || "Ninguna";

  const msg=`Hola! 💍
Nombre: ${name}
¿Asiste?: ${att}
Cantidad: ${people}
Restricciones: ${foods}
Tema sugerido: ${song}`;

  thanks.classList.remove("hidden");

  setTimeout(()=>{
    window.open(
      "https://wa.me/5491124081298?text="+encodeURIComponent(msg),
      "_blank"
    );
  },1200);
};
