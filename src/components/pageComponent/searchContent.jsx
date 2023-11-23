import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MusicCard from "../componentUtility/musicCard";

function SearchComponent() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");

    const [searchInfo, setSearchInfo] = useState({});
    const [searchResult, setSearchResult] = useState([{}]);

    useEffect(
        () => {
            fetch(
                "api/search?query=" + query
            ).then(
                response => response.json()
            ).then(
                data => {
                    setSearchInfo(data);
                    setSearchResult(data.song_list);
                }
            )
        },
        [query]
    )

    return (
        <main className="bg-slate-800 flex flex-col">
            <div className="flex w-full h-full flex-wrap justify-center mt-4">
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