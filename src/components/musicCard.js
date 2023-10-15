function MusicCard(musicData) {
    return (
        <div className="flex flex-col p-4 m-4 shadow shadow-slate-500 rounded-md items-center">
            <div className="hover:scale-105 active:scale-105 duration-500 cursor-pointer">
                <img src={musicData.thumbnail} alt=""/>
            </div>

            <div className="p-2 text-slate-200 w-56 whitespace-normal text-center">
                <a href="www.google.com" className="">
                    {musicData.title}
                </a>
            </div>
        </div>
    )
}

export default MusicCard;