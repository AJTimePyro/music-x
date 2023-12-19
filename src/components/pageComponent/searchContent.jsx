import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MusicCard from "../componentUtility/musicCard";

function SearchComponent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");

    const [searchInfo, setSearchInfo] = useState({});
    const [searchResult, setSearchResult] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);

    useEffect(
        () => {
            if (query) {
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
            }
            else navigate("/");
        },
        [query]
    )

    return (
        <main className="bg-slate-800 flex flex-col pb-16">
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