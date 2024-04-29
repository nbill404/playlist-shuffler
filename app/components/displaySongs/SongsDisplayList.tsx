'use client'
import { useEffect, useState } from "react"
import MusicListElement from "./MusicListElement"
import { Song } from "@/app/types/song"
import { useParams } from "next/navigation"

interface Props {
    userId: string | undefined
}

export default function SongsDisplayList({userId}: Props) {
    const [songs, setSongs] = useState([]);
    const { playlistId } = useParams()

    // Fetch song data
    useEffect(() => {
        const data = {
            userId: userId,
            playlistId: playlistId

        }

        fetch("/api/song/get", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                let songs = [];

                for (const item of data.data) {                   
                    songs.push(item)
                }

                setSongs(songs)
            })



    }, [userId, playlistId]);

    return (
        <div>
            {songs && songs.map((song : Song, index: number) =>
                <MusicListElement key={`song-${index}`} song={song} num={index}/>
            )}
        </div>
    )


}