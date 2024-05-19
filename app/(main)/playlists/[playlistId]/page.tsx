import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import ElementsDisplayWrapper from "@/app/components/displaySongs/ElementsDisplayWrapper";

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
            { userId ?
                <ElementsDisplayWrapper userId={userId} data={data}/>
            : <p>Not logged in</p>
        }
        </div>
    )
}