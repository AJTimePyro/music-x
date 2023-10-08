function NavBar() {
    return (
        <>
            <nav className="flex justify-center gap-6 bg-slate-900 p-4">
                <div className="">
                    <h2 className="text-slate-400 text-2xl">
                        <span>M</span>usic
                        <span>X</span>
                    </h2>
                </div>

                <div className="text-slate-400 text-2xl font-ubuntu">
                    <a href="#">Home</a>
                    <a href="#">Songs</a>
                    <a href="#">Artists</a>
                    <a href="#">Albums</a>
                </div>
            </nav>
        </>
    )
}

export default NavBar;