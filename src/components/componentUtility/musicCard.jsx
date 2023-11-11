import { useState, useContext } from "react";
import PlayPauseMCBtn from "./playPauseMCBtn";
import musicPlayContext from "../../context/musicPlayInfo/playContext";

function MusicCard(
    {
        musicData,
        musicResInfo
    }
) {
    const musicIndex = musicData.id;
    const songListType = musicResInfo.type;
    const playInfoContext = useContext(musicPlayContext);
    const [isMouseOnCard, setIsMouseOnCard] = useState(false);

    const mouseEnteredCard = () => {
        setIsMouseOnCard(true);
    }

    const mouseLeftCard = () => {
        setIsMouseOnCard(false);
    }

    const playMusic = () => {
        playInfoContext.fetchStreamURL(musicData.music_id);
        if (playInfoContext.currentQueueType !== songListType) {
            playInfoContext.changeMusicQueue(musicResInfo.song_info);
            playInfoContext.setCurrentQueueType(songListType);
        }
        
        if (!playInfoContext.isActive) {
            playInfoContext.setIsActive(true);
        }
        
        if (playInfoContext.currentPlayIndex !== musicIndex) {
            playInfoContext.setCurrentPlayIndex(musicIndex);
            playInfoContext.setIsPlaying(true);
            return;
        }
        playInfoContext.setPlayPause(!playInfoContext.isPlaying);
    }

    return (
        <div id={musicData.music_id} className="flex flex-col p-4 m-4 max-md:p-2 max-md:m-3 shadow shadow-slate-500 rounded-md items-center">
            <div className={
                `hover:scale-105 duration-500 cursor-pointer relative ${
                    playInfoContext.isActive &&
                    playInfoContext.currentQueueType ===  songListType &&
                    playInfoContext.currentPlayIndex === musicIndex ?
                        "scale-105" : ""
                    }`
                } onMouseEnter={mouseEnteredCard} onMouseLeave={mouseLeftCard} onClick={playMusic}>

                <img className={
                    `hover:brightness-75 h-[calc(100vw/6)] max-md:h-52 max-sm:h-36 ${
                        playInfoContext.isActive &&
                        playInfoContext.currentQueueType ===  songListType &&
                        playInfoContext.currentPlayIndex === musicIndex ?
                            "brightness-75" : ""
                        }`
                    }
                src={musicData.thumbnail} alt=""/>

                <PlayPauseMCBtn isHover={isMouseOnCard} musicIndex={musicIndex} listType={songListType}/>
            </div>

            <div className="p-2 text-slate-200 text-center w-[calc(100vw/4-84px)] max-lg:w-[calc(100vw/3-90px)] max-md:w-52 max-sm:w-36 truncate">
                <a href="www.google.com">
                    {musicData.title}
                </a>
            </div>
        </div>
    )
}

export default MusicCard;