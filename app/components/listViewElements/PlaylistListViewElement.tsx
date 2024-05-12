'use client'
import { Playlist } from "@/app/lib/playlist"
import Image from "next/image"

interface Props{
    playlist: Playlist,
    num: number
}


export default function PlaylistListViewElement({playlist, num} : Props) {
    return (
    <div className="flex flex-row gap-5 p-3 hover:bg-sky-800">
        <p className="text-xl text-bold flex items-center">{num + 1}</p>
        <Image src="/youtube.svg" width="20" height="10" alt=""/>
        <div className="w-52 h-32 border">
            <p className="text-center align-center text-3xl">{playlist.rank}</p>
        </div>
        <p className="text-xl font-semibold">{playlist.name}</p>
    </div>
    )
}