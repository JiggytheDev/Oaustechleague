export function calculatePlayerStats(allMatches, allPlayers) {
    const stats = {};

    //This initalize stats for every player
    allPlayers.forEach(player => {
        stats[player.playerId] = {
            playerId: player.playerId,
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0
        };
    });

    allMatches
    .forEach(match => {
        if (match.status !== "completed") return;

        match.events.forEach(event => {
        const player = stats[event.playerId];
        if( !player) return;

        if (event.type === "goal") player.goals++;
        if (event.type === "assist") player.assists++;
        if (event.type === "yellow") player.yellowCards++;
        if (event.type === "red") player.redCards++; 
        });
    })
    

    return stats;
}

export function getTopScorers(playerStats, allPlayers, limit = 10) {
    return allPlayers
      .map(player => ({
        playerId: player.playerId,
        playername: player.name,
        clubId: player.id,
        goals: playerStats[player.playerId]?.goals || 0
      }))
      .filter(p => p.goals > 0)
      .sort((a, b) => b.goals - a.goals)
      .slice(0, limit);
}

export function getCardLeaders(playerStats, allPlayers) {
    return allPlayers
      .map(player => ({
        name: player.name,
        yellowCards: playerStats[player.playerId]?.yellowCards || 0,
        redCards: playerStats[player.playerId]?.redCards || 0
      }))
      .filter(p => p.yellowCards> 0 || p.redCards > 0)
      .sort((a, b) => 
        b.redCards - a.redCards || b.yellowCards - a.yellowCards
    );
}