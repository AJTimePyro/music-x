import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayIndex, setCurrentPlayIndex] = useState(null);
    const [musicQueue, changeMusicQueue] = useState(null);
    const [currentQueueType, setCurrentQueueType] = useState(null);

    const togglePlayPause = () => {
        const audioPlayer = document.getElementById("audioTag");
        if (audioPlayer) {
            if (isPlaying) {
                audioPlayer.pause();
            }
            else {
                audioPlayer.play();
            }
        }
        setIsPlaying(!isPlaying);
    }

    const setPlayPause = (playValue) => {
        const audioPlayer = document.getElementById("audioTag");
        if (audioPlayer) {
            if (playValue) audioPlayer.play();
            else audioPlayer.pause();
        }
        setIsPlaying(playValue);
    }

    const fetchStreamURL = (musicId) => {
        fetch(`/api/song-info/${musicId}`).then(
            response => response.json()
        ).then(
            data => {
                const audioTag = document.getElementById("audioTag");
                audioTag.pause();
                audioTag.src = data["songURL"];
                audioTag.load();
                audioTag.play();

                document.title = `${data["title"]} - Music X`;
                const favicon = document.getElementById('favicon');
                favicon.href = data["thumbnail"];
            }
        )
    }

    const addToCurrentIndex = (num) => {
        fetchStreamURL(musicQueue[currentPlayIndex + num].music_id);
        setCurrentPlayIndex(currentPlayIndex + num);
    }

    return (            
        <musicPlayContext.Provider value={
            {
                isActive,
                isPlaying,
                currentPlayIndex,
                musicQueue,
                currentQueueType,
                setIsActive,
                togglePlayPause,
                setPlayPause,
                setCurrentPlayIndex,
                addToCurrentIndex,
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