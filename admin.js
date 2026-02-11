const API_URL = CONFIG.API_URL;
const SECRET = "K7xP9QmA4Zr2FvL8EwYB0dS6C1H5J";

const statusEl = document.getElementById("status");
const section = document.getElementById("playerSection");

document.getElementById("startGame").onclick = async () => {
  await post({ action: "reset" });
  section.style.display = "block";
  statusEl.textContent = "New game started";
};

document.getElementById("addPlayer").onclick = async () => {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return;

  await post({ action: "addPlayer", Player: name });
  statusEl.textContent = `Added ${name}`;
  document.getElementById("playerName").value = "";
};

document.getElementById("go").onclick = () => {
  window.location.href = "current.html";
};

async function post(data) {
  const fd = new FormData();
  fd.append("secret", SECRET);
  Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  await fetch(API_URL, { method: "POST", body: fd });
}
