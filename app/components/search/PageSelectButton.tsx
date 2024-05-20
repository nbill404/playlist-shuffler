'use client'

import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

interface Props {
    nextPage: boolean
    pageNum: number
    setPageNum: Dispatch<SetStateAction<number>>
}

export default function PageSelectButton({pageNum, nextPage, setPageNum} : Props) {
    const handleClick = () => {
        setPageNum(nextPage ? pageNum + 1 : pageNum - 1);
    }

    return (
        <button className="w-12 h-12 rounded btn btn-primary hover:bg-blue-200 flex items-center justify-center" onClick={handleClick} disabled={pageNum <= 0 && !nextPage}>
            {nextPage 
                ? <Image src="/right-arrow.svg" width="12" height="12" alt=""></Image>
                : <Image src="/left-arrow.svg" width="12" height="12" alt=""></Image>
            }
        </button>
    )

}