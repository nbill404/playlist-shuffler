'use client'
import { useContext, useState } from "react";

import { Song } from "@/app/lib/song";
import SongSelectButton from "./SongSelectButton";
import SidebarSubPlaylist from "./SidebarSubPlaylist";
import { SidebarContext } from "@/app/contexts/sidebarContext";


export default function SidebarPlaylist() {
    const { playlist } = useContext(SidebarContext);

    return (
        <>
            {playlist ? 
                <div className="bg-slate-700 overflow-y-auto max-h-[70vh]">
                    <p className="menu-title text-lg">{playlist.name}</p>
                    <ul className="menu p-4 text-base-content">
                        {playlist.elements.map((element : any, index : number) => 
                            element instanceof Song ?
                            <SongSelectButton key={`song-${index}`} song={element}/>
                            : 
                            <SidebarSubPlaylist key={`sublist-${index}`} playlist={element}/>
                        )}
                    </ul> 
                </div>                    
            :
            <p className="p-5">No playlist selected</p>
            }
        </>
    )
}