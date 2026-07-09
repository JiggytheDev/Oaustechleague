import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import the components we created
import Home from '/src/pages/Home.jsx';
import LeagueClubs from '/src/pages/LeagueClubs.jsx';
import LeagueClubInfo from '/src/pages/LeagueClubInfo.jsx';
import PlayerProfile from '/src/pages/PlayerProfile.jsx';
import LeagueFixtures from '/src/pages/LeagueFixtures.jsx';
import LeagueTable from '/src/components/LeagueTable.jsx';
import PlayerStatistics from '/src/pages/PlayerStatistics.jsx';
import TransferReport from '/src/pages/TransferReport.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#11012C] font-sans selection:bg-blue-500 selection:text-white">
        
        {/* Main Navigation Bar */}
        <nav className="bg-[#1B0243] border-b border-[#2D066D] sticky top-0 z-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo / Home Link */}
              <Link to="/" className="text-xl font-black italic tracking-tighter text-white uppercase">
                Oaustech<span className="text-blue-500">League</span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-gray-300">
                <Link to="/" className='hover:text-white transition'>Home</Link>
                <Link to="/fixtures" className="hover:text-white transition">Matches</Link>
                <Link to="/table" className="hover:text-white transition">Table</Link>
                <Link to="/statistics" className="hover:text-white transition">Statistics</Link>
                <Link to="/transfers" className="hover:text-white transition">Transfers</Link>
                <Link to="/clubs" className="hover:text-white transition">Clubs</Link>
                <Link to="/players" className="hover:text-white transition">Players</Link>
                
              </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase transition">
                 Sign In
               </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* The Home page shows the list of all clubs */}
            <Route path="/clubs" element={<LeagueClubs />} />
            
            {/* Dynamic route for individual clubs (e.g., /club/1) */}
            {/* <Route path="/clubs/:clubId" element={<LeagueClubInfo />} /> */}
            <Route path="/clubs/:id" element={<LeagueClubInfo />} />
            

            {/* Matches and Fixtures */}
            <Route path="/fixtures" element={<LeagueFixtures />} />
            
            {/* Player Search and Directory */}
            <Route path="/players" element={<PlayerProfile />} />
            
            {/* League Table */}
            <Route path="/table" element={<LeagueTable />} />
            
            {/* Player Statistics */}
            <Route path="/statistics" element={<PlayerStatistics />} />
            {/* Transfer News */}
            <Route path="/transfers" element={<TransferReport />} />
          </Routes>
        </div>

        {/* Simple Footer */}
        <footer className="bg-[#0B011D] py-12 border-t border-[#2D066D] text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Oaustech Football League. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
