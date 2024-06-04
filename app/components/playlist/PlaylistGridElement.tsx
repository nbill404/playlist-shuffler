'use client'

import { Playlist } from "@/app/lib/playlist"
import Link from "next/link"

interface Props {
    playlist: Playlist
}

export default function PlaylistGridElement({playlist} : Props) {
    return (
    <Link href={`/playlists/${playlist.id}`}>
        <div className="w-32 h-32 bg-slate-800"/>
        <div>{playlist.name}</div>
    </Link>
    )


}