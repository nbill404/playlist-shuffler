'use client'
import Link from "next/link"
import MusicListElement from "../listViewElements/SongListViewElement"
import { Song } from "@/app/lib/song"
import { usePathname } from "next/navigation"
import { Playlist } from "@/app/lib/playlist"
import PlaylistListElement from "../listViewElements/PlaylistListViewElement"

import ElementOptions from "../listViewElements/options/ElementOptions"
import { Dispatch, SetStateAction } from "react"

interface Props {
    userId: number
    playlist: Playlist
    setPlaylist : Dispatch<SetStateAction<Playlist | null>>,
    setSwapIndexes: Dispatch<SetStateAction<[number, number] | null>>
}

export default function SongsDisplayList({userId, playlist, setPlaylist, setSwapIndexes}: Props) {
    const pathname = usePathname();

    return (
        <div className="max-h-[65vh] overflow-auto">
            {playlist && playlist.elements.length > 0 ? playlist.elements.map((element : any, index: number) =>
                element instanceof Song ?
                <div key={`link-${index}`} className="grid grid-cols-8">
                    <Link className="col-span-7"  href={`${pathname}?playlist=${playlist.id}&id=${element.id}`}>
                        <MusicListElement key={`song-${index}`} song={element} num={index}/>
                    </Link>
                    <ElementOptions userId={userId} index={index} element={element} playlist={playlist} setPlaylist={setPlaylist} setSwapIndexes={setSwapIndexes}/>
                </div>
                :
                <div key={`link-${index}`} className="grid grid-cols-8">
                    <Link className="col-span-7" href={`/playlists/${element.id}`}>
                        <PlaylistListElement key={`playlist-${index}`} playlist={element} num={index}/>
                    </Link>
                    <ElementOptions userId={userId} index={index} element={element} playlist={playlist} setPlaylist={setPlaylist} setSwapIndexes={setSwapIndexes}/>
                </div>
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