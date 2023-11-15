import { FaSearch } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';


function NavBar() {
    let menu_links = [
        {
            id : 0,
            name : "Home",
            link : "/"
        },
        {
            id : 1,
            name : "Songs",
            link : "/"
        },
        {
            id : 2,
            name : "Artists",
            link : "/"
        },
        {
            id : 3,
            name : "Artists",
            link : "/"
        }
    ]

    let [menu_btn, setmenu_btn] = useState(true);
    let [close_btn, setclose_btn] = useState(false);

    const toggleComponents = () => {
        setmenu_btn(!menu_btn);
        setclose_btn(!close_btn);
    };

    const MenuBtn = () => {
        return <AiOutlineMenu/>;
    };
    
    const CloseBtn = () => {
        return <AiOutlineClose/>
    };

    return (
        <nav className="sm:flex justify-between md:justify-around items-center gap-1 md:gap-3 bg-slate-900 p-4 md:pl-10 md:pr-10 select-none">
            <div className="flex justify-between items-center gap-11 mb-1 max-[472px]:gap-2">
                <div>
                    <h2 className="text-slate-400 text-lg md:text-2xl font-bold">
                        <span>M</span>usic
                        <span>X</span>
                    </h2>
                </div>

                <div className="bg-white items-center rounded-3xl md:rounded-2xl h-10 w-auto flex">
                    <input id="input-box" type="text" placeholder="Enter search query..."  className="ml-4 mr-2 border-none focus:outline-none max-[472px]:w-36"/>
                    <FaSearch className="hover:cursor-pointer text-blue-500 mr-4"/>
                </div>

                <div className="text-white sm:hidden cursor-pointer text-3xl" onClick={toggleComponents}>
                    {menu_btn && <MenuBtn />}
                    {close_btn && <CloseBtn />}
                </div>
            </div>


            <div className="">
                <ul className={
                    `text-slate-400 text-lg md:text-2xl font-ubuntu sm:flex sm:items-center gap-1 md:gap-3 ${close_btn ? "" : "h-0 hidden"}
                    `}>
                    {
                        menu_links.map(
                            (links) => (
                                <li key={links.id}>
                                    <a className="block text-center sm:hover:rounded-2xl sm:hover:bg-gray-300 sm:hover:text-slate-700 p-1" href={links.link} draggable="false">{links.name}</a>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>

        </nav>
    )
}

export default NavBar;