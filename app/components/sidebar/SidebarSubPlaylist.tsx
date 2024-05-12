'use client'
import { Song } from "@/app/lib/song"
import SongSelectButton from "./SongSelectButton"
import { Playlist } from "@/app/lib/playlist"

export default function SidebarSubPlaylist({playlist}) {
    return (
        <li>
            <details>
            <summary className="text-left">{playlist.name}</summary>
                <ul>
                    {playlist.elements.map((element: Song | Playlist, index: number) => 
                        element instanceof Song ?
                        <SongSelectButton key={`song-${index}`} index={index} song={element}/>
                        : 
                        <SidebarSubPlaylist key={`sublist-${index}`} playlist={element}/>
                    )}
                </ul>
            </details>
        </li>
    )


}

