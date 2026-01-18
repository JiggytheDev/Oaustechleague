document.getElementById("showMatchWeeks").addEventListener("click", () => {
  const mwSlidein = document.getElementById("matchweeks");
  mwSlidein.style.display = "flex";
});

document.getElementById("closeSideBar").addEventListener("click", () => {
  const mwSlidein = document.getElementById("matchweeks");
  mwSlidein.style.display = "none";
});


fetch('/league_clubs.json/league_matches.json')
  .then(res => res.json())
  .then(data => {

    const fixturesContainer = document.getElementById("matches");
    const mwtext = document.getElementById("matchday");

    // FUNCTION Showing fixtures for selected matchweek
    function loadMatchweek(weekNumber) {
      fixturesContainer.innerHTML = ""; 

      // Show matchweek text
      mwtext.innerHTML = `${weekNumber}`;

      // Find matchweek in JSON
      const selectedWeek = data.matches.find(
        (week) => Number(week.matchday) === weekNumber
      );

      if (!selectedWeek) {
        fixturesContainer.innerHTML = `<p>No fixtures found.</p>`;
        return;
      }

      // Display each fixture
      selectedWeek.fixtures.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("fixture-card");
        /* const startDate = document.getElementById("startMatch");
        const endDate = document.getElementById("endMatch");

        
        endDate.innerHTML = `${game.enddate}`;
        console.log(`${game.startdate}`);
        startDate.innerHTML = `${game.sae}`; */

        card.innerHTML = `
          <div class="fixture-row">
            <div class="homeTeam">
              <img src="${game.homeLogo}" class="homeTeam">
              <span>${game.home}</span>
            </div>
            <div class="matchTime">
              <span class="score">${game.time}</span>
            </div>
            <div class="awayTeam">
               <span>${game.away}</span>
               <img src="${game.awayLogo}" class="awayTeam">
            </div>
            
          </div>
        `;

        fixturesContainer.appendChild(card);
      });
    }

    // CLICK EVENTS FOR ALL 18 BUTTONS
    for (let i = 1; i <= 18; i++) {
      const button = document.getElementById(`mw${i}`);
      if (button) {
        button.addEventListener("click", () => loadMatchweek(i));
      }
    }

  })
  .catch(err => console.log(err));
;