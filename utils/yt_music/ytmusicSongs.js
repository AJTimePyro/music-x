const YTMusicBase = require("./ytmusicBase");

class YTMusic extends YTMusicBase {

    constructor(musicId) {
        super();
        this.musicId = musicId;
        this.musicQuery["videoId"] = musicId;
        this.songInfo = {};

        const queryString = new URLSearchParams(this.musicQuery).toString();

        let _songData = async () => {
            const res = await super.sendpostreq(
                "https://www.youtube.com/youtubei/v1/player?" + queryString,
                this.payloadAndroidClient
            )
            if ("error" in res) {
                throw new Error("Unable to get song data...");
            }
            else {
                this.chunkData = res;
                _parseData();
            }
        }

        let _parseData = () => {
            const streamDataList = this.chunkData["streamingData"]["adaptiveFormats"];
            this.songInfo["songURL"] = _getBestAudioStreams(streamDataList);

            const songDetails = this.chunkData["videoDetails"];
            this.songInfo["title"] = songDetails["title"];
            this.songInfo["duration"] = songDetails["lengthSeconds"];
            
            const thumbnailList = songDetails["thumbnail"]["thumbnails"];
            this.songInfo["thumbnail"] = super.getBestThumbnail(thumbnailList);
        }

        let _getBestAudioStreams = (streamDataList) => {
            let highBitRate = 0;
            let streamURL = null;

            streamDataList.forEach(
                element => {
                    if (element["mimeType"].startsWith("audio")) {
                        if (element["bitrate"] > highBitRate) {
                            streamURL = element["url"];
                            highBitRate = element["bitrate"];
                        }
                    }
                }
            );
            return streamURL;
        }

        this.extraction = async () => {
            await _songData();
        }
    }

    async start() {
        await this.extraction();
    }
}

async function getYTMusicInfo(musicID) {
    let yTMDataExtract = new YTMusic(musicID);
    await yTMDataExtract.start();
    return yTMDataExtract.songInfo;
}

module.exports = {
    getYTMusicInfo
};