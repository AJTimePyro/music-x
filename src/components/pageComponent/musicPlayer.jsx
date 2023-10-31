import { useContext } from "react";
import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { MdSkipNext, MdSkipPrevious, MdPlayArrow, MdPause } from "react-icons/md"
import { RxCross2 } from "react-icons/rx";

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    // const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3");
    // audio.play();

    const imgUrl = playInfoContext.musicQueue !== null ? playInfoContext.musicQueue[playInfoContext.currentPlayIndex].thumbnail : null;

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

                <div className="flex justify-between">
                    <div className="flex text-white mt-auto mb-auto">
                        <MdSkipPrevious size={36} className="cursor-pointer"/>
                        <div className="cursor-pointer" onClick={playPauseClick}>
                            {
                                playInfoContext.isPlaying ?
                                <MdPause size={36}/> :
                                <MdPlayArrow size={36}/>
                            }
                        </div>
                        <MdSkipNext size={36} className="cursor-pointer"/>
                    </div>

                    <img src={imgUrl} className="h-20"/>

                    <RxCross2 size={36} className="text-white cursor-pointer mt-auto mb-auto" onClick={closePlayer}/>
                </div> 
            </div>
    ) : null
}

export default MusicPlayer;