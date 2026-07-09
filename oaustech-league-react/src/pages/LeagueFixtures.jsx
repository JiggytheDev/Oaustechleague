import React from 'react';
import { clubs } from '../data/clubs.json'; 
import fixturesData from '../data/LeagueFixtures.json';

const LeagueFixtures = () => {
  
  // 1. Define the helper function INSIDE the component
  const getClubInfo = (id) => {
    // This finds the specific club object that matches the ID from the fixture
    const club = clubs.find(c => c.id === id);
    
    // Return the name and logo, or a fallback if not found
    return {
      name: club ? club.clubname : `Team ${id}`,
      logo: club ? club.clubLogo : './assets/hero.png'
    };
  };

  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-50">
      <div className="matchday-games space-y-4 mb-12">
        {fixturesData.matches.map((week) => (
          <div key={week.matchday} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-indigo-900">
              Matchweek {week.matchday}
            </h2>

            <div className="space-y-4">
              {week.fixtures.map((fixture) => {
                // 2. Call the helper for both teams
                const homeTeam = getClubInfo(fixture.homeClubId);
                const awayTeam = getClubInfo(fixture.awayClubId);

                return (
                  <div 
                    key={fixture.matchId} 
                    className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  >
                    {/* Home Team */}
                    <div className="flex-1 flex items-center justify-end gap-4">
                      <span className="font-bold text-gray-800">{homeTeam.name}</span>
                      <img src={homeTeam.logo} alt="" className="w-10 h-10 object-contain" />
                    </div>

                    {/* Time / Score */}
                    <div className="mx-8 bg-indigo-50 px-6 py-2 rounded-full font-mono text-indigo-700 font-bold border border-indigo-100">
                      {fixture.time}
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex items-center justify-start gap-4">
                      <img src={awayTeam.logo} alt="" className="w-10 h-10 object-contain" />
                      <span className="font-bold text-gray-800">{awayTeam.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LeagueFixtures;