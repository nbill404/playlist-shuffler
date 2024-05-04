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
            {songs.length > 0 ? songs.map((song : Song, index: number) =>
                <Link key={`link-${index}`} href={`${pathname}?playlist=${playlistId}&song=${index}&id=${song.id}`}>
                    <MusicListElement key={`song-${index}`} song={song} num={index}/>
                </Link>
            )
            :
                <div className="flex flex-col gap-2">
                    <p>No songs in playlists. Click the button to search for songs to add</p>
                    <Link className="btn btn-primary w-36" href="/search">
                        Search Page
                    </Link>
                </div>
            }
        </div>
    )


}