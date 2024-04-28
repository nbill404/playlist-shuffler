'use client'
import { createContext, useContext } from "react";
import { Song } from "../../types/song";
import MusicListElement from "./MusicListElement";
import SelectPlaylistDropdown from "./SelectPlaylistDropdown";
import { SearchContext } from "./SearchContainer";

interface Props {
    results?: Song[]
}


export default function SearchResults({results}: Props) {
    return (
        <div className="flex flex-col gap-2 max-h-[75vh] m-3 p-5 overflow-auto">
            {results && results.map((result: Song, index: number) => 
                <div className="menu dropdown" key={`menu-${index}`}>
                    <div role="button" tabIndex={0}>
                        <MusicListElement key={`Song${index}`} song={result} num={index}/>
                    </div>
            
                    <SelectPlaylistDropdown song={result}/>  
                </div>
            )}
        </div>
    );
}

