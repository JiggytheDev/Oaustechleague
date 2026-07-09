import React from 'react';
import { useParams } from 'react-router-dom';
import clubsData from '../data/LeagueClubsInfo.json';

const LeagueClubInfo = () => {
  const { id } = useParams();
  
  // 1. Find the club. We use Number(id) to ensure it matches the JSON number
  const club = clubsData.clubs.find(c => c.id === Number(id));

  // 2. Safety Valve: If the ID is wrong or missing, show this instead of crashing
  if (!club) {
    return (
      <div className="min-h-screen bg-[#11012C] text-white p-20 text-center">
        <h1 className="text-2xl font-bold">Club Not Found</h1>
        <p className="text-gray-400 mt-2">The ID "{id}" doesn't match any team in the database.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11012C] text-white pt-20">
      {/* HEADER SECTION (Premier League Style) */}
      <div className="bg-gradient-to-r from-[#1B0243] to-[#2D066D] p-10 border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <img src={club.clubLogo} alt="" className="w-40 h-40 object-contain drop-shadow-2xl" />
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
              {club.clubname}
            </h1>
            <div className="flex gap-6 mt-4 justify-center md:justify-start text-sm font-bold uppercase text-gray-400">
              <p>Stadium: <span className="text-white">{club.stadium || 'N/A'}</span></p>
              <p className="border-l border-gray-700 pl-6">Capacity: <span className="text-white">{club.capacity || 'N/A'}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* SQUAD SECTION */}
      <div className="max-w-6xl mx-auto p-10">
        <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-magenta-500"></div>
            <h2 className="text-3xl font-black italic uppercase">Squad</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {club.players && club.players.map((player) => (
            <div key={player.playerId} className="bg-[#1B0243] p-5 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all flex justify-between items-center group">
              <div>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{player.position || 'First Team'}</p>
                <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{player.name}</h4>
              </div>
              <div className="text-3xl font-black text-gray-800 group-hover:text-blue-900/40">
                {player.playerId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeagueClubInfo;