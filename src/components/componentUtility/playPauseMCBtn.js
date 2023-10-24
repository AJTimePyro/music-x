import { FaPlay, FaPause } from "react-icons/fa6";

const PlayPauseMCBtn = (
    {
        isHover,
        isActive,
        isPlaying
    }
) => {
    
    const playBtn = () => <FaPlay className="text-white absolute top-1/2 left-1/2"/>
    const pauseBtn = () => <FaPause className="text-white absolute top-1/2 left-1/2"/>

    if (isActive) {
        if (isPlaying) return pauseBtn();
        else return playBtn();
    }

    if (isHover) {
        return playBtn();
    }

}

export default PlayPauseMCBtn;