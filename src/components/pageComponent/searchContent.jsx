import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SearchComponent() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(
        () => {
            fetch(
                "api/search?query=" + searchParams.get("query")
            ).then(
                response => response.json()
            ).then(
                data => console.log(data)
            )
        },
        []
    )

    return (
        <main>
            <p>Yo</p>
        </main>
    )
}

export default SearchComponent;