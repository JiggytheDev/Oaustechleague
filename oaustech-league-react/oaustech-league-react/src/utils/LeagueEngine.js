export const calculateLeagueTable = (fixturesData, clubsData) => {
  if (!fixturesData || !fixturesData.matches || !clubsData || !clubsData.clubs) {
    return []; 
  };
  const table = {};

  // Initialize every club
  clubsData.clubs.forEach((club) => {
    table[club.id] = {
      id: club.id,
      name: club.clubname,
      logo: club.clubLogo,
      mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
      form: club.form || [], // Will store 'W', 'D', 'L'
      nextMatchLogo: null
    };
  });

  // Process all matches
  fixturesData.matches.forEach((matchGroup) => {
    matchGroup.fixtures.forEach((fixture) => {
      const home = table[fixture.homeClubId];
      const away = table[fixture.awayClubId];

      if (fixture.played) {
        const [hScore, aScore] = fixture.time.split(':').map(Number);
        home.mp++; away.mp++;
        home.gf += hScore; home.ga += aScore;
        away.gf += aScore; away.ga += hScore;

        if (hScore > aScore) {
          home.w++; home.pts += 3; home.form.push('W');
          away.l++; away.form.push('L');
        } else if (aScore > hScore) {
          away.w++; away.pts += 3; away.form.push('W');
          home.l++; home.form.push('L');
        } else {
          home.d++; away.d++; home.pts += 1;
          home.form.push('D'); away.form.push('D');
        }
      } else {
        // Find the NEXT match logo if it hasn't been found yet
        if (!home.nextMatchLogo) home.nextMatchLogo = fixture.awayLogo;
        if (!away.nextMatchLogo) away.nextMatchLogo = fixture.homeLogo;
      }
    });
  });

  return Object.values(table).map(club => ({
    ...club,
    gd: club.gf - club.ga,
    // Only keep the last 5 results for form
    form: club.form.slice(-5) 
  })).sort((a, b) => b.pts - a.pts || b.gd - a.gd);
};