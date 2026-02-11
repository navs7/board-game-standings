const ADMIN_PASSWORD = "Neet4869"; // change this

const entered = prompt("Enter admin password:");
if (entered !== ADMIN_PASSWORD) {
    document.body.innerHTML = "<h2>Access denied</h2>";
    throw new Error("Unauthorized");
}

const API_URL = "https://script.google.com/macros/s/AKfycbwk2_pehOgFZseDyyfmzuugfvdd6_ezytb6865TlC43pIf5ktmIUnvRkPPYQUhoX1om/exec";

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
            body: JSON.stringify({ Player, Score })
        });

        const data = await res.json();
        statusEl.textContent = data.message;

        form.reset();
    } catch (err) {
        statusEl.textContent = "Error saving score";
    }
});

