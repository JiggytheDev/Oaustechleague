import React, { useState, useEffect, useRef } from 'react';
import { clubs } from '../data/LeagueClubsInfo.json'; 

const PlayerComparison = () => {
    // 1. EXTRACT ALL UNIQUE PLAYERS With AUTO-DETECT STATS
  const allPlayers = React.useMemo(() => {
    const list = [];
    const seenIds = new Set();

    (clubs || []).forEach(club => {
      const rawPlayers = club.players || club.Players || club.squad || [];
      rawPlayers.forEach(player => {
        const id = player.playerId || player.id || player.playerID;
        
        if (id && !seenIds.has(id)) {
          seenIds.add(id);

          // Deep check to see if stats are nested inside a "stats" or "statistics" object
          const s = player.stats || player.statistics || player.metrics || {};

          list.push({
            ...player,
            id: id,
            name: player.name || player.playerName || 'Unknown Player',
            clubName: club.clubname || club.name || 'Unknown Club',
            clubLogo: club.clubLogo || '',
            
            // Auto-detect Goals variants
            goals: player.goals ?? player.goalsScored ?? player.goal ?? s.goals ?? s.goalsScored ?? s.goal ?? 0,
            
            // Auto-detect Assists variants
            assists: player.assists ?? player.assist ?? s.assists ?? s.assist ?? 0,
            
            // Auto-detect Clean Sheets variants
            cleanSheets: player.cleanSheets ?? player.cleansheets ?? player.cleanSheet ?? s.cleanSheets ?? s.cleansheets ?? 0,
            
            // Auto-detect Cards variants
            yellowCards: player.yellowCards ?? player.yellowcard ?? player.yellowCardsCount ?? s.yellowCards ?? s.yellowcard ?? 0,
            redCards: player.redCards ?? player.redcard ?? player.redCardsCount ?? s.redCards ?? s.redcard ?? 0
          });
        }
      });
    });
    return list;
  }, []);

  // 2. STATE HANDLES
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  const refA = useRef(null);
  const refB = useRef(null);

  // Initialize once and don't reset on subsequent renders
  useEffect(() => {
    if (allPlayers.length > 0 && !playerA && !playerB) {
      setPlayerA(allPlayers[0]);
      setSearchA(allPlayers[0].name);
      
      const secondPlayer = allPlayers[1] || allPlayers[0];
      setPlayerB(secondPlayer);
      setSearchB(secondPlayer.name);
    }
  }, [allPlayers, playerA, playerB]);

  // Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (refA.current && !refA.current.contains(e.target)) setOpenA(false);
      if (refB.current && !refB.current.contains(e.target)) setOpenB(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 3. FUZZY FILTER LOGIC
  const filteredA = allPlayers.filter(p => {
    const query = searchA.toLowerCase().trim();
    if (!query) return true; // Show all options if query is cleared
    return p.name.toLowerCase().includes(query) || p.clubName.toLowerCase().includes(query);
  });

  const filteredB = allPlayers.filter(p => {
    const query = searchB.toLowerCase().trim();
    if (!query) return true;
    return p.name.toLowerCase().includes(query) || p.clubName.toLowerCase().includes(query);
  });

  const StatBar = ({ label, valA, valB }) => {
    const numA = Number(valA || 0);
    const numB = Number(valB || 0);
    const total = numA + numB;
    const pctA = total > 0 ? (numA / total) * 100 : 50;
    const pctB = total > 0 ? (numB / total) * 100 : 50;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider mb-2">
          <span className={`text-lg ${numA > numB ? 'text-blue-400 font-black' : 'text-gray-400'}`}>{numA}</span>
          <span className="text-gray-500 text-xs font-black italic">{label}</span>
          <span className={`text-lg ${numB > numA ? 'text-blue-400 font-black' : 'text-gray-400'}`}>{numB}</span>
        </div>
        <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden flex">
          <div style={{ width: `${pctA}%` }} className={`h-full transition-all duration-500 ${numA > numB ? 'bg-blue-500' : 'bg-blue-800/40'}`} />
          <div style={{ width: `${pctB}%` }} className={`h-full transition-all duration-500 ${numB > numA ? 'bg-pink-500' : 'bg-pink-900/40'}`} />
        </div>
      </div>
    );
  };

  if (allPlayers.length === 0 || !playerA || !playerB) {
    return (
      <div className="min-h-screen bg-[#11012C] text-white pt-32 text-center p-6 flex flex-col items-center justify-center">
        <div className="bg-[#1B0243] p-8 rounded-2xl border border-red-900/40 max-w-md shadow-2xl">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h3 className="text-xl font-black uppercase text-red-400">Loading Data</h3>
          <p className="text-sm text-gray-300 mt-2">Checking LeagueClubsInfo.json records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11012C] text-white pt-24 pb-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:justify-between md:items-end gap-2">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Player <span className="text-blue-500">Comparison</span>
          </h2>
          <span className="text-xs text-gray-400 font-mono bg-[#1B0243] px-3 py-1 rounded-full border border-gray-800">
            Pool size: {allPlayers.length} players loaded
          </span>
        </header>

        {/* SEARCH SELECTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1B0243] p-6 rounded-2xl border border-gray-800 mb-8 relative z-30">
          
          {/* SEARCH BOX A */}
          <div ref={refA} className="relative">
            <label className="block text-[10px] uppercase font-black tracking-widest text-blue-400 mb-2">Input player name/club </label>
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchA}
                onChange={(e) => { setSearchA(e.target.value); setOpenA(true); }}
                onFocus={() => setOpenA(true)}
                placeholder="Type name or club..."
                className="w-full bg-[#11012C] border border-gray-800 p-3 pr-10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchA && (
                <button 
                  onClick={() => { setSearchA(''); setOpenA(true); }}
                  className="absolute right-3 text-gray-500 hover:text-white text-xs font-bold font-mono px-1 rounded hover:bg-gray-800"
                >✕</button>
              )}
            </div>
            
            {openA && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#11012C] border border-gray-800 rounded-xl max-h-60 overflow-y-auto shadow-2xl z-50 divide-y divide-gray-900">
                {filteredA.length > 0 ? (
                  filteredA.map(p => (
                    <div 
                      key={`searchA-${p.id}`}
                      onClick={() => { setPlayerA(p); setSearchA(p.name); setOpenA(false); }}
                      className="p-3 hover:bg-[#1B0243] cursor-pointer text-sm font-bold flex justify-between items-center text-white"
                    >
                      <span>{p.name}</span>
                      <span className="text-xs text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900/40">{p.clubName}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-xs text-gray-500 italic">No matching players found</div>
                )}
              </div>
            )}
          </div>

          {/* SEARCH BOX B */}
          <div ref={refB} className="relative">
            <label className="block text-[10px] uppercase font-black tracking-widest text-pink-400 mb-2">Input player name/club</label>
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchB}
                onChange={(e) => { setSearchB(e.target.value); setOpenB(true); }}
                onFocus={() => setOpenB(true)}
                placeholder="Type name or club..."
                className="w-full bg-[#11012C] border border-gray-800 p-3 pr-10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-pink-500 transition-colors"
              />
              {searchB && (
                <button 
                  onClick={() => { setSearchB(''); setOpenB(true); }}
                  className="absolute right-3 text-gray-500 hover:text-white text-xs font-bold font-mono px-1 rounded hover:bg-gray-800"
                >✕</button>
              )}
            </div>

            {openB && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#11012C] border border-gray-800 rounded-xl max-h-60 overflow-y-auto shadow-2xl z-50 divide-y divide-gray-900">
                {filteredB.length > 0 ? (
                  filteredB.map(p => (
                    <div 
                      key={`searchB-${p.id}`}
                      onClick={() => { setPlayerB(p); setSearchB(p.name); setOpenB(false); }}
                      className="p-3 hover:bg-[#1B0243] cursor-pointer text-sm font-bold flex justify-between items-center text-white"
                    >
                      <span>{p.name}</span>
                      <span className="text-xs text-pink-400 bg-pink-950 px-2 py-0.5 rounded border border-pink-900/40">{p.clubName}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-xs text-gray-500 italic">No matching players found</div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* PROFILE DISPLAY CARDS */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-10 relative z-10">
          <div className="bg-gradient-to-b from-[#1B0243] to-[#11012C] border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <img src={playerA.clubLogo} alt="" className="w-12 h-12 object-contain mx-auto mb-3 opacity-60" />
            <h3 className="text-lg md:text-xl font-black uppercase truncate">{playerA.name}</h3>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">{playerA.clubName}</p>
          </div>

          <div className="bg-gradient-to-b from-[#1B0243] to-[#11012C] border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <img src={playerB.clubLogo} alt="" className="w-12 h-12 object-contain mx-auto mb-3 opacity-60" />
            <h3 className="text-lg md:text-xl font-black uppercase truncate">{playerB.name}</h3>
            <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">{playerB.clubName}</p>
          </div>
        </div>

        {/* STATISTICS STACK */}
        <div className="bg-[#1B0243] border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative z-10">
          <StatBar label="Goals Scored" valA={playerA.goals} valB={playerB.goals} />
          <StatBar label="Assists" valA={playerA.assists} valB={playerB.assists} />
          <StatBar label="Clean Sheets" valA={playerA.cleanSheets || playerA.cleansheets} valB={playerB.cleanSheets || playerB.cleansheets} />
          <StatBar label="Yellow Cards" valA={playerA.yellowCards || playerA.yellowcard} valB={playerB.yellowCards || playerB.yellowcard} />
          <StatBar label="Red Cards" valA={playerA.redCards || playerA.redcard} valB={playerB.redCards || playerB.redcard} />
        </div>

      </div>
    </div>
  );
};

export default PlayerComparison;