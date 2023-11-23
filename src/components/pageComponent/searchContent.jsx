import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MusicCard from "../componentUtility/musicCard";

function SearchComponent() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchInfo, setSearchInfo] = useState({});
    const [searchResult, setSearchResult] = useState([{}]);

    useEffect(
        () => {
            fetch(
                "api/search?query=" + searchParams.get("query")
            ).then(
                response => response.json()
            ).then(
                data => {
                    setSearchInfo(data);
                    setSearchResult(data.song_list);
                }
            )
        },
        []
    )

    return (
        <main>
            <div className="flex w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar">
                {
                    searchResult.map(
                        (musicData) => (
                            <MusicCard
                            musicData={musicData}
                            musicResInfo={searchInfo}
                            />
                        )
                    )
                }
            </div>
        </main>
    )
}

export default SearchComponent;