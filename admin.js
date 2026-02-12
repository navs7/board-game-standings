// ========= ELEMENTS =========
const statusEl = document.getElementById("status");
const section = document.getElementById("playerSection");
const startGameBtn = document.getElementById("startGame");
const addPlayerBtn = document.getElementById("addPlayer");
const playerNameInput = document.getElementById("playerName");
const goBtn = document.getElementById("go");

// ========= STATE =========
let isProcessing = false;

// ========= EVENT HANDLERS =========
startGameBtn.onclick = async () => {
  if (isProcessing) return;
  
  const confirmed = confirm("Start a new game? This will reset all current scores.");
  if (!confirmed) return;
  
  isProcessing = true;
  setLoadingState(startGameBtn, true);
  statusEl.textContent = "Starting new game...";
  
  try {
    await apiPost({ action: "reset" });
    section.style.display = "block";
    statusEl.textContent = "✅ New game started! Add players below.";
    statusEl.style.color = "var(--green)";
    playerNameInput.focus();
  } catch (error) {
    statusEl.textContent = "❌ Failed to start game. Please try again.";
    statusEl.style.color = "var(--red)";
    showError("Could not start new game. Please check your connection.");
  } finally {
    isProcessing = false;
    setLoadingState(startGameBtn, false);
  }
};

addPlayerBtn.onclick = async () => {
  if (isProcessing) return;
  
  const name = playerNameInput.value;
  const validation = validatePlayerName(name);
  
  if (!validation.valid) {
    showError(validation.error);
    playerNameInput.focus();
    return;
  }
  
  isProcessing = true;
  setLoadingState(addPlayerBtn, true);
  statusEl.textContent = `Adding ${validation.value}...`;
  statusEl.style.color = "var(--muted)";
  
  try {
    await apiPost({ action: "addPlayer", Player: validation.value });
    statusEl.textContent = `✅ Added ${validation.value}`;
    statusEl.style.color = "var(--green)";
    playerNameInput.value = "";
    playerNameInput.focus();
  } catch (error) {
    statusEl.textContent = `❌ Failed to add ${validation.value}`;
    statusEl.style.color = "var(--red)";
    showError("Could not add player. Please try again.");
  } finally {
    isProcessing = false;
    setLoadingState(addPlayerBtn, false);
  }
};

goBtn.onclick = () => {
  window.location.href = "current.html";
};

// ========= KEYBOARD SHORTCUTS =========
playerNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addPlayerBtn.click();
  }
});

// ========= INITIALIZATION =========
// Focus the player name input if section is visible
if (section.style.display !== "none") {
  playerNameInput.focus();
}
