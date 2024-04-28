'use client'

import { Playlist } from "@/app/types/playlist"

interface Props {
    playlist: Playlist
}

export default function PlaylistGridElement({playlist} : Props) {


    return (
    <div>
        <div className="w-32 h-32 bg-slate-800"/>
        <div>{playlist.name}</div>
        
    </div>
    )


}