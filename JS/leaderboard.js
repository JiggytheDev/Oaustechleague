export function getTopScorers(playerStats, allPlayers, limit = 10) {
    return allPlayers
    .map(player => ({
        playerId: player.playerId,
        name: player.name,
        clubId: player.Id,
        goals: playerStats[player.playerId]?.goals || 0
    }))
    .filter(p => p.goals > 0)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, limit)
}