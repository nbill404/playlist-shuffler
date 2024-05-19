'use client'
import { createContext, useEffect, useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar";
import { Song } from "../../lib/song";
import { Playlist } from "@/app/lib/playlist";
import { convertJsonToPlaylistSingle } from "@/app/lib/convert";
import SearchIdBar from "./SearchIdBar";

interface Props {
    userId: number | undefined
}

export const SearchContext = createContext();

export default function SearchContainer({userId} : Props) {
    const [results, setResults] = useState<Song[]>([]);
    const [playlistId, setPlaylistsId] = useState<number | null>(null);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        console.log("Outside", playlistId, typeof playlistId)
        if (typeof playlistId == "number") {
            console.log("Inside", playlistId)

            const data = {
                userId: userId,
                playlistId: playlistId
            }
            
            fetch("/api/playlist/get", {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((resJson) => {
                let lists = []

                for (const item of convertJsonToPlaylistSingle(resJson.data).elements) {
                    if (item instanceof Playlist) {
                        lists.push(item)
                    }
                }

                console.log(lists)

                setPlaylists(lists);
            })
            .catch(error => {
                console.log(error)
            })

        } else {
            const data = {
                userId: userId,
                rank: 0
            }

            fetch("/api/playlist/getAllRank", {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((resJson) => {
                let lists = []


                for (const item of resJson.data) {
                    const playlist = convertJsonToPlaylistSingle(item)

                    lists.push(playlist);
                }
                

                setPlaylists(lists);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }, [playlistId, userId]);
    
    return (
        <SearchContext.Provider value={{userId, playlistId, playlists, setPlaylistsId}}>
            <div className="flex gap-2">
                <SearchBar setResults={setResults}/>
                <SearchIdBar setResults={setResults}/>
            </div>
            <SearchResults results={results}/>
        </SearchContext.Provider>
    )
}