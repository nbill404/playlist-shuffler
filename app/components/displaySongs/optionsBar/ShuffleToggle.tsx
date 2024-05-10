'use client'

import { ChangeEventHandler, FormEvent } from "react";

export default function ShuffleToggle({userId, playlistId}) {

    const handleChange = (e : ChangeEventHandler<HTMLInputElement>) => {
        const data = {
            userId: userId,
            playlistId: playlistId,
            values: {
                canShuffle: e.currentTarget.checked
            }
        }

        fetch("/api/playlist/update", {
                method: "POST",
                body: JSON.stringify(data)
        }).then((response) => response)
        .catch((error) => error)
    }

    return (
        <input className="toggle" type="checkbox" onChange={handleChange}></input>
    )


}