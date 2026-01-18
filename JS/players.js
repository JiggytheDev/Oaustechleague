


/* fetch('/league_clubs.json/clubsContainer.json')
 .then(res => res.json())
 .then(data => {
    const clubsContainer = document.getElementById("clubsContainer");

    data.clubs.forEach(club => {
    const div = document.createElement("div");
    div.className = "clubs";
    div.classList.add("clubs");

    div.innerHTML = `
      <label for="${club.id}">
        <img src="${club.image}" alt="${club.name}">
        ${club.name}
      </label>
      <input type="checkbox" id="${club.id}" data-name="${club.name}" data-img="${club.image}">
    `;

    clubsContainer.appendChild(div);
    });
 })
; */

document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("showClubs").addEventListener("click", (event) => {
        const showClubs = document.getElementById("clubSlideIn");
        const showPositions = document.getElementById("Positions");
        showPositions.classList.add("hide");
        showClubs.classList.add("show");
        showClubs.classList.remove("hide"); 
      });

      document.getElementById("showPositions").addEventListener("click", (event) => {
          const showClubs = document.getElementById("clubSlideIn");
          const showPositions = document.getElementById("Positions");

          showClubs.classList.add("hide");
          showPositions.classList.add("show");
          showPositions.classList.remove("hide");
      });

      const closePanel = () => {
        const showClubs = document.getElementById("clubSlideIn");
        showClubs.classList.add("hide");
      };

      const closePositionPanel = () => {
        const showedClubs = document.getElementById("Positions");
        const showClubs = document.getElementById("clubSlideIn");
        showClubs.classList.add("hide");
        showedClubs.classList.add("hide");
      }

      document.getElementById("closeBtn").addEventListener("click", (event) => {
        closePositionPanel();
      });

      document.getElementById("closePositions").addEventListener("click", () => {
        closePositionPanel();
      });

      const clubs = [
        { name: "Dreco United", image: "/assets/images/dreco united.jpg", id: "Dreco United" },
        { name: "Empire FC", image: "/assets/images/empire fc.jpg", id: "Empire FC" },
        { name: "Expensive FC", image: "/assets/images/expensive fc.jpg", id: "Expensive FC" },
        { name: "Golden Arrows", image: "/assets/images/golden arrows.jpg", id: "Golden Arrows" },
        { name: "Legend FC", image: "/assets/images/legends fc.jpg", id: "Legend FC" },
        { name: "Rising Star FC", image: "/assets/images/rising star.jpg", id: "Rising Star FC" },
        { name: "Strikers United", image: "/assets/images/strikers united.jpg", id: "Strikers United" },
        { name: "Super Ballers", image: "/assets/images/super ballers fc.jpg", id: "Super Ballers" },
        { name: "YDC FC", image: "/assets/images/ydc fc.jpg", id: "YDC FC" }
      ];

      const clubsContainer = document.getElementById("clubsContainer");
      const tbody = document.getElementById("table-body");

      // Render checkboxes
      clubs.forEach(club => {
        const div = document.createElement("div");
        div.classList.add("club");
        div.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;">
            <img src="${club.image}" alt="">
            <label>${club.name}</label>
          </div>
          <input type="checkbox" value="${club.id}">
        `;
        clubsContainer.appendChild(div);
      });

      let allPlayers = [];

      // Fetch JSON once
      fetch('/league_clubs.json/players_display.json')
        .then(res => res.json())
        .then(data => {
          allPlayers = data.players;
        })
        .catch(err => console.error('Error loading league data:', err));

      // Listen for checkbox changes
      clubsContainer.addEventListener("change", () => {
        const selectedClubs = Array.from(document.querySelectorAll('.club input:checked')).map(cb => cb.value);
        const filteredPlayers = allPlayers.filter(p => selectedClubs.includes(p.clubname));

        tbody.innerHTML = ""; // clear table first

        filteredPlayers.forEach(team => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td class="player-profile">
              <img src="${team.image}" alt="">
              <h2>${team.playerName}</h2>
            </td>
            <td class="team-cell">
              <img src="${team.clublogo}" alt="logo">
              ${team.clubname}
            </td>
            <td>${team.position}</td>
            <td>${team.Nationality}</td>
          `;
          tbody.appendChild(row);
        });
      });
    });