import { FaPlay, FaPause } from "react-icons/fa6";
import { useContext } from "react";
import musicPlayContext from "../../context/musicPlayInfo/playContext";

const PlayPauseMCBtn = (
    {
        isHover,
        musicIndex
    }
) => {

    const playInfoContext = useContext(musicPlayContext);
    
    const playBtn = () => <FaPlay size={30} className="text-white"/>
    const pauseBtn = () => <FaPause size={30} className="text-white"/>

    return (
        <div className="flex items-center justify-center absolute inset-0">
            {
                playInfoContext.isActive &&
                musicIndex === playInfoContext.currentPlayIndex ? (
                    playInfoContext.isPlaying ? (
                        pauseBtn()
                    ) : (
                            playBtn()
                        )
                ) : isHover ? (
                    playBtn()
                ) : null
            }
        </div>
    );
    

}

export default PlayPauseMCBtn;