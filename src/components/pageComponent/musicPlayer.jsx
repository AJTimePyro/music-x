import { useContext, useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { MdSkipNext, MdSkipPrevious, MdPlayArrow, MdPause } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri";
import "../../css/musicPlayer.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [isMute, setMute] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [volumeVal, setVolumeVal] = useState(50);
    const audioRef = useRef(null);

    const currentSongInfo = playInfoContext.musicQueue !== null ? playInfoContext.musicQueue[playInfoContext.currentPlayIndex] : null;
    const imgUrl = currentSongInfo !== null ? currentSongInfo.thumbnail : null;

    const playPauseClick = () => playInfoContext.togglePlayPause();

    const closePlayer = () => {
        const closingPlayer = () => {
            playInfoContext.setIsActive(false);
            playInfoContext.setCurrentQueueType(null);
            playInfoContext.changeMusicQueue(null);
            playInfoContext.setCurrentPlayIndex(null);
            playInfoContext.setPlayPause(false);
        };

        try {
            const musicPlayer = document.getElementById("music-player");
            musicPlayer.classList.remove("slide-up-container");
            musicPlayer.classList.add("slide-down-container");
            musicPlayer.addEventListener("animationend", closingPlayer);
        } catch (e) {
            closingPlayer();
        }

        // Reverting title and favicon to original
        document.title = "Music X";
        const favicon = document.getElementById('favicon');
        favicon.href = "favicon.ico";
    };

    const musicProgressOnLoad = () => {
        if (audioRef.current) {
            audioRef.current.title = "YO";
            setDuration(audioRef.current.duration);
            setProgressBarValue(0);
            audioRef.current.volume = volumeVal/100;
            audioRef.current.play();
        }
    };

    const secToMMSS = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = parseInt(time % 60);
        const mmssFormat = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        return mmssFormat;
    };

    const handleTimeUpdate = (event) => {
        const cTime = audioRef.current.currentTime;
        setProgressBarValue(cTime);
        const mmssFormat = secToMMSS(cTime);
        setCurrentTime(mmssFormat);
    };

    const nextBtn = () => {
        playInfoContext.addToCurrentIndex(1);
    };

    const prevBtn = () => {
        playInfoContext.addToCurrentIndex(-1);
    };

    const songEnd = () => {
        setCurrentTime("00:00");
        nextBtn();
    };

    const pauseSong = () => {
        playInfoContext.setPlayPause(false);
    }

    const playSong = () => {
        playInfoContext.setPlayPause(true);
    }

    const volumeBarChange = (newValue) => {
        setVolumeVal(newValue);
        if (audioRef.current) {
            audioRef.current.volume = newValue / 100;
            if (audioRef.current.volume === 0) setMute(true);
        }
        window.localStorage.setItem("DEFAULT_VOL", JSON.stringify(newValue));
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMute;
            setMute(!isMute);
        }
    };

    const progressBarChange = (newValue) => {
        setProgressBarValue(newValue);
        if (audioRef.current) {
            audioRef.current.currentTime = newValue;
        }
    };

    const progressBarStyles = {
        handle: {
            height: 12,
            width: 12,
            marginLeft: -4,
            marginTop: -2,
            backgroundColor: '#dc2626',
            border: '#dc2626',
            boxShadow: 'none',
            opacity: '1.0',
            cursor: 'pointer',
        },
        track: {
            backgroundColor: '#dc2626',
            height: 8,
            cursor: 'pointer',
        },
        rail: {
            backgroundColor: '#0f172a',
            height: 8,
            cursor: 'pointer',
        },
    };

    const volumeBarStyles = {
        handle: {
            height: 16,
            width: 16,
            marginTop: -4,
            backgroundColor: '#0f172a',
            border: '2px solid #778da9',
            borderRadius: '50%',
            boxShadow: 'none',
            opacity: '1.0',
            cursor: 'pointer',
        },
        track: {
            backgroundColor: '#415a77',
            height: 8,
            borderRadius: 18,
        },
        rail: {
            backgroundColor: '#1b263b',
            height: 8,
            borderRadius: 18,
        },
    };

    useEffect(
        () => {
            const volumeVal = window.localStorage.getItem("DEFAULT_VOL");
            if (volumeVal === null) window.localStorage.setItem("DEFAULT_VOL", JSON.stringify(50));
            else volumeBarChange(JSON.parse(volumeVal));
        }
    );

    return (
        playInfoContext.isActive &&
        <div id="music-player" className="fixed bottom-0 bg-slate-900 w-full text-black flex flex-col slide-up-container">
            <audio controls ref={audioRef} id="audioTag" onLoadedMetadata={musicProgressOnLoad} className="hidden" artist="Artist Name" onEnded={songEnd} onTimeUpdate={handleTimeUpdate} onPause={pauseSong} onPlay={playSong}></audio>

            <Slider
                id="progress-bar"
                min={0}
                max={duration}
                step={1}
                defaultValue={0}
                value={progressBarValue}
                onChange={progressBarChange}
                styles={progressBarStyles}
                className="mt-[-5px]"
            />

            <div className="flex justify-between pl-4 pr-4 max-sm:pl-1 max-sm:pr-1">
                <div className="flex gap-4 max-sm:flex-col max-sm:mb-auto max-sm:mt-auto max-sm:gap-2">
                    <div className="text-slate-400 m-auto text-sm max-md:text-xs whitespace-nowrap">
                        <span>{currentTime}</span>
                        <span> / </span>
                        <span>{secToMMSS(duration)}</span>
                    </div>
                    <div className="flex text-white mt-auto mb-auto gap-1 max-sm:gap-0 items-center">
                        <MdSkipPrevious size={30} className="cursor-pointer max-sm:h-6" onClick={prevBtn} />
                        <div className="cursor-pointer" onClick={playPauseClick}>
                            {playInfoContext.isPlaying ? <MdPause size={30} /> : <MdPlayArrow size={30} />}
                        </div>
                        <MdSkipNext size={30} className="cursor-pointer max-sm:h-6" onClick={nextBtn} />
                    </div>
                </div>

                <div className="flex">
                    <img src={imgUrl} alt="nothing" className="h-20 max-sm:h-16" />
                    <div className="text-white w-52 max-md:text-sm max-md:w-40 max-sm:w-28 m-auto ml-2">
                        <div className="truncate font-bold">
                            <span>{currentSongInfo.title}</span>
                        </div>
                        <div className="underline truncate">
                            <Link to={'/artist/' + currentSongInfo.artist_channel_id}>{currentSongInfo.artist_name}</Link>
                        </div>
                    </div>
                </div>

                <div className="text-white flex items-center gap-2 max-sm:flex-col">
                    <div id="volume-controller" className="flex items-center group gap-4">
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={volumeVal}
                            onChange={volumeBarChange}
                            styles={volumeBarStyles}
                            className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 w-28 max-md:w-20 max-sm:w-16 max-md:opacity-100 cursor-pointer rounded-lg max-sm:hidden"
                        />
                        {isMute ? (
                            <RiVolumeMuteFill size={25} className="cursor-pointer" onClick={toggleMute} />
                        ) : (
                            <RiVolumeUpFill size={25} className="cursor-pointer" onClick={toggleMute} />
                        )}
                    </div>
                    <RxCross2 size={30} className="cursor-pointer max-sm:h-[1.5rem]" onClick={closePlayer} />
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;