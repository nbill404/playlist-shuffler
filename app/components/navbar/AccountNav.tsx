import { Avatar } from "./Avatar";
import LogoutButton from "./LogoutButton";
import { Session } from "inspector";

export default async function AccountNav({session} : {session: Session | null}) {
    

    return (
      <>
        {session ? 
        <>
          <p className="text text-xl">Welcome {session?.user.username}!</p>
          <Avatar name={session?.user.username}/>
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