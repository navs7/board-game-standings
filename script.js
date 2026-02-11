const API_URL = CONFIG.API_URL;
const board = document.getElementById("board");

async function loadScores() {
  const res = await fetch(API_URL);
  let data = await res.json();

  // 🔢 Sort by score (descending)
  data.sort((a, b) => b.Score - a.Score);

  // Remove old rows (keep header)
  board.querySelectorAll(".row:not(.header)").forEach(r => r.remove());

  data.forEach((p, index) => {
    const row = document.createElement("div");
    row.className = "row";

    if (index === 0) row.classList.add("leader");

    row.innerHTML = `
      <span>${index + 1}</span>
      <span>${p.Player}</span>
      <span>${p.Score}</span>
    `;

    board.appendChild(row);
  });
}

setInterval(loadScores, 3000);
loadScores();
