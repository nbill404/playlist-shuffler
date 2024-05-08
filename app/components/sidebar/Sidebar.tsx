'use client'
import { createContext, useContext, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import SidebarPlaylist from "./SidebarPlaylist";
import SongImage from "./SongImage";
import { useSearchParams } from "next/navigation";
import { Song } from "@/app/types/song";
import { shuffle } from "@/app/lib/shuffle";
import { Playlist } from "@/app/types/playlist";

export const SidebarContext = createContext();

export default function Sidebar({userId} : { userId: number | undefined}) {
    const queryPlaylistId = useSearchParams().get("playlist");
    const querySongNum = useSearchParams().get("song");
    const id = useSearchParams().get("id");

    // Will only be called on initial render
    const [songNum, setSongNum] = useState<Number>(-1);
    const [playlistId, setPlaylistId] = useState<Number>(-1);
    const [playlist, setPlaylist] = useState<(Song | Playlist)[]>([]);
    const [selectedSongId, setSelectedSongId] = useState<string | null>(id);

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
                let combinedList = []

                for (const item of data.data.songList) {
                    const song = new Song("", "Youtube")
                    song.addDetails(item);
                    combinedList.push(song)
                }

                for (const item of data.data.playlistList) {
                    const playlist = new Playlist(-1, "")
                    playlist.addDetails(item)
                    combinedList.push(playlist)
                }

                combinedList.sort((a, b) => a.position - b.position)

                setPlaylist(combinedList);
            }).catch((error) => {
                console.log(error);
                return [];
            })
    }, [userId, playlistId]);

    // Waits for fetch playlist effect to complete before setting the playlist
    useEffect(() => {
        // Ensure that playlist exists
        if ((playlist.length > 0) && (typeof songNum !== typeof undefined) && (typeof songNum !== null)) {
            setSelectedSongId(playlist[songNum].id);
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

    return (
        <div className="flex flex-col bg-slate-800 w-96 h-[93vh]">
            {!userId ?
                <p className="p-5">User is not logged in</p>
            :
            <SidebarContext.Provider value={{playlist, playlistId, selectedSongId, setSongNum, setPlaylist}}>
                <SongImage/>
                <div className="divider"/>
                <PlayerControls/>
                <SidebarPlaylist/>
            </SidebarContext.Provider>
            }
        </div>
    )
}