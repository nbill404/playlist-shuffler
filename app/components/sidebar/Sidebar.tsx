'use client'
import { createContext, useContext, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import SidebarPlaylist from "./SidebarPlaylist";
import SongImage from "./SongImage";
import { useSearchParams } from "next/navigation";
import { Song } from "@/app/types/song";

export const SidebarContext = createContext();

export default function Sidebar({userId} : { userId: number | undefined}) {
    const playlistId = useSearchParams().get("playlist");
    const songNum = useSearchParams().get("song");
    const [playlist, setPlaylist] = useState([]);
    const [selectedSong, setSelectedSong] = useState("");

    // Fetch playlists
    useEffect(() => {
        const data = {
            userId: userId,
            playlistId: playlistId
        }

        fetch("/api/song/get", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                let songs = []

                for (const item of data.data) {   
                    songs.push(item)
                }
                
                setPlaylist(songs);
            }).catch((error) => {
                console.log(error);
                return [];
            })
    }, [userId, playlistId]);

    useEffect(() => {
        if (playlist.length > 0 && songNum) {
            setSelectedSong(playlist[songNum].id);
        }
    }, [songNum, playlist])

    return (
        <div className="flex flex-col bg-slate-800 w-96 h-[93vh]">
            <SidebarContext.Provider value={{playlistId, selectedSong, setSelectedSong}}>
                <SongImage songId={selectedSong}/>
                <div className="divider"/>
                <PlayerControls/>
                <SidebarPlaylist playlist={playlist}/>
            </SidebarContext.Provider>
        </div>
    )
}