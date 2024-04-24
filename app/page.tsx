import MainView from "./components/HomeView";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";


export default function Home() {
  return (
    <main className="min-h-full">
      <Navbar/>
      
      <div className="flex">
        <Sidebar/>
        <div className="p-5 flex flex-1 bg-gray-700">
          <MainView/>
        </div>
      </div>

    </main>
  );
}
