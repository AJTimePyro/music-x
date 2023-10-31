import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayIndex, setCurrentPlayIndex] = useState(null);
    const [musicQueue, changeMusicQueue] = useState(null);
    const [currentQueueType, setCurrentQueueType] = useState(null);

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