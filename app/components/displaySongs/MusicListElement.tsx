'use client'
import Image from "next/image"
import { Song } from "../../types/song"


interface Props {
    song: Song
    num: number
}

export default function MusicListElement({song, num} : Props) {
    return (
        <div className="flex flex-row gap-5 p-3 hover:bg-sky-800">
            <p className="text-xl text-bold flex items-center">{num + 1}</p>
            <Image src="/youtube.svg" width="20" height="10" alt=""/>
            <Image src={song.thumbnailUrl} width={200} height={200} alt=""/>
            <p className="text-xl font-semibold">{song.title}</p>
        </div>
    )

}