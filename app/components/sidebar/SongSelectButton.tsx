import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import { Song } from "@/app/lib/song";



export default function SongSelectButton({song} : { 
    song : Song
}) {
    const { setSongNum } = useContext(SidebarContext);
    const { songNum } = useContext(SidebarContext)

    return (
        <li className={`text-left hover:bg-slate-600 rounded ${(songNum === song.globalPosition) && "bg-slate-600"}`}>
            <button onClick={() => setSongNum(song.globalPosition)}>{song.title}</button>
        </li>
    )
}

