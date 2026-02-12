// ========= ELEMENTS =========
const container = document.getElementById("players");
const exportBtn = document.getElementById("export");
const backBtn = document.getElementById("backToAdmin");

// ========= STATE =========
let isProcessing = false;
let playerStates = {}; // Track individual player button states

// ========= EVENT HANDLERS =========
exportBtn.onclick = async () => {
  if (isProcessing) return;
  
  const confirmed = confirm("Export final results? This will save the game data.");
  if (!confirmed) return;
  
  isProcessing = true;
  setLoadingState(exportBtn, true);
  const originalText = exportBtn.textContent;
  exportBtn.textContent = "Exporting...";
  
  try {
    await apiPost({ action: "exportFinal" });
    exportBtn.textContent = "✅ Exported!";
    setTimeout(() => {
      exportBtn.textContent = originalText;
    }, 2000);
  } catch (error) {
    exportBtn.textContent = "❌ Failed";
    showError("Could not export results. Please try again.");
    setTimeout(() => {
      exportBtn.textContent = originalText;
    }, 2000);
  } finally {
    isProcessing = false;
    setLoadingState(exportBtn, false);
  }
};

backBtn.onclick = () => {
  const confirmed = confirm("Go back to admin? Make sure you've saved any changes.");
  if (confirmed) {
    window.location.href = "admin.html";
  }
};

// ========= LOAD PLAYERS =========
async function loadPlayers() {
  // Show loading state
  if (container.children.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:20px;">Loading players...</p>';
  }
  
  try {
    const data = await apiGet();
    
    if (!data || data.length === 0) {
      container.innerHTML = `
        <p style="text-align:center;color:var(--muted);padding:20px;">
          No players yet.<br>
          <a href="admin.html" style="color:var(--blue);text-decoration:underline;">Add players from the admin panel</a>
        </p>
      `;
      return;
    }
    
    renderPlayers(data);
  } catch (error) {
    container.innerHTML = `
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
  container.innerHTML = "";

  data.forEach(p => {
    const playerKey = p.Player;
    if (!playerStates[playerKey]) {
      playerStates[playerKey] = { isAdding: false, isUndoing: false };
    }

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
      
      try {
        await apiPost({ 
          action: "addScore", 
          Player: p.Player, 
          Score: validation.value 
        });
        input.value = "";
        await loadPlayers();
        
        // Re-focus the input for quick entry
        const newDiv = container.querySelector(`[data-player="${playerKey}"]`);
        if (newDiv) {
          newDiv.querySelector("input").focus();
        }
      } catch (error) {
        showError("Could not add score. Please try again.");
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
        await loadPlayers();
      } catch (error) {
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

    container.appendChild(div);
  });
}

// ========= UTILITY =========
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Make loadPlayers globally accessible for retry button
window.loadPlayers = loadPlayers;

// ========= INITIALIZATION =========
loadPlayers();
