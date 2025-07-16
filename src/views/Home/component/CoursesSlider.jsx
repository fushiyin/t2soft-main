import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { PLAYLIST_IDs } from "@/constant/common.js";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80";

const CoursesSlider = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line
  }, []);

  const fetchPlaylists = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/youtube/playlists', {
        playlistIds: PLAYLIST_IDs,
        maxResults: 1
      });
      const validPlaylists = res.data.filter(p => p.data && p.data.items && p.data.items.length > 0);
      setPlaylists(validPlaylists);
    } catch (e) {
      setError("Failed to fetch playlists.");
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 min-h-screen bg-[#181c2b]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start your trading journey with our expertly crafted courses designed for all skill levels
          </p>
        </div>
        {loading && (
          <div className="text-center text-lg text-gray-400">Loading playlists...</div>
        )}
        {error && (
          <div className="text-center text-red-400">{error}</div>
        )}
        {!loading && !error && playlists.length === 0 && (
          <div className="text-center text-gray-400">No playlists found.</div>
        )}
        {!loading && !error && (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={32}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {playlists.map((playlist) => {
              const item = playlist.data.items[0];
              const snippet = item.snippet;
              return (
                <SwiperSlide key={playlist.playlistId}>
                  <div className="relative h-80 flex items-end rounded-2xl overflow-hidden shadow-lg border border-gray-700 group">
                    {/* Background image */}
                    <img
                      src={PLACEHOLDER_IMG}
                      alt="Course background"
                      className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    {/* Card content */}
                    <div className="relative z-20 p-8 w-full flex flex-col justify-end h-full">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{snippet.title}</h3>
                      <p className="text-gray-200 mb-6 text-sm line-clamp-3">
                        {snippet.description || 'Just get the code and sit tight, you will witness its power and performance in lead generation. It’s simple yet powerful and productive technology. Experience the best with us.'}
                      </p>
                      <a
                        href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-2 border border-gray-300 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 w-max bg-black/40 backdrop-blur"
                      >
                        Watch Intro <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default CoursesSlider;