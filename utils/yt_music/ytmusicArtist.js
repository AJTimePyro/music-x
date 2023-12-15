const YTMusicPlaylist = require("./ytmusicPlaylist").YTMusicPlaylist;

class YTMusicArtist extends YTMusicPlaylist {

    constructor(channelID) {
        super();
        this.channelID = channelID;
        this.payloadWebRemixClient["browseId"] = this.channelID;
        this.artistInfo = {};
        this.artistInfoSongList = {};
    }

    // Finding Artist Songs Playlist from unfiltered data
    _parsePlaylist() {
        const requiredContent = this.chunkData["contents"]["singleColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["sectionListRenderer"]["contents"][0];
        const mSRTR0 = requiredContent["musicShelfRenderer"]["title"]["runs"][0];
        const navEndBrowseEnd = mSRTR0["navigationEndpoint"]["browseEndpoint"];
        const playlistID = navEndBrowseEnd["browseId"];
        return playlistID;
    }

    _parseArtistImg(data) {
        const avatars = data["header"]["c4TabbedHeaderRenderer"]["avatar"];
        const thumbnails = avatars["thumbnails"];
        return this.getBestThumbnail(thumbnails);
    }

    async _getArtistImg() {
        this.payloadWebClient["browseId"] = this.channelID;
        const res = await super.sendpostreq(
            "https://www.youtube.com/youtubei/v1/browse?key=" + this.key,
            this.payloadWebClient
        )

        if ("error" in res) {
            throw new Error("Unable to return given artist songs...");
        }
        else {
            return await this._parseArtistImg(res);
        }
    }

    // Parse Artist info
    async _getArtistInfo() {
        // Get Artist image
        this.artistInfo["thumbnail"] = await this._getArtistImg();

        const mIHR = this.chunkData["header"]["musicImmersiveHeaderRenderer"];

        // Get Artist Name
        const artistTitle = mIHR["title"];
        const artistName = artistTitle["runs"][0]["text"];
        this.artistInfo["artist_name"] = artistName;
        
        // Get Artist Description
        const artistDesc = mIHR["description"];
        const description = artistDesc["runs"][0]["text"];
        this.artistInfo["artist_desc"] = description;
    }

    async setArtistSongPlaylist() {
        const res = await super.sendpostreq(
            this.api_url + "youtubei/v1/browse?key=" + this.key,
            this.payloadWebRemixClient
        )

        if ("error" in res) {
            throw new Error("Unable to return given artist songs...");
        }
        else {
            this.chunkData = res;
            this.playlistId = this._parsePlaylist();
            this.payloadWebRemixClient["browseId"] = this.playlistId;
        }

    }

    async start() {
        await this.setArtistSongPlaylist();
        await this._getArtistInfo();
        await super.start();
        this.artistInfoSongList["artistInfo"] = this.artistInfo;
        this.artistInfoSongList["songsList"] = this.songsList;
        this.artistInfoSongList["type"] = "artist_" + this.channelID;
    }

}

async function getYTArtistSongs(artistID) {
    let yTMDataExtract = new YTMusicArtist(artistID);
    await yTMDataExtract.start();
    return yTMDataExtract.artistInfoSongList;
};

module.exports = {
    getYTArtistSongs
};