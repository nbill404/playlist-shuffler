'use client'
import { useContext, useState } from "react";
import { SidebarContext } from "./Sidebar";
import { Song } from "@/app/lib/song";
import SongSelectButton from "./SongSelectButton";
import SidebarSubPlaylist from "./SidebarSubPlaylist";


export default function SidebarPlaylist() {
    const { playlist } = useContext(SidebarContext);

    return (
        <>
            {playlist ? 
                <ul className="flex flex-col menu p-4 bg-slate-700 text-base-content">
                    {playlist.elements.map((element : any, index : number) => 
                        element instanceof Song ?
                        <SongSelectButton key={`song-${index}`} song={element}/>
                        : 
                        <SidebarSubPlaylist key={`sublist-${index}`} playlist={element}/>
                    )}
                </ul> 
                    
            :
            <p className="p-5">No playlist selected</p>
            }
        </>
    )
}