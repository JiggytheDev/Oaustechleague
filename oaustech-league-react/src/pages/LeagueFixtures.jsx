import React, { useState } from 'react';
import { clubs } from '../data/clubs.json'; 
import fixturesData from '../data/LeagueFixtures.json';

const LeagueFixtures = () => {
  // --- STATE FOR DRAWERS ---
  const [activeDrawer, setActiveDrawer] = useState(null); // 'matchweek' or 'club' or null

  // --- STATE FOR FILTERING ---
  // Extract all available matchday numbers from fixtures data
  const allMatchdays = fixturesData.matches.map(m => m.matchday);
  
  // Confirmed matchweeks displaying on the page
  const [selectedMatchweeks, setSelectedMatchweeks] = useState(allMatchdays);
  // Temp holder for checkboxes before clicking "Save"
  const [tempMatchweeks, setTempMatchweeks] = useState(allMatchdays);

  // Selected club filter (null means show all clubs)
  const [selectedClubId, setSelectedClubId] = useState(null);

  // --- HELPER FUNCTION ---
  const getClubInfo = (id) => {
    const club = clubs.find(c => c.id === id);
    return {
      name: club ? club.clubname : `Team ${id}`,
      logo: club ? club.clubLogo : '/ClubIcons/hero.png'
    };
  };

  /* const getPlayerName = (playerId) => {
    if (!playerId) return null;
    
    // Search through all clubs to find the player with the matching ID
    for (const club of clubs) {
      const foundPlayer = club.players?.find(p => p.playerId === Number(playerId));
      if (foundPlayer) return foundPlayer.name;
    }
    
    return `Player #${playerId}`; // Fallback if ID is missing in clubs.json
  }; */

  // --- FILTERING LOGIC ---
  const filteredMatches = fixturesData.matches
    // Filter by selected matchweeks
    .filter(week => selectedMatchweeks.includes(week.matchday))
    // Map and filter nested fixtures by selected club if one is chosen
    .map(week => {
      const filteredFixtures = week.fixtures.filter(fixture => {
        if (!selectedClubId) return true;
        return fixture.homeClubId === selectedClubId || fixture.awayClubId === selectedClubId;
      });
      return { ...week, fixtures: filteredFixtures };
    })
    // Keep matchweeks only if they have fixtures matching the criteria
    .filter(week => week.fixtures.length > 0);

  // --- HANDLERS FOR MATCHWEEK CHECKBOXES ---
  const handleCheckboxChange = (matchday) => {
    if (tempMatchweeks.includes(matchday)) {
      setTempMatchweeks(tempMatchweeks.filter(m => m !== matchday));
    } else {
      setTempMatchweeks([...tempMatchweeks, matchday]);
    }
  };

  const handleSaveMatchweeks = () => {
    setSelectedMatchweeks(tempMatchweeks);
    setActiveDrawer(null); // Close drawer
  };

  return (
    <main className="container mx-auto p-4 min-h-screen bg-[#F5F5F5] pt-24 font-sans relative overflow-x-hidden">
      
      {/*TOP DROP-DOWN FILTERS BAR */}
      <div className="flex flex-wrap items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 select-none">
          2026/27 ▾
        </div>

        <button 
          onClick={() => { setTempMatchweeks(selectedMatchweeks); setActiveDrawer('matchweek'); }}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-1 transition-colors"
        >
          Matchweeks ▾
        </button>

        <button 
          onClick={() => setActiveDrawer('club')}
          className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors ${selectedClubId ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          {selectedClubId ? clubs.find(c => c.id === selectedClubId)?.clubname : 'Clubs'} ▾
        </button>

        {selectedClubId && (
          <button 
            onClick={() => setSelectedClubId(null)} 
            className="text-xs text-red-500 font-bold hover:underline ml-auto"
          >
            Clear Club Filter ×
          </button>
        )}
      </div>

      {/* SLIDE IN FIXTURES CONTAINER */}
      <div className="max-w-4xl mx-auto space-y-12">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold">No matches match your filter criteria.</div>
        ) : (
          filteredMatches.map((week) => (
            <div key={week.matchday} className="mb-10">
              {/* Central Matchweek Label Block */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 cursor-pointer hover:bg-gray-300">‹</div>
                <div className="bg-gray-300 px-8 py-2 font-black uppercase text-gray-800 tracking-tight rounded">
                  Matchweek {week.matchday}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 cursor-pointer hover:bg-gray-300">›</div>
              </div>

              {/* Fixture Item Rows */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-200 overflow-hidden">
                {week.fixtures.map((fixture) => {
                  const homeTeam = getClubInfo(fixture.homeClubId);
                  const awayTeam = getClubInfo(fixture.awayClubId);

                  return (
                    <div 
                      key={fixture.matchId} 
                      className="flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Home Team */}
                      <div className="flex-1 flex items-center justify-end gap-3 md:gap-4 pr-2">
                        <span className="font-bold text-gray-800 text-sm md:text-base text-right">{homeTeam.name}</span>
                        <img src={homeTeam.logo} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                      </div>

                      {/* Score / Time Box */}
                      <div className="w-24 md:w-32 flex justify-center">
                        <div className="bg-[#E29797] text-gray-900 font-black px-4 md:px-8 py-2 rounded text-center min-w-[70px] shadow-inner text-sm md:text-base tracking-widest">
                          {fixture.time}
                        </div>
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 flex items-center justify-start gap-3 md:gap-4 pl-2">
                        <img src={awayTeam.logo} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                        <span className="font-bold text-gray-800 text-sm md:text-base text-left">{awayTeam.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* BACKGROUND OVERLAY BLUR WHEN DRAWER IS OPEN */}
      {activeDrawer && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setActiveDrawer(null)}
        />
      )}

      {/* SLIDE IN DRAWER 1: MATCHWEEK FILTER (MULTIPLE SELECT + SAVE) */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out p-6 flex flex-col ${activeDrawer === 'matchweek' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-lg font-black text-indigo-950 uppercase">Select Matchweeks</h3>
          <button onClick={() => setActiveDrawer(null)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Checkbox Scroller list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {allMatchdays.map((day) => (
            <label key={`check-${day}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
              <input 
                type="checkbox" 
                checked={tempMatchweeks.includes(day)} 
                onChange={() => handleCheckboxChange(day)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="font-bold text-gray-700 text-sm">Matchweek {day}</span>
            </label>
          ))}
        </div>

        {/* Sticky Action Footer Button */}
        <button 
          onClick={handleSaveMatchweeks}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md uppercase tracking-wider"
        >
          Save
        </button>
      </div>

      {/*SLIDE IN DRAWER 2: CLUBS FILTER */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out p-6 flex flex-col ${activeDrawer === 'club' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-lg font-black text-indigo-950 uppercase">Filter by Club</h3>
          <button onClick={() => setActiveDrawer(null)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Single Click Scroller List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          <div 
            onClick={() => { setSelectedClubId(null); setActiveDrawer(null); }}
            className={`flex items-center p-3 rounded-xl cursor-pointer font-bold text-sm transition-all border ${!selectedClubId ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
          >
            Show All Clubs
          </div>
          
          {clubs.map((club) => (
            <div 
              key={`filter-club-${club.id}`}
              onClick={() => { setSelectedClubId(club.id); setActiveDrawer(null); }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold text-sm transition-all border ${selectedClubId === club.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'}`}
            >
              <img src={club.clubLogo} alt="" className="w-6 h-6 object-contain" />
              <span>{club.clubname}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default LeagueFixtures;