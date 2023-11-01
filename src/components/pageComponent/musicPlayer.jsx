import { useContext } from "react";
import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { MdSkipNext, MdSkipPrevious, MdPlayArrow, MdPause } from "react-icons/md"
import { RxCross2 } from "react-icons/rx";

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    // const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3");
    // audio.play();

    const currentSongInfo = playInfoContext.musicQueue !== null ? playInfoContext.musicQueue[playInfoContext.currentPlayIndex] : null;
    const imgUrl = currentSongInfo !== null ? currentSongInfo.thumbnail : null;

    const playPauseClick = () => playInfoContext.setIsPlaying(!playInfoContext.isPlaying);
    
    const closePlayer = () => {
        playInfoContext.setIsActive(false);
        playInfoContext.setCurrentQueueType(null);
        playInfoContext.changeMusicQueue(null);
        playInfoContext.setCurrentPlayIndex(null);
        playInfoContext.setIsPlaying(null);
    }

    
    return playInfoContext.isActive === true ? (
            <div className="fixed bottom-0 bg-slate-900 w-full text-black">
                <div className="block h-1 w-full">
                    <div className="rounded-3xl bg-red-600 w-1/4 h-full"/>
                </div>

                <div className="flex justify-between pl-4 pr-4">
                    <div className="flex gap-4">
                        <div className="text-slate-400 m-auto text-sm">
                            <span>00:00</span>
                            <span> / </span>
                            <span>{ currentSongInfo.duration }</span>
                        </div>
                        <div className="flex text-white mt-auto mb-auto gap-1">
                            <MdSkipPrevious size={40} className="cursor-pointer"/>
                            <div className="cursor-pointer" onClick={playPauseClick}>
                                {
                                    playInfoContext.isPlaying ?
                                    <MdPause size={40}/> :
                                    <MdPlayArrow size={40}/>
                                }
                            </div>
                            <MdSkipNext size={40} className="cursor-pointer"/>
                        </div>
                    </div>

                    <div className="flex">
                        <img src={imgUrl} className="h-20"/>
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