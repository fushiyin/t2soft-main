import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    // <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-800">
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TradeMaster</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <LogIn className="h-5 w-5" />
            </button>
            <button className="bg-green-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
              <button className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200">
                Sign In
              </button>
              <button className="w-full bg-green-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200">
                Sign Up
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;