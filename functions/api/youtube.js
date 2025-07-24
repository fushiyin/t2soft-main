const express = require("express");
const {
	fetchChannelVideos,
	fetchPlaylist,
	fetchMultiplePlaylists,
} = require("../services/youtubeService");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const data = await fetchChannelVideos();
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/playlist", async (req, res) => {
	const { playlistId, maxResults = 4 } = req.query;
	try {
		const data = await fetchPlaylist(playlistId, maxResults);
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/playlists", async (req, res) => {
	console.log("Received request to fetch multiple playlists:", req.body);
	const { playlistIds, maxResults = 4 } = req.body;
	try {
		const results = await fetchMultiplePlaylists(playlistIds, maxResults);
		res.json(results);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
