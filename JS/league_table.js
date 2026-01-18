fetch('/league_clubs.json/league_table.json')
  .then(res => res.json())
  .then(data => {
    /* document.getElementById('league-title').textContent =
       `${data.league.name} (${data.league.season})`;
    */
    const tbody = document.getElementById('table-body');

    data.standings.forEach(team => {
      const row = document.createElement('tr');
      row.className = 'table-row';

      /* const formHTML = team.form.map(f => `<div class="${f}">${f}</div>`).join(''); */

      row.innerHTML = `
        <td>${team.position}</td>
        <td>
          <img src="${team.logo}" alt="${team.team} logo">
          <h3>${team.team}</h3>
        </td>
        <td>${team.played}</td>
        <td>${team.won}</td>
        <td>${team.drawn}</td>
        <td>${team.lost}</td>
        <td>${team.gf}</td>
        <td>${team.ga}</td>
        <td>${team.gd}</td>
        <td><strong>${team.points}</strong></td>
        <td class="next"><img src="${team.next}" alt="club-logo" class="next"></td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => console.error('Error loading league data:', err));
; 


