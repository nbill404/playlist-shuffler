import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import { Dispatch, SetStateAction } from "react";

interface Props {
    index: number
    setSwapIndexes: Dispatch<SetStateAction<[number, number] | null>>
}

export default function RearrangeArrows({index, setSwapIndexes} : Props) {

    return (
        <div className="flex flex-col justify-center items-center">
            <UpArrow index={index} setSwapIndexes={setSwapIndexes}/>
            <DownArrow index={index} setSwapIndexes={setSwapIndexes}/>
        </div>

    )


}