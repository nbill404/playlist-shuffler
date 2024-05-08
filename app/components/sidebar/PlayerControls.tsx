'use client'
import Image from "next/image";
import { useContext } from "react";
import Sidebar, { SidebarContext } from "./Sidebar";
import { shuffle } from "@/app/lib/shuffle";

export default function PlayerControls() {
    const { setSongNum } = useContext(SidebarContext);
    const { setPlaylist } = useContext(SidebarContext);
    const { playlist } = useContext(SidebarContext);

    const handleClick = () => {
        console.log("test")
        console.log(playlist)

        let newPlaylist = shuffle(playlist);
        console.log(newPlaylist)

        setPlaylist(newPlaylist);
        setSongNum(0);
    }


    return (
        <div className="grid grid-cols-4 bg-gray-900 h-12 p-2">
            <Image src="/back-button.svg" width="32" height="32" alt=""></Image>
            <Image src="/play-button.svg" width="32" height="32" alt=""></Image>
            <Image src="/forward-button.svg" width="32" height="32" alt=""></Image>
            <button onClick={handleClick}>
                <Image src="/shuffle-button.svg" width="32" height="32" alt=""></Image>
            </button>
            <p className="text-sm">0:00 / 4:20</p>

        </div>
    );
}