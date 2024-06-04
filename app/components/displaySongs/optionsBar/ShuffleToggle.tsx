'use client'

import { Playlist } from "@/app/lib/playlist";
import { ChangeEvent, ChangeEventHandler } from "react";

export default function ShuffleToggle({userId, playlistDetails} : {
    userId : number
    playlistDetails : Playlist
}) {

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const data = {
            userId: userId,
            playlistId: playlistDetails.id,
            values: {
                canShuffle: event.currentTarget.checked
            }
        }

        fetch("/api/playlist/update", {
                method: "POST",
                body: JSON.stringify(data)
        }).then((response) => response)
        .catch((error) => error)
    }

    return (
        <input className="toggle toggle-primary" type="checkbox" defaultChecked={playlistDetails.canShuffle} onChange={handleChange}></input>
    )


}