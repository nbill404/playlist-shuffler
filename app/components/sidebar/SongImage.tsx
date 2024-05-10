'use client'
import { useContext } from "react";
import YouTubeEmbed from "../embedPlayers/YoutubeEmbed";
import { SidebarContext } from "./Sidebar";

export default function SongImage() {
    const { selectedSongId } = useContext(SidebarContext);
    const { setSongEnded } = useContext(SidebarContext);

    return (
        <div className="flex justify-center items-center p-2">
            {selectedSongId
            ? <YouTubeEmbed videoId={selectedSongId} setSongEnded={setSongEnded} />
            : <div className="m-5 h-32 w-32 border"></div>
            }
        </div>
    )


}