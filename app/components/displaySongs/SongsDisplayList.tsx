'use client'
import Link from "next/link"
import MusicListElement from "../listViewElements/SongListViewElement"
import { Song, isSong } from "@/app/types/song"
import { usePathname } from "next/navigation"
import AddNewPlaylistButton from "./AddNestedPlaylistButton"
import { Playlist } from "@/app/types/playlist"
import PlaylistListElement from "../listViewElements/PlaylistListViewElement"

interface Props {
    userId: number | undefined
    playlistId: string
    playlist: Playlist[]
}

export default function SongsDisplayList({userId, playlistId, playlist}: Props) {
    const pathname = usePathname();

    return (
        <>
            
            {playlist && playlist.length > 0 ? playlist.map((element, index: number) =>
                isSong(element) ?
                <Link key={`link-${index}`} href={`${pathname}?playlist=${playlistId}&song=${index}&id=${element.id}`}>
                    <MusicListElement key={`song-${index}`} song={element} num={index}/>
                </Link>
                :
                <Link key={`link-playlist-${index}`} href={`/playlists/${element.id}`}>
                    <PlaylistListElement key={`playlist-${index}`} playlist={element} num={index}/>
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

        </>
    )


}