'use client'
import Image from "next/image";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { shuffle } from "@/app/lib/shuffle";

export default function PlayerControls() {
    const { setSongNum } = useContext(SidebarContext);
    const { setPlaylist } = useContext(SidebarContext);
    const { playlist } = useContext(SidebarContext);

    const handleClick = () => {
        let newPlaylist = shuffle(playlist);

        setPlaylist(newPlaylist);
        setSongNum(0);
    }
    return (
        <div className="grid grid-cols-5 bg-gray-900 h-12 p-2">
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