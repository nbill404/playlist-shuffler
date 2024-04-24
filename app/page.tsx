import MainView from "./components/MainPage";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";


export default function Home() {
  return (
    <main className="min-h-full">
      <Navbar/>
      
      <div className="flex">
        <Sidebar/>
        <MainView/>
      </div>

    </main>
  );
}
