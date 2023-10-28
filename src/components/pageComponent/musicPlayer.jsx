import musicPlayContext from "../../context/musicPlayInfo/playContext";
import { useContext } from "react";

const MusicPlayer = () => {
    const playInfoContext = useContext(musicPlayContext);
    
    return playInfoContext.state.isActive == true ? (
            <div className="fixed bottom-0 bg-white h-10 w-full text-black">
                Music is Active
            </div>
    ) : null
}

export default MusicPlayer;