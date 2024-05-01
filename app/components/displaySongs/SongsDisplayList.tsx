import MusicListElement from "./MusicListElement"
import { Song } from "@/app/types/song"

interface Props {
    userId: number | undefined
    songs: Song[]
}

export default function SongsDisplayList({userId, songs}: Props) {
    return (
        <div>
            {songs && songs.map((song : Song, index: number) =>
                <MusicListElement key={`song-${index}`} song={song} num={index}/>
            )}
        </div>
    )


}