const YTMusicBase = require("./ytmusicBase");


class YTMusicPlaylist extends YTMusicBase {

    constructor(
        playlistId,
        limit = Number.MAX_SAFE_INTEGER
    ) {
        super();
        this.playlistId = playlistId;
        this.limit = limit;
        this.songsList = {};

        this.payload["browseId"] = "VL" + this.playlistId;

        let _playlistData = async () => {
            const res = await super.sendpostreq(
                this.api_url + "youtubei/v1/browse?key=" + this.key,
                this.payload
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
                let tempObj = {};

                // Thumbnail parsing
                tempObj["thumbnail"] = _parseThumbnail(musicData);
                
                // Music ID and Title parsing
                const idTitle = _parseMusicIdTitle(musicFlexCol);
                tempObj["music_id"] = idTitle[0];
                tempObj["title"] = idTitle[1];
                
                // Artist Details
                const artist = _getArtist(musicFlexCol)
                tempObj["artist_name"] = artist[0];
                tempObj["artist_channel_id"] = artist[1];
                
                // Album Details
                const album = _getAlbum(musicFlexCol);
                tempObj["album_name"] = album[0];
                tempObj["album_channel_id"] = album[1];

                this.songsList[index] = tempObj;
            }
        }

        let _parseThumbnail = (musicData) => {
            const thumbnails=  musicData["thumbnail"]["musicThumbnailRenderer"]["thumbnail"]["thumbnails"];

            const maxThumbnail = thumbnails.reduce(
                (
                    max,
                    current
                ) => {
                    return (current.width > max.width) ? current : max;
                }
            );
              
            return maxThumbnail.url;              
        }

        let _parseMusicIdTitle = (musicFlexCol) => {
            const musicRLIFCRText = _getMRLIFCRText(musicFlexCol[0]);
            const musicR0 = _getMR0(musicRLIFCRText);

            const title = musicR0["text"];
            const musicId = musicR0["navigationEndpoint"]["watchEndpoint"]["videoId"];

            return [musicId, title];
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
                albumId = musicR0["navigationEndpoint"]["browseEndpoint"]["browseId"]
            }

            return [albumName, albumId];
        }

        this.extraction = async () => {
            await _playlistData();
        }
    }

    async start() {
        await this.extraction();
    }

}

async function ytMusicNewRelease(limit) {
    const newReleasePlaylistId = "RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU"
    let ytNewRe = new YTMusicPlaylist(
        newReleasePlaylistId,
        limit
    );
    await ytNewRe.start();
    return ytNewRe.songsList;
}

module.exports = {
    YTMusicPlaylist,
    ytMusicNewRelease
};