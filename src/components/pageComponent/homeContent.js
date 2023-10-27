import MusicScrollX from "./musicScrollX";
import MusicPlayState from '../../context/musicPlayInfo/playContextProvider';

function HomeContent() {
    return (
        <MusicPlayState>
            <main className="flex-row bg-slate-800 p-10 max-sm:p-6">
                <MusicScrollX title="New Releases" url="new-release?limit=20" scrollId="scroll-1"/>
                <MusicScrollX title="Trending" url="trending?limit=20" scrollId="scroll-2"/>
            </main>
        </MusicPlayState>
    )
}

export default HomeContent;