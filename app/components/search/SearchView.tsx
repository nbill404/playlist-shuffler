'use client'
import { useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar";
import { Song } from "../../types/song";

export default function SearchView() {
    const [results, setResults] = useState<Song[]>([]);

    return (
      <div className="p-5 flex flex-1 bg-gray-700">
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
          <SearchBar onQuery={setResults}/>
          <SearchResults results={results}/>
        </div>
      </div>

    )
}