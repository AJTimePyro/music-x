import MusicScrollX from "./musicScrollX";

function HomeContent() {
    return (
        <main className="bg-slate-800 p-10 max-sm:p-6">
            <MusicScrollX title="New Releases" url="new-release?limit=20" />
        </main>
    )
}

export default HomeContent;