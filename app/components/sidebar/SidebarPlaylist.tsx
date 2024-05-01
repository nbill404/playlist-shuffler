'use client'

export default function SidebarPlaylist({playlist}) {
    return (
        <ul className="menu p-4 bg-base-200 text-base-content">
            {playlist && playlist.map((song, index : number) => 
                <li key={`${index}`}>{song.title}</li>
            )}
            <li className="rounded hover:bg-base-100">Sidebar Item 3</li>
        </ul>
    )
}