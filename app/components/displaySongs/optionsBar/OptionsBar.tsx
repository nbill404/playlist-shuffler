import { Playlist } from "@/app/lib/playlist"
import ShuffleButton from "./ShuffleButton"
import ShuffleToggle from "./ShuffleToggle"
import Image from "next/image"
import ShuffleUnconditionalButton from "./ShuffleUnconditionalButton"
import PlayButton from "./PlayButton"
import ShuffleFlattenButton from "./ShuffleFlattenButton"


interface Props {
    userId: number,
    playlist: Playlist
}

export default function OptionsBar({userId, playlist} : Props) {

    return (
        <div className="flex gap-2 bg-slate-700 w-auto h-12 items-center px-2 rounded">
            <PlayButton playlistId={playlist.id + ""}/>
            <ShuffleUnconditionalButton playlistId={playlist?.id + ""}/>
            <ShuffleButton playlistId={playlist.id + ""}/>
            <ShuffleFlattenButton playlistId={playlist?.id + ""}/>
            <ShuffleToggle userId={userId} playlistDetails={playlist}/>
        </div>
    )


}