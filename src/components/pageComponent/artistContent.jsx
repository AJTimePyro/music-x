import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicCard from "../componentUtility/musicCard";

function ArtistPageComponent() {
    const { artistID } = useParams();
    const [artistInfoSongs, setArtistInfoSongs] = useState({});
    const [artistInfo, setArtistInfo] = useState({});
    const [songsList, setSongsList] = useState([]);
    const [istruncated, setIstruncated] = useState(true);

    useEffect(
        () => {
            fetch(
                "/api/artist/" + artistID
            ).then(
                response => response.json()
            ).then(
                data => {
                    setArtistInfoSongs(data);
                    setSongsList(data["song_list"]);
                    setArtistInfo(data["artistInfo"]);
                    const artDesc = document.getElementById("art-desc");
                    if (artDesc && (artDesc.offsetHeight < artDesc.scrollHeight || artDesc.offsetWidth < artDesc.scrollWidth)) {
                        const readBtn = document.getElementById("read-more-less");
                        readBtn.classList.replace("hidden", "visible");
                    }
                }
            )
        },
        [artistID]
    );

    const toggleTruncated = () => {
        setIstruncated(!istruncated);
    }

    return (
        <main className="bg-slate-800 flex flex-col pt-4">
            <div className="flex mr-12 ml-12 max-md:mr-8 max-md:ml-8 gap-4 max-md:gap-2 max-sm:gap-0 items-center max-[420px]:flex-col">
                <div className={`flex-shrink-0 ${artistInfo.artist_desc ? '' : "flex"} max-[420px]:flex items-center`}>
                    <div>
                        <img className="rounded-[50%] max-md:h-28" src={artistInfo.thumbnail} alt=""/>
                    </div>

                    <div className="text-slate-200 p-2 font-ubuntu text-xl max-md:text-lg font-bold mt-auto mb-auto">
                        <span>
                            {artistInfo.artist_name}
                        </span>
                    </div>
                </div>

                {
                    artistInfo.artist_desc &&
                    <div className="text-slate-200 font-ubuntu items-center">
                        <p id="art-desc" className={istruncated ? "line-clamp-2" : ''}>
                            {artistInfo.artist_desc}
                        </p>
                        {/* {
                            artistInfo.artist_desc.split('\n').length > 2 || window.innerWidth <= 420 &&
                            <button onClick={toggleTruncated} className="text-slate-300 font-semibold text-lg">
                                {istruncated ? "Read More" : "Read Less"}
                            </button>
                        } */}
                        <button id="read-more-less" onClick={toggleTruncated} className="text-slate-300 font-semibold text-lg hidden">
                            {istruncated ? "Read More" : "Read Less"}
                        </button>
                    </div>
                }
                
            </div>

            <div className="flex w-full h-full flex-wrap justify-center mt-4">
                {
                    songsList.map(
                        (musicData) => (
                            <MusicCard
                            musicData={musicData}
                            musicResInfo={artistInfoSongs}
                            />
                        )
                    )
                }
            </div>
        </main>
    )
}

export default ArtistPageComponent;