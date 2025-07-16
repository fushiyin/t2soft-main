import React from 'react';

const Partner = () => {
  const partners = [
    "Bloomberg",
    "Reuters",
    "TradingView",
    "MetaTrader",
    "Binance",
    "Coinbase"
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Featured In & Partnered With
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200">
                <span className="text-gray-300 font-semibold">{partner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;