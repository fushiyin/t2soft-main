const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/playlists", async (req, res) => {
	try {
		const { playlistIds, maxResults = 10 } = req.query;
		const ids = Array.isArray(playlistIds) ? playlistIds : [playlistIds];

		const promises = ids.map(async (playlistId) => {
			const response = await axios.get(
				`https://www.googleapis.com/youtube/v3/playlistItems`,
				{
					params: {
						part: "snippet",
						playlistId,
						maxResults,
						key: process.env.YOUTUBE_API_KEY,
					},
				},
			);

			return {
				playlistId,
				data: response.data,
			};
		});

		const results = await Promise.allSettled(promises);
		const successfulResults = results
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value);

		res.json({ data: successfulResults });
	} catch (error) {
		console.error("YouTube API Error:", error);
		res.status(500).json({ error: "Failed to fetch YouTube data" });
	}
});

module.exports = router;
