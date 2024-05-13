'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ShuffleButton({playlistId} : 
    {playlistId: string}
) {
    return (
        <Link href={`${usePathname()}?playlistId=${playlistId}`}>
            <Image className="z-0 absolute" src="/shuffle-button.svg" width={24} height={24} alt="Shuffle" title="Shuffle with priority and lock settings"/>
            <Image className="z-10 " src="/star-gray.svg" width={24} height={24} alt=""/>
        </Link>
    )


}