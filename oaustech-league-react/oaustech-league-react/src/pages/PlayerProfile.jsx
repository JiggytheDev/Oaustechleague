import React, { useState, useMemo } from 'react';
import playersData from '../data/LeagueClubsInfo.json';

const PlayerProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    position: '',
    department: '',
    clubName: ''
  });

  // 1. Flatten the data so we have one array of all players
  const allPlayers = useMemo(() => {
    return playersData.clubs.flatMap(club => 
      club.players.map(player => ({
        ...player,
        clubName: club.clubname // Attach club name to player for filtering
      }))
    );
  }, []);

  // 2. Filter logic
  const filteredPlayers = allPlayers.filter(player => {
    const matchesName = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filters.position === '' || player.position === filters.position;
    const matchesDept = filters.department === '' || player.department === filters.department;
    const matchesClub = filters.clubName === '' || player.clubName === filters.clubName;

    return matchesName && matchesPosition && matchesDept && matchesClub;
  });

  return (
    <div className="p-8 bg-[#11012C] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 italic uppercase">Player Search</h2>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search player name..." 
          className="p-3 rounded bg-[#1B0243] border border-gray-700 outline-none focus:border-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select 
          className="p-3 rounded bg-[#1B0243] border border-gray-700"
          onChange={(e) => setFilters({...filters, position: e.target.value})}
        >
          <option value="">All Positions</option>
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>

        <select 
          className="p-3 rounded bg-[#1B0243] border border-gray-700"
          onChange={(e) => setFilters({...filters, department: e.target.value})}
        >
          <option value="">All Departments</option>
          <option value="ICH">ICH</option>
          <option value="CVE">CVE</option>
          <option value="EEE">EEE</option>
          <option value="CSC">CSC</option>
          <option value="MCB">MCB</option>
          <option value="BCH">BCH</option>
          <option value="MEE">MEE</option>
          <option value="SMS">SMS</option>
          <option value="MTH&STATS">MTH&STATS</option>
          {/* Add more departments */}
        </select>

        <select 
          className="p-3 rounded bg-[#1B0243] border border-gray-700"
          onChange={(e) => setFilters({...filters, clubName: e.target.value})}
        >
          <option value="">All Clubs</option>
          {playersData.clubs.map(club => (
            <option key={club.id} value={club.clubname}>{club.clubname}</option>
          ))}
        </select>
      </div>

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlayers.map(player => (
          <div key={player.playerId} className="bg-[#1B0243] p-4 rounded-xl border border-gray-800">
            <img src={player.playerImg} alt={player.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold">{player.name}</h3>
            <p className="text-blue-400 text-sm font-bold uppercase">{player.position}</p>
            <div className="mt-2 text-gray-400 text-xs">
              <p>Club: {player.clubName}</p>
              <p>Dept: {player.Department || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerProfile;