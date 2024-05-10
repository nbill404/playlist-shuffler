import ShuffleButton from "./ShuffleButton"
import ShuffleToggle from "./ShuffleToggle"


interface Props {
    userId: number | undefined,
    playlistId: string
}

export default function OptionsBar({userId, playlistId} : Props) {

    return (
        <div className="flex gap-2 bg-slate-700 w-auto h-12 items-center px-2 rounded">
            <ShuffleButton playlistId={playlistId}/>
            <ShuffleToggle userId={userId} playlistId={playlistId}/>
        </div>
    )


}