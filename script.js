const API_URL = CONFIG.API_URL;
const board = document.getElementById("board");

async function loadScores() {
  const res = await fetch(API_URL);
  const data = await res.json();

  board.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p.Player}: ${p.Score}`;
    board.appendChild(div);
  });
}

setInterval(loadScores, 3000);
loadScores();
