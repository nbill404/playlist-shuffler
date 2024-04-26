import { Playlist } from "@/app/types/playlist";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function PlaylistAdd({id}) {
    const handleClick = async (formData: FormData) => {
        'use server'
        
        try {
            if (typeof id === typeof undefined) {
                throw Error("User is not logged in");
            }
            

            const name = formData.get("name");
            const user = {id: id}
            const {elements, ...playlist} = new Playlist(0, "Playlist #2") // Extract elements

            if (name == "") {
                throw Error("Please enter a name");
            } else {
                playlist.name = name;
            }

            

            const data = {
                user: user,
                playlist: playlist,
            }

            const response = await fetch(process.env.URL + '/api/playlist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Success")
            }

        } catch (error) {
            console.log(error)
        } finally {
            // Calling redirect inside try-catch block will throw error
            redirect(process.env.URL + "/playlists");
        }
    }


    return (
        <div>
            <form className="flex flex-col gap-1 justify-center"action={handleClick}>
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