import { useContext, useEffect, useState } from "react";
import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { MdSkipNext, MdSkipPrevious, MdPlayArrow, MdPause } from "react-icons/md"
import { RxCross2 } from "react-icons/rx";
import "../../css/musicPlayer.css";

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    const [currentTime, setCurrentTime] = useState('00:00');

    const currentSongInfo = playInfoContext.musicQueue !== null ? playInfoContext.musicQueue[playInfoContext.currentPlayIndex] : null;
    const imgUrl = currentSongInfo !== null ? currentSongInfo.thumbnail : null;
    const streamURL = playInfoContext.streamURL;

    const playPauseClick = () => playInfoContext.setPlayPause();
    
    const closePlayer = () => {
        playInfoContext.setIsActive(false);
        playInfoContext.setCurrentQueueType(null);
        playInfoContext.changeMusicQueue(null);
        playInfoContext.setCurrentPlayIndex(null);
        playInfoContext.setIsPlaying(false);
    }

    const musicProgressOnLoad = () => {
        const audioTag = document.getElementById("audioTag");
        if (audioTag) {
            const progressBar = document.getElementById("progress-bar");
    
            progressBar.max = audioTag.duration;
            progressBar.value = audioTag.current;
            audioTag.play();
        }
    }

    useEffect(
        () => {
            const audioTag = document.getElementById("audioTag");
            if (audioTag) {
                audioTag.pause();
                audioTag.load();
                if (streamURL) audioTag.play();
            }
        
            return () => {
                if (audioTag) {
                    audioTag.pause();
                    audioTag.load();
                }
            };
        },
        [streamURL]
    );

    if (playInfoContext.isPlaying) {
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
            1000
        );
    }

    const progressBarChange = () => {
        const audioTag = document.getElementById("audioTag");
        const progressBar = document.getElementById("progress-bar");
        audioTag.currentTime = progressBar.value;
        audioTag.play();
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

    return playInfoContext.isActive === true ? (
            <div className="fixed bottom-0 bg-slate-900 w-full text-black">
                {
                    streamURL ?
                    <audio controls id="audioTag" onLoadedMetadata={musicProgressOnLoad} className="hidden" onEnded={songEnd}>
                        <source src={streamURL}/>
                    </audio> :
                    <></>
                }

                <input type="range" className="webkit-app-none bg-red-700 w-full rounded h-2 cursor-pointer" id="progress-bar" onChange={progressBarChange}/>

                <div className="flex justify-between pl-4 pr-4">
                    <div className="flex gap-4">
                        <div className="text-slate-400 m-auto text-sm">
                            <span>{ currentTime }</span>
                            <span> / </span>
                            <span>{ currentSongInfo.duration }</span>
                        </div>
                        <div className="flex text-white mt-auto mb-auto gap-1">
                            <MdSkipPrevious size={40} className="cursor-pointer" onClick={prevBtn}/>
                            <div className="cursor-pointer" onClick={playPauseClick}>
                                {
                                    playInfoContext.isPlaying ?
                                    <MdPause size={40}/> :
                                    <MdPlayArrow size={40}/>
                                }
                            </div>
                            <MdSkipNext size={40} className="cursor-pointer" onClick={nextBtn}/>
                        </div>
                    </div>

                    <div className="flex">
                        <img src={imgUrl} alt="nothing" className="h-20"/>
                        <div className="text-white w-52 m-auto ml-2">
                            <div className="truncate font-bold">
                                <span>{ currentSongInfo.title }</span>
                            </div>
                            <div className="underline truncate">
                                <a href="/" target="_blank">{ currentSongInfo.artist_name }</a>
                            </div>
                        </div>
                    </div>

                    <RxCross2 size={36} className="text-white cursor-pointer mt-auto mb-auto" onClick={closePlayer}/>
                </div> 
            </div>
    ) : null
}

export default MusicPlayer;