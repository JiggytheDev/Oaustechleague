export function initializeClubStats(clubs) {
    const table = {};

    clubs.forEach(club => {
        table[club.clubId] = {
            clubId: club.id,
            name: club.clubname,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0
        };
    });

    return table;
}

export function calculateClubStats(allMatches, clubs) {
    const clubStats = initializeClubStats(clubs);


    allMatches.forEach(match => {
        if (match.status !== "completed") return;

        let homeGoals = 0;
        let awayGoals = 0;

        // Count goals
        match.events.forEach(event => {
            if (event.type === "goal") {
                if (event.clubId === match.homeClubId) homeGoals++;
                if (event.clubId === match.awayClubId) awayGoals++;
            }
        });    

        const home = clubStats[match.homeClubId];
        const away = clubStats[match.awayClubId];

        if (!home || !away) return;

        // Update played
        home.played++;
        away.played++;

        // Goals
        home.goalsFor += homeGoals;
        home.goalsAgainst += awayGoals;
        away.goalsFor += awayGoals;
        away.goalsAgainst += homeGoals;

        // Results
        if (homeGoals > awayGoals) {
            home.wins++;
            home.points += 3;
            away.losses++;
        } else if (awayGoals > homeGoals) {
            away.wins++;
            away.points += 3;
            home.losses++;
        } else {
            home.draws++;
            away.draws++;
            home.points++;
            away.points++;
        }
        
        home.goalDifference = home.goalsFor - home.goalsAgainst;
        away.goalDifference = away.goalsFor - away.goalsAgainst;
    });

    return clubStats;
}