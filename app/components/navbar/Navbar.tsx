import AccountNav from "./AccountNav";

export default function Navbar() {
    return (
      <div className="bg-green-700 ps-4 p-2 navbar h-[4vh]">
        <div className="navbar-start gap-2">
          <a className="btn text-xl bg-green-700 border-none" href="/">Home</a>
          <a className="btn text-xl bg-green-700 border-none" href="/search">Search</a>
          <a className="btn text-xl bg-green-700 border-none" href="/playlists">Organize Lists</a>
        </div>
        
        <a className="text-3xl text-center navbar-center" href="/">Playlist Shuffler</a>
        
        <div className="navbar-end gap-1">
          <AccountNav/>
        </div>

      </div>
    )
}