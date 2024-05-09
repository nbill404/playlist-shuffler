'use client'
import { isSong } from "@/app/types/song"
import SongSelectButton from "./SongSelectButton"

export default function SidebarSubPlaylist({playlist}) {
    return (
        <li>
            <details>
            <summary className="text-left">{playlist.name}</summary>
                <ul>
                    {playlist.elements.map((element: any, index: number) => 
                        isSong(element) ?
                        <SongSelectButton key={`song-${index}`} index={index} song={element}/>
                        : 
                        <SidebarSubPlaylist key={`sublist-${index}`} playlist={element}/>
                    )}
                </ul>
            </details>
        </li>
    )


}

