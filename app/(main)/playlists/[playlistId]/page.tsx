import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";
import SongsDisplayList from "@/app/components/displaySongs/SongsDisplayList";
import ShuffleButton from "@/app/components/displaySongs/ShuffleButton";
import AddNewPlaylistButton from "@/app/components/displaySongs/AddNestedPlaylistButton";
import OptionsBar from "@/app/components/displaySongs/OptionsBar";


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
                let combinedList = []

                for (const item of data.data.songList) {                   
                    combinedList.push(item)
                }

                for (const item of data.data.playlistList) {
                    combinedList.push(item)
                }

                combinedList.sort((a, b) => a.position - b.position)
                
                return combinedList;
            }).catch((error) => {
                return [];
            })
    }

    const playlist = await getSongsList(params.playlistId);

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <div className="flex flex-1">
                <Link className="btn btn-primary" href={process.env.URL + "/playlists"}>Back</Link>
            </div>    
            <div className="divider"></div>
            <div className="flex flex-1 gap-2">
                <AddNewPlaylistButton userId={userId} playlistId={params.playlistId}/>
                <OptionsBar userId={userId} playlistId={params.playlistId}/>
            </div>
            <SongsDisplayList userId={userId} playlistId={params.playlistId} playlist={playlist}/>
        </div>
    )
}