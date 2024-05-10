'use client'
import { Dispatch, SetStateAction, createContext, useState } from "react";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistDropdownMenu from "./PlaylistDropdownMenu";
import PlaylistGridElement from "./PlaylistGridElement";
import { Playlist } from "@/app/lib/playlist";

interface Props {
    userId: number | undefined
    playlists: Playlist[]
}

interface GridContextType {
    lists: Playlist[]
    userId: number | undefined
    setPlaylists: Dispatch<SetStateAction<Playlist[]>>
}

export const GridContext = createContext<GridContextType | null>(null);

export default function PlaylistGrid({userId, playlists}: Props) {
    const [lists, setPlaylists] = useState(playlists);

    return (
        <>
            <div className="p-5 grid grid-cols-5 gap-2 max-h-[75vh] overflow-auto">
                <GridContext.Provider value={{lists, userId, setPlaylists}}>
                    <PlaylistAdd/>
                    {lists.map((item: Playlist, i: number) => 
                    <div key={`playlistcontainer${i}`} className="grid grid-cols-2">
                        <PlaylistGridElement key={`playlist-${i}`} playlist={item} />
                        <PlaylistDropdownMenu key={`dropdown-${i}`} playlist={item}/>
                    </div>
                    )}    
                </GridContext.Provider>
            </div>
        </>
    )
}