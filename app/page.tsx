import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-full">
      <Navbar/>
      
      <div className="flex">
        <Sidebar/>

        <div className="m-5 p-5 flex-1 bg-gray-700 border items-center rounded">
          <div className="flex">
            <a>This is the main page</a>
          </div>
          <div className="divider divider-primary">OR</div>
          <div className="flex">
            <a>Column 2</a>
          </div>
        </div>

      </div>

    </main>
  );
}
