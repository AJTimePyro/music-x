import { useState } from "react";
import musicPlayContext from "./playContext";

const MusicPlayState = (props) => {
    // const playInfo = {
    //     "isActive" : false,
    //     "isPlaying" : false,
    //     "currentPlayingId" : null,
    //     "currentPlayIndex" : null,
    //     "musicQueue" : null
    // }

    // const [state, setPlayInfo] = useState(playInfo);

    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayIndex, setCurrentPlayIndex] = useState(null);
    const [musicQueue, changeMusicQueue] = useState(null);

    // const updateKeyValue = (key, newVal) => {
    //     return {
    //         ...state,
    //         [key] : newVal
    //     };
    // }

    // const updateIsActive = (newVal) => {
    //     setPlayInfo(updateKeyValue("isActive", newVal));
    // }

    // const updateIsPlaying = (newVal) => {
    //     setPlayInfo(updateKeyValue("isPlaying", newVal));
    // }

    // const updateCurrentPlay = (newIndex, musicId) => {
    //     setPlayInfo(
    //         {
    //             ...state,
    //             ["currentPlayIndex"] : newIndex,
    //             ["currentPlayingId"] : musicId
    //         }
    //     );
    // }
    
    // const newMusicQueue = (newList) => {
    //     setPlayInfo(updateKeyValue("musicQueue", newList));
    // }

    return (            
        <musicPlayContext.Provider value={
            {
                isActive,
                isPlaying,
                currentPlayIndex,
                musicQueue,
                setIsActive,
                setIsPlaying,
                setCurrentPlayIndex,
                changeMusicQueue
            }
        }>
            {props.children}
        </musicPlayContext.Provider>
    )
}

export default MusicPlayState;