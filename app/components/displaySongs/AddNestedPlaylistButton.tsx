'use client'
import { Playlist } from "@/app/lib/playlist";
import { Dispatch, SetStateAction } from "react";

export default function AddNestedPlaylistButton({userId, playlist, setPlaylist} : {
    userId: number
    playlist: Playlist
    setPlaylist: Dispatch<SetStateAction<Playlist | null>>
}) {

    const handleSubmit = async (formData: FormData) => {
        try {
            if (typeof userId === typeof undefined) {
                throw Error("User is not logged in");
            }

            const name = formData.get("name");

            if (name == "") {
                throw Error("Please enter a name");
            }

            const user = {id: userId}
            const newElement = new Playlist(0, name);
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
            }
        }
        catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <form className="flex gap-3" action={handleSubmit}>
                <input className="input" name="name" placeholder="Playlist Name"></input>
                <button className="btn btn-primary" role="submit">Add a new playlist</button>
            </form>
        </div>
    )


}