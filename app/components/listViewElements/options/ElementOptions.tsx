'use client'
import { Dispatch, SetStateAction } from "react"
import RearrangeArrows from "./RearrangeArrows"
import RemoveElementButton from "./RemoveElementButton"
import PriorityButton from "./PriorityButton"
import PlayElementButton from "./PlayElementButton"
import { Playlist } from "@/app/lib/playlist"
import { Song } from "@/app/lib/song"


interface Props {
    userId: number
    index: number
    playlist: Playlist
    element: Playlist | Song
    setPlaylist: Dispatch<SetStateAction<Playlist | null>>
    setSwapIndexes: Dispatch<SetStateAction<[number, number] | null>>
}


export default function ElementOptions({userId, index, playlist, element, setPlaylist, setSwapIndexes} : Props) {


    return (
    <div className="grid grid-cols-4 gap-2">
        <PlayElementButton/>
        <PriorityButton userId={userId} element={element}/>
        <RearrangeArrows index={index} setSwapIndexes={setSwapIndexes}/>
        <RemoveElementButton userId={userId} element={element} playlist={playlist} setPlaylist={setPlaylist} />
    </div>)



}