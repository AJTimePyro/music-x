const express = require("express");
const YTMPlaylist = require("./utils/yt_music/ytmusicPlaylist");

const app = express();
const port = 5000;

// routing
// New Releases
app.get('/new-release', async (req, res) => {
    const query = req.query;
    const limit = query.limit && !isNaN(query.limit) ? parseInt(query.limit) : Number.MAX_SAFE_INTEGER;

    const yt = await YTMPlaylist.getYTMusicList(limit, "newRelease");
    res.json(yt);
});

// Trending Songs
app.get('/trending', async (req, res) => {
    const query = req.query;
    const limit = query.limit && !isNaN(query.limit) ? parseInt(query.limit) : Number.MAX_SAFE_INTEGER;

    const yt = await YTMPlaylist.getYTMusicList(limit, "trending");
    res.json(yt);
});



// Serving the server
app.listen(
    port,
    () => {
        console.log(`Example app listening on port ${port}`)
    }
);