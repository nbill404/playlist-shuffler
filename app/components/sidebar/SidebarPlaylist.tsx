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
        <ul className="menu p-4 bg-slate-700 text-base-content">
            {playlist && playlist.map((song, index : number) => 
                <button key={`button-${index}`} onClick={() => setSongNum(index)}>
                    <li key={`${index}`} className="hover:bg-slate-600">{song.title}</li>
                </button>
            )}
            <li className="rounded hover:bg-base-100">Sidebar Item 3</li>
        </ul>
    )
}