'use client'
import Image from "next/image";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { shuffle } from "@/app/lib/shuffle";

export default function PlayerControls() {
    const { songNum } = useContext(SidebarContext);
    const { setSongNum } = useContext(SidebarContext);
    const { setSongPaused } = useContext(SidebarContext);
    const { playlist } = useContext(SidebarContext);
    const { songPaused } = useContext(SidebarContext);
    const { setIsShuffling } = useContext(SidebarContext);

    const handleBack = () => {
        if (songNum > 0) {
            setSongNum(songNum - 1);
        }
    }

    const handlePause = () => {
        setSongPaused(!songPaused)

        console.log(songPaused)
    }

    const handleForward = () => {
        if (songNum < playlist.idList.length - 1) {
            setSongNum(songNum + 1);
        }
    }

    const handleShuffle = () => {
        setIsShuffling(true);
    }

    return (
        <div className="grid grid-cols-4 bg-gray-900 h-12 p-2">
            <button onClick={handleBack}>
                <Image src="/back-button.svg" width="32" height="32" alt=""></Image>
            </button>

            <button onClick={handlePause}>
                <Image src="/play-button.svg" width="32" height="32" alt=""></Image>
            </button>

            <button onClick={handleForward}>
                <Image src="/forward-button.svg" width="32" height="32" alt=""></Image>
            </button>

            <button onClick={handleShuffle}>
                <Image src="/shuffle-button.svg" width="32" height="32" alt=""></Image>
            </button>
        </div>
    );
}