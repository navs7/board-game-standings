const API_URL = "https://script.google.com/macros/s/AKfycbwp9vsvIKOuSRixbQzbzZLgn7bebmEHo0EsqnsFHMWcHKv87bjGnolBBy30-Xnoym2L/exec";

const SECRET_KEY = "K7xP9QmA4Zr2FvL8EwYB0dS6C1H5J";

const form = document.getElementById("scoreForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const Player = document.getElementById("player").value.trim();
    const Score = document.getElementById("score").value;

    if (!Player || Score === "") {
        statusEl.textContent = "Invalid input";
        return;
    }

    statusEl.textContent = "Saving...";

    // ✅ Use FormData (NO preflight, NO CORS issue)
    const formData = new FormData();
    formData.append("secret", SECRET_KEY);
    formData.append("Player", Player);
    formData.append("Score", Score);

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        statusEl.textContent = data.message || "Saved";
        form.reset();

    } catch (err) {
        console.error(err);
        statusEl.textContent = "Network error";
    }
});
