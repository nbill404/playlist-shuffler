'use client'
import { useContext, useEffect, useState } from "react";
import YouTubeEmbed from "../embedPlayers/YoutubeEmbed";
import { SidebarContext } from "./Sidebar";
import Image from "next/image";

interface Props {
    selectedSongId: string | null;
    nextVideoId: string | null;
}


export default function SongDisplay({selectedSongId, nextVideoId} : Props) {
    const { songPaused } = useContext(SidebarContext);
    const { setSongPaused } = useContext(SidebarContext);
    const { setSongEnded } = useContext(SidebarContext);

    const [player, setPlayer] = useState<JSX.Element>(<></>);

    useEffect(() => {
        if (selectedSongId) {
            setPlayer(
                <YouTubeEmbed videoId={selectedSongId} nextVideoId={nextVideoId} songPaused={songPaused} setSongEnded={setSongEnded} setSongPaused={setSongPaused}/>
            )

        } else {
            setPlayer(
            <div className="m-5 h-32 w-32 flex items-center justify-center">
                <Image src="/cd.svg" width="64" height="64" alt=""></Image>
            </div>
            );
        }

    }, [selectedSongId, nextVideoId, songPaused, setSongPaused, setSongEnded])


    return (
        <div className="flex justify-center items-center p-2">
            {player}
        </div>
    )


}