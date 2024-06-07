'use client'
import { Playlist } from "@/app/lib/playlist";
import { Song } from "@/app/lib/song";
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
    userId: number
    element: Playlist | Song
    playlistId: number
}


export default function PriorityButton({userId, element, playlistId} : Props) {
    const [isPressed, setIsPressed] = useState(element.starred);

    useEffect(() => {
        if (element) {
            let url = "";
            const data = {
                userId: userId,
                values : {
                    starred: isPressed
                }
            }

            if (element instanceof Song) {
                url = "/api/song/update";
                Object.assign(data, {
                    songId: element.id,
                    playlistId: playlistId
                });
            } else if (element instanceof Playlist) {
                url = "/api/playlist/update";
                Object.assign(data, {playlistId: element.id});
            }

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            }).catch((error) => console.log(error))

            element.starred = isPressed;
        }
    }, [isPressed, element, userId, playlistId])


    const handleClick = () => {
        setIsPressed(!isPressed);
    }

    return (
        <button  onClick={handleClick}>
            {isPressed 
                ? <Image className="hover:bg-sky-800" src="/star-gold.svg" width="64" height="64" alt=""/>
                : <Image className="hover:bg-sky-800" src="/star.svg" width="64" height="64" alt=""/>
            }
        </button>
    )

}