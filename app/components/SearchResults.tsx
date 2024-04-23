'use client'
import { useState } from "react";
import data from "./test.json";
import { Song } from "../types/song";
import MusicListElement from "./MusicListElement";


export default function SearchResults() {
    const [songs, setSongs] = useState<Song[]>([]);

    const convertToList = () => {
        const songList: Song[] = [];

        for (const item of data) {
            if (item.id.videoId) {
                const details = {
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url
                }
                const song: Song = new Song(item.id.videoId, "Youtube", details);
                
                songList.push(song);
            }
        }

        setSongs(songList);
    }
    
    return (
        <div className="flex flex-col flex-nowrap gap-3 m-3 p-5 overflow-auto">
            <button className="btn btn-primary w-24" onClick={convertToList}>Load</button>
            {songs.map((s, i) => <MusicListElement key={`Song${i}`} video={s}/>)}
        </div>
    );
}

