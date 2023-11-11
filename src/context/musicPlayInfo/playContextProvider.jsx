import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayIndex, setCurrentPlayIndex] = useState(null);
    const [musicQueue, changeMusicQueue] = useState(null);
    const [currentQueueType, setCurrentQueueType] = useState(null);
    const [streamURL, setStreamURL] = useState(null);

    const setPlayPause = () => {
        const audioPlayer = document.getElementById("audioTag");
        if (audioPlayer) {
            if (!isPlaying) audioPlayer.play();
            else audioPlayer.pause();
        }
        setIsPlaying(!isPlaying);
    }

    const fetchStreamURL = (musicId) => {
        fetch(`/song-info/${musicId}`).then(
            response => response.json()
        ).then(
            data => {
                setStreamURL(data["songURL"]);
                console.log(data);
            }
        )
    }

    return (            
        <musicPlayContext.Provider value={
            {
                isActive,
                isPlaying,
                currentPlayIndex,
                musicQueue,
                currentQueueType,
                streamURL,
                setIsActive,
                setIsPlaying,
                setPlayPause,
                setCurrentPlayIndex,
                changeMusicQueue,
                setCurrentQueueType,
                fetchStreamURL
            }
        }>
            {props.children}
        </musicPlayContext.Provider>
    )
}

export default MusicPlayState;