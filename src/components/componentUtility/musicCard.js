import { useState } from "react";
import PlayPauseMCBtn from "./playPauseMCBtn";

function MusicCard(
    {
        musicData
    }
) {

    const [isMouseOnCard, setIsMouseOnCard] = useState(false);

    const mouseEnteredCard = () => {
        setIsMouseOnCard(true);
    }

    const mouseLeftCard = () => {
        setIsMouseOnCard(false);
    }

    return (
        <div id={musicData.music_id} className="flex flex-col p-4 m-4 max-md:p-2 max-md:m-3 shadow shadow-slate-500 rounded-md items-center">
            <div className="hover:scale-105 active:scale-105 duration-500 cursor-pointer" onMouseEnter={mouseEnteredCard} onMouseLeave={mouseLeftCard}>
                <img className="hover:brightness-75 h-[calc(100vw/6)] max-md:h-52 max-sm:h-36" src={musicData.thumbnail} alt=""/>
                <PlayPauseMCBtn isHover={isMouseOnCard} musicId={musicData.music_id}/>
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