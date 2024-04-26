import { Playlist } from "@/app/types/playlist";
import Image from "next/image";

export default function PlaylistAdd({id}) {
    const handleClick = async (userId: string) => {
        'use server'
        
        try {
            const user = {id: userId}
            const {elements, ...playlist} = new Playlist(0, "Playlist #2") // Extract elements

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
                console.log("success");
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form>
                <div className="flex w-32 h-32  bg-slate-800 justify-center items-center">
                        <Image src="/plus.svg" width={72} height={72} alt="Create Playlist"/>
                        <button/>
                </div>
            </form>
            <div>Create Playlist {id }</div>
        </div>
    );
}