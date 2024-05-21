'use client'
import { Playlist } from "@/app/lib/playlist"
import { useContext, useEffect, useState } from "react"
import { SearchContext } from "./SearchContainer"
import AddToPlaylistButton from "./AddToPlaylistButton";
import { Song } from "@/app/lib/song";
import Image from "next/image";
import SelectSubPlaylistArrow from "./SelectSubPlaylistArrow";

interface Props {
    song: Song
}

export default function SelectPlaylistDropdown({song}: Props) {
    const { playlists } = useContext(SearchContext); 
    const { playlistId } = useContext(SearchContext);
    const { setPlaylistsId } = useContext(SearchContext);
    const [ addSuccessTimer, setAddSuccessTimer ] = useState<number>(0);

    const handleClick = () => {
        setPlaylistsId(null);
    }

    useEffect(() => {
        if (addSuccessTimer > 0) {
            setAddSuccessTimer(addSuccessTimer - 1);
        }
    }, [addSuccessTimer, setAddSuccessTimer])


    return (
        <>
        <div className="dropdown-content dropdown-end bg-blue-600 align-self-end" tabIndex={0}>
            {playlistId && 
                <button className="flex flex-1"onClick={handleClick}>
                    <Image src="/left-arrow.svg" height="16" width="16" alt=""></Image>
                    <p>Back to top</p>
                </button>
            }
            {playlists && playlists.map((playlist: Playlist, index: number) =>
                <div key={`options-${index}`} className="flex" >
                    <AddToPlaylistButton playlist={playlist} song={song} setAddSuccessTimer={setAddSuccessTimer}/> 
                    {playlist.containsPlaylists() && <SelectSubPlaylistArrow playlist={playlist} setPlaylistsId={setPlaylistsId}/>}
                </div>

            )}
        </div>
        {addSuccessTimer > 0 && 
            <div className="toast">
                <div className="alert alert-success">
                    Successfully added
                </div>
            </div>
        }
        </>

    )
}

