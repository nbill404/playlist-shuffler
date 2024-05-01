import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";
import SongsDisplayList from "@/app/components/displaySongs/SongsDisplayList";
import { Song } from "@/app/types/song";


export default async function DisplayPlaylistsPage({params}:
    {params: {playlistId : string}}
) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id;

    const getSongsList = async (playlistId: string) => {
        const data = {
            userId: userId,
            playlistId: playlistId

        }

        return fetch(process.env.URL + "/api/song/get", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                let songs = []

                for (const item of data.data) {                   
                    songs.push(item)
                }
                
                return songs;
            }).catch((error) => {
                return [];
            })
    }

    const songs = await getSongsList(params.playlistId);

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <Link className="btn btn-primary" href={process.env.URL + "/playlists"}>Back</Link>
            <SongsDisplayList userId={userId} songs={songs}/>
        </div>
    )
}