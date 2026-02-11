const API_URL = "https://script.google.com/macros/s/AKfycbwp9vsvIKOuSRixbQzbzZLgn7bebmEHo0EsqnsFHMWcHKv87bjGnolBBy30-Xnoym2L/exec";

// 🔑 MUST MATCH the SECRET in Google Apps Script
const SECRET_KEY = "K7xP9QmA4Zr2FvL8EwYB0dS6C1H5J";

const form = document.getElementById("scoreForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const Player = document.getElementById("player").value.trim();
    const Score = Number(document.getElementById("score").value);

    if (!Player || isNaN(Score)) {
        statusEl.textContent = "Invalid player or score";
        return;
    }

    statusEl.textContent = "Saving...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                secret: SECRET_KEY,
                Player: Player,
                Score: Score
            })
        });

        const result = await response.json();

        if (result.status === "ok") {
            statusEl.textContent = result.message;
            form.reset();
        } else {
            statusEl.textContent = "Unauthorized or error";
        }

    } catch (error) {
        console.error(error);
        statusEl.textContent = "Network error";
    }
});
