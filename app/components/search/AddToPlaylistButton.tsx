'use client'
import { Playlist } from "@/app/lib/playlist"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { SearchContext } from "./SearchContainer";
import { Song } from "@/app/lib/song";
import Image from "next/image";

interface Props {
    playlist: Playlist
    song: Song
    setAddSuccessTimer: Dispatch<SetStateAction<number>>
}


export default function AddToPlaylistButton({playlist, song, setAddSuccessTimer} : Props) {
    const { userId } = useContext(SearchContext);

    const handleAdd = () => {
        const data = {
            userId: userId,
            playlist: playlist,
            song: song
        }

        fetch("/api/song/add", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(() => {
            setAddSuccessTimer(10000);
        })
        .catch(error =>  console.log(error))
    }

    return (
        <button className="w-48 text-xl text-left rounded hover:bg-sky-600 ps-1" onClick={handleAdd}>
                {playlist.name}
        </button>
    )
}