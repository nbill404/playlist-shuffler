'use client'
import { Playlist } from "@/app/lib/playlist"
import { Song } from "@/app/lib/song"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

interface Props {
    userId: number
    element: Playlist | Song
    playlist: Playlist | null
    setPlaylist: Dispatch<SetStateAction<Playlist | null>>
}



export default function RemoveElementButton({userId, element, playlist, setPlaylist} : Props) {

    const updatePosition = (playlist: Playlist) => {

        for (let i = 0; i < playlist.elements.length; i++) {
            let url = "";
            const element = playlist.elements[i];
            const data = {
                userId: userId
            };

            

            if (element instanceof Song) {
                url = "/api/song/update";
                Object.assign(data, {songId: element.id});
            } else if (element instanceof Playlist) {
                url = "/api/playlist/update";
                Object.assign(data, {playlistId: element.id});
            }

            Object.assign(data, {values: {
                position: i
            }})

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            }).catch(error => console.log(error))


        }
    }


    const handleClick = () => {
        if (element instanceof Song) {
            const data = {
                userId: userId,
                songId: element.id
            }

            fetch("/api/song/remove/", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(() => {
                // Update positions
                const newPlaylist = Object.assign( {}, playlist );
                Object.setPrototypeOf( newPlaylist, Playlist.prototype );

                newPlaylist.remove(element.id);
                updatePosition(newPlaylist);
                
                setPlaylist(newPlaylist)
            }).catch(error => console.log(error))


        } else if (element instanceof Playlist) {
            const data = {
                userId: userId,
                songId: element.id
            }

            fetch("/api/playlist/remove/", {
                method: "POST",
                body: JSON.stringify(data)
            }).then(() => {
                // Update positions



            }).catch(error => console.log(error))

        }
    }

    return (
        <button onClick={handleClick}>
            <Image className="hover:bg-sky-800" src="/cross.svg" width="64" height="64" alt=""/>
        </button>
    )


}