import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { Avatar } from "./Avatar";
import LogoutButton from "./LogoutButton";

export default async function AccountNav() {
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