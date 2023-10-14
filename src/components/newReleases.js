import MusicCard from "./musicCard";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

function NewReleases() {
    
    const slide = (direction) => {
        let slider = document.getElementById("slider");
        const start = slider.scrollLeft;
        let target;
        if (direction === "left") {
            target = start - slider.clientWidth;
        }
        else {
            target = start + slider.clientWidth;
        }
        const duration = 1000;

        let startTime = null;

        function animateScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const easeProgress = Math.min(progress / duration, 1);
            slider.scrollLeft = start + (target - start) * easeProgress;

            if (progress < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    const slideLeft = () => {
        slide("left");
    }
    
    const slideRight = () => {
        slide("right");
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

            <div id="slider" className="flex overflow-x-scroll scroll-smooth whitespace-nowrap justify-between no-scrollbar">
                <MusicCard/>
                <MusicCard/>
                <MusicCard/>
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