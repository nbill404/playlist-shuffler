'use client'

interface Props {
    playlist: {
        name: string
        id: number
    },
}

export default function PlaylistGridElement({playlist} : Props) {


    return (
    <div>
        <div className="w-32 h-32 bg-slate-800"/>
        <div>{playlist.name}</div>
        
    </div>
    )


}