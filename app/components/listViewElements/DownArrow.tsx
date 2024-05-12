import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
    index: number
    setSwapIndexes: Dispatch<SetStateAction<[number, number]>>
}

export default function DownArrow({index, setSwapIndexes}: Props) {
    const handleClick = () => {
        setSwapIndexes([index, index + 1])
    }

    return (
        <button className="hover:bg-sky-800" onClick={handleClick}>
            <Image src="/down-arrow.svg" width="30" height="30" alt=""></Image>
        </button>
    )
}