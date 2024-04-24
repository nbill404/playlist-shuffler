import Image from "next/image"
import { Song } from "../types/song"

interface Props {
    song: Song    
}


export default function MusicListElement({song} : Props) {
    return (
        <div className="flex flex-row gap-5">
            <Image src={song.details.thumbnail} width={200} height={200} alt=""/>
            <p className="text-xl font-semibold">{song.details.title}</p>
        </div>
    )

}