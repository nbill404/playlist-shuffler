'use client'
import Link from "next/link"
import MusicListElement from "../listViewElements/SongListViewElement"
import { Song } from "@/app/types/song"
import { usePathname } from "next/navigation"
import AddNewPlaylistButton from "./AddNestedPlaylistButton"
import { Playlist } from "@/app/types/playlist"
import PlaylistListElement from "../listViewElements/PlaylistListViewElement"

interface Props {
    userId: number | undefined
    playlistId: string
    songs: Song[]
    playlists: Playlist[]
}

export default function SongsDisplayList({userId, playlistId, songs, playlists}: Props) {
    const pathname = usePathname();

    console.log(playlists)

    return (
        <>
            
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
            {playlists && playlists.map((playlist: Playlist, index: number) => 
                <Link key={`link-playlist-${index}`} href={`/playlists/${playlist.id}`}>
                    <PlaylistListElement key={`playlist-${index}`} playlist={playlist} num={index}/>
                </Link>
            )}
        </>
    )


}