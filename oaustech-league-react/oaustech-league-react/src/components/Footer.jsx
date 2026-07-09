import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8 flex justify-between">
      <div className="foot-links flex flex-col gap-2">
        <Link to="/" className="hover:text-blue-400">Oaustech League</Link>
        <Link to="/matches" className="hover:text-blue-400">Matches</Link>
        <Link to="/table" className="hover:text-blue-400">Table</Link>
      </div>

      <div className="foot-links flex flex-col gap-2">
        <Link to="/statistics" className="hover:text-blue-400">Statistics</Link>
        <Link to="/news" className="hover:text-blue-400">Latest News</Link>
        <Link to="/transfers" className="hover:text-blue-400">Transfers</Link>
      </div>

      <div className="foot-links flex flex-col gap-2">
        <Link to="/players" className="hover:text-blue-400">Players</Link>
        <Link to="/clubs" className="hover:text-blue-400">Clubs</Link>
        <Link to="/policies" className="hover:text-blue-400">Policies</Link>
      </div>
    </footer>
  );
};

export default Footer;