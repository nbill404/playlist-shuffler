'use client'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistDropdownMenu from "./PlaylistDropdownMenu";
import PlaylistGridElement from "./PlaylistGridElement";
import { Playlist } from "@/app/lib/playlist";
import { GridContext } from "@/app/contexts/gridContext";
import { convertJsonToPlaylistSingle } from "@/app/lib/convert";

interface Props {
    userId: number | undefined
    playlists: Playlist[]
    rank: number
}

export default function PlaylistGrid({userId, playlists, rank}: Props) {
    const [lists, setPlaylists] = useState(playlists);

    // Run when fetch from server
    useEffect(() => {
        let convertedPlaylists = []

        for (const item of playlists) {
            convertedPlaylists.push(convertJsonToPlaylistSingle(item));
        }

        setPlaylists(convertedPlaylists)
    }, [playlists])

    return (
        <>
            <div className="p-5 grid grid-cols-5 gap-2 max-h-[75vh] overflow-auto">
                <GridContext.Provider value={{lists, userId, setPlaylists}}>
                    {rank === 0 && <PlaylistAdd/>}
                    {lists.map((element: Playlist, i: number) => 
                    <div key={`playlistcontainer${i}`} className="grid grid-cols-2">
                        <PlaylistGridElement key={`playlist-${i}`} playlist={element} />
                        <PlaylistDropdownMenu key={`dropdown-${i}`} playlist={element}/>
                    </div>
                    )}    
                </GridContext.Provider>
            </div>
        </>
    )
}