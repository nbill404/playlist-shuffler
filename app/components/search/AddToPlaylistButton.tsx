'use client'
import { Playlist } from "@/app/lib/playlist"
import { useContext } from "react";
import { SearchContext } from "./SearchContainer";
import { Song } from "@/app/lib/song";
import Image from "next/image";

interface Props {
    playlist: Playlist
    song: Song
}


export default function AddToPlaylistButton({playlist, song} : Props) {
    const { userId } = useContext(SearchContext);
    const { setPlaylistsId } = useContext(SearchContext);

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

    const handleSelectSubPlaylist = () => {
        console.log(playlist.id)
        setPlaylistsId(Number(playlist.id));
    }


    return (
        <div className="grid-cols-8 w-48 text-xl rounded items-center">
            <button className="hover:bg-sky-600 col-span-7" onClick={handleAdd}>
                {playlist.name}
            </button>


            <button className="hover:bg-sky-600" onClick={handleSelectSubPlaylist}>
                <Image src="/right-arrow.svg" width="24" height="24" alt=""></Image>
            </button>
        </div>
    )
}