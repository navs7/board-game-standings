// ========= CONSTANTS =========
const SECRET = "K7xP9QmA4Zr2FvL8EwYB0dS6C1H5J";
const REFRESH_INTERVAL = 3000; // 3 seconds
const MIN_SCORE = 0;
const MAX_SCORE = 1000;

// ⚠️ SECURITY WARNING: This secret is visible to anyone viewing your page source.
// For production, you should:
// 1. Move authentication to your Google Apps Script backend
// 2. Validate requests on the server side
// 3. Use proper authentication (OAuth, session tokens, etc.)

// ========= API HELPER =========
async function apiPost(data) {
  const fd = new FormData();
  fd.append("secret", SECRET);
  Object.entries(data).forEach(([k, v]) => fd.append(k, v));
  
  try {
    const response = await fetch(CONFIG.API_URL, { 
      method: "POST", 
      body: fd 
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

async function apiGet() {
  try {
    const response = await fetch(CONFIG.API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ========= VALIDATION =========
function validatePlayerName(name) {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { valid: false, error: "Please enter a player name" };
  }
  
  if (trimmed.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }
  
  if (trimmed.length > 30) {
    return { valid: false, error: "Name must be less than 30 characters" };
  }
  
  return { valid: true, value: trimmed };
}

function validateScore(score) {
  const trimmed = String(score).trim();
  
  if (!trimmed) {
    return { valid: false, error: "Please enter a score" };
  }
  
  const numScore = Number(trimmed);
  
  if (isNaN(numScore)) {
    return { valid: false, error: "Score must be a number" };
  }
  
  if (numScore < MIN_SCORE) {
    return { valid: false, error: `Score cannot be negative` };
  }
  
  if (numScore > MAX_SCORE) {
    return { valid: false, error: `Score cannot exceed ${MAX_SCORE}` };
  }
  
  return { valid: true, value: numScore };
}

// ========= UI HELPERS =========
function showError(message) {
  alert(`❌ ${message}`);
}

function showSuccess(message) {
  // You could replace this with a nicer toast notification
  console.log(`✅ ${message}`);
}

function setLoadingState(element, isLoading) {
  if (isLoading) {
    element.disabled = true;
    element.style.opacity = '0.6';
    element.style.cursor = 'wait';
  } else {
    element.disabled = false;
    element.style.opacity = '1';
    element.style.cursor = 'pointer';
  }
}
