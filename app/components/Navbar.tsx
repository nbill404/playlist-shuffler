// Search icon https://www.svgrepo.com/svg/532552/search-alt-2

export default function Navbar() {
    return (
      <div className="bg-green-700 ps-4 p-2 navbar max-h-16">
        <div className="navbar-start gap-2">
            <label className="input flex max-w-96">
                <input type="text" placeholder="Search"></input>
            </label>
            <button className="btn text-xl bg-green-700 border-none">Playlists</button>
        </div>
        
        <h1 className="text-3xl text-center navbar-center">Playlist Shuffler</h1>
        
        <div className="navbar-end gap-1">
          <button className="btn bg-blue-300 text-xl text-white border-2 border-slate-600 navbar-end w-fit">Login</button>  
          <div className="avatar placeholder">
            <div className="w-12 rounded-full bg-blue-700">
                <span>B</span>
            </div>
          </div>
        </div>

      </div>
    )
}