import SearchView from "../components/search/SearchView";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function SearchPage() {
  return (
    <main className="min-h-full">
      <Navbar/>
      
      <div className="flex">
        <Sidebar/>
        <SearchView/>
      </div>

    </main>
  );
}