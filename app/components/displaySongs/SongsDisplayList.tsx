'use client'
import Link from "next/link"
import MusicListElement from "./MusicListElement"
import { Song } from "@/app/types/song"
import { usePathname } from "next/navigation"

interface Props {
    playlistId: string
    songs: Song[]
}

export default function SongsDisplayList({playlistId, songs}: Props) {
    const pathname = usePathname();

    return (
        <div>
            {songs && songs.map((song : Song, index: number) =>
                <Link key={`link-${index}`} href={`${pathname}?playlist=${playlistId}&song=${index}`}>
                    <MusicListElement key={`song-${index}`} song={song} num={index}/>
                </Link>
            )}
        </div>
    )


}