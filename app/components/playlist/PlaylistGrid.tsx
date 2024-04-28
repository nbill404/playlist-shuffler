'use client'
import { createContext, useState } from "react";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistDropdownMenu from "./PlaylistDropdownMenu";
import PlaylistGridElement from "./PlaylistGridElement";

interface Props {
    userId: number | undefined
    playlists: {
        name: string
        id: number
    }
}

export const GridContext = createContext({});

export default function PlaylistGrid({userId, playlists}: Props) {
    const [lists, setPlaylists] = useState(playlists);

    return (
        <>
            <div className="grid">
                <h1 className="text-xl">Your Playlists</h1>
            </div>
            <div className="p-5 grid grid-cols-5 gap-2 max-h-[75vh] overflow-auto">
                <GridContext.Provider value={{lists, userId, setPlaylists}}>
                    <PlaylistAdd/>
                    {lists.map((item: Props["playlists"], i: number) => 
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