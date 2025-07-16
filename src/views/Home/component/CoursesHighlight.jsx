import React from 'react';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PLAYLIST_IDs } from "@/constant/common.js";
import axios from 'axios';

const CourseHighlight = () => {
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
        maxResults: 1 // Only fetch the first video for thumbnail/title/desc
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            Start your trading journey with our expertly crafted courses designed for all skill levels
          </p>
        </div>

        <div className="flex flex-col">
          {loading && (
            <div className="text-center text-lg text-gray-500">Loading playlists...</div>
          )}
          {error && (
            <div className="text-center text-red-500">{error}</div>
          )}
          {!loading && !error && playlists.length === 0 && (
            <div className="text-center text-gray-500">No playlists found.</div>
          )}
          {!loading && !error && playlists.map((playlist, index) => {
            const item = playlist.data.items[0];
            const snippet = item.snippet;
            const isEven = index % 2 === 0;
            return (
              <div
                key={playlist.playlistId}
                className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} bg-gray-900 overflow-hidden shadow-lg border border-gray-700`}
              >
                <div className="md:w-1/2 w-full h-64 md:h-auto flex-shrink-0 flex items-center justify-center bg-gray-800">
                  <img
                    src={snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url}
                    alt={snippet.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">Playlist</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">{snippet.title}</h3>
                  <p className="text-gray-300 mb-6 line-clamp-4">{snippet.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.contentDetails?.videoPublishedAt ? new Date(item.contentDetails.videoPublishedAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Playlist</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">Free</span>
                    <a
                      href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-400 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>View Playlist</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <button className="border-2 border-green-400 px-8 py-3 rounded-lg font-semibold bg-green-400 text-gray-900 transition-all duration-200">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseHighlight;