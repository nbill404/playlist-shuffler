'use client'
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { Playlist } from "@prisma/client";
import { Song, isSong } from "@/app/types/song";


export default function SidebarPlaylist() {
    const { playlist } = useContext(SidebarContext);
    const { setSongNum } = useContext(SidebarContext);


    return (
        <>
            {playlist && playlist.length > 0 ? 
                <ul className="menu p-4 bg-slate-700 text-base-content border">
                    {playlist.map((element, index : number) => 
                        isSong(element) ?
                            <button key={`button-${index}`} onClick={() => setSongNum(index)}>
                                <li key={`${index}`} className="text-left hover:bg-slate-600">{element.title}</li>
                            </button>
                        : 
                        <li key={`${index}`} className="text-left hover:bg-slate-600">{element.name}</li>
                        
                    )}
                </ul> 
                    
            :
            <p className="p-5">No playlist selected</p>
            }
        </>
    )
}