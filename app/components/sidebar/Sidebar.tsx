'use client'
import { createContext, useContext, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import SidebarPlaylist from "./SidebarPlaylist";
import { usePathname, useSearchParams } from "next/navigation";
import { Playlist } from "@/app/lib/playlist";
import { convertJsonToPlaylist } from "@/app/lib/convert";

import SongDisplay from "./SongDisplay";
import { useRouter } from "next/navigation";

export const SidebarContext = createContext();

export default function Sidebar({userId} : { userId: number | undefined}) {
    const queryPlaylistId = useSearchParams().get("playlist");
    const querySongId = useSearchParams().get("id");
    const mode = useSearchParams().get("mode");

    // Will only be called on initial render
    const [songNum, setSongNum] = useState<number>(0);
    const [playlistId, setPlaylistId] = useState<number>(-1);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [selectedSongId, setSelectedSongId] = useState<string | null>(querySongId);
    const [songEnded, setSongEnded] = useState<boolean>(false);
    const [songPaused, setSongPaused] = useState<boolean>(false);
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    // Initial song selection
    useEffect(() => {
        if (querySongId && playlist) {
            setSongNum(playlist?.getIndex(querySongId));
            console.log(playlist?.getIndex(querySongId))
        }
    }, [querySongId, playlist])

    // Fetch playlists. Only call on when new query is made
    useEffect(() => {
        if (typeof queryPlaylistId !== typeof null) {
            setPlaylistId(Number(queryPlaylistId));

            const data = {
                userId: userId,
                playlistId: Number(queryPlaylistId)
            }

            fetch("/api/playlist/getAllLayers", {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
                    const newPlaylist = convertJsonToPlaylist(data.data);
                    
                    newPlaylist.setMode(Number(mode));

                    setPlaylist(newPlaylist);

                    if (!querySongId) {
                        setSongNum(0);
                    }

                }).catch((error) => {
                    console.log(error);
                    return [];
                })
        }
    }, [userId, queryPlaylistId, mode, querySongId]);

    // Waits for fetch playlist effect to complete before setting the playlist
    useEffect(() => {
        console.log(songNum);

        if (playlist instanceof Playlist && playlist.idList) {
            if ((0 <= songNum) && (songNum < playlist.idList.length)) {
                setSelectedSongId(playlist?.idList[songNum]);
                console.log(playlist?.idList[songNum]);
            }
        }
    }, [songNum, playlist])

    // Play next on end
    useEffect(() => {
        if (songEnded) {
            setSongNum(songNum + 1);
            setSongEnded(false);
        }
    }, [songEnded, songNum])

    // Handle shuffle 
    useEffect(() => {
        if (isShuffling && playlist) {
            const shuffledPlaylist = Object.assign( {}, playlist);
            Object.setPrototypeOf( shuffledPlaylist, Playlist.prototype );

            shuffledPlaylist.shuffleUnconditional();
            shuffledPlaylist.updateGlobalPosition();
            shuffledPlaylist.flattenId();

            setPlaylist(shuffledPlaylist);
            setSongNum(0);
            setIsShuffling(false);
        }
    }, [isShuffling, playlist])

    return (
        <div className="flex flex-col bg-slate-800 w-96 h-[93vh]">
            {!userId ?
                <p className="p-5">User is not logged in</p>
            :
            <SidebarContext.Provider value={{playlist, playlistId, selectedSongId, songNum, songPaused, setSongNum, setPlaylist, setSongEnded, setSelectedSongId, setSongPaused, setIsShuffling}}>
                <SongDisplay selectedSongId={selectedSongId}/>
                <PlayerControls/>
                <SidebarPlaylist/>
            </SidebarContext.Provider>
            }
        </div>
    )
}