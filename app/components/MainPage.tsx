'use client'
import { useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./navbar/SearchBar";
import { Song } from "../types/song";

export default function MainPage() {
    const [results, setResults] = useState<Song[]>([]);
    const playlists = ["Playlist #1" , "Playlist #2", "Playlist #3", "Playlist #4", "Playlist #5", "1", "2", "3", "4", "5", "6"]; 

    return (
      <div className="p-5 flex flex-1 bg-gray-700 border">
        <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
          <div className="">
            <p>This is a website for advanced shuffling options for your playlists</p>
          </div>
          <div className="divider divider-primary"></div>
            <SearchBar onQuery={setResults}/>
            <SearchResults results={results}/>
          </div>
      </div>

    )
}