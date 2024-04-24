import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar";

export default function PlaylistsPage() {

    

    return (
        <main className="min-h-full">
            <Navbar/>
            
            <div className="flex">
                <Sidebar/>
        
                <div className="p-5 flex flex-1 bg-gray-700 border">
                    <div className="m-5 bg-sky-950 flex-1">

                    </div>
                </div>
            </div>
        </main>




    )

}