import Link from "next/link";
import AccountNav from "./AccountNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

    return (
      <div className="bg-green-700 ps-4 p-2 navbar h-[4vh]">
        <div className="navbar-start gap-2">
          <Link className="btn text-xl bg-green-700 border-none" href="/">Home</Link>
          {session && 
          <>
            <Link className="btn text-xl bg-green-700 border-none" href="/search">Search</Link>
            <Link className="btn text-xl bg-green-700 border-none" href="/playlists">Organize Lists</Link>
          </>
          }
          </div>
        
        <a className="text-3xl text-center navbar-center" href="/">Playlist Shuffler</a>
        
        <div className="navbar-end gap-1">
          <AccountNav session={session}/>
        </div>

      </div>
    )
}