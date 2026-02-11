const API_URL = CONFIG.API_URL;
const SECRET = "K7xP9QmA4Zr2FvL8EwYB0dS6C1H5J";
const container = document.getElementById("players");

document.getElementById("export").onclick = async () => {
  await post({ action: "exportFinal" });
  alert("Final results exported");
};

document.getElementById("backToAdmin").onclick = () => {
  window.location.href = "admin.html";
};

async function loadPlayers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  container.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "player";

    div.innerHTML = `
  <strong>${p.Player}</strong>

  <div class="score-row">
    <input type="number" placeholder="Score">

    <button class="icon-btn add" title="Add score">＋</button>
    <button class="icon-btn undo" title="Undo last score">↺</button>
  </div>

  <div class="history">${p.History || ""}</div>
`;


    div.querySelector(".add").onclick = async () => {
      const score = div.querySelector("input").value;
      if (!score) return;
      await post({ action: "addScore", Player: p.Player, Score: score });
      loadPlayers();
    };

    div.querySelector(".undo").onclick = async () => {
      await post({ action: "undoScore", Player: p.Player });
      loadPlayers();
    };

    container.appendChild(div);
  });
}

async function post(data) {
  const fd = new FormData();
  fd.append("secret", SECRET);
  Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  await fetch(API_URL, { method: "POST", body: fd });
}

loadPlayers();


