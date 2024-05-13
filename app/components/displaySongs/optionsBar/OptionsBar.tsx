import { Playlist } from "@/app/lib/playlist"
import ShuffleButton from "./ShuffleButton"
import ShuffleToggle from "./ShuffleToggle"
import Image from "next/image"
import ShuffleUnconditionalButton from "./ShuffleUnconditionalButton"


interface Props {
    userId: number | undefined,
    playlistDetails : Playlist
}

export default function OptionsBar({userId, playlistDetails} : Props) {

    return (
        <div className="flex gap-2 bg-slate-700 w-auto h-12 items-center px-2 rounded">
            <button>
                <Image src="/play-button.svg" width="28" height="28" alt="Play"/>
            </button>
            <ShuffleUnconditionalButton/>
            <ShuffleButton playlistId={playlistDetails?.id + ""}/>
            <ShuffleToggle userId={userId} playlistDetails={playlistDetails}/>
        </div>
    )


}