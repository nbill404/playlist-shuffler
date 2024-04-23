import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar";

export default function PlaylistsPage() {

    const playlists = ["Playlist #1" , "Playlist #2", "Playlist #3", "Playlist #4", "Playlist #5", "1", "2", "3", "4", "5", "6"];

    return (
        <main className="min-h-full">
            <Navbar/>
            
            <div className="flex">
                <Sidebar/>
        
                <div className="p-5 flex flex-1 bg-gray-700 border">
                    <div className="m-5 bg-sky-950 flex-1">
                        <div className="grid border">
                            <h1 className="text-xl">Your Playlists</h1>
                        </div>
                        <div className="p-5 grid grid-cols-5 grid-rows-5">
                            {playlists.map((item, i) => 
                            <div key={"div" + i}>
                                <div key={"image" + i} className="w-32 h-32 border bg-slate-800"/>
                                <div key={item}>{item}</div>
                            </div>
                            )}

                            <div>
                                <div className="w-32 h-32 border bg-slate-800"/>
                                <div>Create Playlist</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>




    )

}