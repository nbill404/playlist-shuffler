'use client'
import { createContext, useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar";
import { Song } from "../../lib/song";
import { Playlist } from "@/app/lib/playlist";

interface Props {
    userId: number | undefined
    playlists: Playlist[];
}

export const SearchContext = createContext();

export default function SearchContainer({userId, playlists} : Props) {
    const [results, setResults] = useState<Song[]>([]);
    
    return (
        <SearchContext.Provider value={{userId, playlists}}>
            <SearchBar onQuery={setResults}/>
            <SearchResults results={results}/>
        </SearchContext.Provider>
    )
}