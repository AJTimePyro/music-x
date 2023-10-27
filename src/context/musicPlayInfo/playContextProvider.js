import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {
    const state = {
        "isActive" : false,
        "isPlaying" : false,
        "currentPlayingId" : null,
        "currentPlayIndex" : null,
        "musicList" : []
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

    return (            
        <musicPlayContext.Provider value={{state, updateIsActive}}>
            {props.children}
        </musicPlayContext.Provider>
    )
}

export default MusicPlayState;