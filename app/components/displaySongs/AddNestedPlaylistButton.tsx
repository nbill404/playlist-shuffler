import { Playlist } from "@/app/lib/playlist";

export default function AddNestedPlaylistButton({userId, playlistId} : {
    userId: Number | undefined
    playlistId: string
}) {

    const handleSubmit = async (formData: FormData) => {
        'use server'
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
                parentPlaylistId: playlistId
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