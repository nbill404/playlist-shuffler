import Link from "next/link";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchResults from "./components/SearchResults";

export default function Home() {
  return (
    <main className="min-h-full">
      <Navbar/>
      
      <div className="flex">
        <Sidebar/>

        <div className="p-5 flex flex-1 bg-gray-700 border items-center ">
          <div className="m-5 bg-sky-950 rounded flex-1">
              <div className="">
                <p>This is a website for advanced shuffling options for your playlists</p>
              </div>
              <div className="divider divider-primary">OR</div>
              <div className="">
                <a>Column 2<br/></a>
              </div>
              <SearchResults/>
            </div>
          </div>
      </div>

    </main>
  );
}
