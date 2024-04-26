import { getServerSession } from "next-auth";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistGridElement from "./PlaylistGridElement";
import { authOptions } from "@/app/lib/auth";

const getPlaylists = async (id: number) => {
    try {
        console.log(id);

        const response = await fetch(process.env.URL + '/api/playlist/get', 
        {
            method: 'POST',
            body: JSON.stringify({id: id})
        });

        if (response.ok) {
            const data = await response.json();

            let playlists = []

            for (const item of data.data) {
                playlists.push(item.name);
            }

            return playlists;
        } else {
            console.log(response);
            return [];
        }

    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function PlaylistsView() {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    let playlists = [];

    if (session && userId) {
        playlists = await getPlaylists(userId);
    } else {
        playlists = ["Playlist #1" , "Playlist #2", "Playlist #3", "Playlist #4", "Playlist #5", "1" ];
    }

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <div className="grid">
                <h1 className="text-xl">Your Playlists</h1>
            </div>
            <div className="p-5 grid grid-cols-5 grid-rows-4">
                {playlists.map((item, i) => 
                    <PlaylistGridElement key={`${i}`} name={item} />
                )}

                <PlaylistAdd id={userId}/>
            </div>
        </div>
    )



}