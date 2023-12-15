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
        <main className="bg-slate-800 flex flex-col">
            <div className="bg-cover bg-no-repeat bg-fixed bg-center py-20" style={
                {
                    backgroundImage: `url(${artistInfo.thumbnail})`
                }
            }>
                <div className="text-slate-200 p-2 font-ubuntu" >
                    <span>
                        {artistInfo.artist_name}
                    </span>
                </div>

                {/* <div className="">
                    <img className="-z-10 opacity-75" src={artistInfo.thumbnail} alt=""/>
                </div> */}
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