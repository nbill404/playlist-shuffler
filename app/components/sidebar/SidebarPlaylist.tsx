'use client'
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { isSong } from "@/app/lib/song";
import SongSelectButton from "./SongSelectButton";
import SidebarSubPlaylist from "./SidebarSubPlaylist";


export default function SidebarPlaylist() {
    const { playlist } = useContext(SidebarContext);


    return (
        <>
            {playlist ? 
                <ul className="flex flex-col overflow-auto menu p-4 bg-slate-700 max-h-[50vh] text-base-content">
                    {playlist.elements.map((element : any, index : number) => 
                        isSong(element) ?
                        <SongSelectButton key={`song-${index}`} index={index} song={element}/>
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