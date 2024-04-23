// Search icon https://www.svgrepo.com/svg/532552/search-alt-2


import SearchBar from "./SearchBar";
import AccountNav from "./AccountNav";


export default function Navbar() {

    return (
      <div className="bg-green-700 ps-4 p-2 navbar max-h-16">
        <div className="navbar-start gap-2">
            <SearchBar/>
            <a className="btn text-xl bg-green-700 border-none" href="/playlists">Organize Lists</a>
        </div>
        
        <a className="text-3xl text-center navbar-center" href="/">Playlist Shuffler</a>
        
        <div className="navbar-end gap-1">
          <AccountNav/>
        </div>

      </div>
    )
}