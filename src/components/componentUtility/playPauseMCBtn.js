import { FaPlay, FaPause } from "react-icons/fa6";
import { useContext } from "react";
import musicPlayContext from "../../context/musicPlayInfo/playContext";

const PlayPauseMCBtn = (
    {
        isHover,
        musicId
    }
) => {

    const playInfoContext = useContext(musicPlayContext);
    
    const playBtn = () => <FaPlay className="text-white absolute top-1/2 left-1/2"/>
    const pauseBtn = () => <FaPause className="text-white absolute top-1/2 left-1/2"/>

    if (playInfoContext.state.isActive && musicId === playInfoContext.state.currentPlayingId) {
        if (playInfoContext.state.isPlaying) return pauseBtn();
        else playBtn();
    }
    else if (isHover) return playBtn();
    return <></>;

}

export default PlayPauseMCBtn;