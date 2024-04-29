import SongsDisplayList from "../displaySongs/SongsDisplayList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";


export default async function DisplayPlaylistsView() {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id;


    return (
    <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
        <SongsDisplayList userId={userId}/>
    </div>
    )
}