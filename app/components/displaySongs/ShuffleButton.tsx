'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ShuffleButton({playlistId} : 
    {playlistId: string}
) {
    return (
        <Link href={`${usePathname()}?playlistId=${playlistId}`}>
            <Image src="/shuffle-button.svg" width={24} height={24} alt="Shuffle"/>
        </Link>
    )


}