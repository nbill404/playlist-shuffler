import { useContext } from "react";
import { Song } from "@/app/lib/song";
import { SidebarContext } from "@/app/contexts/sidebarContext";



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

