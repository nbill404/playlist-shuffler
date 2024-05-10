'use client'
import Image from "next/image";
import { GridContext } from "./PlaylistGrid";
import { useContext } from "react";
import { Playlist } from "@/app/lib/playlist";

interface Props {
    playlist: Playlist
}

export default function PlaylistDropdownMenu({playlist}: Props) {
    const context = useContext(GridContext);

    const {userId} = context;
    const {lists} = context;
    const {setPlaylists} = context;

    const handleRemove = async () => {
        try {
            const response = await fetch("/api/playlist/remove", {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    playlist: playlist
                })
            })

            if (response.ok) {
                const newLists = lists.filter((e: Playlist, i: number) => e !== playlist)
                setPlaylists(newLists);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dropdown">
            <Image 
                role="button"
                tabIndex={0}
                src="/dropdown.svg" 
                width={48} 
                height={48} 
                alt=""
                >
            </Image>
            <ul className="dropdown-content menu bg-gray-700 w-32" tabIndex={0}>
                <li><button onClick={handleRemove}>Remove</button></li>
                <li><button>Rename</button></li>
            </ul>
        </div>
    )




}