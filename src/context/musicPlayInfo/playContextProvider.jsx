import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayIndex, setCurrentPlayIndex] = useState(null);
    const [musicQueue, changeMusicQueue] = useState(null);
    const [currentQueueType, setCurrentQueueType] = useState(null);

    const setPlayPause = () => {
        const audioPlayer = document.getElementById("audioTag");
        if (audioPlayer) {
            if (!isPlaying) audioPlayer.play();
            else audioPlayer.pause();
            setIsPlaying(!isPlaying);
        }
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
                setIsPlaying,
                setPlayPause,
                setCurrentPlayIndex,
                changeMusicQueue,
                setCurrentQueueType
            }
        }>
            {props.children}
        </musicPlayContext.Provider>
    )
}

export default MusicPlayState;