import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {
    const playInfo = {
        "isActive" : false,
        "isPlaying" : false,
        "currentPlayingId" : null,
        "currentPlayIndex" : null,
        "musicQueue" : []
    }

    const [state, setPlayInfo] = useState(playInfo);

    const updateKeyValue = (key, newVal) => {
        return {
            ...state,
            [key] : newVal
        };
    }

    const updateIsActive = (newVal) => {
        setPlayInfo(updateKeyValue("isActive", newVal));
    }

    const updateIsPlaying = (newVal) => {
        setPlayInfo(updateKeyValue("isPlaying", newVal));
    }
    
    const newMusicQueue = (newList) => {
        setPlayInfo(updateKeyValue("musicQueue", newList));
    }

    return (            
        <musicPlayContext.Provider value={
            {
                state,
                updateIsActive,
                updateIsPlaying,
                newMusicQueue
            }
        }>
            {props.children}
        </musicPlayContext.Provider>
    )
}

export default MusicPlayState;