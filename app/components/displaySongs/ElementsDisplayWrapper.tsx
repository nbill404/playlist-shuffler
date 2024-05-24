'use client'
import { convertJsonToPlaylistSingle } from "@/app/lib/convert";
import { Playlist } from "@/app/lib/playlist";
import { Song } from "@/app/lib/song";
import { useEffect, useState } from "react";
import SongsDisplayList from "./SongsDisplayList";
import OptionsBar from "./optionsBar/OptionsBar";
import Link from "next/link";
import AddNestedPlaylistButton from "./AddNestedPlaylistButton";
import { useRouter } from "next/navigation";

interface Props {
    userId: number
    data: Object
}

const updatePosition = (playlistId: number, element: Song | Playlist, userId : number, position : number) => {
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
            playlistId: playlistId,
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

export default function ElementsDisplayWrapper({userId, data}: Props) {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [swapIndexes, setSwapIndexes] = useState<[number, number] | null>(null);

    const router = useRouter();

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
            updatePosition(playlist.id, element1, userId, j);
            updatePosition(playlist.id, element2, userId, i);

            // Client update
            [element1.position, element2.position] = [j, i];
            [playlist.elements[i], playlist.elements[j]] = [playlist.elements[j], playlist.elements[i]];
            
            setSwapIndexes(null);
        }
    }, [userId, playlist, swapIndexes])


return playlist ? 
        <>
            <div className="grid grid-cols-5 items-center">
                <div className="flex gap-1">
                    <button className="btn btn-primary max-w-16" onClick={() => router.back()}>Back</button>
                    <Link className="btn btn-primary max-w-24" href={"/playlists"}>Back to top</Link>
                </div>
                <h1 className="text-2xl text-center col-span-3 font-bold">{playlist.name}</h1>
                <p className="text-lg">Layer: {playlist.rank + 1}</p>
            </div>    
            <div className="divider"></div>
            <div className="flex flex-1 gap-2">
                <AddNestedPlaylistButton userId={userId} playlist={playlist} setPlaylist={setPlaylist}/>
                <OptionsBar userId={userId} playlist={playlist}/>
            </div>
            <SongsDisplayList userId={userId} playlist={playlist} setPlaylist={setPlaylist} setSwapIndexes={setSwapIndexes}/>
            </>
        :
        <p>Loading</p>
}