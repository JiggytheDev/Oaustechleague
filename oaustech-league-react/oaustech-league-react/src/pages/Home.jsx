import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-20 px-6 text-center overflow-hidden">
        {/* Optional: Add a subtle soccer-themed background pattern/image here */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            OAUSTECH LEAGUE
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8">
            Experience the passion, the goals, and the glory of university football.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/matches" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
            >
              View Matches
            </Link>
            <Link 
              to="/table" 
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
            >
              League Table
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights / Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Live Standings</h3>
            <p className="text-gray-600">Stay updated with real-time table rankings and point tallies.</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">⚽</div>
            <h3 className="text-xl font-bold mb-2">Top Scorers</h3>
            <p className="text-gray-600">Tracking every goal from the league's most clinical finishers.</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Match Fixtures</h3>
            <p className="text-gray-600">Never miss a game with our detailed matchday schedules.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;