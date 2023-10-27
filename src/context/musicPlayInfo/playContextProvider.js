import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {
    const state = {
        "isActive" : true,
        "isPlaying" : false,
        "currentPlayingId" : null,
        "currentPlayIndex" : null,
        "musicQueue" : []
    }

    const [playInfo, setPlayInfo] = useState(state);

    const updateKeyValue = (key, newVal) => {
        const copyInfo = playInfo;
        copyInfo[key] = newVal;
        return copyInfo;
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