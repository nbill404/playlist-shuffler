import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

interface Props {
    index: number
    setSwapIndexes: Dispatch<SetStateAction<[number, number]>>
}

export default function UpArrow({index, setSwapIndexes} : Props) {
    const handleClick = () => {
        setSwapIndexes([index - 1, index])
    }

    return (
        <button className="hover:bg-sky-800"onClick={handleClick}>
            <Image src="/up-arrow.svg" width="30" height="30" alt=""></Image>
        </button>
    )

}