'use client'
import Link from "next/link"
import MusicListElement from "../listViewElements/SongListViewElement"
import { Song, isSong } from "@/app/lib/song"
import { usePathname } from "next/navigation"
import AddNewPlaylistButton from "./AddNestedPlaylistButton"
import { Playlist } from "@/app/lib/playlist"
import PlaylistListElement from "../listViewElements/PlaylistListViewElement"

interface Props {
    userId: number | undefined
    playlistId: string
    playlist: Playlist[]
}

export default function SongsDisplayList({userId, playlistId, playlist}: Props) {
    const pathname = usePathname();

    return (
        <div className="max-h-[65vh] overflow-auto">
            {playlist && playlist.length > 0 ? playlist.map((element, index: number) =>
                isSong(element) ?
                <a key={`link-${index}`} href={`${pathname}?playlist=${playlistId}&song=${index}&id=${element.id}`}>
                    <MusicListElement key={`song-${index}`} song={element} num={index}/>
                </a>
                :
                <a key={`link-playlist-${index}`} href={`/playlists/${element.id}`}>
                    <PlaylistListElement key={`playlist-${index}`} playlist={element} num={index}/>
                </a>
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