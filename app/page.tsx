import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <main className="min-h-full">
      <Navbar/>
      
      <div className="flex">
        <Sidebar/>
        <MainPage/>
      </div>

    </main>
  );
}
