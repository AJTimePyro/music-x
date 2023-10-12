import MusicCard from "./musicCard";

function NewReleases() {
    return (
        <section>
            <div className="p-4">
                <h2 className="text-slate-100 font-bold text-3xl">
                    New Releases
                </h2>
            </div>

            <div>
                <MusicCard/>
            </div>
        </section>
    )
}

export default NewReleases;