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
    const [ results, setResults ] = useState<Song[]>([]);
    const [ pageNum, setPageNum ] = useState<number>(0);
    const [ token, setToken ] = useState<string>("");

    const [ playlistId, setPlaylistsId] = useState<number | null>(1);
    const [ playlists, setPlaylists] = useState<Playlist[]>([]);
    

    useEffect(() => {
        // Sub playlists
        const data = {
            userId: userId,
        }
        let url = ""

        if (typeof playlistId == "number") {
            Object.assign(data, {playlistId: playlistId});
            url = "/api/playlist/get"
        } else { // Root playlist
            Object.assign(data, {rank: 0});
            url = "/api/playlist/getRank";
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((json) => {
            let lists = []

            for (const item of convertJsonToPlaylistSingle(json.data).elements) {
                if (item instanceof Playlist) {
                    lists.push(item)
                }
            }

            setPlaylists(lists);
        })
        .catch(error => {
            console.log(error)
        })
    }, [playlistId, userId]);

    useEffect(() => {



    }, [pageNum])

    
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