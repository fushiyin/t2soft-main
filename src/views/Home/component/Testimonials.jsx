import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "TradeMaster completely transformed my approach to trading. The courses are incredibly detailed and the strategies actually work!",
      rating: 5,
      profit: "+$125,000"
    },
    {
      name: "Michael Chen",
      role: "Cryptocurrency Investor",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "The crypto course gave me the confidence to make informed decisions. I've seen consistent profits since completing the program.",
      rating: 5,
      profit: "+$89,500"
    },
    {
      name: "Emma Rodriguez",
      role: "Forex Trader",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "Amazing instructors and practical strategies. The risk management course alone saved me thousands in potential losses.",
      rating: 5,
      profit: "+$67,200"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how our students are achieving their financial goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-400 transition-all duration-300">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="h-8 w-8 text-green-400 mb-2" />
                <p className="text-gray-300 italic">{testimonial.content}</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg text-center font-bold">
                Trading Profit: {testimonial.profit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;