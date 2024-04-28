'use client'
import { Playlist } from "@/app/types/playlist"
import { useContext } from "react"
import { SearchContext } from "./SearchContainer"
import AddToPlaylistButton from "./AddToPlaylistButton";
import { Song } from "@/app/types/song";

interface Props {
    song: Song
}

export default function SelectPlaylistDropdown({song}: Props) {
    const { playlists } = useContext(SearchContext); 

    return (
        <div className="dropdown-content dropdown-end bg-blue-600 align-self-end" tabIndex={0}>
            {playlists && playlists.map((playlist: Playlist, index: number) => 
                <div key={`options-${index}`}>
                    <AddToPlaylistButton playlist={playlist} song={song}/>
                </div>)}
        </div>
    )
}

