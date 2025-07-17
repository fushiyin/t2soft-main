import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5173;
const API_KEY = process.env.YOUTUBE_API_KEY;
console.log(API_KEY);
const CHANNEL_ID = "UCC-Kp74w4KD6_jl7umkFgzQ";
const MAX_RESULTS = 6;

if (!API_KEY) {
	console.error("❌ Missing YOUTUBE_API_KEY in .env file");
	process.exit(1);
}

app.use(cors());
// IMPORTANT: express.json() must be before all routes to parse JSON bodies
app.use(express.json());

app.get("/api/youtube", async (req, res) => {
	try {
		console.log(API_KEY);
		const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
		const response = await axios.get(url);
		res.json(response.data);
	} catch (err) {
		console.error("YouTube channel fetch error:", err.response?.data || err.message);
		res.status(500).json({
			error: "Failed to fetch videos from YouTube",
			details: err.response?.data || err.message,
		});
	}
});

app.get("/api/youtube/playlist", async (req, res) => {
	const { playlistId, maxResults = 4 } = req.query;
	console.log(API_KEY);

	if (!playlistId) {
		return res.status(400).json({ error: "Missing playlistId parameter" });
	}

	try {
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=${maxResults}`;
		const response = await axios.get(url);
		res.json(response.data);
	} catch (err) {
		console.error("YouTube playlist fetch error:", err.response?.data || err.message);
		res.status(500).json({
			error: "Failed to fetch playlist from YouTube",
			details: err.response?.data || err.message,
		});
	}
});

// POST endpoint to fetch multiple playlists by array of playlistIds
app.post("/api/youtube/playlists", async (req, res) => {
	const { playlistIds, maxResults = 4 } = req.body;
	if (!Array.isArray(playlistIds) || playlistIds.length === 0) {
		return res.status(400).json({ error: "playlistIds must be a non-empty array" });
	}
	try {
		const results = await Promise.all(
			playlistIds.map(async (playlistId) => {
				try {
					const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=${maxResults}`;
					const response = await axios.get(url);
					return { playlistId, data: response.data };
				} catch (err) {
					return { playlistId, error: err.response?.data || err.message };
				}
			}),
		);
		res.json(results);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch playlists", details: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`🚀 YouTube proxy server running at http://localhost:${PORT}`);
});
