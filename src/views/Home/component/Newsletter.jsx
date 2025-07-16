import React, { useState, useEffect } from 'react';
import { X, Mail, Gift } from 'lucide-react';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Gift className="h-8 w-8" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Get Free Trading Guides!
          </h2>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter and receive exclusive trading strategies, market insights, and a free beginner's guide to forex trading.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-300 transition-colors duration-200"
            >
              Subscribe & Get Free Guide
            </button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;