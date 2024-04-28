'use client'
import { Playlist } from "@/app/types/playlist";
import Image from "next/image";
import { useContext } from "react";
import { GridContext } from "./PlaylistGrid";


export default function PlaylistAdd() {
    const {userId} = useContext(GridContext)
    const {lists} = useContext(GridContext);
    const {setPlaylists} = useContext(GridContext)

    const handleClick = async (formData: FormData) => {
        try {
            if (typeof userId === typeof undefined) {
                throw Error("User is not logged in");
            }

            const name = formData.get("name");

            if (name == "") {
                throw Error("Please enter a name");
            }

            const user = {id: userId}
            const {elements, ...playlist} = new Playlist(0, name); // Extract elements

            const data = {
                user: user,
                playlist: playlist,
            }

            const response = await fetch('/api/playlist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const data = await response.json();

                const newPlaylist = {
                    id: data.data.id,
                    name: name
                }

                const newPlaylists = [...lists, newPlaylist]
                setPlaylists(newPlaylists);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-1 justify-center" action={handleClick}>
                <button type="submit" className="w-32">
                    <div className="flex w-32 h-32  bg-slate-800 justify-center items-center">
                            <Image src="/plus.svg" width={72} height={72} alt="Create Playlist"/>
                    </div>
                </button>
                <input className="w-32 rounded" type="text" name="name" placeholder="Create playlist"></input>
            </form>
        </div>
    );
}