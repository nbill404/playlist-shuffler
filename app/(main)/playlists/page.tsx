import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import PlaylistGrid from "@/app/components/playlist/PlaylistGrid";
import RankButton from "@/app/components/playlist/RankButton";
import { useSearchParams } from "next/navigation";

export default async function PlaylistsPage({searchParams} : {
    searchParams : {r : string}

}) {
    console.log(searchParams)

    const getPlaylists = async (userId: number | undefined) => {
        try {
            if (typeof userId === typeof undefined) {
                throw Error("User is not logged in")
            }

            const response = await fetch(process.env.URL + '/api/playlist/getAllRank', 
            {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    rank: Number(searchParams.r)
                })
            });
    
            if (response.ok) {
                const data = await response.json();
    
                let playlists = []
    
                for (const playlist of data.data) {
                    playlists.push(playlist)
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
    
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const playlists = await getPlaylists(userId);

    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <div className="flex gap-2">
                <h1 className="text-xl">Your Playlists</h1>
                {Array.from(Array(10).keys()).map((i: number, _: number) => <RankButton key={`rank-button-${i}`} rank={i}/>)}
                
            </div>
            <PlaylistGrid userId={userId} playlists={playlists}/>
        </div>
    )
}