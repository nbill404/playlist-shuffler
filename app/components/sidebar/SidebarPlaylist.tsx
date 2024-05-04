'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

export default function SidebarPlaylist({playlist} : {}) {
    const pathname = usePathname();
    const playlistId = useSearchParams().get("playlist");
    const { setSongNum } = useContext(SidebarContext);


    return (
        <>
            {playlist.length > 0 ? 
                <ul className="menu p-4 bg-slate-700 text-base-content border">
                    {playlist.map((song, index : number) => 
                        <button key={`button-${index}`} onClick={() => setSongNum(index)}>
                            <li key={`${index}`} className="text-left hover:bg-slate-600">{song.title}</li>
                        </button>
                )} 
                </ul> 
            
            :
            <p className="p-5">No playlist selected</p>
            }
        </>
    )
}