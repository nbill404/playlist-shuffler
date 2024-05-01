'use client'

import { createContext, useContext } from "react";
import PlayerControls from "./PlayerControls";
import SidebarPlaylist from "./SidebarPlaylist";
import SongImage from "./SongImage";

export const SidebarContext = createContext();

export default function Sidebar() {
    const playlistId = {}

    return (
        <div className="flex flex-col bg-slate-800 w-96 h-[93vh]">
            <SidebarContext.Provider value={{playlistId}}>
                <SongImage/>
                <div className="divider"/>
                <PlayerControls/>
                <SidebarPlaylist/>
            </SidebarContext.Provider>
        </div>
    )
}