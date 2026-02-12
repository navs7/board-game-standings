// ========= ELEMENTS =========
const board = document.getElementById("board");

// ========= STATE =========
let lastData = null;
let isFirstLoad = true;

// ========= LOAD SCORES =========
async function loadScores() {
  try {
    const data = await apiGet();
    
    // Sort by score (descending)
    data.sort((a, b) => b.Score - a.Score);
    
    // Only update if data has changed
    if (JSON.stringify(data) === JSON.stringify(lastData)) {
      return;
    }
    
    lastData = data;
    renderLeaderboard(data);
    
    if (isFirstLoad) {
      isFirstLoad = false;
    }
  } catch (error) {
    console.error('Failed to load scores:', error);
    
    // Only show error on first load
    if (isFirstLoad) {
      showErrorState();
    }
  }
}

// ========= RENDER LEADERBOARD =========
function renderLeaderboard(data) {
  // Remove old rows (keep header)
  board.querySelectorAll(".row:not(.header)").forEach(r => r.remove());
  
  if (data.length === 0) {
    const emptyRow = document.createElement("div");
    emptyRow.className = "row";
    emptyRow.style.gridColumn = "1 / -1";
    emptyRow.style.textAlign = "center";
    emptyRow.style.color = "var(--muted)";
    emptyRow.textContent = "No players yet";
    board.appendChild(emptyRow);
    return;
  }

  data.forEach((p, index) => {
    const row = document.createElement("div");
    row.className = "row";

    // Highlight leader
    if (index === 0) {
      row.classList.add("leader");
    }

    row.innerHTML = `
      <span>${index + 1}</span>
      <span>${escapeHtml(p.Player)}</span>
      <span>${p.Score}</span>
    `;

    board.appendChild(row);
  });
}

// ========= ERROR STATE =========
function showErrorState() {
  board.querySelectorAll(".row:not(.header)").forEach(r => r.remove());
  
  const errorRow = document.createElement("div");
  errorRow.className = "row";
  errorRow.style.gridColumn = "1 / -1";
  errorRow.style.textAlign = "center";
  errorRow.style.color = "var(--red)";
  errorRow.innerHTML = `
    Failed to load scores<br>
    <button 
      onclick="loadScores(); location.reload();" 
      style="margin-top:10px;padding:6px 12px;background:var(--blue);border:none;border-radius:6px;color:white;cursor:pointer;font-size:0.85rem;"
    >
      Retry
    </button>
  `;
  board.appendChild(errorRow);
}

// ========= UTILITY =========
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========= INITIALIZATION =========
// Initial load
loadScores();

// Auto-refresh every 3 seconds
setInterval(loadScores, REFRESH_INTERVAL);

// Visibility API - pause updates when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    loadScores(); // Refresh immediately when tab becomes visible
  }
});
