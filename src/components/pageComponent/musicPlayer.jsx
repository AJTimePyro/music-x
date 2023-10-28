import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { useContext } from "react";

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3");

    // const imgUrl = playInfoContext.musicQueue !== null ? playInfoContext.musicQueue[playInfoContext.currentPlayIndex].thumbnail : null;
    // audio.play();
    
    return playInfoContext.isActive === true ? (
            <div className="fixed bottom-0 bg-white h-10 w-full text-black">
                {/* <img src={imgUrl} alt="Sad" /> */}
            </div>
    ) : null
}

export default MusicPlayer;