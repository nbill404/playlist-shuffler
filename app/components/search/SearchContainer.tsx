'use client'
import { useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar";
import { Song } from "../../types/song";



export default function SearchContainer() {
    const [results, setResults] = useState<Song[]>([]);

    return (
        <>
            <SearchBar onQuery={setResults}/>
            <SearchResults results={results}/>
        </>
    )
}