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
                return data.data;
            }).catch((error) => {
                return {};
            })
    }

    const data = await getSongsList(params.playlistId);

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <div className="grid grid-cols-4 items-center">
                <Link className="btn btn-primary max-w-16" href={process.env.URL + "/playlists"}>Back</Link>
                <h1 className="text-2xl text-center col-span-2 font-bold">{data.details.name}</h1>
                <p className="text-lg">Layer: {data.details.rank + 1}</p>
            </div>    
            <div className="divider"></div>
            <div className="flex flex-1 gap-2">
                <AddNewPlaylistButton userId={userId} playlistId={data.details.id}/>
                <OptionsBar userId={userId} playlistDetails={data.details}/>
            </div>
            <SongsDisplayList userId={userId} data={data}/>
        </div>
    )
}