function MusicCard(musicData) {
    return (
        <div className="flex flex-col p-4 m-4 max-md:p-2 max-md:m-3 shadow shadow-slate-500 rounded-md items-center">
            <div className="hover:scale-105 active:scale-105 duration-500 cursor-pointer">
                <img className="h-[calc(100vw/4-84px)] max-md:h-auto" src={musicData.thumbnail} alt=""/>
            </div>

            <div className="p-2 text-slate-200 text-center w-[calc(100vw/4-84px)] max-md:w-52 truncate">
                <a href="www.google.com">
                    {musicData.title}
                </a>
            </div>
        </div>
    )
}

export default MusicCard;