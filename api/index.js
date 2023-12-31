const express = require("express");
const path = require("path");
const YTMPlaylist = require("../utils/yt_music/ytmusicPlaylist");
const YTMData = require("../utils/yt_music/ytmusicSongs");
const YTMSearch = require("../utils/yt_music/ytmusicSearch");
const YTMArtist = require("../utils/yt_music/ytmusicArtist");

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname + "/../build")));

// routing
// New Releases
app.get('/api/new-release', async (req, res) => {
    const query = req.query;
    const limit = query.limit && !isNaN(query.limit) ? parseInt(query.limit) : Number.MAX_SAFE_INTEGER;

    const newReleaseSongs = await YTMPlaylist.getYTMusicList(limit, "newRelease");
    res.json(newReleaseSongs);
});

// Trending Songs
app.get('/api/trending', async (req, res) => {
    const query = req.query;
    const limit = query.limit && !isNaN(query.limit) ? parseInt(query.limit) : Number.MAX_SAFE_INTEGER;

    const trendingSongs = await YTMPlaylist.getYTMusicList(limit, "trending");
    res.json(trendingSongs);
});

// Song Data
app.get('/api/song-info/:musicId', async (req, res) => {
    const songId = req.params.musicId;

    const songData = await YTMData.getYTMusicInfo(songId);
    res.json(songData);
});

// Search song
app.get('/api/search', async (req, res) => {
    const query = req.query;
    const searchQuery = query.query;

    if (searchQuery) {
        const songData = await YTMSearch.getYTMSearchResult(searchQuery);
        res.json(songData);
    }
    else res.json(
        {
            "error" : "query not given"
        }
    );
});

// Get all songs of Artist
app.get('/api/artist/:artistID', async (req, res) => {
    const artistID = req.params.artistID;

    const songsList = await YTMArtist.getYTArtistSongs(artistID);
    res.json(songsList);
})


// Serving the server
app.listen(
    port,
    () => {
        console.log(`Backend running on port ${port}`)
    }
);