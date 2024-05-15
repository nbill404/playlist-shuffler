'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlayButton({ playlistId }: {playlistId : string}) {

    return (
        <Link href={`${usePathname()}?playlist=${playlistId}&mode=0`}>
            <Image src="/play-button.svg" width="28" height="28" alt="Play"/>
        </Link>

    );
}