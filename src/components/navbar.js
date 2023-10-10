import { FaSearch } from 'react-icons/fa';

function NavBar() {
    return (
        <>
            <nav className="flex justify-between items-center gap-6 bg-slate-900 p-4 sm:pl-10 sm:pr-10">
                <div className="">
                    <h2 className="text-slate-400 text-xl md:text-2xl font-bold">
                        <span>M</span>usic
                        <span>X</span>
                    </h2>
                </div>

                <div className="text-slate-400 text-xl md:text-2xl font-ubuntu flex items-center gap-1 md:gap-6">
                    <a className="hover:rounded-2xl hover:bg-gray-300 hover:text-slate-700 p-1" href="#">Home</a>
                    <a className="hover:rounded-2xl hover:bg-gray-300 hover:text-slate-700 p-1" href="#">Songs</a>
                    <a className="hover:rounded-2xl hover:bg-gray-300 hover:text-slate-700 p-1" href="#">Artists</a>
                    <a className="hover:rounded-2xl hover:bg-gray-300 hover:text-slate-700 p-1" href="#">Albums</a>
                </div>

                <div className="bg-white items-center rounded-3xl md:rounded-2xl h-10 w-auto flex">
                    <input id="input-box" type="text" placeholder="Enter Song, Artists, ... name"  className="ml-4 z-10 border-none focus:outline-none h-full bg-transparent"/>
                    <FaSearch className="hover:cursor-pointer text-blue-500 mr-4"/>
                </div>
            </nav>
        </>
    )
}

export default NavBar;