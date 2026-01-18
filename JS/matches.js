/* fetch('/league_clubs.json/league_matches.json')
  .then(res => res.json())
  .then(data => { */
    /* let foundMatch = null;

    matchdays.forEach(day => {
    const fixture = day.fixtures.find(f => f.matchId === matchId);
      if (fixture) {
        foundMatch = fixture;
      }
    }); */

    /* const matchId = 103;

    // Find match
    let foundMatch = null;

    data.matches.forEach(day => {
      day.fixtures.forEach(match => {
        if (match.matchId === matchId) {
          foundMatch = match;
        }
      });
    });

    if (!foundMatch) {
      console.error("Match not found");
      return;
    } */
/* 
    console.log("FOUND MATCH:", foundMatch);
    console.log("EVENTS:", foundMatch.events);

    // Calculate score
    calculateScore(foundMatch);

    // Get cards
    const cards = getCards(foundMatch, players);
    console.log("CARDS:", cards); */


    /* function getMatchById(matchId, matches) {
      return matches.find(match => match.id === matchId);
    }
    const match = getMatchById(101, data.matches);
    console.log(match); */

    /* function getMatchById(matchId, matchdays) {
      
      if (foundMatch) {
        console.log("FOUND MATCH:", foundMatch);
        console.log("EVENTS:", foundMatch.events);
      }
      console.log("MATCH FOUND:", foundMatch);
      if(!foundMatch) return;
      calculateScore(foundMatch);
    } */

    /* function calculateScore(match) {
      let homeGoals = 0;
      let awayGoals = 0;

      match.events.forEach(event => {
        if(event.type === "goal") {
          if(event.clubId === match.homeClubId) {
            homeGoals++;
          } else if(event.clubId === match.awayClubId) {
            awayGoals++;
          }
        }
      });
      console.log("SCORE:", homeGoals, "-", awayGoals);
    } */

    /* function getCards(match, players) {
      if (!match || !match.events) return [];

      return match.events
      .filter(event => event.type === "yellow" || event.type === "red").map(card => {
        const player = players.find(p => p.id === card.playerId);

        return {
          minute: card.minute ?? "-",
          type: card.type,
          playerName: player?.name || "Unknown Player",
          clubId: card.clubId
        };
      });
    }
  })
;  */



// FETCHING MATCHES AND PLAYERS DATA
import { calculatePlayerStats } from "./stats.js";
import { getTopScorers } from "./leaderboard.js";
import { initializeClubStats } from "./clubs-stats.js";
import { calculateClubStats } from "./clubs-stats.js";
import { getLeagueTable } from "./league-table.js";

Promise.all([
  fetch("/league_clubs.json/league_matches.json").then(res => res.json()),
  fetch("/league_clubs.json/clubs_info.json").then(res => res.json())
])
.then(([matchesData, playersData]) => {
  
  
  console.log("MATCHES DATA:", matchesData);
  console.log("PLAYERS DATA:", playersData.clubs);


  const clubs = playersData.clubs;
  const allPlayers = playersData.clubs.flatMap(c => c.players);
  const allMatches = matchesData.matches.flatMap(md => md.fixtures);

  const playerStats = calculatePlayerStats(allMatches, allPlayers);
  console.log("PLAYERS STATS:", playerStats);

  const readableStats = allPlayers.map(player => ({
    playerId: player.playerId,
    name: player.name,
    clubId: player.clubId,
    ...playerStats[player.playerId]
  }));

  console.table(readableStats);

  console.log(allMatches);

  // LOADING THE MATCHES

  const matchId = 118;
  const foundMatch = allMatches.find(m => m.matchId === matchId);

  if (!foundMatch) {
    console.error("Match not found");
    return;
  }

  console.log("FOUND MATCH:", foundMatch);
  console.log("EVENTS:", foundMatch.events);

  // CALCULATING THE SCORE

  const score = calculateScore(foundMatch);
  console.log(`SCORE: ${score.home} - ${score.away}`);

  // GOALSCORERS
  const goalScorers = getGoalscorers(foundMatch, allPlayers);
  const goalies = document.getElementById("goalscorers");
  goalies.innerHTML = goalScorers;
  console.log("GOALSCORERS:", goalScorers);

  // GETTING CARDS
  const cards = getCards(foundMatch, allPlayers);
  console.log("CARDS:", cards);

  // TOPSCORERS
  const topScorers = getTopScorers(playerStats, allPlayers);
  console.table("TOPSCORERS:", topScorers);

  //CLUB STATS
  const clubStats = calculateClubStats(allMatches, clubs);
  console.table("CLUB STATS:", clubStats);

  // LEAGUE TABLE
  const leagueTable = getLeagueTable(clubStats);
  console.table(leagueTable);
  console.log({ clubs, allPlayers, allMatches});
})
.catch(err => console.error(err));


// FUNCTIONS TO CALCULATE SCORE AND GETCARDS

function calculateScore(match) {
  let homeGoals = 0;
  let awayGoals = 0;

  match.events.forEach(event => {
    if (event.type === "goal") {
      if (event.clubId === match.homeClubId) homeGoals++;
      if (event.clubId === match.awayClubId) awayGoals++;
    }
  });

  return {
    home: homeGoals,
    away: awayGoals
  };
}

function getGoalscorers(match, players) {
  if (!match?.events) return [];

  return match.events
   .filter(e => e.type === "goal")
   .map(goal => {
     const scorer = players.find(p => p.id === goal.playerId);
     const assister = players.find(p => p.id === goal.assistId);

     return {
      scoreId: goal.playerId,
      scorerName: scorer ? scorer.name : "Unknown",
      assistName: assister ? assister.name : null,
      clubId: goal.clubId
     };
   });
}

function getAllPlayers(playersData) {
  return playersData.clubs.flatMap(club => club.players);
}



function getCards(match, players) {
  if (!match?.events) return [];

  return match.events
    .filter(e => e.type?.toLowerCase().includes("yellow") || e.type?.toLowerCase().includes("red"))
    .map(card => {
      const player = players.find(p => p.id === card.playerId);

      return {
        minute: card.minute ?? "-",
        type: card.type,
        playerId: card.playerId ?? null,
        playerName: player ? player.name : "Unknown Player",
        clubId: card.clubId
      };
    });
}
