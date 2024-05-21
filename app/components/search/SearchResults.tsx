'use client'
import { Dispatch, SetStateAction, useContext } from "react";
import { Song } from "../../lib/song";
import MusicListElement from "../listViewElements/SongListViewElement";
import SelectPlaylistDropdown from "./SelectPlaylistDropdown";
import { SearchContext } from "./SearchContainer";

interface Props {
    results: Song[]
    selectedEntry: number
    setSelectedEntry: Dispatch<SetStateAction<number>>
}

export default function SearchResults({results, selectedEntry, setSelectedEntry}: Props) {
    const { playlistId } = useContext(SearchContext);

    return (
        <div className="flex flex-col gap-2 max-h-[70vh] m-3 p-5 overflow-auto">
            {results && results.map((result: Song, index: number) => 
                <div className={`menu dropdown ${selectedEntry == index && "dropdown-open"}`} key={`menu-${index}`}>
                    <div role="button" tabIndex={0} onClick={() => setSelectedEntry(index)}>
                        <MusicListElement key={`Song${index}`} song={result} num={index}/>
                    </div>
                    <ul className="dropdown-content bg-sky-800" tabIndex={0}>
                        <SelectPlaylistDropdown song={result}/>  
                    </ul>
                </div>
            )}
        </div>
    );
}

