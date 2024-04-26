'use client'
import Image from "next/image";

interface Props {
    userId: number
    playlist: {
        name: string
        id: number
    },
}

export default function PlaylistDropdownMenu({userId, playlist}: Props) {
    const handleRemove = async () => {
        try {
            const response = await fetch("/api/playlist/remove", {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    playlist: playlist
                })
            })

            if (response.ok) {
                //
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="dropdown">
            <Image 
                role="button"
                tabIndex={0}
                src="/dropdown.svg" 
                width={48} 
                height={48} 
                alt=""
                >
            </Image>
            <ul className="dropdown-content menu bg-gray-700 w-32" tabIndex={0}>
                <li><button onClick={handleRemove}>Remove</button></li>
                <li><button>Rename</button></li>
            </ul>
        </div>





    )




}