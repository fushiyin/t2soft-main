import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, User, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'ko', label: 'KO' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [langDropdown, setLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('menu.home', 'Home'), path: '/' },
    { name: t('menu.courses', 'Courses'), path: '/courses' },
    { name: t('menu.blog', 'Blog'), path: '/blog' },
    { name: t('menu.about', 'About'), path: '/about' },
    { name: t('menu.contact', 'Contact'), path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setLangDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-800 transition-colors duration-300 ${
        scrolled ? 'bg-[#181c2b] shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
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
            {/* Language Switcher */}
            <div className="relative">
              <button
                className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
                onClick={() => setLangDropdown((v) => !v)}
                aria-label="Change language"
              >
                <span className="mr-2">{LANGUAGES.find(l => l.code === i18n.language)?.label || 'EN'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleChangeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-150 ${i18n.language === lang.code ? 'text-green-400' : 'text-white'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              {/* Language Switcher for mobile */}
              <div className="relative">
                <button
                  className="w-full flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
                  onClick={() => setLangDropdown((v) => !v)}
                  aria-label="Change language"
                >
                  <span className="mr-2">{LANGUAGES.find(l => l.code === i18n.language)?.label || 'EN'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {langDropdown && (
                  <div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleChangeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-150 ${i18n.language === lang.code ? 'text-green-400' : 'text-white'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;