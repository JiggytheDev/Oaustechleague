/* fetch('/league_clubs.json/goals_stats.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("goalStats");

    data.statistics.forEach(team => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="pos-cell">
              <h6>${team.position}</h6>
              <div class="team-cell">
                <img src="${team.playericon}" alt="">
                <div class="wrap">
                  <h1>${team.name}</h1>
                  <h4>${team.club}</h4>
                </div> 
              </div>
            </td>
            <h1>${team.goals}</h1>
        `;

        tbody.append(row);
    });
  })
  .catch(err => console.error('Error loading league data:', err));
;


fetch('/league_clubs.json/assists_stats.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("assistStats");

    data.statistics.forEach(team => {
        const row = document.createElement('tr');
        

        row.innerHTML = `
          <td class="pos-cell">
              <h6>${team.position}</h6>
              <div class="team-cell">
                <img src="${team.playerimg}" alt="">
                <div class="wrap">
                  <h1>${team.name}</h1>
                  <h4>${team.club}</h4>
                </div> 
              </div>
            </td>
            <h1>${team.assists}</h1>
        `;

        tbody.append(row);
    });
  })
  .catch(err => console.error('Error loading league data:', err));
; 

fetch('/league_clubs.json/team_goals.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("teamGoalsStats");

    data.statistics.forEach(team => {
        const row = document.createElement('tr');
        

        row.innerHTML = `
          <td class="pos-cell">
              <h6>${team.position}</h6>
              <div class="team-cell">
                <img src="${team.clubLogo}" alt="">
                <div class="wrap">
                  <h1>${team.club}</h1>
                </div> 
              </div>
          </td>
          <h1>${team.goals}</h1>
        `;

        tbody.append(row);
    });
  })
  .catch(err => console.error('Error loading league data:', err));
; 

fetch('/league_clubs.json/goalie_stats.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("cleanSheetStats");

    data.statistics.forEach(team => {
        const row = document.createElement('tr');
        

        row.innerHTML = `
          <td class="pos-cell">
              <h6>${team.position}</h6>
              <div class="team-cell">
                <img src="${team.playericon}" alt="">
                <div class="wrap">
                  <h1>${team.name}</h1>
                  <h4>${team.club}</h4>
                </div> 
              </div>
            </td>
            <h1>${team.cleansheets}</h1>
        `;

        tbody.append(row);
    });
  })
  .catch(err => console.error('Error loading league data:', err));
;   */

// playerStats.js

export function calculatePlayerStats(matches, players) {
  const stats = {};

  // Initialize stats for all players
  players.forEach(player => {
    stats[player.id] = {
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    };
  });

  // Process match events
  matches.forEach(match => {
    if (!match.events) return;

    match.events.forEach(event => {
      const { type, playerId, assistId } = event;

      if (!stats[playerId]) return;

      switch (type) {
        case "goal":
          stats[playerId].goals++;

          if (assistId && stats[assistId]) {
            stats[assistId].assists++;
          }
          break;

        case "yellow":
          stats[playerId].yellowCards++;
          break;

        case "red":
          stats[playerId].redCards++;
          break;
      }
    });
  });

  return stats;
}
