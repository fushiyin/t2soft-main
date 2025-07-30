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

// Documents API
export const fetchDocuments = (params = {}) =>
  apiClient.get("/documents", { params });

export const fetchDocumentById = (id) =>
  apiClient.get(`/documents/${id}`);

export const incrementDocumentDownload = (id) =>
  apiClient.post(`/documents/${id}/download`);

// Blog Posts API - Direct API calls
export const fetchPinnedPosts = (limit = 3) =>
  apiClient.get("/posts/pinned", { params: { limit } });

export const fetchPostById = (id) =>
  apiClient.get(`/posts/${id}`);

export const fetchPostsByCategory = (category, params = {}) =>
  apiClient.get(`/posts/category/${category}`, { params });

export const fetchPostsByAuthor = (author_id, params = {}) =>
  apiClient.get(`/posts/author/${author_id}`, { params });

export const fetchPostsByCourse = (course_id, params = {}) =>
  apiClient.get(`/posts/course/${course_id}`, { params });

export const incrementPostReadCount = (id) =>
  apiClient.patch(`/posts/${id}/increment-read`);

export const createPost = (postData) =>
  apiClient.post("/posts", postData);

export const updatePost = (id, postData) =>
  apiClient.put(`/posts/${id}`, postData);

export const deletePost = (id) =>
  apiClient.delete(`/posts/${id}`);

export const togglePostPin = (id) =>
  apiClient.patch(`/posts/${id}/toggle-pin`);

export const fetchPopularPosts = (limit = 6) =>
  apiClient.get("/posts/popular", { params: { limit } });

export const fetchRecentPosts = (limit = 6) =>
  apiClient.get("/posts/recent", { params: { limit } });


export { apiClient };
