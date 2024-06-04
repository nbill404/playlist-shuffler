'use client'
import Image from "next/image";
import { FormEvent, useContext, useState } from "react";
import { Playlist } from "@/app/lib/playlist";
import { GridContext } from "@/app/contexts/gridContext";

interface Props {
    playlist: Playlist
}

export default function PlaylistDropdownMenu({playlist} : Props) {
    const context = useContext(GridContext);

    const userId = context?.userId;
    const lists = context?.lists;
    const setPlaylists = context?.setPlaylists;
    const [renameActive, setRenameActive] = useState(false);

    const handleRemove = async () => {
        try {
            if (lists && setPlaylists){

            const response = await fetch("/api/playlist/removeAllLayers", {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    playlistId: playlist.id
                })
            })

            if (response.ok) {
                const newLists = lists.filter((e: Playlist, i: number) => e !== playlist)
                setPlaylists(newLists);
            }
        }

        } catch (error) {
            console.log(error);
        }
    }

    const handleRename = () => {
        setRenameActive(!renameActive);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const newName = formData.get("renameField")?.toString();

        if (newName) {
            const data = {
                userId : userId,
                playlistId : playlist.id,
                values : {
                    name : newName
                }
            }

            fetch("/api/playlist/update", {
                method: "POST",
                body: JSON.stringify(data)
            }).catch(error => console.log(error));

            playlist.name = newName;
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
            <ul className="dropdown-content menu bg-gray-700 flex flex-col" tabIndex={0}>
                <li><button onClick={handleRemove}>Remove</button></li>
                <li><button onClick={handleRename}>Rename</button></li>
                {renameActive && 
                    <li>
                        <form onSubmit={handleSubmit}>
                            <input className="input input-sm" name="renameField"></input>
                        </form>
                    </li>
                }
            </ul>
        </div>
    )




}