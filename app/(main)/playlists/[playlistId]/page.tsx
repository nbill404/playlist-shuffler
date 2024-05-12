import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";
import SongsDisplayList from "@/app/components/displaySongs/SongsDisplayList";
import AddNewPlaylistButton from "@/app/components/displaySongs/AddNestedPlaylistButton";
import OptionsBar from "@/app/components/displaySongs/optionsBar/OptionsBar";


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

        return fetch(process.env.URL + "/api/playlist/get", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                let combinedList = []

                for (const item of data.data.elements.songList) {                   
                    combinedList.push(item)
                }

                for (const item of data.data.elements.playlistList) {
                    combinedList.push(item)
                }

                combinedList.sort((a, b) => a.position - b.position)
                
                return [data.data.details, combinedList];
            }).catch((error) => {
                return [];
            })
    }

    const [playlistDetails, playlistElements] = await getSongsList(params.playlistId);

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <div className="grid grid-cols-4 items-center">
                <Link className="btn btn-primary max-w-16" href={process.env.URL + "/playlists"}>Back</Link>
                <h1 className="text-2xl text-center col-span-2 font-bold">{playlistDetails.name}</h1>
                <p className="text-lg">Layer: {playlistDetails.rank + 1}</p>
            </div>    
            <div className="divider"></div>
            <div className="flex flex-1 gap-2">
                <AddNewPlaylistButton userId={userId} playlistId={params.playlistId}/>
                <OptionsBar userId={userId} playlistDetails={playlistDetails}/>
            </div>
            <SongsDisplayList userId={userId} playlistId={params.playlistId} playlist={playlistElements}/>
        </div>
    )
}