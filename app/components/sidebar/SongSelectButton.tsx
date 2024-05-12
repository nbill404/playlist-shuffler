import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { Song } from "@/app/lib/song";



export default function SongSelectButton({song} : { 
    song : Song
}) {
    const { setSelectedSongId } = useContext(SidebarContext);
    const { songNum } = useContext(SidebarContext)

    return (
        <li className={`text-left hover:bg-slate-600 rounded ${(songNum === song.globalPosition) && "bg-slate-600"}`}>
            <button onClick={() => setSelectedSongId(song.id)}>{song.title}</button>
        </li>
    )
}

