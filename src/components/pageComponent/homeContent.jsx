import MusicScrollX from "./musicScrollX";

function HomeContent() {
    return (
        <main className="flex-row bg-slate-800 p-10 max-sm:p-6">
            <MusicScrollX title="New Releases" url="/api/new-release?limit=20" scrollId="scroll-1"/>
            <MusicScrollX title="Trending" url="/api/trending?limit=20" scrollId="scroll-2"/>
        </main>
    )
}

export default HomeContent;