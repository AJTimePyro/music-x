const YTMusicBase = require("./ytmusicBase");

const specialPlaylist = {
    "newRelease" : "RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU",
    "trending" : "PL_yIBWagYVjwYmv3PlwYk0b4vmaaHX6aL"
}

class YTMusicPlaylist extends YTMusicBase {

    constructor(
        playlistId = null,
        limit = Number.MAX_SAFE_INTEGER
    ) {
        super();
        this.playlistId = playlistId;
        this.limit = limit;
        this.songsList = [];
        this.payloadWebClient["browseId"] = "VL" + this.playlistId;
    }

    async start() {
        let _playlistData = async () => {
            const res = await super.sendpostreq(
                this.api_url + "youtubei/v1/browse?key=" + this.key,
                this.payloadWebClient
            )
            if ("error" in res) {
                throw new Error("Unable to reach to given playlist...");
            }
            else {
                this.chunkData = res;
                _parseData();
            }
        }

        let _parseData = () => {
            const trueContent = this.chunkData["contents"]["singleColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["sectionListRenderer"]["contents"][0]["musicPlaylistShelfRenderer"]["contents"];
            
            for (const index in trueContent) {
                if (index >= this.limit) break;

                const musicContent = trueContent[index];
                const musicData = musicContent["musicResponsiveListItemRenderer"];
                const musicFlexCol = musicData["flexColumns"];
                const musicFixedCol = musicData["fixedColumns"];
                let tempObj = {};

                // Thumbnail parsing
                tempObj["thumbnail"] = _parseThumbnail(musicData);
                
                // Music ID and Title parsing
                const idTitle = _parseMusicIdTitle(musicFlexCol, tempObj);
                tempObj["music_id"] = idTitle[0];
                tempObj["title"] = idTitle[1];

                // Music Duration
                tempObj["duration"] = _parseDuration(musicFixedCol);
                
                // Artist Details
                const artist = _getArtist(musicFlexCol)
                tempObj["artist_name"] = artist[0];
                tempObj["artist_channel_id"] = artist[1];
                
                // Album Details
                const album = _getAlbum(musicFlexCol);
                tempObj["album_name"] = album[0];
                tempObj["album_channel_id"] = album[1];

                tempObj["id"] = parseInt(index);

                this.songsList.push(tempObj);
            }
        }

        let _parseThumbnail = (musicData) => {
            const thumbnails=  musicData["thumbnail"]["musicThumbnailRenderer"]["thumbnail"]["thumbnails"];
            return super.getBestThumbnail(thumbnails);
        }

        let _parseMusicIdTitle = (musicFlexCol, tempObj) => {
            const musicRLIFCRText = _getMRLIFCRText(musicFlexCol[0]);
            const musicR0 = _getMR0(musicRLIFCRText);
            const title = musicR0["text"];

            let musicId;
            const watchEndPoint = "navigationEndpoint" in musicR0 ? musicR0["navigationEndpoint"]["watchEndpoint"] : null;
            if (watchEndPoint) {
                musicId = watchEndPoint["videoId"];
            }
            else {
                const thumbnail = tempObj["thumbnail"];
                musicId = thumbnail.match(/\/vi\/([^/]+)\//)[1];
            }

            return [musicId, title];
        }

        let _parseDuration = (musicFixedCol) => {
            const musicRLIFCRT = musicFixedCol[0]["musicResponsiveListItemFixedColumnRenderer"]["text"];
            const mR0 = _getMR0(musicRLIFCRT);
            return mR0["text"];
        }

        let _getMRLIFCRText = (musicCol) => {
            return musicCol["musicResponsiveListItemFlexColumnRenderer"]["text"];
        }

        let _getMR0 = (musicRLIFCRText) => {
            return musicRLIFCRText["runs"][0];
        }

        let _getArtist = (musicFlexCol) => {
            const musicRLIFCRText = _getMRLIFCRText(musicFlexCol[1]);
            const musicR0 = _getMR0(musicRLIFCRText);

            const artistName = musicR0["text"];
            const artistChannelId = "navigationEndpoint" in musicR0 ? musicR0["navigationEndpoint"]["browseEndpoint"]["browseId"] : null;

            return [artistName, artistChannelId];
        }

        let _getAlbum = (musicFlexCol) => {
            const musicRLIFCRText = _getMRLIFCRText(musicFlexCol[2]);

            let albumName = null;
            let albumId = null;
            if (Object.keys(musicRLIFCRText).length !== 0) {
                const musicR0 = _getMR0(musicRLIFCRText);
                albumName = musicR0["text"]
                albumId = "navigationEndpoint" in musicR0 ? musicR0["navigationEndpoint"]["browseEndpoint"]["browseId"] : null;
            }

            return [albumName, albumId];
        }

        await _playlistData();
    }

}

async function getYTPlaylistInfo(
    playlistId,
    limit
) {
    let ytNewRe = new YTMusicPlaylist(
        playlistId,
        limit
    );
    await ytNewRe.start();
    return ytNewRe.songsList;
}

async function getYTMusicList(
    limit,
    type
) {
    const playlistId = specialPlaylist[type];
    const songData = await getYTPlaylistInfo(playlistId, limit);
    let responseData = {
        "type" : type,
        "song_list" : songData
    }
    return responseData;
}

module.exports = {
    YTMusicPlaylist,
    getYTMusicList
};