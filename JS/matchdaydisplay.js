fetch('/league_clubs.json/league_matches.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayMatchDayTwo(data);
  });
    function displayMatchDayTwo(data) {
        const matchdays = data.matches.find(day => day.matchday == 5);
        console.log(matchdays);

        if(matchdays){
            renderFixtures(matchdays.fixtures);
        } 
  
    }

    

    function renderFixtures(fixtures) {
        const container = document.getElementById("matchdayDisplay");
        container.innerHTML = '';

        fixtures.forEach(match => {
            const div = document.createElement('div');
            div.classList.add("games");
            const matchday = document.getElementById("matchday");
            matchday.innerHTML = `${match.matchday}`;

            div.innerHTML  = `
                <div class="clubs">
                    <div class="homeClub">
                        <p>${match.home}</p>
                        <img src="${match.homeLogo}" alt="clubLogo">
                    </div>
                    <div class="gameTime">
                        <p>${match.time}</p>
                    </div>
                    <div class="awayClub">
                        <img src="${match.awayLogo}" alt="clubLogo">
                        <p>${match.away}</p>
                    </div>
                </div>
            `;

            container.appendChild(div);
        });
    }
;  