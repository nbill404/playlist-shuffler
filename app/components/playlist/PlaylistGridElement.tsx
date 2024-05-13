'use client'

import { Playlist } from "@/app/types/playlist"
import Link from "next/link"

interface Props {
    playlist: Playlist
}

export default function PlaylistGridElement({playlist} : Props) {
    return (
    <Link href={`/playlists/${playlist.details.id}`}>
        <div className="w-32 h-32 bg-slate-800"/>
        <div>{playlist.details.name}</div>
    </Link>
    )


}