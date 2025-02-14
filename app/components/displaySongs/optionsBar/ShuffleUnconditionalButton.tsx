'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ShuffleUnconditionalButton({ playlistId }: {playlistId : string}) {

    return (
        <Link href={`${usePathname()}?playlist=${playlistId}&mode=1`}>
            <Image src="/shuffle-button.svg" width={24} height={24} alt="Shuffle" title="Shuffle all unconditionally"/>
        </Link>

    )


}


