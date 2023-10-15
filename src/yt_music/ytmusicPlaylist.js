import YTMusicBase from './ytmusicBase';
// const YTMusicBase = require('./ytmusicBase');


class YTMusicPlaylist extends YTMusicBase {

    constructor(playlistId) {
        super();
        this.playlistId = playlistId;
        this.songsList = [];

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


                this.songsList.push(tempObj);
            }
            console.log(this.songsList);
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

        _playlistData();
    }

}
// let yt = new YTMusicPlaylist("RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU");
// console.log(yt.songsList)