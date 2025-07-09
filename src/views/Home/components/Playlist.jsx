import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyCWALP3sa9w3zAVnTC_dfbxOEtrbNJPRhA"; // <-- Replace with your API key
const CHANNEL_ID = "UCC-Kp74w4KD6_jl7umkFgzQ"; // Tradingneoakathehung channel ID
const CHANNEL_NAME = "Tradingneoakathehung";

export default function PlayList() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hovered, setHovered] = useState(null); // Track hovered playlist
    const subscribeRefs = useRef({}); // Store refs for subscribe buttons

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const fetchPlaylist = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=24&key=${YOUTUBE_API_KEY}`
            );
            setPlaylists(response.data.items);
        } catch (err) {
            setError("Failed to fetch playlists. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Load YouTube subscribe button script once
    useEffect(() => {
        if (!document.getElementById("youtube-subscribe-script")) {
            const tag = document.createElement("script");
            tag.src = "https://apis.google.com/js/platform.js";
            tag.id = "youtube-subscribe-script";
            tag.async = true;
            document.body.appendChild(tag);
        }
    }, []);

    // Re-render the subscribe button when a card is hovered
    useEffect(() => {
        if (hovered !== null && subscribeRefs.current[hovered]) {
            // Wait a tick for the DOM to update
            setTimeout(() => {
                if (window.gapi && window.gapi.ytsubscribe) {
                    window.gapi.ytsubscribe.go();
                } else if (window.YT && window.YT.subscribe && window.YT.subscribe.go) {
                    window.YT.subscribe.go();
                }
            }, 0);
        }
    }, [hovered]);

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center bg-white relative py-12">
            <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-md" />
            <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 drop-shadow-lg">YouTube Playlists</h2>
                {loading && <p className="text-white">Loading...</p>}
                {error && <p className="text-red-400">{error}</p>}
                {!loading && !error && playlists.length === 0 && (
                    <p className="text-white">No playlists found.</p>
                )}
                {!loading && !error && playlists.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
                        {playlists.map((playlist) => (
                            <a
                                key={playlist.id}
                                href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white/10 rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border hover:border-white/30 relative"
                                onMouseEnter={() => setHovered(playlist.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="relative w-full aspect-video overflow-hidden">
                                    <img
                                        src={playlist.snippet.thumbnails?.high?.url || playlist.snippet.thumbnails?.default?.url}
                                        alt={playlist.snippet.title}
                                        className="w-full h-full object-cover group-hover:brightness-90 transition duration-300"
                                    />
                                    <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                        {playlist.contentDetails?.itemCount || 0} videos
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col justify-between p-4">
                                    <div className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-yellow-300 transition">
                                        {playlist.snippet.title}
                                    </div>
                                    <div className="text-gray-300 text-sm line-clamp-2 mb-2">
                                        {playlist.snippet.description}
                                    </div>
                                </div>
                                {/* Hover overlay for channel and subscribe button */}
                                <div className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30`}>
                                    <div className="text-white text-lg font-bold mb-3">{CHANNEL_NAME}</div>
                                    <div className="flex justify-center">
                                        <div
                                            ref={el => subscribeRefs.current[playlist.id] = el}
                                            className="g-ytsubscribe"
                                            data-channelid={CHANNEL_ID}
                                            data-layout="default"
                                            data-count="default"
                                        ></div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}