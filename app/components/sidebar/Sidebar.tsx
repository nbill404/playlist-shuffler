'use client'
import { createContext, useContext, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import SidebarPlaylist from "./SidebarPlaylist";
import SongImage from "./SongImage";
import { useSearchParams } from "next/navigation";
import { Playlist } from "@/app/lib/playlist";
import { convertJsonToPlaylist } from "@/app/lib/convert";

export const SidebarContext = createContext();

export default function Sidebar({userId} : { userId: number | undefined}) {
    const queryPlaylistId = useSearchParams().get("playlist");
    const querySongNum = useSearchParams().get("song");
    const id = useSearchParams().get("id");

    // Will only be called on initial render
    const [songNum, setSongNum] = useState<number>(-1);
    const [playlistId, setPlaylistId] = useState<number>(-1);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [selectedSongId, setSelectedSongId] = useState<string | null>(id);
    const [songEnded, setSongEnded] = useState<boolean>(false);

    // Fetch playlists
    useEffect(() => {
        const data = {
            userId: userId,
            playlistId: playlistId
        }

        fetch("/api/playlist/getAllLayers", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                const combinedList = convertJsonToPlaylist(data.data);

                setPlaylist(combinedList);
            }).catch((error) => {
                console.log(error);
                return [];
            })
    }, [userId, playlistId]);

    // Waits for fetch playlist effect to complete before setting the playlist
    useEffect(() => {

        // Ensure that playlist exists
        if (playlist && playlist.length > 0) {
            if ((0 <= songNum) && (songNum <= playlist.elements.length)) {
                setSelectedSongId(playlist.elements[songNum].id);
            }
        }
    }, [songNum, playlist])

    // Updates when query parameter changes
    useEffect(() => {
        if (typeof queryPlaylistId !== typeof null && playlistId !== Number(queryPlaylistId)) {
            setPlaylistId(Number(queryPlaylistId))
        }
    }, [queryPlaylistId, playlistId])

    // Updates when query parameter changes
    useEffect(() => {
        if (typeof querySongNum !== typeof null) {
            setSongNum(Number(querySongNum))
        }        
    }, [querySongNum])

    useEffect(() => {
        if (songEnded) {
            setSongNum(songNum + 1);
            setSongEnded(false);
        }
    }, [songEnded, songNum])

    return (
        <div className="flex flex-col bg-slate-800 w-96 h-[93vh]">
            {!userId ?
                <p className="p-5">User is not logged in</p>
            :
            <SidebarContext.Provider value={{playlist, playlistId, selectedSongId, setSongNum, setPlaylist, setSongEnded}}>
                <SongImage/>
                <div className="divider"/>
                <PlayerControls/>
                <SidebarPlaylist/>
            </SidebarContext.Provider>
            }
        </div>
    )
}