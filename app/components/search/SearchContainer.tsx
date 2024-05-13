'use client'
import { createContext, useEffect, useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar";
import { Song } from "../../lib/song";
import { Playlist } from "@/app/lib/playlist";
import { list } from "postcss";
import { convertJsonToPlaylist, convertJsonToPlaylistSingle } from "@/app/lib/convert";

interface Props {
    userId: number | undefined
}

export const SearchContext = createContext();

export default function SearchContainer({userId} : Props) {
    const [results, setResults] = useState<Song[]>([]);
    const [playlistId, setPlaylistsId] = useState<number | null>(null);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        if (typeof playlistId === typeof "number") {
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

                for (const item of resJson.data.elements.playlistList) {
                    const playlist = convertJsonToPlaylistSingle(item)

                    lists.push(playlist);
                }

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
        <SearchContext.Provider value={{userId, playlists}}>
            <SearchBar onQuery={setResults}/>
            <SearchResults results={results}/>
        </SearchContext.Provider>
    )
}