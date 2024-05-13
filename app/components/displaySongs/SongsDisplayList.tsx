'use client'
import Link from "next/link"
import MusicListElement from "../listViewElements/SongListViewElement"
import { Song } from "@/app/lib/song"
import { usePathname } from "next/navigation"
import { Playlist } from "@/app/lib/playlist"
import PlaylistListElement from "../listViewElements/PlaylistListViewElement"
import { useEffect, useState } from "react"
import { convertJsonToPlaylistSingle } from "@/app/lib/convert"
import ElementOptions from "../listViewElements/options/ElementOptions"

interface Props {
    userId: number | undefined
    data: Object
}

const updatePosition = (element: Song | Playlist, userId : number | undefined, position : number) => {
    if (element instanceof Playlist) {
        const data = {
            userId: userId,
            playlistId: element.id,
            values: {
                position : position
            }
        }

        fetch("/api/playlist/update", {
            method: "POST",
            body: JSON.stringify(data)
        }).catch((error) => console.log(error))
    } else if (element instanceof Song) {
        const data = {
            userId: userId,
            songId: element.id,
            values: {
                position: position
            }
        }

        fetch("/api/song/update", {
            method: "POST",
            body: JSON.stringify(data)
        }).catch((error) => console.log(error))
    }
}

export default function SongsDisplayList({userId, data}: Props) {
    const pathname = usePathname();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [swapIndexes, setSwapIndexes] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (data) {
            setPlaylist(convertJsonToPlaylistSingle(data))
        }
    }, [data])

    // Swap elements
    useEffect(() => {
        if (swapIndexes && playlist) {
            const i = swapIndexes[0];
            const j = swapIndexes[1];

            if (i < 0) { return; }
            if (j >= playlist.elements.length) { return; }
            
            const element1 = playlist.elements[i];
            const element2 = playlist.elements[j];

            // Database update
            updatePosition(element1, userId, j);
            updatePosition(element2, userId, i);

            // Client update
            [element1.position, element2.position] = [j, i];
            [playlist.elements[i], playlist.elements[j]] = [playlist.elements[j], playlist.elements[i]];
            
            setSwapIndexes(null);
        }

    }, [userId, playlist, swapIndexes])


    return (
        <div className="max-h-[65vh] overflow-auto">
            {playlist && playlist.elements.length > 0 ? playlist.elements.map((element : any, index: number) =>
                element instanceof Song ?
                <div key={`link-${index}`} className="grid grid-cols-8">
                    <a className="col-span-7"  href={`${pathname}?playlist=${playlist.id}&song=${index}&id=${element.id}`}>
                        <MusicListElement key={`song-${index}`} song={element} num={index}/>
                    </a>
                    <ElementOptions index={index} setSwapIndexes={setSwapIndexes}/>
                </div>
                :
                <div key={`link-${index}`} className="grid grid-cols-8">
                    <a className="col-span-7" href={`/playlists/${element.id}`}>
                        <PlaylistListElement key={`playlist-${index}`} playlist={element} num={index}/>
                    </a>
                    <ElementOptions index={index} setSwapIndexes={setSwapIndexes}/>
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