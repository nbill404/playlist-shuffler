'use client'
import { useState } from "react";
import data from "./test.json";
import { Song } from "../types/song";
import Image from "next/image";


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

        console.log("test");
    }

    const display = (s: Song , i : number) => {
        return (
            <div key={`song${i}`}>
                <Image src={s.details.thumbnail} width={200} height={200} alt=""/>
                <a className={`title${i}`}>{s.details.title}</a>
            </div>
        )


    }
    
    return (
        <div className="flex flex-col">
            <button onClick={convertToList}>click</button>
            {songs.map((s, i) => display(s, i))}
        </div>
    );
}

