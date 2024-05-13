import { Dispatch, SetStateAction } from "react"
import RearrangeArrows from "./RearrangeArrows"
import RemoveElementButton from "./RemoveElementButton"
import PriorityButton from "./PriorityButton"
import PlayElementButton from "./PlayElementButton"


interface Props {
    index: number
    setSwapIndexes: Dispatch<SetStateAction<[number, number] | null>>
}


export default function ElementOptions({index, setSwapIndexes} : Props) {


    return (
    <div className="grid grid-cols-4 gap-2">
        <PlayElementButton/>
        <PriorityButton/>
        <RearrangeArrows index={index} setSwapIndexes={setSwapIndexes}/>
        <RemoveElementButton/>
    </div>)



}