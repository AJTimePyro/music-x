function MusicCard() {
    return (
        <div className="flex flex-col p-4 m-4 shadow shadow-slate-500 rounded-md items-center">
            <div className="hover:scale-105 active:scale-105 duration-500 cursor-pointer">
                <img src="https://lh3.googleusercontent.com/p_c9hJCeSk7ZOwU7sLXDfgTKowFz30XL0r3QTyFiTLHIG-VG95W72W1BnZyxBgzNNrlGPC1APdNbg3k=w226-h226-l90-rj" alt=""/>
            </div>

            <div className="p-2 text-slate-200 w-56 whitespace-normal text-center">
                <a href="www.google.com" className="">
                    Darbar Dekho Maa Sherawali Ka ter ser aagya
                </a>
            </div>
        </div>
    )
}

export default MusicCard;