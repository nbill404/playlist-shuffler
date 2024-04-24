'use client'
import { Song } from "../../types/song";
import MusicListElement from "./MusicListElement";

interface Props {
    results?: Song[]
}

export default function SearchResults({results}: Props) {
    return (
        <div className="flex flex-col gap-2 max-h-[75vh] m-3 p-5 overflow-auto">
            {results && results.map((result, index) => <MusicListElement key={`Song${index}`} song={result} num={index}/>)}
        </div>
    );
}

