import MusicCard from "./musicCard";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
// import ytMusicNewRelease from "../yt_music/ytmusicPlaylist";

function NewReleases() {

    const slide = (direction) => {
        let slider = document.getElementById("slider");
        const start = slider.scrollLeft;
        const duration = 700;
        const target = start + (direction === "left" ? slider.clientWidth * -1 : slider.clientWidth)
    
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
    // const newReleasesData = new ytMusicNewRelease();

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
                {
                    // newReleasesData.map(
                    //     (musicData) => (
                    //         <MusicCard thumbnail={musicData.thumbnail} title={musicData.title}/>
                    //     )
                    // )
                }
            </div>
        </section>
    )
}

export default NewReleases;