const YTMusicPlaylist = require("./ytmusicPlaylist").YTMusicPlaylist;

class YTMusicArtist extends YTMusicPlaylist {

    constructor(channelID) {
        super();
        this.channelID = channelID;
        this.payloadWebClient["browseId"] = this.channelID;
    }

    // Finding Artist Songs Playlist from unfiltered data
    _parsePlaylist() {
        const requiredContent = this.chunkData["contents"]["singleColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["sectionListRenderer"]["contents"][0];
        const mSRTR0 = requiredContent["musicShelfRenderer"]["title"]["runs"][0];
        const navEndBrowseEnd = mSRTR0["navigationEndpoint"]["browseEndpoint"];
        const playlistID = navEndBrowseEnd["browseId"];
        return playlistID;
    }

    async setArtistSongPlaylist() {
        const res = await super.sendpostreq(
            this.api_url + "youtubei/v1/browse?key=" + this.key,
            this.payloadWebClient
        )

        if ("error" in res) {
            throw new Error("Unable to return given artist songs...");
        }
        else {
            this.chunkData = res;
            this.playlistId = this._parsePlaylist();
            this.payloadWebClient["browseId"] = this.playlistId;
        }

    }

    async start() {
        await this.setArtistSongPlaylist();
        await super.start();
    }

}

async function getYTArtistSongs(artistID) {
    let yTMDataExtract = new YTMusicArtist(artistID);
    await yTMDataExtract.start();
    return yTMDataExtract.songsList;
};

module.exports = {
    getYTArtistSongs
};