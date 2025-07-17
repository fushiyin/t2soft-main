import React, { useState, useEffect } from 'react';
import { Clock, Users, Star, Filter, Search } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '@/components/Loading/LoadingSpinner.jsx';
import bg2 from '@/assets/image/bg_2.webp';

const PLAYLIST_IDs = [
  // Add your playlist IDs here, or import from your constants
];

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/youtube/playlists', {
        playlistIds: PLAYLIST_IDs,
        maxResults: 1,
      });
      const validPlaylists = res.data.filter(
        (p) => p.data && p.data.items && p.data.items.length > 0,
      );
      const mapped = validPlaylists.map((playlist) => {
        const item = playlist.data.items[0];
        const snippet = item.snippet;
        return {
          id: playlist.playlistId,
          title: snippet.title,
          description: snippet.description,
          image: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
          duration: 'N/A', // YouTube API does not provide playlist duration directly
          students: 'N/A', // Not available
          rating: 4.8, // Placeholder or calculate if you have data
          price: 'Free',
          level: 'All Levels',
          category: 'YouTube',
          videoCount: playlist.data.pageInfo?.totalResults || playlist.data.items.length,
        };
      });
      setCourses(mapped);
    } catch (e) {
      setError('Failed to fetch courses.');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

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
      default: return 'bg-cyan-700/30 text-cyan-100';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-cyan-50">
        <img
          src={bg2}
          alt="Courses Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-cyan-100/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center py-24 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-lg tracking-tight font-mono">
            Explore Our Courses
          </h1>
          <p className="text-2xl md:text-3xl text-cyan-700 max-w-2xl mx-auto font-mono drop-shadow">
            Unlock your trading potential with curated YouTube playlists and expert-led content.
          </p>
        </div>
      </section>
      {/* Main Section */}
      <section className="py-20 min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Glassmorphism animated pattern background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 720" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="60" height="60" fill="none" />
                <path d="M0 0L60 60M60 0L0 60" stroke="#38bdf8" strokeWidth="0.5" opacity="0.12" />
                <circle cx="30" cy="30" r="2" fill="#38bdf8" opacity="0.12" />
              </pattern>
            </defs>
            <rect width="1440" height="720" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow font-mono">
              Trading Courses
            </h1>
            <p className="text-2xl text-cyan-700 max-w-2xl mx-auto font-mono">
              Choose from our comprehensive selection of trading courses designed for all skill levels
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-12 pr-4 py-4 bg-white/80 text-cyan-900 rounded-xl border border-cyan-200 focus:border-cyan-400 focus:outline-none font-mono text-lg shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Filter className="h-6 w-6 text-cyan-400" />
              <select
                className="bg-white/80 text-cyan-900 px-6 py-4 rounded-xl border border-cyan-200 focus:border-cyan-400 focus:outline-none font-mono text-lg shadow-inner"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-cyan-700 text-lg font-mono">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredCourses.map((course) => (
                <div key={course.id} className="group relative bg-white/80 border border-cyan-200 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 backdrop-blur-md">
                  {/* Soft accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 via-blue-200 to-blue-100 opacity-70" />
                  {/* Card image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 left-4 px-4 py-1 rounded-full text-base font-bold font-mono shadow ${getLevelColor(course.level)} border border-cyan-200/40 bg-white/80 text-cyan-700`}>{course.level}</div>
                    {/* Hover overlay for details */}
                    <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-cyan-900 p-8 z-20">
                      <h3 className="text-2xl font-bold mb-2 text-cyan-900">{course.title}</h3>
                      <p className="text-cyan-700 mb-4 font-mono text-base line-clamp-none">{course.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <span className="bg-cyan-100 px-3 py-1 rounded-full">{course.videoCount} videos</span>
                        <span className="bg-cyan-100 px-3 py-1 rounded-full">{course.level}</span>
                      </div>
                      <button className="mt-2 px-8 py-3 bg-cyan-500 text-white rounded-full font-bold text-lg shadow hover:bg-cyan-400 transition-all border-0">ENROLL NOW</button>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="relative p-8 z-10">
                    <h3 className="text-2xl font-bold text-cyan-900 mb-3 font-mono line-clamp-2">{course.title}</h3>
                    <p className="text-cyan-700 mb-4 font-mono line-clamp-3">{course.description}</p>
                    <div className="flex items-center justify-between text-base text-cyan-700 mb-6 font-mono">
                      <div className="flex items-center gap-2"><Clock className="h-5 w-5" />{course.videoCount} videos</div>
                      <div className="flex items-center gap-2"><Users className="h-5 w-5" />{course.level}</div>
                      <div className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400 fill-current" />4.8</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-cyan-500 font-mono">{course.price}</span>
                      <button className="bg-gradient-to-r from-cyan-400 to-blue-300 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-400 hover:to-cyan-300 transition-all shadow font-mono text-lg">Enroll Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;