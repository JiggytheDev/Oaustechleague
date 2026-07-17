import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between border-4 border-b-green-400 h-16 items-center">
          {/* Logo / Brand */}
          <div className="shrink-0 flex items-center">
            {/* <Link to="/" className="text-xl font-bold tracking-wider">
              OAUSTECH <span className="text-blue-200">LEAGUE</span>
            </Link> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex border-2 space-x-8">
            <Link to="/matches" className="hover:text-blue-200 transition-colors">Matches</Link>
            <Link to="/table" className="hover:text-blue-200 transition-colors">Table</Link>
            <Link to="/statistics" className="hover:text-blue-200 transition-colors">Stats</Link>
            <Link to="/news" className="hover:text-blue-200 transition-colors">News</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="outline-none mobile-menu-button"
            >
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" /> // Close Icon
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger Icon
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-blue-800 pb-4 px-4`}>
        <Link to="/matches" className="block py-2 hover:bg-blue-600 rounded px-2">Matches</Link>
        <Link to="/table" className="block py-2 hover:bg-blue-600 rounded px-2">Table</Link>
        <Link to="/statistics" className="block py-2 hover:bg-blue-600 rounded px-2">Stats</Link>
        <Link to="/news" className="block py-2 hover:bg-blue-600 rounded px-2">News</Link>
      </div>
    </nav>
  );
};

export default Navbar;