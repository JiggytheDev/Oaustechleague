export function calculatePlayerStats(allMatches, allPlayers) {
    const stats = {};

    //This initalize stats for every player
    allPlayers.forEach(player => {
        stats[player.playerId] = {
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0
        };
    });

    allMatches
    .filter(match => match.played)
    .forEach(match => {
        if (!match.events) return;


        match.events.forEach(event => {
        const { type, playerId, assistId } = event;


        if (type === "goal" && !stats[playerId]) {
            console.warn("Unkwown goalscorer:", event);

            if (stats[playerId]) {
                stats[playerId].goals += 1;
            }
            

            if (assistId && stats[assistId]) {
                stats[assistId].assists += 1;
            }
        }

        // Cards
        if (type === "yellow") {
            stats[playerId].yellowCards += 1;
        }

        if (type === "red") {
            stats[playerId].redCards += 1;
        }

        });
    })
    

    return stats;
    console.log("playerStats loaded");
};