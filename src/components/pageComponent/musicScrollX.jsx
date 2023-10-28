import MusicCard from "../componentUtility/musicCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";

function MusicScrollX(scrollXData) {

    const [songList, setSongList] = useState([{}]);

    useEffect(
        () => {
            fetch(scrollXData.url).then(
                response => response.json()
            ).then(
                data => setSongList(data)
            )
        },
        []
    )

    const slide = (direction) => {
        let slider = document.getElementById(scrollXData.scrollId);
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

    return (
        <section className="mb-8">
            <div className="p-4 max-md:p-2 max-sm:p-1 flex justify-between">
                <h2 className="text-slate-100 font-bold text-3xl">
                    {scrollXData.title}
                </h2>

                <div className="flex text-slate-200">
                    <MdChevronLeft size={50} onClick={slideLeft} className="cursor-pointer opacity-50 hover:opacity-100"/>
                    <MdChevronRight size={50} onClick={slideRight} className="cursor-pointer opacity-50 hover:opacity-100"/>
                </div>
            </div>

            <div id={scrollXData.scrollId} className="flex w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar">
                {
                    (songList != [{}]) ?
                        songList.map(
                            (musicData, index) => (
                                <MusicCard
                                key={musicData.music_id}
                                musicData={musicData}
                                musicList={songList}
                                />
                            )
                        ) : ""
                }
            </div>
        </section>
    )
}

export default MusicScrollX;