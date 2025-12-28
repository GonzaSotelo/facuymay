const startBtn = document.getElementById("startBtn");
const cover = document.getElementById("cover");
const main = document.getElementById("main");
const music = document.getElementById("bg-music");

const attendance = document.getElementById("attendance");
const extra = document.getElementById("extraFields");
const peopleInput = document.getElementById("people");
const peopleContainer = document.getElementById("peopleContainer");
const form = document.getElementById("weddingForm");
const thanks = document.getElementById("thanks");

/* Estado inicial */
thanks.classList.add("hidden");
extra.style.display = "none";

/* Inicio */
startBtn.addEventListener("click", () => {
  music.play();
  cover.style.display = "none";
  main.classList.remove("hidden");
});

/* Mostrar / ocultar extras */
attendance.addEventListener("change", () => {
  if (attendance.value === "Sí") {
    extra.style.display = "block";
  } else {
    extra.style.display = "none";
    peopleContainer.innerHTML = "";
  }
});

/* Generar personas dinámicamente */
peopleInput.addEventListener("input", () => {
  const count = parseInt(peopleInput.value);
  peopleContainer.innerHTML = "";

  if (isNaN(count) || count < 1) return;

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.classList.add("person");

    div.innerHTML = `
      <h4>Persona ${i}</h4>
      <input type="text" placeholder="Nombre y apellido" required />
      <select>
        <option value="Ninguna">Sin restricción</option>
        <option value="Vegetariano">Vegetariano</option>
        <option value="Celíaco">Celíaco</option>
        <option value="Intolerante a la lactosa">Intolerante a la lactosa</option>
      </select>
    `;

    peopleContainer.appendChild(div);
  }
});

/* Envío */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullname").value;
  const att = attendance.value;
  const song = document.getElementById("song").value || "-";

  let peopleText = "—";

  if (att === "Sí") {
    const persons = document.querySelectorAll(".person");
    peopleText = "";

    persons.forEach((p, i) => {
      const pname = p.querySelector("input").value;
      const food = p.querySelector("select").value;

      peopleText += `Persona ${i + 1}: ${pname} (${food})\n`;
    });
  }

  const msg = `
Hola! 💍
Confirmación de asistencia

Invitado: ${name}
¿Asiste?: ${att}

${peopleText ? "Personas:\n" + peopleText : ""}

Tema sugerido: ${song}
  `;

  thanks.classList.remove("hidden");

  setTimeout(() => {
    window.open(
      "https://wa.me/5491124081298?text=" + encodeURIComponent(msg),
      "_blank"
    );
  }, 1200);
});
