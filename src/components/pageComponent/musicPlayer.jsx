import { useContext, useState } from "react";
import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { MdSkipNext, MdSkipPrevious, MdPlayArrow, MdPause } from "react-icons/md"
import { RxCross2 } from "react-icons/rx";
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri";
import "../../css/musicPlayer.css";

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [isMute, setMute] = useState(false);

    const currentSongInfo = playInfoContext.musicQueue !== null ? playInfoContext.musicQueue[playInfoContext.currentPlayIndex] : null;
    const imgUrl = currentSongInfo !== null ? currentSongInfo.thumbnail : null;

    const playPauseClick = () => playInfoContext.togglePlayPause();
    
    const closePlayer = () => {
        playInfoContext.setIsActive(false);
        playInfoContext.setCurrentQueueType(null);
        playInfoContext.changeMusicQueue(null);
        playInfoContext.setCurrentPlayIndex(null);
        playInfoContext.setPlayPause(false);
    }

    const musicProgressOnLoad = () => {
        const audioTag = document.getElementById("audioTag");
        if (audioTag) {
            const progressBar = document.getElementById("progress-bar");
            progressBar.max = audioTag.duration;
            progressBar.value = 0;
            audioTag.play();
        }
    }

    setInterval(
        () => {
            const audioTag = document.getElementById("audioTag");
            if (audioTag) {
                const progressBar = document.getElementById("progress-bar");
                const cTime = audioTag.currentTime;
                progressBar.value = cTime;

                const minutes = Math.floor(cTime / 60);
                const remainingSeconds = parseInt(cTime % 60);
                const mmssFormat = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
                setCurrentTime(mmssFormat);
            }
        },
        100
    );

    const progressBarChange = () => {
        const audioTag = document.getElementById("audioTag");
        const progressBar = document.getElementById("progress-bar");
        audioTag.currentTime = progressBar.value;
    }

    const nextBtn = () => {
        playInfoContext.addToCurrentIndex(1);
    }

    const prevBtn = () => {
        playInfoContext.addToCurrentIndex(-1);
    }

    const songEnd = () => {
        setCurrentTime("00:00");
        nextBtn();
    }

    const volumeBarChange = () => {
        const audioTag = document.getElementById("audioTag");
        const volumeBar = document.getElementById("volume-bar");
        audioTag.volume = volumeBar.value/100;
        if (audioTag.volume === 0) setMute(true);
        else if (isMute) setMute(false);
    }
    
    const toggleMute = () => {
        const audioTag = document.getElementById("audioTag");
        if (audioTag.volume) {
            audioTag.volume = 0;
            setMute(true);
        }
        else {
            const volumeBar = document.getElementById("volume-bar");
            audioTag.volume = volumeBar.value/100;
            if (isMute) setMute(false);
        }
    }

    return playInfoContext.isActive === true ? (
            <div className="fixed bottom-0 bg-slate-900 w-full text-black flex flex-col">
                <audio controls id="audioTag" onLoadedMetadata={musicProgressOnLoad} className="hidden" onEnded={songEnd}>
                    <source/>
                </audio>

                <input
                    type="range"
                    className="appearance-none bg-slate-900 w-full h-2 outline-none rounded-lg cursor-pointer focus:outline-none hover:shadow-2xl"
                    id="progress-bar"
                    onChange={progressBarChange}
                />

                <div className="flex justify-between pl-4 pr-4 max-sm:pl-1 max-sm:pr-1">
                    <div className="flex gap-4 max-sm:flex-col max-sm:mb-auto max-sm:mt-auto max-sm:gap-2">
                        <div className="text-slate-400 m-auto text-sm max-md:text-xs whitespace-nowrap">
                            <span>{ currentTime }</span>
                            <span> / </span>
                            <span>{ currentSongInfo.duration }</span>
                        </div>
                        <div className="flex text-white mt-auto mb-auto gap-1 max-sm:gap-0 items-center">
                            <MdSkipPrevious size={30} className="cursor-pointer max-sm:h-6" onClick={prevBtn}/>
                            <div className="cursor-pointer" onClick={playPauseClick}>
                                {
                                    playInfoContext.isPlaying ?
                                    <MdPause size={30}/> :
                                    <MdPlayArrow size={30}/>
                                }
                            </div>
                            <MdSkipNext size={30} className="cursor-pointer max-sm:h-6" onClick={nextBtn}/>
                        </div>
                    </div>

                    <div className="flex">
                        <img src={imgUrl} alt="nothing" className="h-20 max-sm:h-16"/>
                        <div className="text-white w-52 max-md:text-sm max-md:w-40 max-sm:w-28 m-auto ml-2">
                            <div className="truncate font-bold">
                                <span>{ currentSongInfo.title }</span>
                            </div>
                            <div className="underline truncate">
                                <a href="/" target="_blank">{ currentSongInfo.artist_name }</a>
                            </div>
                        </div>
                    </div>

                    <div className="text-white flex  items-center gap-2">
                        <div id="volume-controller" className="flex items-center  group gap-4 max-sm:gap-0 max-sm:flex-col max-sm:-rotate-90 max-sm:m-0 max-sm:relative max-sm:left-6">
                            <input
                                type="range"
                                id="volume-bar"
                                className="appearance-none opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 w-28 max-md:w-20 max-sm:w-16 max-md:opacity-100 cursor-pointer rounded-lg bg-slate-900 max-sm:appearance-[slider-vertical]"
                                min={0}
                                max={100}
                                defaultValue={100}
                                onChange={volumeBarChange}
                            />
                            {
                                isMute ? <RiVolumeMuteFill size={25} className="cursor-pointer max-sm:hidden" onClick={toggleMute}/> :
                                <RiVolumeUpFill size={25} className="cursor-pointer max-sm:hidden" onClick={toggleMute}/>
                            }
                        </div>
                        <RxCross2 size={30} className="cursor-pointer max-sm:h-[1.5rem]" onClick={closePlayer}/>
                    </div>
                </div> 
            </div>
    ) : null
}

export default MusicPlayer;