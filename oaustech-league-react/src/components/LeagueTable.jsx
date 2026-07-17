import React, { useEffect, useState } from 'react';
import fixturesData from '../data/LeagueFixtures.json';
import clubsData from '../data/LeagueClubsInfo.json';
import { calculateLeagueTable } from '../utils/LeagueEngine';

const LeagueTable = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    // Run calculation
    const data = calculateLeagueTable(fixturesData, clubsData);
    setStandings(data);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#11012C] min-h-screen text-white font-sans">
      <h2 className="text-2xl font-black italic uppercase mb-6 border-b border-gray-800 pb-2">Standings</h2>
      
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left bg-[#1B0243]">
          <thead className="bg-[#2D066D] text-gray-400 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="p-4 text-center">Pos</th>
              <th className="p-4 text-start">Club</th>
              <th className="p-2 text-center">MP</th>
              <th className="p-2 text-center">W</th>
              <th className="p-2 text-center">D</th>
              <th className="p-2 text-center">L</th>
              <th className="p-2 text-center">GD</th>
              <th className="p-4 text-center">Pts</th>
              <th className="p-4 text-center">Form</th>
              <th className="p-4 text-center">Next</th>
            </tr>
          </thead>
          <tbody>
            {/* SAFETY CHECK: Only map if standings has data */}
            {standings && standings.length > 0 ? (
              standings.map((club, i) => {
                return (
                <tr key={club.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-center font-bold text-gray-500">{i + 1}</td>
                  <td className="p-4 flex items-center gap-3">
                    <img src={club.logo} alt="" className="w-10 h-10 object-cover rounded-full" />
                    <span className="font-bold">{club.name}</span>
                  </td>
                  <td className="p-2 text-center">{club.mp}</td>
                  <td className="p-2 text-center">{club.w}</td>
                  <td className="p-2 text-center">{club.d}</td>
                  <td className="p-2 text-center">{club.l}</td>
                  <td className="p-2 text-center font-medium">{club.gd > 0 ? `+${club.gd}` : club.gd}</td>
                  <td className="p-4 text-center font-black text-blue-400 text-lg">{club.pts}</td>
                  <td className="p-4 text-center">
                    <div className="flex gap-1 border-2 justify-center">
                      {club.form.map((res, idx) => (
                        <span key={idx} className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold rounded-full ${
                          res === 'W' ? 'bg-green-500' : res === 'L' ? 'bg-red-500' : 'bg-gray-500'
                        }`}>{res}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {club.nextMatchLogo ? (
                      <img src={club.nextMatchLogo} alt="Next" className="w-10 h-10 object-contain mx-auto opacity-60" />
                    ) : "-"}
                  </td>
                </tr>
              ); 
            })
            ) : (
              <tr>
                <td colSpan="10" className="p-20 text-center text-gray-500">
                  <div className="animate-pulse">Loading league statistics...</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueTable;