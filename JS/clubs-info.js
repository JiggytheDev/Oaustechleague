/* fetch('/league_clubs.json/clubs_info.json')
  .then(res => res.json())
  .then(data => {
      const club = data.clubs[0];

      const midfielders = club.players.filter(p => p.position === "Midfielder");
      const container = document.getElementById("test-display-midfield");
      
      container.innerHTML = midfielders.map(player => `
            <div class="playerDetails">
              <img src="${player.playerImg}">
              <div class="playerDept">
                <h3>${player.name}<h3>
                <h6>${player.Department}</h6>
              </div>
              
            </div>
            
        `).join('');
  })
  .catch(err => console.log(err));
; 

fetch('/league_clubs.json/clubs_info.json')
  .then(res => res.json())
  .then(data => {
      const club = data.clubs[0];

      const defender = club.players.filter(p => p.position === "Defender");
      const container = document.getElementById("test-display-defence");
      
      container.innerHTML = defender.map(player => `
            <div class="playerDetails">
              <img src="${player.playerImg}">
              <div class="playerDept">
                <h3>${player.name}<h3>
                <h6>${player.Department}</h6>
              </div>
              
            </div>
            
        `).join('');
  })
  .catch(err => console.log(err));
; 

fetch('/league_clubs.json/clubs_info.json')
  .then(res => res.json())
  .then(data => {
      const club = data.clubs[0];

      const goalie = club.players.filter(p => p.position === "Goalkeeper");
      const container = document.getElementById("test-display-goalie");
      
      container.innerHTML = goalie.map(player => `
            <div class="playerDetails">
              <img src="${player.playerImg}">
              <div class="playerDept">
                <h3>${player.name}<h3>
                <h6>${player.Department}</h6>
              </div>
              
            </div>
            
        `).join('');
  })
  .catch(err => console.log(err));
; 

fetch('/league_clubs.json/clubs_info.json')
  .then(res => res.json())
  .then(data => {
      const club = data.clubs[0];

      const forward = club.players.filter(p => p.position === "Forward");
      const container = document.getElementById("test-display-forward");
      
      container.innerHTML = forward.map(player => `
            <div class="playerDetails">
              <img src="${player.playerImg}">
              <div class="playerDept">
                <h3>${player.name}<h3>
                <h6>${player.Department}</h6>
              </div>
              
            </div>
            
        `).join('');
  })
  .catch(err => console.log(err));
;  */

fetch('/league_clubs.json/clubs.json')
  .then(res => res.json())
  .then(data => {
    const id = localStorage.getItem('selectedClubId');
    const club = data.clubs.find(c => c.id == id);

    displayClubInfo(club);
  });

  function displayClubInfo(club) {
    const info = document.getElementById('test-display-midfield');
    info.innerHTML = `
      <div class="playerDetails">
        ${club.players.map(p => `
            <img src="${p.playerImg}">
            <div class="playerDept">
              <h3>${p.name}<h3>
              <h6>${p.Department}</h6>
            </div>
          `).join('')}
              
      </div>
    `
  }
;

fetch('/league_clubs.json/league_table.json')
  .then(res => res.json())
  .then(data => {
    const club = data.standings[1];
    const gamesPlayed = club.played;
    const clubsGames = document.getElementById("club-games-played");
    clubsGames.innerHTML = gamesPlayed;

    const goalsScored = club.gf;
    const clubsScored = document.getElementById("club-games-scored");
    clubsScored.innerHTML = goalsScored;

    const goalsConceded = club.ga;
    const clubConceded = document.getElementById("club-games-conceded");
    clubConceded.innerHTML = goalsConceded;
  })
  .catch(err => console.log(err))
;  


 