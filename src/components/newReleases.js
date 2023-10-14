import MusicCard from "./musicCard";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

function NewReleases() {

    const slideLeft = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <section>
            <div className="p-4 flex justify-between">
                <h2 className="text-slate-100 font-bold text-3xl">
                    New Releases
                </h2>

                <div className="flex text-slate-200">
                    <MdChevronLeft size={50} onClick={slideLeft} className="cursor-pointer opacity-50 hover:opacity-100"/>
                    <MdChevronRight size={50} onClick={slideRight} className="cursor-pointer opacity-50 hover:opacity-100"/>
                </div>
            </div>

            <div id="slider" className="flex w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar">
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
            </div>
        </section>
    )
}

export default NewReleases;