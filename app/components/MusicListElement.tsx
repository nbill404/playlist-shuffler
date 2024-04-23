import Image from "next/image"
import { Song } from "../types/song"


export default function MusicListElement({video}) {
    return (
        <div className="flex flex-row gap-5">
            <Image src={video.details.thumbnail} width={200} height={200} alt=""/>
            <p className="text-xl font-semibold">{video.details.title}</p>
        </div>
    )

}