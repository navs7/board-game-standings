const API_URL = "https://script.google.com/macros/s/AKfycbwk2_pehOgFZseDyyfmzuugfvdd6_ezytb6865TlC43pIf5ktmIUnvRkPPYQUhoX1om/exec";

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


