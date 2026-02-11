const API_URL = "https://script.google.com/macros/s/AKfycbx1AtF1uO25Iu8PxDcdGlwadUS9GXiI5oLHkVx5YO84Kc6KKO4FAVITuqOlOcHo0oL2/exec";

async function loadScores() {
    const res = await fetch(API_URL);
    let data = await res.json();

    // Convert Score to number and sort descending
    data = data
        .map(p => ({ ...p, Score: Number(p.Score) }))
        .sort((a, b) => b.Score - a.Score);

    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = "";

    data.forEach((player, index) => {
        const row = document.createElement("tr");

        if (index === 0) row.classList.add("leader");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.Player}</td>
            <td>${player.Score}</td>
        `;

        tbody.appendChild(row);
    });
}

// Initial load
loadScores();

// Auto update every 30 seconds
setInterval(loadScores, 30000);

