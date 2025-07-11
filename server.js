const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = 'AIzaSyBaTM7Gh3iXcqfDRpxSwbT92o3jVhcMDQg';
const CHANNEL_ID = 'UCC-Kp74w4KD6_jl7umkFgzQ';
const MAX_RESULTS = 6;

app.use(cors());

app.get('/api/youtube', async (req, res) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'YouTube API error', status: response.status });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`YouTube proxy server running on port ${PORT}`);
}); 