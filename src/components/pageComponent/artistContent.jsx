import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MusicCard from "../componentUtility/musicCard";

function ArtistPageComponent() {
    const { artistID } = useParams();
    const [artistInfoSongs, setArtistInfoSongs] = useState({});
    const [artistInfo, setArtistInfo] = useState({});
    const [songsList, setSongsList] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
    const [istruncated, setIstruncated] = useState(true);
    const artDescRef = useRef(null);
    const readBtnRef = useRef(null);

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
                }
            )
        },
        [artistID]
    );

    useEffect(() => {
        if (artDescRef.current && (artDescRef.current.offsetHeight < artDescRef.current.scrollHeight || artDescRef.current.offsetWidth < artDescRef.current.scrollWidth)) {
            readBtnRef.current.classList.replace("hidden", "visible");
        }
    }, [artistInfo]);

    const toggleTruncated = () => {
        setIstruncated(!istruncated);
    }

    return (
        <main className="bg-slate-800 flex flex-col pb-12">
            <div className="pt-4 relative">
                <div className="z-10 flex mr-12 ml-12 max-md:mr-8 max-md:ml-8 gap-4 max-md:gap-2 max-sm:gap-0 items-center max-[420px]:flex-col">
                    <div className={`flex-shrink-0 ${artistInfo.artist_desc ? '' : "flex"} max-[420px]:flex items-center`}>
                        <div>
                            <img className="rounded-[50%] max-md:h-28" src={artistInfo.thumbnail} alt=""/>
                        </div>

                        <div className="text-white p-2 font-ubuntu text-xl max-md:text-lg font-bold mt-auto mb-auto">
                            <span>
                                {artistInfo.artist_name}
                            </span>
                        </div>
                    </div>

                    {
                        artistInfo.artist_desc &&
                        <div className="text-white font-ubuntu items-center">
                            <p ref={artDescRef} className={istruncated ? "line-clamp-2" : ''}>
                                {artistInfo.artist_desc}
                            </p>

                            <button ref={readBtnRef} onClick={toggleTruncated} className="text-slate-200 font-semibold text-lg hidden">
                                {istruncated ? "Read More" : "Read Less"}
                            </button>
                        </div>
                    }
                </div>

                <div style={
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${artistInfo.artist_banner})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        opacity: '0.3',
                        filter: 'blur(1px)',
                        zIndex: 1,
                        content: "",
                        pointerEvents: 'none'
                    }
                }></div>
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