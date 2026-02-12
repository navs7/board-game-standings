// ========= ELEMENTS =========
const statusEl = document.getElementById("status");
const startSection = document.getElementById("startSection");
const playerSection = document.getElementById("playerSection");
const gameSection = document.getElementById("gameSection");
const startGameBtn = document.getElementById("startGame");
const addPlayerBtn = document.getElementById("addPlayer");
const playerNameInput = document.getElementById("playerName");
const resetGameBtn = document.getElementById("resetGame");
const exportBtn = document.getElementById("export");
const playersContainer = document.getElementById("players");

// ========= STATE =========
let isProcessing = false;
let playerStates = {}; // Track individual player button states
let autoRefreshInterval = null;

// ========= START NEW GAME =========
startGameBtn.onclick = async () => {
  if (isProcessing) return;
  
  const confirmed = confirm("Start a new game? This will reset all current scores.");
  if (!confirmed) return;
  
  isProcessing = true;
  setLoadingState(startGameBtn, true);
  statusEl.textContent = "Starting new game...";
  statusEl.style.color = "var(--muted)";
  
  try {
    await apiPost({ action: "reset" });
    
    // Update UI
    startSection.style.display = "none";
    playerSection.style.display = "block";
    gameSection.style.display = "none";
    
    statusEl.textContent = "✅ New game started! Add players below.";
    statusEl.style.color = "var(--green)";
    playerNameInput.focus();
    
    // Stop auto-refresh if running
    if (autoRefreshInterval) {
      clearInterval(autoRefreshInterval);
      autoRefreshInterval = null;
    }
  } catch (error) {
    statusEl.textContent = "❌ Failed to start game. Please try again.";
    statusEl.style.color = "var(--red)";
    showError("Could not start new game. Please check your connection.");
  } finally {
    isProcessing = false;
    setLoadingState(startGameBtn, false);
  }
};

// ========= ADD PLAYER =========
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
    
    // Load players and show game section
    await loadPlayers();
    
    // Show game section after first player is added
    gameSection.style.display = "block";
    
    // Start auto-refresh
    if (!autoRefreshInterval) {
      autoRefreshInterval = setInterval(loadPlayers, REFRESH_INTERVAL);
    }
  } catch (error) {
    statusEl.textContent = `❌ Failed to add ${validation.value}`;
    statusEl.style.color = "var(--red)";
    showError("Could not add player. Please try again.");
  } finally {
    isProcessing = false;
    setLoadingState(addPlayerBtn, false);
  }
};

// ========= RESET GAME =========
resetGameBtn.onclick = () => {
  const confirmed = confirm("Start a new game? This will reset everything.");
  if (confirmed) {
    startGameBtn.click();
  }
};

// ========= EXPORT RESULTS =========
exportBtn.onclick = async () => {
  if (isProcessing) return;
  
  const confirmed = confirm("Export final results? This will save the game data to a new timestamped sheet.");
  if (!confirmed) return;
  
  isProcessing = true;
  setLoadingState(exportBtn, true);
  const originalText = exportBtn.textContent;
  exportBtn.textContent = "Exporting...";
  
  try {
    // Create timestamp for sheet name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5); // Format: 2026-02-12T10-30-45
    const sheetName = `Game_${timestamp}`;
    
    await apiPost({ 
      action: "exportFinal",
      timestamp: timestamp,
      sheetName: sheetName
    });
    
    exportBtn.textContent = "✅ Exported!";
    statusEl.textContent = `✅ Results exported to sheet: ${sheetName}`;
    statusEl.style.color = "var(--green)";
    
    setTimeout(() => {
      exportBtn.textContent = originalText;
    }, 3000);
  } catch (error) {
    exportBtn.textContent = "❌ Failed";
    statusEl.textContent = "❌ Export failed";
    statusEl.style.color = "var(--red)";
    showError("Could not export results. Please try again.");
    
    setTimeout(() => {
      exportBtn.textContent = originalText;
    }, 2000);
  } finally {
    isProcessing = false;
    setLoadingState(exportBtn, false);
  }
};

// ========= LOAD PLAYERS =========
async function loadPlayers() {
  // Show loading state only if container is empty
  if (playersContainer.children.length === 0) {
    playersContainer.innerHTML = '<p style="text-align:center;color:var(--muted);padding:20px;">Loading players...</p>';
  }
  
  try {
    const data = await apiGet();
    
    if (!data || data.length === 0) {
      playersContainer.innerHTML = `
        <p style="text-align:center;color:var(--muted);padding:20px;">
          No players yet. Add players above to start!
        </p>
      `;
      return;
    }
    
    renderPlayers(data);
  } catch (error) {
    playersContainer.innerHTML = `
      <p style="text-align:center;color:var(--red);padding:20px;">
        ❌ Failed to load players.<br>
        <button onclick="loadPlayers()" style="margin-top:10px;padding:8px 16px;background:var(--blue);border:none;border-radius:8px;color:white;cursor:pointer;">
          Retry
        </button>
      </p>
    `;
    console.error('Failed to load players:', error);
  }
}

// ========= RENDER PLAYERS =========
function renderPlayers(data) {
  // Store current focus and values
  const activeElement = document.activeElement;
  const isInputFocused = activeElement && activeElement.tagName === 'INPUT' && activeElement.type === 'number';
  const focusedPlayer = isInputFocused ? activeElement.closest('.player')?.getAttribute('data-player') : null;
  const focusedValue = isInputFocused ? activeElement.value : null;

  // Get existing player cards
  const existingCards = {};
  playersContainer.querySelectorAll('.player').forEach(card => {
    const playerKey = card.getAttribute('data-player');
    existingCards[playerKey] = card;
  });

  // Update or create player cards
  data.forEach((p, index) => {
    const playerKey = p.Player;
    if (!playerStates[playerKey]) {
      playerStates[playerKey] = { isAdding: false, isUndoing: false };
    }

    let div = existingCards[playerKey];
    
    if (div) {
      // Update existing card - only update history, don't touch inputs
      const historyEl = div.querySelector('.history');
      if (historyEl) {
        historyEl.textContent = p.History || "No scores yet";
      }
      
      // Remove from existingCards so we know it's been processed
      delete existingCards[playerKey];
    } else {
      // Create new card
      div = createPlayerCard(p, playerKey);
      playersContainer.appendChild(div);
    }
  });

  // Remove cards for players that no longer exist
  Object.values(existingCards).forEach(card => {
    card.remove();
  });

  // Restore focus and value if input was focused
  if (focusedPlayer && focusedValue !== null) {
    const playerCard = playersContainer.querySelector(`[data-player="${focusedPlayer}"]`);
    if (playerCard) {
      const input = playerCard.querySelector('input');
      if (input) {
        input.value = focusedValue;
        input.focus();
        // Restore cursor position to end
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  }
}

// ========= CREATE PLAYER CARD =========
function createPlayerCard(p, playerKey) {
  const div = document.createElement("div");
  div.className = "player";
  div.setAttribute("data-player", playerKey);

  div.innerHTML = `
    <strong>${escapeHtml(p.Player)}</strong>

    <div class="score-row">
      <input 
        type="number" 
        placeholder="Score"
        min="0"
        step="1"
        aria-label="Score for ${escapeHtml(p.Player)}"
      >

      <button 
        class="icon-btn add" 
        title="Add score"
        aria-label="Add score for ${escapeHtml(p.Player)}"
      >
        ＋
      </button>
      <button 
        class="icon-btn undo" 
        title="Undo last score"
        aria-label="Undo last score for ${escapeHtml(p.Player)}"
      >
        ↺
      </button>
    </div>

    <div class="history">${p.History || "No scores yet"}</div>
  `;

  const input = div.querySelector("input");
  const addBtn = div.querySelector(".add");
  const undoBtn = div.querySelector(".undo");

  // Add score handler
  addBtn.onclick = async () => {
    if (playerStates[playerKey].isAdding) return;
    
    const score = input.value;
    const validation = validateScore(score);
    
    if (!validation.valid) {
      showError(validation.error);
      input.focus();
      return;
    }
    
    playerStates[playerKey].isAdding = true;
    setLoadingState(addBtn, true);
    
    // Add loading animation to the player card
    const playerCard = div;
    playerCard.classList.add('loading');
    
    // Show loading spinner in the add button
    const originalContent = addBtn.innerHTML;
    addBtn.innerHTML = '<span class="spinner"></span>';
    
    try {
      await apiPost({ 
        action: "addScore", 
        Player: p.Player, 
        Score: validation.value 
      });
      
      statusEl.textContent = `✅ Score added for ${p.Player}`;
      statusEl.style.color = "var(--green)";
      
      input.value = "";
      await loadPlayers();
      
      // Re-focus the input for quick entry
      const newDiv = playersContainer.querySelector(`[data-player="${playerKey}"]`);
      if (newDiv) {
        newDiv.querySelector("input").focus();
      }
    } catch (error) {
      statusEl.textContent = `❌ Failed to add score`;
      statusEl.style.color = "var(--red)";
      showError("Could not add score. Please try again.");
      
      // Restore button content on error
      addBtn.innerHTML = originalContent;
      playerCard.classList.remove('loading');
    } finally {
      playerStates[playerKey].isAdding = false;
      setLoadingState(addBtn, false);
    }
  };

  // Undo score handler
  undoBtn.onclick = async () => {
    if (playerStates[playerKey].isUndoing) return;
    
    if (!p.History || p.History.trim() === "") {
      showError("No scores to undo");
      return;
    }
    
    playerStates[playerKey].isUndoing = true;
    setLoadingState(undoBtn, true);
    
    try {
      await apiPost({ action: "undoScore", Player: p.Player });
      
      statusEl.textContent = `↺ Undid last score for ${p.Player}`;
      statusEl.style.color = "var(--blue)";
      
      await loadPlayers();
    } catch (error) {
      statusEl.textContent = `❌ Failed to undo score`;
      statusEl.style.color = "var(--red)";
      showError("Could not undo score. Please try again.");
    } finally {
      playerStates[playerKey].isUndoing = false;
      setLoadingState(undoBtn, false);
    }
  };

  // Enter key to add score
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  return div;
}

// ========= UTILITY =========
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Make loadPlayers globally accessible for retry button
window.loadPlayers = loadPlayers;

// ========= KEYBOARD SHORTCUTS =========
playerNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addPlayerBtn.click();
  }
});

// ========= INITIALIZATION =========
// Check if there's already a game in progress on page load
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await apiGet();
    
    if (data && data.length > 0) {
      // Game already in progress
      startSection.style.display = "none";
      playerSection.style.display = "block";
      gameSection.style.display = "block";
      
      await loadPlayers();
      
      // Start auto-refresh
      autoRefreshInterval = setInterval(loadPlayers, REFRESH_INTERVAL);
    }
  } catch (error) {
    // No game in progress or error - show start screen
    console.log('No existing game found');
  }
});

// ========= CLEANUP =========
// Stop auto-refresh when page is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden && autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
  } else if (!document.hidden && gameSection.style.display !== "none") {
    // Resume auto-refresh if game section is visible
    if (!autoRefreshInterval) {
      loadPlayers(); // Immediate refresh
      autoRefreshInterval = setInterval(loadPlayers, REFRESH_INTERVAL);
    }
  }
});
