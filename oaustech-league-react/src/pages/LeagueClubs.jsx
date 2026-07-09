import React from 'react';
import { Link } from 'react-router-dom';
import clubs from '/src/data/clubs.json'

const LeagueClubs = () => {

  return (
    <main className="min-h-screen bg-[#11012C] text-white p-6 md:p-12">
      <div className="matches-section mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-4xl font-black text-gray-200 uppercase tracking-tight">
          Clubs
        </h1>
      </div>

      <div className="year mb-12 flex items-center gap-3">
        <span className="text-xl font-medium text-gray-400">2025/26 Season</span>
        <div className="h-1 grow bg-blue-600 rounded"></div>
      </div>

      {/* Modern Grid Layout (Like the Premier League screenshot) */}
      <div className="league-clubs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="showClubs">
        {clubs.clubs.map((club) => (
          <Link 
            to={`/clubs/${club.id}`} 
            key={`${club.id}`} 
            className="club-card group bg-[#1B0243] rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out border border-transparent hover:border-blue-500"
          >
            {/* Top Bar (Logo and Name) */}
            <div className="top flex items-center gap-4 p-6 border-b border-[#2D066D] relative">
              <div className="logo-container bg-white p-2 rounded-full shadow-inner flex items-center justify-center h-16 w-16">
                <img 
                  src={`${club.clubLogo}`} 
                  alt={`${club.clubname} Logo`} 
                  className="max-h-12 max-w-12 object-contain"
                />
              </div>
              <div className="name-area grow">
                <h3 className="text-lg font-extrabold group-hover:text-blue-200 transition">
                  {`${club.clubname}`}
                </h3>
              </div>
              <div className="absolute right-6 top-6 opacity-40 group-hover:opacity-100 group-hover:text-blue-300">
                 {/* Standard "chevron right" icon from standard icon libs */}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                 </svg>
              </div>
            </div>

            {/* Bottom Actions (Buttons) */}
            <div className="bottom flex items-center justify-between gap-4 p-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition">
                Follow
              </button>
              <Link 
                to={`/clubs/${club.id}`} 
                className="flex-1 text-center bg-[#2D066D] hover:bg-[#3D0A8B] text-gray-300 text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition"
              >
                Profile
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default LeagueClubs;