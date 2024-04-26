import PlaylistAdd from "./PlaylistAdd";
import PlaylistDropdownMenu from "./PlaylistDropdownMenu";
import PlaylistGridElement from "./PlaylistGridElement";

interface Props {
    userId: number
    playlist: {
        name: string
        id: number
    },
}

export default function PlaylistGrid({userId, playlists}) {
    return (
        <>
            <div className="grid">
                <h1 className="text-xl">Your Playlists</h1>
            </div>
            <div className="p-5 grid grid-cols-5 gap-2 max-h-[75vh] overflow-auto">
                <PlaylistAdd id={userId}/>
                {playlists.map((item: Props["playlist"], i: number) => 
                <div key={`playlistcontainer${i}`} className="grid grid-cols-2">
                    <PlaylistGridElement key={`playlist-${i}`} userId={userId} playlist={item} />
                    <PlaylistDropdownMenu key={`dropdown-${i}`} userId={userId} playlist={item}/>
                </div>
            )}    
            </div>
        </>
    )
}