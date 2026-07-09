import React from 'react';
import marketData from '../data/LeagueMarkets.json';
import clubsData from '../data/LeagueClubsInfo.json';

const TransferReport = () => {
  
  // HELPER: Find a player's name by searching through all clubs
  const getPlayerName = (playerId) => {
    let playerName = "Unknown Player";
    
    // Loop through each club to find the player with the matching ID
    clubsData.clubs.forEach(club => {
      const foundPlayer = club.players.find(p => p.playerId === playerId);
      if (foundPlayer) {
        playerName = foundPlayer.name;
      }
    });
    
    return playerName;
  };

  // HELPER: Get club name from ID
  const getClubName = (id) => {
    const club = clubsData.clubs.find(c => c.id === id);
    return club ? club.clubname : "Unknown Club";
  };

  return (
    <div className="p-4 md:p-8 bg-[#11012C] min-h-screen text-white font-sans">
      <header className="mb-10">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
          Transfer <span className="text-blue-500">Report</span>
        </h2>
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">OAUSTECH League Market Activity</p>
      </header>

      <div className="grid gap-4 max-w-5xl">
        {marketData.transfers.map((transfer) => (
          <div 
            key={transfer.id} 
            className="bg-[#1B0243] border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-[#230455] transition-all"
          >
            {/* Player Identity */}
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div className="relative">
                <img 
                  src={transfer.playerIcon.replace('/public', '')} 
                  alt="" 
                  className="w-14 h-14 rounded-full bg-gray-800 object-cover border-2 border-blue-500/30" 
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-[8px] px-1 rounded font-bold uppercase">
                  {transfer.type.split(' ')[0]}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white leading-none">
                  {getPlayerName(transfer.playerId)}
                </h3>
              </div>
            </div>

            {/* Transfer Movement */}
            <div className="flex items-center justify-between flex-1 px-4 py-3 bg-black/20 rounded-xl border border-white/5 w-full md:w-auto">
              <div className="text-center flex-1">
                <img src={transfer.prevClubLogo} alt="" className="w-7 h-7 mx-auto mb-1 object-contain grayscale opacity-60" />
                <p className="text-[9px] text-gray-400 font-bold uppercase truncate">{getClubName(transfer.fromClubId)}</p>
              </div>
              
              <div className="px-4 flex flex-col items-center">
                 <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                 <span className="text-blue-500 text-xs font-bold my-1">TO</span>
                 <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              </div>

              <div className="text-center flex-1">
                <img src={transfer.newClubLogo} alt="" className="w-7 h-7 mx-auto mb-1 object-contain" />
                <p className="text-[9px] text-white font-bold uppercase truncate">{getClubName(transfer.toClubId)}</p>
              </div>
            </div>

            {/* Financial Details */}
            <div className="w-full md:w-1/5 text-center md:text-right">
              <span className="text-[10px] block text-gray-500 uppercase font-bold tracking-widest mb-1">Fee</span>
              <p className={`font-mono font-bold ${transfer.fee ? 'text-green-400' : 'text-gray-400 italic'}`}>
                {transfer.fee ? `₦${transfer.fee.toLocaleString()}` : "Free"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferReport;