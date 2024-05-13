'use client'
import { Playlist } from "@/app/lib/playlist"
import { useContext } from "react"
import { SearchContext } from "./SearchContainer"
import AddToPlaylistButton from "./AddToPlaylistButton";
import { Song } from "@/app/lib/song";
import Image from "next/image";

interface Props {
    song: Song
}

export default function SelectPlaylistDropdown({song}: Props) {
    const { playlists } = useContext(SearchContext); 
    const { playlistId } = useContext(SearchContext);
    const { setPlaylistsId } = useContext(SearchContext);


    const handleClick = () => {
        setPlaylistsId(null);
    }


    return (
        <div className="dropdown-content dropdown-end bg-blue-600 align-self-end" tabIndex={0}>
            {playlistId && 
                <button className="flex flex-1"onClick={handleClick}>
                    <Image src="/left-arrow.svg" height="16" width="16" alt=""></Image>
                    <p>Back to top</p>
                </button>
            }
            {playlists && playlists.map((playlist: Playlist, index: number) => 
                <AddToPlaylistButton key={`options-${index}`} playlist={playlist} song={song}/>
            )}

        </div>
    )
}

