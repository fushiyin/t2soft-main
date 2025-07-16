import React, { useState } from 'react';
import { Clock, Users, Star, Filter, Search } from 'lucide-react';

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      title: "Forex Fundamentals",
      description: "Master the basics of foreign exchange trading with comprehensive lessons on currency pairs, market analysis, and trading strategies.",
      image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "12 weeks",
      students: "15,420",
      rating: 4.8,
      price: "$299",
      level: "Beginner",
      category: "Forex"
    },
    {
      id: 2,
      title: "Crypto Mastery",
      description: "Dive deep into cryptocurrency trading strategies, blockchain technology, and digital asset management.",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "16 weeks",
      students: "12,300",
      rating: 4.9,
      price: "$399",
      level: "Intermediate",
      category: "Crypto"
    },
    {
      id: 3,
      title: "Risk Management Pro",
      description: "Learn advanced risk management techniques to protect your trading capital and maximize returns.",
      image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "8 weeks",
      students: "8,700",
      rating: 4.7,
      price: "$199",
      level: "Advanced",
      category: "Risk Management"
    },
    {
      id: 4,
      title: "Technical Analysis Deep Dive",
      description: "Master chart patterns, indicators, and technical analysis tools for better trading decisions.",
      image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "14 weeks",
      students: "9,800",
      rating: 4.6,
      price: "$349",
      level: "Intermediate",
      category: "Analysis"
    },
    {
      id: 5,
      title: "Algorithmic Trading",
      description: "Build automated trading systems using Python and advanced algorithmic strategies.",
      image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "20 weeks",
      students: "5,200",
      rating: 4.9,
      price: "$599",
      level: "Advanced",
      category: "Technology"
    },
    {
      id: 6,
      title: "Day Trading Bootcamp",
      description: "Intensive course covering day trading strategies, scalping techniques, and market psychology.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "6 weeks",
      students: "11,500",
      rating: 4.5,
      price: "$449",
      level: "Beginner",
      category: "Day Trading"
    }
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trading Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our comprehensive selection of trading courses designed for all skill levels
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">{course.price}</span>
                  <button className="bg-green-400 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;