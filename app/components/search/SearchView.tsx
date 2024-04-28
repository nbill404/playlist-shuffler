import { getServerSession } from "next-auth";
import SearchContainer from "./SearchContainer";
import { authOptions } from "@/app/lib/auth";

export default async function SearchView() {
    const getPlaylists = async (id: number | undefined) => {
        try {
            if (typeof id === typeof undefined) {
                throw Error("User is not logged in")
            }
    
            const response = await fetch(process.env.URL + '/api/playlist/get', 
            {
                method: 'POST',
                body: JSON.stringify({id: id})
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
    const userId: number | undefined = session?.user.id;
    const playlists = await getPlaylists(userId);
  
    return (
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
            <SearchContainer userId={userId} playlists={playlists}/>
        </div>
    )
}