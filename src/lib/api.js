import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export const fetchPlaylists = (playlistIds, maxResults = 4) =>
  axios.post(`${API_BASE}/api/youtube/playlists`, { playlistIds, maxResults });

export const fetchPlaylist = (playlistId, maxResults = 4) =>
  axios.get(`${API_BASE}/api/youtube/playlist`, { params: { playlistId, maxResults } });

export const fetchChannelVideos = () =>
  axios.get(`${API_BASE}/api/youtube`);

export const fetchCourses = () =>
  axios.get(`${API_BASE}/api/courses`); 