'use client'
import { Playlist } from "@/app/lib/playlist";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function AddNestedPlaylistButton({userId, playlist, setPlaylist} : {
    userId: number
    playlist: Playlist
    setPlaylist: Dispatch<SetStateAction<Playlist | null>>
}) {
    const [added, setAdded] = useState(false);
    const [timer, setTimer] = useState(1000);

    const handleSubmit = async (formData: FormData) => {
        try {
            if (typeof userId === typeof undefined) {
                throw Error("User is not logged in");
            }

            const name = formData.get("name")?.toString();

            if (name) {
                const user = {id: userId}
                const newElement = new Playlist();
                newElement.name = name.toString();

                const {elements, ...details} = newElement; // Extract elements

                const data = {
                    user: user,
                    playlist: details,
                    parentPlaylistId: playlist.id
                }

                const response = await fetch('/api/playlist/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });


                if (response.ok) {
                    const json = await response.json();
                    newElement.position = json.data.position
                    newElement.rank = json.data.rank;
                    newElement.id = json.data.id;
                    
                    const newPlaylist = Object.assign( {}, playlist );
                    Object.setPrototypeOf( newPlaylist, Playlist.prototype );
                    newPlaylist.push(newElement);

                    setPlaylist(newPlaylist);
                    setAdded(true);
                    setTimer(20000);
                }
        }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        } else {
            setAdded(false);
        }
    }, [added, timer])


    return (
        <div>
            <form className="flex gap-3" action={handleSubmit}>
                <input className="input" name="name" placeholder="Playlist Name" disabled={playlist.rank >= 9}></input>
                <button className="btn btn-primary" role="submit" disabled={playlist.rank >= 9}>Add a new playlist</button>
            </form>
            {added && 
                <div className="toast duration-1000">
                    <div className="alert alert-info">    
                    Adding Successful
                    </div>
                </div>}

        </div>
    )


}