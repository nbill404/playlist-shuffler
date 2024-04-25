import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

// Children must be server components
export default function MainLayout(props){

    return (
        <main className="min-h-full">
            <Navbar/>
            
            <div className="flex">
                <Sidebar/>
                <div className="p-5 flex flex-1 bg-gray-700">
                    {props.children()}
                </div>
            </div>

        </main>
    )
}