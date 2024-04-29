'use client'
import { Playlist } from "@/app/types/playlist"
import { useContext } from "react";
import { SearchContext } from "../search/SearchContainer";
import { Song } from "@/app/types/song";

interface Props {
    playlist: Playlist
    song: Song
}


export default function AddToPlaylistButton({playlist, song} : Props) {
    const { userId } = useContext(SearchContext);

    const handleAdd = async () => {
        try {
            const data = {
                userId: userId,
                playlist: playlist,
                song: song
            }

            const response = await fetch("/api/song/add", {
                method: "POST",
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("success")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (<button className="text-xl rounded w-48 hover:bg-sky-600" onClick={handleAdd}>{playlist.name}</button>)
}