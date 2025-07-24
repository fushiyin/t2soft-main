const axios = require("axios");
require("dotenv").config(); // Load biến từ .env

let API_KEY = process.env.YOUTUBE_API_KEY;
let CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const MAX_RESULTS = 6;

try {
	// Nếu đang chạy trong Firebase Functions
	const functions = require("firebase-functions");

	// Ưu tiên lấy từ Firebase config nếu có
	API_KEY = functions.config().youtube?.api_key || API_KEY;
	CHANNEL_ID = functions.config().youtube?.channel_id || CHANNEL_ID;
} catch (e) {
	// Bỏ qua nếu không trong môi trường Firebase (Node.js local)
}

// Kiểm tra biến bắt buộc
if (!API_KEY || !CHANNEL_ID) {
	throw new Error(
		"Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in Firebase config or .env file",
	);
}

async function fetchChannelVideos() {
	const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
	const response = await axios.get(url);
	return response.data;
}

async function fetchPlaylist(playlistId, maxResults = 4) {
	if (!playlistId) throw new Error("Missing playlistId");
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=${maxResults}`;
	const response = await axios.get(url);
	return response.data;
}

async function fetchMultiplePlaylists(playlistIds, maxResults = 4) {
	if (!Array.isArray(playlistIds) || playlistIds.length === 0) {
		throw new Error("playlistIds must be a non-empty array");
	}
	return Promise.all(
		playlistIds.map(async (playlistId) => {
			try {
				const data = await fetchPlaylist(playlistId, maxResults);
				return { playlistId, data };
			} catch (err) {
				return {
					playlistId,
					error: err.response?.data || err.message,
				};
			}
		}),
	);
}

module.exports = {
	fetchChannelVideos,
	fetchPlaylist,
	fetchMultiplePlaylists,
};
