'use client'
import { Song } from "../types/song";
import MusicListElement from "./MusicListElement";

interface Props {
    results?: Song[]
}

export default function SearchResults({results}: Props) {
    return (
        <div className="flex flex-col flex-nowrap gap-3 m-3 p-5 overflow-auto">
            <button onClick={() => console.log(results)}>Click</button>
            {results && results.map((result, index) => <MusicListElement key={`Song${index}`} video={result}/>)}
        </div>
    );
}

