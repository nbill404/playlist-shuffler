import Navbar from "../components/navbar/Navbar";
import PlaylistsView from "../components/PlaylistsView";
import Sidebar from "../components/sidebar/Sidebar";

export default function PlaylistsPage() {

    

    return (
        <main className="min-h-full">
            <Navbar/>
            
            <div className="flex">
                <Sidebar/>
        
                <div className="p-5 flex flex-1 bg-gray-700 border">
                    <PlaylistsView/>
                </div>
            </div>
        </main>




    )

}