import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicCard from "../componentUtility/musicCard";

function ArtistPageComponent() {
    const { artistID } = useParams();
    const [artistInfoSongs, setArtistInfoSongs] = useState({});
    const [artistInfo, setArtistInfo] = useState({});
    const [songsList, setSongsList] = useState([]);

    useEffect(
        () => {
            fetch(
                "/api/artist/" + artistID
            ).then(
                response => response.json()
            ).then(
                data => {
                    setArtistInfoSongs(data);
                    setSongsList(data["songsList"]);
                    setArtistInfo(data["artistInfo"]);
                }
            )
        },
        [artistID]
    );

    return (
        <main className="bg-slate-800 flex flex-col pt-4">
            <div className="flex mr-12 ml-12 max-md:mr-8 max-md:ml-8">
                <div className="">
                    <img className="rounded-[50%] max-md:h-28" src={artistInfo.thumbnail} alt=""/>
                </div>

                <div className="text-slate-200 p-2 font-ubuntu text-xl max-md:text-lg font-bold mt-auto mb-auto" >
                    <span>
                        {artistInfo.artist_name}
                    </span>
                </div>
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