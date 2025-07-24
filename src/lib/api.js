import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/trading-76356/us-central1/api";

// Create axios instance with better error handling
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchPlaylists = (playlistIds, maxResults = 4) =>
  apiClient.post("/youtube/playlists", { playlistIds, maxResults });

export const fetchPlaylist = (playlistId, maxResults = 4) =>
  apiClient.get("/youtube/playlist", { params: { playlistId, maxResults } });

export const fetchChannelVideos = () =>
  apiClient.get("/youtube");

export const fetchCourses = () =>
  apiClient.get("/courses"); 