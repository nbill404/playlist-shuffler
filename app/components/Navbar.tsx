// Search icon https://www.svgrepo.com/svg/532552/search-alt-2

import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { Avatar } from "./Avatar";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";

interface Props {
  pageName: string
}


export default function Navbar() {
    const userInfo = async () => {
      const session = await getServerSession(authOptions);

      return (
        <>
          {session ? 
          <>
            <p className="text text-xl">Welcome {session?.user.username}!</p>
            <Avatar/>
            <LogoutButton/>
              
          </>
          :
          <>
            <a className="btn bg-blue-300 text-xl text-white border-2 border-slate-600 navbar-end w-fit" href="/login">Login</a>
            <a className="btn bg-blue-300 text-xl text-white border-2 border-slate-600 navbar-end w-fit" href="/register">Register</a>  
            
          </>
          }
        </>
      )
    }

    return (
      <div className="bg-green-700 ps-4 p-2 navbar max-h-16">
        <div className="navbar-start gap-2">
            <SearchBar/>
            <a className="btn text-xl bg-green-700 border-none" href="/playlists">Organize Lists</a>
        </div>
        
        <a className="text-3xl text-center navbar-center" href="/">Playlist Shuffler</a>
        
        <div className="navbar-end gap-1">
          {userInfo()}
        </div>

      </div>
    )
}