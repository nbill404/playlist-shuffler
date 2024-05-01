import SongsDisplayList from "./SongsDisplayList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";


export default async function DisplaySongsView() {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id;


    return (
    <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
        <Link className="btn btn-primary" href={process.env.URL + "/playlists"}>Back</Link>
        <SongsDisplayList userId={userId}/>
    </div>
    )
}