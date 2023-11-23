const YTMusicBase = require("./ytmusicBase");

class YTMusicSearch extends YTMusicBase {

    constructor(query) {
        super();
        this.payloadWebClient["query"] = query;
        this.payloadWebClient["params"] = "EgWKAQIIAWoQEAoQCRADEAQQBRAREBAQFQ%3D%3D";
        this.searchResults = [];

        let _searchData = async () => {
            const res = await super.sendpostreq(
                this.api_url + "youtubei/v1/search?key=" + this.key,
                this.payloadWebClient
            );

            if ("error" in res) {
                throw new Error("Unable to get search result...");
            }
            else {
                this.chunkData = res;
                _parseData();
            }
        };

        let _parseData = () => {
            const trueContent = this.chunkData["contents"]["tabbedSearchResultsRenderer"]["tabs"][0]["tabRenderer"]["content"]["sectionListRenderer"]["contents"][0]["musicShelfRenderer"]["contents"];

            for (const index in trueContent) {
                const musicContent = trueContent[index];
                const mRLITR = musicContent["musicResponsiveListItemRenderer"];
                const musicFlexCol = mRLITR["flexColumns"];
                const musicFlexCol1 = musicFlexCol[1];
                const mRLITFCRruns = _getmRLITFCRruns(musicFlexCol1);

                let tempObj = {};

                // Thumbnail parsing
                tempObj["thumbnail"] = _parseThumbnail(mRLITR);

                // Music ID & Title parsing
                const idTitle = _parseTitleAndID(musicFlexCol[0]);
                tempObj["music_id"] = idTitle[0];
                tempObj["title"] = idTitle[1];

                // Artist Info Parsing
                const artist = _getArtist(mRLITFCRruns[0]);
                tempObj["artist_name"] = artist[0];
                tempObj["artist_channel_id"] = artist[1];

                // Album Info Parsing
                const album = _getAlbum(mRLITFCRruns[2]);
                tempObj["album_name"] = album[0];
                tempObj["album_channel_id"] = album[1];

                // Duration parsing
                tempObj["duration"] = _parseDuration(mRLITFCRruns[4]);

                tempObj["id"] = parseInt(index);

                this.searchResults.push(tempObj);
            }
        };

        let _parseThumbnail = (mRLITR) => {
            const thumbnailList = mRLITR["thumbnail"]["musicThumbnailRenderer"]["thumbnail"]["thumbnails"];
            return super.getBestThumbnail(thumbnailList);
        };

        let _parseTitleAndID = (musicFlexCol) => {
            const mRLITFCRruns = _getmRLITFCRruns(musicFlexCol);
            const mRLITFCRruns0 = mRLITFCRruns[0];
            const title = mRLITFCRruns0["text"];

            const watchEndPoint = mRLITFCRruns0["navigationEndpoint"]["watchEndpoint"];
            const musicId = watchEndPoint["videoId"];

            return [musicId, title];
        };

        let _getmRLITFCRruns = (musicFlexCol) => {
            return musicFlexCol["musicResponsiveListItemFlexColumnRenderer"]["text"]["runs"];
        };

        let _getArtist = (mRLITFCRruns) => {
            const artistName = mRLITFCRruns["text"];
            const artistChannelId = _getNavBrEndpointBrId(mRLITFCRruns);

            return [artistName, artistChannelId];
        };

        let _getNavBrEndpointBrId = (mRLITFCRruns) => {
            const navEndPoint = mRLITFCRruns["navigationEndpoint"];
            return navEndPoint ? navEndPoint["browseEndpoint"]["browseId"] : null;
        };

        let _getAlbum = (mRLITFCRruns) => {
            const albumName = mRLITFCRruns["text"];
            const albumChannelId = _getNavBrEndpointBrId(mRLITFCRruns);

            return [albumName, albumChannelId];
        };

        let _parseDuration = (musicFlexCol) => {
            return musicFlexCol["text"];
        };

        this.extraction = async () => {
            await _searchData();
        }
    };

    async start() {
        await this.extraction();
    }
}

async function getYTMSearchResult(
    query
) {
    let ytNewRe = new YTMusicSearch(query);
    await ytNewRe.start();
    let responseData = {
        "type" : "search_" + query,
        "song_list" : ytNewRe.searchResults
    }
    return responseData;
}

module.exports = {
    getYTMSearchResult
};