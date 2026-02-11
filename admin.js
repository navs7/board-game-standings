const ADMIN_PASSWORD = "Neet4869"; // change this

const entered = prompt("Enter admin password:");
if (entered !== ADMIN_PASSWORD) {
    document.body.innerHTML = "<h2>Access denied</h2>";
    throw new Error("Unauthorized");
}

const API_URL = "https://script.google.com/macros/s/AKfycbwp9vsvIKOuSRixbQzbzZLgn7bebmEHo0EsqnsFHMWcHKv87bjGnolBBy30-Xnoym2L/exec";

const form = document.getElementById("scoreForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const Player = document.getElementById("player").value.trim();
    const Score = Number(document.getElementById("score").value);

    statusEl.textContent = "Saving...";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                secret: "K7xP9QmA4Zr2FvL8EwYB0dS6C1H5J",
                Player,Score
            })

        //     body: JSON.stringify({ Player, Score })
        // });

        const data = await res.json();
        statusEl.textContent = data.message;

        form.reset();
    } catch (err) {
        statusEl.textContent = "Error saving score";
    }
});



