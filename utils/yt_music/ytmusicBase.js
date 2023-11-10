const axios = require("axios");

class YTMusicBase {

    constructor() {
        
        this.api_url = "https://music.youtube.com/"
        this.key = "AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30"
        this.headers = {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0"
        }
        this.payloadWebClient = {
            "context": {
                "client": {
                    "clientName": "WEB_REMIX",
                    "clientVersion": "1.20230911.01.00"
                }
            }
        }
        this.payloadAndroidClient = {
            "context": {
                "client": {
                    "clientName": "ANDROID_MUSIC",
                    "clientVersion": "5.16.51",
                    "androidSdkVersion": 30
                }
            }
        }

        this.musicQuery = {
            "key" : "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
            "contentCheckOk" : true,
            "racyCheckOk" : true
        };        

        let _sendRequest = async (
            url,
            method,
            reqHeaders,
            payload = null
        ) => {
            try {
                let res;
                if (method === "POST") {
                    res = await axios.post(
                        url,
                        payload,
                        reqHeaders
                    )
                }
                else if (method === "GET") {
                    res = await axios.get(
                        url,
                        reqHeaders
                    )
                }
                else {
                    return {
                        "error" : "Invalid request method"
                    }
                }
                return res.data;
            }

            catch (error) {
                return {
                    "error" : error
                }
            }
        };

        this.sendPostRequest = async (
            url,
            payload,
            reqHeaders
        ) => {
            const res = await _sendRequest(
                url,
                "POST",
                reqHeaders,
                payload
            );
            return res;
        }

        this.sendGetRequest = async (
            url,
            reqHeaders
        ) => {
            const res = await _sendRequest(
                url,
                "GET",
                reqHeaders
            );
            return res;
        }
    }

    async sendpostreq(
        url,
        payload,
        reqHeaders = this.headers
    ) {
        const res = await this.sendPostRequest(
            url,
            payload,
            reqHeaders
        )
        return res;
    }

    getBestThumbnail(thumbnails) {
        const HQThumbnail = thumbnails.reduce((
            max,
            current
        ) => {
                return (current.width > max.width) ? current : max;
            }
        );

        return HQThumbnail["url"];
    }
}

module.exports = YTMusicBase;